import React from 'react';
import { Container } from 'react-bootstrap';
import './About.css';

const INFO = [
  { label: 'Location', value: 'Bengaluru, India' },
  { label: 'Email', value: 'jainaashay123@gmail.com' },
  { label: 'Company', value: 'Flipkart' },
  { label: 'Role', value: 'SDE-2' },
];

function About() {
  return (
    <section id="about" className="about-section">
      <Container>
        <h2 className="section-title">About Me</h2>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="about-card">
            {/* Photo — fills full card height */}
            <div className="about-photo-col">
              <img
                src={process.env.PUBLIC_URL + '/images/personal.jpg'}
                alt="Aashay Jain"
                className="about-photo"
              />
            </div>

            {/* Content */}
            <div style={{ padding: '2.5rem', flex: 1 }}>
              <h3 style={{ fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.2rem', fontSize: '1.5rem' }}>
                Aashay Jain
              </h3>
              <p style={{ color: 'var(--color-accent)', fontWeight: 600, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                Software Development Engineer 2 @ Flipkart
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.85, marginBottom: '2rem', fontSize: '0.98rem' }}>
                B.Tech (CSE) graduate from NIT Bhopal. Backend engineer focused on building
                high-throughput distributed systems and microservices. I enjoy solving
                complex engineering challenges — from stream processing pipelines and CQRS
                architectures to annotation-driven libraries and load-tested APIs.
                Passionate about clean system design, measurable impact, and continuous improvement.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {INFO.map(({ label, value }) => (
                  <div key={label}>
                    <span className="about-info-label">{label}</span>
                    <br />
                    <span className="about-info-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default About;
