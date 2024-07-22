import React from 'react'

function SkillsItem(props) {
    const items = props.data;
    let active = false;
    
    if (items[0][0] === 'HTML') {
        active = true;
    }
    return (

        <div className="carousel-inner">
            <div className={`carousel-item ${active===true ? 'active' : ''}`} data-bs-interval="2000">
                <div className='row' >

                    {items.map((item, index) => (
                        <>
                            <div className='col-lg-3 col-md-6 col-6 p-2'  key={index}>
                                <div className='text-center'>
                                <img src={'https://img.icons8.com/?size=100&id='+item[1]+'&format=png&color=000000'} alt='' className='p-3' style={{ width: '70%', aspectRatio:'1' }} />
                                </div>
                                <div className='fw-bold text-center text-light'>
                                       {item[0]}
                                </div>
                                
                            </div>
                        </>

                    ))}
                   

                </div>
            </div>
        </div>
    )
}

export default SkillsItem