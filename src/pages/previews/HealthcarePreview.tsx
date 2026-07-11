/* ============================================================
   CAREPOINT — Primary-care clinic template
   Calm sky-blue · trust-building clinical layout
   Self-contained, fully responsive, no external assets.
   ============================================================ */

import { useState, useEffect } from 'react';

const SKY = '#0284c7';
const SKY_SOFT = '#eff8ff';
const INK = '#0c1a2e';
const MUTED = '#5a6b85';
const BORDER = '#e0edf6';
const MINT = '#0d9488';

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

const nav = ['Services', 'Care Team', 'Patients', 'Reviews', 'Contact'];

const services = [
  { icon: 'stethoscope', title: 'Family Medicine', desc: 'Everyday care for every age — check-ups, chronic conditions, and same-day sick visits.' },
  { icon: 'video', title: 'Telehealth Visits', desc: 'Secure video consultations with your own physician, from home, in under 15 minutes.' },
  { icon: 'flask', title: 'On-site Lab', desc: 'Blood panels, screenings, and results delivered straight to your patient portal.' },
  { icon: 'syringe', title: 'Immunizations', desc: 'Flu, travel, and childhood vaccination schedules managed and reminded automatically.' },
  { icon: 'heart', title: 'Women’s Health', desc: 'Well-woman exams, prenatal check-ins, and compassionate, private consultations.' },
  { icon: 'child', title: 'Pediatric Care', desc: 'Growth tracking, developmental screening, and reassuring guidance for new parents.' },
];

const team = [
  { name: 'Dr. Elena Marsh', role: 'Family Physician', tag: 'MD · 15 yrs', c1: '#0284c7', c2: '#38bdf8' },
  { name: 'Dr. Aaron Cole', role: 'Internal Medicine', tag: 'DO · 11 yrs', c1: '#0d9488', c2: '#5eead4' },
  { name: 'Dr. Nadia Haq', role: 'Pediatrician', tag: 'MD · 9 yrs', c1: '#6366f1', c2: '#a5b4fc' },
  { name: 'Dr. Simon Reid', role: 'Nurse Practitioner', tag: 'FNP · 8 yrs', c1: '#ea580c', c2: '#fdba74' },
];

const stats = [
  { v: '32k+', l: 'Patients cared for' },
  { v: '4.9★', l: 'Google rating' },
  { v: '<15m', l: 'Average wait time' },
  { v: '24/7', l: 'Nurse advice line' },
];

const reviews = [
  { q: 'They booked my daughter the same morning she woke up with a fever. Kind, fast, and never rushed.', n: 'Priya S.', d: 'Patient since 2021' },
  { q: 'The telehealth option saved me a two-hour round trip. My prescription was at the pharmacy before we hung up.', n: 'Marcus D.', d: 'Patient since 2019' },
  { q: 'Every result shows up in the portal with a plain-English note from my doctor. No more phone tag.', n: 'Helen O.', d: 'Patient since 2022' },
];

const insurers = ['BlueCross', 'Aetna', 'Cigna', 'UnitedHealth', 'Humana', 'Kaiser'];

function Icon({ name, color }: { name: string; color: string }) {
  const s = { fill: 'none', stroke: color, strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...s}>
      {name === 'stethoscope' && <><path d="M4 3v6a5 5 0 0 0 10 0V3" /><circle cx="18" cy="15" r="2.5" /><path d="M9 14v1a5 5 0 0 0 6.5 4.8" /></>}
      {name === 'video' && <><rect x="2" y="6" width="13" height="12" rx="2" /><path d="M22 8l-5 4 5 4z" /></>}
      {name === 'flask' && <><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" /><path d="M7.5 15h9" /></>}
      {name === 'syringe' && <><path d="M18 2l4 4M17 7l-9 9-3 1 1-3 9-9M14 6l4 4M8 12l2 2" /></>}
      {name === 'heart' && <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />}
      {name === 'child' && <><circle cx="12" cy="6" r="3" /><path d="M12 9v7M8 12h8M9 21l3-4 3 4" /></>}
    </svg>
  );
}

function Avatar({ c1, c2, name }: { c1: string; c2: string; name: string }) {
  const initials = name.replace('Dr. ', '').split(' ').map(w => w[0]).join('');
  return (
    <div style={{ aspectRatio: '4 / 3', background: `linear-gradient(135deg, ${c1}, ${c2})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: '#fff', fontSize: '2.4rem', fontWeight: 800, letterSpacing: '0.02em', opacity: 0.92 }}>{initials}</span>
    </div>
  );
}

export default function HealthcarePreview() {
  const m = useIsMobile();
  const [dept, setDept] = useState('Family Medicine');
  const pad = m ? '0 1.25rem' : '0 2rem';
  const depts = ['Family Medicine', 'Pediatrics', 'Telehealth', 'Lab & Screening'];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#fff', color: INK, minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad, height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: SKY, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em' }}>Care<span style={{ color: SKY }}>Point</span></span>
          </div>
          {!m && (
            <nav style={{ display: 'flex', gap: '1.6rem' }}>
              {nav.map(l => <a key={l} href={`#${l}`} style={{ fontSize: '14px', fontWeight: 500, color: MUTED, textDecoration: 'none' }}>{l}</a>)}
            </nav>
          )}
          <button style={{ background: SKY, color: '#fff', border: 'none', borderRadius: '10px', padding: m ? '9px 14px' : '10px 20px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 6px 16px rgba(2,132,199,0.25)' }}>
            {m ? 'Book' : 'Book a visit'}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: `linear-gradient(180deg, ${SKY_SOFT}, #fff)`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: m ? '2.75rem 1.25rem 3rem' : '4.5rem 2rem 5rem', display: 'grid', gridTemplateColumns: m ? '1fr' : '1.1fr 0.9fr', gap: m ? '2rem' : '3.5rem', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '9999px', padding: '6px 14px', fontSize: '13px', fontWeight: 600, color: SKY, marginBottom: '1.25rem' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: MINT }} />Same-day appointments · Open 7 days
            </span>
            <h1 style={{ fontSize: m ? '2.1rem' : 'clamp(2.6rem, 5vw, 3.8rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.08, margin: '0 0 1.15rem' }}>
              Family healthcare that<br /><span style={{ color: SKY }}>actually answers</span>
            </h1>
            <p style={{ fontSize: m ? '1rem' : '1.1rem', color: MUTED, lineHeight: 1.7, maxWidth: '470px', margin: '0 0 2rem' }}>
              A neighborhood practice where your doctor knows your name. Same-day sick visits, secure telehealth, and lab results you can actually read.
            </p>
            <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
              <button style={{ background: SKY, color: '#fff', border: 'none', borderRadius: '12px', padding: '13px 26px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 20px rgba(2,132,199,0.28)' }}>Book an appointment</button>
              <button style={{ background: '#fff', color: INK, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '13px 26px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>Meet our doctors</button>
            </div>
          </div>
          {/* Booking card */}
          <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '20px', padding: '1.6rem', boxShadow: '0 24px 60px rgba(12,26,46,0.1)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 1rem' }}>Request an appointment</h3>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: MUTED, marginBottom: '8px' }}>Reason for visit</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.1rem' }}>
              {depts.map(d => (
                <button key={d} onClick={() => setDept(d)} style={{ border: `1px solid ${d === dept ? SKY : BORDER}`, background: d === dept ? SKY_SOFT : '#fff', color: d === dept ? SKY : MUTED, borderRadius: '9999px', padding: '7px 13px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>{d}</button>
              ))}
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: MUTED, marginBottom: '8px' }}>Preferred day</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '1.25rem' }}>
              {['Mon', 'Tue', 'Wed', 'Thu'].map((d, i) => (
                <div key={d} style={{ textAlign: 'center', border: `1px solid ${i === 1 ? SKY : BORDER}`, background: i === 1 ? SKY : '#fff', color: i === 1 ? '#fff' : INK, borderRadius: '10px', padding: '9px 0', fontSize: '13px', fontWeight: 600 }}>{d}<div style={{ fontSize: '11px', fontWeight: 500, opacity: 0.7 }}>{16 + i}</div></div>
              ))}
            </div>
            <button style={{ width: '100%', background: INK, color: '#fff', border: 'none', borderRadius: '12px', padding: '13px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>Continue — {dept}</button>
            <p style={{ fontSize: '12px', color: MUTED, textAlign: 'center', margin: '10px 0 0' }}>Most visits confirmed within the hour.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: m ? '2rem 1.25rem' : '2.5rem 2rem', display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: m ? '1.5rem' : '2rem' }}>
          {stats.map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: m ? '1.7rem' : '2.1rem', fontWeight: 800, letterSpacing: '-0.03em', color: SKY }}>{s.v}</div>
              <div style={{ fontSize: '13px', color: MUTED, marginTop: '4px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="Services" style={{ padding: m ? '3.25rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: m ? '2.25rem' : '3.25rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: SKY }}>What we do</span>
            <h2 style={{ fontSize: m ? '1.7rem' : 'clamp(1.9rem, 3.5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.6rem 0 0.75rem' }}>Care for the whole family</h2>
            <p style={{ fontSize: '1.02rem', color: MUTED, maxWidth: '520px', margin: '0 auto' }}>One trusted team for every stage of life, backed by an on-site lab and a portal that keeps you in the loop.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.25rem' }}>
            {services.map(s => (
              <div key={s.title} style={{ border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '1.6rem', background: '#fff' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '13px', background: SKY_SOFT, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem' }}>
                  <Icon name={s.icon} color={SKY} />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 8px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Care team */}
      <section id="Care Team" style={{ padding: m ? '3.25rem 0' : '5rem 0', background: '#f6fafd', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <div style={{ marginBottom: m ? '2rem' : '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: SKY }}>Your care team</span>
            <h2 style={{ fontSize: m ? '1.7rem' : 'clamp(1.9rem, 3.5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.6rem 0 0' }}>Doctors who stay with you</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4,1fr)', gap: m ? '1rem' : '1.5rem' }}>
            {team.map(d => (
              <div key={d.name} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '16px', overflow: 'hidden' }}>
                <Avatar c1={d.c1} c2={d.c2} name={d.name} />
                <div style={{ padding: m ? '0.9rem' : '1.25rem' }}>
                  <h3 style={{ fontSize: m ? '14px' : '16px', fontWeight: 700, margin: '0 0 3px' }}>{d.name}</h3>
                  <p style={{ fontSize: '13px', color: SKY, fontWeight: 600, margin: '0 0 6px' }}>{d.role}</p>
                  <span style={{ fontSize: '12px', color: MUTED }}>{d.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient portal split */}
      <section id="Patients" style={{ padding: m ? '3.25rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad, display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '2rem' : '3.5rem', alignItems: 'center' }}>
          <div style={{ background: `linear-gradient(135deg, ${SKY}, #38bdf8)`, borderRadius: '20px', padding: m ? '1.75rem' : '2.5rem', color: '#fff', order: m ? 2 : 1 }}>
            {['Message your doctor securely', 'View & download lab results', 'Refill prescriptions in a tap', 'See your visit history'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,0.18)' }}>
                <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(255,255,255,0.22)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <span style={{ fontSize: '14.5px', fontWeight: 500 }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ order: m ? 1 : 2 }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: SKY }}>The patient portal</span>
            <h2 style={{ fontSize: m ? '1.7rem' : 'clamp(1.9rem, 3.5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.6rem 0 1rem' }}>Your whole chart, in your pocket</h2>
            <p style={{ fontSize: '1.02rem', color: MUTED, lineHeight: 1.7, margin: '0 0 1.5rem' }}>
              No more phone tag or paper folders. Everything from your last blood panel to tonight&apos;s prescription lives in one calm, private place.
            </p>
            <button style={{ background: INK, color: '#fff', border: 'none', borderRadius: '12px', padding: '13px 26px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>Log in to portal</button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="Reviews" style={{ padding: m ? '3.25rem 0' : '5rem 0', background: SKY_SOFT, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: m ? '2.25rem' : '3.25rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: SKY }}>Patient reviews</span>
            <h2 style={{ fontSize: m ? '1.7rem' : 'clamp(1.9rem, 3.5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.6rem 0 0' }}>Neighbors who trust us</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '1.25rem' }}>
            {reviews.map(r => (
              <div key={r.n} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '2px' }}>{[1, 2, 3, 4, 5].map(n => <span key={n} style={{ color: '#f59e0b', fontSize: '15px' }}>★</span>)}</div>
                <p style={{ fontSize: '14.5px', color: INK, lineHeight: 1.7, margin: 0, flex: 1 }}>&ldquo;{r.q}&rdquo;</p>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{r.n}</p>
                  <p style={{ fontSize: '12px', color: MUTED, margin: 0 }}>{r.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: m ? '1.5rem' : '2.75rem', flexWrap: 'wrap', marginTop: m ? '2rem' : '3rem' }}>
            {insurers.map(i => <span key={i} style={{ fontSize: '16px', fontWeight: 700, color: '#9fb6cc' }}>{i}</span>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="Contact" style={{ padding: m ? '3.25rem 0' : '5rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <div style={{ background: `linear-gradient(135deg, ${INK}, #0e4b73)`, borderRadius: '22px', padding: m ? '2.5rem 1.5rem' : '3.75rem 3rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: m ? '1.7rem' : 'clamp(1.9rem, 3.6vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 0.9rem' }}>Feeling unwell? We have time today.</h2>
            <p style={{ fontSize: '1.02rem', color: 'rgba(255,255,255,0.75)', maxWidth: '460px', margin: '0 auto 2rem', lineHeight: 1.7 }}>Book online in two minutes, or call our front desk — a real person answers, every time.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.9rem', flexWrap: 'wrap' }}>
              <button style={{ background: '#fff', color: INK, border: 'none', borderRadius: '12px', padding: '13px 26px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>Book an appointment</button>
              <button style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '12px', padding: '13px 26px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>Call (555) 200-4180</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, background: '#f6fafd', padding: m ? '2.5rem 0 1.75rem' : '3.25rem 0 2rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: SKY, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            </div>
            <span style={{ fontSize: '15px', fontWeight: 800 }}>Care<span style={{ color: SKY }}>Point</span></span>
          </div>
          <p style={{ fontSize: '13px', color: MUTED, margin: 0 }}>140 Elm Street · Open Mon–Sat, 8:00–19:00</p>
          <p style={{ fontSize: '13px', color: '#9fb6cc', margin: 0 }}>© 2026 CarePoint Family Health</p>
        </div>
      </footer>
    </div>
  );
}
