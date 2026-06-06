import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLocationDot, faEnvelope, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const INFO = [
  { icon: faLocationDot, value: 'Bengaluru, India', color: '#F87171' },
  { icon: faEnvelope, value: 'jainaashay123@gmail.com', color: '#60A5FA' },
  { icon: faBriefcase, value: 'SDE-2 · Flipkart', color: '#34D399' },
];

function Front() {
  return (
    <section
      id="home"
      style={{
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0F0E1A 0%, #1A1635 60%, #0E1628 100%)',
        padding: '3.5rem 0 3rem',
      }}
    >
      <Container>
        <Row className="align-items-center gy-5">

          {/* ── Left: intro ── */}
          <Col lg={7} md={12} className="px-4 px-md-3 px-lg-3">
            <span style={{
              display: 'inline-block',
              background: 'rgba(99,102,241,0.18)',
              color: '#A5B4FC',
              fontWeight: 700,
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '0.35rem 0.9rem',
              borderRadius: '999px',
              border: '1px solid rgba(165,180,252,0.3)',
              marginBottom: '1.1rem',
            }}>
              Software Development Engineer 2 · Flipkart
            </span>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#F1F5F9',
              marginBottom: '1.1rem',
            }}>
              Hi, I'm{' '}
              <span style={{
                background: 'linear-gradient(135deg, #818CF8, #C084FC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Aashay Jain
              </span>
            </h1>

            <p style={{
              fontSize: '1.08rem',
              color: '#94A3B8',
              lineHeight: 1.85,
              maxWidth: '560px',
              marginBottom: '1.75rem',
            }}>
              A result-driven SDE with a strong background in{' '}
              <strong style={{ color: '#C084FC' }}>problem-solving, system design,</strong> and back-end development.
              Possesses <strong style={{ color: '#C084FC' }}>2+ years</strong> of experience developing and optimising{' '}
              <strong style={{ color: '#C084FC' }}>microservices</strong>, owning{' '}
              <strong style={{ color: '#C084FC' }}>end-to-end delivery</strong> of complex features, and leveraging{' '}
              <strong style={{ color: '#C084FC' }}>AI-powered development tools</strong> to improve productivity while translating
              business requirements into robust, <strong style={{ color: '#C084FC' }}>highly scalable systems</strong>.
            </p>

            {/* Quick info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
              {INFO.map(({ icon, value, color }) => (
                <div key={value} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <FontAwesomeIcon icon={icon} style={{ color, fontSize: '0.85rem', width: 16 }} />
                  <span style={{ fontSize: '0.92rem', color: '#CBD5E1', fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <Link to="/projects">
                <Button style={{
                  background: 'linear-gradient(135deg, #6366F1, #818CF8)',
                  borderColor: 'transparent',
                  fontWeight: 600,
                  padding: '0.7rem 1.75rem',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 18px rgba(99,102,241,0.45)',
                }}>
                  View Projects <FontAwesomeIcon icon={faArrowRight} className="ms-1" />
                </Button>
              </Link>
              <a href="https://www.linkedin.com/in/aj12345" target="_blank" rel="noreferrer">
                <Button style={{
                  fontWeight: 600, padding: '0.7rem 1.4rem',
                  borderRadius: '8px', fontSize: '0.95rem',
                  background: '#0A66C2', borderColor: '#0A66C2', color: '#fff',
                  boxShadow: '0 4px 12px rgba(10,102,194,0.4)',
                }}>
                  <FontAwesomeIcon icon={faLinkedin} className="me-2" />
                  LinkedIn
                </Button>
              </a>
              <a href="https://github.com/jainAashay" target="_blank" rel="noreferrer">
                <Button style={{
                  fontWeight: 600, padding: '0.7rem 1.4rem',
                  borderRadius: '8px', fontSize: '0.95rem',
                  background: '#1a1a1a', borderColor: 'rgba(255,255,255,0.15)', color: '#fff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                }}>
                  <FontAwesomeIcon icon={faGithub} className="me-2" />
                  GitHub
                </Button>
              </a>
            </div>
          </Col>

          {/* ── Right: photo ── */}
          <Col lg={5} md={12} className="d-flex justify-content-center justify-content-lg-end">
            <div style={{
              width: '100%',
              maxWidth: 380,
              aspectRatio: '3/4',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
              border: '3px solid rgba(255,255,255,0.1)',
              background: '#1E1B4B',
            }}>
              <img
                src={process.env.PUBLIC_URL + '/images/personal.jpg'}
                alt="Aashay Jain"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
              />
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
}

export default Front;
