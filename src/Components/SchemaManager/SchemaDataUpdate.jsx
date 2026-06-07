import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import backend_endpoint from '../Constants';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './SchemaManager.css';

function SchemaDataUpdate({ data }) {
  const [formData, setFormData] = useState({ ...data });
  const { schema } = useParams();
  const closeButtonRef = useRef(null);

  useEffect(() => { setFormData({ ...data }); }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const loginToken = Cookies.get('login_token');
      const response = await axios.put(
        `${backend_endpoint}/schema_manager/schema/${schema}/data/update`,
        formData,
        { headers: { Authorization: `Bearer ${loginToken}` } }
      );
      if (response.status === 200) {
        toast.success('Row updated. Reload to see changes.');
        closeButtonRef.current?.click();
      } else if (response.status === 401) {
        toast.error('Unauthorized — please log in.');
      } else {
        toast.error('Update failed. Please try again.');
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="modal fade" id="UpdateDataModal">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content sm-modal-content">
          <div className="modal-header sm-modal-header">
            <h5 className="modal-title sm-modal-title">Edit Row</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              ref={closeButtonRef}
              data-bs-dismiss="modal"
            />
          </div>

          <div className="modal-body">
            {Object.keys(formData || {}).filter(k => k !== '_id').map(key => (
              <div className="mb-3" key={key}>
                <label className="sm-label">{key}</label>
                <input
                  type="text"
                  className="form-control sm-input"
                  name={key}
                  value={formData[key] ?? ''}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="modal-footer sm-modal-footer">
            <button type="button" className="sm-btn-outline" data-bs-dismiss="modal">Discard</button>
            <button type="button" className="sm-btn-primary" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchemaDataUpdate;
