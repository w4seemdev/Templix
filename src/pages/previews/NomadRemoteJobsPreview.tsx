/* ============================================================
   NOMAD — Remote jobs board template
   Clean light theme · emerald accent · travel feel
   React 19 + TypeScript + Vite. Self-contained, fully responsive.
   ============================================================ */

import { useState, useEffect } from 'react';

const EMERALD = '#10b981';
const EMERALD_DARK = '#059669';
const INK = '#0f172a';
const MUTED = '#64748b';
const BORDER = '#e2e8f0';
const SOFT = '#f8fafc';
const TINT = 'rgba(16,185,129,0.08)';

function useIsMobile() {
  const [m, setM] = useState(() => window.matchMedia('(max-width: 768px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return m;
}

const navLinks = ['Jobs', 'Companies', 'Salaries', 'Guides'];
const popularTags = ['React', 'Product Design', 'DevOps', 'Async-first', '4-day week', 'US timezones'];

const stats = [
  { value: '4,832', label: 'Open remote jobs' },
  { value: '1,270', label: 'Hiring companies' },
  { value: '94', label: 'Countries hiring' },
  { value: '11 days', label: 'Median time to offer' },
];

const categories = ['All roles', 'Engineering', 'Design', 'Marketing', 'Product', 'Customer Success'];

type Job = { id: number; title: string; company: string; mono: string; color: string; category: string; salary: string; timezone: string; type: string; tags: string[]; posted: string; };

const jobs: Job[] = [
  { id: 1, title: 'Senior Frontend Engineer', company: 'Wanderstack', mono: 'W', color: '#10b981', category: 'Engineering', salary: '$130k – $165k', timezone: 'UTC-8 to UTC+2', type: 'Full-time', tags: ['React', 'TypeScript', 'Vite'], posted: '2h ago' },
  { id: 2, title: 'Staff Platform Engineer', company: 'Driftbase', mono: 'D', color: '#0ea5e9', category: 'Engineering', salary: '$160k – $195k', timezone: 'Americas only', type: 'Full-time', tags: ['Go', 'Kubernetes'], posted: '5h ago' },
  { id: 3, title: 'Product Designer, Growth', company: 'Atlas & Co', mono: 'A', color: '#f59e0b', category: 'Design', salary: '$105k – $135k', timezone: 'UTC-5 to UTC+3', type: 'Full-time', tags: ['Figma', 'Design systems'], posted: '1d ago' },
  { id: 4, title: 'Brand Designer', company: 'Solstice', mono: 'S', color: '#8b5cf6', category: 'Design', salary: '$90k – $115k', timezone: 'Europe-friendly', type: 'Contract', tags: ['Illustration', 'Motion'], posted: '1d ago' },
  { id: 5, title: 'Content Marketing Lead', company: 'Fernweh Labs', mono: 'F', color: '#ef4444', category: 'Marketing', salary: '$85k – $110k', timezone: 'Any timezone', type: 'Full-time', tags: ['SEO', 'Editorial'], posted: '2d ago' },
  { id: 6, title: 'Senior Product Manager', company: 'Tidepool', mono: 'T', color: '#14b8a6', category: 'Product', salary: '$125k – $155k', timezone: 'UTC-6 to UTC+1', type: 'Full-time', tags: ['B2B', 'Async'], posted: '2d ago' },
  { id: 7, title: 'Backend Engineer, Payments', company: 'Wanderstack', mono: 'W', color: '#10b981', category: 'Engineering', salary: '$120k – $150k', timezone: 'UTC-3 to UTC+5', type: 'Full-time', tags: ['Node', 'Postgres'], posted: '3d ago' },
  { id: 8, title: 'Customer Success Manager', company: 'Harbor', mono: 'H', color: '#6366f1', category: 'Customer Success', salary: '$70k – $92k', timezone: 'APAC overlap', type: 'Full-time', tags: ['SaaS', 'Onboarding'], posted: '4d ago' },
];

const companies = [
  { name: 'Wanderstack', mono: 'W', color: '#10b981', blurb: 'Travel-booking infrastructure used by 4,000 agencies. Fully distributed since day one.', roles: 12, base: '38 people · 21 countries' },
  { name: 'Driftbase', mono: 'D', color: '#0ea5e9', blurb: 'Realtime backend tooling for multiplayer apps. Async-first with two meeting-free days a week.', roles: 7, base: '52 people · 17 countries' },
  { name: 'Atlas & Co', mono: 'A', color: '#f59e0b', blurb: 'Design studio building brands for climate startups. Quarterly team offsites, anywhere on Earth.', roles: 4, base: '19 people · 9 countries' },
  { name: 'Tidepool', mono: 'T', color: '#14b8a6', blurb: 'Collaboration suite for ocean researchers and field teams. Generous co-working stipend.', roles: 6, base: '64 people · 26 countries' },
  { name: 'Fernweh Labs', mono: 'F', color: '#ef4444', blurb: 'A travel-tech venture studio shipping three products a year. Work from wherever the WiFi works.', roles: 9, base: '27 people · 14 countries' },
  { name: 'Harbor', mono: 'H', color: '#6366f1', blurb: 'Compliance autopilot for global employers. They hire in 90+ countries — and practice what they sell.', roles: 11, base: '88 people · 31 countries' },
];

const profilePerks = [
  { title: 'One profile, every application', desc: 'Skills, timezone, visa status, and portfolio in one place — apply to any job with a single click.' },
  { title: 'Timezone matching built in', desc: 'Set your working window once and we only surface roles with real overlap. No more 3am standups.' },
  { title: 'Private by default', desc: 'You choose which companies can see you. Your current employer never will — guaranteed.' },
  { title: 'Saved jobs that follow up', desc: 'Bookmark a role and we will nudge you before it closes, and when the team starts interviewing.' },
];

const employerSteps = [
  { num: '1', title: 'Create your company profile', desc: 'Show candidates who you are: team size, timezone spread, async rituals. Culture-rich profiles get 3.2× more applicants.' },
  { num: '2', title: 'Post your role in minutes', desc: 'Our editor enforces salary range, timezone window, and visa support — so qualified people actually apply.' },
  { num: '3', title: 'Hire across timezones', desc: 'Screen with structured questions, schedule across UTC offsets automatically, and send an offer. Average fill: 11 days.' },
];

const salaryBands = [
  { role: 'Staff Engineer', salary: '$168k', pct: 96 },
  { role: 'Senior Frontend', salary: '$142k', pct: 81 },
  { role: 'Product Manager', salary: '$128k', pct: 73 },
  { role: 'Product Designer', salary: '$112k', pct: 64 },
  { role: 'Content Marketer', salary: '$88k', pct: 50 },
  { role: 'Support Lead', salary: '$72k', pct: 41 },
];

const destinations = [
  { city: 'Lisbon, Portugal', nomads: '2,140 nomads', c1: '#0e7490', c2: '#22d3ee' },
  { city: 'Canggu, Bali', nomads: '1,820 nomads', c1: '#047857', c2: '#34d399' },
  { city: 'Mexico City, Mexico', nomads: '1,460 nomads', c1: '#b45309', c2: '#fbbf24' },
];

const testimonials = [
  { quote: 'I applied to four roles from a hostel rooftop in Lisbon and had two offers before my visa run. The timezone filter alone saved me from a dozen dead-end interviews.', name: 'Priya Raman', role: 'Senior Engineer, hired via Nomad', c1: '#10b981', c2: '#6ee7b7' },
  { quote: 'We posted a backend role on a Tuesday and signed an offer the following Friday. Every applicant had already confirmed overlap with our core hours.', name: 'Tomás Ferreira', role: 'Head of Engineering, Driftbase', c1: '#0ea5e9', c2: '#7dd3fc' },
  { quote: 'The salary transparency is the whole game. I negotiated 18% above my old rate because I finally knew what the market pays designers who work async.', name: 'Lena Okonkwo', role: 'Product Designer, Atlas & Co', c1: '#f59e0b', c2: '#fcd34d' },
];

const footerCols = [
  { title: 'For talent', links: ['Browse jobs', 'Saved jobs', 'Your profile', 'Salary explorer'] },
  { title: 'For employers', links: ['Post a job', 'Pricing', 'Employer dashboard', 'Integrations'] },
  { title: 'Community', links: ['City guides', 'Nomad meetups', 'Blog', 'Newsletter'] },
  { title: 'Company', links: ['About', 'Careers', 'Contact', 'Privacy'] },
];

function Plane({ size }: { size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2a.8.8 0 0 0-.8 1.3L9 11l-3 3H3l2 3 3 2 .01-3 3-3 3.5 4.9a.8.8 0 0 0 1.3-.8z" /></svg>;
}

function Mono({ mono, color, size }: { mono: string; color: string; size: number }) {
  return <div style={{ width: size, height: size, borderRadius: size / 3.5, background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size / 2.4, fontWeight: 800, flexShrink: 0 }}>{mono}</div>;
}

function Avatar({ c1, c2, name }: { c1: string; c2: string; name: string }) {
  return <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: `linear-gradient(140deg, ${c1}, ${c2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff', fontSize: '14px', fontWeight: 800 }}>{name.split(' ').map(w => w[0]).join('')}</div>;
}

export default function NomadRemoteJobsPreview() {
  const m = useIsMobile();
  const [cat, setCat] = useState('All roles');
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const pad = m ? '0 1.25rem' : '0 1.5rem';
  const visible = cat === 'All roles' ? jobs : jobs.filter(j => j.category === cat);
  const toggle = (id: number) => setSavedIds(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#fff', color: INK, minHeight: '100vh' }}>
      {/* Nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad, height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: `linear-gradient(135deg, ${EMERALD}, #34d399)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(16,185,129,0.35)' }}><Plane size={18} /></div>
            <span style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.03em' }}>nomad<span style={{ color: EMERALD }}>.</span></span>
          </div>
          {!m && <nav style={{ display: 'flex', gap: '1.75rem' }}>{navLinks.map(l => <a key={l} href="#jobs" style={{ fontSize: '14px', fontWeight: 500, color: MUTED, textDecoration: 'none' }}>{l}</a>)}</nav>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {!m && <a href="#" style={{ fontSize: '14px', fontWeight: 500, color: MUTED, textDecoration: 'none' }}>Sign in</a>}
            <a href="#" style={{ background: EMERALD, color: '#fff', borderRadius: '12px', padding: '9px 18px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}>Post a job</a>
            {m && (
              <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
                {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: INK, display: 'block' }} />)}
              </button>
            )}
          </div>
        </div>
        {m && open && (
          <nav style={{ display: 'grid', padding: '0.25rem 1.25rem 0.75rem', borderTop: `1px solid ${BORDER}` }}>
            {navLinks.map(l => <a key={l} href="#jobs" onClick={() => setOpen(false)} style={{ padding: '12px 0', fontSize: '15px', fontWeight: 500, color: INK, textDecoration: 'none', borderBottom: `1px solid ${BORDER}` }}>{l}</a>)}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: m ? '3.25rem 0 3rem' : '5.5rem 0 4rem', background: `radial-gradient(circle at 50% 0%, ${TINT}, transparent 55%), #fff` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad, position: 'relative', textAlign: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: TINT, border: '1px solid rgba(16,185,129,0.3)', borderRadius: '9999px', padding: '6px 16px', fontSize: '13px', fontWeight: 600, color: '#047857', marginBottom: '1.5rem' }}><span style={{ width: '7px', height: '7px', borderRadius: '50%', background: EMERALD }} />312 new remote roles this week</span>
          <h1 style={{ fontSize: m ? '2.3rem' : 'clamp(2.6rem, 6vw, 4.25rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.07, margin: '0 auto', maxWidth: '820px' }}>Work from anywhere.<br /><span style={{ color: EMERALD }}>Hired from everywhere.</span></h1>
          <p style={{ fontSize: m ? '1rem' : '1.125rem', color: MUTED, lineHeight: 1.75, maxWidth: '580px', margin: '1.5rem auto 0' }}>Nomad is the job board built for digital nomads — every listing shows a real salary range, a timezone window, and a company that actually hires across borders.</p>
          {/* Search */}
          <div style={{ maxWidth: '760px', margin: '2.5rem auto 0', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '8px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 20px 50px rgba(15,23,42,0.1)', flexWrap: 'wrap' }}>
            <div style={{ flex: 2, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 12px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
              <span style={{ flex: 1, fontSize: '15px', color: MUTED, padding: '12px 0', textAlign: 'left' }}>Job title, skill, or company</span>
            </div>
            {!m && <div style={{ width: '1px', height: '32px', background: BORDER }} />}
            <div style={{ flex: 1, minWidth: '150px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 12px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></svg>
              <span style={{ flex: 1, fontSize: '15px', color: INK, padding: '12px 0', textAlign: 'left' }}>UTC+1 · Lisbon</span>
            </div>
            <button style={{ background: EMERALD, color: '#fff', border: 'none', borderRadius: '12px', padding: '13px 26px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 16px rgba(16,185,129,0.3)', width: m ? '100%' : 'auto' }}>Search jobs</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>Popular:</span>
            {popularTags.map(t => <span key={t} style={{ fontSize: '13px', fontWeight: 600, color: '#047857', background: TINT, border: '1px solid rgba(16,185,129,0.25)', borderRadius: '9999px', padding: '5px 14px' }}>{t}</span>)}
          </div>
          {/* Destinations */}
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '1rem', maxWidth: '920px', margin: '3rem auto 0' }}>
            {destinations.map(d => (
              <div key={d.city} style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '150px', boxShadow: '0 12px 30px rgba(15,23,42,0.12)', background: `linear-gradient(150deg, ${d.c1}, ${d.c2})` }}>
                <svg width="100%" height="100%" viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.2 }}><path d="M0 110 L40 80 L70 100 L110 60 L150 90 L200 55 V150 H0z" fill="#fff" /></svg>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.55), transparent 60%)' }} />
                <div style={{ position: 'absolute', left: '14px', bottom: '12px', textAlign: 'left' }}>
                  <div style={{ color: '#fff', fontSize: '14px', fontWeight: 700 }}>{d.city}</div>
                  <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px' }}>{d.nomads} working here</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: m ? '2.5rem 0' : '3.25rem 0', background: SOFT, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad, display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: '1rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '1.5rem 1rem' }}>
              <div style={{ fontSize: m ? '1.6rem' : '1.9rem', fontWeight: 800, letterSpacing: '-0.03em', color: EMERALD_DARK }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: MUTED, marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Job board */}
      <section id="jobs" style={{ padding: m ? '3.25rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: EMERALD_DARK }}>Latest jobs</span>
            <h2 style={{ fontSize: m ? '1.8rem' : 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem' }}>Fresh roles, real ranges, honest timezones</h2>
            <p style={{ color: MUTED, fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto' }}>Every listing is verified remote. Salary and timezone window are mandatory — companies that hide them can&apos;t post here.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {categories.map(c => {
              const active = cat === c;
              return <button key={c} onClick={() => setCat(c)} style={{ border: active ? `1px solid ${EMERALD}` : `1px solid ${BORDER}`, background: active ? EMERALD : '#fff', color: active ? '#fff' : MUTED, borderRadius: '9999px', padding: '8px 16px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', boxShadow: active ? '0 4px 12px rgba(16,185,129,0.3)' : 'none' }}>{c}</button>;
            })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {visible.map(job => {
              const saved = savedIds.includes(job.id);
              return (
                <div key={job.id} style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '16px', padding: m ? '1rem' : '1.1rem 1.35rem', boxShadow: '0 1px 3px rgba(15,23,42,0.04)', flexWrap: 'wrap' }}>
                  <Mono mono={job.mono} color={job.color} size={48} />
                  <div style={{ flex: 1, minWidth: m ? '60%' : '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '15.5px', fontWeight: 700, letterSpacing: '-0.01em' }}>{job.title}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 600, color: '#0369a1', background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.25)', borderRadius: '9999px', padding: '2px 10px' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0369a1" strokeWidth="2.5"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>{job.timezone}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '13px', color: MUTED, fontWeight: 500 }}>{job.company}</span>
                      <span style={{ color: '#cbd5e1' }}>·</span>
                      <span style={{ fontSize: '13px', color: MUTED }}>{job.type}</span>
                      {job.tags.map(t => <span key={t} style={{ fontSize: '11.5px', color: '#475569', background: '#f1f5f9', borderRadius: '6px', padding: '2px 8px' }}>{t}</span>)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '14.5px', fontWeight: 700, color: EMERALD_DARK }}>{job.salary}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>{job.posted}</div>
                  </div>
                  <button onClick={() => toggle(job.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', border: saved ? `1px solid ${EMERALD}` : `1px solid ${BORDER}`, background: saved ? TINT : '#fff', color: saved ? EMERALD_DARK : MUTED, borderRadius: '10px', padding: '9px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill={saved ? EMERALD_DARK : 'none'} stroke={saved ? EMERALD_DARK : MUTED} strokeWidth="2" strokeLinejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" /></svg>{saved ? 'Saved' : 'Save'}
                  </button>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.25rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <a href="#" style={{ background: '#fff', color: INK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '12px 26px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Browse all 4,832 jobs →</a>
            <span style={{ fontSize: '13px', color: MUTED }}>{savedIds.length} job{savedIds.length === 1 ? '' : 's'} saved</span>
          </div>
        </div>
      </section>

      {/* Companies */}
      <section style={{ padding: m ? '3.25rem 0' : '5rem 0', background: SOFT, borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: EMERALD_DARK }}>Featured companies</span>
            <h2 style={{ fontSize: m ? '1.8rem' : 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem' }}>Teams that hire the way you live</h2>
            <p style={{ color: MUTED, fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto' }}>Distributed-first companies with public salary bands, async cultures, and people on every continent.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(auto-fill, minmax(330px, 1fr))', gap: '1.25rem' }}>
            {companies.map(c => (
              <div key={c.name} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '18px', padding: '1.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                  <Mono mono={c.mono} color={c.color} size={44} />
                  <div>
                    <div style={{ fontSize: '15.5px', fontWeight: 700 }}>{c.name}</div>
                    <div style={{ fontSize: '12.5px', color: '#94a3b8' }}>{c.base}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 700, color: '#047857', background: TINT, border: '1px solid rgba(16,185,129,0.25)', borderRadius: '9999px', padding: '4px 12px', whiteSpace: 'nowrap' }}>{c.roles} roles</span>
                </div>
                <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.7, margin: '0 0 1.1rem' }}>{c.blurb}</p>
                <a href="#" style={{ fontSize: '13.5px', fontWeight: 600, color: EMERALD_DARK, textDecoration: 'none' }}>View company profile →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile promo */}
      <section style={{ padding: m ? '3.25rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad, display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '2.5rem' : '3rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: EMERALD_DARK }}>Your nomad profile</span>
            <h2 style={{ fontSize: m ? '1.8rem' : 'clamp(1.9rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem' }}>Build a profile once. Get matched everywhere.</h2>
            <p style={{ color: MUTED, fontSize: '1.05rem', lineHeight: 1.75, margin: '0 0 1.75rem' }}>Stop rewriting the same answers into ten different forms. Your Nomad profile travels with you — and the matching runs on your timezone, not your mailing address.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {profilePerks.map(p => (
                <div key={p.title} style={{ display: 'flex', gap: '14px' }}>
                  <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: TINT, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={EMERALD_DARK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px' }}>{p.title}</h3>
                    <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: '20px', aspectRatio: '5 / 4', background: `linear-gradient(150deg, #064e3b, ${EMERALD} 70%, #6ee7b7)`, boxShadow: '0 30px 70px rgba(15,23,42,0.15)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.95)', borderRadius: '16px', padding: '1.1rem 1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}><Avatar c1="#10b981" c2="#6ee7b7" name="You" /><div><div style={{ fontSize: '14px', fontWeight: 800 }}>Alex Rivera</div><div style={{ fontSize: '12px', color: MUTED }}>Senior Engineer · UTC+1</div></div></div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>{['React', 'TypeScript', 'Async'].map(t => <span key={t} style={{ fontSize: '11px', color: '#047857', background: TINT, borderRadius: '6px', padding: '2px 8px', fontWeight: 600 }}>{t}</span>)}</div>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '-18px', left: '24px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '14px', padding: '12px 18px', boxShadow: '0 12px 30px rgba(15,23,42,0.12)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: EMERALD }} /><span style={{ fontSize: '13px', fontWeight: 600 }}>Profile 92% complete — 14 matches</span>
            </div>
          </div>
        </div>
      </section>

      {/* Employer steps */}
      <section style={{ padding: m ? '3.25rem 0' : '5rem 0', background: SOFT, borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: m ? '2rem' : '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: EMERALD_DARK }}>For employers</span>
            <h2 style={{ fontSize: m ? '1.8rem' : 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem' }}>Hire the best person, not the nearest one</h2>
            <p style={{ color: MUTED, fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto' }}>Reach 90,000+ experienced remote candidates who already work the way your team does.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
            {employerSteps.map(step => (
              <div key={step.num} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '18px', padding: '2rem', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: `linear-gradient(135deg, ${EMERALD}, #34d399)`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 800, margin: '0 auto 1.25rem', boxShadow: '0 8px 20px rgba(16,185,129,0.3)' }}>{step.num}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 0.6rem' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.75, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Salary insights */}
      <section style={{ padding: m ? '3.25rem 0' : '5rem 0', background: 'linear-gradient(150deg, #064e3b, #022c22 70%)', color: '#ecfdf5' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad, display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '2.5rem' : '3rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6ee7b7' }}>Salary insights</span>
            <h2 style={{ fontSize: m ? '1.8rem' : 'clamp(1.9rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem', color: '#fff' }}>Know your worth in every currency</h2>
            <p style={{ color: 'rgba(236,253,245,0.75)', fontSize: '1.05rem', lineHeight: 1.75, margin: '0 0 1.75rem' }}>Median full-time remote salaries from 18,400 verified offers in the last 12 months. Filter by role, seniority, and timezone — then walk into your negotiation with receipts.</p>
            <a href="#" style={{ display: 'inline-block', background: EMERALD, color: '#022c22', borderRadius: '12px', padding: '13px 28px', fontSize: '14.5px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 24px rgba(16,185,129,0.35)' }}>Open the salary explorer →</a>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(110,231,183,0.2)', borderRadius: '20px', padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#fff' }}>Median remote salary by role</span>
              <span style={{ fontSize: '12px', color: '#6ee7b7' }}>USD · 2026</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {salaryBands.map(b => (
                <div key={b.role}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12.5px', color: 'rgba(236,253,245,0.85)' }}>{b.role}</span>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#6ee7b7' }}>{b.salary}</span>
                  </div>
                  <div style={{ height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}><div style={{ width: `${b.pct}%`, height: '100%', borderRadius: '4px', background: `linear-gradient(90deg, rgba(16,185,129,0.5), ${EMERALD})` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: m ? '3.25rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: m ? '2rem' : '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: EMERALD_DARK }}>Stories from the road</span>
            <h2 style={{ fontSize: m ? '1.8rem' : 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>Careers that don&apos;t need a commute</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: SOFT, border: `1px solid ${BORDER}`, borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '3px' }}>{[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: '#f59e0b', fontSize: '15px' }}>★</span>)}</div>
                <p style={{ fontSize: '14.5px', color: '#334155', lineHeight: 1.75, margin: 0, flex: 1 }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar c1={t.c1} c2={t.c2} name={t.name} />
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '12.5px', color: MUTED, margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: m ? '3.25rem 0' : '5rem 0', background: SOFT, borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <div style={{ background: `linear-gradient(135deg, ${EMERALD}, #34d399)`, borderRadius: '24px', padding: m ? '2.75rem 1.5rem' : '4rem 2.5rem', textAlign: 'center', boxShadow: '0 24px 60px rgba(16,185,129,0.35)' }}>
            <h2 style={{ fontSize: m ? '1.8rem' : 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 1rem' }}>Your next teammate is already packed</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto 2.25rem', lineHeight: 1.7 }}>Post a role for $299 and reach 90,000+ remote professionals today. If you don&apos;t make a hire in 60 days, the next posting is on us.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.875rem', flexWrap: 'wrap' }}>
              <a href="#" style={{ background: '#fff', color: '#047857', borderRadius: '12px', padding: '14px 30px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>Post a job — $299</a>
              <a href="#" style={{ border: '1px solid rgba(255,255,255,0.55)', color: '#fff', borderRadius: '12px', padding: '14px 30px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>Talk to our team</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, background: '#fff', padding: m ? '3rem 0 2rem' : '3.5rem 0 2rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: m ? '2rem' : '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: `linear-gradient(135deg, ${EMERALD}, #34d399)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plane size={15} /></div>
                <span style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.03em' }}>nomad<span style={{ color: EMERALD }}>.</span></span>
              </div>
              <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.7, margin: 0 }}>The remote job board for people whose office has a boarding pass. Built async, from 11 timezones.</p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => <li key={l}><a href="#" style={{ fontSize: '14px', color: MUTED, textDecoration: 'none' }}>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>© 2026 Nomad Jobs Ltd. Made between flights.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>{['Twitter', 'LinkedIn', 'Instagram'].map(s => <a key={s} href="#" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>{s}</a>)}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
