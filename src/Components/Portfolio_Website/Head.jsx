import React, { useState, useEffect } from 'react';
import './Head.css';
import Model from './Model_Login';
import Cookies from 'js-cookie';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NAV_ITEMS = [
  { name: 'Home', id: 'home' },
  { name: 'Experience', id: 'experience' },
  { name: 'Achievements', id: 'achievements' },
  { name: 'Projects', id: 'projects' },
  { name: 'Contact', id: 'contact' },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function Head() {
  const [authStatus, setAuthStatus] = useState('Log In');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get('login_token');
    setIsSignedIn(!!token);
    setAuthStatus(token ? 'Sign Out' : 'Log In');
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const handleNavClick = (id) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  const handleClick = () => {
    const token = Cookies.get('login_token');
    if (token) {
      Cookies.remove('login_token');
      window.location.href = '/';
    } else {
      const modalElement = document.getElementById('loginSignUpModal');
      if (modalElement) {
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show();
      }
    }
    setMobileOpen(false);
  };

  return (
    <>
      <Navbar
        expanded={mobileOpen}
        className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}
        expand="lg"
        sticky="top"
      >
        <Container>
          <Navbar.Brand className="navbar-brand-custom">Aashay Jain</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarNav"
            onClick={() => setMobileOpen((o) => !o)}
          />
          <Navbar.Collapse id="navbarNav">
            {/* Close button — only visible on mobile via CSS */}
            <span
              className="mobile-close-btn d-lg-none"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </span>
            <Nav className="ms-auto align-items-lg-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Nav.Item key={item.id}>
                  <span
                    className="nav-link-custom"
                    onClick={() => handleNavClick(item.id)}
                  >
                    {item.name}
                  </span>
                </Nav.Item>
              ))}
              <Nav.Item className="ms-lg-2 mt-2 mt-lg-0">
                <Button
                  id="signin"
                  onClick={handleClick}
                  className={`nav-btn-signin ${isSignedIn ? 'signout' : ''}`}
                  style={{ width: '100%' }}
                >
                  {authStatus}
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Backdrop overlay — closes menu when tapped outside */}
      <div
        className={`mobile-overlay ${mobileOpen ? 'active' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <Model />
    </>
  );
}

export default Head;
