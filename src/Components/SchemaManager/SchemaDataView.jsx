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
