import type { PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, Palette, ShoppingBag, PenLine, Building2, Rocket,
  LayoutDashboard, UtensilsCrossed, Briefcase, FolderOpen, ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { templates, categories } from '../data/templates';
import Container from '../components/ui/Container';
import { useSEO } from '../hooks/useSEO';
import { useReveal } from '../hooks/useReveal';

const categoryIcons: Record<string, LucideIcon> = {
  saas:       Zap,
  portfolio:  Palette,
  ecommerce:  ShoppingBag,
  blog:       PenLine,
  agency:     Building2,
  landing:    Rocket,
  dashboard:  LayoutDashboard,
  restaurant: UtensilsCrossed,
  corporate:  Briefcase,
};

const TNUM = { fontFeatureSettings: '"tnum"' } as const;

/** Feed the .bento-tile cursor spotlight its position. */
function trackSpotlight(e: PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
}

export default function CategoriesPage() {
  useSEO({
    title: 'Categories',
    description: 'Browse Templix templates by category - SaaS, portfolio, e-commerce, dashboards and more.',
  });

  const browsable = categories.filter(c => c.id !== 'all');
  const [headingRef, headingCls] = useReveal<HTMLElement>();
  const [gridRef, gridCls] = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-canvas">
      <Container style={{ paddingTop: 'clamp(48px, 8vw, 80px)', paddingBottom: '96px' }}>

        {/* Page header */}
        <header ref={headingRef} className={`reveal mb-12 text-center ${headingCls}`}>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
            Browse by category
          </p>
          <h1 className="headline-fade mx-auto text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[44px]">
            Find your perfect template
          </h1>
          <p className="mx-auto mt-3 max-w-[52ch] text-[15px] text-text-secondary">
            <span className="font-mono font-medium text-text-primary" style={TNUM}>{templates.length}</span>
            {' '}templates across{' '}
            <span className="font-mono font-medium text-text-primary" style={TNUM}>{browsable.length}</span>
            {' '}categories - every one production-ready.
          </p>
        </header>

        {/* Category bento tiles */}
        <div ref={gridRef} className={`reveal-group grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${gridCls}`}>
          {browsable.map(cat => {
            const inCategory = templates.filter(t => t.category === cat.id);
            const previews   = inCategory.slice(0, 3);
            const freeCount  = inCategory.filter(t => t.isFree).length;
            const Icon       = categoryIcons[cat.id] ?? FolderOpen;

            return (
              <Link
                key={cat.id}
                to={`/templates?category=${cat.id}`}
                onPointerMove={trackSpotlight}
                className="bento-tile group flex flex-col p-6 no-underline focus-visible:[outline:2px_solid_var(--color-border-accent)] focus-visible:outline-offset-2"
              >
                {/* Icon + name + count */}
                <div className="mb-5 flex items-center gap-3.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent-soft-border bg-accent-soft">
                    <Icon size={20} className="text-accent-text" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="m-0 truncate text-[17px] font-semibold tracking-[-0.01em] text-text-primary">
                      {cat.label}
                    </h2>
                    <p className="m-0 mt-0.5 text-[13px] text-text-tertiary">
                      <span className="font-mono" style={TNUM}>{inCategory.length}</span>
                      {' '}template{inCategory.length !== 1 ? 's' : ''}
                      {freeCount > 0 && (
                        <>
                          {' '}· <span className="text-success"><span className="font-mono" style={TNUM}>{freeCount}</span> free</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Mini preview strip - thumbnails on a lighter well, 1px inset frame */}
                <div className="flex gap-2">
                  {previews.length > 0 ? previews.map(t => (
                    <div
                      key={t.id}
                      className="relative aspect-[16/10] flex-1 overflow-hidden rounded-lg bg-surface-2"
                    >
                      <img
                        src={t.image}
                        alt={`${t.title} template preview`}
                        loading="lazy"
                        width={320}
                        height={200}
                        className="block h-full w-full object-cover opacity-75 transition-opacity duration-200 group-hover:opacity-100"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}
                      />
                    </div>
                  )) : (
                    <div className="flex aspect-[16/10] flex-1 items-center justify-center rounded-lg border border-dashed border-border-default bg-surface-2 text-[13px] text-text-tertiary">
                      Coming soon
                    </div>
                  )}
                </div>

                {/* CTA row */}
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent-text transition-colors duration-150 group-hover:text-accent-hover">
                  Browse {cat.label}
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-150 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="hairline mt-16 mb-10" />
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="m-0 text-[15px] text-text-secondary">
            Not sure where to start? See everything in one place.
          </p>
          <Link to="/templates" className="btn btn-secondary">
            Browse all {templates.length} templates
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

      </Container>
    </div>
  );
}
