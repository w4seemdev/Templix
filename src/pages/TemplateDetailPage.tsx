import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Check, Monitor } from 'lucide-react';
import { templates } from '../data/templates';
import Container from '../components/ui/Container';

const included = [
  'Full source code',
  'Figma design file',
  'Free lifetime updates',
  'Commercial license',
  'Documentation & setup guide',
  'Community support',
];

export default function TemplateDetailPage() {
  const { id } = useParams<{ id: string }>();
  const template = templates.find(t => t.id === id);
  const [previewOpen, setPreviewOpen] = useState(false);
  const hasLivePreview = template?.demoUrl && template.demoUrl !== '#';

  if (!template) {
    return (
      <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.75rem' }}>Template not found</h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>This template doesn't exist or was removed.</p>
          <Link to="/templates" style={{
            display: 'inline-flex', borderRadius: '12px', background: '#38bdf8',
            padding: '12px 24px', fontSize: '14px', fontWeight: 600,
            color: '#020617', textDecoration: 'none',
          }}>
            Back to templates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>

      {/* ── Full-screen iframe overlay ── */}
      {previewOpen && hasLivePreview && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: '#020617', display: 'flex', flexDirection: 'column',
        }}>
          {/* Preview bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 1.5rem', height: '52px', flexShrink: 0,
            background: '#0f172a', borderBottom: '1px solid #1e293b',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Monitor size={16} style={{ color: '#38bdf8' }} />
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>{template.title}</span>
              <span style={{ fontSize: '12px', color: '#475569' }}>— Live Preview</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <a
                href={template.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '13px', color: '#64748b', textDecoration: 'none',
                }}
              >
                <ExternalLink size={14} /> Open in new tab
              </a>
              <button
                onClick={() => setPreviewOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: '#1e293b', border: '1px solid #334155',
                  borderRadius: '8px', padding: '6px 14px',
                  fontSize: '13px', fontWeight: 600, color: '#ffffff', cursor: 'pointer',
                }}
              >
                ✕ Close preview
              </button>
            </div>
          </div>
          <iframe
            src={template.demoUrl}
            style={{ flex: 1, width: '100%', border: 'none' }}
            title={`${template.title} preview`}
          />
        </div>
      )}

      <Container style={{ paddingTop: '3.5rem', paddingBottom: '4rem' }}>

        {/* Back */}
        <Link to="/templates" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontSize: '14px', color: '#64748b', textDecoration: 'none', marginBottom: '2.5rem',
        }}>
          <ArrowLeft size={16} />
          Back to templates
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '3rem', alignItems: 'flex-start' }}>

          {/* ── Left ── */}
          <div>
            {/* Image / Preview area */}
            <div style={{
              borderRadius: '16px', overflow: 'hidden',
              border: '1px solid #1e293b',
              aspectRatio: '16/10', background: '#0f172a',
              position: 'relative',
            }}>
              <img src={template.image} alt={template.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

              {/* Hover overlay to open preview */}
              {hasLivePreview && (
                <div
                  onClick={() => setPreviewOpen(true)}
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(2,6,23,0.6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: 0, cursor: 'pointer', transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0'}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: '#38bdf8', borderRadius: '12px',
                    padding: '12px 24px', fontSize: '14px', fontWeight: 600, color: '#020617',
                  }}>
                    <Monitor size={16} />
                    Launch live preview
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ marginTop: '2rem' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#38bdf8', marginBottom: '8px' }}>
                {template.category}
              </p>
              <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
                {template.title}
              </h1>
              <p style={{ fontSize: '1.0625rem', color: '#94a3b8', lineHeight: 1.7 }}>
                {template.description}
              </p>

              {/* Tags */}
              <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {template.tags.map(tag => (
                  <span key={tag} style={{
                    borderRadius: '8px', border: '1px solid #334155',
                    background: '#0f172a', padding: '5px 12px',
                    fontSize: '13px', color: '#94a3b8',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Purchase card ── */}
          <div style={{ position: 'sticky', top: '88px' }}>
            <div style={{
              borderRadius: '20px', border: '1px solid #1e293b',
              background: '#0f172a', padding: '1.75rem',
            }}>
              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff' }}>
                  {template.isFree ? 'Free' : `$${template.price}`}
                </span>
                {template.isPremium && (
                  <span style={{
                    borderRadius: '9999px', border: '1px solid rgba(56,189,248,0.3)',
                    background: 'rgba(56,189,248,0.1)', padding: '3px 12px',
                    fontSize: '12px', fontWeight: 600, color: '#38bdf8',
                  }}>
                    Premium
                  </span>
                )}
                {template.isFree && (
                  <span style={{
                    borderRadius: '9999px', border: '1px solid rgba(52,211,153,0.3)',
                    background: 'rgba(52,211,153,0.1)', padding: '3px 12px',
                    fontSize: '12px', fontWeight: 600, color: '#34d399',
                  }}>
                    Free
                  </span>
                )}
              </div>

              {/* Buy */}
              <button style={{
                width: '100%', borderRadius: '12px', background: '#38bdf8',
                padding: '14px', fontSize: '15px', fontWeight: 600,
                color: '#020617', border: 'none', cursor: 'pointer',
              }}>
                {template.isFree ? 'Download for free' : `Buy for $${template.price}`}
              </button>

              {/* Preview button */}
              {hasLivePreview ? (
                <button
                  onClick={() => setPreviewOpen(true)}
                  style={{
                    marginTop: '10px', width: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    borderRadius: '12px', border: '1px solid #334155',
                    background: 'transparent',
                    padding: '12px', fontSize: '14px', fontWeight: 500,
                    color: '#94a3b8', cursor: 'pointer',
                  }}
                >
                  <Monitor size={15} />
                  Live preview
                </button>
              ) : (
                <div style={{
                  marginTop: '10px', width: '100%', boxSizing: 'border-box',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  borderRadius: '12px', border: '1px solid #1e293b',
                  padding: '12px', fontSize: '14px',
                  color: '#334155',
                }}>
                  Preview coming soon
                </div>
              )}

              {/* Included */}
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #1e293b' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', marginBottom: '1rem' }}>
                  What's included
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {included.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#94a3b8' }}>
                      <Check size={14} style={{ color: '#38bdf8', flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Category */}
              <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #1e293b', fontSize: '13px', color: '#475569' }}>
                Category: {' '}
                <Link to="/templates" style={{ color: '#38bdf8', textDecoration: 'none', textTransform: 'capitalize' }}>
                  {template.category}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
