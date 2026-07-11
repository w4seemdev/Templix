/* ============================================================
   HOPE — Nonprofit & charity template
   Warm white · rose accent · amber highlights
   Self-contained, fully responsive, no external assets.
   ============================================================ */

import { useState, useEffect } from 'react';

const ROSE = '#e11d48';
const AMBER = '#f59e0b';
const INK = '#1c1917';
const GREY = '#78716c';
const BORDER = '#e7e5e4';
const SOFT = '#faf9f7';

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return m;
}

const navLinks = ['Causes', 'Stories', 'Volunteer', 'Transparency', 'Contact'];

const impactStats = [
  { value: '1.2M', label: 'Meals served' },
  { value: '4,800', label: 'Families housed' },
  { value: '23k', label: 'Active volunteers' },
  { value: '96¢', label: 'Of every $1 to programs' },
];

const causes = [
  { title: 'Clean water for Kibera', raised: 84200, goal: 100000, pct: 84, tag: 'Water', c1: '#0e7490', c2: '#22d3ee' },
  { title: 'School meals, rural Honduras', raised: 41650, goal: 60000, pct: 69, tag: 'Education', c1: '#b45309', c2: '#fbbf24' },
  { title: 'Winter shelter, Detroit', raised: 112400, goal: 150000, pct: 75, tag: 'Housing', c1: '#9f1239', c2: '#fb7185' },
];

const tiers = [25, 50, 100];

const stories = [
  { quote: 'The well changed everything. My daughters walk ten minutes for water now, not three hours. Both are back in school.', name: 'Amina W.', place: 'Nairobi County, Kenya', c1: '#0e7490', c2: '#67e8f9' },
  { quote: 'I came to the shelter with two kids and one suitcase. Eight months later I have keys to our own apartment.', name: 'Danielle R.', place: 'Detroit, Michigan', c1: '#9f1239', c2: '#fda4af' },
];

const volunteerRoles = [
  { title: 'Weekend meal crew', loc: 'Detroit, MI', commit: '4 hrs / week' },
  { title: 'Remote grant writer', loc: 'Anywhere', commit: '6 hrs / month' },
  { title: 'Field photographer', loc: 'Travel required', commit: 'Per project' },
  { title: 'Tutoring & mentorship', loc: 'Chicago, IL', commit: '2 hrs / week' },
];

const fundsBreakdown = [
  { label: 'Direct programs', pct: 78, color: ROSE },
  { label: 'Community operations', pct: 12, color: AMBER },
  { label: 'Fundraising', pct: 6, color: '#fda4af' },
  { label: 'Administration', pct: 4, color: '#d6d3d1' },
];

const partners = ['UNICEF', 'WaterAid', 'Feeding America', 'Habitat', 'GlobalGiving', 'CharityWatch'];

const footerCols = [
  { title: 'Get involved', links: ['Donate', 'Volunteer', 'Fundraise', 'Corporate giving'] },
  { title: 'About', links: ['Our mission', 'Financials', 'Annual report', 'Leadership'] },
  { title: 'Resources', links: ['Stories', 'Newsroom', 'FAQ', 'Contact'] },
];

function Heart({ size, fill }: { size: number; fill: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="none"><path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" /></svg>;
}

function Avatar({ c1, c2, name }: { c1: string; c2: string; name: string }) {
  const initials = name.split(' ').map(w => w[0]).join('');
  return <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: `linear-gradient(140deg, ${c1}, ${c2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff', fontSize: '15px', fontWeight: 700 }}>{initials}</div>;
}

function CauseArt({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <div style={{ aspectRatio: '16 / 9', background: `linear-gradient(140deg, ${c1}, ${c2})`, position: 'relative', overflow: 'hidden' }}>
      <svg width="100%" height="100%" viewBox="0 0 120 68" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.25 }}>
        <path d="M60 52l-1.4-1.3C50 43 44 38 44 32a5 5 0 0 1 9-3l7 8 7-8a5 5 0 0 1 9 3c0 6-6 11-14.6 18.7z" fill="#fff" />
      </svg>
    </div>
  );
}

export default function HopeNonprofitPreview() {
  const m = useIsMobile();
  const [amount, setAmount] = useState<number>(50);
  const [monthly, setMonthly] = useState(true);
  const pad = m ? '0 1.25rem' : '0 1.5rem';

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#fff', color: INK, minHeight: '100vh' }}>
      {/* Nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad, height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(135deg, ${ROSE}, #fb7185)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Heart size={17} fill="#fff" /></div>
            <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em' }}>Hope</span>
          </div>
          {!m && <nav style={{ display: 'flex', gap: '1.75rem' }}>{navLinks.map(l => <a key={l} href={`#${l}`} style={{ fontSize: '14px', fontWeight: 500, color: GREY, textDecoration: 'none' }}>{l}</a>)}</nav>}
          <a href="#donate" style={{ background: ROSE, color: '#fff', borderRadius: '9999px', padding: m ? '9px 18px' : '10px 24px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 6px 18px rgba(225,29,72,0.3)' }}>Donate</a>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: m ? '3rem 0' : '5rem 0 4rem', background: SOFT }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad, display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '2rem' : '3rem', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(225,29,72,0.08)', color: ROSE, borderRadius: '9999px', padding: '6px 16px', fontSize: '13px', fontWeight: 600, marginBottom: '1.5rem' }}><Heart size={13} fill={ROSE} />17 years of community-led change</span>
            <h1 style={{ fontSize: m ? '2.3rem' : 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.08, margin: 0 }}>Small gifts. <span style={{ color: ROSE }}>Whole lives</span> changed.</h1>
            <p style={{ fontSize: m ? '1rem' : '1.125rem', color: GREY, lineHeight: 1.75, margin: '1.5rem 0 2.25rem', maxWidth: '480px' }}>Hope funds water, meals, and shelter projects designed and run by the communities they serve. 96 cents of every dollar goes straight to programs.</p>
            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
              <a href="#donate" style={{ background: ROSE, color: '#fff', borderRadius: '9999px', padding: '14px 32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 24px rgba(225,29,72,0.3)' }}>Give now →</a>
              <a href="#Causes" style={{ border: `1px solid ${BORDER}`, background: '#fff', color: INK, borderRadius: '9999px', padding: '14px 32px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>See our impact</a>
            </div>
          </div>
          <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: m ? '16 / 10' : '5 / 4', background: `linear-gradient(150deg, #9f1239, ${ROSE} 55%, ${AMBER})`, position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.22 }}>
              <path d="M50 72l-2-1.8C36 59 28 52 28 43a7 7 0 0 1 12-5l10 11 10-11a7 7 0 0 1 12 5c0 9-8 16-20 27z" fill="#fff" />
            </svg>
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section style={{ padding: m ? '2.5rem 0' : '3.5rem 0', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad, display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: '1rem' }}>
          {impactStats.map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: m ? '2rem' : '2.4rem', fontWeight: 800, letterSpacing: '-0.03em', color: ROSE }}>{s.value}</div>
              <div style={{ fontSize: '13.5px', color: GREY, marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Causes */}
      <section id="Causes" style={{ padding: m ? '3.5rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: m ? '2rem' : '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: ROSE }}>Active causes</span>
            <h2 style={{ fontSize: m ? '1.8rem' : 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>Where your gift goes to work</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {causes.map(c => (
              <div key={c.title} style={{ border: `1px solid ${BORDER}`, borderRadius: '20px', overflow: 'hidden', background: '#fff' }}>
                <div style={{ position: 'relative' }}>
                  <CauseArt c1={c.c1} c2={c.c2} />
                  <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#fff', color: INK, borderRadius: '9999px', padding: '5px 13px', fontSize: '11.5px', fontWeight: 700 }}>{c.tag}</span>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 1rem' }}>{c.title}</h3>
                  <div style={{ height: '8px', borderRadius: '9999px', background: '#f5f5f4', overflow: 'hidden', marginBottom: '0.75rem' }}>
                    <div style={{ width: `${c.pct}%`, height: '100%', borderRadius: '9999px', background: `linear-gradient(90deg, ${ROSE}, #fb7185)` }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 700 }}>${c.raised.toLocaleString()} raised</span>
                    <span style={{ fontSize: '13px', color: GREY }}>of ${c.goal.toLocaleString()}</span>
                  </div>
                  <a href="#donate" style={{ display: 'block', textAlign: 'center', border: `1.5px solid ${ROSE}`, color: ROSE, borderRadius: '9999px', padding: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Support this cause</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation widget */}
      <section id="donate" style={{ padding: m ? '3.5rem 0' : '5rem 0', background: SOFT, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', padding: pad }}>
          <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '24px', padding: m ? '1.75rem' : '2.5rem', boxShadow: '0 24px 60px rgba(28,25,23,0.08)' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, textAlign: 'center', margin: '0 0 0.5rem' }}>Make a difference today</h2>
            <p style={{ fontSize: '14px', color: GREY, textAlign: 'center', margin: '0 0 1.75rem' }}>Your gift is tax-deductible. Cancel monthly giving anytime.</p>
            <div style={{ display: 'flex', borderRadius: '12px', border: `1px solid ${BORDER}`, overflow: 'hidden', marginBottom: '1.25rem' }}>
              {[true, false].map(mo => (
                <button key={String(mo)} onClick={() => setMonthly(mo)} style={{ flex: 1, padding: '12px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit', background: monthly === mo ? ROSE : '#fff', color: monthly === mo ? '#fff' : GREY }}>{mo ? 'Monthly' : 'One-time'}</button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '1.5rem' }}>
              {tiers.map(t => (
                <button key={t} onClick={() => setAmount(t)} style={{ padding: '14px 0', borderRadius: '12px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', border: amount === t ? `2px solid ${ROSE}` : `1px solid ${BORDER}`, background: amount === t ? 'rgba(225,29,72,0.06)' : '#fff', color: amount === t ? ROSE : INK }}>${t}</button>
              ))}
              <button onClick={() => setAmount(0)} style={{ padding: '14px 0', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', border: amount === 0 ? `2px solid ${ROSE}` : `1px solid ${BORDER}`, background: amount === 0 ? 'rgba(225,29,72,0.06)' : '#fff', color: amount === 0 ? ROSE : GREY }}>Other</button>
            </div>
            <p style={{ fontSize: '13px', color: GREY, textAlign: 'center', margin: '0 0 1.25rem' }}>{amount > 0 ? `$${amount} ${monthly ? 'a month' : ''} provides ${amount >= 100 ? 'a family with a month of clean water' : amount >= 50 ? '125 school meals' : '62 school meals'}.` : 'Enter any amount on the next step.'}</p>
            <a href="#" style={{ display: 'block', textAlign: 'center', background: ROSE, color: '#fff', borderRadius: '9999px', padding: '15px', fontSize: '15px', fontWeight: 800, textDecoration: 'none', boxShadow: '0 8px 24px rgba(225,29,72,0.3)' }}>Donate {amount > 0 ? `$${amount}` : ''} {monthly ? 'monthly' : 'now'} →</a>
          </div>
        </div>
      </section>

      {/* Stories */}
      <section id="Stories" style={{ padding: m ? '3.5rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: m ? '2rem' : '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: ROSE }}>Stories</span>
            <h2 style={{ fontSize: m ? '1.8rem' : 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>The people behind the numbers</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {stories.map(s => (
              <div key={s.name} style={{ background: SOFT, border: `1px solid ${BORDER}`, borderRadius: '20px', padding: m ? '1.75rem' : '2.25rem' }}>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#44403c', margin: '0 0 1.5rem', fontStyle: 'italic' }}>&ldquo;{s.quote}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar c1={s.c1} c2={s.c2} name={s.name} />
                  <div>
                    <p style={{ fontSize: '14.5px', fontWeight: 700, margin: 0 }}>{s.name}</p>
                    <p style={{ fontSize: '13px', color: GREY, margin: 0 }}>{s.place}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer */}
      <section id="Volunteer" style={{ padding: m ? '3.5rem 0' : '5rem 0', background: SOFT, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad, display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '2rem' : '3rem', alignItems: 'start' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: ROSE }}>Volunteer</span>
            <h2 style={{ fontSize: m ? '1.7rem' : 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem' }}>Give time, not just money</h2>
            <p style={{ color: GREY, fontSize: '1rem', lineHeight: 1.8, margin: '0 0 1.5rem', maxWidth: '420px' }}>23,000 volunteers power our programs — from weekend meal crews to remote grant writers. There is a seat for every schedule and skill.</p>
            <a href="#" style={{ display: 'inline-block', background: AMBER, color: '#451a03', borderRadius: '9999px', padding: '13px 28px', fontSize: '14px', fontWeight: 800, textDecoration: 'none' }}>Browse all roles →</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {volunteerRoles.map(r => (
              <div key={r.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '14px', padding: '1.1rem 1.4rem', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 2px' }}>{r.title}</p>
                  <p style={{ fontSize: '12.5px', color: GREY, margin: 0 }}>{r.loc} · {r.commit}</p>
                </div>
                <a href="#" style={{ fontSize: '13px', fontWeight: 700, color: ROSE, textDecoration: 'none' }}>Apply →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section id="Transparency" style={{ padding: m ? '3.5rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: ROSE }}>Transparency</span>
            <h2 style={{ fontSize: m ? '1.7rem' : 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0.75rem' }}>How every dollar is used</h2>
            <p style={{ color: GREY, fontSize: '0.95rem', margin: 0 }}>Audited annually. Full financials published every March.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {fundsBreakdown.map(f => (
              <div key={f.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>{f.label}</span>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: f.color === '#d6d3d1' ? GREY : f.color }}>{f.pct}%</span>
                </div>
                <div style={{ height: '10px', borderRadius: '9999px', background: '#f5f5f4', overflow: 'hidden' }}>
                  <div style={{ width: `${f.pct}%`, height: '100%', borderRadius: '9999px', background: f.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section style={{ padding: m ? '2rem 0 3rem' : '2.5rem 0 4rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 1.5rem' }}>In partnership with</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: m ? '1.5rem' : '3rem', flexWrap: 'wrap' }}>
            {partners.map(n => <span key={n} style={{ fontSize: '16px', fontWeight: 700, color: '#d6d3d1' }}>{n}</span>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: m ? '0 1.25rem 3.5rem' : '0 1.5rem 5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ background: `linear-gradient(135deg, ${ROSE}, #fb7185)`, borderRadius: '28px', padding: m ? '2.75rem 1.5rem' : '4rem 2.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: m ? '1.8rem' : 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#fff', margin: '0 0 1rem', letterSpacing: '-0.03em' }}>Hope is a monthly habit</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', maxWidth: '460px', margin: '0 auto 2.25rem', lineHeight: 1.7 }}>Join 41,000 monthly givers funding long-term change — and get one honest letter from the field each month.</p>
            <a href="#donate" style={{ display: 'inline-block', background: '#fff', color: ROSE, borderRadius: '9999px', padding: '14px 34px', fontSize: '15px', fontWeight: 800, textDecoration: 'none' }}>Become a monthly giver</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, background: SOFT, padding: m ? '3rem 0 2rem' : '3.5rem 0 2rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: m ? '2rem' : '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg, ${ROSE}, #fb7185)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Heart size={15} fill="#fff" /></div>
                <span style={{ fontSize: '18px', fontWeight: 800 }}>Hope</span>
              </div>
              <p style={{ fontSize: '13.5px', color: GREY, lineHeight: 1.7, margin: 0 }}>A registered 501(c)(3) nonprofit. EIN 82-5550193. Donations are tax-deductible in the US.</p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a8a29e', margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => <li key={l}><a href="#" style={{ fontSize: '14px', color: GREY, textDecoration: 'none' }}>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '13px', color: '#a8a29e', margin: 0 }}>© 2026 Hope Foundation. With love, worldwide.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>{['Instagram', 'Facebook', 'YouTube'].map(s => <a key={s} href="#" style={{ fontSize: '13px', color: '#a8a29e', textDecoration: 'none' }}>{s}</a>)}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
