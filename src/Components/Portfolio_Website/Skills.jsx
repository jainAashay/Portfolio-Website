import React from 'react';
import './Skills.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import SkillsItem from './SkillsItem';
function Skills() {

  const skills = ['HTML', 'CSS', 'Javascript', 'ReactJs', 'Bootstrap', 'MongoDB', 'MySQL', 'C++', 'Java', 'Python', 'Nodejs', 'Spring Boot', 'Git', 'Full Stack development', 'Machine Learning', 'Flask', 'C', 'Debugging', 'Linux', 'Numpy', 'Jira', 'Php', 'DBMS', 'Rest Apis'];
  const groupedSkills = [];
  const ids = ['20909', '3BTBsJs5myRy', '108784', '123603', 'PndQWK6M1Hjo', '74402', 'UFXRpPFebwa2', 'TpULddJc4gTh', '13679', '13441', 'hsPbhkOH4FMe', '90519', '52539', 'uE2XryncuEok', '114322', 'ewGOClUtmFX4', 'shQTXiDQiQVR', 'v7BkjmFjgswL', 'fG5Tnj4ARIoI', 'aR9CXyMagKIS', 'oROcPah5ues6', 'fAMVO_fuoOuC', '31478', '4jPFChei3uGs'];
  const skillsWithIds = skills.map((skill, index) => [skill, ids[index]]);

  for (let i = 0; i < skillsWithIds.length; i += 8) {
    groupedSkills.push(skillsWithIds.slice(i, i + 8));
  }
  return (
    <div id='skills' className="pb-5" style={{ backgroundColor: 'coral' }}>

      <div className='text-center fw-bold fs-1 text-dark py-3'>
        <FontAwesomeIcon icon={faCode} />  Skills
      </div>

      <div className='container-fluid skills text-center bg-dark shadow rounded pb-3'>
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {groupedSkills.map((item, index) => (

              <SkillsItem data={item} key={index} />
            ))}

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Skills