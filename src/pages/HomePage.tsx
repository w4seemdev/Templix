import { useState } from 'react';
import type { CSSProperties, FormEvent, PointerEvent as ReactPointerEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Download,
  Eye,
  FileArchive,
  MonitorPlay,
  PenTool,
  RefreshCw,
  Search,
  Sparkles,
  Star,
} from 'lucide-react';
import type { Template } from '../types';
import { templates, categories } from '../data/templates';
import TemplateCard from '../components/ui/TemplateCard';
import Container from '../components/ui/Container';
import { useReveal } from '../hooks/useReveal';

/* Section rhythm — 96px desktop collapsing to 64px mobile (spec) */
const sectionPad: CSSProperties = {
  paddingTop: 'clamp(64px, 9vw, 96px)',
  paddingBottom: 'clamp(64px, 9vw, 96px)',
};

/* Derived, data-driven numbers — update automatically as templates.ts grows */
const freeCount     = templates.filter(t => t.isFree).length;
const categoryCount = categories.filter(c => c.id !== 'all').length;
const countFor      = (id: string) =>
  id === 'all' ? templates.length : templates.filter(t => t.category === id).length;

const featured = templates.filter(t => t.isFeatured);

/* tnum for every price/stat numeral */
const tnum: CSSProperties = { fontFeatureSettings: '"tnum"' };

/* Hero entrance helper — tmx-rise keyframe lives in App.css */
const rise = (delay: number): CSSProperties => ({
  animation: 'tmx-rise 600ms var(--ease-out-quint) both',
  animationDelay: `${delay}ms`,
});

/* Bento cursor spotlight — .bento-tile::after reads --spot-x / --spot-y */
function spotlight(e: ReactPointerEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
}

export default function HomePage() {
  return (
    <div className="bg-canvas">
      <HeroSection />
      <MarqueeSection />
      <BentoSection />
      <FeaturedSection />
      <HowItWorksSection />
      <CategorySection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MEGA HERO — aurora + grain, white-fade headline,
   browser-frame showcase with floor reflection
───────────────────────────────────────────── */
const trustBadges = [
  { icon: <Download size={14} />,    label: '12,000+ downloads' },
  { icon: <MonitorPlay size={14} />, label: `${templates.length} live previews` },
  { icon: <Sparkles size={14} />,    label: `${freeCount} free template${freeCount !== 1 ? 's' : ''}` },
];

function HeroSection() {
  const shots = (featured.length >= 3 ? featured : templates).slice(0, 3);

  return (
    <section className="aurora grain relative overflow-hidden">
      {/* Reduced-motion: swap entrance rises for simple fades */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-rise] { animation: tmx-fade 200ms ease-out both !important; }
        }
      `}</style>

      <Container className="flex flex-col items-center text-center" style={{ paddingTop: 'clamp(96px, 14vw, 128px)', paddingBottom: '64px' }}>

        {/* Eyebrow — glass pill with pulsing cyan live dot */}
        <div
          data-rise
          style={rise(0)}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border-default bg-[rgba(14,16,20,0.64)] px-4 py-2 backdrop-blur-md"
        >
          <span className="tmx-pulse h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-secondary" style={tnum}>
            {templates.length}+ templates · new drops weekly
          </span>
        </div>

        {/* Headline — white fade with one gradient moment */}
        <h1
          data-rise
          style={rise(100)}
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
          Preview live, download instantly, and ship in minutes — not weeks.
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

        {/* Trust pills */}
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

        {/* Product showcase — browser frame + masked floor reflection */}
        <div data-rise style={rise(400)} className="relative mt-16 w-full max-w-[1080px]">
          <ShowcaseFrame shots={shots} />
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

function ShowcaseFrame({ shots }: { shots: Template[] }) {
  return (
    <div className="sheen overflow-hidden rounded-3xl border border-border-strong bg-surface-1 shadow-lg">
      {/* Browser chrome bar */}
      <div className="flex items-center gap-2 border-b border-border-subtle px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="ml-3 hidden rounded-md border border-border-subtle bg-surface-2 px-3 py-1 font-mono text-[11px] text-text-tertiary sm:inline-block">
          templix.market
        </span>
      </div>
      {/* 3-up staggered collage — center card larger + glowing */}
      <div className="flex items-end justify-center gap-3 p-4 sm:gap-5 sm:p-7">
        {shots.map((t, i) => {
          const isCenter = i === 1;
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
                alt={t.title}
                loading="lazy"
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
   SOCIAL PROOF — grayscale wordmark marquee
───────────────────────────────────────────── */
const marqueeBrands = [
  'Northbeam', 'Hexlab', 'Quantify', 'Vantage', 'Arclight',
  'Polygon Studio', 'Driftwood', 'Lumen&Co', 'Basecoat', 'Fathom',
];

function MarqueeSection() {
  return (
    <section className="border-y border-border-subtle bg-canvas-raised">
      <Container style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
          Trusted by teams shipping with Templix
        </p>
        <div className="tmx-marquee">
          <div className="tmx-marquee-track items-center gap-16 pr-16">
            {[...marqueeBrands, ...marqueeBrands].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap text-[15px] font-semibold tracking-[0.02em] text-text-primary opacity-40 transition-opacity duration-150 hover:opacity-80"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BENTO FEATURES — 12-col grid, cursor spotlight
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
            No subscriptions, no lock-in. Pay once, own it forever — with the files, license, and support to back it up.
          </p>
        </div>

        <div ref={gridRef} className={`reveal-group grid gap-6 lg:grid-cols-12 ${gridCls}`}>

          {/* Hero tile — live preview (8 cols) */}
          <div className="bento-tile p-7 lg:col-span-8" onPointerMove={spotlight}>
            <div className="grid items-center gap-8 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Try before you buy</p>
                <h3 className="text-2xl font-semibold tracking-[-0.015em] text-text-primary">
                  Preview live before you buy
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-text-secondary">
                  Every template ships with a full live demo. Click through real pages,
                  test the responsive layout, and know exactly what you are getting.
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
                    alt={heroShot.title}
                    loading="lazy"
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

          {/* Stat tile — rating (4 cols) */}
          <div className="bento-tile flex flex-col justify-between p-7 lg:col-span-4" onPointerMove={spotlight}>
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Rated by builders</p>
              <p className="text-gradient-brand font-mono text-[64px] font-semibold leading-none" style={tnum}>4.9</p>
              <div className="mt-3 flex gap-1" aria-label="4.9 out of 5 stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={16} fill="#F5A623" color="#F5A623" strokeWidth={1} />
                ))}
              </div>
              <p className="mt-3 text-[15px] leading-[1.6] text-text-secondary">
                Average rating across the entire library.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border-subtle pt-5">
              <div>
                <p className="font-mono text-xl font-semibold text-text-primary" style={tnum}>{templates.length}+</p>
                <p className="text-[13px] font-medium text-text-tertiary">Templates</p>
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
              {['.zip', '.tsx', '.css', '.fig'].map(ext => (
                <span key={ext} className="rounded-md border border-border-default bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-text-tertiary">
                  {ext}
                </span>
              ))}
            </div>
          </div>

          {/* Lifetime updates */}
          <div className="bento-tile p-7 lg:col-span-4" onPointerMove={spotlight}>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-accent-soft-border bg-accent-soft text-accent">
              <RefreshCw size={20} />
            </div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Buy once</p>
            <h3 className="text-lg font-semibold tracking-[-0.01em] text-text-primary">Lifetime updates</h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-text-secondary">
              Every improvement ships to you free — forever. No renewals, no subscription.
            </p>
            <div className="mt-5 space-y-2">
              {[
                { v: 'v2.1', note: 'New dashboard pages' },
                { v: 'v2.0', note: 'Dark mode + a11y pass' },
              ].map(r => (
                <div key={r.v} className="flex items-center gap-3 text-[13px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  <span className="font-mono font-medium text-text-primary" style={tnum}>{r.v}</span>
                  <span className="text-text-tertiary">{r.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Figma + code */}
          <div className="bento-tile p-7 lg:col-span-4" onPointerMove={spotlight}>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-accent-soft-border bg-accent-soft text-accent">
              <PenTool size={20} />
            </div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Design + build</p>
            <h3 className="text-lg font-semibold tracking-[-0.01em] text-text-primary">Figma & clean code</h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-text-secondary">
              Source design files alongside modern React, Next.js, and HTML — easy to read, easy to extend.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <span className="rounded-md border border-border-default bg-surface-2 px-3 py-2 text-center text-[13px] font-medium text-text-secondary">Figma</span>
              <span className="rounded-md border border-border-default bg-surface-2 px-3 py-2 text-center font-mono text-[13px] text-text-secondary">{'<code />'}</span>
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
          {/* wrapper divs take the reveal transition — TemplateCard keeps its own inline hover transitions */}
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
   HOW IT WORKS — slim 3-step strip
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
    desc: 'Every template ships with a full live preview. Click through real pages before you commit.',
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
   CATEGORY SHOWCASE — chip row
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
   TESTIMONIALS
───────────────────────────────────────────── */
const testimonials = [
  {
    quote: 'I shipped a client site over a single weekend with one of these templates. The code was so clean I barely had to touch it — just swapped the content and deployed.',
    name: 'Maya Chen',
    role: 'Frontend Developer, Nova Labs',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&q=80',
  },
  {
    quote: 'We launched our SaaS landing page in two days instead of two sprints. The live preview meant zero surprises — what we saw is exactly what we got.',
    name: 'Daniel Okafor',
    role: 'Founder, Brightstack',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&q=80',
  },
  {
    quote: 'As a designer, I am picky about typography and spacing. These are the first templates I have bought that I did not feel the need to redesign from scratch.',
    name: 'Sofia Marin',
    role: 'Freelance Product Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&q=80',
  },
];

function TestimonialsSection() {
  const [headingRef, headingCls] = useReveal<HTMLDivElement>();
  const [gridRef, gridCls] = useReveal<HTMLDivElement>();

  return (
    <section className="border-t border-border-subtle">
      <Container style={sectionPad}>

        <div ref={headingRef} className={`reveal mb-12 text-center ${headingCls}`}>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Social proof</p>
          <h2 className="text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-text-primary">
            Loved by builders worldwide
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] text-[15px] leading-[1.6] text-text-secondary">
            Developers, founders, and designers ship faster with Templix.
          </p>
        </div>

        <div ref={gridRef} className={`reveal-group grid gap-6 md:grid-cols-3 ${gridCls}`}>
          {testimonials.map(t => (
            <figure key={t.name} className="sheen relative m-0 flex flex-col rounded-2xl border border-border-subtle bg-surface-1 p-7">
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={14} fill="#F5A623" color="#F5A623" strokeWidth={1} />
                ))}
              </div>
              <blockquote className="m-0 flex-1 text-[15px] leading-[1.7] text-text-secondary">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  loading="lazy"
                  className="h-10 w-10 rounded-full border border-border-default object-cover"
                />
                <div>
                  <p className="m-0 text-[14px] font-semibold text-text-primary">{t.name}</p>
                  <p className="m-0 mt-0.5 text-[13px] text-text-tertiary">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA BAND + NEWSLETTER
───────────────────────────────────────────── */
function NewsletterSection() {
  const [email, setEmail]         = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [panelRef, panelCls] = useReveal<HTMLDivElement>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="border-t border-border-subtle">
      <Container style={sectionPad}>
        <div
          ref={panelRef}
          className={`reveal aurora aurora--dim grain relative overflow-hidden rounded-3xl border border-border-subtle bg-canvas-raised px-6 py-16 text-center sm:px-12 ${panelCls}`}
        >

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Stay in the loop</p>
          <h2 className="text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-text-primary">
            New templates every month
          </h2>
          <p className="mx-auto mt-3 max-w-[440px] text-[15px] leading-[1.6] text-text-secondary">
            Subscribe and be the first to know when new templates drop. No spam, ever.
          </p>

          <div className="mt-8">
            {submitted ? (
              <div className="inline-flex items-center gap-2.5 rounded-lg border border-success-soft-border bg-success-soft px-6 py-3 text-[15px] font-medium text-success">
                <Check size={18} strokeWidth={2.5} />
                You're on the list!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-center gap-3">
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="h-11 min-w-[260px] rounded-lg border border-border-default bg-surface-2 px-4 text-[15px] text-text-primary outline-none transition-[border-color,box-shadow] duration-150 focus:border-border-accent focus:shadow-[0_0_0_3px_rgba(124,92,252,0.18)]"
                />
                <button type="submit" className="btn btn-primary h-11">
                  Subscribe
                </button>
              </form>
            )}
          </div>

          <div className="mt-10">
            <div className="hairline mx-auto mb-8 max-w-[480px]" />
            <Link to="/templates" className="btn btn-secondary">
              Browse all {templates.length} templates
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );
}
