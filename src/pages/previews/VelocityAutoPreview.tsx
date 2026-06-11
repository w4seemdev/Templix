import { useState } from 'react';

/* ============================================================
   VELOCITY — Auto Dealership Template
   Dark #0a0a0a / #171717 · racing red #dc2626 · condensed caps
   ============================================================ */

const RED = '#dc2626';
const BG = '#0a0a0a';
const PANEL = '#171717';
const BORDER = '#262626';
const DIM = '#a3a3a3';

const navLinks = ['Inventory', 'Financing', 'Trade-In', 'Service', 'Contact'];

const types = [
  { icon: '🚙', label: 'SUV' }, { icon: '🚗', label: 'Sedan' }, { icon: '🏎️', label: 'Sports' },
  { icon: '⚡', label: 'Electric' }, { icon: '🛻', label: 'Truck' }, { icon: '✨', label: 'Luxury' },
];

const conditions = ['All', 'New', 'Pre-Owned'] as const;

const inventory = [
  { name: '2026 Veyron GT-S Coupe', price: 84900, year: 2026, miles: '12 mi', cond: 'New', specs: ['612 HP', 'AWD', 'Carbon pack'], img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80' },
  { name: '2026 Ionix EV Crossover', price: 56700, year: 2026, miles: '8 mi', cond: 'New', specs: ['410 mi range', 'Dual motor', 'Autopilot'], img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80' },
  { name: '2024 Strada Sport Sedan', price: 38900, year: 2024, miles: '18,420 mi', cond: 'Pre-Owned', specs: ['335 HP', 'RWD', '1 owner'], img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80' },
  { name: '2023 Apex Roadster S', price: 61500, year: 2023, miles: '9,870 mi', cond: 'Pre-Owned', specs: ['503 HP', 'Convertible', 'Certified'], img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80' },
  { name: '2026 Terra X Off-Road', price: 72300, year: 2026, miles: '15 mi', cond: 'New', specs: ['460 HP', '4x4', 'Tow pack'], img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80' },
  { name: '2024 Metro EV Hatch', price: 27800, year: 2024, miles: '22,310 mi', cond: 'Pre-Owned', specs: ['260 mi range', 'FWD', 'Certified'], img: 'https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=800&q=80' },
];

const spotlightSpecs = [
  { label: 'Horsepower', value: '612 HP' },
  { label: '0–60 mph', value: '3.1 s' },
  { label: 'Top speed', value: '198 mph' },
  { label: 'Drivetrain', value: 'AWD' },
];

const financeSteps = [
  { num: '01', title: 'Tell us your budget', desc: 'Pick a monthly payment that fits. Soft credit pull — no score impact.' },
  { num: '02', title: 'Get instant offers', desc: 'Compare APRs from 12 lenders in under two minutes, fully online.' },
  { num: '03', title: 'Drive it home', desc: 'E-sign, schedule delivery or pickup, and keep your weekend free.' },
];

const reviews = [
  {
    quote: 'In and out in 90 minutes with the exact trim I configured online. No back room, no four-square sheet, no games.',
    name: 'Marcus T.', detail: 'Bought a Veyron GT-S · March 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
  {
    quote: 'They beat my bank’s APR by 1.4 points and gave me $2,100 more on my trade than the chain store across town.',
    name: 'Alicia R.', detail: 'Financed an Ionix EV · May 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
];

const stats = [
  { value: '1,200+', label: 'Vehicles in stock' },
  { value: '4.9★', label: 'Google rating' },
  { value: '12', label: 'Lender partners' },
  { value: '7-day', label: 'Return guarantee' },
];

const footerCols = [
  { title: 'Shop', links: ['New inventory', 'Pre-owned', 'Electric', 'Specials'] },
  { title: 'Finance', links: ['Get pre-approved', 'Payment calculator', 'Trade-in value', 'Warranties'] },
  { title: 'Dealership', links: ['About us', 'Service center', 'Reviews', 'Careers'] },
];

export default function VelocityAutoPreview() {
  const [cond, setCond] = useState<typeof conditions[number]>('All');
  const filtered = cond === 'All' ? inventory : inventory.filter(v => v.cond === cond);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: BG, color: '#f5f5f5', minHeight: '100vh' }}>

      {/* ── Nav ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '17px', transform: 'skewX(-8deg)' }}>V</div>
            <span style={{ fontSize: '19px', fontWeight: 900, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Velocity</span>
          </div>
          <nav style={{ display: 'flex', gap: '1.75rem' }}>
            {navLinks.map(l => (
              <a key={l} href="#" style={{ fontSize: '13px', fontWeight: 600, color: DIM, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</a>
            ))}
          </nav>
          <a href="#" style={{ background: RED, color: '#fff', padding: '10px 22px', fontSize: '13px', fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Book test drive</a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80" alt="Sports car on open road" style={{ width: '100%', height: '540px', objectFit: 'cover', display: 'block', opacity: 0.5 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.95) 18%, rgba(10,10,10,0.25) 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', width: '100%' }}>
            <p style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.24em', color: RED, margin: '0 0 1rem' }}>The no-haggle dealership</p>
            <h1 style={{ fontSize: 'clamp(2.6rem, 6.5vw, 4.6rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.0, margin: '0 0 1.25rem', maxWidth: '620px' }}>
              Find your <span style={{ color: RED }}>fast</span> lane
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#d4d4d4', maxWidth: '460px', lineHeight: 1.7, margin: '0 0 2rem' }}>
              1,200+ new and certified pre-owned vehicles, transparent pricing, and financing you can finish from your couch.
            </p>
            {/* Search bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, maxWidth: '640px', border: `1px solid ${BORDER}`, background: 'rgba(23,23,23,0.95)' }}>
              {['Make', 'Model', 'Max price'].map(f => (
                <div key={f} style={{ flex: '1 1 140px', padding: '14px 18px', borderRight: `1px solid ${BORDER}`, fontSize: '13.5px', color: '#737373' }}>{f}</div>
              ))}
              <a href="#" style={{ background: RED, color: '#fff', padding: '14px 28px', fontSize: '13px', fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center' }}>Search</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Browse by type ── */}
      <section style={{ padding: '3rem 1.5rem', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
          {types.map(t => (
            <a key={t.label} href="#" style={{ textAlign: 'center', background: PANEL, border: `1px solid ${BORDER}`, padding: '1.4rem 1rem', textDecoration: 'none' }}>
              <div style={{ fontSize: '26px', marginBottom: '8px' }}>{t.icon}</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#e5e5e5', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.label}</div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Inventory ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: RED, margin: '0 0 0.6rem' }}>Inventory</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Featured vehicles</h2>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {conditions.map(c => (
                <button key={c} onClick={() => setCond(c)}
                  style={{ padding: '10px 20px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'inherit', background: cond === c ? RED : 'transparent', color: cond === c ? '#fff' : DIM, border: cond === c ? `1px solid ${RED}` : `1px solid ${BORDER}` }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {filtered.map(v => (
              <div key={v.name} style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
                <div style={{ position: 'relative' }}>
                  <img src={v.img} alt={v.name} style={{ width: '100%', height: '190px', objectFit: 'cover', display: 'block' }} />
                  <span style={{ position: 'absolute', top: '12px', left: '12px', background: v.cond === 'New' ? RED : '#404040', color: '#fff', padding: '4px 12px', fontSize: '10.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{v.cond}</span>
                </div>
                <div style={{ padding: '1.4rem' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px' }}>{v.name}</h3>
                  <p style={{ fontSize: '12.5px', color: '#737373', margin: '0 0 1rem' }}>{v.year} · {v.miles}</p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.1rem' }}>
                    {v.specs.map(s => (
                      <span key={s} style={{ border: `1px solid ${BORDER}`, padding: '3px 9px', fontSize: '11px', color: DIM }}>{s}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff' }}>${v.price.toLocaleString()}</span>
                    <a href="#" style={{ fontSize: '12px', fontWeight: 800, color: RED, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Details →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Spotlight vehicle ── */}
      <section style={{ padding: '5rem 1.5rem', background: PANEL, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&q=80" alt="Veyron GT-S spotlight" style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }} />
          <div>
            <p style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: RED, margin: '0 0 0.75rem' }}>Spotlight</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 1rem' }}>Veyron GT-S Coupe</h2>
            <p style={{ color: DIM, fontSize: '0.98rem', lineHeight: 1.75, margin: '0 0 1.75rem', maxWidth: '440px' }}>
              The flagship. Twin-turbo V8, carbon-ceramic brakes, and a cabin that smells like a very good decision. Two in stock, both ready today.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: BORDER, border: `1px solid ${BORDER}`, marginBottom: '1.75rem' }}>
              {spotlightSpecs.map(s => (
                <div key={s.label} style={{ background: BG, padding: '1rem 1.2rem' }}>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#737373', margin: '0 0 4px' }}>{s.label}</p>
                  <p style={{ fontSize: '19px', fontWeight: 900, margin: 0, color: '#fff' }}>{s.value}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
              <a href="#" style={{ background: RED, color: '#fff', padding: '13px 26px', fontSize: '13px', fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Book a test drive</a>
              <a href="#" style={{ border: '1px solid #525252', color: '#e5e5e5', padding: '13px 26px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Full spec sheet</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Financing calculator mock ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: RED, margin: '0 0 0.75rem' }}>Financing</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 2rem' }}>Approved before you arrive</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {financeSteps.map(s => (
                <div key={s.num} style={{ display: 'flex', gap: '1.25rem' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 900, color: RED, flexShrink: 0 }}>{s.num}</span>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 5px' }}>{s.title}</h3>
                    <p style={{ fontSize: '14px', color: DIM, lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: PANEL, border: `1px solid ${BORDER}`, padding: '2rem' }}>
            <p style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: DIM, margin: '0 0 1.5rem' }}>Payment estimate</p>
            {[
              { label: 'Vehicle price', value: '$56,700' },
              { label: 'Down payment', value: '$8,000' },
              { label: 'Trade-in credit', value: '$6,400' },
              { label: 'Term', value: '60 months · 5.2% APR' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${BORDER}` }}>
                <span style={{ fontSize: '14px', color: DIM }}>{row.label}</span>
                <span style={{ fontSize: '14px', fontWeight: 700 }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '1.5rem 0 0' }}>
              <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: DIM }}>Est. monthly</span>
              <span style={{ fontSize: '2.2rem', fontWeight: 900, color: RED }}>$806<span style={{ fontSize: '14px', color: DIM, fontWeight: 500 }}>/mo</span></span>
            </div>
            <a href="#" style={{ display: 'block', textAlign: 'center', background: RED, color: '#fff', padding: '14px', fontSize: '13px', fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1.25rem' }}>Get pre-approved</a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '3.5rem 1.5rem', background: PANEL, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: RED }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: DIM, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reviews ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: RED, margin: '0 0 0.6rem' }}>Reviews</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Drivers talk</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {reviews.map(r => (
              <div key={r.name} style={{ background: PANEL, border: `1px solid ${BORDER}`, padding: '2rem' }}>
                <div style={{ color: '#f59e0b', fontSize: '15px', marginBottom: '1rem' }}>★★★★★</div>
                <p style={{ fontSize: '14.5px', color: '#d4d4d4', lineHeight: 1.75, margin: '0 0 1.5rem' }}>“{r.quote}”</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={r.avatar} alt={r.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 800, margin: 0 }}>{r.name}</p>
                    <p style={{ fontSize: '12px', color: '#737373', margin: 0 }}>{r.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '0 1.5rem 5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ background: `linear-gradient(120deg, ${RED}, #7f1d1d)`, padding: '4rem 2.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', fontWeight: 900, textTransform: 'uppercase', color: '#fff', margin: '0 0 1rem' }}>Your seat is waiting</h2>
            <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.05rem', maxWidth: '460px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              Book a no-pressure test drive — we bring the keys to the curb, you bring the playlist.
            </p>
            <a href="#" style={{ display: 'inline-block', background: '#fff', color: '#7f1d1d', padding: '14px 32px', fontSize: '13px', fontWeight: 900, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Schedule test drive</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, background: PANEL, padding: '3.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '30px', height: '30px', background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '15px', transform: 'skewX(-8deg)' }}>V</div>
                <span style={{ fontSize: '17px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Velocity</span>
              </div>
              <p style={{ fontSize: '13.5px', color: DIM, lineHeight: 1.7, margin: 0 }}>
                4400 Motorway Blvd, Austin TX · Open 7 days · (512) 555-0177
              </p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#525252', margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: '14px', color: DIM, textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '12px', color: '#525252', margin: 0 }}>© 2026 Velocity Motors Group</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Instagram', 'YouTube', 'Facebook'].map(s => (
                <a key={s} href="#" style={{ fontSize: '12px', color: '#525252', textDecoration: 'none' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
