import React, { useRef } from 'react'
import { useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import backend_endpoint from '../Constants';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function InsertDataModel({schema}) {

    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    
    const closeButtonRef = useRef(null);

    console.log(schema);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]; 
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleInsertData = async () => {
        if (!file) {
            setMessage("Please select a file before uploading.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const loginToken = Cookies.get('login_token');
            const response = await axios.post(backend_endpoint + '/schema/' + schema + '/data/upload',
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${loginToken}` // Set the authorization header
                    }
                });

                console.log(schema);
                console.log(response.data);
            if (response.status == 200) {
                setMessage('');
                if (closeButtonRef.current) {
                    closeButtonRef.current.click();
                }

                toast.success("Data ingested successfully");
            }
            else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };


    return (
        <div className="modal fade" id="insertDataModal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{ backgroundColor: 'antiquewhite' }}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel" style={{ color: 'crimson' }}>Upload data into Schema</h1>
                        <button type="button" className="btn-close" ref={closeButtonRef} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className='fst-italic fw-bold pb-3'>Upload data through .csv/.xlsx file</div>
                        <div className="input-group mb-3">
                            <input type="file" className="form-control" id="inputGroupFile02" onChange={handleFileChange} />
                            <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                        </div>
                        <div className='text-danger'>{message}</div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" className="btn btn-primary" onClick={handleInsertData}>Insert</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default InsertDataModel