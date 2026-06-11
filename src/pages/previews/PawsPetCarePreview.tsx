import { useState } from 'react';

/* ============================================================
   PAWS — Pet Care & Vet Clinic Template
   Soft light theme · sky #0ea5e9 + warm yellow #fbbf24
   Extra-rounded corners · friendly pastels · paw accents
   ============================================================ */

const SKY = '#0ea5e9';
const YELLOW = '#fbbf24';
const INK = '#0f172a';
const GREY = '#64748b';
const BORDER = '#e2e8f0';
const SOFT = '#f0f9ff';

const navLinks = ['Services', 'Our Vets', 'Pricing', 'FAQ', 'Contact'];

const trustBadges = ['🏅 Fear-Free Certified', '🕐 24/7 Emergency', '🩺 AAHA Accredited', '💙 12k Happy Pets'];

const services = [
  { icon: '🩺', title: 'Wellness checkups', price: 'from $49', desc: 'Nose-to-tail exams, vaccinations, and a health plan tailored to your pet’s age and breed.' },
  { icon: '🦷', title: 'Dental care', price: 'from $129', desc: 'Cleanings, digital dental X-rays, and extractions — with anesthesia monitoring throughout.' },
  { icon: '✂️', title: 'Grooming & spa', price: 'from $39', desc: 'Baths, trims, nail care, and de-shedding from groomers your dog will actually be excited to see.' },
  { icon: '🏥', title: 'Surgery', price: 'quote', desc: 'Spay/neuter to soft-tissue procedures in our on-site surgical suite with full aftercare support.' },
  { icon: '💉', title: 'Vaccinations', price: 'from $25', desc: 'Core and lifestyle vaccines on a schedule we track for you — reminders included.' },
  { icon: '🚑', title: 'Emergency care', price: '24/7', desc: 'A vet answers our emergency line around the clock, every day of the year. No answering machines.' },
];

const vets = [
  { name: 'Dr. Maya Chen', role: 'Lead Veterinarian · Surgery', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80', pets: 'Two rescue greyhounds' },
  { name: 'Dr. Tomás Rivera', role: 'Internal Medicine', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80', pets: 'A very loud parrot' },
  { name: 'Dr. Aisha Bello', role: 'Dentistry & Dermatology', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80', pets: 'Three foster kittens' },
];

const visitSteps = [
  { num: '1', title: 'Book online', desc: 'Pick a time that works — same-day slots held for sick visits every morning.' },
  { num: '2', title: 'Meet your vet', desc: 'Unhurried 30-minute appointments in fear-free exam rooms with treats on tap.' },
  { num: '3', title: 'Care plan + recap', desc: 'Walk out with a clear plan, costs up front, and visit notes in your inbox.' },
];

const plans = [
  {
    name: 'Kitten / Puppy', price: '$29', period: '/mo', highlight: false,
    desc: 'First-year essentials for new family members.',
    features: ['All core vaccines', 'Monthly checkups', 'Microchipping', 'Spay/neuter discount', '24/7 nurse line'],
  },
  {
    name: 'Adult Wellness', price: '$39', period: '/mo', highlight: true,
    desc: 'Year-round prevention for adult cats and dogs.',
    features: ['2 annual exams', 'Vaccines + boosters', 'Annual bloodwork', 'Dental cleaning 20% off', 'Unlimited tele-vet chats'],
  },
  {
    name: 'Senior Care', price: '$55', period: '/mo', highlight: false,
    desc: 'Extra eyes on your pet’s golden years.',
    features: ['3 annual exams', 'Senior blood panels', 'Joint health screening', 'Priority scheduling', 'Home-visit option'],
  },
];

const testimonials = [
  {
    quote: 'Biscuit used to shake in the car on vet days. Now he drags me through the front door — the treats and patience here are unreal.',
    name: 'Hannah & Biscuit 🐶', detail: 'Golden Retriever, age 4',
    img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&q=80',
  },
  {
    quote: 'They caught Mochi’s kidney issue early on a routine senior panel. Two years later she is still ruling the house.',
    name: 'Priya & Mochi 🐱', detail: 'Tabby, age 13',
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&q=80',
  },
];

const faqs = [
  { q: 'Do you take walk-ins?', a: 'We hold same-day sick slots every morning at 8am, and true emergencies are always seen immediately. For routine care, booking online gets you the best times.' },
  { q: 'Which pets do you treat?', a: 'Dogs, cats, rabbits, and pocket pets (hamsters, guinea pigs, rats). For birds and reptiles we will happily refer you to our exotic-specialist partners next door.' },
  { q: 'How do wellness plans work?', a: 'A monthly subscription spreads the cost of preventive care across the year — exams, vaccines, and bloodwork are included, and everything else is 10–20% off. Cancel anytime after 6 months.' },
  { q: 'What happens in an after-hours emergency?', a: 'Call our main number any time — a veterinarian (not a recording) answers 24/7, triages by phone, and meets you at the clinic if your pet needs to be seen.' },
];

const footerCols = [
  { title: 'Care', links: ['Services', 'Wellness plans', 'Emergency', 'Pharmacy'] },
  { title: 'Clinic', links: ['Our vets', 'Tour the clinic', 'Reviews', 'Careers'] },
  { title: 'Help', links: ['FAQ', 'Pet care blog', 'Insurance', 'Contact'] },
];

export default function PawsPetCarePreview() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#ffffff', color: INK, minHeight: '100vh' }}>

      {/* ── Emergency banner ── */}
      <div style={{ background: YELLOW, color: '#451a03', textAlign: 'center', padding: '9px 1.5rem', fontSize: '13px', fontWeight: 700 }}>
        🚑 Pet emergency? Call (415) 555-PAWS — a vet answers 24/7
      </div>

      {/* ── Nav ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1.5rem', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: SKY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🐾</div>
            <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em' }}>Paws</span>
          </div>
          <nav style={{ display: 'flex', gap: '1.75rem' }}>
            {navLinks.map(l => (
              <a key={l} href="#" style={{ fontSize: '14px', fontWeight: 500, color: GREY, textDecoration: 'none' }}>{l}</a>
            ))}
          </nav>
          <a href="#" style={{ background: SKY, color: '#fff', borderRadius: '9999px', padding: '10px 24px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 6px 18px rgba(14,165,233,0.3)' }}>Book a visit</a>
        </div>
      </header>

      {/* ── Hero with booking card ── */}
      <section style={{ padding: '4.5rem 1.5rem', background: SOFT }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-block', background: '#fff', border: `1px solid ${BORDER}`, color: SKY, borderRadius: '9999px', padding: '6px 16px', fontSize: '13px', fontWeight: 700, marginBottom: '1.5rem' }}>
              🐾 San Francisco’s friendliest clinic
            </span>
            <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.08, margin: 0 }}>
              Vet visits your pet will <span style={{ color: SKY }}>wag about</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: GREY, lineHeight: 1.75, margin: '1.5rem 0 2rem', maxWidth: '460px' }}>
              Fear-free exams, transparent prices, and a team that gets down on the floor with the nervous ones. Welcome to Paws.
            </p>
            <img src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=900&q=80" alt="Happy dog with vet" style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '24px', display: 'block' }} />
          </div>

          {/* Booking card */}
          <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '24px', padding: '2.25rem', boxShadow: '0 24px 60px rgba(14,165,233,0.12)' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 0.4rem' }}>Book a visit 🗓️</h2>
            <p style={{ fontSize: '13.5px', color: GREY, margin: '0 0 1.5rem' }}>Same-day slots held for sick pets every morning.</p>
            {[
              { label: 'Your pet', placeholder: '🐶 Dog · Biscuit' },
              { label: 'Service', placeholder: 'Wellness checkup' },
              { label: 'Preferred date', placeholder: 'Tomorrow · morning' },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: '1.1rem' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: INK, margin: '0 0 6px' }}>{f.label}</p>
                <div style={{ border: `1.5px solid ${BORDER}`, borderRadius: '14px', padding: '13px 16px', fontSize: '14px', color: GREY, background: '#fafcff' }}>{f.placeholder}</div>
              </div>
            ))}
            <a href="#" style={{ display: 'block', textAlign: 'center', background: SKY, color: '#fff', borderRadius: '14px', padding: '15px', fontSize: '15px', fontWeight: 800, textDecoration: 'none', boxShadow: '0 8px 22px rgba(14,165,233,0.3)', marginBottom: '0.9rem' }}>Find a time →</a>
            <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', margin: 0 }}>No payment needed to book · free cancellation</p>
          </div>
        </div>
      </section>

      {/* ── Trust badges ── */}
      <section style={{ padding: '2rem 1.5rem', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
          {trustBadges.map(b => (
            <span key={b} style={{ fontSize: '14px', fontWeight: 700, color: '#475569' }}>{b}</span>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: SKY }}>Services</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>Everything under one (cozy) roof</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.25rem' }}>
            {services.map(s => (
              <div key={s.title} style={{ border: `1px solid ${BORDER}`, borderRadius: '22px', padding: '1.75rem', background: '#fff' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '18px', background: SOFT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '1.1rem' }}>{s.icon}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '16.5px', fontWeight: 800, margin: 0 }}>{s.title}</h3>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: SKY }}>{s.price}</span>
                </div>
                <p style={{ fontSize: '14px', color: GREY, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet the vets ── */}
      <section style={{ padding: '5rem 1.5rem', background: SOFT, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: SKY }}>Our team</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>Meet your vets</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {vets.map(v => (
              <div key={v.name} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '24px', overflow: 'hidden' }}>
                <img src={v.avatar} alt={v.name} style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '0 0 4px' }}>{v.name}</h3>
                  <p style={{ fontSize: '13px', color: SKY, fontWeight: 700, margin: '0 0 10px' }}>{v.role}</p>
                  <p style={{ fontSize: '13px', color: GREY, margin: 0 }}>🏠 At home: {v.pets}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How a visit works ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: SKY }}>First visit?</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>How it works</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {visitSteps.map(s => (
              <div key={s.num} style={{ textAlign: 'center' }}>
                <div style={{ width: '58px', height: '58px', borderRadius: '50%', background: YELLOW, color: '#451a03', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 800, margin: '0 auto 1.25rem' }}>{s.num}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '0 0 0.6rem' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: GREY, lineHeight: 1.7, margin: '0 auto', maxWidth: '290px' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wellness plans ── */}
      <section style={{ padding: '5rem 1.5rem', background: SOFT, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: SKY }}>Wellness plans</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 1rem' }}>Prevention, on subscription</h2>
            <p style={{ color: GREY, fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto' }}>Spread the cost of a healthy year over twelve friendly payments.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
            {plans.map(p => (
              <div key={p.name} style={{ background: '#fff', borderRadius: '24px', padding: '2rem', border: p.highlight ? `2.5px solid ${SKY}` : `1px solid ${BORDER}`, boxShadow: p.highlight ? '0 20px 50px rgba(14,165,233,0.18)' : 'none', position: 'relative' }}>
                {p.highlight && (
                  <span style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: SKY, color: '#fff', borderRadius: '9999px', padding: '4px 16px', fontSize: '12px', fontWeight: 800, whiteSpace: 'nowrap' }}>Most popular 🐾</span>
                )}
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px' }}>{p.name}</h3>
                <p style={{ fontSize: '13px', color: GREY, margin: '0 0 1.25rem', lineHeight: 1.6 }}>{p.desc}</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>{p.price}</span>
                  <span style={{ fontSize: '13px', color: GREY, marginBottom: '5px' }}>{p.period}</span>
                </div>
                <a href="#" style={{ display: 'block', textAlign: 'center', borderRadius: '14px', padding: '12px', fontSize: '14px', fontWeight: 800, textDecoration: 'none', marginBottom: '1.5rem', background: p.highlight ? SKY : SOFT, color: p.highlight ? '#fff' : INK }}>Choose plan</a>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#475569' }}>
                      <span style={{ color: SKY, fontWeight: 800, flexShrink: 0 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Happy tails ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: SKY }}>Happy tails</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>From the waiting room</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: SOFT, border: `1px solid ${BORDER}`, borderRadius: '24px', padding: '2rem' }}>
                <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.8, margin: '0 0 1.5rem' }}>“{t.quote}”</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={t.img} alt={t.name} style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <p style={{ fontSize: '14.5px', fontWeight: 800, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '12.5px', color: GREY, margin: 0 }}>{t.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '5rem 1.5rem', background: SOFT, borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: SKY }}>FAQ</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0.75rem 0 0' }}>Common questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} style={{ background: '#fff', border: open ? `1.5px solid ${SKY}` : `1px solid ${BORDER}`, borderRadius: '18px', overflow: 'hidden' }}>
                  <button onClick={() => setOpenFaq(open ? null : i)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1.15rem 1.4rem', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: INK }}>{faq.q}</span>
                    <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: open ? SKY : SOFT, color: open ? '#fff' : GREY, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 800, flexShrink: 0 }}>{open ? '−' : '+'}</span>
                  </button>
                  {open && (
                    <p style={{ margin: 0, padding: '0 1.4rem 1.25rem', fontSize: '14px', color: GREY, lineHeight: 1.75 }}>{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ background: `linear-gradient(135deg, ${SKY}, #38bdf8)`, borderRadius: '28px', padding: '4rem 2.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '38px', marginBottom: '0.75rem' }}>🐾</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#fff', margin: '0 0 1rem', letterSpacing: '-0.03em' }}>New patients get their first exam free</h2>
            <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '1.05rem', maxWidth: '460px', margin: '0 auto 2.25rem', lineHeight: 1.7 }}>
              Bring your best friend by for a meet-and-greet, a treat, and a nose-to-tail check on us.
            </p>
            <a href="#" style={{ display: 'inline-block', background: '#fff', color: '#0369a1', borderRadius: '9999px', padding: '14px 34px', fontSize: '15px', fontWeight: 800, textDecoration: 'none' }}>Claim free first visit</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, background: SOFT, padding: '3.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: SKY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>🐾</div>
                <span style={{ fontSize: '18px', fontWeight: 800 }}>Paws</span>
              </div>
              <p style={{ fontSize: '13.5px', color: GREY, lineHeight: 1.7, margin: 0 }}>
                212 Harbor Lane, San Francisco · Mon–Sat 8a–7p · (415) 555-PAWS
              </p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: '14px', color: GREY, textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>© 2026 Paws Veterinary Group · Made with 💙 and dog hair</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Instagram', 'TikTok', 'Yelp'].map(s => (
                <a key={s} href="#" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
