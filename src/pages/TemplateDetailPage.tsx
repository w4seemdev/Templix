import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ChevronRight, ExternalLink, Check, Monitor, Zap, Star, LifeBuoy,
  ShieldCheck, Download, X, Loader2, ArrowRight, FileCode2, Layers,
} from 'lucide-react';
import { templates } from '../data/templates';
import Container from '../components/ui/Container';
import TemplateCard from '../components/ui/TemplateCard';
import { useAuth } from '../context/AuthContext';
import { usePurchases } from '../hooks/usePurchases';
import { useSEO } from '../hooks/useSEO';
import { supabase } from '../lib/supabase';
import { getTemplateDownloadUrl } from '../lib/downloads';

const MONO_TNUM = { fontFeatureSettings: '"tnum"' } as const;

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
  const { pathname }     = useLocation();
  const alreadyOwned     = template ? (template.isFree || hasPurchased(template.id)) : false;
  const includedItems    = template?.included ?? [];

  useSEO({ title: template?.title, description: template?.description });

  // A11y: Escape closes the full-screen preview; lock body scroll while open.
  useEffect(() => {
    if (!previewOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [previewOpen]);

  /** Trigger a direct browser download of the zip via the shared, ownership-aware resolver. */
  const downloadZip = async (tpl: typeof template) => {
    if (!tpl) return;
    setDownloading(true);
    const fileName = `${tpl.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.zip`;

    try {
      // Free -> public URL; paid -> ownership-verified signed URL (throws if not owned).
      const url = await getTemplateDownloadUrl(tpl.id, tpl.isFree);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      alert((err as Error).message || 'Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleBuy = async () => {
    if (!template) return;
    // Preserve purchase intent: send the buyer back to this template after auth.
    if (!user) { navigate('/login', { state: { next: pathname } }); return; }

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
      <div className="min-h-screen bg-canvas flex items-center justify-center p-8 text-center">
        <div className="max-w-[420px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary mb-4">Error 404</p>
          <h2 className="text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] text-text-primary mb-3">
            Template not found
          </h2>
          <p className="text-[15px] leading-relaxed text-text-secondary mb-8">
            This template doesn't exist or was removed from the catalog.
          </p>
          <Link to="/templates" className="btn btn-primary glow-cta">
            Back to templates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas">

      {/* ── Full-screen iframe overlay ── */}
      {previewOpen && hasLivePreview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${template.title} live preview`}
          className="fixed inset-0 z-[9999] bg-canvas flex flex-col"
        >
          {/* Preview bar */}
          <div className="glass-nav flex items-center justify-between px-6 h-[56px] shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-soft border border-accent-soft-border">
                <Monitor size={14} className="text-accent-text" />
              </span>
              <span className="text-[13px] font-semibold text-text-primary truncate">{template.title}</span>
              <span className="hidden sm:inline text-xs text-text-tertiary">— Live preview</span>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={template.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-[13px] text-text-tertiary hover:text-text-primary transition-colors duration-150"
              >
                <ExternalLink size={14} /> Open in new tab
              </a>
              <button
                onClick={() => setPreviewOpen(false)}
                className="btn btn-secondary btn-sm"
              >
                <X size={14} /> Close preview
              </button>
            </div>
          </div>
          <iframe
            src={template.demoUrl}
            className="flex-1 w-full border-none bg-white"
            title={`${template.title} preview`}
          />
        </div>
      )}

      <Container style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 flex-wrap text-[13px] mb-10">
          <Link to="/" className="text-text-tertiary hover:text-text-primary transition-colors duration-150 no-underline">
            Home
          </Link>
          <ChevronRight size={13} className="text-text-disabled shrink-0" />
          <Link to="/templates" className="text-text-tertiary hover:text-text-primary transition-colors duration-150 no-underline">
            Templates
          </Link>
          <ChevronRight size={13} className="text-text-disabled shrink-0" />
          <span className="text-text-primary font-medium truncate max-w-[360px]">{template.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_380px] items-start">

          {/* ── Left: gallery + info ── */}
          <div className="min-w-0">
            {/* Preview frame */}
            <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border-subtle bg-surface-2 shadow-thumb-frame">
              <img
                src={template.image}
                alt={template.title}
                className="h-full w-full object-cover"
              />
              {/* sheen */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: 'var(--gradient-sheen)' }} />

              {/* Hover overlay to open preview */}
              {hasLivePreview && (
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  aria-label={`Launch live preview of ${template.title}`}
                  className="absolute inset-0 flex cursor-pointer items-center justify-center border-none bg-[rgba(7,8,10,0.5)] opacity-0 transition-opacity duration-200 focus-visible:opacity-100 group-hover:opacity-100"
                >
                  <span className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold text-text-primary">
                    <Monitor size={15} className="text-accent-text" />
                    Launch live preview
                  </span>
                </button>
              )}
            </div>

            {/* Info */}
            <div className="mt-10">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">
                {template.category}
              </p>
              <h1 className="m-0 mb-3 text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] text-text-primary">
                {template.title}
              </h1>
              <p className="m-0 text-[17px] leading-[1.6] text-text-secondary">
                {template.description}
              </p>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {template.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-border-default bg-surface-2 px-3.5 py-1.5 text-[13px] font-medium text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Tech Stack */}
              {template.techStack && template.techStack.length > 0 && (
                <div className="mt-10">
                  <div className="hairline mb-8" />
                  <h3 className="mb-4 flex items-center gap-2 text-[18px] font-semibold tracking-[-0.01em] text-text-primary">
                    <FileCode2 size={16} className="text-accent-text" />
                    Tech stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {template.techStack.map(tech => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full border border-accent-soft-border bg-accent-soft px-3.5 py-1.5 text-[13px] font-medium text-accent-text"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sections — each template is one responsive single-page site */}
              {template.pages && template.pages.length > 0 && (
                <div className="mt-10">
                  <div className="hairline mb-8" />
                  <h3 className="mb-4 flex items-center gap-2 text-[18px] font-semibold tracking-[-0.01em] text-text-primary">
                    <Layers size={16} className="text-accent-text" />
                    Sections
                  </h3>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
                    {template.pages.map(page => (
                      <div
                        key={page}
                        className="flex items-center gap-2 rounded-lg border border-border-subtle bg-surface-1 px-3 py-2 text-[13px] text-text-secondary"
                      >
                        <Check size={13} className="shrink-0 text-accent" />
                        {page}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* License — identical Templix Standard License on every template */}
              <div className="mt-10">
                <div className="hairline mb-8" />
                <h3 className="mb-4 flex items-center gap-2 text-[18px] font-semibold tracking-[-0.01em] text-text-primary">
                  <ShieldCheck size={16} className="text-accent-text" />
                  License
                </h3>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
                  <div className="sheen rounded-xl border border-border-subtle bg-surface-1 p-5">
                    <p className="m-0 mb-3 text-[13px] font-semibold text-text-primary">What you can do</p>
                    <ul className="m-0 flex list-none flex-col gap-2 p-0">
                      {['Use in unlimited personal and commercial end-products', 'Modify and customize freely', 'Use in client work — no attribution required'].map(item => (
                        <li key={item} className="flex items-start gap-2 text-[13px] leading-normal text-text-secondary">
                          <Check size={13} className="mt-[3px] shrink-0 text-success" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="sheen rounded-xl border border-border-subtle bg-surface-1 p-5">
                    <p className="m-0 mb-3 text-[13px] font-semibold text-text-primary">What you cannot do</p>
                    <ul className="m-0 flex list-none flex-col gap-2 p-0">
                      {['Resell or redistribute the template itself', 'Sublicense it to others', 'Offer the template for download elsewhere'].map(item => (
                        <li key={item} className="flex items-start gap-2 text-[13px] leading-normal text-text-secondary">
                          <X size={13} className="mt-[3px] shrink-0 text-danger" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="m-0 mt-4 text-[13px] leading-[1.6] text-text-tertiary">
                  Free templates carry the same usage terms with no purchase required. Read the full{' '}
                  <Link to="/license" className="font-medium text-accent-text no-underline transition-colors duration-150 hover:text-accent-hover hover:underline">
                    Templix Standard License
                  </Link>
                  .
                </p>
              </div>

              {/* Reviews — honest placeholder; no ratings system exists yet */}
              <div className="mt-10">
                <div className="hairline mb-8" />
                <h3 className="mb-4 flex items-center gap-2 text-[18px] font-semibold tracking-[-0.01em] text-text-primary">
                  <Star size={16} className="text-accent-text" />
                  Reviews
                </h3>
                <div className="flex flex-col items-center rounded-xl border border-dashed border-border-default bg-surface-1 px-6 py-10 text-center">
                  <div className="mb-3 flex gap-1" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={16} className="text-text-disabled" strokeWidth={1.5} />
                    ))}
                  </div>
                  <p className="m-0 text-[14px] font-medium text-text-secondary">No reviews yet</p>
                  <p className="m-0 mt-1 text-[13px] text-text-tertiary">
                    Buy this template and you can be the first to review it.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: sticky glass buy box ── */}
          <div className="lg:sticky lg:top-[88px]">
            <div className="glass p-6">
              {/* Price */}
              <div className="mb-6 flex items-center gap-3">
                <span
                  className={`font-mono text-4xl font-semibold ${template.isFree ? 'text-success' : 'text-text-primary'}`}
                  style={MONO_TNUM}
                >
                  {template.isFree ? 'Free' : `$${template.price}`}
                </span>
                {template.isPremium && (
                  <span className="inline-flex items-center rounded border border-accent-soft-border bg-accent-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">
                    Premium
                  </span>
                )}
                {template.isFree && (
                  <span className="inline-flex items-center rounded border border-success-soft-border bg-success-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-success">
                    Free
                  </span>
                )}
              </div>
              {!template.isFree && (
                <p className="-mt-4 mb-6 flex items-center gap-1.5 text-[13px] text-success">
                  <Check size={13} className="shrink-0" />
                  One-time purchase — yours to keep
                </p>
              )}

              {/* ── Buy / Download button ── */}
              {alreadyOwned ? (
                /* Already owned (free or purchased) → direct download */
                <button
                  onClick={() => downloadZip(template)}
                  disabled={downloading}
                  className="btn btn-lg w-full bg-success text-[#04150C] hover:brightness-110"
                  style={downloading ? { cursor: 'wait' } : undefined}
                >
                  {downloading ? (
                    <>
                      <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      Preparing download…
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      {template.isFree ? 'Download free' : 'Download template'}
                    </>
                  )}
                </button>
              ) : (
                /* Not yet owned → buy / get for free */
                <button
                  onClick={handleBuy}
                  disabled={buying || downloading}
                  className={`btn btn-lg w-full ${template.isFree ? 'bg-success text-[#04150C] hover:brightness-110' : 'btn-primary'}`}
                >
                  {downloading ? (
                    <>
                      <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      Preparing download…
                    </>
                  ) : buying ? (
                    'Redirecting to checkout…'
                  ) : template.isFree ? (
                    <>
                      <Download size={16} />
                      Download free
                    </>
                  ) : (
                    <span className="inline-flex items-baseline gap-2">
                      Buy now —
                      <span className="font-mono" style={MONO_TNUM}>${template.price}</span>
                    </span>
                  )}
                </button>
              )}

              {/* Preview button */}
              {hasLivePreview ? (
                <button
                  onClick={() => setPreviewOpen(true)}
                  className="btn btn-secondary mt-2.5 w-full"
                >
                  <Monitor size={15} />
                  Live preview
                </button>
              ) : (
                <div className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg border border-border-subtle px-4 py-3 text-[14px] text-text-disabled">
                  Preview coming soon
                </div>
              )}

              {/* Trust row — every item links to a real page */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <span className="inline-flex items-center gap-1.5 text-[13px] text-text-tertiary">
                  <Zap size={13} className="shrink-0 text-accent-text" />
                  Instant download
                </span>
                <Link to="/license" className="inline-flex items-center gap-1.5 text-[13px] text-text-tertiary no-underline transition-colors duration-150 hover:text-text-secondary">
                  <ShieldCheck size={13} className="shrink-0 text-accent-text" />
                  Standard license
                </Link>
                <Link to="/support" className="inline-flex items-center gap-1.5 text-[13px] text-text-tertiary no-underline transition-colors duration-150 hover:text-text-secondary">
                  <LifeBuoy size={13} className="shrink-0 text-accent-text" />
                  Email support
                </Link>
              </div>

              {/* Included — sourced from the catalog so it stays truthful per template */}
              {includedItems.length > 0 && (
                <>
                  <div className="hairline my-6" />
                  <div>
                    <h4 className="m-0 mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                      What's included
                    </h4>
                    <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                      {includedItems.map(item => (
                        <li key={item} className="flex items-center gap-2.5 text-[13px] text-text-secondary">
                          <Check size={14} className="shrink-0 text-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Category */}
              <div className="hairline my-6" />
              <div className="text-[13px] text-text-tertiary">
                Category:{' '}
                <Link
                  to="/templates"
                  className="capitalize text-accent-text no-underline transition-colors duration-150 hover:text-accent-hover"
                >
                  {template.category}
                </Link>
              </div>

              {/* Licensing & refunds pointer */}
              <p className="m-0 mt-4 text-[12px] leading-[1.6] text-text-tertiary">
                Questions about licensing or refunds? See our{' '}
                <Link to="/faq" className="text-accent-text no-underline transition-colors duration-150 hover:text-accent-hover hover:underline">
                  FAQ
                </Link>
                .
              </p>
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
    <section className="border-t border-border-subtle bg-canvas-raised">
      <Container style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="m-0 mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">
              Keep exploring
            </p>
            <h2 className="m-0 text-2xl font-semibold tracking-[-0.015em] text-text-primary">
              Related templates
            </h2>
          </div>
          <Link
            to="/templates"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-text-secondary no-underline transition-colors duration-150 hover:text-text-primary"
          >
            View all templates <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {items.map(t => <TemplateCard key={t.id} template={t} />)}
        </div>
      </Container>
    </section>
  );
}
