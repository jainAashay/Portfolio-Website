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

    const onMove = (ev) => {
      const delta = ev.clientX - resizing.current.startX;
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
