import { useSpring,animated } from '@react-spring/web';
import React from 'react'
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

function ProjectItem(props) {
  const [showMore, setShowMore] = useState(true);
  const descriptionLimit=200;
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once when the component first comes into view
  });

  const slideInFromLeft = useSpring({
    transform: inView ? 'translateX(0%)' : 'translateX(-100%)',
    opacity: inView ? 1 : 0,
    config: { tension: 80 } // You can adjust the animation config
  });

  const slideInFromRight = useSpring({
    transform: inView ? 'translateX(0%)' : 'translateX(100%)',
    opacity: inView ? 1 : 0,
    config: { tension: 80 } // You can adjust the animation config
  });

  const animationStyle = props.data.id % 3 === 0 
    ? slideInFromLeft 
    : (props.data.id % 3 === 2 ? slideInFromRight : {});


  const showDescription = (text) => {
    return showMore ? text.slice(0,descriptionLimit) : text +' ';
  };

  return (
    
<animated.div ref={ref} className='col-sm-12 col-4 my-3 shadow rounded px-0' style={{width: '20rem',height:'fit-content',backgroundColor:'bisque',...animationStyle}}>
    <img src={process.env.PUBLIC_URL + '/images/Projects/'+props.data.image+'.jpg'}  style={{height:'10rem',width:'100%',display:'block'}} className='rounded' alt="..." />
    <div className='text-center text-dark pb-2 px-2' >
        <h5 className="pt-2 fw-bold">{props.data.heading}</h5>
        <p className='text-justify text-dark px-2' style={{textAlign:'justify'}}>{showDescription(props.data.description)}
        <span onClick={toggleShowMore} className='text-primary fw-bold fst-italic' style={{cursor:'pointer'}}>{showMore ? '...Show More' : 'Show Less...'}</span>
        </p>
        
        
    </div>
    <div>
       <a href={props.data.projectCode} target='_blank' rel="noreferrer" className='btn btn-primary btn-sm float-start m-2'>Project Code</a>
       <a href={props.data.projectLink} target='_blank' rel="noreferrer" className='btn btn-primary btn-sm float-end m-2'>Live Project</a>
    </div>
    
</animated.div>

    
  )
}

export default ProjectItem