import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Template } from '../../types';
import { categories } from '../../data/templates';
import { useWishlist } from '../../hooks/useWishlist';

interface Props {
  template: Template;
  /** Hide the "View details" hover affordance on the image. Defaults to shown. */
  hidePreviewHint?: boolean;
}

const MAX_VISIBLE_TAGS = 2;

/** Glassy tint badge (NEW/BESTSELLER-style) over the thumbnail. */
const badgeBaseStyle = {
  borderRadius: '4px',
  padding: '4px 8px',
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  background: 'rgba(7,8,10,0.72)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  lineHeight: 1.3,
};

const tagChipBaseStyle = {
  borderRadius: '9999px',
  padding: '4px 10px',
  fontSize: '11px',
  fontWeight: 500,
  lineHeight: 1.3,
  color: 'var(--color-text-tertiary)',
};

export default function TemplateCard({ template, hidePreviewHint = false }: Props) {
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(template.id);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  // Keyboard focus gets the same lift + ring as hover so the card reads as an
  // interactive target for non-mouse users. :focus-visible keeps mouse clicks quiet.
  const active = hovered || focused;

  const visibleTags = template.tags.slice(0, MAX_VISIBLE_TAGS);
  const overflowTags = template.tags.slice(MAX_VISIBLE_TAGS);
  // Catalog ids are slugs ('landing'); buyers should read the display label.
  const categoryLabel = categories.find(c => c.id === template.category)?.label ?? template.category;

  return (
    // The wishlist toggle is a sibling of the Link, never a child: interactive
    // content inside an <a> is invalid HTML and breaks assistive tech. The
    // wrapper owns hover + the lift so the button rides along with the card.
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        // Fill the grid cell so cards in a row stay the same height.
        height: '100%',
        transform: active ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 250ms cubic-bezier(0.2,0.8,0.2,1)',
      }}
    >
      <Link
        to={`/templates/${template.id}`}
        onFocus={e => { if (e.currentTarget.matches(':focus-visible')) setFocused(true); }}
        onBlur={() => setFocused(false)}
        style={{
          display: 'flex',
          flex: 1,
          minWidth: 0,
          flexDirection: 'column',
          borderRadius: '12px',
          border: `1px solid ${active ? 'rgba(124,92,252,0.35)' : 'var(--color-border-subtle)'}`,
          background: 'var(--color-surface-1)',
          overflow: 'hidden',
          textDecoration: 'none',
          outline: focused ? '2px solid var(--color-border-accent)' : 'none',
          outlineOffset: '2px',
          boxShadow: active
            ? '0 0 24px -6px rgba(124,92,252,0.30), 0 16px 40px -16px rgba(0,0,0,0.6)'
            : '0 1px 2px rgba(0,0,0,0.40)',
          transition:
            'border-color 250ms cubic-bezier(0.2,0.8,0.2,1), box-shadow 250ms cubic-bezier(0.2,0.8,0.2,1)',
        }}
      >
        {/* ── Thumbnail: 16:10 on a lighter well so dark shots never merge ── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/10',
            overflow: 'hidden',
            background: 'var(--color-surface-2)',
          }}
        >
          <img
            src={template.image}
            alt={`${template.title} template preview`}
            loading="lazy"
            width={800}
            height={500}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transform: active ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 600ms cubic-bezier(0.2,0.8,0.2,1)',
            }}
          />

          {/* 1px inset frame so light screenshots stay bounded */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
              pointerEvents: 'none',
            }}
          />

          {/* Hover pill over a scrim — the card links to the detail page */}
          {!hidePreviewHint && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(7,8,10,0.5)',
                opacity: active ? 1 : 0,
                transition: active ? 'opacity 200ms ease-out' : 'opacity 150ms ease-out',
                pointerEvents: 'none',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '9999px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  background: 'rgba(14,16,20,0.8)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  transform: active ? 'scale(1)' : 'scale(0.96)',
                  transition: 'transform 200ms ease-out',
                }}
              >
                View details →
              </span>
            </div>
          )}

          {/* Badges */}
          <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
            {template.isFree && (
              <span
                style={{
                  ...badgeBaseStyle,
                  border: '1px solid rgba(62,207,142,0.35)',
                  color: 'var(--color-success)',
                }}
              >
                Free
              </span>
            )}
            {template.isPremium && (
              <span
                style={{
                  ...badgeBaseStyle,
                  border: '1px solid rgba(124,92,252,0.45)',
                  color: 'var(--color-accent-text)',
                }}
              >
                Premium
              </span>
            )}
          </div>
        </div>

        {/* ── Body ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '16px',
          }}
        >
          {/* Category eyebrow (micro, violet) */}
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-accent-text)',
              marginBottom: '8px',
            }}
          >
            {categoryLabel}
          </span>

          {/* Title + mono price row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
            <h3
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: 0,
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
              }}
            >
              {template.title}
            </h3>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '15px',
                fontWeight: 600,
                fontFeatureSettings: '"tnum"',
                color: template.isFree ? 'var(--color-success)' : 'var(--color-text-primary)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {template.isFree ? 'Free' : `$${template.price}`}
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              margin: '0 0 14px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {template.description}
          </p>

          {/* Tags (max 2 + overflow count) */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
            {visibleTags.map(tag => (
              <span
                key={tag}
                style={{
                  ...tagChipBaseStyle,
                  border: '1px solid var(--color-border-default)',
                  background: 'var(--color-surface-2)',
                }}
              >
                {tag}
              </span>
            ))}
            {overflowTags.length > 0 && (
              <span
                title={overflowTags.join(', ')}
                style={{
                  ...tagChipBaseStyle,
                  border: '1px dashed var(--color-border-default)',
                  background: 'transparent',
                }}
              >
                +{overflowTags.length}
                {/* title= is mouse-only — name the hidden tags for AT and keyboard users. */}
                <span className="sr-only">: {overflowTags.join(', ')}</span>
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Wishlist toggle — overlays the thumbnail, sibling of the Link */}
      <button
        type="button"
        onClick={() => toggle(template.id)}
        title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        aria-label={wishlisted ? `Remove ${template.title} from wishlist` : `Save ${template.title} to wishlist`}
        aria-pressed={wishlisted}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          cursor: 'pointer',
          background: wishlisted ? 'rgba(244,64,95,0.9)' : 'rgba(7,8,10,0.6)',
          border: `1px solid ${wishlisted ? 'rgba(244,64,95,0.5)' : 'rgba(255,255,255,0.14)'}`,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 150ms ease-out, border-color 150ms ease-out, transform 150ms ease-out',
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.15)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={wishlisted ? '#ffffff' : 'none'}
          stroke={wishlisted ? '#ffffff' : '#A6ADBB'}
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </div>
  );
}
