import React, { useRef, useEffect } from 'react';
import './Experience.css';

function ExperienceItem({ data, index }) {
  const ref = useRef(null);
  const accent = data.accentColor || 'var(--color-accent)';
  const headerBg = data.headerBg || '#F9FAFB';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      className="timeline-item"
      ref={ref}
      style={{ transitionDelay: `${(index || 0) * 0.12}s` }}
    >
      <div className="timeline-dot" style={{ background: accent, boxShadow: `0 0 0 3px ${accent}33` }} />
      <div className="experience-card" style={{ borderLeftColor: accent }}>
        {/* Coloured header band */}
        <div style={{
          background: headerBg,
          margin: '-1.5rem -1.5rem 1.25rem',
          padding: '1.1rem 1.5rem',
          borderRadius: '10px 10px 0 0',
          borderBottom: `2px solid ${accent}33`,
        }}>
          <div className="exp-company" style={{ color: accent }}>{data.company}</div>
          <div className="exp-role">{data.position}</div>
          <div className="exp-meta" style={{ marginBottom: 0 }}>{data.timeline}</div>
        </div>

        {data.description.length > 0 && (
          <ul className="exp-bullets">
            {data.description.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        )}

        {data.impact && data.impact.length > 0 && (
          <div className="exp-impact">
            {data.impact.map(({ value, label, color }) => (
              <div
                key={label}
                className="exp-impact-chip"
                style={{
                  borderColor: color,
                  background: `${color}18`,
                }}
              >
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color, lineHeight: 1 }}>{value}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>{label}</span>
              </div>
            ))}
          </div>
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
