import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ExternalLink, Check, Monitor, Zap, RefreshCw, LifeBuoy, ShieldCheck } from 'lucide-react';
import { templates } from '../data/templates';
import Container from '../components/ui/Container';
import TemplateCard from '../components/ui/TemplateCard';
import { useAuth } from '../context/AuthContext';
import { usePurchases } from '../hooks/usePurchases';
import { supabase } from '../lib/supabase';

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
  const [previewOpen,  setPreviewOpen]  = useState(false);
  const [buying,       setBuying]       = useState(false);
  const [downloading,  setDownloading]  = useState(false);
  const hasLivePreview = template?.demoUrl && template.demoUrl !== '#';
  const { user }         = useAuth();
  const { hasPurchased } = usePurchases();
  const navigate         = useNavigate();
  const alreadyOwned     = template ? (template.isFree || hasPurchased(template.id)) : false;

  /** Trigger a direct browser download of the zip. */
  const downloadZip = async (tpl: typeof template) => {
    if (!tpl) return;
    setDownloading(true);
    const fileName = `${tpl.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.zip`;

    try {
      // 1. Try Supabase Storage signed URL
      const { data, error } = await supabase.storage
        .from('templates')
        .createSignedUrl(`${tpl.id}.zip`, 60);

      const url = (!error && data?.signedUrl)
        ? data.signedUrl
        : `/templates/${tpl.id}.zip`;   // fallback: static public file

      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      // Last resort: just open the static file
      window.open(`/templates/${tpl.id}.zip`, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  const handleBuy = async () => {
    if (!template) return;
    if (!user) { navigate('/login'); return; }

    // Free template → download immediately
    if (template.isFree) {
      await downloadZip(template);
      return;
    }

    setBuying(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          templateId:    template.id,
          templateTitle: template.title,
          price:         template.price,
          userId:        user.id,
        },
      });
      if (error || !data?.url) throw new Error(error?.message ?? 'Failed to create checkout');
      window.location.assign(data.url);
    } catch (err) {
      alert((err as Error).message);
      setBuying(false);
    }
  };

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

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          fontSize: '14px', marginBottom: '2.5rem', flexWrap: 'wrap',
        }}>
          <Link
            to="/"
            style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#f8fafc'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}
          >
            Home
          </Link>
          <ChevronRight size={14} style={{ color: '#334155', flexShrink: 0 }} />
          <Link
            to="/templates"
            style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#f8fafc'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748b'}
          >
            Templates
          </Link>
          <ChevronRight size={14} style={{ color: '#334155', flexShrink: 0 }} />
          <span style={{
            color: '#f8fafc', fontWeight: 500,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '360px',
          }}>
            {template.title}
          </span>
        </nav>

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

              {/* Tech Stack */}
              {template.techStack && template.techStack.length > 0 && (
                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #1e293b' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', marginBottom: '0.875rem' }}>
                    Tech Stack
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {template.techStack.map(tech => (
                      <span key={tech} style={{
                        borderRadius: '8px',
                        border: '1px solid rgba(56,189,248,0.25)',
                        background: 'rgba(56,189,248,0.07)',
                        padding: '5px 12px',
                        fontSize: '13px', fontWeight: 500, color: '#38bdf8',
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Pages included */}
              {template.pages && template.pages.length > 0 && (
                <div style={{ marginTop: '1.75rem', paddingTop: '1.75rem', borderTop: '1px solid #1e293b' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', marginBottom: '0.875rem' }}>
                    Pages Included
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px' }}>
                    {template.pages.map(page => (
                      <div key={page} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        borderRadius: '8px', border: '1px solid #1e293b',
                        background: '#0f172a', padding: '8px 12px',
                        fontSize: '13px', color: '#94a3b8',
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path d="M3 9h18" />
                        </svg>
                        {page}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* License & support */}
              <div style={{ marginTop: '1.75rem', paddingTop: '1.75rem', borderTop: '1px solid #1e293b' }}>
                <h3 style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontSize: '15px', fontWeight: 600, color: '#ffffff', marginBottom: '0.875rem',
                }}>
                  <ShieldCheck size={16} style={{ color: '#38bdf8' }} />
                  License & support
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  <div style={{
                    borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)', padding: '1rem 1.125rem',
                  }}>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', margin: '0 0 0.625rem' }}>
                      Personal license
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {['Use in unlimited personal projects', 'Modify and customize freely', 'Lifetime access to the files'].map(item => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#94a3b8', lineHeight: 1.5 }}>
                          <Check size={13} style={{ color: '#38bdf8', flexShrink: 0, marginTop: '3px' }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{
                    borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)', padding: '1rem 1.125rem',
                  }}>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', margin: '0 0 0.625rem' }}>
                      Commercial license
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {['Use in client and commercial work', 'Ship as part of an end product', 'No attribution required'].map(item => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#94a3b8', lineHeight: 1.5 }}>
                          <Check size={13} style={{ color: '#38bdf8', flexShrink: 0, marginTop: '3px' }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p style={{ marginTop: '12px', fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                  Every purchase includes friendly email support and free updates. Reselling or redistributing the template itself is not permitted.
                </p>
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

              {/* ── Buy / Download button ── */}
              {alreadyOwned ? (
                /* Already owned (free or purchased) → direct download */
                <button
                  onClick={() => downloadZip(template)}
                  disabled={downloading}
                  style={{
                    width: '100%', borderRadius: '12px',
                    background: downloading ? '#065f46' : '#10b981',
                    padding: '14px', fontSize: '15px', fontWeight: 600,
                    color: '#ffffff', border: 'none',
                    cursor: downloading ? 'wait' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'background 0.2s',
                    boxSizing: 'border-box',
                  }}
                >
                  {downloading ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                      Preparing download…
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      {template.isFree ? 'Download for free' : 'Download template'}
                    </>
                  )}
                </button>
              ) : (
                /* Not yet owned → buy / get for free */
                <button
                  onClick={handleBuy}
                  disabled={buying || downloading}
                  style={{
                    width: '100%', borderRadius: '12px',
                    background: (buying || downloading) ? '#1e293b' : (template.isFree ? '#10b981' : '#38bdf8'),
                    padding: '14px', fontSize: '15px', fontWeight: 600,
                    color: (buying || downloading) ? '#64748b' : '#020617',
                    border: 'none',
                    cursor: (buying || downloading) ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'background 0.2s',
                    boxSizing: 'border-box',
                  }}
                >
                  {downloading ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                      Preparing download…
                    </>
                  ) : buying ? (
                    'Redirecting to checkout…'
                  ) : template.isFree ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Download for free
                    </>
                  ) : (
                    `Buy for $${template.price}`
                  )}
                </button>
              )}

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

              {/* Trust row */}
              <div style={{
                marginTop: '14px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '14px', flexWrap: 'wrap',
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#64748b' }}>
                  <Zap size={12} style={{ color: '#38bdf8', flexShrink: 0 }} />
                  Instant download
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#64748b' }}>
                  <RefreshCw size={12} style={{ color: '#38bdf8', flexShrink: 0 }} />
                  Free updates
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#64748b' }}>
                  <LifeBuoy size={12} style={{ color: '#38bdf8', flexShrink: 0 }} />
                  Support included
                </span>
              </div>

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

      {/* Related Templates */}
      <RelatedTemplates currentId={template.id} category={template.category} tags={template.tags} />
    </div>
  );
}

function RelatedTemplates({ currentId, category, tags }: { currentId: string; category: string; tags?: string[] }) {
  // Up to 4 templates from the same category
  const sameCategory = templates
    .filter(t => t.id !== currentId && t.category === category)
    .slice(0, 4);

  // If not enough in same category, fall back to templates sharing tags
  const tagSet = new Set(tags ?? []);
  const byTags = sameCategory.length < 4
    ? templates
        .filter(t =>
          t.id !== currentId &&
          t.category !== category &&
          t.tags.some(tag => tagSet.has(tag)),
        )
        .slice(0, 4 - sameCategory.length)
    : [];

  const items = [...sameCategory, ...byTags];
  if (items.length === 0) return null;

  return (
    <section style={{ borderTop: '1px solid #1e293b', background: '#020617' }}>
      <Container style={{ paddingTop: '3.5rem', paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
            Related templates
          </h2>
          <Link to="/templates" style={{ fontSize: '14px', color: '#38bdf8', textDecoration: 'none', fontWeight: 500 }}>
            View all templates →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {items.map(t => <TemplateCard key={t.id} template={t} />)}
        </div>
      </Container>
    </section>
  );
}
