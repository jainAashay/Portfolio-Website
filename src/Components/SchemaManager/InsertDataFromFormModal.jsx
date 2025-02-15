import React, { useRef } from 'react'
import { useState } from 'react';
import axios from 'axios';
import backend_endpoint from '../Constants';
import Cookies from 'js-cookie';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

function InsertDataFromFormModal({ schema }) {

    const [message, setMessage] = useState('');
    const [inputList, setInputList] = useState([]);
    const [inputPayload, setInputPayload] = useState({});
    const [inputValue, setInputValue] = useState('');


    const closeButtonRef = useRef(null);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
    
        // Update inputPayload with the new value
        const updatedPayload = {
            ...inputPayload,
            [id]: value,
        };
    
        // Remove keys with null or empty values
        const cleanedPayload = Object.fromEntries(
            Object.entries(updatedPayload).filter(([key, val]) => val?.trim())
        );
    
        setInputPayload(cleanedPayload);
        console.log(cleanedPayload);
    };

    function handleAddKey() {
        if (inputValue.trim() && !inputList.includes(inputValue)) { // Ensure the input is not empty or just whitespace
            setInputList([...inputList, inputValue]); // Create a new array with the added value
            setInputValue(''); // Clear the input field after adding
        }
    }

    const handleRemoveKey = (indexToRemove) => {
        const keyToRemove = inputList[indexToRemove];
        setInputList(inputList.filter((_, index) => index !== indexToRemove));
        const updatedPayload = { ...inputPayload };
        delete updatedPayload[keyToRemove];
        setInputPayload(updatedPayload);
    };
    
    const handleInsert = async () => {
        if (inputPayload) {
            const inputData=[];
            inputData.push(inputPayload);
            const request={
                data: inputData
            }
            try {
                const loginToken = Cookies.get('login_token');
                const response = await axios.post(backend_endpoint + '/schema_manager/schema/' + schema + '/insert',
                    request,
                    {
                        headers: {
                            Authorization: `Bearer ${loginToken}`
                        }
                    });
    
                    console.log(response.data);
                if (response.status == 200) {
                    setMessage('');
    
                    toast.success("Data ingested successfully");
                }
                else {
                    setMessage(response.data.message);
                }
            } catch (error) {
                setMessage(`Error: ${error.message}`);
            }
        }
        else{
            toast.error("Input Data cannot be null/empty.")
        }
    };

    return (
        <div className="modal fade" id="insertFormDataModal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{ backgroundColor: 'antiquewhite' }}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel" style={{ color: 'crimson' }}>Insert Data through Form</h1>
                        <button type="button" className="btn-close" ref={closeButtonRef} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        {
                            inputList.map((input, index) => (
                                <div className="mb-3 " key={index}>
                                    <button
                                        className="btn-close float-end"
                                        style={{ top: '10px', right: '10px' }}
                                        onClick={() => handleRemoveKey(index)}
                                        aria-label="Close"
                                    ></button>
                                    <label htmlFor={input} className="form-label fw-bold fs-6" style={{ color: 'darkviolet' }}>{input}</label>
                                    <input type="text" className="form-control" id={input} placeholder={input} value={inputPayload[input] || ''} onChange={handleInputChange} />
                                </div>
                            ))
                        }
                        <hr></hr>
                        <div className='fst-italic fw-bold'>{message}</div>
                        <div className='input-group'>
                            <input type="text" className="form-control me-2" placeholder="Enter key name" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                            <button className="btn btn-primary btn-success fw-bold px-3" onClick={handleAddKey}>
                                Add <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" className="btn btn-primary" onClick={handleInsert} >Insert</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default InsertDataFromFormModal