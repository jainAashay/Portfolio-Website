import React, { useState, useEffect } from 'react'
import { Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlus, faSquarePlus, faTrashAlt, faUpload } from '@fortawesome/free-solid-svg-icons';
import './SchemaManager.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import CreateSchemaModal from './CreateSchemaModal';
import backend_endpoint from '../Constants';
import InsertDataModel from './InsertDataModel';
import InsertDataFromFormModal from './InsertDataFromFormModal';
import Model from '../Portfolio_Website/Model_Login';
import { useLoginModal } from '../Login';
import { ToastContainer } from 'react-toastify';

function SchemaManagerHome() {
  const [schemas, setSchemas] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredSchemas, setFilteredSchemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const [pointedSchema,setPointedSchema] = useState('');

  useLoginModal();

  const fetchSchemas = async () => {
    try {
      const loginToken = Cookies.get('login_token') || ''; 
      console.log(loginToken);
      const response = await axios.get(backend_endpoint + '/schemas/view', {
        headers: {
          Authorization: `Bearer ${loginToken}` // Set the authorization header
        },
        validateStatus: (status) => status < 500
      });
      console.log(response);
      if(response.status == 200){
        console.log(response.data.schemas);
        const initialSchema = response.data.schemas.map(schema => schema.name);
        setSchemas(initialSchema);
        setFilteredSchemas(initialSchema);
      }
      else{
        setError(true);
        setErrorMessage("Unauthored ! Please login and try again !");
      }
        
      
    } catch (error) {
      setError(true);
      setErrorMessage("An error occured while fetching schemas. Please try again later");
      console.error('Error fetching schemas:', error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemas();
  }, []);

  useEffect(() => {
    // Filter schemas based on search input
    setFilteredSchemas(
      schemas.filter(schema =>
        schema.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, schemas]);

  const handleSearch = (e) => {
    const value = e.target.value; // Get the input value
    setSearch(value); // Update the search state
    // Filter schemas based on the search input
    setFilteredSchemas(
      schemas.filter(schema =>
        schema.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleDelete = async (schema) => {
    const loginToken = Cookies.get('login_token');
    const response = await axios.delete(backend_endpoint + '/schema/' + schema + '/delete', {
      headers: {
        Authorization: `Bearer ${loginToken}` // Set the authorization header
      }
    });
    if (response.status == 200) {
      fetchSchemas();
      console.log('Delete schema with name :', schema);
    }
    else {
      alert(response.data.message)
      console.log(response.data);
    }
  };


  return (
    <div style={{ backgroundColor: 'skyblue' }}>
      <Model />
      <CreateSchemaModal />
      <InsertDataModel schema={pointedSchema} />
      <InsertDataFromFormModal schema={pointedSchema} />
      <ToastContainer/>
      <div className="container pt-4 responsive-container" style={{ width: '60%' }}>
        <div className='py-3 text-center'>
          <h1 className='fw-bold pb-2 text-danger'>Schema Manager</h1>
          <h6 className='fst-italic fw-bold pb-4'>Store all your data at one place systematically</h6>
        </div>
        <div className="row mb-4">
          <div className='col-7 g-0'>
            <InputGroup >
              <FormControl
                placeholder="Search schema"
                value={search}
                onChange={handleSearch}
              />
            </InputGroup>
          </div>
          <div className='col-5 g-0'>
            <Button className='float-end' data-bs-toggle="modal" data-bs-target="#createSchemaModal" variant="primary">Create New <FontAwesomeIcon icon={faPlus} /></Button>
          </div>

        </div>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="row text-center">
            <div className='col-12 p-3 fw-bold fst-italic'>{errorMessage}</div>
          </div>
        ) : (<div></div>)}

        {filteredSchemas.length > 0 ? (
          filteredSchemas.map((schema, index) => (
            <div className="row py-3 shadow rounded border my-2" style={{ backgroundColor: 'antiquewhite' }} key={index}>
              <div className='fw-bold fs-5 col-sm-12 col-md-8 col-lg-8'>{schema}</div>
              <div className="col-sm-12 col-md-4 col-lg-4" >
                <div className='alignment align-items-center'>
                  <FontAwesomeIcon className='action-item pt-1 pe-1' icon={faTrashAlt} style={{ color: 'red' }} onClick={() => handleDelete(schema)}/>
                  <FontAwesomeIcon className='action-item pt-1 pe-1' icon={faUpload} style={{ color: 'black' }} data-bs-toggle="modal" data-bs-target="#insertDataModal" onClick={() => {setPointedSchema(schema)}}/> 
                   <FontAwesomeIcon className='action-item pt-1 pe-1' icon={faSquarePlus} style={{ color: 'darkmagenta' }} data-bs-toggle="modal" data-bs-target="#insertFormDataModal" onClick={() => {setPointedSchema(schema)}}/> 
                  <a href={`/schema-manager/schema/${schema}/view`}  target="_blank"  rel="noopener noreferrer"  className='pe-1' >
                    <FontAwesomeIcon className='action-item pt-1' icon={faEye} style={{ color: 'green' }}/>
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="row text-center fst-italic">
            <div className='col-12 p-3'>No schemas found</div>
          </div>
        )}

      </div>
    </div>

  );
}

export default SchemaManagerHome