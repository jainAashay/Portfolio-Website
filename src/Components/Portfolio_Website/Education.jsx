import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Education.css';

function Education() {
  return (
    <section id="education" style={{ padding: '4rem 1rem', backgroundColor: '#111827' }}>
      <Container>
        <h2 className="section-title">Education</h2>
        <Row className="justify-content-center">
          <Col lg={7} md={9}>
            <div className="edu-card">
              {/* Logo */}
              <div className="edu-logo">
                <img
                  src={process.env.PUBLIC_URL + '/images/education/manit.jpg'}
                  alt="NIT Bhopal"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>

              {/* Content */}
              <div style={{
                padding: '1.5rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderLeft: '4px solid var(--color-accent)',
                flex: 1,
              }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text)', marginBottom: '0.3rem' }}>
                  B.Tech, Computer Science & Engineering
                </div>
                <div style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.92rem', marginBottom: '0.4rem' }}>
                  NIT Bhopal (MANIT)
                </div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>
                  Nov 2020 – Jun 2024 &nbsp;·&nbsp; GPA: 8.26 / 10
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Education;
