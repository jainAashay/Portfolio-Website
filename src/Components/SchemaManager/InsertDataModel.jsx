import React, { useRef, useState } from 'react';
import axios from 'axios';
import backend_endpoint from '../Constants';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import './SchemaManager.css';

function InsertDataModel({ schema }) {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const closeButtonRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleInsertData = async () => {
    if (!file) { setMessage('Please select a file before uploading.'); return; }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const loginToken = Cookies.get('login_token');
      const response = await axios.post(
        `${backend_endpoint}/schema_manager/schema/${schema}/data/upload`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${loginToken}` } }
      );
      if (response.status === 200) {
        setMessage('');
        closeButtonRef.current?.click();
        toast.success('Data ingested successfully.');
      } else {
        setMessage(response.data.message);
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="modal fade" id="insertDataModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content sm-modal-content">
          <div className="modal-header sm-modal-header">
            <h5 className="modal-title sm-modal-title">Upload Data</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              ref={closeButtonRef}
              data-bs-dismiss="modal"
            />
          </div>
          <div className="modal-body">
            <p className="sm-subtitle mb-3">
              Upload a <code style={{ color: '#818CF8' }}>.csv</code> or{' '}
              <code style={{ color: '#818CF8' }}>.xlsx</code> file to populate this schema.
            </p>
            <input type="file" className="form-control sm-input" onChange={handleFileChange} />
            {message && (
              <div className="mt-2" style={{ color: '#F87171', fontSize: '0.85rem' }}>{message}</div>
            )}
          </div>
          <div className="modal-footer sm-modal-footer">
            <button type="button" className="sm-btn-outline" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="sm-btn-primary" onClick={handleInsertData}>Insert</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsertDataModel;
