import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Template } from '../../types';
import { useWishlist } from '../../hooks/useWishlist';

interface Props {
  template: Template;
  /** Hide the "Live preview →" hover affordance on the image. Defaults to shown. */
  hidePreviewHint?: boolean;
}

const MAX_VISIBLE_TAGS = 2;

const badgeBaseStyle = {
  borderRadius: '9999px',
  padding: '4px 10px',
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  boxShadow: '0 2px 8px rgba(2,6,23,0.45)',
};

export default function TemplateCard({ template, hidePreviewHint = false }: Props) {
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(template.id);
  const [hovered, setHovered] = useState(false);

  const visibleTags = template.tags.slice(0, MAX_VISIBLE_TAGS);
  const extraTags = template.tags.length - visibleTags.length;

  return (
    <Link
      to={`/templates/${template.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        border: `1px solid ${hovered ? '#38bdf8' : '#1e293b'}`,
        background: '#0f172a',
        overflow: 'hidden',
        textDecoration: 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'border-color 0.2s, transform 0.2s',
      }}
    >
      {/* ── Image (overflow-hidden wrapper enables the zoom) ── */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', background: '#1e293b' }}>
        <img
          src={template.image}
          alt={template.title}
          loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.45s ease',
          }}
        />

        {/* Live preview affordance (visual hint — the whole card links to the detail page) */}
        {!hidePreviewHint && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'flex-end',
            padding: '12px 14px',
            background: 'linear-gradient(to top, rgba(2,6,23,0.8), transparent 55%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.25s ease',
            pointerEvents: 'none',
          }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#38bdf8' }}>
              Live preview →
            </span>
          </div>
        )}

        {/* Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          {template.isFree && (
            <span style={{ ...badgeBaseStyle, background: '#10b981', color: '#ffffff' }}>
              Free
            </span>
          )}
          {template.isPremium && (
            <span style={{ ...badgeBaseStyle, background: '#38bdf8', color: '#020617' }}>
              Premium
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          type="button"
          onClick={e => { e.preventDefault(); toggle(template.id); }}
          title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          style={{
            position: 'absolute', top: '10px', right: '10px',
            width: '32px', height: '32px', borderRadius: '50%',
            border: 'none', cursor: 'pointer',
            background: wishlisted ? '#ef4444' : 'rgba(15,23,42,0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s, transform 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.15)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={wishlisted ? '#ffffff' : 'none'} stroke={wishlisted ? '#ffffff' : '#94a3b8'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
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
            color: template.isFree ? '#10b981' : '#ffffff',
            whiteSpace: 'nowrap', flexShrink: 0,
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

        {/* Tags (max 2 + overflow count) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
          {visibleTags.map(tag => (
            <span key={tag} style={{
              borderRadius: '6px', border: '1px solid #1e293b',
              background: '#020617', padding: '3px 10px',
              fontSize: '12px', color: '#475569',
            }}>
              {tag}
            </span>
          ))}
          {extraTags > 0 && (
            <span
              title={template.tags.slice(MAX_VISIBLE_TAGS).join(', ')}
              style={{
                borderRadius: '6px', border: '1px dashed #1e293b',
                background: 'transparent', padding: '3px 10px',
                fontSize: '12px', color: '#475569',
              }}
            >
              +{extraTags}
            </span>
          )}
        </div>

      </div>
    </Link>
  );
}
