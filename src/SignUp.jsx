import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faEnvelopeOpen, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function SignUp() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [success,setSuccess]= useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://backend-apis-vcdm.onrender.com/signup', {
                name: name,
                password: password,
                email: username + '@gmail.com'
            });

            if (response.status === 200) {
                console.log(response.message);
                setMessage(response.message);
                setSuccess(true);
                
            }
            else {
                setMessage('An error occurred. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <>
        {
            success && (
                <div>
                <div className='text-center'>
                    <FontAwesomeIcon size='4x' icon={faCircleCheck} className='text-success py-3'/>
                </div>
                <div className='fw-bold text-center fs-5'>
                    A verification link has been sent to your email. Please click on the link to verify your account and login.
                </div>
            </div>
            )
        }

        {
            success===false && (
<div>
                <div className="text-danger text-center">{message}</div>
                <form className='text-center' onSubmit={handleSignUp} >
                    <div className="input-group flex-nowrap my-4 mx-auto">
                        <span className="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faUser} style={{ color: 'red' }} /></span>
                        <input type="text" className="form-control" value={name} placeholder="Name" aria-label="Username" aria-describedby="addon-wrapping" onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div class="input-group mb-3">
                        <span className="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faEnvelopeOpen} style={{ color: 'red' }} /></span>
                        <input type="text" class="form-control" placeholder="Email" aria-label="email" onChange={(e) => setUsername(e.target.value)} />
                        <span class="input-group-text" id="basic-addon2">@gmail.com</span>
                    </div>
                    <div className="input-group flex-nowrap mx-auto my-4" >
                        <span className="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faKey} style={{ color: 'red' }} /></span>
                        <input type="password" className="form-control" value={password} placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type='submit' className='btn btn-danger btn-md px-5 fw-bold' style={{ width: '100%' }}>Register</button>
                </form>
            </div>
            )
        }
            

            
        </>

    )
}

export default SignUp