import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import EducationItem from './EducationItem';
import { useInView } from 'react-intersection-observer';

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
  ];

  const { ref, inView } = useInView({
    triggerOnce: true, // Run only once when the element comes into view
    threshold: 0.1, // Percentage of the element that must be visible
  });

  // State to manage which items should be visible
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    if (inView) {
      education.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, index]);
        }, index * 500); 
      });
    }
  }, [inView, education]);

  return (
    <div className='text-center' style={{ backgroundColor: 'beige' }}>
      <div className='fw-bold fs-1 pt-4 text-success'>
        <FontAwesomeIcon icon={faGraduationCap} className='text-dark' /> Education
      </div>
      <div className='fs-5 pt-1 pb-4 fst-italic text-danger fw-bold px-2'>
        Education is not about learning facts, but the training of the mind to think.
      </div>
      <div className='mx-auto pb-4' style={{ width: '70%' }} ref={ref}>
        {education.map((item, index) => (
          <div
            key={index}
            style={{
              opacity: visibleItems.includes(index) ? 1 : 0,
              transition: 'opacity 1s ease-in',
              transitionDelay: `${index*0.2}s`, // Optional: Stagger transition delay
            }}
          >
            <EducationItem data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Education;
