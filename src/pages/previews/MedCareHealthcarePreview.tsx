/* ============================================================
   MEDCARE — Multi-specialty clinic template
   Clinical teal + navy · department booking layout
   Self-contained, fully responsive, no external assets.
   ============================================================ */

import { useState, useEffect } from 'react';

const TEAL = '#0d9488';
const TEAL_SOFT = '#f0fdfa';
const NAVY = '#11304a';
const MUTED = '#5b7287';
const BORDER = '#e4ecf2';

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

const nav = ['Departments', 'Doctors', 'Booking', 'Patients', 'Contact'];
const departments = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'];
const timeSlots = ['09:00', '09:45', '10:30', '11:15', '13:00', '14:30', '15:15', '16:00'];

const stats = [
  { v: '25k+', l: 'Patients treated' },
  { v: '18', l: 'Years of care' },
  { v: '4.9', l: 'Average rating' },
  { v: '40+', l: 'Specialist doctors' },
];

const services = [
  { icon: 'heart', title: 'Cardiology', desc: 'Heart screenings, ECG diagnostics, and long-term cardiovascular care plans.' },
  { icon: 'pulse', title: 'Neurology', desc: 'Assessment and treatment for migraines, epilepsy, and nerve disorders.' },
  { icon: 'cross', title: 'General Medicine', desc: 'Same-day consultations for everyday concerns, chronic conditions, and referrals.' },
  { icon: 'eye', title: 'Ophthalmology', desc: 'Full vision exams, retinal imaging, and minor procedures in a modern eye suite.' },
  { icon: 'smile', title: 'Pediatrics', desc: 'Family-centred care for newborns through teens, including vaccination programmes.' },
  { icon: 'shield', title: 'Preventive Care', desc: 'Annual health checks, lab panels, and lifestyle guidance that catch issues early.' },
];

const doctors = [
  { name: 'Dr. Rachel Kim', spec: 'Cardiologist', exp: '14 years', avail: 'Today', c1: '#0d9488', c2: '#5eead4' },
  { name: 'Dr. James Osei', spec: 'Neurologist', exp: '11 years', avail: 'Tomorrow', c1: '#11304a', c2: '#64748b' },
  { name: 'Dr. Priya Nair', spec: 'Pediatrician', exp: '9 years', avail: 'Today', c1: '#7c3aed', c2: '#c4b5fd' },
  { name: 'Dr. Daniel Mercer', spec: 'Orthopedic Surgeon', exp: '16 years', avail: 'Friday', c1: '#ea580c', c2: '#fdba74' },
];

const steps = [
  { n: '1', t: 'Choose a department', d: 'Browse specialties and pick the clinic that matches your concern.' },
  { n: '2', t: 'Pick your doctor', d: 'Compare specialists by experience, focus area, and ratings.' },
  { n: '3', t: 'Select date & time', d: 'Real-time availability — book a slot that fits your schedule.' },
  { n: '4', t: 'Visit the clinic', d: 'Your records and results sync to your patient portal automatically.' },
];

const insurers = ['NovaHealth', 'TrustShield', 'CarePlus', 'MediSure', 'VitalGroup', 'Apex Benefits'];

function Glyph({ icon }: { icon: string }) {
  const s = { fill: 'none', stroke: TEAL, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...s}>
      {icon === 'heart' && <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />}
      {icon === 'pulse' && <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />}
      {icon === 'cross' && <><path d="M12 5v14" /><path d="M5 12h14" /></>}
      {icon === 'eye' && <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}
      {icon === 'smile' && <><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></>}
      {icon === 'shield' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
    </svg>
  );
}

function DocAvatar({ c1, c2, name }: { c1: string; c2: string; name: string }) {
  const initials = name.replace('Dr. ', '').split(' ').map(w => w[0]).join('');
  return (
    <div style={{ aspectRatio: '1 / 1', background: `linear-gradient(140deg, ${c1}, ${c2})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: '#fff', fontSize: '2.4rem', fontWeight: 800, opacity: 0.92 }}>{initials}</span>
    </div>
  );
}

export default function MedCareHealthcarePreview() {
  const m = useIsMobile();
  const [dept, setDept] = useState('Cardiology');
  const [slot, setSlot] = useState('10:30');
  const pad = m ? '0 1.25rem' : '0 2rem';
  const docFor = (d: string) => d === 'Cardiology' ? 'Dr. Rachel Kim' : d === 'Neurology' ? 'Dr. James Osei' : d === 'Pediatrics' ? 'Dr. Priya Nair' : 'Dr. Daniel Mercer';

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#fff', color: NAVY, minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: pad, height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            </div>
            <span style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.02em' }}>Med<span style={{ color: TEAL }}>Care</span></span>
          </div>
          {!m && <nav style={{ display: 'flex', gap: '1.75rem' }}>{nav.map(l => <a key={l} href={`#${l}`} style={{ fontSize: '14px', fontWeight: 500, color: MUTED, textDecoration: 'none' }}>{l}</a>)}</nav>}
          <button style={{ background: TEAL, color: '#fff', border: 'none', borderRadius: '10px', padding: m ? '9px 14px' : '10px 20px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 6px 16px rgba(13,148,136,0.25)' }}>{m ? 'Book' : 'Book appointment'}</button>
        </div>
      </header>

      {/* Hero + booking */}
      <section style={{ background: `linear-gradient(180deg, ${TEAL_SOFT} 0%, #fff 100%)`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: m ? '2.75rem 1.25rem 3rem' : '4.5rem 2rem 5rem', display: 'grid', gridTemplateColumns: m ? '1fr' : '1.15fr 0.85fr', gap: m ? '2rem' : '4rem', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '9999px', padding: '6px 14px', fontSize: '13px', fontWeight: 600, color: TEAL, marginBottom: '1.5rem' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: TEAL }} />Accepting new patients — no waitlist
            </span>
            <h1 style={{ fontSize: m ? '2.2rem' : 'clamp(2.6rem, 5.2vw, 4rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.08, margin: '0 0 1.25rem' }}>
              Modern healthcare,<br /><span style={{ color: TEAL }}>built around you</span>
            </h1>
            <p style={{ fontSize: m ? '1rem' : '1.1rem', color: MUTED, lineHeight: 1.75, maxWidth: '480px', margin: '0 0 2rem' }}>
              From same-day GP visits to specialist clinics, MedCare brings 40+ doctors, on-site labs, and a seamless patient portal under one roof.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button style={{ background: TEAL, color: '#fff', border: 'none', borderRadius: '12px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 20px rgba(13,148,136,0.3)' }}>Book a visit</button>
              <button style={{ background: '#fff', color: NAVY, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>Explore services</button>
            </div>
          </div>
          {/* Booking card */}
          <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '20px', padding: '1.75rem', boxShadow: '0 24px 60px rgba(17,48,74,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>Book an appointment</h3>
              <span style={{ fontSize: '12px', fontWeight: 600, color: TEAL, background: TEAL_SOFT, borderRadius: '9999px', padding: '4px 10px' }}>~2 min</span>
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTED, marginBottom: '8px' }}>Department</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {departments.map(d => (
                <button key={d} onClick={() => setDept(d)} style={{ border: `1px solid ${d === dept ? TEAL : BORDER}`, background: d === dept ? TEAL_SOFT : '#fff', color: d === dept ? TEAL : MUTED, borderRadius: '9999px', padding: '7px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>{d}</button>
              ))}
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTED, marginBottom: '8px' }}>Doctor</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '11px 14px', background: '#fbfdfe', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '14px', color: NAVY, fontWeight: 500 }}>{docFor(dept)}</span>
              <span style={{ fontSize: '12px', color: TEAL, fontWeight: 600 }}>Thu, 18 Jun</span>
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTED, marginBottom: '8px' }}>Available times</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '1.5rem' }}>
              {timeSlots.map(t => (
                <button key={t} onClick={() => setSlot(t)} style={{ border: `1px solid ${t === slot ? TEAL : BORDER}`, background: t === slot ? TEAL : '#fff', color: t === slot ? '#fff' : NAVY, borderRadius: '8px', padding: '8px 0', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>{t}</button>
              ))}
            </div>
            <button style={{ width: '100%', background: NAVY, color: '#fff', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>Confirm {dept} · {slot}</button>
            <p style={{ fontSize: '12px', color: MUTED, textAlign: 'center', margin: '12px 0 0' }}>Free cancellation up to 24h before your visit.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: m ? '2rem 1.25rem' : '2.5rem 2rem', display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: m ? '1.5rem' : '2rem' }}>
          {stats.map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: m ? '1.8rem' : '2.25rem', fontWeight: 800, letterSpacing: '-0.03em', color: TEAL }}>{s.v}</div>
              <div style={{ fontSize: '13px', color: MUTED, marginTop: '4px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="Departments" style={{ padding: m ? '3.5rem 0' : '5.5rem 0' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: m ? '2.25rem' : '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEAL }}>Our departments</span>
            <h2 style={{ fontSize: m ? '1.75rem' : 'clamp(1.9rem, 3.6vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem' }}>Specialist care, all in one place</h2>
            <p style={{ fontSize: '1.05rem', color: MUTED, maxWidth: '520px', margin: '0 auto' }}>Six dedicated departments staffed by board-certified specialists and supported by on-site diagnostics.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {services.map(s => (
              <div key={s.title} style={{ border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '1.75rem', background: '#fff' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: TEAL_SOFT, border: '1px solid #ccfbf1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}><Glyph icon={s.icon} /></div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 8px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section id="Doctors" style={{ padding: m ? '3.5rem 0' : '5.5rem 0', background: '#f8fbfc', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: pad }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: m ? '2rem' : '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEAL }}>Meet the team</span>
              <h2 style={{ fontSize: m ? '1.75rem' : 'clamp(1.9rem, 3.6vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>Doctors patients recommend</h2>
            </div>
            {!m && <button style={{ background: '#fff', color: NAVY, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '11px 20px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>View all 40+ doctors</button>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4,1fr)', gap: m ? '1rem' : '1.5rem' }}>
            {doctors.map(d => (
              <div key={d.name} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '16px', overflow: 'hidden' }}>
                <DocAvatar c1={d.c1} c2={d.c2} name={d.name} />
                <div style={{ padding: m ? '0.9rem' : '1.25rem' }}>
                  <h3 style={{ fontSize: m ? '14px' : '16px', fontWeight: 700, margin: '0 0 4px' }}>{d.name}</h3>
                  <p style={{ fontSize: '13px', color: TEAL, fontWeight: 600, margin: '0 0 4px' }}>{d.spec}</p>
                  <p style={{ fontSize: '12px', color: MUTED, margin: '0 0 12px' }}>{d.exp} experience</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#047857', background: '#ecfdf5', borderRadius: '9999px', padding: '4px 10px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />Available {d.avail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking process */}
      <section id="Booking" style={{ padding: m ? '3.5rem 0' : '5.5rem 0' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: m ? '2.25rem' : '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEAL }}>How it works</span>
            <h2 style={{ fontSize: m ? '1.75rem' : 'clamp(1.9rem, 3.6vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>Booked in four simple steps</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4,1fr)', gap: m ? '1.5rem' : '2rem' }}>
            {steps.map(step => (
              <div key={step.n} style={{ textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: TEAL, color: '#fff', fontSize: '17px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 8px 18px rgba(13,148,136,0.3)' }}>{step.n}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px' }}>{step.t}</h3>
                <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, margin: 0 }}>{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance */}
      <section id="Patients" style={{ padding: m ? '2.5rem 0' : '3rem 0', background: TEAL_SOFT, borderTop: '1px solid #ccfbf1', borderBottom: '1px solid #ccfbf1' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: pad }}>
          <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 600, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.75rem' }}>We work with leading insurance providers</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: m ? '1.5rem' : '3rem', flexWrap: 'wrap' }}>
            {insurers.map(n => <span key={n} style={{ fontSize: m ? '15px' : '17px', fontWeight: 700, color: '#7fa9a3' }}>{n}</span>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="Contact" style={{ padding: m ? '3.5rem 0' : '5.5rem 0' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: pad }}>
          <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0f4c5c 60%, ${TEAL} 100%)`, borderRadius: '24px', padding: m ? '2.75rem 1.5rem' : '4rem 3rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: m ? '1.8rem' : 'clamp(1.9rem, 3.8vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 1rem' }}>Your health shouldn&apos;t wait</h2>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', maxWidth: '480px', margin: '0 auto 2.25rem', lineHeight: 1.7 }}>Book online in under two minutes, or call our care line — we answer 24 hours a day, every day of the year.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button style={{ background: '#fff', color: NAVY, border: 'none', borderRadius: '12px', padding: '14px 28px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>Book an appointment</button>
              <button style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '12px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>Call (555) 014-2030</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, background: '#f8fbfc', padding: m ? '2.5rem 0 1.75rem' : '3.5rem 0 2rem' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: pad, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            </div>
            <span style={{ fontSize: '17px', fontWeight: 800 }}>Med<span style={{ color: TEAL }}>Care</span></span>
          </div>
          <p style={{ fontSize: '13px', color: MUTED, margin: 0 }}>120 Wellness Ave · Open Mon–Sat, 8:00–20:00</p>
          <p style={{ fontSize: '13px', color: '#9fb3c2', margin: 0 }}>© 2026 MedCare Clinic</p>
        </div>
      </footer>
    </div>
  );
}
