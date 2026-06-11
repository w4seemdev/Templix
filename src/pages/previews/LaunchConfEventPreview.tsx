/* ============================================================
   LAUNCHCONF — Conference & Event Template
   Deep violet gradient (#1e1b4b → #4c1d95) · hot pink accent
   (#ec4899) · glassmorphism cards · React + TS + Framer Motion
   ============================================================ */

import { useState } from 'react';

const PINK = '#ec4899';
const PINK_SOFT = '#f9a8d4';
const VIOLET_SOFT = '#a78bfa';
const TEXT_DIM = '#b8aef0';
const TEXT_FAINT = '#8b7fd0';
const glass = 'rgba(255,255,255,0.06)';
const glassBorder = '1px solid rgba(255,255,255,0.14)';
const glassBlur = 'blur(14px)';

const navLinks = ['Home', 'Speakers', 'Schedule', 'Tickets', 'Venue', 'Sponsors'];

const countdown = [
  { value: '042', label: 'Days' },
  { value: '11', label: 'Hours' },
  { value: '36', label: 'Minutes' },
  { value: '54', label: 'Seconds' },
];

const heroStats = [
  { value: '64', label: 'Speakers' },
  { value: '3', label: 'Days' },
  { value: '4', label: 'Stages' },
  { value: '2,500+', label: 'Attendees' },
];

const speakers = [
  { name: 'Priya Raghavan', role: 'VP Engineering, Nimbus Cloud', talk: 'Shipping React at the Edge', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { name: 'Marcus Webb', role: 'Creator of Orbital UI', talk: 'Design Systems That Survive v2', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { name: 'Lena Fischer', role: 'Staff Engineer, Driftwood', talk: 'TypeScript at a Million Lines', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
  { name: 'Tomás Silva', role: 'Principal Animator, Motionry', talk: 'Framer Motion Beyond the Basics', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
  { name: 'Aiko Tanaka', role: 'Head of Platform, Quanta', talk: 'The Server Components Payoff', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80' },
  { name: 'Jordan Eze', role: 'Founder, Shipwright Labs', talk: 'From Side Project to Series A', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
  { name: 'Camille Roux', role: 'DX Lead, Helio Labs', talk: 'Docs Are a Product Too', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80' },
  { name: 'Stefan Bauer', role: 'Performance Lead, Mode.fm', talk: 'INP: The Last Metric Standing', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80' },
];

type SessionKind = 'keynote' | 'talk' | 'workshop' | 'break';

const kindStyles: Record<SessionKind, { bg: string; color: string; label: string }> = {
  keynote: { bg: 'rgba(236,72,153,0.16)', color: PINK_SOFT, label: 'Keynote' },
  talk: { bg: 'rgba(167,139,250,0.16)', color: '#c4b5fd', label: 'Talk' },
  workshop: { bg: 'rgba(34,211,238,0.14)', color: '#67e8f9', label: 'Workshop' },
  break: { bg: 'rgba(251,191,36,0.14)', color: '#fcd34d', label: 'Break' },
};

const scheduleDays: { day: string; date: string; sessions: { time: string; title: string; speaker: string; stage: string; kind: SessionKind }[] }[] = [
  {
    day: 'Day 1', date: 'Tue, Oct 14',
    sessions: [
      { time: '09:00', title: 'Opening Keynote: The Next Five Years of the Web', speaker: 'Priya Raghavan', stage: 'Main Stage', kind: 'keynote' },
      { time: '10:30', title: 'Shipping React at the Edge', speaker: 'Priya Raghavan', stage: 'Main Stage', kind: 'talk' },
      { time: '11:30', title: 'TypeScript at a Million Lines', speaker: 'Lena Fischer', stage: 'River Stage', kind: 'talk' },
      { time: '13:00', title: 'Lunch & Hallway Track', speaker: 'Everyone', stage: 'Atrium', kind: 'break' },
      { time: '14:30', title: 'Hands-on: Framer Motion Beyond the Basics', speaker: 'Tomás Silva', stage: 'Workshop Lab A', kind: 'workshop' },
      { time: '16:30', title: 'Docs Are a Product Too', speaker: 'Camille Roux', stage: 'River Stage', kind: 'talk' },
    ],
  },
  {
    day: 'Day 2', date: 'Wed, Oct 15',
    sessions: [
      { time: '09:30', title: 'The Server Components Payoff', speaker: 'Aiko Tanaka', stage: 'Main Stage', kind: 'keynote' },
      { time: '11:00', title: 'Design Systems That Survive v2', speaker: 'Marcus Webb', stage: 'Main Stage', kind: 'talk' },
      { time: '12:00', title: 'INP: The Last Metric Standing', speaker: 'Stefan Bauer', stage: 'River Stage', kind: 'talk' },
      { time: '13:00', title: 'Lunch & Sponsor Expo', speaker: 'Everyone', stage: 'Expo Hall', kind: 'break' },
      { time: '14:30', title: 'Hands-on: Build a Realtime Multiplayer UI', speaker: 'Aiko Tanaka', stage: 'Workshop Lab B', kind: 'workshop' },
      { time: '17:00', title: 'Lightning Talks: 8 Ideas in 40 Minutes', speaker: 'Community Speakers', stage: 'Main Stage', kind: 'talk' },
    ],
  },
  {
    day: 'Day 3', date: 'Thu, Oct 16',
    sessions: [
      { time: '09:30', title: 'From Side Project to Series A', speaker: 'Jordan Eze', stage: 'Main Stage', kind: 'keynote' },
      { time: '11:00', title: 'Panel: The Framework Wars Are Over. Now What?', speaker: 'Webb · Fischer · Tanaka', stage: 'Main Stage', kind: 'talk' },
      { time: '12:30', title: 'Lunch on the Terrace', speaker: 'Everyone', stage: 'Rooftop Terrace', kind: 'break' },
      { time: '14:00', title: 'Hands-on: Accessibility Audits That Stick', speaker: 'Camille Roux', stage: 'Workshop Lab A', kind: 'workshop' },
      { time: '16:00', title: 'Closing Keynote & LaunchConf 2027 Reveal', speaker: 'The LaunchConf Team', stage: 'Main Stage', kind: 'keynote' },
      { time: '18:00', title: 'Closing Party at Cais do Sodré', speaker: 'Everyone', stage: 'Offsite', kind: 'break' },
    ],
  },
];

const tickets = [
  {
    name: 'Community', price: '€199', period: 'per person', highlight: false, badge: null, soldOut: true,
    desc: 'For students, OSS maintainers, and first-timers. Limited batch.',
    features: ['All 3 conference days', 'Main + River Stage access', 'Lunch & coffee included', 'Closing party invite'],
    cta: 'Sold out',
  },
  {
    name: 'Conference', price: '€449', period: 'per person', highlight: true, badge: 'Most popular', soldOut: false,
    desc: 'The full LaunchConf experience for professionals and teams.',
    features: ['All 3 conference days', 'All 4 stages + expo hall', 'Lunch & coffee included', 'Session recordings forever', 'Closing party invite'],
    cta: 'Buy Conference pass',
  },
  {
    name: 'VIP All-Access', price: '€899', period: 'per person', highlight: false, badge: null, soldOut: false,
    desc: 'Front-row seats, speaker dinner, and the workshops of your choice.',
    features: ['Everything in Conference', '2 hands-on workshops', 'Speaker dinner on Day 2', 'Reserved front-row seating', 'VIP lounge & swag box'],
    cta: 'Buy VIP pass',
  },
];

const venueFacts = [
  { icon: '🚇', title: 'Two metro stops away', desc: 'Oriente station connects the venue to the airport in 12 minutes and downtown Lisbon in 15.' },
  { icon: '🏨', title: '1,800 hotel rooms nearby', desc: 'Discounted blocks at four partner hotels within a 10-minute walk — codes sent with your ticket.' },
  { icon: '♿', title: 'Fully accessible', desc: 'Step-free routes to every stage, live captioning on all talks, and a quiet room on each floor.' },
];

const sponsorTiers = [
  { tier: 'Platinum', size: '24px', logos: ['Nimbus Cloud', 'Quanta', 'Shipwright Labs'] },
  { tier: 'Gold', size: '19px', logos: ['Helio Labs', 'Driftwood', 'Orbital UI', 'Mode.fm', 'Brightside'] },
  { tier: 'Community', size: '15px', logos: ['Pixelo', 'Cloudloop', 'Mochi Labs', 'Northwind', 'Acme Co', 'Ferndale', 'Kite & Co'] },
];

const testimonials = [
  {
    quote: 'I came for the talks and left with a co-founder. The hallway track at LaunchConf is unlike anything else in Europe — three days later we had a prototype.',
    name: 'Ines Carvalho', role: 'CTO, Ferndale — attended 2025',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80',
  },
  {
    quote: 'Tomás’s animation workshop alone was worth the ticket. We shipped the patterns from that session into production the following Monday.',
    name: 'Oskar Lindgren', role: 'Frontend Lead, Kite & Co — attended 2025',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
  {
    quote: 'As a first-time conference speaker, the LaunchConf crew made me feel like a headliner. Rehearsal time, a speaker mentor, the works. I’ll be back every year.',
    name: 'Fatima El-Sayed', role: 'Engineer, Brightside — spoke in 2025',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
  },
];

const footerCols = [
  { title: 'Event', links: ['Speakers', 'Schedule', 'Tickets', 'Venue', 'Sponsors'] },
  { title: 'Attend', links: ['Register', 'Group passes', 'Scholarships', 'Visa letters'] },
  { title: 'Resources', links: ['Code of conduct', 'Past editions', 'Press kit', 'FAQ'] },
  { title: 'Connect', links: ['Twitter / X', 'LinkedIn', 'YouTube', 'Newsletter'] },
];

export default function LaunchConfEventPreview() {
  const [activeDay, setActiveDay] = useState<number>(0);
  const day = scheduleDays[activeDay];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: 'linear-gradient(165deg, #1e1b4b 0%, #312e81 48%, #4c1d95 100%)', color: '#f3f0ff', minHeight: '100vh', letterSpacing: '-0.01em' }}>

      {/* ── Sticky Nav ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(30,27,75,0.72)', backdropFilter: glassBlur, borderBottom: glassBorder }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem', height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: `linear-gradient(135deg, ${PINK}, #a855f7)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '16px', boxShadow: '0 4px 18px rgba(236,72,153,0.45)' }}>▲</div>
            <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.03em' }}>Launch<span style={{ color: PINK }}>Conf</span></span>
          </div>
          <nav style={{ display: 'flex', gap: '1.7rem' }}>
            {navLinks.map(l => (
              <a key={l} href="#" style={{ fontSize: '13.5px', fontWeight: 500, color: TEXT_DIM, textDecoration: 'none' }}>{l}</a>
            ))}
          </nav>
          <a href="#" style={{ background: PINK, color: '#fff', borderRadius: '10px', padding: '9px 20px', fontSize: '13.5px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 6px 20px rgba(236,72,153,0.4)' }}>
            Get tickets
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5.5rem 2rem 4.5rem' }}>
        <div style={{ position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)', width: '920px', height: '560px', background: 'radial-gradient(ellipse, rgba(236,72,153,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 65%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: 'rgba(236,72,153,0.12)', border: '1px solid rgba(236,72,153,0.4)', borderRadius: '9999px', padding: '7px 18px', fontSize: '13px', fontWeight: 600, color: PINK_SOFT, marginBottom: '1.6rem', backdropFilter: glassBlur }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: PINK, boxShadow: '0 0 10px rgba(236,72,153,0.9)' }} />
            October 14–16, 2026 · Aurora Convention Center, Lisbon
          </span>
          <h1 style={{ fontSize: 'clamp(2.7rem, 6vw, 4.4rem)', fontWeight: 850, letterSpacing: '-0.045em', lineHeight: 1.05, margin: '0 auto', maxWidth: '820px' }}>
            Three days. Four stages.{' '}
            <span style={{ background: `linear-gradient(120deg, ${PINK_SOFT}, ${PINK} 55%, #a855f7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>One launchpad.</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: TEXT_DIM, lineHeight: 1.75, maxWidth: '600px', margin: '1.5rem auto 0' }}>
            LaunchConf brings 2,500 builders to Lisbon for keynotes, hands-on workshops, and the best hallway track in Europe. If you ship for the web, this is your week.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.9rem', marginTop: '2.4rem', flexWrap: 'wrap' }}>
            <a href="#" style={{ background: PINK, color: '#fff', borderRadius: '12px', padding: '14px 32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 10px 35px rgba(236,72,153,0.45)' }}>
              Get your ticket →
            </a>
            <a href="#" style={{ background: glass, border: glassBorder, backdropFilter: glassBlur, color: '#f3f0ff', borderRadius: '12px', padding: '14px 32px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>
              Watch the 2025 recap
            </a>
          </div>

          {/* Countdown stat row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.9rem', marginTop: '3.2rem', flexWrap: 'wrap' }}>
            {countdown.map((c, i) => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                <div style={{ background: glass, border: glassBorder, backdropFilter: glassBlur, borderRadius: '16px', padding: '1.1rem 1.6rem', minWidth: '96px', boxShadow: '0 12px 35px rgba(0,0,0,0.25)' }}>
                  <div style={{ fontSize: '2.1rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{c.value}</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEXT_FAINT, marginTop: '3px' }}>{c.label}</div>
                </div>
                {i < countdown.length - 1 && <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'rgba(236,72,153,0.6)' }}>:</span>}
              </div>
            ))}
          </div>

          {/* Hero photo strip */}
          <div style={{ maxWidth: '960px', margin: '3.5rem auto 0', borderRadius: '20px', border: glassBorder, overflow: 'hidden', boxShadow: '0 35px 90px rgba(0,0,0,0.4), 0 0 80px rgba(236,72,153,0.12)' }}>
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" alt="LaunchConf main stage" style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section style={{ borderTop: glassBorder, borderBottom: glassBorder, background: 'rgba(255,255,255,0.03)', padding: '2.75rem 2rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
          {heroStats.map(s => (
            <div key={s.label} style={{ textAlign: 'center', borderLeft: '1px solid rgba(236,72,153,0.3)', padding: '0.3rem 0' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: PINK_SOFT }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: TEXT_FAINT, marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Speakers ── */}
      <section style={{ padding: '5.5rem 2rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: PINK }}>Speakers</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 1rem' }}>
              The people shipping the modern web
            </h2>
            <p style={{ color: TEXT_DIM, fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
              Sixty-four speakers across four stages — framework authors, staff engineers, and founders who would rather show code than slides.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.25rem' }}>
            {speakers.map(sp => (
              <div key={sp.name} style={{ background: glass, border: glassBorder, backdropFilter: glassBlur, borderRadius: '18px', padding: '1.6rem', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                <img src={sp.avatar} alt={sp.name} style={{ width: '84px', height: '84px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(236,72,153,0.55)', margin: '0 auto 1rem', display: 'block' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{sp.name}</h3>
                <p style={{ fontSize: '12.5px', color: TEXT_FAINT, margin: '0 0 0.9rem' }}>{sp.role}</p>
                <div style={{ display: 'inline-block', background: 'rgba(236,72,153,0.12)', border: '1px solid rgba(236,72,153,0.3)', borderRadius: '9999px', padding: '5px 14px', fontSize: '12px', fontWeight: 600, color: PINK_SOFT }}>
                  {sp.talk}
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '2.25rem', fontSize: '14px', color: TEXT_FAINT }}>
            …and 56 more across the River Stage, Workshop Labs, and Lightning sessions.
          </p>
        </div>
      </section>

      {/* ── Schedule with day tabs ── */}
      <section style={{ padding: '5.5rem 2rem', background: 'rgba(0,0,0,0.18)', borderTop: glassBorder, borderBottom: glassBorder }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: PINK }}>Schedule</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 1rem' }}>
              Three days, zero filler
            </h2>
            <p style={{ color: TEXT_DIM, fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
              Single-track mornings so nobody misses a keynote, multi-track afternoons so everybody finds their lane.
            </p>
          </div>

          {/* Day tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '2.25rem', background: glass, border: glassBorder, backdropFilter: glassBlur, borderRadius: '14px', padding: '6px', maxWidth: '480px', margin: '0 auto 2.25rem' }}>
            {scheduleDays.map((d, i) => (
              <button
                key={d.day}
                onClick={() => setActiveDay(i)}
                style={{ flex: 1, border: 'none', cursor: 'pointer', borderRadius: '10px', padding: '10px 8px', fontFamily: 'inherit', background: activeDay === i ? PINK : 'transparent', color: activeDay === i ? '#fff' : TEXT_DIM, boxShadow: activeDay === i ? '0 6px 18px rgba(236,72,153,0.4)' : 'none', transition: 'all 0.2s' }}
              >
                <span style={{ display: 'block', fontSize: '14px', fontWeight: 700 }}>{d.day}</span>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: 500, opacity: 0.85, marginTop: '2px' }}>{d.date}</span>
              </button>
            ))}
          </div>

          {/* Timeline rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {day.sessions.map(s => {
              const k = kindStyles[s.kind];
              return (
                <div key={`${day.day}-${s.time}-${s.title}`} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: glass, border: glassBorder, backdropFilter: glassBlur, borderRadius: '16px', padding: '1.1rem 1.4rem', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: PINK_SOFT, fontVariantNumeric: 'tabular-nums', minWidth: '52px' }}>{s.time}</div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: PINK, boxShadow: '0 0 10px rgba(236,72,153,0.8)', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em' }}>{s.title}</div>
                    <div style={{ fontSize: '12.5px', color: TEXT_FAINT, marginTop: '3px' }}>{s.speaker} · {s.stage}</div>
                  </div>
                  <span style={{ background: k.bg, color: k.color, borderRadius: '9999px', padding: '5px 13px', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{k.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Tickets ── */}
      <section style={{ padding: '5.5rem 2rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: PINK }}>Tickets</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 1rem' }}>
              Pick your pass, pack your bag
            </h2>
            <p style={{ color: TEXT_DIM, fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
              Every pass includes lunch, unlimited espresso, and lifetime access to the session recordings. Prices rise on September 1.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.4rem', alignItems: 'start' }}>
            {tickets.map(t => (
              <div key={t.name} style={{ position: 'relative', background: t.highlight ? 'rgba(236,72,153,0.1)' : glass, border: t.highlight ? '1px solid rgba(236,72,153,0.55)' : glassBorder, backdropFilter: glassBlur, borderRadius: '20px', padding: '2rem', boxShadow: t.highlight ? '0 0 60px rgba(236,72,153,0.18)' : '0 10px 30px rgba(0,0,0,0.2)', opacity: t.soldOut ? 0.65 : 1 }}>
                {t.badge && (
                  <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: PINK, color: '#fff', borderRadius: '9999px', padding: '4px 16px', fontSize: '11.5px', fontWeight: 800, whiteSpace: 'nowrap', boxShadow: '0 6px 18px rgba(236,72,153,0.5)' }}>
                    {t.badge}
                  </div>
                )}
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 5px' }}>{t.name}</h3>
                <p style={{ fontSize: '13px', color: TEXT_DIM, margin: '0 0 1.4rem', lineHeight: 1.6 }}>{t.desc}</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginBottom: '1.6rem' }}>
                  <span style={{ fontSize: '2.6rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>{t.price}</span>
                  <span style={{ fontSize: '13px', color: TEXT_FAINT, marginBottom: '5px' }}>{t.period}</span>
                </div>
                <a href="#" style={{ display: 'block', textAlign: 'center', borderRadius: '12px', padding: '12px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', marginBottom: '1.6rem', background: t.soldOut ? 'rgba(255,255,255,0.08)' : t.highlight ? PINK : 'rgba(255,255,255,0.1)', color: t.soldOut ? TEXT_FAINT : '#fff', boxShadow: t.highlight && !t.soldOut ? '0 8px 24px rgba(236,72,153,0.4)' : 'none' }}>
                  {t.cta}
                </a>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {t.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: TEXT_DIM }}>
                      <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(236,72,153,0.18)', color: PINK_SOFT, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Venue ── */}
      <section style={{ padding: '5.5rem 2rem', background: 'rgba(0,0,0,0.18)', borderTop: glassBorder, borderBottom: glassBorder }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.25rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: PINK }}>Venue</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 1rem' }}>
              Aurora Convention Center, Lisbon
            </h2>
            <p style={{ color: TEXT_DIM, fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              A riverside venue in Parque das Nações with four stages under one roof, a rooftop terrace, and pastel de nata within arm’s reach at all times.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.4rem', alignItems: 'stretch' }}>
            {/* Map-mock card */}
            <div style={{ position: 'relative', minHeight: '300px', borderRadius: '20px', border: glassBorder, overflow: 'hidden', background: 'linear-gradient(140deg, #2a2660, #3b2f7d)' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
              <div style={{ position: 'absolute', top: '20%', left: '-5%', width: '110%', height: '10px', background: 'rgba(255,255,255,0.1)', transform: 'rotate(-7deg)', borderRadius: '6px' }} />
              <div style={{ position: 'absolute', top: '58%', left: '-5%', width: '110%', height: '14px', background: 'rgba(255,255,255,0.12)', transform: 'rotate(4deg)', borderRadius: '6px' }} />
              <div style={{ position: 'absolute', top: '-5%', left: '68%', width: '12px', height: '110%', background: 'rgba(255,255,255,0.1)', transform: 'rotate(9deg)', borderRadius: '6px' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '26%', background: 'linear-gradient(180deg, rgba(56,189,248,0.18), rgba(56,189,248,0.3))' }} />
              <div style={{ position: 'absolute', top: '40%', left: '46%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50% 50% 50% 0', background: PINK, transform: 'rotate(-45deg)', margin: '0 auto', boxShadow: '0 0 25px rgba(236,72,153,0.9)' }} />
                <div style={{ marginTop: '12px', background: 'rgba(30,27,75,0.85)', backdropFilter: glassBlur, border: glassBorder, borderRadius: '10px', padding: '8px 14px', fontSize: '12.5px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  Aurora Convention Center
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '14px', left: '14px', background: 'rgba(30,27,75,0.85)', backdropFilter: glassBlur, border: glassBorder, borderRadius: '9999px', padding: '6px 14px', fontSize: '11.5px', color: TEXT_DIM }}>
                Rossio dos Olivais 12, 1990-231 Lisboa
              </div>
            </div>
            {/* Venue photo + facts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80" alt="Inside the Aurora Convention Center" style={{ width: '100%', height: '170px', objectFit: 'cover', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.14)', display: 'block' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {venueFacts.map(v => (
                  <div key={v.title} style={{ display: 'flex', gap: '14px', background: glass, border: glassBorder, backdropFilter: glassBlur, borderRadius: '14px', padding: '1rem 1.2rem' }}>
                    <span style={{ fontSize: '20px', flexShrink: 0 }}>{v.icon}</span>
                    <div>
                      <h3 style={{ fontSize: '14.5px', fontWeight: 700, margin: '0 0 3px' }}>{v.title}</h3>
                      <p style={{ fontSize: '13px', color: TEXT_DIM, lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sponsors ── */}
      <section style={{ padding: '5.5rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.25rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: PINK }}>Sponsors</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 1rem' }}>
              Backed by teams who hire here
            </h2>
            <p style={{ color: TEXT_DIM, fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Fifteen companies make LaunchConf possible — and staff the expo hall booths where half our attendees find their next role.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {sponsorTiers.map(tier => (
              <div key={tier.tier} style={{ background: glass, border: glassBorder, backdropFilter: glassBlur, borderRadius: '18px', padding: '1.6rem 2rem' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: PINK_SOFT, textAlign: 'center', marginBottom: '1.1rem' }}>{tier.tier}</div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
                  {tier.logos.map(name => (
                    <span key={name} style={{ fontSize: tier.size, fontWeight: 800, color: 'rgba(243,240,255,0.55)', letterSpacing: '-0.02em' }}>{name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '14px', color: TEXT_FAINT }}>
            Want your logo here? <a href="#" style={{ color: PINK_SOFT, fontWeight: 600, textDecoration: 'none' }}>Grab the sponsor prospectus →</a>
          </p>
        </div>
      </section>

      {/* ── Past-edition Testimonials ── */}
      <section style={{ padding: '5.5rem 2rem', background: 'rgba(0,0,0,0.18)', borderTop: glassBorder, borderBottom: glassBorder }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: PINK }}>LaunchConf 2025</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 0' }}>
              What last year’s crowd took home
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.4rem' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: glass, border: glassBorder, backdropFilter: glassBlur, borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.3rem', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                <div style={{ fontSize: '28px', color: PINK, lineHeight: 1, fontFamily: 'Georgia, serif' }}>“</div>
                <p style={{ fontSize: '14.5px', color: '#ded7fb', lineHeight: 1.8, margin: 0, flex: 1 }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={t.avatar} alt={t.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(236,72,153,0.5)', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '12.5px', color: TEXT_FAINT, margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section style={{ padding: '5.5rem 2rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ borderRadius: '26px', border: '1px solid rgba(236,72,153,0.4)', background: `linear-gradient(135deg, rgba(236,72,153,0.22), rgba(168,85,247,0.14) 60%, rgba(255,255,255,0.04))`, backdropFilter: glassBlur, padding: '4.25rem 2.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.35)' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '620px', height: '340px', background: 'radial-gradient(ellipse, rgba(236,72,153,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <h2 style={{ position: 'relative', fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0 0 1rem' }}>
              Lisbon is calling. Will you pick up?
            </h2>
            <p style={{ position: 'relative', color: TEXT_DIM, fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto 2.4rem', lineHeight: 1.7 }}>
              2,500 seats, and 1,900 are already gone. Lock in your pass before prices rise on September 1 — your future co-founder might be sitting in the next row.
            </p>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', gap: '0.9rem', flexWrap: 'wrap' }}>
              <a href="#" style={{ background: PINK, color: '#fff', borderRadius: '12px', padding: '14px 32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 10px 35px rgba(236,72,153,0.45)' }}>
                Get tickets now
              </a>
              <a href="#" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#f3f0ff', borderRadius: '12px', padding: '14px 32px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>
                Convince your boss (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: glassBorder, background: 'rgba(0,0,0,0.22)', padding: '3.5rem 2rem 2rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '9px', background: `linear-gradient(135deg, ${PINK}, #a855f7)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '13px' }}>▲</div>
                <span style={{ fontSize: '16px', fontWeight: 800, letterSpacing: '-0.03em' }}>Launch<span style={{ color: PINK }}>Conf</span></span>
              </div>
              <p style={{ fontSize: '13.5px', color: TEXT_FAINT, lineHeight: 1.7, margin: 0 }}>
                The annual gathering for people who build and launch on the web. October 14–16, 2026 in Lisbon, Portugal.
              </p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: VIOLET_SOFT, margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: '13.5px', color: TEXT_FAINT, textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: glassBorder, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '12.5px', color: TEXT_FAINT, margin: 0 }}>© 2026 LaunchConf BV. Be excellent to each other — see the code of conduct.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Twitter / X', 'LinkedIn', 'YouTube'].map(s => (
                <a key={s} href="#" style={{ fontSize: '12.5px', color: TEXT_FAINT, textDecoration: 'none' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
