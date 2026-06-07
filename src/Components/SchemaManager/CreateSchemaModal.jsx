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

  const [filterItems, setFilterItems] = useState([]);
  const [inputFilter, setInputFilter] = useState('');

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

  const canCreate = inputSchemaName.trim() && (strict ? fieldDefs.some(f => f.name.trim()) : true);

  async function handleCreateSchema() {
    const validDefs = fieldDefs.filter(f => f.name.trim());
    const payload = strict
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
        payload,
        { headers: { Authorization: `Bearer ${loginToken}` }, validateStatus: () => true }
      );
      if (response.status === 200) {
        toast.success('Schema created!');
        window.location.reload();
      } else if (response.status === 409) {
        toast.error(`Schema "${payload.name}" already exists.`);
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
