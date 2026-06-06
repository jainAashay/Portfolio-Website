import React from 'react';
import { faTrophy, faMedal, faAward, faCode } from '@fortawesome/free-solid-svg-icons';
import AchievementItem from './AchievementItem';

const ACHIEVEMENTS = [
  {
    id: 0,
    icon: faAward,
    platform: 'Flipkart',
    title: 'Mission Impossible Award',
    description: 'Individual recognition for exceptional impact on the Dispatch Optimisation initiative — one of the highest individual honours at Flipkart.',
    link: 'https://drive.google.com/file/d/1bE-WvtqI2_8aT6IVfiNj4MnHEHk3jOxM/view?usp=drivesdk',
    linkType: 'certificate',
  },
  {
    id: 1,
    icon: faMedal,
    platform: 'Flipkart',
    title: 'Ace Alliance Award',
    description: 'Team award for outstanding contribution to FKI on TaaS — recognised for cross-functional collaboration and delivery excellence.',
    link: 'https://drive.google.com/file/d/1aJIKoKXU04VsDZD73YakUEHtJYQ4Sovx/view?usp=drivesdk',
    linkType: 'certificate',
  },
  {
    id: 2,
    icon: faCode,
    platform: 'LeetCode',
    title: 'Knight — Max Rating 2061',
    description: 'Achieved Knight rank on LeetCode with a peak contest rating of 2061, placing among the top competitive programmers globally.',
    link: 'https://leetcode.com/u/jainaashay123/',
    linkType: 'profile',
  },
  {
    id: 3,
    icon: faTrophy,
    platform: 'Codeforces',
    title: 'Specialist — Max Rating 1430',
    description: 'Earned Specialist rank on Codeforces with a peak rating of 1430 through consistent performance in algorithmic contests.',
    link: 'https://codeforces.com/profile/jainaashay123',
    linkType: 'profile',
  },
  {
    id: 4,
    icon: faTrophy,
    platform: 'CodeChef',
    title: '4-Star — Max Rating 1892',
    description: 'Attained 4-star status on CodeChef with a peak rating of 1892, competing in monthly long challenges and cook-offs.',
    link: 'https://www.codechef.com/users/aj_1000',
    linkType: 'profile',
  },
  {
    id: 5,
    icon: faMedal,
    platform: 'Mercer | Mettl',
    title: 'CodeSmash 1.0 — Rank 49',
    description: 'Secured an overall rank of 49 in CodeSmash 1.0 — a national-level competitive programming contest, earning a Certificate of Appreciation.',
    link: null,   // user to provide link
    linkType: 'certificate',
  },
];

function Achievements() {
  return (
    <section id="achievements" style={{ padding: '4rem 1rem', backgroundColor: '#0F172A' }}>
      <div className="container">
        <h2 className="section-title">Achievements</h2>
        <div className="row">
          {ACHIEVEMENTS.map((item) => (
            <AchievementItem data={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
