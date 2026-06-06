import React, { useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './Skills.css';

const SKILL_GROUPS = [
  {
    label: 'Languages & Frameworks',
    color: '#7C3AED',
    skills: [
      'Java', 'Python', 'C++', 'JavaScript',
      'Dropwizard', 'Spring Boot', 'AOP', 'Guice',
      'REST APIs', 'ReactJS', 'Flask', 'Node.js',
    ],
  },
  {
    label: 'Messaging, Search & Databases',
    color: '#0EA5E9',
    skills: [
      'Apache Kafka', 'Elasticsearch', 'Apache Pulsar',
      'Apache ZooKeeper', 'MySQL', 'MongoDB', 'Redis',
    ],
  },
  {
    label: 'DevOps, Cloud & Concepts',
    color: '#10B981',
    skills: [
      'Docker', 'Kubernetes', 'Google Cloud', 'Git', 'CI/CD', 'Linux',
      'Grafana', 'System Design', 'Microservices', 'Design Patterns',
      'CQRS', 'DSA', 'OOPs', 'DBMS', 'Agile', 'Load Testing',
    ],
  },
];

const GROUP_COLORS = {
  '#7C3AED': { bg: '#EDE9FE', text: '#5B21B6', border: '#C4B5FD' },
  '#0EA5E9': { bg: '#DBEAFE', text: '#1E40AF', border: '#93C5FD' },
  '#10B981': { bg: '#D1FAE5', text: '#065F46', border: '#6EE7B7' },
};

function SkillGroup({ label, color, skills, index }) {
  const ref = useRef(null);
  const c = GROUP_COLORS[color];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('skill-group-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="skill-group-item"
      style={{
        transitionDelay: `${index * 0.13}s`,
        background: '#fff',
        borderRadius: 14,
        padding: '1.1rem 0.75rem',
        borderLeft: `5px solid ${color}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
        <p style={{
          fontSize: '0.82rem', fontWeight: 700,
          color, textTransform: 'uppercase',
          letterSpacing: '0.1em', margin: 0,
        }}>
          {label}
        </p>
      </div>
      <div>
        {skills.map((skill) => (
          <span
            key={skill}
            className="skill-tag"
            style={{
              backgroundColor: c.bg,
              color: c.text,
              borderColor: c.border,
              '--hover-bg': color,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: '4rem 0.25rem', backgroundColor: '#111827' }}>
      <Container fluid>
        <h2 className="section-title">Technical Skills</h2>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {SKILL_GROUPS.map(({ label, color, skills }, idx) => (
            <SkillGroup key={label} label={label} color={color} skills={skills} index={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Skills;
