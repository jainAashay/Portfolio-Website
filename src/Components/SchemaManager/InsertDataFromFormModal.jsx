import React, { useRef, useState } from 'react';
import axios from 'axios';
import backend_endpoint from '../Constants';
import Cookies from 'js-cookie';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import './SchemaManager.css';

function InsertDataFromFormModal({ schema }) {
  const [inputList, setInputList] = useState([]);
  const [inputPayload, setInputPayload] = useState({});
  const [inputValue, setInputValue] = useState('');
  const closeButtonRef = useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const updated = { ...inputPayload, [id]: value };
    setInputPayload(Object.fromEntries(Object.entries(updated).filter(([, v]) => v?.trim())));
  };

  function handleAddKey() {
    if (inputValue.trim() && !inputList.includes(inputValue.trim())) {
      setInputList([...inputList, inputValue.trim()]);
      setInputValue('');
    }
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleAddKey(); };

  const handleRemoveKey = (i) => {
    const key = inputList[i];
    setInputList(inputList.filter((_, idx) => idx !== i));
    const updated = { ...inputPayload };
    delete updated[key];
    setInputPayload(updated);
  };

  const handleInsert = async () => {
    if (!Object.keys(inputPayload).length) {
      toast.error('No data to insert — add at least one field.');
      return;
    }
    try {
      const loginToken = Cookies.get('login_token');
      const response = await axios.post(
        `${backend_endpoint}/schema_manager/schema/${schema}/insert`,
        { data: [inputPayload] },
        { headers: { Authorization: `Bearer ${loginToken}` }, validateStatus: () => true }
      );
      if (response.status === 200) {
        toast.success('Row inserted successfully.');
        closeButtonRef.current?.click();
      } else {
        toast.error(response.data?.message || 'Insert failed.');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="modal fade" id="insertFormDataModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content sm-modal-content">
          <div className="modal-header sm-modal-header">
            <h5 className="modal-title sm-modal-title">Insert Row via Form</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              ref={closeButtonRef}
              data-bs-dismiss="modal"
            />
          </div>

          <div className="modal-body">
            {inputList.map((key, i) => (
              <div className="mb-3" key={i}>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="sm-label mb-0">{key}</label>
                  <button className="sm-filter-chip-close" onClick={() => handleRemoveKey(i)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control sm-input"
                  id={key}
                  placeholder={`Value for ${key}`}
                  value={inputPayload[key] || ''}
                  onChange={handleInputChange}
                />
              </div>
            ))}

            <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '1rem 0' }} />

            <div className="input-group">
              <input
                type="text"
                className="form-control sm-input"
                placeholder="Add a field name…"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="sm-btn-primary"
                style={{ borderRadius: '0 8px 8px 0', padding: '0 1rem' }}
                onClick={handleAddKey}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <div className="modal-footer sm-modal-footer">
            <button type="button" className="sm-btn-outline" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="sm-btn-primary" onClick={handleInsert}>Insert</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsertDataFromFormModal;
