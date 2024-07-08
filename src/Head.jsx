import React from 'react'
import './Head.css'
import './NavItems'
import NavItems from './NavItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';

export function Head() {
  const items=["Home","About","Experience","Achievements","Skills","Contact"]
  return (
    <nav className="navbar navbar-expand-lg bg-warning">
  <div className="container-fluid">
    <a className="navbar-brand fw-bold fs-4 ps-2" href="#">Aashay Jain</a>
    <button className="navbar-toggler bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <FontAwesomeIcon icon={ faBars } className='text-white'/>
    </button>
    <div className="collapse navbar-collapse fs-5" id="navbarNav">
      <ul className="navbar-nav ms-auto fw-bold">
      {items.map((item, index) => (
           <NavItems name={item} />
          ))}
        <li className="nav-item px-1 mt-1 align-center text-center">
          <a className="btn btn-primary fw-bold">
              Sign In
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Head;

