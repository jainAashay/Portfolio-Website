import React from 'react'
import Front from './Front';
import Experience from './Experience';
import About from './About';
import Achievements from './Achievements';
import Skills from './Skills.jsx';
import Education from './Education';
import Projects from './Projects';
import Contact from './Contact.jsx';
import Head from './Head';
import Footer from './Footer';

function Home() {
    return (
        <>
        <Head/>
        <Front id="home"/>
        <About id="about" />
        <Experience id="experience" />
        <Achievements id="achievements" />
        <Skills id="skills" />
        <Education id="education" />
        <Projects id="projects" />
        <Contact id="contact" />
        <Footer/>
        
        </>
    )
}

export default Home