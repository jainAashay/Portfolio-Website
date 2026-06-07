import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProjectItem from './ProjectItem';

const FEATURED_PROJECTS = [
  {
    id: 0,
    image: 'TradePulse',
    heading: 'TradePulse — Crypto Algo-Trading System',
    description: 'Real-time algorithmic trading system for crypto futures on Delta Exchange with candlestick-based quantitative strategies and integrated risk management. Containerised and deployed on GCP.',
    projectCode: 'https://github.com/jainAashay/AlgoTrade',
    projectLink: 'https://github.com/jainAashay/AlgoTrade',
    tags: ['Python', 'Docker', 'GCP', 'WebSockets','Rest APIs'],
  },
  {
    id: 1,
    image: 'IPL',
    heading: 'IPL Match Predictor',
    description: 'Predictive model estimating winning chance percentage for the batting team during the second innings in real time. Achieved training and test accuracy exceeding 92%.',
    projectCode: 'https://colab.research.google.com/drive/1cDeFd1XlDBarUTEJJF56IqS2Bcw-8S0d?usp=sharing',
    tags: ['Python', 'Deep Learning', 'scikit-learn'],
  },
  {
    id: 2,
    image: 'DataForge',
    heading: 'DataForge — Your Personal API-Accessible Database',
    description: 'Define typed schemas, store structured data, and query it via REST API — all through a clean dashboard. Supports strict field validation, bulk CSV/XLSX ingestion, and type-aware filters.',
    projectCode: 'https://aashay-jain.netlify.app/dataforge',
    projectLink: 'https://aashay-jain.netlify.app/dataforge',
    tags: ['React', 'Flask', 'MongoDB', 'REST API', 'JWT Auth'],
  },
];

function Projects() {
  return (
    <section id="projects" style={{ padding: '4rem 1rem', backgroundColor: '#0F172A' }}>
      <Container>
        <h2 className="section-title">Projects</h2>
        <Row className="gy-4 mb-4">
          {FEATURED_PROJECTS.map((project) => (
            <Col lg={4} md={6} key={project.id}>
              <ProjectItem data={project} />
            </Col>
          ))}
        </Row>
        <div className="text-center mt-2">
          <Link to="/projects">
            <Button
              style={{
                background: 'linear-gradient(135deg, #6366F1, #818CF8)',
                borderColor: 'transparent',
                fontWeight: 600,
                padding: '0.65rem 2rem',
                borderRadius: '8px',
                boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
              }}
            >
              See All Projects →
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default Projects;
