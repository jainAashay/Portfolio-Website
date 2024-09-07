import React, { useState, useEffect } from 'react'
import './Head.css'
import './NavItems'
import NavItems from './NavItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Model from './Model_Login'
import Cookies from 'js-cookie';
import axios from 'axios'
import 'bootstrap/dist/js/bootstrap.bundle.min';

export function Head() {

  const [authStatus, setAuthStatus] = useState('Log In');

  useEffect(() => {
    const checkAuthStatus = async () => {
      const loginToken = Cookies.get('login_token');
      if (loginToken) {
        setAuthStatus('Sign Out');
        const authBtn = document.getElementById('signin');
        authBtn.style.backgroundColor = 'red';
      } 
      else {
        setAuthStatus('Log In');
        const authBtn = document.getElementById('signin');
        authBtn.style.backgroundColor = 'blue';
      }
    };
    checkAuthStatus();
  }, []); // Empty dependency array means this runs once on component mount

  const handleClick = async () => {
    const loginToken = Cookies.get('login_token');
    if (loginToken) {
      Cookies.remove('login_token');
      window.location.href = '/'; 
    } 
    else {
      const modalElement = document.getElementById('exampleModal');
      if (modalElement) {
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  };

  const items = ["Home", "About", "Experience", "Achievements", "Skills", "Projects", "Contact"]
  return (
    <><nav className="navbar navbar-expand-lg bg-warning sticky-top" >
      <div className="container-fluid">
        <a className="navbar-brand fw-bold fs-4 ps-2" href="#">Aashay Jain</a>
        <button className="navbar-toggler bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <FontAwesomeIcon icon={faBars} className='text-white' />
        </button>
        <div className="collapse navbar-collapse fs-5" id="navbarNav">
          <ul className="navbar-nav ms-auto fw-bold">
            {items.map((item, index) => (
              <NavItems name={item} key={index} />
            ))}
            <li className="nav-item px-1 mt-1 align-center text-center">
              <button type='button' id='signin' onClick={handleClick} className="btn btn-primary fw-bold" data-bs-target="#exampleModal" style={{ width: '100%' }}>
                {authStatus}
              </button>

            </li>
          </ul>
        </div>
      </div>

    </nav>
      <Model />
    </>
  )
}
export default Head

