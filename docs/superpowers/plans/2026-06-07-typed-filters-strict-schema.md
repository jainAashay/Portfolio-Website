# Typed Filters + Strict Schema + Resizable Table Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add strict schema enforcement with typed field definitions, type-aware filter inputs (range/boolean/date/string-contains), and a resizable+reorderable data table.

**Architecture:** Backend gains two helpers (`build_mongo_filter`, `validate_document`) and extended schema metadata (`strict`, `field_definitions`). Frontend gains a `ResizableTable` component; `CreateSchemaModal` grows a strict-mode UI; `FilterBar` renders typed inputs driven by `field_definitions` from the view API.

**Tech Stack:** Flask + PyMongo (backend), React 18 + HTML5 DnD API (frontend), no new npm dependencies.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `Schema-Manager-master/app/routes/schema_manager.py` | Modify | Add helpers, extend create/view/insert/upload endpoints |
| `src/Components/SchemaManager/SchemaManager.css` | Modify | Add type-badge, bool-toggle, resize-handle, active-filter, field-def-row classes |
| `src/Components/SchemaManager/ResizableTable.jsx` | Create | Resizable + reorderable column table component |
| `src/Components/SchemaManager/CreateSchemaModal.jsx` | Modify | Strict toggle + field definition rows |
| `src/Components/SchemaManager/FilterBar.jsx` | Modify | Type-aware inputs, per-field clear, active highlight |
| `src/Components/SchemaManager/SchemaDataView.jsx` | Modify | Pass field_definitions to FilterBar, active filter count badge, use ResizableTable |

---

## Task 1: Backend — filter query builder + extended get_documents

**Files:**
- Modify: `Schema-Manager-master/app/routes/schema_manager.py`

- [ ] **Step 1: Add `build_mongo_filter` helper above `checkLogin`**

```python
def build_mongo_filter(filter_params, field_definitions):
    type_map = {fd['name']: fd['type'] for fd in (field_definitions or [])}
    mongo_filter = {}
    for key, value in filter_params.items():
        field_type = type_map.get(key)
        if isinstance(value, bool):
            mongo_filter[key] = value
        elif isinstance(value, dict):
            clause = {}
            if 'min' in value and value['min'] not in ('', None):
                clause['$gte'] = float(value['min']) if field_type == 'float' else int(float(value['min']))
            if 'max' in value and value['max'] not in ('', None):
                clause['$lte'] = float(value['max']) if field_type == 'float' else int(float(value['max']))
            if 'from' in value and value['from']:
                clause['$gte'] = value['from']
            if 'to' in value and value['to']:
                clause['$lte'] = value['to']
            if clause:
                mongo_filter[key] = clause
        elif field_type == 'string':
            if value:
                mongo_filter[key] = {'$regex': str(value), '$options': 'i'}
        elif field_type in ('integer', 'float'):
            try:
                mongo_filter[key] = int(float(value)) if field_type == 'integer' else float(value)
            except (ValueError, TypeError):
                pass
        elif field_type == 'boolean':
            mongo_filter[key] = (str(value).lower() == 'true')
        elif field_type == 'date':
            if value:
                mongo_filter[key] = str(value)
        else:
            if not value:
                continue
            try:
                int_val = int(value)
                mongo_filter[key] = {'$in': [int_val, str(value)]}
            except (ValueError, TypeError):
                try:
                    float_val = float(value)
                    mongo_filter[key] = {'$in': [float_val, str(value)]}
                except (ValueError, TypeError):
                    mongo_filter[key] = {'$regex': str(value), '$options': 'i'}
    return mongo_filter
```

- [ ] **Step 2: Update `get_documents` to return `field_definitions` + `strict`, and use `build_mongo_filter`**

Replace the existing `get_documents` function body with:

```python
@schema_manager_bp.route('/schema/<schema>/view', methods=['POST'])
@jwt_required()
def get_documents(schema):
    if not checkLogin():
        return jsonify({"message": "Unauthorized. Please log in"}), 401
    try:
        request_data = request.get_json()
        filter_params = request_data.get('filter_params', {})
        query_params = request_data.get('query_params', {})
        page_number = int(query_params.get('page_number', 1))
        page_size = int(query_params.get('page_size', 20))
        offset = (page_number - 1) * page_size

        claims = get_jwt()
        user = schema_data.find_one({'username': claims.get('username')})
        full_schema_name = user['username'] + '_' + schema

        schema_doc = next((s for s in user['schemas'] if s['name'] == full_schema_name), None)
        filters = schema_doc.get('filters', []) if schema_doc else []
        field_definitions = schema_doc.get('field_definitions', []) if schema_doc else []
        strict = schema_doc.get('strict', False) if schema_doc else False

        mongo_query = build_mongo_filter(filter_params, field_definitions)

        collection = db_schema_manager.get_collection(full_schema_name)
        documents = collection.find(mongo_query).skip(offset).limit(page_size)
        total_count = collection.count_documents(mongo_query)

        documents_list = list(documents)
        keys = set()
        for doc in documents_list:
            keys.update(doc.keys())
            doc['_id'] = str(doc['_id'])

        return jsonify({
            "total_count": total_count,
            "data": documents_list,
            "keys": sorted(list(keys)),
            "filters": filters,
            "field_definitions": field_definitions,
            "strict": strict,
        }), 200
    except Exception as e:
        logging.error(str(e))
        return jsonify({"message": "An error occurred"}), 500
```

- [ ] **Step 3: Verify backend reloads and responds correctly**

```bash
curl -s http://localhost:5000/healthcheck/health
# Expected: {"status":"up"}
```

- [ ] **Step 4: Commit**

```bash
cd /Users/aashay.jain/Downloads/claude-projects/Schema-Manager-master
git add app/routes/schema_manager.py
git commit -m "feat: add build_mongo_filter helper, return field_definitions+strict from view endpoint"
```

---

## Task 2: Backend — strict validation on insert + upload

**Files:**
- Modify: `Schema-Manager-master/app/routes/schema_manager.py`

- [ ] **Step 1: Add `validate_document` helper above `checkLogin`**

```python
def validate_document(doc, field_definitions):
    """Returns error string or None. Missing fields are allowed."""
    defined_names = {fd['name'] for fd in field_definitions}
    type_checkers = {
        'string':  lambda v: isinstance(v, str),
        'integer': lambda v: isinstance(v, int) and not isinstance(v, bool),
        'float':   lambda v: isinstance(v, (int, float)) and not isinstance(v, bool),
        'boolean': lambda v: isinstance(v, bool),
        'date':    lambda v: isinstance(v, str),
    }
    for key in doc:
        if key == '_id':
            continue
        if key not in defined_names:
            return f"Unknown field: '{key}'"
    for fd in field_definitions:
        name, ftype = fd['name'], fd['type']
        if name not in doc:
            continue
        checker = type_checkers.get(ftype)
        if checker and not checker(doc[name]):
            return f"Field '{name}' expects {ftype}, got {type(doc[name]).__name__}"
    return None
```

- [ ] **Step 2: Update `insertData` to validate in strict mode**

Replace the `insertData` function body with:

```python
@schema_manager_bp.route('/schema/<schema>/insert', methods=['POST'])
@jwt_required()
def insertData(schema):
    if not checkLogin():
        return jsonify({"message": "Unauthored. Please log in"}), 401
    try:
        claims = get_jwt()
        user = schema_data.find_one({'username': claims.get('username')})
        full_schema_name = user['username'] + '_' + schema

        schema_doc = next((s for s in user['schemas'] if s['name'] == full_schema_name), None)
        strict = schema_doc.get('strict', False) if schema_doc else False
        field_definitions = schema_doc.get('field_definitions', []) if schema_doc else []

        data = request.get_json().get('data', [])
        if not data:
            return jsonify({"error": "No data provided"}), 400
        if not isinstance(data, list):
            return jsonify({"error": "Data should be a list of documents"}), 400

        if strict:
            for i, doc in enumerate(data):
                err = validate_document(doc, field_definitions)
                if err:
                    return jsonify({"error": f"Row {i + 1}: {err}"}), 400

        result = db_schema_manager.get_collection(full_schema_name).insert_many(data)
        return jsonify({"message": "Data inserted successfully", "inserted_ids": [str(id) for id in result.inserted_ids]}), 200
    except Exception as e:
        logging.error(str(e))
        return jsonify({"error": str(e)}), 500
```

- [ ] **Step 3: Update `upload_file` to validate in strict mode**

After `records = data.to_dict(orient='records')` and before `insert_many`, add:

```python
        schema_doc = next((s for s in user['schemas'] if s['name'] == schema), None)
        strict = schema_doc.get('strict', False) if schema_doc else False
        field_definitions = schema_doc.get('field_definitions', []) if schema_doc else []

        if strict:
            for i, row in enumerate(records):
                err = validate_document(row, field_definitions)
                if err:
                    session.abort_transaction()
                    return jsonify({"error": f"Row {i + 1}: {err}"}), 400
```

The full `upload_file` after edit (key section only — replace from `records = data.to_dict(...)` through `result = ...insert_many`):

```python
            records = data.to_dict(orient='records')

            schema_doc = next((s for s in user['schemas'] if s['name'] == schema), None)
            strict = schema_doc.get('strict', False) if schema_doc else False
            field_definitions = schema_doc.get('field_definitions', []) if schema_doc else []

            if strict:
                for i, row in enumerate(records):
                    err = validate_document(row, field_definitions)
                    if err:
                        session.abort_transaction()
                        return jsonify({"error": f"Row {i + 1}: {err}"}), 400

            if schema not in db_schema_manager.list_collection_names():
                return jsonify({"message": f"Collection '{schema}' does not exist."}), 400

            result = db_schema_manager.get_collection(schema).insert_many(records)
```

- [ ] **Step 4: Commit**

```bash
cd /Users/aashay.jain/Downloads/claude-projects/Schema-Manager-master
git add app/routes/schema_manager.py
git commit -m "feat: strict schema validation on insert and CSV upload"
```

---

## Task 3: CSS — new utility classes

**Files:**
- Modify: `Portfolio-Website-master/src/Components/SchemaManager/SchemaManager.css`

- [ ] **Step 1: Append new classes at the end of SchemaManager.css**

```css
/* ── Type badge ── */
.sm-type-badge {
  display: inline-block;
  font-family: monospace;
  font-size: 0.62rem;
  font-weight: 700;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  background: rgba(129, 140, 248, 0.12);
  color: #818CF8;
  letter-spacing: 0.04em;
  margin-left: 0.4rem;
  vertical-align: middle;
  text-transform: uppercase;
}

/* ── Active filter field ── */
.sm-filter-field-active {
  border-left: 2px solid #4338CA;
  padding-left: 0.6rem;
  margin-left: -0.6rem;
  border-radius: 2px;
}

.sm-filter-field-active .sm-label {
  color: #A5B4FC;
}

/* ── Per-field clear button ── */
.sm-filter-clear-btn {
  background: none;
  border: none;
  color: #64748B;
  cursor: pointer;
  padding: 0;
  font-size: 0.75rem;
  line-height: 1;
  transition: color 0.15s;
  flex-shrink: 0;
}

.sm-filter-clear-btn:hover {
  color: #F87171;
}

/* ── Boolean toggle ── */
.sm-bool-toggle {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.sm-bool-toggle-btn {
  flex: 1;
  padding: 0.38rem 0;
  background: rgba(255, 255, 255, 0.04);
  border: none;
  color: #94A3B8;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.sm-bool-toggle-btn:not(:last-child) {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.sm-bool-toggle-btn--active {
  background: rgba(67, 56, 202, 0.32);
  color: #A5B4FC;
  font-weight: 600;
}

/* ── Active filter count badge on toggle button ── */
.sm-filter-count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.05rem;
  height: 1.05rem;
  border-radius: 50%;
  background: #4338CA;
  color: #fff;
  font-size: 0.62rem;
  font-weight: 700;
  position: absolute;
  top: -5px;
  right: -5px;
  pointer-events: none;
}

/* ── Column resize handle ── */
.sm-col-resize-handle {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 5px;
  cursor: col-resize;
  background: transparent;
  transition: background 0.15s;
  z-index: 3;
}

.sm-col-resize-handle:hover,
.sm-col-resize-handle:active {
  background: rgba(129, 140, 248, 0.5);
}

/* ── Field definition row in CreateSchemaModal ── */
.sm-field-def-row {
  display: grid;
  grid-template-columns: 1fr 120px 36px 28px;
  gap: 0.4rem;
  align-items: center;
  margin-bottom: 0.5rem;
}

.sm-field-def-select {
  background: rgba(255, 255, 255, 0.06) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: #F1F5F9 !important;
  border-radius: 8px !important;
  padding: 0.42rem 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;
  width: 100%;
}

.sm-field-def-select option {
  background: #1A1826;
}

.sm-range-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
}

.sm-date-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
}

/* Dark date input */
.sm-input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.6);
  cursor: pointer;
}
```

- [ ] **Step 2: Verify frontend recompiles with no new errors**

```bash
# Frontend should already be running. Check log:
tail -5 /tmp/frontend.log
# Expected last line: "webpack compiled successfully" or "Compiled successfully!"
```

- [ ] **Step 3: Commit**

```bash
cd /Users/aashay.jain/Downloads/claude-projects/Portfolio-Website-master
git add src/Components/SchemaManager/SchemaManager.css
git commit -m "feat: add CSS classes for typed filters, resize handle, bool toggle, field-def rows"
```

---

## Task 4: ResizableTable component

**Files:**
- Create: `Portfolio-Website-master/src/Components/SchemaManager/ResizableTable.jsx`

- [ ] **Step 1: Create the component**

```jsx
import React, { useState, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './SchemaManager.css';

const DEFAULT_WIDTH = 160;
const ACTION_WIDTH = 88;
const MIN_WIDTH = 60;

function ResizableTable({ keys, data, onEdit, onDelete }) {
  const [colWidths, setColWidths] = useState(() => keys.map(() => DEFAULT_WIDTH));
  const [colOrder, setColOrder] = useState(() => keys.map((_, i) => i));
  const [dragSrc, setDragSrc] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const resizing = useRef(null);

  const prevKeys = useRef(keys);
  if (prevKeys.current !== keys) {
    prevKeys.current = keys;
    setColWidths(keys.map(() => DEFAULT_WIDTH));
    setColOrder(keys.map((_, i) => i));
  }

  const orderedKeys = colOrder.map(i => keys[i]);
  const orderedWidths = colOrder.map(i => colWidths[i]);

  const startResize = useCallback((orderIdx, e) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startW = orderedWidths[orderIdx];
    resizing.current = { orderIdx, startX, startW, srcIdx: colOrder[orderIdx] };

    const onMove = (e) => {
      const delta = e.clientX - resizing.current.startX;
      const newW = Math.max(MIN_WIDTH, resizing.current.startW + delta);
      setColWidths(prev => {
        const next = [...prev];
        next[resizing.current.srcIdx] = newW;
        return next;
      });
    };
    const onUp = () => {
      resizing.current = null;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [colOrder, orderedWidths]);

  const handleDragStart = (orderIdx, e) => {
    e.dataTransfer.effectAllowed = 'move';
    setDragSrc(orderIdx);
  };
  const handleDragOver = (e, orderIdx) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOver(orderIdx);
  };
  const handleDrop = (orderIdx) => {
    if (dragSrc === null || dragSrc === orderIdx) { setDragSrc(null); setDragOver(null); return; }
    setColOrder(prev => {
      const next = [...prev];
      const [moved] = next.splice(dragSrc, 1);
      next.splice(orderIdx, 0, moved);
      return next;
    });
    setDragSrc(null);
    setDragOver(null);
  };
  const handleDragEnd = () => { setDragSrc(null); setDragOver(null); };

  return (
    <table className="sm-table" style={{ tableLayout: 'fixed' }}>
      <colgroup>
        <col style={{ width: ACTION_WIDTH }} />
        {orderedWidths.map((w, i) => <col key={i} style={{ width: w }} />)}
      </colgroup>
      <thead>
        <tr>
          <th style={{ width: ACTION_WIDTH, textAlign: 'center' }}>Actions</th>
          {orderedKeys.map((key, orderIdx) => (
            <th
              key={key}
              draggable
              onDragStart={(e) => handleDragStart(orderIdx, e)}
              onDragOver={(e) => handleDragOver(e, orderIdx)}
              onDrop={() => handleDrop(orderIdx)}
              onDragEnd={handleDragEnd}
              style={{
                width: orderedWidths[orderIdx],
                cursor: 'grab',
                opacity: dragSrc === orderIdx ? 0.45 : 1,
                borderLeft: dragOver === orderIdx && dragSrc !== orderIdx ? '2px solid #818CF8' : undefined,
                position: 'relative',
                userSelect: 'none',
              }}
            >
              <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: 14 }}>
                {key}
              </span>
              <span className="sm-col-resize-handle" onMouseDown={(e) => startResize(orderIdx, e)} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIdx) => (
          <tr key={rowIdx}>
            <td style={{ textAlign: 'center' }}>
              <button
                className="sm-tbl-btn sm-tbl-btn--edit"
                title="Edit row"
                data-bs-toggle="modal"
                data-bs-target="#UpdateDataModal"
                onClick={() => onEdit(item)}
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button
                className="sm-tbl-btn sm-tbl-btn--del"
                title="Delete row"
                onClick={() => onDelete(item._id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </td>
            {orderedKeys.map((key, j) => (
              <td key={j} title={String(item[key] ?? '')}>
                {item[key] != null ? String(item[key]) : '—'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResizableTable;
```

- [ ] **Step 2: Verify file created and no import errors**

```bash
ls /Users/aashay.jain/Downloads/claude-projects/Portfolio-Website-master/src/Components/SchemaManager/ResizableTable.jsx
# Expected: file listed
tail -5 /tmp/frontend.log
# Expected: "Compiled successfully!" (after SchemaDataView imports it in Task 7)
```

- [ ] **Step 3: Commit**

```bash
cd /Users/aashay.jain/Downloads/claude-projects/Portfolio-Website-master
git add src/Components/SchemaManager/ResizableTable.jsx
git commit -m "feat: ResizableTable component with drag-to-reorder and resize handles"
```

---

## Task 5: CreateSchemaModal — strict mode UI

**Files:**
- Modify: `Portfolio-Website-master/src/Components/SchemaManager/CreateSchemaModal.jsx`

- [ ] **Step 1: Replace full file content**

```jsx
import React, { useState } from 'react';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import backend_endpoint from '../Constants';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import './SchemaManager.css';

const FIELD_TYPES = ['string', 'integer', 'float', 'boolean', 'date'];

function CreateSchemaModal() {
  const [strict, setStrict] = useState(false);
  const [inputSchemaName, setInputSchemaName] = useState('');

  // Non-strict: simple filter attribute list
  const [filterItems, setFilterItems] = useState([]);
  const [inputFilter, setInputFilter] = useState('');

  // Strict: typed field definitions
  const [fieldDefs, setFieldDefs] = useState([{ name: '', type: 'string', filterable: false }]);

  const filterableCount = fieldDefs.filter(f => f.filterable).length;

  function handleAddFilterItem() {
    if (filterItems.length >= 5 || !inputFilter.trim()) return;
    setFilterItems([...filterItems, inputFilter.trim()]);
    setInputFilter('');
  }
  const handleFilterKeyDown = (e) => { if (e.key === 'Enter') handleAddFilterItem(); };
  const handleRemoveFilterItem = (i) => setFilterItems(filterItems.filter((_, idx) => idx !== i));

  const addFieldDef = () => setFieldDefs([...fieldDefs, { name: '', type: 'string', filterable: false }]);
  const removeFieldDef = (i) => setFieldDefs(fieldDefs.filter((_, idx) => idx !== i));
  const updateFieldDef = (i, patch) => setFieldDefs(fieldDefs.map((f, idx) => idx === i ? { ...f, ...patch } : f));

  const canCreate = inputSchemaName.trim() && (
    strict
      ? fieldDefs.some(f => f.name.trim())
      : true
  );

  async function handleCreateSchema() {
    const validDefs = fieldDefs.filter(f => f.name.trim());
    const request = strict
      ? {
          name: inputSchemaName.trim(),
          filters: validDefs.filter(f => f.filterable).map(f => f.name.trim()),
          strict: true,
          field_definitions: validDefs.map(f => ({ name: f.name.trim(), type: f.type, filterable: f.filterable })),
        }
      : {
          name: inputSchemaName.trim(),
          filters: filterItems,
          strict: false,
          field_definitions: [],
        };

    try {
      const loginToken = Cookies.get('login_token');
      const response = await axios.post(
        backend_endpoint + '/schema_manager/schema/create',
        request,
        { headers: { Authorization: `Bearer ${loginToken}` }, validateStatus: () => true }
      );
      if (response.status === 200) {
        toast.success('Schema created!');
        window.location.reload();
      } else if (response.status === 409) {
        toast.error(`Schema "${request.name}" already exists.`);
      } else {
        toast.error(response.data?.message || 'Failed to create schema.');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    } finally {
      document.getElementById('createSchemaCloseBtn').click();
    }
  }

  return (
    <div className="modal fade" id="createSchemaModal">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content sm-modal-content">
          <div className="modal-header sm-modal-header">
            <h5 className="modal-title sm-modal-title">Create New Schema</h5>
            <button type="button" id="createSchemaCloseBtn" className="btn-close btn-close-white" data-bs-dismiss="modal" />
          </div>

          <div className="modal-body">
            {/* Schema name */}
            <div className="mb-4">
              <label className="sm-label">Schema name</label>
              <input
                type="text"
                className="form-control sm-input"
                placeholder="e.g. customer_orders"
                value={inputSchemaName}
                onChange={e => setInputSchemaName(e.target.value)}
              />
            </div>

            {/* Strict toggle */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <span className="sm-label mb-0" style={{ display: 'inline', fontSize: '0.9rem' }}>Strict schema</span>
                <p className="sm-subtitle mt-1 mb-0" style={{ fontSize: '0.78rem' }}>
                  {strict ? 'Only defined fields accepted on insert.' : 'Any fields accepted on insert.'}
                </p>
              </div>
              <div
                onClick={() => setStrict(s => !s)}
                style={{
                  width: 40, height: 22, borderRadius: 999,
                  background: strict ? '#4338CA' : 'rgba(255,255,255,0.12)',
                  cursor: 'pointer', position: 'relative', flexShrink: 0,
                  transition: 'background 0.2s',
                }}
              >
                <span style={{
                  position: 'absolute', top: 3, left: strict ? 20 : 3,
                  width: 16, height: 16, borderRadius: '50%', background: '#fff',
                  transition: 'left 0.2s',
                }} />
              </div>
            </div>

            {/* Non-strict: filter attributes */}
            {!strict && (
              <div className="mb-3">
                <label className="sm-label">
                  Filter attributes&nbsp;
                  <span style={{ background: 'rgba(239,68,68,0.15)', color: '#F87171', fontSize: '0.68rem', padding: '0.1rem 0.45rem', borderRadius: 999, fontWeight: 700 }}>
                    max 5
                  </span>
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control sm-input"
                    placeholder="Enter attribute name and press Enter"
                    value={inputFilter}
                    onChange={e => setInputFilter(e.target.value)}
                    onKeyDown={handleFilterKeyDown}
                  />
                  <button className="sm-btn-primary" style={{ borderRadius: '0 8px 8px 0', padding: '0 1rem' }} onClick={handleAddFilterItem}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                {filterItems.length > 0 && (
                  <div className="d-flex flex-wrap mt-2">
                    {filterItems.map((item, i) => (
                      <span key={i} className="sm-filter-chip">
                        {item}
                        <button className="sm-filter-chip-close" onClick={() => handleRemoveFilterItem(i)}>
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Strict: field definitions */}
            {strict && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="sm-label mb-0">
                    Field definitions&nbsp;
                    <span style={{ background: 'rgba(239,68,68,0.15)', color: '#F87171', fontSize: '0.68rem', padding: '0.1rem 0.45rem', borderRadius: 999, fontWeight: 700 }}>
                      filterable max 5
                    </span>
                  </label>
                </div>

                {/* Header row */}
                <div className="sm-field-def-row mb-1" style={{ paddingBottom: '0.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className="sm-label mb-0" style={{ fontSize: '0.72rem' }}>Name</span>
                  <span className="sm-label mb-0" style={{ fontSize: '0.72rem' }}>Type</span>
                  <span className="sm-label mb-0" style={{ fontSize: '0.72rem', textAlign: 'center' }}>Filter</span>
                  <span />
                </div>

                {fieldDefs.map((fd, i) => (
                  <div className="sm-field-def-row" key={i}>
                    <input
                      type="text"
                      className="form-control sm-input"
                      style={{ fontSize: '0.85rem', padding: '0.38rem 0.6rem' }}
                      placeholder="field_name"
                      value={fd.name}
                      onChange={e => updateFieldDef(i, { name: e.target.value })}
                    />
                    <select
                      className="sm-field-def-select"
                      value={fd.type}
                      onChange={e => updateFieldDef(i, { type: e.target.value })}
                    >
                      {FIELD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <div className="d-flex justify-content-center align-items-center">
                      <input
                        type="checkbox"
                        checked={fd.filterable}
                        disabled={!fd.filterable && filterableCount >= 5}
                        onChange={e => updateFieldDef(i, { filterable: e.target.checked })}
                        style={{ accentColor: '#4338CA', width: 16, height: 16, cursor: 'pointer' }}
                      />
                    </div>
                    <button
                      className="sm-filter-chip-close"
                      onClick={() => removeFieldDef(i)}
                      disabled={fieldDefs.length === 1}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ))}

                <button
                  className="sm-btn-outline mt-2 w-100"
                  style={{ fontSize: '0.82rem', padding: '0.35rem' }}
                  onClick={addFieldDef}
                >
                  <FontAwesomeIcon icon={faPlus} className="me-1" /> Add field
                </button>
              </div>
            )}
          </div>

          <div className="modal-footer sm-modal-footer">
            <button type="button" className="sm-btn-outline" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="sm-btn-primary" onClick={handleCreateSchema} disabled={!canCreate}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSchemaModal;
```

- [ ] **Step 2: Verify frontend compiles cleanly**

```bash
tail -3 /tmp/frontend.log
# Expected: "Compiled successfully!" or "webpack compiled successfully"
```

- [ ] **Step 3: Commit**

```bash
cd /Users/aashay.jain/Downloads/claude-projects/Portfolio-Website-master
git add src/Components/SchemaManager/CreateSchemaModal.jsx
git commit -m "feat: CreateSchemaModal strict mode toggle with typed field definitions"
```

---

## Task 6: FilterBar — typed inputs + active filter UX

**Files:**
- Modify: `Portfolio-Website-master/src/Components/SchemaManager/FilterBar.jsx`

- [ ] **Step 1: Replace full file content**

```jsx
import React, { useState, useEffect } from 'react';
import './Filter.css';
import './SchemaManager.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faTimes } from '@fortawesome/free-solid-svg-icons';

function defaultValue(type) {
  if (type === 'integer' || type === 'float') return { min: '', max: '' };
  if (type === 'boolean') return null;
  if (type === 'date') return { from: '', to: '' };
  return '';
}

function isActive(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'boolean') return true;
  if (typeof value === 'string') return value !== '';
  if (typeof value === 'object') return Object.values(value).some(v => v !== '');
  return false;
}

function FilterBar({ filters, field_definitions, isVisible, onClose, onApply }) {
  const typeMap = Object.fromEntries((field_definitions || []).map(f => [f.name, f.type]));

  const [filterPayload, setFilterPayload] = useState(() =>
    filters.reduce((acc, f) => ({ ...acc, [f]: defaultValue(typeMap[f]) }), {})
  );

  useEffect(() => {
    setFilterPayload(filters.reduce((acc, f) => ({ ...acc, [f]: defaultValue(typeMap[f]) }), {}));
  }, [filters.join(',')]);

  const setField = (name, value) => setFilterPayload(prev => ({ ...prev, [name]: value }));
  const clearField = (name) => setField(name, defaultValue(typeMap[name]));

  const handleReset = () =>
    setFilterPayload(filters.reduce((acc, f) => ({ ...acc, [f]: defaultValue(typeMap[f]) }), {}));

  const handleApply = () => {
    const cleaned = {};
    for (const [key, value] of Object.entries(filterPayload)) {
      if (!isActive(value)) continue;
      if (typeof value === 'object' && value !== null) {
        const nonEmpty = Object.fromEntries(Object.entries(value).filter(([, v]) => v !== ''));
        if (Object.keys(nonEmpty).length) cleaned[key] = nonEmpty;
      } else {
        cleaned[key] = value;
      }
    }
    onApply?.(cleaned);
    onClose?.();
  };

  const renderInput = (filter) => {
    const type = typeMap[filter] || 'string';
    const value = filterPayload[filter];

    if (type === 'integer' || type === 'float') {
      return (
        <div className="sm-range-row">
          <input
            type="number"
            className="form-control sm-input"
            placeholder="Min"
            value={value?.min ?? ''}
            onChange={e => setField(filter, { ...value, min: e.target.value })}
          />
          <input
            type="number"
            className="form-control sm-input"
            placeholder="Max"
            value={value?.max ?? ''}
            onChange={e => setField(filter, { ...value, max: e.target.value })}
          />
        </div>
      );
    }

    if (type === 'boolean') {
      const options = [{ label: 'Any', val: null }, { label: 'True', val: true }, { label: 'False', val: false }];
      return (
        <div className="sm-bool-toggle">
          {options.map(({ label, val }) => (
            <button
              key={label}
              className={`sm-bool-toggle-btn${value === val ? ' sm-bool-toggle-btn--active' : ''}`}
              onClick={() => setField(filter, val)}
            >
              {label}
            </button>
          ))}
        </div>
      );
    }

    if (type === 'date') {
      return (
        <div className="sm-date-row">
          <input
            type="date"
            className="form-control sm-input"
            value={value?.from ?? ''}
            onChange={e => setField(filter, { ...value, from: e.target.value })}
          />
          <input
            type="date"
            className="form-control sm-input"
            value={value?.to ?? ''}
            onChange={e => setField(filter, { ...value, to: e.target.value })}
          />
        </div>
      );
    }

    // string (default)
    return (
      <input
        type="text"
        className="form-control sm-input"
        placeholder={`Contains…`}
        value={value ?? ''}
        onChange={e => setField(filter, e.target.value)}
      />
    );
  };

  return (
    <div className={`filter-bar ${isVisible ? 'open' : 'closed'}`}>
      <div className="filter-content p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span style={{ color: '#818CF8', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            Apply Filters
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '1.1rem', padding: 0 }}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>

        {filters.map((filter) => {
          const type = typeMap[filter] || 'string';
          const active = isActive(filterPayload[filter]);
          return (
            <div className={`mb-4${active ? ' sm-filter-field-active' : ''}`} key={filter}>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span>
                  <label className="sm-label mb-0">{filter}</label>
                  <span className="sm-type-badge">{type}</span>
                </span>
                {active && (
                  <button className="sm-filter-clear-btn" title="Clear" onClick={() => clearField(filter)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                )}
              </div>
              {renderInput(filter)}
            </div>
          );
        })}

        {!filters.length && (
          <p className="sm-subtitle text-center mt-4" style={{ fontSize: '0.85rem' }}>
            No filter attributes configured for this schema.
          </p>
        )}
      </div>

      <div className="d-flex gap-2 px-4 pb-4">
        <button className="sm-btn-outline flex-grow-1" onClick={handleReset}>Reset All</button>
        <button className="sm-btn-primary flex-grow-1" onClick={handleApply}>Apply</button>
      </div>
    </div>
  );
}

export default FilterBar;
```

- [ ] **Step 2: Verify compile**

```bash
tail -3 /tmp/frontend.log
# Expected: "Compiled successfully!"
```

- [ ] **Step 3: Commit**

```bash
cd /Users/aashay.jain/Downloads/claude-projects/Portfolio-Website-master
git add src/Components/SchemaManager/FilterBar.jsx
git commit -m "feat: FilterBar typed inputs (range, boolean toggle, date), active highlight, per-field clear"
```

---

## Task 7: SchemaDataView — wire everything together

**Files:**
- Modify: `Portfolio-Website-master/src/Components/SchemaManager/SchemaDataView.jsx`

- [ ] **Step 1: Replace full file content**

```jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import backend_endpoint from '../Constants';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faDownload } from '@fortawesome/free-solid-svg-icons';
import FilterBar from './FilterBar';
import { toast, ToastContainer } from 'react-toastify';
import SchemaDataUpdate from './SchemaDataUpdate';
import ResizableTable from './ResizableTable';
import { Pagination } from '@mui/material';
import Model from '../Portfolio_Website/Model_Login';
import { useLoginModal } from '../Login';
import './SchemaManager.css';

function SchemaDataView() {
  const { schema } = useParams();
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [filters, setFilters] = useState([]);
  const [fieldDefinitions, setFieldDefinitions] = useState([]);
  const [strict, setStrict] = useState(false);
  const [visible, setVisible] = useState(false);
  const [filterParams, setFilterParams] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);

  useLoginModal();

  const handleDelete = async (id) => {
    try {
      const loginToken = Cookies.get('login_token');
      const response = await axios.delete(
        `${backend_endpoint}/schema_manager/schema/${schema}/data/delete/${id}`,
        { headers: { Authorization: `Bearer ${loginToken}` } }
      );
      if (response.status === 200) { toast.success('Row deleted.'); fetchSchemaData(); }
      else if (response.status === 401) { toast.error('Unauthorized — please log in.'); }
      else { toast.error('Delete failed. Please try again.'); }
    } catch (err) { toast.error(err.message); }
  };

  const fetchSchemaData = useCallback(async () => {
    setLoading(true);
    setMessage('');
    try {
      const loginToken = Cookies.get('login_token');
      const response = await axios.post(
        `${backend_endpoint}/schema_manager/schema/${schema}/view`,
        { filter_params: filterParams, query_params: { page_number: pageNumber, page_size: 30 } },
        { headers: { Authorization: `Bearer ${loginToken}` }, validateStatus: s => s < 500 }
      );
      if (response.status === 200) {
        const { data: rows, keys: rawKeys, filters: f, field_definitions: fd, strict: s, total_count } = response.data;
        setData(rows);
        const displayKeys = s && fd?.length > 0 ? fd.map(d => d.name) : rawKeys.filter(k => k !== '_id');
        setKeys(displayKeys);
        setTotalPages(Math.ceil(total_count / 30));
        setFilters(f || []);
        setFieldDefinitions(fd || []);
        setStrict(s || false);
      } else {
        setMessage('Unauthorized — please log in and try again.');
      }
    } catch (err) {
      toast.error('Failed to fetch data.');
      setMessage('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [schema, filterParams, pageNumber]);

  useEffect(() => { fetchSchemaData(); }, [fetchSchemaData]);

  const handleDownload = async () => {
    try {
      const loginToken = Cookies.get('login_token');
      const response = await axios.get(
        `${backend_endpoint}/schema_manager/schema/${schema}/data/download`,
        { headers: { Authorization: `Bearer ${loginToken}` }, responseType: 'blob' }
      );
      if (response.status === 200) {
        const url = window.URL.createObjectURL(response.data);
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', `${schema}.xlsx`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast.success('Download started.');
      } else if (response.status === 401) {
        toast.error('Unauthorized — please log in.');
      } else {
        toast.error('Download failed.');
      }
    } catch (err) { toast.error(err.message); }
  };

  const activeFilterCount = Object.values(filterParams).filter(v => {
    if (v === null || v === undefined) return false;
    if (typeof v === 'boolean') return true;
    if (typeof v === 'string') return v !== '';
    if (typeof v === 'object') return Object.values(v).some(x => x !== '');
    return false;
  }).length;

  return (
    <div className="sm-page">
      <ToastContainer theme="dark" />
      <Model />
      <SchemaDataUpdate data={dataToUpdate} />
      <FilterBar
        filters={filters}
        field_definitions={fieldDefinitions}
        isVisible={visible}
        onClose={() => setVisible(false)}
        onApply={setFilterParams}
      />

      <div className="container pt-4 sm-container" style={{ width: '85%' }}>
        <div className="text-center pb-3">
          <h1 className="section-title">{schema}</h1>
          {strict && (
            <span className="sm-type-badge" style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>STRICT</span>
          )}
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: '#818CF8' }} role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
          </div>
        ) : message ? (
          <div className="sm-error-state">{message}</div>
        ) : (
          <>
            <div className="d-flex justify-content-end align-items-center gap-2 mb-3">
              <button className="sm-btn-outline" onClick={handleDownload}>
                <FontAwesomeIcon icon={faDownload} className="me-1" /> Download
              </button>
              <div style={{ position: 'relative' }}>
                <button
                  className="sm-icon-btn sm-icon-btn--add"
                  title="Toggle filters"
                  onClick={() => setVisible(!visible)}
                  style={{ width: '2.2rem', height: '2.2rem', fontSize: '1rem' }}
                >
                  <FontAwesomeIcon icon={faFilter} />
                </button>
                {activeFilterCount > 0 && (
                  <span className="sm-filter-count-badge">{activeFilterCount}</span>
                )}
              </div>
            </div>

            <div className="sm-table-wrapper mb-3" style={{ maxHeight: '65vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
              <ResizableTable
                keys={keys}
                data={data}
                onEdit={(item) => setDataToUpdate(item)}
                onDelete={handleDelete}
              />
            </div>

            <div className="d-flex justify-content-center pb-4">
              <Pagination
                count={totalPages}
                page={pageNumber}
                siblingCount={1}
                boundaryCount={2}
                color="secondary"
                onChange={(_, page) => setPageNumber(page)}
                showFirstButton
                showLastButton
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SchemaDataView;
```

- [ ] **Step 2: Verify clean compile**

```bash
tail -3 /tmp/frontend.log
# Expected: "Compiled successfully!"
```

- [ ] **Step 3: Manual smoke test**

1. Open `http://localhost:3000/schema-manager`, log in with `jainaashay123@gmail.com / test123`
2. Click **Create New** → enable strict toggle → add fields (name:string, age:integer, active:boolean) → mark name+age as filterable → create
3. Click view (eye icon) on the new schema
4. Confirm: **STRICT** badge appears under schema name
5. Click filter icon → confirm name shows text input, age shows Min/Max, active shows Any/True/False toggle
6. Enter a filter → confirm active filter count badge appears on filter button
7. Confirm columns are draggable (grab header, drag to reorder)
8. Confirm column resize handle (right edge of header, drag to resize)

- [ ] **Step 4: Commit**

```bash
cd /Users/aashay.jain/Downloads/claude-projects/Portfolio-Website-master
git add src/Components/SchemaManager/SchemaDataView.jsx
git commit -m "feat: wire ResizableTable, field_definitions, strict badge, active filter count badge"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Strict schema toggle in CreateSchemaModal — Task 5
- [x] Field definitions with name/type/filterable — Task 5
- [x] Filters derived from filterable field_definitions on backend — stored at create time, Task 5 frontend sends correct payload
- [x] Validation on insert (form) — Task 2
- [x] Validation on CSV upload — Task 2
- [x] `build_mongo_filter` with all type operators — Task 1
- [x] `get_documents` returns field_definitions + strict — Task 1
- [x] String filter: case-insensitive contains — Task 1 (`$regex`)
- [x] Numeric filter: min/max range — Tasks 1 + 6
- [x] Boolean filter: three-way toggle — Tasks 1 + 6
- [x] Date filter: from/to range — Tasks 1 + 6
- [x] Non-strict auto-coerce numerics — Task 1
- [x] FilterBar active highlight (left border) — Tasks 3 + 6
- [x] FilterBar per-field clear button — Tasks 3 + 6
- [x] FilterBar type badge — Tasks 3 + 6
- [x] Active filter count badge on toggle button — Tasks 3 + 7
- [x] ResizableTable column resize — Task 4
- [x] ResizableTable column reorder (drag) — Task 4
- [x] Strict schema table uses field_definitions column order — Task 7 (`displayKeys`)
- [x] Missing values render as `—` — Task 4 (ResizableTable)
- [x] STRICT badge in data view header — Task 7
- [x] CSS classes for all new UI — Task 3
