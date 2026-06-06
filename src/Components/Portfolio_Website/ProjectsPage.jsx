import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProjectItem from './ProjectItem';
import Head from './Head';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';

const ALL_PROJECTS = [
  {
    id: 0,
    image: 'TradePulse',
    heading: 'TradePulse — Crypto Algo-Trading System',
    description: 'Real-time algorithmic trading system for crypto futures on Delta Exchange. Candlestick-based quantitative analysis with configurable strategies and integrated risk management (stop-loss, position sizing, trade-frequency limits). Containerised and deployed on GCP.',
    projectCode: 'https://github.com/jainAashay/AlgoTrade',
    projectLink: 'https://github.com/jainAashay/AlgoTrade',
    tags: ['Python', 'Docker', 'GCP', 'REST APIs', 'WebSockets'],
  },
  {
    id: 1,
    image: 'IPL',
    heading: 'IPL Match Predictor',
    description: 'Predictive model to estimate the winning chance percentage for the batting team at any given moment during the second innings. Achieved training and test accuracy rates exceeding 92%.',
    projectCode: 'https://colab.research.google.com/drive/1cDeFd1XlDBarUTEJJF56IqS2Bcw-8S0d?usp=sharing',
    projectLink: 'https://colab.research.google.com/drive/1cDeFd1XlDBarUTEJJF56IqS2Bcw-8S0d?usp=sharing',
    tags: ['Python', 'Deep Learning', 'scikit-learn'],
  },
  {
    id: 2,
    image: 'bigdataPrivacy',
    heading: 'Privacy in Big Data',
    description: 'Implemented privacy measures for Big Data by integrating Pseudonymization techniques with K-anonymity, L-diversity, and T-closeness. Ensures robust privacy while maintaining data utility.',
    projectCode: 'https://colab.research.google.com/drive/1IjdUGVJa1pdYAZl03s56gKYbNQVd48hG?usp=sharing',
    projectLink: 'https://colab.research.google.com/drive/1IjdUGVJa1pdYAZl03s56gKYbNQVd48hG?usp=sharing',
    tags: ['Python', 'Data Privacy', 'Machine Learning'],
  },
  {
    id: 3,
    image: 'DBB',
    heading: 'Schema Manager',
    description: 'Full-stack web application enabling user authentication and multi-schema data management. Supports upload via Excel, dynamic form entry, view/update/delete, and Excel download.',
    projectCode: 'https://aashay-jain.netlify.app/schema-manager',
    projectLink: 'https://aashay-jain.netlify.app/schema-manager',
    tags: ['React', 'Flask', 'MongoDB'],
  },
  {
    id: 4,
    image: 'nextWord',
    heading: 'Next Words Predictor',
    description: 'NLP model that allows users to input a sentence and select the number of words to predict. Generates contextually relevant and accurate continuations.',
    projectCode: 'https://colab.research.google.com/drive/1mq9Pd1vXcSTw8Jdy7Tk-BZ9Qn08ItMvF?usp=sharing',
    projectLink: 'https://colab.research.google.com/drive/1mq9Pd1vXcSTw8Jdy7Tk-BZ9Qn08ItMvF?usp=sharing',
    tags: ['Python', 'Deep Learning'],
  },
  {
    id: 5,
    image: 'rkg',
    heading: 'Random Quote Generator',
    description: 'Fully responsive ReactJS website integrating with APIs to fetch and display famous quotes organised by categories.',
    projectCode: 'https://github.com/jainAashay/Category-Wise-Quote-Generator-using-ReactJs',
    projectLink: 'https://654689f362a9b2384bdf648d--strong-treacle-39a62b.netlify.app/',
    tags: ['React', 'Bootstrap', 'REST APIs'],
  }
];

function ProjectsPage() {
  return (
    <>
      <ToastContainer />
      <Head />
      <section style={{ padding: '4rem 1rem 5rem', backgroundColor: 'var(--color-bg)', minHeight: '80vh' }}>
        <Container>
          <div style={{ marginBottom: '1rem' }}>
            <Link
              to="/"
              style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}
            >
              ← Back to Home
            </Link>
          </div>
          <h2 className="section-title" style={{ textAlign: 'left' }}>All Projects</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
            A collection of things I've built — from backend systems to ML models.
          </p>
          <Row className="gy-4">
            {ALL_PROJECTS.map((project) => (
              <Col lg={4} md={6} key={project.id}>
                <ProjectItem data={project} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default ProjectsPage;
