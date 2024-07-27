import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import './Model.css'
function Model() {
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow rounded" style={{backgroundColor:'yellowgreen'}}>
                    <div className="modal-header fs-5 fw-bold">
                        Sign In to your account !!
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='text-center text-light'>
                            <img src={process.env.PUBLIC_URL + '/images/Login/login.jpg'} className='my-4' style={{ width: '6rem', borderRadius: '50%' }} />
                        </div>
                        <div className='pb-3 form-width mx-auto'  style={{width:'70%'}} >

                            <form className='text-center' >
                                <div class="input-group flex-nowrap my-4 mx-auto">
                                    <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faUser} style={{color:'red'}} /></span>
                                    <input type="text" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping" />
                                </div>
                                <div class="input-group flex-nowrap mx-auto my-4" >
                                    <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faKey} style={{color:'red'}} /></span>
                                    <input type="text" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="addon-wrapping" />
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