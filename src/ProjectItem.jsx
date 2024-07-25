import React from 'react'
import { useState } from 'react';
function ProjectItem(props) {
  const [showMore, setShowMore] = useState(true);
  const descriptionLimit=200;
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const showDescription = (text) => {
    return showMore ? text.slice(0,descriptionLimit) : text +' ';
  };

  return (
    
<div className='m-3 text-center shadow rounded px-0' style={{width: '20rem',height:'fit-content',backgroundColor:'bisque'}}>
    <img src={process.env.PUBLIC_URL + '/images/Projects/'+props.data.image+'.jpg'}  style={{height:'10rem',width:'100%',display:'block'}} className='rounded' alt="..." />
    <div className='text-center text-dark pb-2 px-2' >
        <h5 className="pt-2 fw-bold">{props.data.heading}</h5>
        <p className='text-justify text-dark px-2' style={{textAlign:'justify'}}>{showDescription(props.data.description)}
        <span onClick={toggleShowMore} className='text-primary fw-bold fst-italic' style={{cursor:'pointer'}}>{showMore ? '...Show More' : 'Show Less...'}</span>
        </p>
        
        
    </div>
    
</div>

    
  )
}

export default ProjectItem