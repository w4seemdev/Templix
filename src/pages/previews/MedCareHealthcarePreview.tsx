/* ============================================================
   MEDCARE — Healthcare Clinic Template
   Light clinical theme · white + soft teal + navy text
   ============================================================ */

import { useState } from 'react';

const NAVY = '#11304a';
const TEAL = '#0d9488';
const TEAL_SOFT = '#f0fdfa';
const MUTED = '#5b7287';
const BORDER = '#e4ecf2';

const navLinks = ['Home', 'Services', 'Doctors', 'Appointments', 'Blog', 'Contact'];

const departments = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'];

const timeSlots = ['09:00', '09:45', '10:30', '11:15', '13:00', '14:30', '15:15', '16:00'];

const stats = [
  { value: '25k+', label: 'Patients treated' },
  { value: '18', label: 'Years of care' },
  { value: '4.9', label: 'Average rating' },
  { value: '40+', label: 'Specialist doctors' },
];

const services = [
  { icon: 'heart', title: 'Cardiology', desc: 'Comprehensive heart screenings, ECG diagnostics, and long-term cardiovascular care plans.' },
  { icon: 'pulse', title: 'Neurology', desc: 'Advanced neurological assessment and treatment for migraines, epilepsy, and nerve disorders.' },
  { icon: 'cross', title: 'General Medicine', desc: 'Same-day consultations for everyday health concerns, chronic conditions, and referrals.' },
  { icon: 'eye', title: 'Ophthalmology', desc: 'Full vision exams, retinal imaging, and minor surgical procedures in a modern eye suite.' },
  { icon: 'smile', title: 'Pediatrics', desc: 'Gentle, family-centred care for newborns through teens, including vaccination programmes.' },
  { icon: 'shield', title: 'Preventive Care', desc: 'Annual health checks, lab panels, and lifestyle guidance that catch issues before they start.' },
];

const doctors = [
  { name: 'Dr. Rachel Kim', specialty: 'Cardiologist', exp: '14 years experience', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80', available: 'Available today' },
  { name: 'Dr. James Osei', specialty: 'Neurologist', exp: '11 years experience', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80', available: 'Available tomorrow' },
  { name: 'Dr. Priya Nair', specialty: 'Pediatrician', exp: '9 years experience', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80', available: 'Available today' },
  { name: 'Dr. Daniel Mercer', specialty: 'Orthopedic Surgeon', exp: '16 years experience', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', available: 'Available Friday' },
];

const steps = [
  { num: '1', title: 'Choose a department', desc: 'Browse our specialties and pick the clinic that matches your concern.' },
  { num: '2', title: 'Pick your doctor', desc: 'Compare specialists by experience, focus area, and patient ratings.' },
  { num: '3', title: 'Select date & time', desc: 'Real-time availability — book a slot that fits your schedule in seconds.' },
  { num: '4', title: 'Visit the clinic', desc: 'Arrive 10 minutes early. Your records and results sync to your patient portal.' },
];

const testimonials = [
  { quote: 'From booking to follow-up, everything felt organised and human. Dr. Kim explained every step of my treatment in plain language.', name: 'Amelia Hart', detail: 'Cardiology patient', img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80' },
  { quote: 'We’ve brought both of our kids here for three years. Short waits, kind nurses, and reminders that actually arrive on time.', name: 'Tom Bradley', detail: 'Pediatrics — parent', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
  { quote: 'The online portal is brilliant. I rescheduled twice without a single phone call and my lab results appeared the same day.', name: 'Sofia Reyes', detail: 'General medicine patient', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
];

const insurers = ['NovaHealth', 'TrustShield', 'CarePlus', 'MediSure', 'VitalGroup', 'Apex Benefits'];

const footerCols = [
  { title: 'Clinic', links: ['About us', 'Our doctors', 'Departments', 'Careers'] },
  { title: 'Patients', links: ['Book appointment', 'Patient portal', 'Insurance', 'FAQ'] },
  { title: 'Resources', links: ['Health blog', 'Lab results', 'Opening hours', 'Contact'] },
];

function Glyph({ icon }: { icon: string }) {
  const stroke = { fill: 'none', stroke: TEAL, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}>
      {icon === 'heart' && <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />}
      {icon === 'pulse' && <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />}
      {icon === 'cross' && <><path d="M12 5v14" /><path d="M5 12h14" /></>}
      {icon === 'eye' && <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}
      {icon === 'smile' && <><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></>}
      {icon === 'shield' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
    </svg>
  );
}

function FakeSelect({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTED, marginBottom: '6px' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '11px 14px', background: '#fbfdfe', cursor: 'pointer' }}>
        <span style={{ fontSize: '14px', color: NAVY, fontWeight: 500 }}>{value}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}

export default function MedCareHealthcarePreview() {
  const [dept, setDept] = useState('Cardiology');
  const [slot, setSlot] = useState('10:30');

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#ffffff', color: NAVY, minHeight: '100vh' }}>

      {/* ── Sticky nav ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14" /><path d="M5 12h14" /></svg>
            </div>
            <span style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.02em' }}>Med<span style={{ color: TEAL }}>Care</span></span>
          </div>
          <nav style={{ display: 'flex', gap: '1.75rem' }}>
            {navLinks.map(l => (
              <a key={l} href="#" style={{ fontSize: '14px', fontWeight: 500, color: l === 'Home' ? TEAL : MUTED, textDecoration: 'none' }}>{l}</a>
            ))}
          </nav>
          <button style={{ background: TEAL, color: '#ffffff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 6px 16px rgba(13,148,136,0.25)' }}>
            Book Appointment
          </button>
        </div>
      </header>

      {/* ── Hero + booking card ── */}
      <section style={{ background: `linear-gradient(180deg, ${TEAL_SOFT} 0%, #ffffff 100%)`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '4.5rem 2rem 5rem', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ffffff', border: `1px solid ${BORDER}`, borderRadius: '9999px', padding: '6px 14px', fontSize: '13px', fontWeight: 600, color: TEAL, marginBottom: '1.5rem' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: TEAL }} />
              Accepting new patients — no waitlist
            </span>
            <h1 style={{ fontSize: 'clamp(2.6rem, 5.2vw, 4rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.08, margin: '0 0 1.25rem' }}>
              Modern healthcare,<br />
              <span style={{ color: TEAL }}>built around you</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: MUTED, lineHeight: 1.75, maxWidth: '480px', margin: '0 0 2.25rem' }}>
              From same-day GP visits to specialist clinics, MedCare brings 40+ doctors, on-site labs, and a seamless patient portal under one roof.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <button style={{ background: TEAL, color: '#ffffff', border: 'none', borderRadius: '12px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 20px rgba(13,148,136,0.3)' }}>
                Book a visit
              </button>
              <button style={{ background: '#ffffff', color: NAVY, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
                Explore services
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ display: 'flex' }}>
                {doctors.slice(0, 3).map((d, i) => (
                  <img key={d.name} src={d.img} alt={d.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ffffff', marginLeft: i === 0 ? 0 : '-10px' }} />
                ))}
              </div>
              <span style={{ fontSize: '13px', color: MUTED }}>Trusted by <strong style={{ color: NAVY }}>25,000+ patients</strong> across the city</span>
            </div>
          </div>

          {/* Booking card */}
          <div style={{ background: '#ffffff', border: `1px solid ${BORDER}`, borderRadius: '20px', padding: '1.75rem', boxShadow: '0 24px 60px rgba(17,48,74,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>Book an appointment</h3>
              <span style={{ fontSize: '12px', fontWeight: 600, color: TEAL, background: TEAL_SOFT, borderRadius: '9999px', padding: '4px 10px' }}>~2 min</span>
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTED, marginBottom: '8px' }}>Department</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {departments.map(d => (
                <button key={d} onClick={() => setDept(d)} style={{
                  border: `1px solid ${d === dept ? TEAL : BORDER}`,
                  background: d === dept ? TEAL_SOFT : '#ffffff',
                  color: d === dept ? TEAL : MUTED,
                  borderRadius: '9999px', padding: '7px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                }}>
                  {d}
                </button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.25rem' }}>
              <FakeSelect label="Doctor" value={dept === 'Cardiology' ? 'Dr. Rachel Kim' : dept === 'Neurology' ? 'Dr. James Osei' : dept === 'Pediatrics' ? 'Dr. Priya Nair' : 'Dr. Daniel Mercer'} />
              <FakeSelect label="Date" value="Thu, 18 June" />
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTED, marginBottom: '8px' }}>Available times</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '1.5rem' }}>
              {timeSlots.map(t => (
                <button key={t} onClick={() => setSlot(t)} style={{
                  border: `1px solid ${t === slot ? TEAL : BORDER}`,
                  background: t === slot ? TEAL : '#ffffff',
                  color: t === slot ? '#ffffff' : NAVY,
                  borderRadius: '8px', padding: '8px 0', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                }}>
                  {t}
                </button>
              ))}
            </div>
            <button style={{ width: '100%', background: NAVY, color: '#ffffff', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
              Confirm {dept} · {slot}
            </button>
            <p style={{ fontSize: '12px', color: MUTED, textAlign: 'center', margin: '12px 0 0' }}>Free cancellation up to 24h before your visit.</p>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '2.5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em', color: TEAL }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: MUTED, marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services grid ── */}
      <section style={{ padding: '5.5rem 0' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEAL }}>Our services</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem' }}>Specialist care, all in one place</h2>
            <p style={{ fontSize: '1.05rem', color: MUTED, maxWidth: '520px', margin: '0 auto' }}>Six dedicated departments staffed by board-certified specialists and supported by on-site diagnostics.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {services.map(s => (
              <div key={s.title} style={{ border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '1.75rem', background: '#ffffff' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: TEAL_SOFT, border: '1px solid #ccfbf1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Glyph icon={s.icon} />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 8px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, margin: '0 0 1rem' }}>{s.desc}</p>
                <a href="#" style={{ fontSize: '14px', fontWeight: 600, color: TEAL, textDecoration: 'none' }}>Learn more →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Doctors grid ── */}
      <section style={{ padding: '5.5rem 0', background: '#f8fbfc', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEAL }}>Meet the team</span>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>Doctors patients recommend</h2>
            </div>
            <button style={{ background: '#ffffff', color: NAVY, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '11px 20px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
              View all 40+ doctors
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {doctors.map(d => (
              <div key={d.name} style={{ background: '#ffffff', border: `1px solid ${BORDER}`, borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ aspectRatio: '1 / 1', overflow: 'hidden' }}>
                  <img src={d.img} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px' }}>{d.name}</h3>
                  <p style={{ fontSize: '13px', color: TEAL, fontWeight: 600, margin: '0 0 4px' }}>{d.specialty}</p>
                  <p style={{ fontSize: '12px', color: MUTED, margin: '0 0 12px' }}>{d.exp}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#047857', background: '#ecfdf5', borderRadius: '9999px', padding: '4px 10px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                    {d.available}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Appointment process ── */}
      <section style={{ padding: '5.5rem 0' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEAL }}>How it works</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>Booked in four simple steps</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {steps.map((step, i) => (
              <div key={step.num} style={{ position: 'relative', textAlign: 'center' }}>
                {i < steps.length - 1 && (
                  <div style={{ position: 'absolute', top: '24px', left: 'calc(50% + 36px)', right: 'calc(-50% + 36px)', height: '2px', background: BORDER }} />
                )}
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: TEAL, color: '#ffffff', fontSize: '17px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', position: 'relative', boxShadow: '0 8px 18px rgba(13,148,136,0.3)' }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: '5.5rem 0', background: TEAL_SOFT, borderTop: '1px solid #ccfbf1', borderBottom: '1px solid #ccfbf1' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEAL }}>Patient stories</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>Care people talk about</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: '#ffffff', border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <span key={n} style={{ color: '#f59e0b', fontSize: '15px' }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: '14.5px', color: NAVY, lineHeight: 1.75, margin: 0, flex: 1 }}>“{t.quote}”</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={t.img} alt={t.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '12px', color: MUTED, margin: 0 }}>{t.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Insurance / partners strip ── */}
      <section style={{ padding: '3rem 0' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem' }}>
          <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 600, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.75rem' }}>
            We work with leading insurance providers
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            {insurers.map(name => (
              <span key={name} style={{ fontSize: '17px', fontWeight: 700, color: '#9fb3c2', letterSpacing: '-0.01em' }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section style={{ padding: '0 0 5.5rem' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0f4c5c 60%, ${TEAL} 100%)`, borderRadius: '24px', padding: '4rem 3rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1rem' }}>
              Your health shouldn’t wait
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', maxWidth: '480px', margin: '0 auto 2.25rem', lineHeight: 1.7 }}>
              Book online in under two minutes, or call our care line — we answer 24 hours a day, every day of the year.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button style={{ background: '#ffffff', color: NAVY, border: 'none', borderRadius: '12px', padding: '14px 28px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
                Book an appointment
              </button>
              <button style={{ background: 'transparent', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '12px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
                Call (555) 014-2030
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, background: '#f8fbfc', padding: '3.5rem 0 2rem' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14" /><path d="M5 12h14" /></svg>
                </div>
                <span style={{ fontSize: '17px', fontWeight: 800 }}>Med<span style={{ color: TEAL }}>Care</span></span>
              </div>
              <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.7, margin: '0 0 1rem' }}>
                A modern multi-specialty clinic delivering trusted, patient-first healthcare since 2008.
              </p>
              <p style={{ fontSize: '13px', color: MUTED, margin: 0 }}>120 Wellness Ave, Suite 4<br />Open Mon–Sat, 8:00–20:00</p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: NAVY, marginBottom: '1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: '14px', color: MUTED, textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: NAVY, marginBottom: '1rem' }}>Emergency</h4>
              <p style={{ fontSize: '20px', fontWeight: 800, color: TEAL, margin: '0 0 6px' }}>(555) 014-2030</p>
              <p style={{ fontSize: '13px', color: MUTED, margin: 0 }}>24/7 urgent care line</p>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '13px', color: '#9fb3c2', margin: 0 }}>© 2026 MedCare Clinic. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Privacy', 'Terms', 'Accessibility'].map(l => (
                <a key={l} href="#" style={{ fontSize: '13px', color: '#9fb3c2', textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
