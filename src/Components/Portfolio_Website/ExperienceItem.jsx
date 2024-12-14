import React from 'react'
import './Experience.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
import './ExperienceItem.css';

function ExperienceItem(props) {

  const { ref, inView } = useInView({
    triggerOnce: true, // Run only once when the element comes into view
    threshold: 0.1, // Percentage of the element that must be visible
  });

  const transitionClass = props.data.id % 2 == 0 ? 'slide-in-left' : 'slide-in-right';

  return (
    <li ref={ref} className={`timeline-item bg-white rounded ml-3 p-4 shadow ${inView ? transitionClass : ''}`}>
                        <div className="timeline-arrow"></div>
                        <div className='row'>
  <div className='col-10 d-flex flex-column'>
    <h2 className="h5 mb-0" style={{color:'magenta'}}>{props.data.position + ', '+ props.data.company}</h2>
    <span className="small text-primary fw-bold fst-italic">
      <i className="fa fa-clock-o mr-1"></i>{props.data.timeline}
    </span>
  </div>
  <div className='col-2'>
    <img className='mb-0 shadow rounded' src={process.env.PUBLIC_URL + '/images/experience/'+props.data.company+'.jpg'} alt="" style={{width:'3rem',height:'3rem',float:'right'}}/>
  </div>
</div>

     <div className="text-small mt-2 font-weight-light">
     {props.data.description.map((item, index) => (
                    
                    <div className='pb-2' key={index}>
                    <FontAwesomeIcon icon={faThumbsUp} className='text-success' /> &nbsp;
                    <span > {item}</span>  
                    
      
                    </div>
                    
                ))}
      
      </div>                   
        
    </li>
  )
}

export default ExperienceItem