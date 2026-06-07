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
    (filters || []).reduce((acc, f) => ({ ...acc, [f]: defaultValue(typeMap[f]) }), {})
  );

  useEffect(() => {
    setFilterPayload((filters || []).reduce((acc, f) => ({ ...acc, [f]: defaultValue(typeMap[f]) }), {}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(filters || []).join(',')]);

  const setField = (name, value) => setFilterPayload(prev => ({ ...prev, [name]: value }));
  const clearField = (name) => setField(name, defaultValue(typeMap[name]));

  const handleReset = () =>
    setFilterPayload((filters || []).reduce((acc, f) => ({ ...acc, [f]: defaultValue(typeMap[f]) }), {}));

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

    return (
      <input
        type="text"
        className="form-control sm-input"
        placeholder="Contains…"
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

        {(filters || []).map((filter) => {
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

        {!(filters || []).length && (
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
