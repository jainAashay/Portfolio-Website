import React from 'react';

function EducationItem(props) {
  return (
    <div className='row shadow rounded my-3' style={{ backgroundColor: 'black' }} >
      <div className='col-md-4 col-12'>
        <img src={process.env.PUBLIC_URL + '/images/education/' + props.data.image + '.jpg'} alt='' className='rounded py-1' style={{ width: '100%', height: '8rem' }} />
      </div>
      <div className='col-md-8 col-12 text-start pb-2'>
        <div className='fw-bold pt-2' style={{ fontSize: '1.3rem', color: 'aquamarine' }}>
          {props.data.institute}
        </div>
        <hr className='text-light fw-bold opacity-100 me-5' />
        <span className='text-warning fw-bold pb-2' style={{ fontSize: '1.2rem', color: 'aquamarine' }}>
          {props.data.interval + ' '}
        </span>
        <span className='text-primary fw-bold text-danger pb-2' style={{ fontSize: '1.2rem', color: 'aquamarine' }}>
          |
        </span>
        <span className='text-danger fw-bold pb-2' style={{ fontSize: '1.2rem' }}>
          {' ' + props.data.status}
        </span>

      </div>
    </div>
  )
}

export default EducationItem