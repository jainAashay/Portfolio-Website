import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function ProjectItem({ data }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid rgba(99,102,241,0.25)',
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
              <FontAwesomeIcon icon={faGithub} /> Code
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
