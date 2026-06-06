import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const FOOTER_LINKS = ['Experience', 'Achievements', 'Skills', 'Education', 'Projects', 'Contact'];

function scrollTo(id) {
  const el = document.getElementById(id.toLowerCase());
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

const SOCIALS = [
  { icon: faLinkedin, href: 'https://www.linkedin.com/in/aj12345', label: 'LinkedIn', hoverColor: '#60A5FA' },
  { icon: faGithub, href: 'https://github.com/jainAashay', label: 'GitHub', hoverColor: '#D1D5DB' },
  { icon: faCode, href: 'https://leetcode.com/u/jainaashay123/', label: 'LeetCode', hoverColor: '#FCD34D' },
];

function Footer() {
  return (
    <footer style={{ backgroundColor: '#1E1B4B', color: '#D1D5DB', padding: '3.5rem 1rem 1.75rem', borderTop: '6px solid #4338CA' }}>
      <Container>
        <Row className="gy-4 mb-4">

          {/* Brand + bio */}
          <Col md={4} className="text-center text-md-start">
            <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>
              Aashay Jain
            </div>
            <p style={{ color: '#9CA3AF', fontSize: '0.97rem', lineHeight: 1.8, marginBottom: '1.1rem' }}>
              SDE-2 at Flipkart. Building distributed systems
              and microservices at scale. Based in Bengaluru, India.
            </p>
            {/* Social icons */}
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              {SOCIALS.map(({ icon, href, label, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{ color: '#6B7280', fontSize: '1.25rem', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
                >
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </Col>

          {/* Navigation */}
          <Col md={4} className="text-center text-md-center">
            <div style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6366F1', marginBottom: '1rem' }}>
              Navigation
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem 1.25rem', justifyContent: 'center' }}>
              {FOOTER_LINKS.map((item) => (
                <span
                  key={item}
                  onClick={() => scrollTo(item)}
                  style={{ color: '#9CA3AF', fontSize: '1rem', cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                >
                  {item}
                </span>
              ))}
            </div>
          </Col>

          {/* Connect */}
          <Col md={4} className="text-center text-md-end">
            <div style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6366F1', marginBottom: '1rem' }}>
              Connect
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', alignItems: 'inherit' }}>
              <a href="mailto:jainaashay123@gmail.com"
                style={{ color: '#9CA3AF', fontSize: '1rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
              >
                jainaashay123@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/aj12345" target="_blank" rel="noreferrer"
                style={{ color: '#9CA3AF', fontSize: '1rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#60A5FA')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
              >
                linkedin.com/in/aj12345
              </a>
              <a href="https://github.com/jainAashay" target="_blank" rel="noreferrer"
                style={{ color: '#9CA3AF', fontSize: '1rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D1D5DB')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
              >
                github.com/jainAashay
              </a>
            </div>
          </Col>

        </Row>

        <hr style={{ borderColor: '#1F2937', margin: '1.25rem 0 1rem' }} />

        <div style={{ textAlign: 'center', color: '#4B5563', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} Aashay Jain. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
