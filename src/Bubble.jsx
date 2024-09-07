import React from 'react'
import './Bubble.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
function Bubble() {
  
  return (
    <div className='bubble bubble-bottom-left'>

            <div className='fs-2 fw-bold pt-2'>
                    Hi There ! <br/><br/>
                    I'm Aashay Jain 
            </div>

            <a href="https://www.linkedin.com/in/aashay-jain-132b0b227" target="_blank" rel="noopener noreferrer" >
            <FontAwesomeIcon icon={faLinkedin} size="2x" className='pt-4 px-3 social-icon'  />
            </a>
            <a href="https://github.com/jainAashay/" target="_blank" rel="noopener noreferrer" >
            <FontAwesomeIcon icon={faGithub} size="2x" className='pt-4 px-3 social-icon' color='black'/>
            </a>
            <a href="https://instagram.com/aashay_jain20?igshid=ZDdkNTZiNTM=" target="_blank" rel="noopener noreferrer" >
            <FontAwesomeIcon icon={faInstagram} size="2x" className='pt-4 px-3 social-icon'  color='red'  />
            </a>

          </div>
  )
}

export default Bubble