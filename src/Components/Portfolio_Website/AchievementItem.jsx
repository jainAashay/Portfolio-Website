import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PLATFORM_COLORS = {
  Flipkart: { bg: '#FFF7ED', icon: '#F59E0B', badge: '#FDE68A', text: '#92400E' },
  LeetCode: { bg: '#FFFBEB', icon: '#EAB308', badge: '#FEF08A', text: '#713F12' },
  Codeforces: { bg: '#EFF6FF', icon: '#3B82F6', badge: '#BFDBFE', text: '#1E40AF' },
  CodeChef: { bg: '#F0FDF4', icon: '#22C55E', badge: '#BBF7D0', text: '#14532D' },
  'Mercer | Mettl': { bg: '#F5F3FF', icon: '#7C3AED', badge: '#DDD6FE', text: '#4C1D95' },
};

const DEFAULT_COLORS = { bg: '#F9FAFB', icon: 'var(--color-accent)', badge: '#E0E7FF', text: '#3730A3' };

function AchievementItem({ data }) {
  const colors = PLATFORM_COLORS[data.platform] || DEFAULT_COLORS;

  const linkLabel = data.linkType === 'profile' ? 'View Profile ↗' : 'View Certificate ↗';

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div
        style={{
          background: colors.bg,
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--shadow-card)',
          padding: '1.6rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          transition: 'box-shadow 0.25s, transform 0.25s',
          cursor: 'default',
          border: '1px solid rgba(0,0,0,0.04)',
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
        {/* Icon + title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: colors.badge,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <FontAwesomeIcon icon={data.icon} style={{ color: colors.icon, fontSize: '1.15rem' }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '0.95rem', lineHeight: 1.35 }}>
              {data.title}
            </div>
            {data.platform && (
              <span style={{
                display: 'inline-block', marginTop: '0.25rem',
                fontSize: '0.72rem', fontWeight: 700,
                color: colors.text, background: colors.badge,
                padding: '0.15rem 0.55rem', borderRadius: '999px',
              }}>
                {data.platform}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0, flex: 1 }}>
          {data.description}
        </p>

        {/* Link */}
        {data.link && (
          <a
            href={data.link}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: '0.82rem', color: colors.icon,
              fontWeight: 600, textDecoration: 'none',
              marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
            }}
          >
            {linkLabel}
          </a>
        )}
      </div>
    </div>
  );
}

export default AchievementItem;
