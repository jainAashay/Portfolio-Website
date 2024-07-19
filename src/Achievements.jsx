import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import './Achievements.css';
import AchievementItem from './AchievementItem';
function Achievements() {
  const achievements = [
    {
      image: 'Codechef.jpg',
      heading : '4 star Rating at Codechef',
      content: [
        "Achieved Max Rating of 1892 at Codechef"
      ],
      profileLink: 'https://www.codechef.com/users/aj_1000'
    },
    {
      image: 'leetcode.png',
      heading : 'Knight at Leetcode',
      content: [
        "Achieved Max Rating of 2061 at Leetcode"
      ],
      profileLink: 'https://leetcode.com/u/jainaashay123/'
    },
    {
      image: 'codeforces.jpg',
      heading : 'Specialist at Codeforces',
      content: [
        "Achieved Max Rating of 1430 at Codeforces"
      ],
      profileLink: 'https://leetcode.com/u/jainaashay123/'
    },
    {
      image: 'Mettl.jpg',
      heading : 'Mercer | Mettl CodeSmash 1.0',
      content: [
        "Earned a Certificate of Appreciation for achieving an impressive overall rank of 49."
      ]
    },
    {
      image: 'CodechefStarters.jpg',
      heading : 'Codechef Starters 83',
      content: [
        "Attained Global Rank 110 in Codechef Starters 83 Contest."
      ]
    },
    {
      image: 'leetcodeBiweekly.jpg',
      heading : 'Leetcode Biweekly 101',
      content: [
        "Achieved Global Rank 132 in Leetcode Biweekly Contest 101"
      ]
    },

  ]
  return (
    <div className='pb-4' style={{ backgroundColor: 'orchid' }} >
      <div className="text-center fs-1 py-4 fw-bold" style={{ color: 'black' }}>
        <FontAwesomeIcon icon={faTrophy} />&nbsp;Achievements
      </div>
      
      <div className="container achievements">
      {achievements.map((item, index) => (
        
                    <AchievementItem AchievementItem={item} />
                ))}
              
        
      </div>
    </div>
  )
}

export default Achievements