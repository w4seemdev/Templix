import { Link } from 'react-router-dom';
import type { Template } from '../../types';

interface Props {
  template: Template;
}

export default function TemplateCard({ template }: Props) {
  return (
    <Link
      to={`/templates/${template.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        border: '1px solid #1e293b',
        background: '#0f172a',
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'border-color 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = '#38bdf8';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = '#1e293b';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* ── Image ── */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', background: '#1e293b' }}>
        <img
          src={template.image}
          alt={template.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          {template.isFree && (
            <span style={{
              borderRadius: '9999px', background: '#10b981',
              padding: '3px 10px', fontSize: '12px', fontWeight: 600, color: '#ffffff',
            }}>
              Free
            </span>
          )}
          {template.isPremium && (
            <span style={{
              borderRadius: '9999px', background: '#38bdf8',
              padding: '3px 10px', fontSize: '12px', fontWeight: 600, color: '#020617',
            }}>
              Premium
            </span>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: '1.125rem 1.25rem 1.25rem',
        background: '#0f172a',
      }}>

        {/* Category */}
        <span style={{
          fontSize: '11px', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: '#38bdf8', marginBottom: '6px',
        }}>
          {template.category}
        </span>

        {/* Title + Price row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
          <h3 style={{
            fontSize: '15px', fontWeight: 600,
            color: '#f1f5f9', margin: 0, lineHeight: 1.4,
          }}>
            {template.title}
          </h3>
          <span style={{
            fontSize: '15px', fontWeight: 700,
            color: '#ffffff', whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            {template.isFree ? 'Free' : `$${template.price}`}
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '13px', color: '#64748b',
          lineHeight: 1.6, margin: '0 0 12px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {template.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
          {template.tags.map(tag => (
            <span key={tag} style={{
              borderRadius: '6px', border: '1px solid #1e293b',
              background: '#020617', padding: '3px 10px',
              fontSize: '12px', color: '#475569',
            }}>
              {tag}
            </span>
          ))}
        </div>

      </div>
    </Link>
  );
}
