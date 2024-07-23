import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import EducationItem from './EducationItem';

function Education() {
    const education = [
        {
            image: 'manit',
            institute: 'Maulana Azad National Institute of Technology, Bhopal',
            interval: '2020 - 2024',
            status: 'Qualified'
        },
        {
            image: 'school',
            institute: 'St. Marys Sr. Sec. School, Bhopal',
            interval: '2007-2019',
            status: 'Qualified'
        }
    ]
    return (
        <div className='text-center' style={{backgroundColor:'beige'}}>
            <div className='fw-bold fs-1 pt-4 text-success'>
                <FontAwesomeIcon icon={faGraduationCap} className='text-dark'/> Education
            </div>
            <div className='fs-5 pt-1 pb-4 fst-italic text-danger fw-bold px-2'>
            Education is not about learning facts,but The training of mind to think.
            </div>
            <div className='mx-auto pb-4' style={{ width: '70%' }}>
                {
                    education.map((item, index) => (
                        <EducationItem data={item} />
                    ))
                }
            </div>

        </div>
    )
}

export default Education