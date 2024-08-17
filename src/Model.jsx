import React,{ useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import './Model.css'
import axios from 'axios';
import Cookies
 from 'js-cookie';
function Model() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
   
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('https://backend-apis-latest.onrender.com/auth/login', {
            username: username,
            password: password
          },{
            withCredentials:true
          });
    
          if (response.status === 200) {
            console.log('Login was successful')
            console.log(Cookies.get('loggedIn'));
    
            setMessage('Login was successful!');
            document.getElementById('modalClose').click();
            window.location.reload();
          }
        } catch (error) {
          console.error(error);
          if (error.response) {
            // Handle error responses from the server
            if (error.response.status === 401) {
              setMessage('Account is not verified or invalid credentials.');
            } else {
              setMessage('Login failed. Please try again.');
            }
          } else {
            setMessage('An error occurred. Please try again.');
          }
        }
      };

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow rounded" style={{backgroundColor:'yellowgreen'}}>
                    <div className="modal-header fs-5 fw-bold">
                        Sign In to your account !!
                        <button type="button" className="btn-close" id='modalClose' data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='text-center text-light'>
                            <img src={process.env.PUBLIC_URL + '/images/Login/login.jpg'} className='my-4' style={{ width: '6rem', borderRadius: '50%' }} />
                        </div>
                        <div className="text-danger text-center">{message}</div>
                        <div className='pb-3 form-width mx-auto'  style={{width:'70%'}} >

                            <form className='text-center' onSubmit={handleLogin} >
                                <div class="input-group flex-nowrap my-4 mx-auto">
                                    <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faUser} style={{color:'red'}} /></span>
                                    <input type="text" class="form-control" value={username} placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping" onChange={(e) => setUsername(e.target.value)} required />
                                </div>
                                <div class="input-group flex-nowrap mx-auto my-4" >
                                    <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faKey} style={{color:'red'}} /></span>
                                    <input type="password" class="form-control" value={password} placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" onChange={(e) => setPassword(e.target.value)} required/>
                                </div>
                                <button type='submit' className='btn btn-primary btn-md px-5 fw-bold' style={{width:'100%'}}>Login </button>
                            </form>
                        </div>
                        <div className='text-center fw-bold py-3'>
                             Don't have an account ? <span className='btn btn-danger btn-sm px-2 py-1'>Sign Up</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Model