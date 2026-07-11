/* ============================================================
   MOMENTUM — Boutique group-fitness studio template
   Warm coral · bright, energetic, welcoming
   Self-contained, fully responsive, no external assets.
   ============================================================ */

import { useState, useEffect } from 'react';

const CORAL = '#f43f5e';
const CORAL_DK = '#e11d48';
const CREAM = '#fff7f4';
const INK = '#1c1220';
const MUTED = '#6b5560';
const BORDER = '#f2e2df';

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

const nav = ['Classes', 'Schedule', 'Coaches', 'Pricing'];

const schedule: Record<string, { name: string; coach: string; time: string; level: string; c: string }[]> = {
  Mon: [
    { name: 'Sunrise Flow', coach: 'Priya S.', time: '6:30', level: 'All levels', c: '#f43f5e' },
    { name: 'Power Sculpt', coach: 'Dana K.', time: '9:00', level: 'Intermediate', c: '#f97316' },
    { name: 'Ride 45', coach: 'Marcus J.', time: '18:00', level: 'All levels', c: '#8b5cf6' },
  ],
  Tue: [
    { name: 'Core & Barre', coach: 'Elena R.', time: '7:00', level: 'Beginner', c: '#ec4899' },
    { name: 'HIIT Circuit', coach: 'Marcus J.', time: '12:15', level: 'Advanced', c: '#f43f5e' },
    { name: 'Slow Flow', coach: 'Priya S.', time: '19:30', level: 'All levels', c: '#14b8a6' },
  ],
  Wed: [
    { name: 'Ride 45', coach: 'Dana K.', time: '6:30', level: 'All levels', c: '#8b5cf6' },
    { name: 'Strength Lab', coach: 'Theo M.', time: '9:00', level: 'Intermediate', c: '#f97316' },
    { name: 'Restore Yoga', coach: 'Elena R.', time: '18:30', level: 'Beginner', c: '#14b8a6' },
  ],
};

const coaches = [
  { name: 'Priya Shah', focus: 'Yoga & Mobility', c1: '#f43f5e', c2: '#fda4af' },
  { name: 'Marcus James', focus: 'HIIT & Strength', c1: '#f97316', c2: '#fdba74' },
  { name: 'Dana Kellerman', focus: 'Cycling', c1: '#8b5cf6', c2: '#c4b5fd' },
  { name: 'Elena Ruiz', focus: 'Barre & Pilates', c1: '#ec4899', c2: '#f9a8d4' },
];

const plans = [
  { name: 'Drop-in', price: '$22', per: '/class', features: ['Single class credit', 'No commitment', 'Book up to 7 days ahead'], hot: false },
  { name: 'Unlimited', price: '$149', per: '/month', features: ['Unlimited classes', 'Priority booking', 'Free guest pass monthly', 'Member events'], hot: true },
  { name: 'Class Pack', price: '$180', per: '/10 classes', features: ['10 credits, use anytime', 'Never expires', 'Shareable with a friend'], hot: false },
];

const reviews = [
  { q: 'The coaches learn your name on day one. I actually look forward to my 6:30 alarm now.', n: 'Jordan P.' },
  { q: 'Small classes, real attention, zero ego. It’s the first studio that ever stuck for me.', n: 'Amara T.' },
  { q: 'Booking takes ten seconds and the waitlist actually works. Whole experience feels premium.', n: 'Chris D.' },
];

function CoachArt({ c1, c2, name }: { c1: string; c2: string; name: string }) {
  const initials = name.split(' ').map(w => w[0]).join('');
  return (
    <div style={{ aspectRatio: '1 / 1', background: `linear-gradient(135deg, ${c1}, ${c2})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: '#fff', fontSize: '2.6rem', fontWeight: 800, opacity: 0.92 }}>{initials}</span>
    </div>
  );
}

export default function FitnessPreview() {
  const m = useIsMobile();
  const [day, setDay] = useState('Mon');
  const pad = m ? '0 1.25rem' : '0 2rem';

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: CREAM, color: INK, minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,247,244,0.9)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: pad, height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: CORAL, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"><path d="M6 8v8M18 8v8M4 10v4M20 10v4M6 12h12" /></svg>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em' }}>Momentum</span>
          </div>
          {!m && <nav style={{ display: 'flex', gap: '1.6rem' }}>{nav.map(l => <a key={l} href={`#${l}`} style={{ fontSize: '14px', fontWeight: 500, color: MUTED, textDecoration: 'none' }}>{l}</a>)}</nav>}
          <button style={{ background: CORAL, color: '#fff', border: 'none', borderRadius: '9999px', padding: m ? '9px 16px' : '10px 22px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 16px rgba(244,63,94,0.3)' }}>Try a class</button>
        </div>
      </header>

      {/* Hero */}
      <section style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: m ? '2.75rem 1.25rem 3rem' : '4.5rem 2rem 5rem', display: 'grid', gridTemplateColumns: m ? '1fr' : '1.05fr 0.95fr', gap: m ? '2rem' : '3.5rem', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '9999px', padding: '6px 14px', fontSize: '13px', fontWeight: 600, color: CORAL_DK, marginBottom: '1.25rem' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: CORAL }} />First class is on us
            </span>
            <h1 style={{ fontSize: m ? '2.2rem' : 'clamp(2.6rem, 5vw, 3.9rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.05, margin: '0 0 1.15rem' }}>
              Movement that<br /><span style={{ color: CORAL }}>meets you halfway</span>
            </h1>
            <p style={{ fontSize: m ? '1rem' : '1.1rem', color: MUTED, lineHeight: 1.7, maxWidth: '460px', margin: '0 0 2rem' }}>
              A boutique studio for real bodies and busy weeks. Small classes, warm coaches, and a schedule that flexes around your life.
            </p>
            <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
              <button style={{ background: CORAL, color: '#fff', border: 'none', borderRadius: '9999px', padding: '13px 28px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 20px rgba(244,63,94,0.3)' }}>Claim free class</button>
              <button style={{ background: '#fff', color: INK, border: `1px solid ${BORDER}`, borderRadius: '9999px', padding: '13px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>See the schedule</button>
            </div>
            <div style={{ display: 'flex', gap: m ? '1.5rem' : '2.5rem', marginTop: '2.25rem' }}>
              {[['2,400+', 'members'], ['40+', 'classes / wk'], ['4.9★', 'avg rating']].map(([v, l]) => (
                <div key={l}><div style={{ fontSize: m ? '1.4rem' : '1.7rem', fontWeight: 800, color: CORAL_DK, letterSpacing: '-0.02em' }}>{v}</div><div style={{ fontSize: '12px', color: MUTED }}>{l}</div></div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', aspectRatio: m ? '4 / 3' : '1 / 1', borderRadius: '24px', overflow: 'hidden', background: `linear-gradient(150deg, ${CORAL} 0%, #fb923c 60%, #f9a8d4 100%)` }}>
            <svg width="100%" height="100%" viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, opacity: 0.25 }}>
              <circle cx="150" cy="55" r="45" fill="none" stroke="#fff" strokeWidth="3" />
              <circle cx="55" cy="150" r="60" fill="none" stroke="#fff" strokeWidth="3" />
              <path d="M20 40 Q100 90 180 150" fill="none" stroke="#fff" strokeWidth="3" />
            </svg>
            <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem', background: 'rgba(255,255,255,0.95)', borderRadius: '16px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div><div style={{ fontSize: '13px', fontWeight: 700 }}>Next up · Sunrise Flow</div><div style={{ fontSize: '12px', color: MUTED }}>6:30 with Priya · 4 spots left</div></div>
              <button style={{ background: CORAL, color: '#fff', border: 'none', borderRadius: '9999px', padding: '8px 16px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Book</button>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="Schedule" style={{ padding: m ? '3.25rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: m ? '1.75rem' : '2.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: CORAL }}>This week</span>
            <h2 style={{ fontSize: m ? '1.7rem' : 'clamp(1.9rem, 3.5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.5rem 0 0' }}>Find your class</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '1.75rem' }}>
            {Object.keys(schedule).map(d => (
              <button key={d} onClick={() => setDay(d)} style={{ padding: '9px 22px', borderRadius: '9999px', border: `1px solid ${d === day ? CORAL : BORDER}`, background: d === day ? CORAL : '#fff', color: d === day ? '#fff' : MUTED, fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>{d}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '1.25rem' }}>
            {schedule[day].map(c => (
              <div key={c.name} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '22px', fontWeight: 800, color: c.c, letterSpacing: '-0.02em' }}>{c.time}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: c.c, background: `${c.c}18`, borderRadius: '9999px', padding: '3px 10px' }}>{c.level}</span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>{c.name}</h3>
                <p style={{ fontSize: '13px', color: MUTED, margin: 0 }}>with {c.coach} · 45 min</p>
                <button style={{ marginTop: '0.4rem', background: CREAM, color: INK, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '9px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Reserve a spot</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches */}
      <section id="Coaches" style={{ padding: m ? '3.25rem 0' : '5rem 0', background: '#fff', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: pad }}>
          <div style={{ marginBottom: m ? '1.75rem' : '2.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: CORAL }}>Your coaches</span>
            <h2 style={{ fontSize: m ? '1.7rem' : 'clamp(1.9rem, 3.5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.5rem 0 0' }}>Real people in your corner</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4,1fr)', gap: m ? '1rem' : '1.4rem' }}>
            {coaches.map(c => (
              <div key={c.name} style={{ borderRadius: '16px', overflow: 'hidden', border: `1px solid ${BORDER}` }}>
                <CoachArt c1={c.c1} c2={c.c2} name={c.name} />
                <div style={{ padding: m ? '0.85rem' : '1.1rem' }}>
                  <h3 style={{ fontSize: m ? '14px' : '15px', fontWeight: 700, margin: '0 0 3px' }}>{c.name}</h3>
                  <p style={{ fontSize: '13px', color: CORAL_DK, fontWeight: 600, margin: 0 }}>{c.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="Pricing" style={{ padding: m ? '3.25rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: m ? '2rem' : '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: CORAL }}>Membership</span>
            <h2 style={{ fontSize: m ? '1.7rem' : 'clamp(1.9rem, 3.5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.5rem 0 0.5rem' }}>Pick your pace</h2>
            <p style={{ fontSize: '15px', color: MUTED, margin: 0 }}>No lock-in. Pause or cancel anytime.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '1.25rem' }}>
            {plans.map(p => (
              <div key={p.name} style={{ background: p.hot ? INK : '#fff', color: p.hot ? '#fff' : INK, border: p.hot ? 'none' : `1px solid ${BORDER}`, borderRadius: '18px', padding: '2rem 1.75rem', position: 'relative' }}>
                {p.hot && <span style={{ position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)', background: CORAL, color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 14px', borderRadius: '9999px', whiteSpace: 'nowrap' }}>Most popular</span>}
                <p style={{ fontSize: '14px', fontWeight: 600, color: p.hot ? 'rgba(255,255,255,0.7)' : MUTED, margin: '0 0 0.6rem' }}>{p.name}</p>
                <p style={{ fontSize: '2.3rem', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 1.4rem' }}>{p.price}<span style={{ fontSize: '14px', fontWeight: 500, color: p.hot ? 'rgba(255,255,255,0.6)' : MUTED }}>{p.per}</span></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {p.features.map(f => (
                    <li key={f} style={{ fontSize: '13.5px', color: p.hot ? 'rgba(255,255,255,0.85)' : MUTED, display: 'flex', gap: '9px', alignItems: 'center' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={CORAL} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>{f}
                    </li>
                  ))}
                </ul>
                <button style={{ width: '100%', background: p.hot ? CORAL : 'transparent', color: p.hot ? '#fff' : INK, border: p.hot ? 'none' : `1px solid ${BORDER}`, borderRadius: '10px', padding: '11px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Get started</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: m ? '3.25rem 0' : '5rem 0', background: '#fff', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: pad }}>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '1.25rem' }}>
            {reviews.map(r => (
              <div key={r.n} style={{ background: CREAM, border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '1.75rem' }}>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '0.9rem' }}>{[1, 2, 3, 4, 5].map(n => <span key={n} style={{ color: '#f59e0b', fontSize: '15px' }}>★</span>)}</div>
                <p style={{ fontSize: '14.5px', color: INK, lineHeight: 1.7, margin: '0 0 1rem' }}>&ldquo;{r.q}&rdquo;</p>
                <p style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>{r.n}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + footer */}
      <section style={{ padding: m ? '3.25rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: pad }}>
          <div style={{ background: `linear-gradient(135deg, ${CORAL_DK}, #f97316)`, borderRadius: '22px', padding: m ? '2.5rem 1.5rem' : '3.5rem 3rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: m ? '1.7rem' : 'clamp(1.9rem, 3.6vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 0.9rem' }}>Your first class is free</h2>
            <p style={{ fontSize: '1.02rem', color: 'rgba(255,255,255,0.85)', maxWidth: '440px', margin: '0 auto 2rem', lineHeight: 1.6 }}>Walk in, try any class on the schedule, and see why members stay for years.</p>
            <button style={{ background: '#fff', color: CORAL_DK, border: 'none', borderRadius: '9999px', padding: '13px 32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>Book my free class</button>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: m ? '2.25rem 0 1.75rem' : '2.75rem 0 2rem' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: pad, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '15px', fontWeight: 800 }}>Momentum</span>
          <p style={{ fontSize: '13px', color: MUTED, margin: 0 }}>88 Garden Street · Open daily 6am–9pm</p>
          <p style={{ fontSize: '13px', color: '#b6a0a6', margin: 0 }}>© 2026 Momentum Studio</p>
        </div>
      </footer>
    </div>
  );
}
