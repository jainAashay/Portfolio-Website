# Schema Manager UI Overhaul + Backend Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign SchemaManager UI to match portfolio dark theme (glassmorphism, #0B0A14 bg, #4338CA accent) and fix 5 backend bugs while keeping all API contracts identical.

**Architecture:** Replace all inline color styles and Bootstrap light-theme overrides with a consistent dark design system. Backend fixes are surgical — no contract changes.

**Tech Stack:** React 18, React Bootstrap (modals only), FontAwesome icons, Axios, Flask/Python, MongoDB

---

## Files Modified

| File | Change |
|------|--------|
| `src/Components/Constants.js` | Switch endpoint to localhost:5000 |
| `src/Components/SchemaManager/SchemaManager.css` | Full redesign — dark theme tokens, card, table, button styles |
| `src/Components/SchemaManager/Filter.css` | Dark filter sidebar |
| `src/Components/SchemaManager/SchemaManagerHome.jsx` | Dark bg, glassmorphism cards, icon tooltips |
| `src/Components/SchemaManager/SchemaDataView.jsx` | Dark table, sticky header |
| `src/Components/SchemaManager/CreateSchemaModal.jsx` | Dark modal, accent inputs |
| `src/Components/SchemaManager/InsertDataModel.jsx` | Dark modal |
| `src/Components/SchemaManager/InsertDataFromFormModal.jsx` | Dark modal |
| `src/Components/SchemaManager/SchemaDataUpdate.jsx` | Dark modal |
| `src/Components/SchemaManager/FilterBar.jsx` | Dark sidebar, accent labels |
| `Schema-Manager-master/app/routes/schema_manager.py` | 5 bug fixes |

---

## Task 1: Switch frontend to localhost backend

- [ ] Update `Constants.js` to `http://localhost:5000`

## Task 2: Backend bug fixes

- [ ] Fix `view_all_schemas` — schema name stripping with underscore-safe `removeprefix`
- [ ] Add `checkLogin()` to `bulk_replace`
- [ ] Uncomment file cleanup in `upload_file`
- [ ] Remove dead code in `insertData` (unreachable second except)
- [ ] Sort `keys` in `get_documents` response

## Task 3: CSS redesign

- [ ] Rewrite `SchemaManager.css` with dark design tokens
- [ ] Rewrite `Filter.css` with dark sidebar styles

## Task 4: SchemaManagerHome redesign

- [ ] Dark background, section-title header, glassmorphism schema cards, icon tooltips

## Task 5: SchemaDataView redesign

- [ ] Dark background, dark table with sticky header, styled action buttons

## Task 6: Modals redesign

- [ ] CreateSchemaModal — dark `#1A1826` bg, accent inputs, filter chips as skill-tag style
- [ ] InsertDataModel — dark modal
- [ ] InsertDataFromFormModal — dark modal
- [ ] SchemaDataUpdate — dark modal

## Task 7: FilterBar redesign

- [ ] Dark sidebar panel, accent labels, styled inputs
