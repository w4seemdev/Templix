/* ============================================================
   VERDE - Eco & sustainability brand template
   Warm cream · deep forest green · soft sage · serif display
   Self-contained, fully responsive, no external assets.
   ============================================================ */

import { useState, useEffect } from 'react';

const CREAM = '#faf8f3';
const FOREST = '#166534';
const FOREST_DARK = '#14532d';
const SAGE = '#e8efe3';
const INK = '#1c2a21';
const MUTED = '#5f6f60';
const BORDER = '#e4ddcf';
const SERIF = "Georgia, 'Times New Roman', serif";

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

const navLinks = ['Mission', 'Products', 'Impact', 'Contact'];

const missionPillars = [
  { icon: 'leaf', title: 'Regenerative by design', desc: 'Every Verde product is made from materials that give back - organic cotton from regenerative farms, fast-regrowing bamboo, and ocean-bound plastic intercepted before it reaches the sea.' },
  { icon: 'loop', title: 'Circular, not disposable', desc: 'We design for the second and third life. Send any worn-out Verde product back and we will repair it, remake it, or compost it - and plant a tree for your trouble.' },
  { icon: 'hands', title: 'People before margins', desc: 'Our 14 partner workshops across Portugal, Kenya, and Vietnam are audited twice a year, pay 2.3× the local living wage, and co-own 10% of the company.' },
];

const productCategories = ['All', 'Kitchen', 'Bath & Body', 'On the Go'];

const products = [
  { name: 'Evergreen Bottle', category: 'On the Go', price: '$34', desc: 'Insulated steel bottle that keeps water cold 24 hours. Replaces ~1,460 single-use plastics over its life.', badge: 'Bestseller', c1: '#166534', c2: '#4ade80' },
  { name: 'Grove Lunch Set', category: 'Kitchen', price: '$48', desc: 'Three nesting containers pressed from reclaimed bamboo fibre. Dishwasher-safe and fully compostable.', badge: null, c1: '#3f4a22', c2: '#a3b18a' },
  { name: 'Meadow Soap Trio', category: 'Bath & Body', price: '$22', desc: 'Cold-pressed olive-oil soaps scented with lavender, cedar, and sage. Wrapped in plantable seed paper.', badge: 'New', c1: '#5b4636', c2: '#c8a97a' },
  { name: 'Canopy Tote', category: 'On the Go', price: '$29', desc: 'Carry-everything tote woven from 12 recycled bottles and regenerative cotton. Holds 30 kg easily.', badge: null, c1: '#1f3d2e', c2: '#6b8f71' },
  { name: 'Hearth Beeswax Wraps', category: 'Kitchen', price: '$18', desc: 'A reusable replacement for cling film, made with organic cotton and Alpine beeswax. Lasts a year.', badge: null, c1: '#5c4a1f', c2: '#d4b95e' },
  { name: 'Riverbed Bath Kit', category: 'Bath & Body', price: '$39', desc: 'Shampoo, conditioner, and body bars that outlast six plastic bottles each, in a recycled tin.', badge: 'Bestseller', c1: '#22403f', c2: '#6b9c9a' },
];

const impactMetrics = [
  { value: '1.2M', label: 'Trees planted', detail: 'Across 9 reforestation sites, verified by satellite every quarter.' },
  { value: '48,200t', label: 'CO₂ offset', detail: 'The equivalent of 10,400 cars off the road for a full year.' },
  { value: '915t', label: 'Plastic diverted', detail: 'Kept out of oceans and landfills by switching to reusables.' },
  { value: '162k', label: 'Verde members', detail: 'Households in 41 countries tracking their footprint with us.' },
];

const timeline = [
  { year: '2017', title: 'A bottle and a promise', desc: 'Verde starts at a Lisbon farmers market with one product and a promise to plant a tree for every sale.' },
  { year: '2021', title: 'B Corp, first try', desc: 'We certify as a B Corporation with a score of 124.3 - the top 5% of certified consumer-goods companies.' },
  { year: '2025', title: 'Carbon negative', desc: 'Verde removes 2.4× more carbon than the entire business emits - every courier mile and office kettle included.' },
  { year: '2026', title: 'The regenerative decade', desc: 'We commit 5% of all revenue to converting 10,000 hectares of farmland to regenerative agriculture by 2030.' },
];

const certifications = [
  { name: 'B Corporation', tag: 'Score 124.3' },
  { name: 'Climate Neutral', tag: 'Certified 2025' },
  { name: '1% for the Planet', tag: 'Member since 2018' },
  { name: 'FSC Certified', tag: 'Paper & bamboo' },
  { name: 'GOTS Organic', tag: 'All cotton' },
  { name: 'Fair Trade', tag: '14 workshops' },
];

const footerCols = [
  { title: 'Shop', links: ['Kitchen', 'Bath & Body', 'On the Go', 'Gift sets'] },
  { title: 'Mission', links: ['Our story', 'Impact report', 'Certifications', 'Tree tracker'] },
  { title: 'Support', links: ['Contact', 'Shipping', 'Returns & repairs', 'FAQ'] },
];

function PillarIcon({ name }: { name: string }) {
  const s = { fill: 'none', stroke: FOREST, strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...s}>
      {name === 'leaf' && <><path d="M11 20A7 7 0 0 1 4 13c0-4 3-8 9-9 1 5-1 12-2 16z" /><path d="M11 20c0-4 2-9 6-12" /></>}
      {name === 'loop' && <><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" /></>}
      {name === 'hands' && <><path d="M8 13l2-2 2 2 2-2 2 2" /><path d="M3 10l4-4 5 5 5-5 4 4-9 9z" /></>}
    </svg>
  );
}

function Art({ c1, c2, ratio }: { c1: string; c2: string; ratio: string }) {
  return (
    <div style={{ aspectRatio: ratio, background: `linear-gradient(145deg, ${c1}, ${c2})`, position: 'relative', overflow: 'hidden' }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.22 }}>
        <path d="M50 90 C50 60 35 45 25 40 C40 45 50 60 50 78 C50 55 62 40 78 34 C60 44 50 62 50 90z" fill="none" stroke="#fff" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

export default function VerdeEcoPreview() {
  const m = useIsMobile();
  const [cat, setCat] = useState('All');
  const [subscribed, setSubscribed] = useState(false);
  const [open, setOpen] = useState(false);
  const pad = m ? '0 1.25rem' : '0 1.5rem';
  const visible = cat === 'All' ? products : products.filter(p => p.category === cat);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: CREAM, color: INK, minHeight: '100vh' }}>
      {/* Nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,248,243,0.9)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad, height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: FOREST, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fdfcf8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-4 3-8 9-9 1 5-1 12-2 16z" /><path d="M11 20c0-4 2-9 6-12" /></svg>
            </div>
            <span style={{ fontSize: '21px', fontWeight: 700, fontFamily: SERIF, color: FOREST_DARK }}>Verde</span>
          </div>
          {!m && <nav style={{ display: 'flex', gap: '1.6rem' }}>{navLinks.map(l => <a key={l} href={`#${l}`} style={{ fontSize: '14px', fontWeight: 500, color: MUTED, textDecoration: 'none' }}>{l}</a>)}</nav>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <a href="#Products" style={{ background: FOREST, color: '#fdfcf8', borderRadius: '9999px', padding: m ? '9px 16px' : '10px 22px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 6px 18px rgba(22,101,52,0.25)' }}>Shop</a>
            {m && (
              <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} style={{ background: 'none', border: `1px solid ${BORDER}`, borderRadius: '9999px', padding: '8px 10px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
                {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: FOREST_DARK, display: 'block' }} />)}
              </button>
            )}
          </div>
        </div>
        {m && open && (
          <nav style={{ display: 'grid', padding: '0.25rem 1.25rem 0.75rem', borderTop: `1px solid ${BORDER}` }}>
            {navLinks.map(l => <a key={l} href={`#${l}`} onClick={() => setOpen(false)} style={{ padding: '12px 0', fontSize: '15px', fontWeight: 500, color: INK, textDecoration: 'none', borderBottom: `1px solid ${BORDER}` }}>{l}</a>)}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(120deg, ${FOREST_DARK} 0%, ${FOREST} 50%, #3f6b47 100%)` }} />
        <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.14 }}>
          <path d="M200 300 C200 200 140 150 90 130 C160 150 200 210 200 280 C200 180 260 140 330 118 C240 150 200 210 200 300z" fill="none" stroke="#fff" strokeWidth="1.5" />
        </svg>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: m ? '3.5rem 1.25rem' : '5.5rem 1.5rem', position: 'relative' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(250,248,243,0.14)', border: '1px solid rgba(250,248,243,0.35)', borderRadius: '9999px', padding: '7px 18px', fontSize: '13px', fontWeight: 600, color: '#e9f3e4', marginBottom: '1.5rem' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#a7d8b3' }} />Carbon negative since 2025 - and counting
          </span>
          <h1 style={{ fontFamily: SERIF, fontSize: m ? '2.5rem' : 'clamp(2.6rem, 5.5vw, 4.2rem)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.08, color: '#fdfcf8', maxWidth: '640px', margin: 0 }}>
            Everyday goods that leave the Earth better than they found it
          </h1>
          <p style={{ fontSize: m ? '1rem' : '1.125rem', color: 'rgba(250,248,243,0.85)', lineHeight: 1.75, maxWidth: '520px', margin: '1.5rem 0 0' }}>
            Verde makes reusable kitchen, bath, and travel essentials from regenerative materials - and plants a tree for every order. 1.2 million planted so far. Yours is next.
          </p>
          <div style={{ display: 'flex', gap: '0.875rem', marginTop: '2.25rem', flexWrap: 'wrap' }}>
            <a href="#Products" style={{ background: '#fdfcf8', color: FOREST_DARK, borderRadius: '9999px', padding: '14px 32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>Shop the collection</a>
            <a href="#Impact" style={{ border: '1.5px solid rgba(250,248,243,0.55)', color: '#fdfcf8', borderRadius: '9999px', padding: '14px 32px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>Read impact report</a>
          </div>
          <div style={{ display: 'flex', gap: m ? '1.75rem' : '2.25rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            {[{ v: '1.2M', l: 'trees planted' }, { v: '162k', l: 'members worldwide' }, { v: '4.9★', l: 'from 21,000 reviews' }].map(s => (
              <div key={s.l}><div style={{ fontFamily: SERIF, fontSize: '1.6rem', fontWeight: 600, color: '#fdfcf8' }}>{s.v}</div><div style={{ fontSize: '13px', color: 'rgba(250,248,243,0.7)' }}>{s.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="Mission" style={{ padding: m ? '3.5rem 0' : '5.5rem 0', background: CREAM }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
            <span style={{ display: 'inline-block', background: SAGE, color: FOREST, borderRadius: '9999px', padding: '6px 18px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.25rem' }}>Our mission</span>
            <h2 style={{ fontFamily: SERIF, fontSize: m ? '1.8rem' : 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 1.25rem' }}>The most sustainable product is the one you never throw away</h2>
            <p style={{ color: MUTED, fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>Since 2017 we have made exactly 23 products - and discontinued 6 that did not meet our repairability bar. Slow catalogue, fast impact. That is the whole strategy.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {missionPillars.map(p => (
              <div key={p.title} style={{ background: '#fffdf8', border: `1px solid ${BORDER}`, borderRadius: '24px', padding: '2.25rem 2rem' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: SAGE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}><PillarIcon name={p.icon} /></div>
                <h3 style={{ fontFamily: SERIF, fontSize: '1.25rem', fontWeight: 600, margin: '0 0 0.7rem' }}>{p.title}</h3>
                <p style={{ fontSize: '14.5px', color: MUTED, lineHeight: 1.75, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="Products" style={{ padding: m ? '3.5rem 0' : '5.5rem 0', background: '#f3f0e7', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <span style={{ display: 'inline-block', background: '#fffdf8', border: `1px solid ${BORDER}`, color: FOREST, borderRadius: '9999px', padding: '6px 18px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>The collection</span>
              <h2 style={{ fontFamily: SERIF, fontSize: m ? '1.8rem' : 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Reusables built for decades</h2>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {productCategories.map(c => {
                const active = cat === c;
                return <button key={c} onClick={() => setCat(c)} style={{ borderRadius: '9999px', padding: '9px 18px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', border: active ? `1.5px solid ${FOREST}` : `1.5px solid ${BORDER}`, background: active ? FOREST : '#fffdf8', color: active ? '#fdfcf8' : MUTED }}>{c}</button>;
              })}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.5rem' }}>
            {visible.map(p => (
              <div key={p.name} style={{ background: '#fffdf8', border: `1px solid ${BORDER}`, borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative' }}>
                  <Art c1={p.c1} c2={p.c2} ratio="4 / 3" />
                  {p.badge && <span style={{ position: 'absolute', top: '14px', left: '14px', background: p.badge === 'New' ? '#b45309' : FOREST, color: '#fdfcf8', borderRadius: '9999px', padding: '5px 14px', fontSize: '11.5px', fontWeight: 700 }}>{p.badge}</span>}
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.3rem' }}>
                    <h3 style={{ fontFamily: SERIF, fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>{p.name}</h3>
                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: FOREST }}>{p.price}</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#8a9a8b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>{p.category}</span>
                  <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, margin: '0 0 1.25rem', flex: 1 }}>{p.desc}</p>
                  <a href="#" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', border: `1.5px solid ${FOREST}`, color: FOREST, borderRadius: '9999px', padding: '10px 20px', fontSize: '13.5px', fontWeight: 700, textDecoration: 'none' }}>Add to basket</a>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '13.5px', color: '#8a9a8b', marginTop: '2rem' }}>Every order plants one tree and ships plastic-free in compostable packaging.</p>
        </div>
      </section>

      {/* Impact */}
      <section id="Impact" style={{ padding: m ? '3.5rem 0' : '5.5rem 0', background: FOREST_DARK, color: '#fdfcf8' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ display: 'inline-block', background: 'rgba(250,248,243,0.1)', border: '1px solid rgba(250,248,243,0.25)', color: '#bbe3c4', borderRadius: '9999px', padding: '6px 18px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.25rem' }}>Impact, audited</span>
            <h2 style={{ fontFamily: SERIF, fontSize: m ? '1.8rem' : 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 1rem' }}>Numbers we publish whether they flatter us or not</h2>
            <p style={{ color: 'rgba(250,248,243,0.7)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75 }}>Independently verified every quarter and published in full - methodology, mistakes, and all.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4, 1fr)', gap: m ? '1rem' : '1.25rem' }}>
            {impactMetrics.map(mm => (
              <div key={mm.label} style={{ background: 'rgba(250,248,243,0.06)', border: '1px solid rgba(250,248,243,0.14)', borderRadius: '24px', padding: m ? '1.5rem 1.25rem' : '2rem 1.75rem' }}>
                <div style={{ fontFamily: SERIF, fontSize: m ? '2rem' : '2.6rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#a7d8b3', lineHeight: 1 }}>{mm.value}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, margin: '0.75rem 0 0.6rem' }}>{mm.label}</div>
                <p style={{ fontSize: '13px', color: 'rgba(250,248,243,0.65)', lineHeight: 1.7, margin: 0 }}>{mm.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: m ? '3.5rem 0' : '5.5rem 0', background: CREAM }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ display: 'inline-block', background: SAGE, color: FOREST, borderRadius: '9999px', padding: '6px 18px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.25rem' }}>The journey</span>
            <h2 style={{ fontFamily: SERIF, fontSize: m ? '1.8rem' : 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Nine years of stubborn progress</h2>
          </div>
          <div style={{ position: 'relative', paddingLeft: '2.25rem' }}>
            <div style={{ position: 'absolute', left: '11px', top: '8px', bottom: '8px', width: '2px', background: BORDER }} />
            {timeline.map((t, i) => (
              <div key={t.year} style={{ position: 'relative', paddingBottom: i === timeline.length - 1 ? 0 : '2.25rem' }}>
                <div style={{ position: 'absolute', left: '-2.25rem', top: '4px', width: '24px', height: '24px', borderRadius: '50%', background: i === timeline.length - 1 ? FOREST : SAGE, border: `2px solid ${i === timeline.length - 1 ? FOREST : '#cdddc4'}` }} />
                <span style={{ display: 'inline-block', background: '#fffdf8', border: `1px solid ${BORDER}`, borderRadius: '9999px', padding: '4px 14px', fontSize: '12.5px', fontWeight: 700, color: FOREST, marginBottom: '0.6rem' }}>{t.year}</span>
                <h3 style={{ fontFamily: SERIF, fontSize: '1.25rem', fontWeight: 600, margin: '0 0 0.5rem' }}>{t.title}</h3>
                <p style={{ fontSize: '14.5px', color: MUTED, lineHeight: 1.75, margin: 0 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section style={{ padding: m ? '3rem 0' : '3.5rem 0', background: SAGE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, color: FOREST, textTransform: 'uppercase', letterSpacing: '0.14em', margin: '0 0 2rem' }}>Held to account by the certifications that matter</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {certifications.map(c => (
              <div key={c.name} style={{ background: '#fffdf8', border: '1px solid #cdddc4', borderRadius: '9999px', padding: '12px 22px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: FOREST, flexShrink: 0 }} />
                <div><div style={{ fontSize: '14px', fontWeight: 700, color: INK }}>{c.name}</div><div style={{ fontSize: '11.5px', color: MUTED }}>{c.tag}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="Contact" style={{ padding: m ? '3.5rem 0' : '5.5rem 0', background: CREAM }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', padding: m ? '3rem 1.5rem' : '4.25rem 2.5rem', textAlign: 'center', background: `linear-gradient(135deg, ${FOREST_DARK}, ${FOREST})` }}>
            <div style={{ position: 'relative', maxWidth: '560px', margin: '0 auto' }}>
              <h2 style={{ fontFamily: SERIF, fontSize: m ? '1.8rem' : 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600, letterSpacing: '-0.02em', color: '#fdfcf8', margin: '0 0 1rem' }}>The Undergrowth - our monthly letter</h2>
              <p style={{ color: 'rgba(250,248,243,0.8)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 2rem' }}>One email a month: what we planted, what broke, what we fixed, and one genuinely useful low-waste habit. Read by 96,000 people.</p>
              {subscribed ? (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(167,216,179,0.18)', border: '1px solid rgba(167,216,179,0.5)', borderRadius: '9999px', padding: '14px 28px', color: '#cdebd5', fontSize: '15px', fontWeight: 600 }}>You are in! Your welcome tree gets planted this Friday.</div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <input type="email" placeholder="you@earth.com" style={{ borderRadius: '9999px', border: '1px solid rgba(250,248,243,0.4)', background: 'rgba(250,248,243,0.12)', color: '#fdfcf8', padding: '13px 22px', fontSize: '14.5px', fontFamily: 'inherit', width: 'min(300px, 100%)', outline: 'none' }} />
                  <button onClick={() => setSubscribed(true)} style={{ background: '#fdfcf8', color: FOREST_DARK, borderRadius: '9999px', padding: '13px 28px', fontSize: '14.5px', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Join + plant a tree</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, background: '#f3f0e7', padding: m ? '3rem 0 2rem' : '3.75rem 0 2rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: pad }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: m ? '2rem' : '3rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <div style={{ maxWidth: '270px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: FOREST, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fdfcf8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-4 3-8 9-9 1 5-1 12-2 16z" /></svg>
                </div>
                <span style={{ fontSize: '19px', fontWeight: 700, fontFamily: SERIF, color: FOREST_DARK }}>Verde</span>
              </div>
              <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.75, margin: '0 0 1.25rem' }}>Everyday reusables from regenerative materials. Carbon negative, B Corp certified, and accountable to the people and places that make our products.</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: SAGE, borderRadius: '9999px', padding: '7px 16px', fontSize: '12.5px', fontWeight: 700, color: FOREST }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: FOREST }} />Tree counter: 1,204,318 and growing
              </div>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8a9a8b', margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => <li key={l}><a href="#" style={{ fontSize: '14px', color: MUTED, textDecoration: 'none' }}>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '13px', color: '#8a9a8b', margin: 0 }}>© 2026 Verde Goods B.V. - printed on 100% recycled pixels.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>{['Instagram', 'Pinterest', 'YouTube'].map(s => <a key={s} href="#" style={{ fontSize: '13px', color: '#8a9a8b', textDecoration: 'none' }}>{s}</a>)}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
