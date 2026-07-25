import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Braces,
  Check,
  Download,
  Eye,
  FileArchive,
  Infinity as InfinityIcon,
  MonitorPlay,
  Search,
  Sparkles,
} from 'lucide-react';
import type { Template } from '../types';
import { templates, categories } from '../data/templates';
import TemplateCard from '../components/ui/TemplateCard';
import Container from '../components/ui/Container';
import { useReveal } from '../hooks/useReveal';
import { useSEO } from '../hooks/useSEO';

/* Section rhythm - 96px desktop collapsing to 64px mobile (spec) */
const sectionPad: CSSProperties = {
  paddingTop: 'clamp(64px, 9vw, 96px)',
  paddingBottom: 'clamp(64px, 9vw, 96px)',
};

/* Derived, data-driven numbers - update automatically as templates.ts grows */
const freeCount     = templates.filter(t => t.isFree).length;
const categoryCount = categories.filter(c => c.id !== 'all').length;
const countFor      = (id: string) =>
  id === 'all' ? templates.length : templates.filter(t => t.category === id).length;

const featured = templates.filter(t => t.isFeatured);

/* tnum for every price/stat numeral */
const tnum: CSSProperties = { fontFeatureSettings: '"tnum"' };

/* Hero entrance helper - tmx-rise keyframe lives in App.css */
const rise = (delay: number): CSSProperties => ({
  animation: 'tmx-rise 600ms var(--ease-out-quint) both',
  animationDelay: `${delay}ms`,
});

/* LCP-safe entrance - same travel, no opacity ramp and no delay, so the
   headline and the showcase image are painted in the first frame instead of
   fading in up to a second later. Keyframe is defined in HeroSection. */
const riseVisible: CSSProperties = {
  animation: 'tmx-rise-visible 600ms var(--ease-out-quint) both',
};

/* Bento cursor spotlight - .bento-tile::after reads --spot-x / --spot-y */
function spotlight(e: ReactPointerEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
}

export default function HomePage() {
  useSEO({
    description: `Browse ${templates.length} production-ready React + TypeScript website templates. Preview live, buy once, and ship in minutes.`,
  });

  return (
    <div className="bg-canvas">
      <HeroSection />
      <BentoSection />
      <FeaturedSection />
      <HowItWorksSection />
      <CategorySection />
      <ClosingCtaSection />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MEGA HERO - aurora + grain, white-fade headline,
   browser-frame showcase with floor reflection
───────────────────────────────────────────── */
const trustBadges = [
  { icon: <FileArchive size={14} />, label: `${templates.length} templates` },
  { icon: <Sparkles size={14} />,    label: `${freeCount} free to download` },
  { icon: <MonitorPlay size={14} />, label: 'Live preview on every one' },
];

function HeroSection() {
  const shots = (featured.length >= 3 ? featured : templates).slice(0, 3);

  return (
    <section className="aurora grain relative overflow-hidden">
      {/* LCP candidates rise without the opacity ramp; reduced-motion swaps
          entrance rises for simple fades and drops the LCP travel entirely. */}
      <style>{`
        @keyframes tmx-rise-visible {
          from { transform: translateY(16px); }
          to   { transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-rise] { animation: tmx-fade 200ms ease-out both !important; }
          [data-rise-lcp] { animation: none !important; }
        }
      `}</style>

      <Container className="flex flex-col items-center text-center" style={{ paddingTop: 'clamp(96px, 14vw, 128px)', paddingBottom: '64px' }}>

        {/* Eyebrow - glass pill with pulsing cyan live dot */}
        <div
          data-rise
          style={rise(0)}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border-default bg-[rgba(14,16,20,0.64)] px-4 py-2 backdrop-blur-md"
        >
          <span className="tmx-pulse h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-secondary" style={tnum}>
            {templates.length} templates · free &amp; premium
          </span>
        </div>

        {/* Headline - white fade with one gradient moment */}
        <h1
          data-rise-lcp
          style={riseVisible}
          className="max-w-[880px] text-[clamp(44px,6vw,68px)] font-semibold leading-[1.05] tracking-[-0.035em]"
        >
          <span className="headline-fade">Beautifully engineered templates for your </span>
          <span className="text-gradient-brand">next launch</span>
        </h1>

        {/* Subcopy */}
        <p
          data-rise
          style={rise(200)}
          className="mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-text-secondary"
        >
          Browse a curated library of production-ready website templates.
          Preview live, download instantly, and ship in minutes - not weeks.
        </p>

        {/* CTA row */}
        <div data-rise style={rise(300)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link to="/templates" className="btn btn-primary btn-lg">
            Browse templates
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
          <Link to="/templates?filter=free" className="btn btn-ghost btn-lg">
            View free templates
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>

        {/* Trust pills - honest, catalog-derived facts only */}
        <div data-rise style={rise(350)} className="mt-10 flex flex-wrap justify-center gap-3">
          {trustBadges.map(b => (
            <span
              key={b.label}
              className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-text-secondary"
              style={tnum}
            >
              <span className="inline-flex text-accent">{b.icon}</span>
              {b.label}
            </span>
          ))}
        </div>

        {/* Product showcase - browser frame + masked floor reflection */}
        <div data-rise-lcp style={riseVisible} className="relative mt-16 w-full max-w-[1080px]">
          <ShowcaseFrame shots={shots} priority />
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-full h-40 select-none overflow-hidden"
            style={{
              maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.25), transparent 70%)',
              WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.25), transparent 70%)',
            }}
          >
            <div style={{ transform: 'scaleY(-1)' }}>
              <ShowcaseFrame shots={shots} />
            </div>
          </div>
        </div>

      </Container>
      {/* breathing room for the reflection */}
      <div className="h-24" aria-hidden />
    </section>
  );
}

/* `priority` marks the real (non-reflected) frame - its center shot is the
   desktop LCP candidate, so it loads eagerly at high priority. */
function ShowcaseFrame({ shots, priority = false }: { shots: Template[]; priority?: boolean }) {
  return (
    <div className="sheen overflow-hidden rounded-3xl border border-border-strong bg-surface-1 shadow-lg">
      {/* Browser chrome bar */}
      <div className="flex items-center gap-2 border-b border-border-subtle px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="ml-3 hidden rounded-md border border-border-subtle bg-surface-2 px-3 py-1 font-mono text-[11px] text-text-tertiary sm:inline-block">
          templix
        </span>
      </div>
      {/* 3-up staggered collage - center card larger + glowing */}
      <div className="flex items-end justify-center gap-3 p-4 sm:gap-5 sm:p-7">
        {shots.map((t, i) => {
          const isCenter = i === 1;
          const isLcp = priority && isCenter;
          return (
            <div
              key={t.id}
              className={
                isCenter
                  ? 'glow-card z-10 w-[40%] -translate-y-2 overflow-hidden rounded-xl border border-border-subtle bg-surface-2'
                  : 'w-[30%] overflow-hidden rounded-lg border border-border-subtle bg-surface-2 opacity-80'
              }
            >
              <img
                src={t.image}
                alt={`${t.title} template preview`}
                loading={isLcp ? 'eager' : 'lazy'}
                fetchPriority={isLcp ? 'high' : 'auto'}
                decoding="async"
                width={800}
                height={500}
                className="block aspect-[16/10] w-full object-cover shadow-thumb-frame"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BENTO FEATURES - 12-col grid, cursor spotlight
───────────────────────────────────────────── */
function BentoSection() {
  const heroShot = (featured.length > 0 ? featured : templates)[0];
  const [headingRef, headingCls] = useReveal<HTMLDivElement>();
  const [gridRef, gridCls] = useReveal<HTMLDivElement>();

  return (
    <section>
      <Container style={sectionPad}>

        <div ref={headingRef} className={`reveal mb-12 max-w-[560px] ${headingCls}`}>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Why Templix</p>
          <h2 className="text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-text-primary">
            Everything you need to ship faster
          </h2>
          <p className="mt-3 text-[15px] leading-[1.6] text-text-secondary">
            No subscriptions, no lock-in. Pay once, own it forever - with the source, the license, and real support to back it up.
          </p>
        </div>

        <div ref={gridRef} className={`reveal-group grid gap-6 lg:grid-cols-12 ${gridCls}`}>

          {/* Hero tile - live preview (8 cols) */}
          <div className="bento-tile p-7 lg:col-span-8" onPointerMove={spotlight}>
            <div className="grid items-center gap-8 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Try before you buy</p>
                <h3 className="text-2xl font-semibold tracking-[-0.015em] text-text-primary">
                  Preview live before you buy
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-text-secondary">
                  Every template ships with a full live demo. Click through the real,
                  interactive site, test the responsive layout, and know exactly what you are getting.
                </p>
                <Link to="/templates" className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent transition-colors duration-150 hover:text-accent-hover">
                  Explore the library
                  <ArrowRight size={15} strokeWidth={2.5} />
                </Link>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-border-subtle bg-surface-2">
                <div className="flex items-center gap-1.5 border-b border-border-subtle px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-white/10" />
                  <span className="h-2 w-2 rounded-full bg-white/10" />
                  <span className="h-2 w-2 rounded-full bg-white/10" />
                </div>
                {heroShot && (
                  <img
                    src={heroShot.image}
                    alt={`${heroShot.title} template preview`}
                    loading="lazy"
                    width={800}
                    height={500}
                    className="block aspect-[16/10] w-full object-cover shadow-thumb-frame"
                  />
                )}
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-border-default bg-[rgba(7,8,10,0.72)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-primary backdrop-blur-md">
                  <span className="tmx-pulse h-1.5 w-1.5 rounded-full bg-accent-2" />
                  Live preview
                </span>
              </div>
            </div>
          </div>

          {/* Stat tile - real library counts (4 cols) */}
          <div className="bento-tile flex flex-col justify-between p-7 lg:col-span-4" onPointerMove={spotlight}>
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">The library</p>
              <p className="text-gradient-brand font-mono text-[64px] font-semibold leading-none" style={tnum}>{templates.length}</p>
              <p className="mt-3 text-[15px] leading-[1.6] text-text-secondary">
                Production-ready templates - and counting.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border-subtle pt-5">
              <div>
                <p className="font-mono text-xl font-semibold text-success" style={tnum}>{freeCount}</p>
                <p className="text-[13px] font-medium text-text-tertiary">Free to download</p>
              </div>
              <div>
                <p className="font-mono text-xl font-semibold text-text-primary" style={tnum}>{categoryCount}</p>
                <p className="text-[13px] font-medium text-text-tertiary">Categories</p>
              </div>
            </div>
          </div>

          {/* Instant download */}
          <div className="bento-tile p-7 lg:col-span-4" onPointerMove={spotlight}>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-accent-soft-border bg-accent-soft text-accent">
              <FileArchive size={20} />
            </div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Zero waiting</p>
            <h3 className="text-lg font-semibold tracking-[-0.01em] text-text-primary">Instant download</h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-text-secondary">
              Your files are ready the second checkout clears. Grab the zip and start building.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['.tsx', '.ts', '.css', '.md'].map(ext => (
                <span key={ext} className="rounded-md border border-border-default bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-text-tertiary">
                  {ext}
                </span>
              ))}
            </div>
          </div>

          {/* Buy once, keep forever */}
          <div className="bento-tile p-7 lg:col-span-4" onPointerMove={spotlight}>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-accent-soft-border bg-accent-soft text-accent">
              <InfinityIcon size={20} />
            </div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">No subscriptions</p>
            <h3 className="text-lg font-semibold tracking-[-0.01em] text-text-primary">Buy once, keep it forever</h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-text-secondary">
              One flat price per template. No renewals, no seats, no recurring fees - download it and it is yours.
            </p>
            <div className="mt-5 space-y-2">
              {['One-time payment', 'No subscription', 'Yours to keep'].map(item => (
                <div key={item} className="flex items-center gap-2.5 text-[13px] text-text-secondary">
                  <Check size={14} className="shrink-0 text-success" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* React + TypeScript */}
          <div className="bento-tile p-7 lg:col-span-4" onPointerMove={spotlight}>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-accent-soft-border bg-accent-soft text-accent">
              <Braces size={20} />
            </div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Clean by default</p>
            <h3 className="text-lg font-semibold tracking-[-0.01em] text-text-primary">React &amp; TypeScript</h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-text-secondary">
              Every template is one responsive single-page site in modern React and TypeScript, bundled with Vite - easy to read, easy to extend.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {['React', 'TypeScript', 'Vite'].map(tech => (
                <span key={tech} className="rounded-md border border-border-default bg-surface-2 px-2 py-2 text-center text-[12px] font-medium text-text-secondary">
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FEATURED TEMPLATES
───────────────────────────────────────────── */
function FeaturedSection() {
  const [headingRef, headingCls] = useReveal<HTMLDivElement>();
  const [gridRef, gridCls] = useReveal<HTMLDivElement>();

  return (
    <section className="border-t border-border-subtle bg-canvas-raised">
      <Container style={sectionPad}>

        <div ref={headingRef} className={`reveal mb-10 flex flex-wrap items-end justify-between gap-4 ${headingCls}`}>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Featured</p>
            <h2 className="text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-text-primary">
              Handpicked templates
            </h2>
            <p className="mt-3 text-[15px] text-text-secondary">
              Carefully selected for quality and design.
            </p>
          </div>
          <Link
            to="/templates"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-accent transition-colors duration-150 hover:text-accent-hover"
            style={tnum}
          >
            View all {templates.length} templates
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>

        <div ref={gridRef} className={`reveal-group grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${gridCls}`}>
          {/* wrapper divs take the reveal transition - TemplateCard keeps its own inline hover transitions */}
          {featured.map(t => (
            <div key={t.id} className="[&>a]:h-full">
              <TemplateCard template={t} />
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HOW IT WORKS - slim 3-step strip
───────────────────────────────────────────── */
const steps = [
  {
    n: '01',
    icon: <Search size={18} />,
    title: 'Browse the library',
    desc: 'Filter by category, price, or tech stack to find the perfect starting point for your project.',
  },
  {
    n: '02',
    icon: <Eye size={18} />,
    title: 'Preview the live demo',
    desc: 'Every template ships with a full live preview. Click through the real site before you commit.',
  },
  {
    n: '03',
    icon: <Download size={18} />,
    title: 'Download & ship',
    desc: 'Grab the zip, drop in your content, and deploy. You can be live in minutes, not weeks.',
  },
];

function HowItWorksSection() {
  const [headingRef, headingCls] = useReveal<HTMLDivElement>();
  const [gridRef, gridCls] = useReveal<HTMLDivElement>();

  return (
    <section className="border-t border-border-subtle">
      <Container style={sectionPad}>

        <div ref={headingRef} className={`reveal mb-12 text-center ${headingCls}`}>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">How it works</p>
          <h2 className="text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-text-primary">
            From browsing to live in three steps
          </h2>
        </div>

        <div ref={gridRef} className={`reveal-group grid gap-6 md:grid-cols-3 ${gridCls}`}>
          {steps.map(s => (
            <div key={s.n} className="sheen relative rounded-2xl border border-border-subtle bg-surface-1 p-7">
              <span className="text-gradient-brand absolute right-6 top-5 font-mono text-[28px] font-semibold opacity-60" style={tnum}>
                {s.n}
              </span>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-accent-soft-border bg-accent-soft text-accent">
                {s.icon}
              </div>
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-text-primary">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-text-secondary">{s.desc}</p>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CATEGORY SHOWCASE - chip row
───────────────────────────────────────────── */
function CategorySection() {
  const [blockRef, blockCls] = useReveal<HTMLDivElement>();

  return (
    <section className="border-t border-border-subtle bg-canvas-raised">
      <Container style={{ paddingTop: '64px', paddingBottom: '64px' }}>
        <div ref={blockRef} className={`reveal ${blockCls}`}>

        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Browse by category</p>
            <h2 className="text-2xl font-semibold tracking-[-0.015em] text-text-primary">
              Find your starting point
            </h2>
          </div>
          <p className="text-[13px] text-text-tertiary" style={tnum}>
            {templates.length} templates across {categoryCount} categories
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {categories.map(cat => {
            const isAll = cat.id === 'all';
            return (
              <Link
                key={cat.id}
                to={isAll ? '/templates' : `/templates?category=${cat.id}`}
                className={isAll ? 'chip is-active' : 'chip'}
              >
                {cat.label}
                <span className="font-mono text-[11px] text-text-tertiary" style={tnum}>
                  {countFor(cat.id)}
                </span>
              </Link>
            );
          })}
        </div>

        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CLOSING CTA BAND
   No email capture until a real subscriber list exists - a success message
   for a form that discards the address would be a false claim.
───────────────────────────────────────────── */
function ClosingCtaSection() {
  const [panelRef, panelCls] = useReveal<HTMLDivElement>();

  return (
    <section className="border-t border-border-subtle">
      <Container style={sectionPad}>
        <div
          ref={panelRef}
          className={`reveal aurora aurora--dim grain relative overflow-hidden rounded-3xl border border-border-subtle bg-canvas-raised px-6 py-16 text-center sm:px-12 ${panelCls}`}
        >

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Always shipping</p>
          <h2 className="text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-text-primary">
            The library keeps growing
          </h2>
          <p className="mx-auto mt-3 max-w-[440px] text-[15px] leading-[1.6] text-text-secondary">
            New templates land regularly - every one with a live preview before you spend anything.
          </p>

          <div className="mt-10">
            <div className="hairline mx-auto mb-8 max-w-[480px]" />
            <Link to="/templates" className="btn btn-primary btn-lg" style={tnum}>
              Browse all {templates.length} templates
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );
}
