import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import ProfileButton from './ProfileButton';
function AchievementItem(props) {
    return (
        <div className='row shadow rounded my-2 bg-warning'>
            <div className='col-md-4 py-1'>
                <img src={process.env.PUBLIC_URL + '/images/achievements/' + props.AchievementItem.image} style={{ width: '100%', height: '100%', maxHeight: '35vh',minHeight:'20vh'}} className='rounded' />
            </div>
            <div className='col-md-8 py-1'>
                <div className="fs-4 pt-1 ps-1 fw-bold" style={{color:'blueviolet'}}>
                 {props.AchievementItem.heading}
                    </div>
                <div className="py-2 ps-1 fs-6 fst-italic fw-bold">
                <FontAwesomeIcon icon={faThumbsUp} className='text-danger' /> &nbsp;{props.AchievementItem.content}
                </div>
                {props.AchievementItem.profileLink && <ProfileButton profileLink={props.AchievementItem.profileLink} />}
                
            </div>




        </div>
    )
}

export default AchievementItem