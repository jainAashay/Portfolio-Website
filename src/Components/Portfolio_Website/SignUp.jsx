import React, {useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import backend_endpoint from '../Constants';
import { toast } from 'react-toastify';

function SignUp() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backend_endpoint}/signup`, {
                name: name,
                password: password,
                email: username + '@gmail.com'
            }, {
                validateStatus: (status) => true
            });

            if (response.status === 200) {
                document.getElementById('modalClose').click();
                toast.success(response.data.message);
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <div>
                <form className='text-center' onSubmit={handleSignUp} >
                    <div className="input-group flex-nowrap my-4 mx-auto">
                        <span className="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faUser} style={{ color: 'red' }} /></span>
                        <input type="text" className="form-control" value={name} placeholder="Name" aria-label="Username" aria-describedby="addon-wrapping" onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faEnvelopeOpen} style={{ color: 'red' }} /></span>
                        <input type="text" className="form-control" placeholder="Email" aria-label="email" onChange={(e) => setUsername(e.target.value)} />
                        <span className="input-group-text" id="basic-addon2">@gmail.com</span>
                    </div>
                    <div className="input-group flex-nowrap mx-auto my-4" >
                        <span className="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faKey} style={{ color: 'red' }} /></span>
                        <input type="password" className="form-control" value={password} placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type='submit' className='btn btn-danger btn-md px-5 fw-bold' style={{ width: '100%' }}>Register</button>
                </form>
            </div>
        </>

    )
}

export default SignUp