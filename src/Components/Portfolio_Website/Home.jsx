import React from 'react'
import Front from './Front';
import Experience from './Experience';
import Achievements from './Achievements';
import Skills from './Skills.jsx';
import Education from './Education';
import Projects from './Projects';
import Contact from './Contact.jsx';
import Head from './Head';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';

const Divider = () => <hr className="section-divider" />;

function Home() {
    return (
        <>
        <ToastContainer/>
        <Head/>
        <Front />
        <Divider />
        <Experience />
        <Divider />
        <Achievements />
        <Divider />
        <Skills />
        <Divider />
        <Education />
        <Divider />
        <Projects />
        <Divider />
        <Contact />
        <Footer/>
        </>
    )
}

export default Home
