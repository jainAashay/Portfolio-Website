import React from 'react';
import Bubble from './Bubble';

function Front() {
  return (
    <div id='home' className='bg-primary' style={{maxWidth:'100%'}}>
      <div className="row no-glutters g-0 fs-1 fw-bold message-bubble">
        <div className="col" style={{ width: '30%' }}>
          <img src={process.env.PUBLIC_URL + '/images/hello.gif'} alt=""
            style={{ borderRadius: '50%', minWidth: '20vh', marginLeft: '15%', marginRight: '10%', width: '60%', minHeight: '50vh', marginTop: '18vh', float: 'right' }}
           />
        </div>

        <div className="col text-light text-center">
           <Bubble/>
          
        </div>
      </div>
    </div>
  );
}

export default Front;
