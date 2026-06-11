import { useState } from 'react';

/* ============================================================
   VERDE — Eco & Sustainability Brand Template
   Warm cream (#faf8f3) · deep forest green (#166534) · soft sage
   Organic feel: serif display headings, rounded-full pills,
   leaf accents, full-bleed nature photography
   ============================================================ */

const CREAM = '#faf8f3';
const FOREST = '#166534';
const FOREST_DARK = '#14532d';
const SAGE = '#e8efe3';
const INK = '#1c2a21';
const MUTED = '#5f6f60';
const BORDER = '#e4ddcf';
const SERIF = "'Fraunces', Georgia, 'Times New Roman', serif";

const navLinks = ['Home', 'Mission', 'Products', 'Impact', 'Blog', 'Contact'];

const missionPillars = [
  { icon: '🌱', title: 'Regenerative by design', desc: 'Every Verde product is made from materials that give back — organic cotton from regenerative farms, bamboo that regrows in months, and ocean-bound plastic intercepted before it reaches the sea.' },
  { icon: '🔁', title: 'Circular, not disposable', desc: 'We design for the second and third life. Send any worn-out Verde product back to us and we will repair it, remake it, or compost it — and plant a tree for your trouble.' },
  { icon: '🤝', title: 'People before margins', desc: 'Our 14 partner workshops across Portugal, Kenya, and Vietnam are audited twice a year, pay 2.3× the local living wage, and co-own 10% of the company.' },
];

const productCategories = ['All', 'Kitchen', 'Bath & Body', 'On the Go'];

const products = [
  { name: 'Evergreen Bottle', category: 'On the Go', price: '$34', desc: 'Insulated steel bottle that keeps water cold for 24 hours. One bottle replaces roughly 1,460 single-use plastics over its lifetime.', img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80', badge: 'Bestseller' },
  { name: 'Grove Lunch Set', category: 'Kitchen', price: '$48', desc: 'Three nesting containers pressed from reclaimed bamboo fibre. Dishwasher-safe, plastic-free, and fully compostable at end of life.', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', badge: null },
  { name: 'Meadow Soap Trio', category: 'Bath & Body', price: '$22', desc: 'Cold-pressed olive oil soaps scented with lavender, cedar, and sage. Wrapped in seed paper you can plant in your garden.', img: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&q=80', badge: 'New' },
  { name: 'Canopy Tote', category: 'On the Go', price: '$29', desc: 'Carry-everything tote woven from 12 recycled bottles and regenerative cotton. Tested to hold 30 kg without complaint.', img: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&q=80', badge: null },
  { name: 'Hearth Beeswax Wraps', category: 'Kitchen', price: '$18', desc: 'A reusable replacement for cling film, made with organic cotton and Alpine beeswax. Each wrap lasts a year of daily use.', img: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80', badge: null },
  { name: 'Riverbed Bath Bar Kit', category: 'Bath & Body', price: '$39', desc: 'Shampoo, conditioner, and body bars that outlast six plastic bottles each — packed in a travel tin made of recycled aluminium.', img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80', badge: 'Bestseller' },
];

const impactMetrics = [
  { value: '1.2M', label: 'Trees planted', detail: 'Across 9 reforestation sites in Kenya, Brazil, and Indonesia — verified by satellite every quarter.' },
  { value: '48,200 t', label: 'CO₂ offset', detail: 'The equivalent of taking 10,400 cars off the road for a full year, audited by Climate Neutral.' },
  { value: '915 t', label: 'Plastic diverted', detail: 'Single-use plastic kept out of oceans and landfills by customers switching to reusables.' },
  { value: '162k', label: 'Verde members', detail: 'Households in 41 countries tracking their footprint with the free Verde impact dashboard.' },
];

const timeline = [
  { year: '2017', title: 'A bottle and a promise', desc: 'Verde starts at a Lisbon farmers market with one product — the Evergreen Bottle — and a promise to plant a tree for every sale.' },
  { year: '2019', title: 'Plastic-neutral certified', desc: 'For every gram of plastic we ship, we fund the recovery of two. Our packaging goes 100% compostable the same year.' },
  { year: '2021', title: 'B Corp, first try', desc: 'We certify as a B Corporation with a score of 124.3 — placing Verde in the top 5% of certified consumer goods companies worldwide.' },
  { year: '2023', title: 'One million trees', desc: 'Our millionth tree goes into the ground in the Rift Valley. Customers vote to name it Doug. We respect their decision.' },
  { year: '2025', title: 'Carbon negative', desc: 'Verde removes 2.4× more carbon than the entire business emits — including every courier mile and every office kettle.' },
  { year: '2026', title: 'The regenerative decade', desc: 'We commit 5% of all revenue to converting 10,000 hectares of farmland to regenerative agriculture by 2030.' },
];

const certifications = [
  { name: 'B Corporation', tag: 'Score 124.3' },
  { name: 'Climate Neutral', tag: 'Certified 2025' },
  { name: '1% for the Planet', tag: 'Member since 2018' },
  { name: 'FSC Certified', tag: 'All paper & bamboo' },
  { name: 'GOTS Organic', tag: 'All cotton' },
  { name: 'Fair Trade', tag: '14 partner workshops' },
];

const blogPosts = [
  { tag: 'Field notes', date: 'Jun 2, 2026', title: 'What 1.2 million trees actually look like from space', excerpt: 'We flew a satellite pass over our Rift Valley site and compared it to 2019. The canopy difference made our whole team go quiet.', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', author: 'Inês Carvalho' },
  { tag: 'Guides', date: 'May 21, 2026', title: 'The honest math of a reusable bottle', excerpt: 'A reusable has to be used 15–40 times before it beats single-use. Here is the full lifecycle math, including the embarrassing parts.', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', author: 'Tomás Reis' },
  { tag: 'People', date: 'May 8, 2026', title: 'Inside the Nairobi workshop that co-owns Verde', excerpt: 'Meet the 38-person team stitching every Canopy Tote — and learn how worker ownership changed what they asked us to build next.', img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80', author: 'Wanjiru Maina' },
];

const footerCols = [
  { title: 'Shop', links: ['Kitchen', 'Bath & Body', 'On the Go', 'Gift sets', 'Refills'] },
  { title: 'Mission', links: ['Our story', 'Impact report', 'Certifications', 'Tree tracker'] },
  { title: 'Support', links: ['Contact', 'Shipping', 'Returns & repairs', 'FAQ'] },
  { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press kit'] },
];

export default function VerdeEcoPreview() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const visibleProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: CREAM, color: INK, minHeight: '100vh' }}>

      {/* ── Sticky Nav ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,248,243,0.88)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1.5rem', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: FOREST, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px' }}>🌿</div>
            <span style={{ fontSize: '21px', fontWeight: 700, letterSpacing: '-0.02em', fontFamily: SERIF, color: FOREST_DARK }}>Verde</span>
          </div>
          <nav style={{ display: 'flex', gap: '1.6rem' }}>
            {navLinks.map(l => (
              <a key={l} href="#" style={{ fontSize: '14px', fontWeight: 500, color: l === 'Home' ? FOREST : MUTED, textDecoration: 'none' }}>{l}</a>
            ))}
          </nav>
          <a href="#" style={{ background: FOREST, color: '#fdfcf8', borderRadius: '9999px', padding: '10px 22px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 6px 18px rgba(22,101,52,0.25)' }}>
            Shop reusables
          </a>
        </div>
      </header>

      {/* ── Hero (full-bleed nature imagery) ── */}
      <section style={{ position: 'relative', minHeight: '560px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80" alt="Misty green hills at sunrise" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(20,42,28,0.82) 0%, rgba(20,42,28,0.55) 45%, rgba(20,42,28,0.15) 100%)' }} />
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '5rem 1.5rem', position: 'relative', width: '100%' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(250,248,243,0.14)', border: '1px solid rgba(250,248,243,0.35)', borderRadius: '9999px', padding: '7px 18px', fontSize: '13px', fontWeight: 600, color: '#e9f3e4', marginBottom: '1.5rem', backdropFilter: 'blur(6px)' }}>
            🌿 Carbon negative since 2025 — and counting
          </span>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.08, color: '#fdfcf8', maxWidth: '640px', margin: 0 }}>
            Everyday goods that leave the Earth better than they found it
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(250,248,243,0.85)', lineHeight: 1.75, maxWidth: '520px', margin: '1.5rem 0 0' }}>
            Verde makes reusable kitchen, bath, and travel essentials from regenerative materials — and plants a tree for every order. 1.2 million planted so far. Yours is next.
          </p>
          <div style={{ display: 'flex', gap: '0.875rem', marginTop: '2.25rem', flexWrap: 'wrap' }}>
            <a href="#" style={{ background: '#fdfcf8', color: FOREST_DARK, borderRadius: '9999px', padding: '14px 32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>
              Shop the collection
            </a>
            <a href="#" style={{ border: '1.5px solid rgba(250,248,243,0.55)', color: '#fdfcf8', borderRadius: '9999px', padding: '14px 32px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>
              Read our 2026 impact report
            </a>
          </div>
          <div style={{ display: 'flex', gap: '2.25rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            {[{ v: '1.2M', l: 'trees planted' }, { v: '162k', l: 'members worldwide' }, { v: '4.9★', l: 'from 21,000 reviews' }].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: SERIF, fontSize: '1.6rem', fontWeight: 600, color: '#fdfcf8' }}>{s.v}</div>
                <div style={{ fontSize: '13px', color: 'rgba(250,248,243,0.7)' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission Statement Band ── */}
      <section style={{ padding: '5.5rem 1.5rem', background: CREAM }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span style={{ display: 'inline-block', background: SAGE, color: FOREST, borderRadius: '9999px', padding: '6px 18px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.25rem' }}>Our mission</span>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 1.25rem' }}>
              We believe the most sustainable product is the one you never throw away
            </h2>
            <p style={{ color: MUTED, fontSize: '1.0625rem', lineHeight: 1.8, margin: 0 }}>
              Since 2017 we have made exactly 23 products — and discontinued 6 that did not meet our repairability bar. Slow catalogue, fast impact. That is the whole strategy.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
            {missionPillars.map(p => (
              <div key={p.title} style={{ background: '#fffdf8', border: `1px solid ${BORDER}`, borderRadius: '24px', padding: '2.25rem 2rem' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: SAGE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '1.25rem' }}>{p.icon}</div>
                <h3 style={{ fontFamily: SERIF, fontSize: '1.25rem', fontWeight: 600, margin: '0 0 0.7rem', letterSpacing: '-0.01em' }}>{p.title}</h3>
                <p style={{ fontSize: '14.5px', color: MUTED, lineHeight: 1.75, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Cards + Filter Pills ── */}
      <section style={{ padding: '5.5rem 1.5rem', background: '#f3f0e7', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <span style={{ display: 'inline-block', background: '#fffdf8', border: `1px solid ${BORDER}`, color: FOREST, borderRadius: '9999px', padding: '6px 18px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>The collection</span>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Reusables built for decades</h2>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {productCategories.map(cat => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{ borderRadius: '9999px', padding: '9px 20px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', border: active ? `1.5px solid ${FOREST}` : `1.5px solid ${BORDER}`, background: active ? FOREST : '#fffdf8', color: active ? '#fdfcf8' : MUTED, transition: 'all 0.15s' }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.5rem' }}>
            {visibleProducts.map(p => (
              <div key={p.name} style={{ background: '#fffdf8', border: `1px solid ${BORDER}`, borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '230px' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {p.badge && (
                    <span style={{ position: 'absolute', top: '14px', left: '14px', background: p.badge === 'New' ? '#b45309' : FOREST, color: '#fdfcf8', borderRadius: '9999px', padding: '5px 14px', fontSize: '11.5px', fontWeight: 700 }}>{p.badge}</span>
                  )}
                </div>
                <div style={{ padding: '1.5rem 1.5rem 1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontFamily: SERIF, fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>{p.name}</h3>
                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: FOREST }}>{p.price}</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#8a9a8b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>{p.category}</span>
                  <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, margin: '0 0 1.25rem', flex: 1 }}>{p.desc}</p>
                  <a href="#" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', border: `1.5px solid ${FOREST}`, color: FOREST, borderRadius: '9999px', padding: '10px 20px', fontSize: '13.5px', fontWeight: 700, textDecoration: 'none' }}>
                    Add to basket 🌿
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '13.5px', color: '#8a9a8b', marginTop: '2rem' }}>
            Every order plants one tree and ships plastic-free in compostable packaging.
          </p>
        </div>
      </section>

      {/* ── Impact Metrics Counters ── */}
      <section style={{ padding: '5.5rem 1.5rem', background: FOREST_DARK, color: '#fdfcf8' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ display: 'inline-block', background: 'rgba(250,248,243,0.1)', border: '1px solid rgba(250,248,243,0.25)', color: '#bbe3c4', borderRadius: '9999px', padding: '6px 18px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.25rem' }}>Impact, audited</span>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 1rem' }}>Numbers we publish whether they flatter us or not</h2>
            <p style={{ color: 'rgba(250,248,243,0.7)', fontSize: '1.0625rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75 }}>
              Independently verified every quarter and published in full — methodology, mistakes, and all — in our open impact ledger.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {impactMetrics.map(m => (
              <div key={m.label} style={{ background: 'rgba(250,248,243,0.06)', border: '1px solid rgba(250,248,243,0.14)', borderRadius: '24px', padding: '2rem 1.75rem' }}>
                <div style={{ fontFamily: SERIF, fontSize: '2.6rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#a7d8b3', lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, margin: '0.75rem 0 0.6rem' }}>{m.label}</div>
                <p style={{ fontSize: '13.5px', color: 'rgba(250,248,243,0.65)', lineHeight: 1.7, margin: 0 }}>{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sustainability Timeline ── */}
      <section style={{ padding: '5.5rem 1.5rem', background: CREAM }}>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ display: 'inline-block', background: SAGE, color: FOREST, borderRadius: '9999px', padding: '6px 18px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.25rem' }}>The journey</span>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Nine years of stubborn progress</h2>
          </div>
          <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
            <div style={{ position: 'absolute', left: '11px', top: '8px', bottom: '8px', width: '2px', background: BORDER }} />
            {timeline.map((t, i) => (
              <div key={t.year} style={{ position: 'relative', paddingBottom: i === timeline.length - 1 ? 0 : '2.5rem' }}>
                <div style={{ position: 'absolute', left: '-2.5rem', top: '4px', width: '24px', height: '24px', borderRadius: '50%', background: i === timeline.length - 1 ? FOREST : SAGE, border: `2px solid ${i === timeline.length - 1 ? FOREST : '#cdddc4'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                  {i === timeline.length - 1 ? '🌿' : ''}
                </div>
                <span style={{ display: 'inline-block', background: '#fffdf8', border: `1px solid ${BORDER}`, borderRadius: '9999px', padding: '4px 14px', fontSize: '12.5px', fontWeight: 700, color: FOREST, marginBottom: '0.6rem' }}>{t.year}</span>
                <h3 style={{ fontFamily: SERIF, fontSize: '1.25rem', fontWeight: 600, margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>{t.title}</h3>
                <p style={{ fontSize: '14.5px', color: MUTED, lineHeight: 1.75, margin: 0, maxWidth: '620px' }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications Strip ── */}
      <section style={{ padding: '3.5rem 1.5rem', background: SAGE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, color: FOREST, textTransform: 'uppercase', letterSpacing: '0.14em', margin: '0 0 2rem' }}>
            Held to account by the certifications that matter
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {certifications.map(c => (
              <div key={c.name} style={{ background: '#fffdf8', border: `1px solid #cdddc4`, borderRadius: '9999px', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: FOREST, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: INK }}>{c.name}</div>
                  <div style={{ fontSize: '11.5px', color: MUTED }}>{c.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog Teasers ── */}
      <section style={{ padding: '5.5rem 1.5rem', background: CREAM }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.75rem' }}>
            <div>
              <span style={{ display: 'inline-block', background: SAGE, color: FOREST, borderRadius: '9999px', padding: '6px 18px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>From the field</span>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Stories from the ground up</h2>
            </div>
            <a href="#" style={{ fontSize: '14.5px', fontWeight: 700, color: FOREST, textDecoration: 'none' }}>Read the journal →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {blogPosts.map(post => (
              <article key={post.title} style={{ background: '#fffdf8', border: `1px solid ${BORDER}`, borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img src={post.img} alt={post.title} style={{ width: '100%', height: '190px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem 1.5rem 1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.85rem' }}>
                    <span style={{ background: SAGE, color: FOREST, borderRadius: '9999px', padding: '4px 12px', fontSize: '11.5px', fontWeight: 700 }}>{post.tag}</span>
                    <span style={{ fontSize: '12.5px', color: '#8a9a8b' }}>{post.date}</span>
                  </div>
                  <h3 style={{ fontFamily: SERIF, fontSize: '1.2rem', fontWeight: 600, lineHeight: 1.35, margin: '0 0 0.7rem', letterSpacing: '-0.01em' }}>{post.title}</h3>
                  <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, margin: '0 0 1.25rem', flex: 1 }}>{post.excerpt}</p>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: INK }}>By {post.author}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section style={{ padding: '5.5rem 1.5rem', background: CREAM }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', padding: '4.25rem 2.5rem', textAlign: 'center' }}>
            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80" alt="Hands planting a young seedling" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,42,28,0.78)' }} />
            <div style={{ position: 'relative', maxWidth: '560px', margin: '0 auto' }}>
              <div style={{ fontSize: '32px', marginBottom: '1rem' }}>🌱</div>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600, letterSpacing: '-0.02em', color: '#fdfcf8', margin: '0 0 1rem' }}>
                The Undergrowth — our monthly letter
              </h2>
              <p style={{ color: 'rgba(250,248,243,0.8)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 2rem' }}>
                One email a month: what we planted, what broke, what we fixed, and one genuinely useful low-waste habit. Read by 96,000 people. Unsubscribe anytime, no guilt.
              </p>
              {subscribed ? (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(167,216,179,0.18)', border: '1px solid rgba(167,216,179,0.5)', borderRadius: '9999px', padding: '14px 28px', color: '#cdebd5', fontSize: '15px', fontWeight: 600 }}>
                  🌿 You are in! Your welcome tree gets planted this Friday.
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <input
                    type="email"
                    placeholder="you@earth.com"
                    style={{ borderRadius: '9999px', border: '1px solid rgba(250,248,243,0.4)', background: 'rgba(250,248,243,0.12)', color: '#fdfcf8', padding: '13px 22px', fontSize: '14.5px', fontFamily: 'inherit', width: 'min(300px, 100%)', outline: 'none' }}
                  />
                  <button
                    onClick={() => setSubscribed(true)}
                    style={{ background: '#fdfcf8', color: FOREST_DARK, borderRadius: '9999px', padding: '13px 28px', fontSize: '14.5px', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    Join + plant a tree
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, background: '#f3f0e7', padding: '3.75rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '270px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: FOREST, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>🌿</div>
                <span style={{ fontSize: '19px', fontWeight: 700, fontFamily: SERIF, color: FOREST_DARK }}>Verde</span>
              </div>
              <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.75, margin: '0 0 1.25rem' }}>
                Everyday reusables from regenerative materials. Carbon negative, B Corp certified, and accountable to the people and places that make our products.
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: SAGE, borderRadius: '9999px', padding: '7px 16px', fontSize: '12.5px', fontWeight: 700, color: FOREST }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: FOREST }} />
                Tree counter: 1,204,318 and growing
              </div>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8a9a8b', margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: '14px', color: MUTED, textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '13px', color: '#8a9a8b', margin: 0 }}>© 2026 Verde Goods B.V. — printed on 100% recycled pixels.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Instagram', 'Pinterest', 'YouTube'].map(s => (
                <a key={s} href="#" style={{ fontSize: '13px', color: '#8a9a8b', textDecoration: 'none' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
