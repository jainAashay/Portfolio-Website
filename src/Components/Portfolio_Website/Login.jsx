import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import './Model.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import backend_endpoint from '../Constants';
import { toast, ToastContainer } from 'react-toastify';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backend_endpoint + '/auth/login', {
        username: username,
        password: password
      },
      {
        validateStatus: (status) => true
    });

      if (response.status === 200) {
        Cookies.set('login_token', response.data.access_token,
          {
            expires: 7,
            secure: true
          }
        );
        toast.success(response.data.message);
        document.getElementById('modalClose').click();
        window.location.reload();
        
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again later !');
    }
  };

  return (
    <div>
      <form className='text-center' onSubmit={handleAuth} >
        <div className="input-group flex-nowrap my-4 mx-auto">
          <span className="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faUser} style={{ color: 'red' }} /></span>
          <input type="text" className="form-control" value={username} placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping" onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="input-group flex-nowrap mx-auto my-4" >
          <span className="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faKey} style={{ color: 'red' }} /></span>
          <input type="password" className="form-control" value={password} placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type='submit' className='btn btn-primary btn-md px-5 fw-bold' id='submitButton' style={{ width: '100%' }}>Login </button>
      </form>
    </div>

  )
}

export default Login