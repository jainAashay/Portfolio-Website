import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlus, faSquarePlus, faTrashAlt, faUpload } from '@fortawesome/free-solid-svg-icons';
import './SchemaManager.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import CreateSchemaModal from './CreateSchemaModal';
import backend_endpoint from '../Constants';
import InsertDataModel from './InsertDataModel';
import InsertDataFromFormModal from './InsertDataFromFormModal';
import Model from '../Portfolio_Website/Model_Login';
import { useLoginModal } from '../Login';
import { toast, ToastContainer } from 'react-toastify';

function SchemaManagerHome() {
  const [schemas, setSchemas] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredSchemas, setFilteredSchemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pointedSchema, setPointedSchema] = useState('');

  useLoginModal();

  const fetchSchemas = async () => {
    try {
      const loginToken = Cookies.get('login_token') || '';
      const response = await axios.get(backend_endpoint + '/schema_manager/schemas/view', {
        headers: { Authorization: `Bearer ${loginToken}` },
        validateStatus: (status) => status < 500,
      });
      if (response.status === 200) {
        const names = response.data.schemas.map(s => s.name);
        setSchemas(names);
        setFilteredSchemas(names);
      } else {
        setError(true);
        setErrorMessage('Unauthorized — please log in and try again.');
      }
    } catch (err) {
      setError(true);
      setErrorMessage('Failed to fetch schemas. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSchemas(); }, []);

  useEffect(() => {
    setFilteredSchemas(schemas.filter(s => s.toLowerCase().includes(search.toLowerCase())));
  }, [search, schemas]);

  const handleDelete = async (schema) => {
    const loginToken = Cookies.get('login_token');
    const response = await axios.delete(
      `${backend_endpoint}/schema_manager/schema/${schema}/delete`,
      { headers: { Authorization: `Bearer ${loginToken}` }, validateStatus: () => true }
    );
    if (response.status === 200) {
      fetchSchemas();
      toast.success(`Schema "${schema}" deleted.`);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="sm-page">
      <Model />
      <CreateSchemaModal />
      <InsertDataModel schema={pointedSchema} />
      <InsertDataFromFormModal schema={pointedSchema} />
      <ToastContainer theme="dark" />

      <div className="container pt-5 sm-container" style={{ width: '62%' }}>
        <div className="text-center pb-4">
          <h1 className="section-title">DataForge</h1>
          <p className="sm-subtitle">Your Personal API-Accessible Database</p>
        </div>

        <div className="d-flex gap-2 mb-4">
          <div className="flex-grow-1">
            <input
              className="sm-search-input form-control"
              placeholder="Search schemas…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button
            className="sm-btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#createSchemaModal"
          >
            <FontAwesomeIcon icon={faPlus} className="me-1" /> Create New
          </button>
        </div>

        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" style={{ color: '#818CF8' }} />
            <p className="sm-subtitle mt-2">Loading schemas…</p>
          </div>
        )}

        {!loading && error && (
          <div className="sm-error-state">{errorMessage}</div>
        )}

        {!loading && !error && filteredSchemas.length === 0 && (
          <div className="sm-empty-state">
            {search ? `No schemas match "${search}"` : 'No schemas yet — create one to get started.'}
          </div>
        )}

        {!loading && !error && filteredSchemas.map((schema, i) => (
          <div className={`sm-card sm-card--accent-${i % 4} mb-3`} key={i}>
            <span className="sm-card-name">{schema}</span>
            <div className="sm-card-actions">
              <button
                className="sm-icon-btn sm-icon-btn--danger"
                data-tooltip="Delete schema"
                onClick={() => handleDelete(schema)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              <button
                className="sm-icon-btn sm-icon-btn--upload"
                data-tooltip="Upload CSV / XLSX"
                data-bs-toggle="modal"
                data-bs-target="#insertDataModal"
                onClick={() => setPointedSchema(schema)}
              >
                <FontAwesomeIcon icon={faUpload} />
              </button>
              <button
                className="sm-icon-btn sm-icon-btn--add"
                data-tooltip="Insert row via form"
                data-bs-toggle="modal"
                data-bs-target="#insertFormDataModal"
                onClick={() => setPointedSchema(schema)}
              >
                <FontAwesomeIcon icon={faSquarePlus} />
              </button>
              <a
                href={`/dataforge/schema/${schema}/view`}
                target="_blank"
                rel="noopener noreferrer"
                className="sm-icon-btn sm-icon-btn--view"
                data-tooltip="View data"
              >
                <FontAwesomeIcon icon={faEye} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SchemaManagerHome;
