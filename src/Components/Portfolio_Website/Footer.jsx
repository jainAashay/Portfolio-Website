import React from 'react'
import FooterItem from './FooterItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    const links=['About','Experience','Skills','Education','Projects','Contact'];

  return (
    <div style={{backgroundColor:'blueviolet'}}>
        <div className='container'>
        <div className='pt-5 pb-3 row justify-content-around text-center mx-3'>
          {links.map((item,index)=>(
            <FooterItem item={item} key={index}/>
          ))}
       </div>

       <hr className='text-light'/>

       <div className='text-center text-light pt-3 pb-5'>
       I am a Final year student at MANIT,Bhopal. A Results-Driven and innovative problem solver with ability to translate business requirements into technical solutions. Also Worked as a Technology Intern, collaborating with teams to develop applications. Proficient in Data Structures and Algorithms, Full Stack Web Development with strong expertise in multiple programming languages and frameworks. I am a passionate Programmer and Developer, working to continuously to improve my skills.
       </div>
        </div>
        <div className='text-center text-light pb-5'>
            <a href='https://instagram.com/aashay_jain20?igshid=ZDdkNTZiNTM=' className='px-4 text-light'><FontAwesomeIcon icon={faInstagram} size='2x' /></a>
            <a href='https://www.linkedin.com/in/aashay-jain-132b0b227' className='px-4  text-light'><FontAwesomeIcon icon={faLinkedin} size='2x'/></a>
            <a href='https://github.com/jainAashay/' className='px-4 text-light'><FontAwesomeIcon icon={faGithub} size='2x' /></a>
        </div>
       
    </div>
  )
}

export default Footer