# Portfolio Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernize the portfolio website with a light/neutral professional theme (off-white base, indigo accent, Inter font), update all content from the resume as source of truth, and add a dedicated /projects page — with zero backend API changes.

**Architecture:** Pure frontend UI revamp. All React components are rewritten in-place; existing API calls, auth logic, cookie handling, and SchemaManager routes remain untouched. A new `ProjectsPage.jsx` component is added with a corresponding `/projects` route in `App.js`.

**Tech Stack:** React 18, React-Bootstrap 2, FontAwesome, react-intersection-observer, Inter (Google Font via CSS @import)

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Modify | `src/index.css` | Inter font import, CSS custom properties (colors, shadows) |
| Modify | `src/Components/Portfolio_Website/Head.jsx` | Sticky white navbar with scroll shadow, indigo active state |
| Modify | `src/Components/Portfolio_Website/Head.css` | Navbar styles |
| Modify | `src/Components/Portfolio_Website/Front.jsx` | Hero section: name + title + tagline + skill tags + CTAs |
| Modify | `src/Components/Portfolio_Website/About.jsx` | Two-column card, updated info (Bengaluru, updated email) |
| Modify | `src/Components/Portfolio_Website/About.css` | About section styles |
| Modify | `src/Components/Portfolio_Website/Experience.jsx` | Vertical timeline, all 4 roles with full bullets from resume |
| Modify | `src/Components/Portfolio_Website/ExperienceItem.jsx` | White card with indigo accent |
| Modify | `src/Components/Portfolio_Website/Experience.css` | Timeline styles |
| Modify | `src/Components/Portfolio_Website/Achievements.jsx` | Grid of 6 achievement cards |
| Modify | `src/Components/Portfolio_Website/AchievementItem.jsx` | Achievement card design |
| Modify | `src/Components/Portfolio_Website/Skills.jsx` | Two-group tag-pill layout (Core + Tools & Concepts) |
| Modify | `src/Components/Portfolio_Website/Education.jsx` | Single compact card: NIT Bhopal |
| Modify | `src/Components/Portfolio_Website/Projects.jsx` | 3 featured cards + "See All Projects →" button |
| Modify | `src/Components/Portfolio_Website/ProjectItem.jsx` | Modern project card |
| Create | `src/Components/Portfolio_Website/ProjectsPage.jsx` | All 7 projects in responsive grid |
| Modify | `src/Components/Portfolio_Website/Contact.jsx` | Visual update, same API/toast logic |
| Modify | `src/Components/Portfolio_Website/Footer.jsx` | Updated bio, updated social links |
| Modify | `src/App.js` | Add `/projects` route |

---

## Task 1: Global Theme Foundation

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace index.css with Inter font + CSS variables**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --color-bg: #F8F9FA;
  --color-surface: #FFFFFF;
  --color-accent: #4F46E5;
  --color-accent-hover: #4338CA;
  --color-text: #1A1A2E;
  --color-text-muted: #6B7280;
  --color-border: #E5E7EB;
  --shadow-card: 0 2px 16px rgba(0, 0, 0, 0.08);
  --shadow-card-hover: 0 8px 32px rgba(0, 0, 0, 0.12);
  --radius-card: 12px;
  --radius-pill: 999px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--color-bg);
  color: var(--color-text);
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 48px;
  height: 4px;
  background: var(--color-accent);
  border-radius: 2px;
  margin: 0.5rem auto 0;
}

.section-wrapper {
  padding: 5rem 1rem;
  background-color: var(--color-bg);
}

.section-wrapper-alt {
  padding: 5rem 1rem;
  background-color: var(--color-surface);
}

.skill-tag {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-pill);
  font-size: 0.85rem;
  font-weight: 500;
  background-color: #EEF2FF;
  color: var(--color-accent);
  border: 1px solid #C7D2FE;
  margin: 0.25rem;
}
```

- [ ] **Step 2: Verify the dev server is running and check the base font changed**

Run: `cd /Users/aashay.jain/Downloads/claude-projects/Portfolio-Website-master && npm start`
Expected: Browser opens at http://localhost:3000 with Inter font applied to body text.

- [ ] **Step 3: Commit**

```bash
cd /Users/aashay.jain/Downloads/claude-projects/Portfolio-Website-master
git add src/index.css
git commit -m "style: add Inter font and CSS custom properties for design system"
```

---

## Task 2: Navbar Redesign

**Files:**
- Modify: `src/Components/Portfolio_Website/Head.jsx`
- Modify: `src/Components/Portfolio_Website/Head.css`

- [ ] **Step 1: Replace Head.css**

```css
.navbar-custom {
  background-color: var(--color-surface) !important;
  border-bottom: 1px solid var(--color-border);
  transition: box-shadow 0.3s ease;
  padding: 0.75rem 1rem;
}

.navbar-custom.scrolled {
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  border-bottom-color: transparent;
}

.navbar-brand-custom {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-text) !important;
  letter-spacing: -0.02em;
}

.nav-link-custom {
  color: var(--color-text-muted) !important;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem 1rem !important;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
  cursor: pointer;
}

.nav-link-custom:hover {
  color: var(--color-accent) !important;
  background-color: #EEF2FF;
}

.nav-btn-signin {
  background-color: var(--color-accent) !important;
  border-color: var(--color-accent) !important;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 8px;
  padding: 0.45rem 1.2rem;
  transition: background 0.2s;
}

.nav-btn-signin:hover {
  background-color: var(--color-accent-hover) !important;
  border-color: var(--color-accent-hover) !important;
}

.nav-btn-signin.signout {
  background-color: #EF4444 !important;
  border-color: #EF4444 !important;
}

.nav-btn-signin.signout:hover {
  background-color: #DC2626 !important;
  border-color: #DC2626 !important;
}

@media (max-width: 991px) {
  .navbar-collapse {
    padding: 1rem 0;
  }
  .nav-link-custom {
    padding: 0.5rem 0.5rem !important;
  }
}
```

- [ ] **Step 2: Replace Head.jsx**

```jsx
import React, { useState, useEffect } from 'react';
import './Head.css';
import Model from './Model_Login';
import Cookies from 'js-cookie';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NAV_ITEMS = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Experience', id: 'experience' },
  { name: 'Achievements', id: 'achievements' },
  { name: 'Projects', id: 'projects' },
  { name: 'Contact', id: 'contact' },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function Head() {
  const [authStatus, setAuthStatus] = useState('Log In');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const token = Cookies.get('login_token');
    setIsSignedIn(!!token);
    setAuthStatus(token ? 'Sign Out' : 'Log In');
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    const token = Cookies.get('login_token');
    if (token) {
      Cookies.remove('login_token');
      window.location.href = '/';
    } else {
      const modalElement = document.getElementById('loginSignUpModal');
      if (modalElement) {
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  };

  return (
    <>
      <Navbar className={`navbar-custom ${scrolled ? 'scrolled' : ''}`} expand="lg" sticky="top">
        <Container>
          <Navbar.Brand className="navbar-brand-custom">Aashay Jain</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto align-items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Nav.Item key={item.id}>
                  <span
                    className="nav-link-custom"
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.name}
                  </span>
                </Nav.Item>
              ))}
              <Nav.Item className="ms-2">
                <Button
                  id="signin"
                  onClick={handleClick}
                  className={`nav-btn-signin ${isSignedIn ? 'signout' : ''}`}
                >
                  {authStatus}
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Model />
    </>
  );
}

export default Head;
```

- [ ] **Step 3: Verify in browser**

Expected: White navbar at top, shadow appears on scroll, nav links are dark/muted, hover shows indigo, hamburger works on mobile.

- [ ] **Step 4: Commit**

```bash
git add src/Components/Portfolio_Website/Head.jsx src/Components/Portfolio_Website/Head.css
git commit -m "feat: redesign navbar — white sticky with scroll shadow, indigo accent"
```

---

## Task 3: Hero Section

**Files:**
- Modify: `src/Components/Portfolio_Website/Front.jsx`

- [ ] **Step 1: Replace Front.jsx with new hero**

```jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const HERO_SKILLS = [
  'Java', 'Apache Kafka', 'Elasticsearch', 'Microservices',
  'System Design', 'Dropwizard', 'Docker', 'Kubernetes',
  'Design Patterns', 'REST APIs', 'MySQL', 'Python',
];

function Front() {
  return (
    <section
      id="home"
      style={{
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--color-bg)',
        padding: '4rem 0',
      }}
    >
      <Container>
        <Row className="align-items-center gy-5">
          {/* Left: Text */}
          <Col lg={7} md={12}>
            <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
              SOFTWARE DEVELOPMENT ENGINEER
            </p>
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                color: 'var(--color-text)',
                marginBottom: '1.25rem',
              }}
            >
              Hi, I'm{' '}
              <span style={{ color: 'var(--color-accent)' }}>Aashay Jain</span>
            </h1>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.75,
                maxWidth: '540px',
                marginBottom: '2rem',
              }}
            >
              Backend SDE at Flipkart building high-throughput distributed systems and microservices.
              I bring deep expertise in event-driven architecture, stream processing, and scalable system design.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <Link to="/projects">
                <Button
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    borderColor: 'var(--color-accent)',
                    fontWeight: 600,
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                  }}
                >
                  View Projects <FontAwesomeIcon icon={faArrowRight} className="ms-1" />
                </Button>
              </Link>
              <a
                href="https://www.linkedin.com/in/aj12345"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="outline-secondary"
                  style={{
                    fontWeight: 600,
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                >
                  <FontAwesomeIcon icon={faLinkedin} className="me-2" style={{ color: '#0A66C2' }} />
                  LinkedIn
                </Button>
              </a>
              <a
                href="https://github.com/jainAashay"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="outline-secondary"
                  style={{
                    fontWeight: 600,
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                >
                  <FontAwesomeIcon icon={faGithub} className="me-2" />
                  GitHub
                </Button>
              </a>
            </div>
          </Col>

          {/* Right: Skill tags */}
          <Col lg={5} md={12} className="text-center text-lg-start">
            <div
              style={{
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-card)',
                boxShadow: 'var(--shadow-card)',
                padding: '2rem',
                display: 'inline-block',
                maxWidth: '100%',
              }}
            >
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                Tech I Work With
              </p>
              <div>
                {HERO_SKILLS.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Front;
```

- [ ] **Step 2: Verify in browser**

Expected: Clean two-column hero. Left shows name in large font, indigo-colored "Aashay Jain", tagline below, three buttons. Right shows a white card with skill tags. On mobile (resize window to <576px), columns stack vertically.

- [ ] **Step 3: Commit**

```bash
git add src/Components/Portfolio_Website/Front.jsx
git commit -m "feat: replace hero section with modern two-column layout and skill tags"
```

---

## Task 4: About Section

**Files:**
- Modify: `src/Components/Portfolio_Website/About.jsx`
- Modify: `src/Components/Portfolio_Website/About.css`

- [ ] **Step 1: Replace About.css**

```css
.about-section {
  padding: 5rem 1rem;
  background-color: var(--color-surface);
}

.about-card {
  background: var(--color-surface);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

.about-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 260px;
  max-height: 380px;
  border-radius: var(--radius-card) 0 0 var(--radius-card);
}

.about-info-label {
  color: var(--color-accent);
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.about-info-value {
  color: var(--color-text);
  font-weight: 500;
}

@media (max-width: 767px) {
  .about-photo {
    border-radius: var(--radius-card) var(--radius-card) 0 0;
    max-height: 240px;
  }
}
```

- [ ] **Step 2: Replace About.jsx**

```jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
        <Row className="justify-content-center">
          <Col xl={9} lg={11}>
            <div className="about-card">
              <Row className="g-0">
                <Col md={4}>
                  <img
                    src={process.env.PUBLIC_URL + '/images/personal.jpg'}
                    alt="Aashay Jain"
                    className="about-photo"
                  />
                </Col>
                <Col md={8} className="p-4 p-md-5">
                  <h3 style={{ fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.25rem' }}>
                    Aashay Jain
                  </h3>
                  <p style={{ color: 'var(--color-accent)', fontWeight: 600, marginBottom: '1.25rem' }}>
                    Software Development Engineer 2 @ Flipkart
                  </p>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '1.75rem' }}>
                    B.Tech (CSE) graduate from NIT Bhopal. Backend engineer focused on building
                    high-throughput distributed systems and microservices. I enjoy solving
                    complex engineering challenges — from stream processing pipelines and CQRS
                    architectures to annotation-driven libraries and load-tested APIs.
                    Passionate about clean system design, measurable impact, and continuous improvement.
                  </p>
                  <Row className="gy-3">
                    {INFO.map(({ label, value }) => (
                      <Col sm={6} key={label}>
                        <span className="about-info-label">{label}</span>
                        <br />
                        <span className="about-info-value">{value}</span>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;
```

- [ ] **Step 3: Verify in browser**

Expected: White card with photo left, bio right. Four info items (Location: Bengaluru, Email updated, Company: Flipkart, Role: SDE-2). No typewriter animation — text renders immediately. On mobile: photo top, text bottom.

- [ ] **Step 4: Commit**

```bash
git add src/Components/Portfolio_Website/About.jsx src/Components/Portfolio_Website/About.css
git commit -m "feat: redesign about section — updated bio, Bengaluru location, correct email"
```

---

## Task 5: Experience Section

**Files:**
- Modify: `src/Components/Portfolio_Website/Experience.jsx`
- Modify: `src/Components/Portfolio_Website/ExperienceItem.jsx`
- Modify: `src/Components/Portfolio_Website/Experience.css`

- [ ] **Step 1: Replace Experience.css**

```css
.experience-section {
  padding: 5rem 1rem;
  background-color: var(--color-bg);
}

.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border);
}

.timeline-item {
  position: relative;
  padding-left: 56px;
  margin-bottom: 2rem;
}

.timeline-dot {
  position: absolute;
  left: 11px;
  top: 20px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-accent);
  border: 3px solid var(--color-surface);
  box-shadow: 0 0 0 2px var(--color-accent);
  z-index: 1;
}

.experience-card {
  background: var(--color-surface);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  padding: 1.5rem;
  border-left: 4px solid var(--color-accent);
  transition: box-shadow 0.25s;
}

.experience-card:hover {
  box-shadow: var(--shadow-card-hover);
}

.exp-company {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.15rem;
}

.exp-role {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.exp-meta {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.exp-bullets {
  padding-left: 1.25rem;
  margin: 0;
}

.exp-bullets li {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 0.4rem;
}

.exp-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.75rem;
}

.exp-tech-tag {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-pill);
  background: #EEF2FF;
  color: var(--color-accent);
  border: 1px solid #C7D2FE;
}

@media (max-width: 575px) {
  .timeline::before {
    left: 14px;
  }
  .timeline-dot {
    left: 5px;
    width: 18px;
    height: 18px;
  }
  .timeline-item {
    padding-left: 44px;
  }
}
```

- [ ] **Step 2: Replace ExperienceItem.jsx**

```jsx
import React from 'react';

function ExperienceItem({ data }) {
  return (
    <li className="timeline-item">
      <div className="timeline-dot" />
      <div className="experience-card">
        <div className="exp-company">{data.company}</div>
        <div className="exp-role">{data.position}</div>
        <div className="exp-meta">{data.timeline}</div>
        {data.description.length > 0 && (
          <ul className="exp-bullets">
            {data.description.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        )}
        {data.tech && (
          <div className="exp-tech">
            {data.tech.map((t) => (
              <span key={t} className="exp-tech-tag">{t}</span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export default ExperienceItem;
```

- [ ] **Step 3: Replace Experience.jsx with all 4 roles from resume**

```jsx
import React from 'react';
import './Experience.css';
import ExperienceItem from './ExperienceItem';

const EXPERIENCE = [
  {
    id: 0,
    company: 'Flipkart',
    timeline: 'Apr 2026 – Present',
    position: 'Software Development Engineer 2',
    description: [
      'Owned and delivered a high-impact inventory capability for Flipkart Minutes enabling accurate inter-warehouse transfer and inwarding of multi-part shipments across 1,000+ dark stores; drove end-to-end design, development, testing, and productionisation.',
      'Developed a reusable annotation-driven caching library for Dropwizard applications with configurable method-level caching and observability metrics; adopted across 3 services, cutting boilerplate and improving debuggability.',
    ],
    tech: ['Java', 'AOP', 'Dropwizard', 'System Design', 'Guice'],
  },
  {
    id: 1,
    company: 'Flipkart',
    timeline: 'Jul 2024 – Apr 2026',
    position: 'Software Development Engineer 1',
    description: [
      'Redesigned and optimised consignment dispatch flow — eliminated core library bottlenecks, minimised external dependencies, and implemented caching, achieving 90% latency reduction.',
      'Independently led end-to-end delivery (LLD to production) of multiple core features for Advanced Shipping Note in B2B operations, enhancing scalability and customer experience.',
      'Implemented real-time KStream pipelines consuming CDC events, enriching data, and publishing to Elasticsearch as a query-optimised secondary store leveraging the CQRS pattern.',
      'Performed load testing on high-traffic APIs; applied bulk DB operations, cutting latency by 40% and boosting throughput under peak load.',
    ],
    tech: ['Java', 'Microservices', 'Elasticsearch', 'Apache Kafka', 'Dropwizard'],
  },
  {
    id: 2,
    company: 'Flipkart',
    timeline: 'Jan 2024 – Jun 2024',
    position: 'Software Development Engineer Intern',
    description: [
      'Implemented rate limiter for KStream application — per-stream consumption limits with configurable wait/drop strategies to optimise resource usage and simplify high-load stream onboarding.',
      'Enriched order-path details in the IWIT flow, enabling Just-In-Time transfer of Flipkart Minutes consignments.',
    ],
    tech: ['Java', 'Apache Kafka', 'Dropwizard', 'Kubernetes', 'Docker', 'Python'],
  },
  {
    id: 3,
    company: 'Deutsche Bank',
    timeline: 'May 2023 – Jul 2023',
    position: 'Software Development Engineer Intern',
    description: [
      'Developed an application to track, control, and optimise cloud resource utilisation, managing lifecycle for potential cost savings; maintained Sonar coding standards and high test coverage.',
    ],
    tech: ['Java', 'Spring Boot', 'REST APIs', 'Agile'],
  },
];

function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <h2 className="section-title">Work Experience</h2>
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <ul className="timeline">
              {EXPERIENCE.map((item) => (
                <ExperienceItem data={item} key={item.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
```

- [ ] **Step 4: Verify in browser**

Expected: Vertical timeline on off-white background, 4 cards with left indigo border. SDE-2 is first (most recent). Each card shows company (small indigo caps), role (bold), date, bullet points, and tech tags. On mobile: timeline collapses to single column without overlap.

- [ ] **Step 5: Commit**

```bash
git add src/Components/Portfolio_Website/Experience.jsx src/Components/Portfolio_Website/ExperienceItem.jsx src/Components/Portfolio_Website/Experience.css
git commit -m "feat: redesign experience section with 4 roles from resume, vertical timeline"
```

---

## Task 6: Achievements Section

**Files:**
- Modify: `src/Components/Portfolio_Website/Achievements.jsx`
- Modify: `src/Components/Portfolio_Website/AchievementItem.jsx`

- [ ] **Step 1: Replace AchievementItem.jsx**

```jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AchievementItem({ data }) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--shadow-card)',
          padding: '1.5rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          transition: 'box-shadow 0.25s',
          cursor: 'default',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)')}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-card)')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: '#EEF2FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <FontAwesomeIcon icon={data.icon} style={{ color: 'var(--color-accent)', fontSize: '1.1rem' }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '0.95rem', lineHeight: 1.3 }}>
              {data.title}
            </div>
            {data.platform && (
              <div style={{ fontSize: '0.78rem', color: 'var(--color-accent)', fontWeight: 600, marginTop: '0.1rem' }}>
                {data.platform}
              </div>
            )}
          </div>
        </div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>
          {data.description}
        </p>
        {data.link && (
          <a
            href={data.link}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: '0.82rem', color: 'var(--color-accent)', fontWeight: 500, textDecoration: 'none', marginTop: 'auto' }}
          >
            View Certificate ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default AchievementItem;
```

- [ ] **Step 2: Replace Achievements.jsx**

```jsx
import React from 'react';
import { faTrophy, faMedal, faAward, faCode } from '@fortawesome/free-solid-svg-icons';
import AchievementItem from './AchievementItem';

const ACHIEVEMENTS = [
  {
    id: 0,
    icon: faAward,
    platform: 'Flipkart',
    title: 'Mission Impossible Award',
    description: 'Individual recognition for exceptional impact on the Dispatch Optimisation initiative — one of the highest individual honours at Flipkart.',
    link: 'https://drive.google.com/file/d/1bE-WvtqI2_8aT6IVfiNj4MnHEHk3jOxM/view?usp=drivesdk',
  },
  {
    id: 1,
    icon: faMedal,
    platform: 'Flipkart',
    title: 'Ace Alliance Award',
    description: 'Team award for outstanding contribution to FKI on TaaS — recognised for cross-functional collaboration and delivery excellence.',
    link: 'https://drive.google.com/file/d/1aJIKoKXU04VsDZD73YakUEHtJYQ4Sovx/view?usp=drivesdk',
  },
  {
    id: 2,
    icon: faCode,
    platform: 'LeetCode',
    title: 'Knight — Max Rating 2061',
    description: 'Achieved Knight rank on LeetCode with a peak contest rating of 2061, placing in the top competitive programmers globally.',
    link: 'https://leetcode.com/u/jainaashay123/',
  },
  {
    id: 3,
    icon: faTrophy,
    platform: 'Codeforces',
    title: 'Specialist — Max Rating 1430',
    description: 'Earned Specialist rank on Codeforces with a peak rating of 1430 through consistent performance in algorithmic contests.',
    link: 'https://codeforces.com/profile/jainaashay123',
  },
  {
    id: 4,
    icon: faTrophy,
    platform: 'CodeChef',
    title: '4-Star — Max Rating 1892',
    description: 'Attained 4-star status on CodeChef with a peak rating of 1892, competing in monthly long challenges and cook-offs.',
    link: 'https://www.codechef.com/users/aj_1000',
  },
  {
    id: 5,
    icon: faMedal,
    platform: 'Mercer | Mettl',
    title: 'CodeSmash 1.0 — Rank 49',
    description: 'Secured an overall rank of 49 in CodeSmash 1.0 — a national-level competitive programming contest, earning a Certificate of Appreciation.',
  },
];

function Achievements() {
  return (
    <section id="achievements" style={{ padding: '5rem 1rem', backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <h2 className="section-title">Achievements</h2>
        <div className="row">
          {ACHIEVEMENTS.map((item) => (
            <AchievementItem data={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
```

- [ ] **Step 3: Verify in browser**

Expected: White background, 6 cards in a responsive grid (3 cols on desktop, 2 on tablet, 1 on mobile). Each card has indigo icon box, title, platform badge, description. Flipkart awards appear first. Hover lifts the card shadow. Certificate links open in new tab.

- [ ] **Step 4: Commit**

```bash
git add src/Components/Portfolio_Website/Achievements.jsx src/Components/Portfolio_Website/AchievementItem.jsx
git commit -m "feat: redesign achievements — add Flipkart awards, 6-card responsive grid"
```

---

## Task 7: Skills Section

**Files:**
- Modify: `src/Components/Portfolio_Website/Skills.jsx`

- [ ] **Step 1: Replace Skills.jsx**

```jsx
import React from 'react';
import { Container } from 'react-bootstrap';

const SKILL_GROUPS = [
  {
    label: 'Core',
    skills: ['Java', 'Python', 'C++', 'Dropwizard', 'Spring Boot', 'REST APIs', 'Apache Kafka', 'Elasticsearch', 'Apache Pulsar'],
  },
  {
    label: 'Tools & Concepts',
    skills: ['Docker', 'Kubernetes', 'Google Cloud', 'Git', 'CI/CD', 'MySQL', 'MongoDB', 'System Design', 'Microservices', 'Design Patterns', 'DSA', 'OOPs', 'DBMS'],
  },
];

function Skills() {
  return (
    <section id="skills" style={{ padding: '5rem 1rem', backgroundColor: 'var(--color-bg)' }}>
      <Container>
        <h2 className="section-title">Technical Skills</h2>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {SKILL_GROUPS.map(({ label, skills }) => (
            <div key={label}>
              <p
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.75rem',
                }}
              >
                {label}
              </p>
              <div>
                {skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Skills;
```

- [ ] **Step 2: Verify in browser**

Expected: Off-white background, two groups separated by label ("CORE", "TOOLS & CONCEPTS"). Tags are indigo on light indigo, pill-shaped. Clean, no carousel. Wraps naturally on small screens.

- [ ] **Step 3: Commit**

```bash
git add src/Components/Portfolio_Website/Skills.jsx
git commit -m "feat: replace skills carousel with two-group tag-pill layout"
```

---

## Task 8: Education Section

**Files:**
- Modify: `src/Components/Portfolio_Website/Education.jsx`

- [ ] **Step 1: Replace Education.jsx**

```jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Education() {
  return (
    <section id="education" style={{ padding: '5rem 1rem', backgroundColor: 'var(--color-surface)' }}>
      <Container>
        <h2 className="section-title">Education</h2>
        <Row className="justify-content-center">
          <Col lg={7} md={9}>
            <div
              style={{
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-card)',
                boxShadow: 'var(--shadow-card)',
                padding: '1.75rem 2rem',
                borderLeft: '4px solid var(--color-accent)',
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'flex-start',
              }}
            >
              <img
                src={process.env.PUBLIC_URL + '/images/education/manit.jpg'}
                alt="NIT Bhopal"
                style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-text)' }}>
                  B.Tech, Computer Science & Engineering
                </div>
                <div style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.9rem', margin: '0.2rem 0' }}>
                  NIT Bhopal (MANIT)
                </div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
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
```

- [ ] **Step 2: Verify in browser**

Expected: Single compact card centred on page. Institution logo left, degree + university + date + GPA right. Clean, minimal. "NIT Bhopal" not "MANIT Bhopal" as the displayed name.

- [ ] **Step 3: Commit**

```bash
git add src/Components/Portfolio_Website/Education.jsx
git commit -m "feat: simplify education section to single NIT Bhopal card with GPA"
```

---

## Task 9: Projects — Home Section + Dedicated Page + App Route

**Files:**
- Modify: `src/Components/Portfolio_Website/Projects.jsx`
- Modify: `src/Components/Portfolio_Website/ProjectItem.jsx`
- Create: `src/Components/Portfolio_Website/ProjectsPage.jsx`
- Modify: `src/App.js`

- [ ] **Step 1: Replace ProjectItem.jsx**

```jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub as faGithubBrand } from '@fortawesome/free-brands-svg-icons';

function ProjectItem({ data }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'box-shadow 0.25s, transform 0.25s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {data.image && (
        <img
          src={process.env.PUBLIC_URL + `/images/Projects/${data.image}.jpg`}
          alt={data.heading}
          style={{ width: '100%', height: 180, objectFit: 'cover' }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      )}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h5 style={{ fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem', fontSize: '1rem' }}>
          {data.heading}
        </h5>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.7, flex: 1, marginBottom: '1rem' }}>
          {data.description}
        </p>
        {data.tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '1rem' }}>
            {data.tags.map((t) => (
              <span key={t} className="skill-tag" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>{t}</span>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {data.projectCode && (
            <a
              href={data.projectCode}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              <FontAwesomeIcon icon={faGithubBrand} /> Code
            </a>
          )}
          {data.projectLink && data.projectLink !== data.projectCode && (
            <a
              href={data.projectLink}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: '0.82rem', color: 'var(--color-accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} /> Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;
```

- [ ] **Step 2: Create ProjectsPage.jsx**

```jsx
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
    image: 'IPL',
    heading: 'IPL Match Predictor',
    description: 'Developed a predictive model to estimate the winning chance percentage for the batting team at any given moment during the second innings. Achieved training and test accuracy rates exceeding 92%.',
    projectCode: 'https://colab.research.google.com/drive/1cDeFd1XlDBarUTEJJF56IqS2Bcw-8S0d?usp=sharing',
    projectLink: 'https://colab.research.google.com/drive/1cDeFd1XlDBarUTEJJF56IqS2Bcw-8S0d?usp=sharing',
    tags: ['Python', 'Machine Learning', 'scikit-learn'],
  },
  {
    id: 1,
    image: null,
    heading: 'TradePulse — Crypto Algo-Trading System',
    description: 'Real-time algorithmic trading system for crypto futures on Delta Exchange. Candlestick-based quantitative analysis with configurable strategies and integrated risk management (stop-loss, position sizing, trade-frequency limits). Containerised and deployed on GCP.',
    projectCode: 'https://github.com/jainAashay/AlgoTrade',
    projectLink: 'https://github.com/jainAashay/AlgoTrade',
    tags: ['Python', 'Docker', 'GCP', 'REST APIs', 'WebSockets'],
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
    tags: ['React', 'Node.js', 'MySQL'],
  },
  {
    id: 4,
    image: 'nextWord',
    heading: 'Next Words Predictor',
    description: 'NLP model that allows users to input a sentence and select the number of words to predict. Generates contextually relevant and accurate continuations.',
    projectCode: 'https://colab.research.google.com/drive/1mq9Pd1vXcSTw8Jdy7Tk-BZ9Qn08ItMvF?usp=sharing',
    projectLink: 'https://colab.research.google.com/drive/1mq9Pd1vXcSTw8Jdy7Tk-BZ9Qn08ItMvF?usp=sharing',
    tags: ['Python', 'NLP', 'Deep Learning'],
  },
  {
    id: 5,
    image: 'rkg',
    heading: 'Random Quote Generator',
    description: 'Fully responsive ReactJS website integrating with APIs to fetch and display famous quotes organised by categories.',
    projectCode: 'https://github.com/jainAashay/Category-Wise-Quote-Generator-using-ReactJs',
    projectLink: 'https://654689f362a9b2384bdf648d--strong-treacle-39a62b.netlify.app/',
    tags: ['React', 'Bootstrap', 'REST APIs'],
  },
  {
    id: 6,
    image: 'login',
    heading: 'Login Authentication System',
    description: 'Responsive webpage for secure user login and registration with email verification, built with Python Flask.',
    projectCode: 'https://aashay26.pythonanywhere.com/login',
    projectLink: 'https://aashay26.pythonanywhere.com/login',
    tags: ['Python', 'Flask', 'Email Verification'],
  },
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
```

- [ ] **Step 3: Replace Projects.jsx (home section with 3 featured + See All)**

```jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProjectItem from './ProjectItem';

const FEATURED_PROJECTS = [
  {
    id: 0,
    image: null,
    heading: 'TradePulse — Crypto Algo-Trading System',
    description: 'Real-time algorithmic trading system for crypto futures on Delta Exchange with candlestick-based quantitative strategies and integrated risk management. Containerised and deployed on GCP.',
    projectCode: 'https://github.com/jainAashay/AlgoTrade',
    projectLink: 'https://github.com/jainAashay/AlgoTrade',
    tags: ['Python', 'Docker', 'GCP', 'WebSockets'],
  },
  {
    id: 1,
    image: 'IPL',
    heading: 'IPL Match Predictor',
    description: 'Predictive model estimating winning chance percentage for the batting team during the second innings in real time. Achieved training and test accuracy exceeding 92%.',
    projectCode: 'https://colab.research.google.com/drive/1cDeFd1XlDBarUTEJJF56IqS2Bcw-8S0d?usp=sharing',
    tags: ['Python', 'Machine Learning', 'scikit-learn'],
  },
  {
    id: 2,
    image: 'DBB',
    heading: 'Schema Manager',
    description: 'Full-stack app with user authentication and multi-schema data management. Upload via Excel, dynamic form entry, view/update/delete, and Excel download.',
    projectCode: 'https://aashay-jain.netlify.app/schema-manager',
    projectLink: 'https://aashay-jain.netlify.app/schema-manager',
    tags: ['React', 'Node.js', 'MySQL'],
  },
];

function Projects() {
  return (
    <section id="projects" style={{ padding: '5rem 1rem', backgroundColor: 'var(--color-bg)' }}>
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
                backgroundColor: 'var(--color-accent)',
                borderColor: 'var(--color-accent)',
                fontWeight: 600,
                padding: '0.65rem 2rem',
                borderRadius: '8px',
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
```

- [ ] **Step 4: Add /projects route to App.js**

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Home from './Components/Portfolio_Website/Home';
import ProjectsPage from './Components/Portfolio_Website/ProjectsPage';
import Test from './Components/Test';
import NotFound from './Components/NotFound';
import SchemaManagerHome from './Components/SchemaManager/SchemaManagerHome';
import StudentInformation from './Components/SchemaManager/StudentInformation';
import StudentInformationUpdate from './Components/SchemaManager/StudentInformationUpdate';
import StudentInformationDelete from './Components/SchemaManager/StudentInformationDelete';
import SchemaDataView from './Components/SchemaManager/SchemaDataView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/schema-manager" element={<SchemaManagerHome />} />
        <Route path="/student-information" element={<StudentInformation />} />
        <Route path="/student-information/update" element={<StudentInformationUpdate />} />
        <Route path="/student-information/delete" element={<StudentInformationDelete />} />
        <Route path="/schema-manager/schema/:schema/view" element={<SchemaDataView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
```

- [ ] **Step 5: Verify in browser**

Expected:
- Home page shows 3 featured project cards (TradePulse first) with image, description, tags, code/live links, hover lift effect.
- "See All Projects →" button navigates to `/projects`.
- `/projects` page shows all 7 projects in a 3-column grid, "← Back to Home" link works.
- On mobile: 1 column.

- [ ] **Step 6: Commit**

```bash
git add src/Components/Portfolio_Website/Projects.jsx src/Components/Portfolio_Website/ProjectItem.jsx src/Components/Portfolio_Website/ProjectsPage.jsx src/App.js
git commit -m "feat: add projects page with all 7 projects, featured 3 on home, TradePulse added"
```

---

## Task 10: Contact Section

**Files:**
- Modify: `src/Components/Portfolio_Website/Contact.jsx`

- [ ] **Step 1: Replace Contact.jsx (same API, visual update only)**

```jsx
import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import backend_endpoint from '../Constants';
import { toast } from 'react-toastify';

function createMessage(name, email, message) {
  return 'A message received from ' + name + '\nEmail : ' + email + '\nMessage : ' + message;
}

function Contact() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    try {
      await axios.post(backend_endpoint + '/email_sender/email/send', {
        email: 'jainaashay123@gmail.com',
        message: createMessage(name, email, message),
      });
      toast.success("Got your message — I'll get back to you soon!");
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error('Error sending email:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '5rem 1rem', backgroundColor: 'var(--color-surface)' }}>
      <Container>
        <h2 className="section-title">Get In Touch</h2>
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <div
              style={{
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-card)',
                boxShadow: 'var(--shadow-card)',
                padding: '2.5rem',
              }}
            >
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.75rem', lineHeight: 1.7 }}>
                Whether it's a collaboration, opportunity, or just a hello — feel free to drop me a message.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    value={name}
                    type="text"
                    placeholder="Your Name"
                    className="form-control"
                    style={{ borderColor: 'var(--color-border)', borderRadius: 8, padding: '0.65rem 1rem' }}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    value={email}
                    type="email"
                    placeholder="Your Email"
                    className="form-control"
                    style={{ borderColor: 'var(--color-border)', borderRadius: 8, padding: '0.65rem 1rem' }}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    value={message}
                    rows={5}
                    placeholder="Your message..."
                    className="form-control"
                    style={{ borderColor: 'var(--color-border)', borderRadius: 8, padding: '0.65rem 1rem', resize: 'vertical' }}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={sending}
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    borderColor: 'var(--color-accent)',
                    fontWeight: 600,
                    padding: '0.65rem 2rem',
                    borderRadius: 8,
                    width: '100%',
                  }}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contact;
```

- [ ] **Step 2: Verify in browser**

Expected: Centred white card with form fields (name, email, message). Submit triggers the existing API call. Toast success/error still works. Contact image removed. Form validates required fields before submit.

- [ ] **Step 3: Commit**

```bash
git add src/Components/Portfolio_Website/Contact.jsx
git commit -m "feat: redesign contact section — clean card form, same API endpoint"
```

---

## Task 11: Footer Update

**Files:**
- Modify: `src/Components/Portfolio_Website/Footer.jsx`

- [ ] **Step 1: Replace Footer.jsx**

```jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const FOOTER_LINKS = ['About', 'Experience', 'Achievements', 'Skills', 'Education', 'Projects', 'Contact'];

function scrollTo(id) {
  const el = document.getElementById(id.toLowerCase());
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)', padding: '3rem 1rem 2rem' }}>
      <Container>
        <Row className="mb-4 gy-3">
          <Col md={4}>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Aashay Jain</div>
            <p style={{ color: '#9CA3AF', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: 0 }}>
              SDE-2 at Flipkart. Building distributed systems and microservices at scale.
              Based in Bengaluru, India.
            </p>
          </Col>
          <Col md={4} className="d-flex flex-column align-items-md-center">
            <div style={{ fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: '0.75rem' }}>
              Navigation
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {FOOTER_LINKS.map((item) => (
                <span
                  key={item}
                  onClick={() => scrollTo(item)}
                  style={{ color: '#D1D5DB', fontSize: '0.875rem', cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#D1D5DB')}
                >
                  {item}
                </span>
              ))}
            </div>
          </Col>
          <Col md={4} className="d-flex flex-column align-items-md-end">
            <div style={{ fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: '0.75rem' }}>
              Connect
            </div>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <a href="https://www.linkedin.com/in/aj12345" target="_blank" rel="noreferrer" style={{ color: '#9CA3AF' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
              <a href="https://github.com/jainAashay" target="_blank" rel="noreferrer" style={{ color: '#9CA3AF' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
              <a href="https://leetcode.com/u/jainaashay123/" target="_blank" rel="noreferrer" style={{ color: '#9CA3AF' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
              >
                <FontAwesomeIcon icon={faCode} size="lg" />
              </a>
            </div>
          </Col>
        </Row>
        <hr style={{ borderColor: '#374151', margin: '1rem 0' }} />
        <div style={{ textAlign: 'center', color: '#6B7280', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Aashay Jain. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
```

- [ ] **Step 2: Verify in browser**

Expected: Dark footer (matches `--color-text` dark navy). Three columns: bio left, nav links middle, social icons right. No "final-year MANIT student" text. LinkedIn, GitHub, LeetCode icons. On mobile: stacks to single column.

- [ ] **Step 3: Commit**

```bash
git add src/Components/Portfolio_Website/Footer.jsx
git commit -m "feat: update footer — dark theme, updated bio, correct social links"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** All 11 sections from spec have a corresponding task. /projects route added. Backend API untouched.
- [x] **No placeholders:** Every step has full code, exact file paths, exact commands.
- [x] **Type consistency:** `data.image`, `data.heading`, `data.description`, `data.tags`, `data.projectCode`, `data.projectLink` used consistently in ProjectItem and all data arrays.
- [x] **Mobile:** Bootstrap Col breakpoints used throughout; timeline dot sizes adjusted for small screens.
- [x] **Content accuracy:** SDE-2 role, Bengaluru, updated email, NIT Bhopal, all 6 achievements including Flipkart awards, TradePulse project — all match resume.
- [x] **API backward compat:** Contact.jsx posts to same `backend_endpoint + '/email_sender/email/send'` with same payload shape.
