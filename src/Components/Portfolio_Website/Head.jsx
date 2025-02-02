import React, { useState, useEffect } from 'react';
import './Head.css';
import NavItems from './NavItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Model from './Model_Login';
import Cookies from 'js-cookie';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

export function Head() {
  const [authStatus, setAuthStatus] = useState('Log In');

  useEffect(() => {
    const checkAuthStatus = async () => {
      const loginToken = Cookies.get('login_token');
      const authBtn = document.getElementById('signin');

      if (loginToken) {
        setAuthStatus('Sign Out');
        authBtn && (authBtn.style.backgroundColor = 'red');
      } else {
        setAuthStatus('Log In');
        authBtn && (authBtn.style.backgroundColor = 'blue');
      }
    };
    checkAuthStatus();
  }, []);

  const handleClick = async () => {
    const loginToken = Cookies.get('login_token');
    if (loginToken) {
      Cookies.remove('login_token');
      window.location.href = '/'; 
    } 
    else {
      const modalElement = document.getElementById('loginSignUpModal');
      if (modalElement) {
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  };

  const items = ["Home", "About", "Experience", "Achievements", "Skills", "Projects", "Contact"];

  return (
    <>
      <Navbar bg="warning" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="#" className="fw-bold fs-4 ps-2">Aashay Jain</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" className='bg-dark'>
            <FontAwesomeIcon icon={faBars} className="text-white" />
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarNav" className="fs-5">
            <Nav className="ms-auto fw-bold">
              {items.map((item, index) => (
                <Nav.Item key={index}>
                  <NavItems name={item} key={index} />
                </Nav.Item>
              ))}
              <Nav.Item className="px-1 mt-1 align-center text-center">
                <Button id="signin" onClick={handleClick} className="fw-bold" style={{ width: '100%' }}>
                  {authStatus}
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Model />
    </>
  );
}

export default Head;
