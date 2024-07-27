import React from 'react'

function FooterItem(props) {
  return (
    <div className='col-lg-2 col-md-4 col-12 py-3 fw-bold fs-6'>
           <a href={'#'+props.item} className='text-light'>{props.item}</a> 
          </div>
  )
}

export default FooterItem