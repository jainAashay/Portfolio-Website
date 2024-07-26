import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrin } from '@fortawesome/free-solid-svg-icons';

import './App.css'; // Custom styles if needed

function About() {
  return (
    <div id="about" style={{ backgroundColor: 'hotpink' }}>
      
        <div className="text-center fs-1 fw-bold py-4">
          <FontAwesomeIcon icon={faGrin} className="text" />&nbsp; About Me
        </div>
        <div className="container pt-2 pb-5" style={{width:'80%'}}>
        <div className="row text-center bg-light shadow rounded" >
          <div className="col-md-4 py-3 align-center">
            <img src={process.env.PUBLIC_URL + '/images/personal.jpg'} alt="Personal" className="rounded" style={{width:'100%',height:'100%'}} />
          </div>
          <div className="col-md-8 fs-5 py-3 pe-3">
            <h2 className="fw-bold pb-2">I'm Aashay</h2>
            <h4 className="fw-bold mb-3">A passionate Programmer and Developer</h4>
            <p className='px-2 fst-italic' style={{ fontSize: 'large', textAlign:'justify' }}>
              I am a BTech graduate from MANIT, Bhopal. A results-driven and innovative problem solver with the ability to translate business requirements into technical solutions. Also worked as a Technology Intern, collaborating with teams to develop applications. Proficient in Data Structures and Algorithms, Full Stack Web Development with strong expertise in multiple programming languages and frameworks. I am passionate about continuously improving my skills.
            </p>
            <div className="row fw-bold" style={{ fontSize: 'large' }}>
              <div className="col-md-8 col-sm-12 py-1">
                <span style={{ color: 'rgb(103, 16, 175)' }}>Email</span> : jainaashay123@gmail.com
              </div>
              <div className="col-md-4 col-sm-12 py-1">
                <span style={{ color: 'rgb(103, 16, 175)' }}>Age</span> : 22
              </div>
            </div>
            <div className="row" style={{ fontSize: 'large' }}>
              <div className="col-md-8 col-sm-12 fw-bold py-1">
                <span style={{ color: 'rgb(103, 16, 175)' }}>Phone</span> : 9111508045
              </div>
              <div className="col-md-4 col-sm-12 fw-bold py-1">
                <span style={{ color: 'rgb(103, 16, 175)' }}>Place</span> : Bhopal
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;