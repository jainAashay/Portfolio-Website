import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import './Achievements.css';
import AchievementItem from './AchievementItem';
import { useInView } from 'react-intersection-observer';
import { useTransition, animated, useTrail } from '@react-spring/web';
function Achievements() {
  const achievements = [
    {
      id: 0,
      image: 'Codechef.jpg',
      heading: '4 star Rating at Codechef',
      content: [
        "Achieved Max Rating of 1892 at Codechef"
      ],
      profileLink: 'https://www.codechef.com/users/aj_1000'
    },
    {
      id: 1,
      image: 'leetcode.png',
      heading: 'Knight at Leetcode',
      content: [
        "Achieved Max Rating of 2061 at Leetcode"
      ],
      profileLink: 'https://leetcode.com/u/jainaashay123/'
    },
    {
      id: 2,
      image: 'codeforces.jpg',
      heading: 'Specialist at Codeforces',
      content: [
        "Achieved Max Rating of 1430 at Codeforces"
      ],
      profileLink: 'https://leetcode.com/u/jainaashay123/'
    },
    {
      id: 3,
      image: 'Mettl.jpg',
      heading: 'Mercer | Mettl CodeSmash 1.0',
      content: [
        "Earned a Certificate of Appreciation for achieving an impressive overall rank of 49."
      ]
    },
    {
      id: 4,
      image: 'CodechefStarters.jpg',
      heading: 'Codechef Starters 83',
      content: [
        "Attained Global Rank 110 in Codechef Starters 83 Contest."
      ]
    },
    {
      id: 5,
      image: 'leetcodeBiweekly.jpg',
      heading: 'Leetcode Biweekly 101',
      content: [
        "Achieved Global Rank 132 in Leetcode Biweekly Contest 101"
      ]
    },

  ];

  const [ref, inView] = useInView({
    triggerOnce: true,      // Trigger the animation only once
    threshold: 0.1,         // Trigger when 10% of the component is in view
  });

  const trail = useTrail(achievements.length, {
    opacity: inView ? 1 : 0,  // Animate opacity based on inView
    transform: inView ? 'translateY(0px)' : 'translateY(-20px)',
    config: { duration: 500 },
    trail: 500,  // Delay between items (500 milliseconds)
  });

  return (
    <div className='pb-4' style={{ backgroundColor: 'orchid' }} >
      <div className="text-center fs-1 py-4 fw-bold" style={{ color: 'black' }}>
        <FontAwesomeIcon icon={faTrophy} />&nbsp;Achievements
      </div>

      <div ref={ref} className="container achievements">

      {trail.map((style, index) => {
          const achievement = achievements[index];
          
          return (
            <animated.div key={achievement.id} style={style}>
              <AchievementItem AchievementItem={achievement} />
            </animated.div>
          );
        })}
      </div>
    </div>
  )
}

export default Achievements