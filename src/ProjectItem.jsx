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
    
<div className='bg-warning col-lg-4 col-md-6 col-sm-12 text-center shadow rounded gx-0 m-3' style={{width: '18rem',height:'fit-content'}}>
    <img src={process.env.PUBLIC_URL + '/images/Projects/'+props.data.image+'.jpg'}  style={{height:'10rem',width:'100%'}} className='px-0 rounded' alt="..." />
    <div className='text-center text-dark pb-2' >
        <h5 className="pt-2 fw-bold">{props.data.heading}</h5>
        <div className='text-center px-2' style={{textAlign:'justify' }}>{showDescription(props.data.description)}</div>
        <div onClick={toggleShowMore} className='text-primary fw-bold fst-italic' style={{cursor:'pointer'}}>{showMore ? 'Show More' : 'Show Less'}</div>
        
    </div>
    
</div>

    
  )
}

export default ProjectItem