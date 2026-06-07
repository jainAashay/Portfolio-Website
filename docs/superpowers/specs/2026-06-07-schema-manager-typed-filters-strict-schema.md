# Schema Manager: Typed Filters + Strict Schema Enforcement

**Date:** 2026-06-07  
**Status:** Approved

---

## Goal

Extend Schema Manager with (1) strict schema enforcement at create-time with typed field definitions, (2) type-aware filter inputs (integer ranges, boolean toggles, date ranges, string contains), and (3) an enhanced filter sidebar with active-filter count, per-field clear, and type badges.

---

## Architecture

These three features form a single data pipeline:

```
CreateSchemaModal (strict toggle + typed field definitions)
  → stored in schema metadata: { strict, field_definitions: [{name, type, filterable}] }
    → /schema/<s>/view API returns field_definitions alongside data
      → FilterBar renders type-appropriate inputs per field
        → filter_params sent as { field: value | {min,max} | bool | {from,to} }
          → backend translates to MongoDB operators before querying
```

Strict mode gates inserts (form + CSV). Type-aware filters work for all schemas; non-strict schemas auto-coerce numeric-looking string values.

---

## Data Model Changes

### Schema metadata (Schema_Manager.User_Schema_Info)

Before:
```json
{ "name": "user_schema", "filters": ["field1"] }
```

After:
```json
{
  "name": "user_schema",
  "filters": ["field1"],
  "strict": false,
  "field_definitions": [
    { "name": "age",    "type": "integer", "filterable": true  },
    { "name": "name",   "type": "string",  "filterable": true  },
    { "name": "active", "type": "boolean", "filterable": false },
    { "name": "score",  "type": "float",   "filterable": false },
    { "name": "joined", "type": "date",    "filterable": true  }
  ]
}
```

`filters` array remains populated from `field_definitions` where `filterable: true` — kept for backward compatibility with non-strict schemas.

Non-strict schemas: `strict: false`, `field_definitions: []`.

### Supported types

| Type | MongoDB storage | Filter operator |
|------|----------------|-----------------|
| `string` | String | `$regex` + `$options: "i"` (contains, case-insensitive) |
| `integer` | Int32 | `$gte` / `$lte` (either optional) |
| `float` | Double | `$gte` / `$lte` (either optional) |
| `boolean` | Boolean | exact match |
| `date` | ISO string (stored as string, filtered as string prefix) | `$gte` / `$lte` on ISO string |

---

## API Changes

### POST `/schema_manager/schema/create`

Request gains two optional fields:

```json
{
  "name": "my_schema",
  "filters": [],
  "strict": true,
  "field_definitions": [
    { "name": "age",  "type": "integer", "filterable": true },
    { "name": "name", "type": "string",  "filterable": true }
  ]
}
```

- If `strict: false` (or omitted): `field_definitions` is stored as-is (may be empty). `filters` is taken as before.
- If `strict: true`: `filters` array is derived from `field_definitions` where `filterable: true` (frontend sends both for backward compat, backend derives from definitions).
- Response unchanged: `{"message": "Schema created"}` 200.

### POST `/schema_manager/schema/<schema>/view`

Response gains `field_definitions`:

```json
{
  "total_count": 50,
  "data": [...],
  "keys": ["age", "name"],
  "filters": ["age", "name"],
  "field_definitions": [
    { "name": "age",  "type": "integer", "filterable": true },
    { "name": "name", "type": "string",  "filterable": true }
  ],
  "strict": true
}
```

Non-strict schemas return `field_definitions: []`, `strict: false`.

### POST `/schema_manager/schema/<schema>/view` — filter_params format

Extended to support typed operators (backward compatible — plain string values still work):

```json
{
  "filter_params": {
    "name":   "john",
    "age":    { "min": 18, "max": 65 },
    "active": true,
    "joined": { "from": "2024-01-01", "to": "2025-01-01" }
  }
}
```

Backend translates each value:

| filter_params value | MongoDB query |
|--------------------|---------------|
| `"john"` (string) | `{ $regex: "john", $options: "i" }` |
| `{ min: 18, max: 65 }` | `{ $gte: 18, $lte: 65 }` |
| `{ min: 18 }` | `{ $gte: 18 }` |
| `true` / `false` | `true` / `false` (exact) |
| `{ from: "2024-01-01", to: "2025-01-01" }` | `{ $gte: "2024-01-01", $lte: "2025-01-01" }` |

Non-strict schemas: if a plain string value looks numeric (`int()` or `float()` coercible), backend tries both string and numeric match via `$in`.

### POST `/schema_manager/schema/<schema>/insert` (strict mode only)

If schema is strict, each document is validated before insert:
- Extra keys not in `field_definitions` → 400 with `{"error": "Unknown field: <key>"}`.
- Value wrong type → 400 with `{"error": "Field <key> expects <type>, got <actual>"}`.
- Missing fields → allowed (fields are optional).

### POST `/schema_manager/schema/<schema>/data/upload` (strict mode only)

Same validation applied row-by-row. If any row fails:
- Return 400 with `{"error": "Row <n>: <reason>"}`.
- No rows are inserted (transaction aborted).

---

## Frontend Components

### `CreateSchemaModal.jsx` — changes

**Non-strict mode (default):**
- Existing filter-attribute input (text + Add button), max 5. No change.

**Strict mode (toggle on):**
- Filter-attribute section replaced by field definition table.
- Each row: field name input | type dropdown (string/integer/float/boolean/date) | filterable checkbox | remove button.
- Add row button. No max on field count.
- Filterable checkbox capped at 5 (same limit, enforced in UI).
- Validation: all field names must be non-empty and unique before Create is enabled.

### `FilterBar.jsx` — changes

- Receives `field_definitions` and `strict` as props (alongside existing `filters`).
- For each filterable field, renders input by type:
  - `string`: single text input (current).
  - `integer` / `float`: two inputs side-by-side — Min and Max, both optional, `type="number"`.
  - `boolean`: three-button toggle row — Any (default) / True / False.
  - `date`: two `type="date"` inputs — From and To, both optional.
- Each field shows a small type badge (e.g. `INT`, `BOOL`) next to the label.
- Each field shows a × clear button when it has a value; clicking resets just that field.
- Active filters (fields with a non-empty value) get an accent left-border highlight on their container.
- Bottom bar: Reset All | Apply (unchanged).

### `SchemaDataView.jsx` — changes

- Passes `field_definitions` and `strict` from `/view` response to `FilterBar`.
- Active filter count: count of non-empty entries in `filterParams`. Shown as a badge on the filter toggle button: `⊞ 2` when > 0, plain `⊞` when 0.
- **Strict schema table columns:** when `strict: true`, columns are derived from `field_definitions` order (not from `keys`). Missing values render as `—`.

### `SchemaManager.css` — additions

- `.sm-filter-field-active` — accent left border for filter inputs with values.
- `.sm-type-badge` — small uppercase monospace badge for field type.
- `.sm-bool-toggle` — three-button boolean toggle row.
- `.sm-filter-clear-btn` — per-field × clear button.
- `.sm-filter-count-badge` — badge on filter toggle button.
- `.sm-field-def-row` — row in the strict schema field definition table inside CreateSchemaModal.
- `.sm-col-resize-handle` — drag handle at the right edge of each `th` for column resizing.

### `ResizableTable.jsx` — new component (replaces inline `<table>` in SchemaDataView)

Encapsulates two interactive table behaviours so `SchemaDataView` stays clean:

**Column resizing:**
- Each `th` has a 4 px drag handle on its right edge (`.sm-col-resize-handle`).
- On `mousedown` on a handle, track `mousemove` on `document` and update that column's width in a `colWidths` state array.
- Widths stored as px values; `table-layout: fixed`. Default width: `160px` per column, `88px` for the Actions column.
- No library needed — pure `mousedown / mousemove / mouseup` on `document`.

**Column reordering:**
- `th` elements are draggable via HTML5 drag-and-drop API (`draggable`, `onDragStart`, `onDragOver`, `onDrop`).
- `colOrder` state holds the current column index permutation.
- Both headers and `td` cells render in `colOrder` order.
- Visual cue: dragged column header gets 50% opacity; drop target gets accent left border.
- Actions column is pinned first and not draggable/reorderable.
- Column widths follow the column as it moves (widths array reordered alongside `colOrder`).

**Props:** `keys: string[]`, `data: object[]`, `onEdit: (item) => void`, `onDelete: (id) => void`

---

## Error Handling

- Strict insert validation errors shown via `toast.error()` with the server message.
- CSV upload row-level errors shown in InsertDataModel as a scrollable list below the file input.
- Filter apply with empty filter payload → clears all filters (existing behaviour).
- Backend type coercion failures for non-strict schemas fall back to string match silently.
- Column resize: minimum column width clamped to 60px to prevent collapse.

---

## Out of Scope

- Persisting column width/order preferences across page reloads.
- Changing strict mode or field definitions after schema creation.
- Required vs optional field enforcement (all fields are optional).
- Nested / array field types.
- Sort controls in the data table.
- Pagination size control.
