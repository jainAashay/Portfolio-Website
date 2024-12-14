import React, { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import './Model.css'
import ModelHeader from './ModelHeader';
import Login from './Login';
import SignUp from './SignUp';

function Model() {

  const [isLogin, setIsLogin] = useState(true);
  const [modalheader, setModalHeader] = useState('Sign In to your account !!');
  useEffect(() => {
    setIsLogin(true);
    setModalHeader('Sign In to your account !!')
  }, []);

  const handleSignUp = () =>{
    setIsLogin(false);
    setModalHeader('Create a new Account !!')

  };

  const backToLogin = () =>{
    setIsLogin(true);
    setModalHeader('Sign In to your account !!');

  };

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow rounded"  style={{ backgroundColor: 'burlywood' }}>
          <ModelHeader data={modalheader}/> 
          <div className="modal-body" id='loginModal'>
          {isLogin===false && (<FontAwesomeIcon icon={faArrowAltCircleLeft} style={{ fontSize: '1.5rem' }}role='button' className='ps-3 fw-bold' onClick={backToLogin}/>)}
            <div className='text-center text-light'>
              <img src={process.env.PUBLIC_URL + '/images/Login/login.jpg'} className='mt-3 mb-4' style={{ width: '6rem', borderRadius: '50%' }} />
            </div>
            <div className='pb-3 form-width mx-auto' style={{ width: '70%' }} >
             {isLogin ? <Login /> : <SignUp />}
            </div>
            {isLogin && (
        <div className='text-center fw-bold py-3' id="signUpButton">
          Don't have an account?{" "}
          <span className='btn btn-danger btn-sm px-2 py-1' onClick={handleSignUp}>
            Sign Up
          </span>
        </div>
      )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Model