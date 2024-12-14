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
        <Front/>
        <About/>
        <Experience/>
        <Achievements/>
        <Skills/>
        <Education/>
        <Projects/>
        <Contact/>
        <Footer/>
        
        </>
    )
}

export default Home