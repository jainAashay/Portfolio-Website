import axios from 'axios';
import { data } from 'jquery'
import React, { useEffect, useRef, useState } from 'react'
import backend_endpoint from '../Constants';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function SchemaDataUpdate({ data }) {
  const [formData, setFormData] = useState({ ...data });

  useEffect(() => {
    setFormData({ ...data }); // Update formData when data changes
  }, [data]);

  const { schema } = useParams();

  const closeButtonRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
      const loginToken = Cookies.get('login_token');
      const response = await axios.put(backend_endpoint + '/schema/' + schema + '/data/update',formData, {
        headers: {
          Authorization: `Bearer ${loginToken}` // Set the authorization header
        }
      });
      if (response.status == 200) {
        toast.success("Data Updated Successfuly. Please reload the page");
        if (closeButtonRef.current) {
          closeButtonRef.current.click();
      }
      }
      else if (response.status == 401) {
        toast.error("Unauthored ! Please login and try again !");
      }
      else {
        toast.error("An error occured.Pls try again");
      }
    }
    catch (error) {
      toast.error(error.message);
      console.log(error);
    }
    
  };

  return (
    <div className="modal fade" id="UpdateDataModal" >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{backgroundColor:'bisque'}}>
          <div className="modal-header">
            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel" style={{ color: 'crimson' }}>Edit Row</h1>
            <button type="button" className="btn-close bg-light" ref={closeButtonRef} data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body text-dark">

            <form>
              {
                
                Object.keys(formData).filter((key) => key != '_id').map((key) => (
                  <div className="mb-3" key={key}>
                    <label htmlFor={`form-${key}`} className="form-label fw-bold text-primary">
                      {key}
                    </label>
                    <input type="text" className="form-control" id={`form-${key}`} name={key} value={formData[key] || ''} onChange={handleChange}/>
                  </div>
                ))
              }

            </form>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Discard
            </button>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SchemaDataUpdate