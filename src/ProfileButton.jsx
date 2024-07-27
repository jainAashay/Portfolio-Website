import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

function ProfileButton(props) {
  return (
    <div className="py-2 ps-1">
                    <a href={props.profileLink} target="_blank" className="btn btn-sm btn-primary">View
                        Profile
                        &nbsp;<FontAwesomeIcon icon={faCircleUser}/></a>
                </div>
  )
}

export default ProfileButton