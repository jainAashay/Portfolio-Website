import React from 'react'
import './Experience.css'
import ExperienceItem from './ExperienceItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenClip } from '@fortawesome/free-solid-svg-icons';
function Experience() {
    const experience=[
        {
            company: "Deutsche Bank",
            timeline : "15 May, 2023 - 7 July, 2023",
            position: 'Summer Intern',
            description: ["Created an Infrastructure Inventory Management System to track, control, optimize usage of resources and lifecycle management of resources with a potential of future cost savings.",
                "Created REST APIs for multiple operations including CRUD.",
                " Implemented the code with Sonar Coding standards and wrote Unit Tests with a high coverage."
            ]
        },
        {
            company: "Flipkart",
            timeline : "18 January, 2024 - 28 June, 2024",
            position : 'SDE-Intern',
            description: [
                "Contributed to the rapid development of applications by performing diverse tasks, including modifying multiple APIs to incorporate additional attributes.Implemented Hystrix Commands for optimised API data retrieval with fault tolerance. Crafted a nested, multi-layered trace payload of purchase orders using data from a trace API to manage the full purchase-order flow effectively.",
                "Developed a rate-limiter for Stream Processing Application, with customized rate limits for individual streams. Implemented configurable options to either wait or drop messages when rate-limits are exceeded, enhancing resource management and streamlining onboarding of new high-load streams without further scaling.",
                "Developed Python scripts to create metrics for fetching message production-rate across Kafka topics, and created a Grafana Dashboard for real-time monitoring and analysis.",
                "Facilitated migration of Azkaban Jobs between clusters, effectively troubleshooting and enhancing performance across numerous tasks"
            ]
        },
        {
            company: "Flipkart",
            timeline : "18 June, 2024 - Present",
            position : 'SDE-1',
            description: [
                
            ]
        }


    ]
  return (
    <div className='bg-dark py-4'>
        <div className='fs-1 fw-bold text-center text-white'>
        <FontAwesomeIcon icon={faPenClip} className='text-success' />  Work Experience
        </div>
<div className="row g-0 pt-2">
            <div className="col-lg-7 mx-auto">
                  
                <ul className="timeline">
                {experience.map((item, index) => (
                    <ExperienceItem data={item} key={index} />
                ))}

                    
                </ul>

            </div>
        </div>
    </div>
    
  )
}

export default Experience