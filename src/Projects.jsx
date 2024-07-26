import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import ProjectItem from './ProjectItem';
import './Projects.css';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Projects() {
    const projects = [
        {
            image: 'IPL',
            heading: 'IPL Match Predictor',
            description: 'Developed a predictive model to estimate the winning chance percentage for the batting team at any given moment during the second innings. This model aids in advanced decision-making for team performance analysis. Achieved training and test accuracy rates exceeding 92%.',
            projectCode : 'https://colab.research.google.com/drive/1cDeFd1XlDBarUTEJJF56IqS2Bcw-8S0d?usp=sharing',
            projectLink : 'https://colab.research.google.com/drive/1cDeFd1XlDBarUTEJJF56IqS2Bcw-8S0d?usp=sharing'
        },
        {
            image: 'bigdataPrivacy',
            heading: 'Privacy in Big data',
            description: ' Implemented privacy measures for Big Data by integrating advanced Pseudonymization techniques with K-anonymity, L-diversity, and T-closeness. This solution ensures robust privacy while maintaining data utility.',
            projectCode : 'https://colab.research.google.com/drive/1IjdUGVJa1pdYAZl03s56gKYbNQVd48hG?usp=sharing',
            projectLink : 'https://colab.research.google.com/drive/1IjdUGVJa1pdYAZl03s56gKYbNQVd48hG?usp=sharing'
        },
        {
            image: 'nextWord',
            heading: 'Next Words Predictor',
            description: 'Developed a model that allows users to input a sentence and select the number of words they want to predict. The model then generates a continuation of the sentence based on the input, providing contextually relevant and accurate predictions.',
            projectCode : 'https://colab.research.google.com/drive/1mq9Pd1vXcSTw8Jdy7Tk-BZ9Qn08ItMvF?usp=sharing',
            projectLink : 'https://colab.research.google.com/drive/1mq9Pd1vXcSTw8Jdy7Tk-BZ9Qn08ItMvF?usp=sharing'
        },
        {
            image: 'DBB',
            heading: 'Student Information Manager',
            description: 'Developed a full-stack web application for managing student information with login authentication, enabling users to perform CRUD operations on a Student Information Table. Enhanced the application by adding features for easy data import and preview from CSV files, and implemented advanced filtering options on multiple columns to offer tailored views of student data.',
            projectCode : 'https://aashay26.pythonanywhere.com/records',
            projectLink : 'https://aashay26.pythonanywhere.com/records'
        },
        {
            image: 'rkg',
            heading: 'Random Quote Generator',
            description: 'Created a fully responsive ReactJS website utilizing HTML, Bootstrap, and JavaScript. The site integrates with APIs to fetch and display famous quotes organized by categories. Users can browse quotes by category, providing an engaging and dynamic way to explore inspirational and noteworthy quotes.',
            projectCode : 'https://github.com/jainAashay/Category-Wise-Quote-Generator-using-ReactJs',
            projectLink : 'https://654689f362a9b2384bdf648d--strong-treacle-39a62b.netlify.app/'
        },
        {
            image: 'login',
            heading: 'Login Authentication System',
            description: 'Developed and hosted a responsive webpage that allows users to securely log in to access protected content. The site also features a user registration system with email verification, ensuring secure account creation and user authentication.',
            projectCode : 'https://aashay26.pythonanywhere.com/login',
            projectLink : 'https://aashay26.pythonanywhere.com/login'
        }
    ];
   
    const visibleProjects = projects.slice(0, 3);
    const hiddenProjects = projects.slice(3, projects.length);

 
        const [isToggled, setIsToggled] = useState(true);
      
        const handleClick = () => {
          setIsToggled(!isToggled);
        };
    
        
    return (
        <div style={{ backgroundColor: 'cornflowerblue' }}>
            <div className='py-3 text-center fw-bold fs-1'>
                <FontAwesomeIcon icon={faDesktop} className='fs-2' /> Projects
            </div>
            <div className='container text-center'>
                <div className='row justify-content-around text-center'>
                    {
                        visibleProjects.map((item, index) => (
                            <ProjectItem data={item} key={index} />
                        ))
                    } 
                </div>
                
                <div className='row justify-content-around collapse pb-3 text-center' id="collapseExample" >
                    {
                        hiddenProjects.map((item, index) => (

                            <ProjectItem data={item} key={index} />


                        ))
                    }
                </div>

                <button type="button" className="btn fw-bold mt-2 mb-4" style={{backgroundColor:'hotpink'}} data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={handleClick}>
                   <FontAwesomeIcon icon={faEye} /> {isToggled ? 'View more Projects ...' : 'View Less...'}
                    </button>

            </div>


        </div>
    )
}

export default Projects