import React, { useState , useEffect} from 'react'
import { Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlus, faSquarePlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './SchemaManager.css'
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import axios from 'axios';
import Cookies from 'js-cookie';

function SchemaManagerHome() {
  const [schemas, setSchemas] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredSchemas, setFilteredSchemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchSchemas = async () => {
    try {
      const loginToken=Cookies.get('login_token');
      const response = await axios.get('https://backend-apis-vcdm.onrender.com/schemas/view', {
        headers: {
          Authorization: `Bearer ${loginToken}` // Set the authorization header
        }
      });
      console.log(response.data);
      setSchemas(response.data.schemas);
      setFilteredSchemas(response.data.schemas); 
    } catch (error) {
      setError(true);
      console.error('Error fetching schemas:', error);
    }
    finally{
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
    const loginToken=Cookies.get('login_token');
        const response = await axios.delete('https://backend-apis-vcdm.onrender.com/schema/'+schema+'/delete', {
          headers: {
            Authorization: `Bearer ${loginToken}` // Set the authorization header
          }
        });
      if (response.status==200){
        fetchSchemas();
        console.log('Delete schema with name :', schema);
      }
      else{
        alert(response.data.message)
        console.log(response.data);
      }
  };

  const handleCreate = async (schema) => {
    const loginToken=Cookies.get('login_token');
        const response = await axios.delete('https://backend-apis-vcdm.onrender.com/schema/'+schema+'/delete', {
          headers: {
            Authorization: `Bearer ${loginToken}` // Set the authorization header
          }
        });
      if (response.status==200){
        fetchSchemas();
        console.log('Delete schema with name :', schema);
      }
      else{
        alert(response.data.message);
        console.log(response.data);
      }
  };

  return (
    <div style={{backgroundColor:'skyblue'}}>
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
          <Button className='float-end' variant="primary">Create New <FontAwesomeIcon icon={faPlus} /></Button>
          </div>
          
        </div>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="row text-center">
            <div className='col-12 p-3 fw-bold fst-italic'>Error loading your Schemas !! Please reload the page</div>
          </div>
        ): (<div></div>)}

{filteredSchemas.length > 0 ? (
  filteredSchemas.map((schema, index) => (
    <div className="row py-3 shadow rounded border my-2" style={{backgroundColor:'antiquewhite'}} key={index}>
      <div className='fw-bold fs-5 col-sm-12 col-md-9 col-lg-9'>{schema}</div>
      <div className="col-sm-12 col-md-3 col-lg-3" >
        <div className='pe-3 actions d-flex justify-content-between align-items-center'>
          <FontAwesomeIcon 
            className='action-item pt-1'
            icon={faTrashAlt}
            style={{ color: 'red' }}
            onClick={() => handleDelete(schema)}
          />
          <FontAwesomeIcon 
            className='action-item pt-1'
            icon={faEdit}
            style={{ color: 'blue' }}
            onClick={() => handleDelete(schema.id)}
          />
          <FontAwesomeIcon 
            className='action-item pt-1'
            icon={faSquarePlus}
            style={{ color: 'black' }}
            onClick={() => handleDelete(schema.id)}
          />
          <FontAwesomeIcon 
            className='action-item pt-1'
            icon={faEye}
            style={{ color: 'green' }}
            onClick={() => handleDelete(schema.id)}
          />
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