import React from 'react'
import { useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import backend_endpoint from '../Constants';
import Cookies from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

function CreateSchemaModal() {
  const [filterItems, setFilterItems] = useState([]); // State to hold the list of items
  const [inputFilter, setInputFilter] = useState(''); // State to hold the input value
  const [inputSchemaName,setInputSchemaName] = useState('');
  function handleAddItem() {
    if (filterItems.length >= 5) {
      return; // Prevent adding more than 5 items
    }
    // Create a new array and add the new item
    const newFilterList = [...filterItems, inputFilter];
    setFilterItems(newFilterList); // Update the state with the new array
    setInputFilter(""); // Clear the input field after adding
  }
  const handleRemoveItem = (index) => {
    setFilterItems(filterItems.filter((_, i) => i !== index));
  };

  async function handleCreateSchema(){
    const request={
      "name": inputSchemaName,
      "filters": filterItems
    }

    try{
      const loginToken=Cookies.get('login_token');
      const response = await axios.post(backend_endpoint+'/schema/create',request, {
        headers: {
          Authorization: `Bearer ${loginToken}` // Set the authorization header
        },
        validateStatus: (status) => {
          if(status == 200){
            toast.success('Successfuly created Schema ' + request.name);
          }
          else if(status == 400){
            toast.error('Schema already exists with name ' + request.name);
          }
        }
      });
        
    }
    catch(error){
      toast.error("An error occured ! Please try again");
      console.log(error);
    }
    finally{
      document.getElementById('createSchemaCloseBtn').click();
      window.location.reload();
    }

  }

  return (
    <div className="modal fade" id="createSchemaModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel" style={{ color: 'coral' }}>Create New Schema</h1>
            <button type="button" id='createSchemaCloseBtn' className="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          
            <div className="modal-body text-light">
              <div className="form-group">
                <label htmlFor="schemaName" className='mb-3 fs-5 text-info fw-bold'>Enter name for your schema :</label>
                <input type="text" className="form-control" value={inputSchemaName} onChange={(e) => setInputSchemaName(e.target.value)} placeholder="Provide name for your schema" />
              </div>
              <div className="form-group my-2">
                <label htmlFor="filter" className='my-3 fs-5 text-info fw-bold'>Choose attributes to apply search filter : <span className="badge text-bg-danger">Max 5</span> </label>
                <div className='input-group'>
                  <input type="text" className="form-control me-2" placeholder="Enter attribute name to used for search" value={inputFilter} onChange={(e) => setInputFilter(e.target.value)}/>
                  <button className="btn btn-primary btn-success fw-bold px-3" onClick={handleAddItem}>
                    Add <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>

              <div className='py-2'>
                {filterItems.map((item, index) => (
                  <li key={index} className="bg-warning text-dark fw-bold shadow p-2 fs-6 my-2 rounded list-group-item d-flex justify-content-between align-items-center">
                    {item}
                    <button className="btn-close" onClick={() => handleRemoveItem(index)} aria-label="Close"></button>
                  </li>
                ))}
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" className="btn btn-primary" onClick={handleCreateSchema}>Create</button>
            </div>
          
        </div>
      </div>
    </div>
  )
}

export default CreateSchemaModal