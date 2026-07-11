/* ============================================================
   LUMEN — Beauty & Wellness Spa Template
   Soft sage & blush on warm stone. Fully responsive.
   ============================================================ */

import { useState, useEffect } from 'react';

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

const C = {
  bg: '#f3f0ea',
  surface: '#ffffff',
  ink: '#2c322b',
  muted: '#6a7064',
  faint: '#9aa091',
  line: '#e4e0d5',
  sage: '#7f9070',
  blush: '#c98d86',
};
const serif = "'Playfair Display', Georgia, serif";
const sans = "'Inter', system-ui, sans-serif";
const container: React.CSSProperties = { maxWidth: '1140px', margin: '0 auto', width: '100%' };

const cats = ['Facials', 'Massage', 'Body', 'Nails'];
const services: Record<string, { name: string; time: string; price: number; desc: string }[]> = {
  Facials: [
    { name: 'Signature Glow Facial', time: '60 min', price: 120, desc: 'Deep cleanse, exfoliation and a brightening mask' },
    { name: 'Hydra-Renewal', time: '75 min', price: 155, desc: 'Resurfacing treatment for tired, dehydrated skin' },
    { name: 'Gua Sha Lift', time: '45 min', price: 95, desc: 'Sculpting facial massage with jade tools' },
  ],
  Massage: [
    { name: 'Deep Tissue', time: '60 min', price: 110, desc: 'Firm pressure to release chronic tension' },
    { name: 'Aromatherapy', time: '75 min', price: 130, desc: 'Warm oils and slow, restorative strokes' },
    { name: 'Hot Stone', time: '90 min', price: 165, desc: 'Heated basalt stones melt away deep knots' },
  ],
  Body: [
    { name: 'Sea Salt Scrub', time: '45 min', price: 90, desc: 'Full-body exfoliation and mineral hydration' },
    { name: 'Detox Wrap', time: '60 min', price: 125, desc: 'Marine mud wrap to soften and firm skin' },
    { name: 'Spa Day Ritual', time: '150 min', price: 280, desc: 'Facial, massage and scrub with lunch' },
  ],
  Nails: [
    { name: 'Classic Manicure', time: '40 min', price: 45, desc: 'Shape, cuticle care and polish of choice' },
    { name: 'Gel Pedicure', time: '55 min', price: 65, desc: 'Long-lasting gel with a soothing foot soak' },
    { name: 'Luxury Duo', time: '90 min', price: 110, desc: 'Full manicure and pedicure with paraffin' },
  ],
};

export default function BeautySpaPreview() {
  return (
    <div style={{ fontFamily: sans, background: C.bg, color: C.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Services />
      <Why />
      <Reviews />
      <Booking />
      <Footer />
    </div>
  );
}

function Leaf() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.sage} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-6 6-9 15-9 0 8-3 14-8 15z" /><path d="M11 20c0-5 2-8 6-11" /></svg>;
}

function Nav() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const links = ['Treatments', 'Why Lumen', 'Book'];
  const anchors = ['services', 'why', 'booking'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(243,240,234,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: '0 20px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none', color: C.ink }}><Leaf /><span style={{ fontFamily: serif, fontSize: '22px', fontWeight: 700, letterSpacing: '0.06em' }}>LUMEN</span></a>
        {!m && <nav style={{ display: 'flex', gap: '30px' }}>{links.map((l, i) => <a key={l} href={`#${anchors[i]}`} style={{ fontSize: '14px', color: C.muted, textDecoration: 'none', fontWeight: 500 }}>{l}</a>)}</nav>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {!m && <a href="#booking" style={{ background: C.sage, color: '#fff', borderRadius: '999px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Book now</a>}
          {m && <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: 'none', color: C.ink, cursor: 'pointer', padding: 0, display: 'flex' }}><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">{open ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}</svg></button>}
        </div>
      </div>
      {m && open && <nav style={{ borderTop: `1px solid ${C.line}`, padding: '8px 20px 16px', display: 'flex', flexDirection: 'column' }}>{links.map((l, i) => <a key={l} href={`#${anchors[i]}`} onClick={() => setOpen(false)} style={{ fontSize: '15px', color: C.muted, textDecoration: 'none', padding: '11px 0', borderBottom: `1px solid ${C.line}` }}>{l}</a>)}</nav>}
    </header>
  );
}

function Hero() {
  const m = useIsMobile();
  return (
    <section id="top" style={{ ...container, padding: m ? '44px 20px 48px' : '80px 20px 88px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1.05fr 0.95fr', gap: m ? '32px' : '52px', alignItems: 'center' }}>
      <div>
        <span style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.blush, fontWeight: 700 }}>Day spa · city retreat</span>
        <h1 style={{ fontFamily: serif, fontSize: m ? '2.7rem' : '4.4rem', fontWeight: 700, lineHeight: 1.05, margin: '16px 0 20px' }}>An hour that feels like a holiday.</h1>
        <p style={{ fontSize: m ? '1rem' : '1.125rem', color: C.muted, lineHeight: 1.7, maxWidth: '430px', margin: '0 0 30px' }}>Skin, body and nail treatments delivered by expert therapists in a calm, plant-filled sanctuary in the middle of the city.</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="#booking" style={{ background: C.sage, color: '#fff', borderRadius: '999px', padding: '14px 30px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Book a treatment</a>
          <a href="#services" style={{ border: `1px solid ${C.blush}`, color: C.blush, borderRadius: '999px', padding: '14px 30px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>View the menu</a>
        </div>
      </div>
      <div style={{ position: 'relative', aspectRatio: m ? '4/3' : '4/5', borderRadius: '20px', overflow: 'hidden', background: 'linear-gradient(155deg,#a7b596,#5a6a4a)' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '26px' }}>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Guest favourite</span>
          <span style={{ fontFamily: serif, color: '#fff', fontSize: '1.6rem', fontWeight: 700, marginTop: '6px' }}>Signature Glow Facial</span>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const m = useIsMobile();
  const [tab, setTab] = useState('Facials');
  return (
    <section id="services" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontFamily: serif, fontSize: m ? '2.2rem' : '3rem', fontWeight: 700, margin: '0 0 8px' }}>Treatment menu</h2>
          <p style={{ color: C.muted, margin: 0 }}>All treatments include a warm welcome and herbal tea.</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setTab(c)} style={{ cursor: 'pointer', borderRadius: '999px', padding: '9px 20px', fontSize: '13px', fontWeight: 600, border: `1px solid ${tab === c ? C.sage : C.line}`, background: tab === c ? C.sage : 'transparent', color: tab === c ? '#fff' : C.muted }}>{c}</button>
          ))}
        </div>
        <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {services[tab].map((s) => (
            <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: C.bg, border: `1px solid ${C.line}`, borderRadius: '12px', padding: m ? '16px' : '20px 24px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: serif, fontSize: '1.2rem', fontWeight: 700, margin: '0 0 4px' }}>{s.name}</h3>
                <p style={{ fontSize: '13px', color: C.muted, margin: 0 }}>{s.desc} · {s.time}</p>
              </div>
              <span style={{ fontFamily: serif, fontSize: '1.3rem', fontWeight: 700, color: C.sage, whiteSpace: 'nowrap' }}>${s.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const m = useIsMobile();
  const items = [
    { t: 'Clean, kind products', d: 'Cruelty-free, plant-based ranges chosen for real results.', p: 'M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z M9 9h6' },
    { t: 'Expert therapists', d: 'Every treatment is delivered by a fully qualified specialist.', p: 'M20 6 9 17l-5-5' },
    { t: 'A true escape', d: 'Sound-proofed rooms, warm beds and not a screen in sight.', p: 'M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z' },
  ];
  return (
    <section id="why" style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
      <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, textAlign: 'center', margin: '0 0 44px' }}>Why guests come back</h2>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '26px' }}>
        {items.map((i) => (
          <div key={i.t} style={{ textAlign: 'center' }}>
            <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: 'rgba(127,144,112,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="24" height="24" fill="none" stroke={C.sage} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={i.p} /></svg>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 8px' }}>{i.t}</h3>
            <p style={{ fontSize: '14px', color: C.muted, lineHeight: 1.7, margin: '0 auto', maxWidth: '280px' }}>{i.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const m = useIsMobile();
  const data = [
    { text: 'I left feeling like a new person. The facial glow lasted a full two weeks.', a: 'Hannah B.' },
    { text: 'The hot stone massage is unreal. This is now my monthly non-negotiable.', a: 'Leo M.' },
    { text: 'Spotless, serene and genuinely skilled therapists. Worth every penny.', a: 'Dana K.' },
  ];
  return (
    <section style={{ background: C.sage, color: '#f4f6f1' }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
        <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, textAlign: 'center', margin: '0 0 36px' }}>Loved by our guests</h2>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '20px' }}>
          {data.map((r) => (
            <figure key={r.a} style={{ margin: 0, background: 'rgba(255,255,255,0.1)', borderRadius: '16px', padding: '28px' }}>
              <span style={{ display: 'inline-flex', gap: '2px', marginBottom: '12px' }}>{[1, 2, 3, 4, 5].map((s) => <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#f0d9a8" stroke="#f0d9a8"><path d="M12 2l3 6.5 7 .8-5.2 4.8L18.2 22 12 18.3 5.8 22 7.2 14.1 2 9.3l7-.8z" /></svg>)}</span>
              <blockquote style={{ fontFamily: serif, fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 16px' }}>"{r.text}"</blockquote>
              <figcaption style={{ fontSize: '13px', fontWeight: 600, opacity: 0.9 }}>{r.a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Booking() {
  const m = useIsMobile();
  const field: React.CSSProperties = { background: C.surface, border: `1px solid ${C.line}`, borderRadius: '10px', padding: '13px 14px', color: C.ink, fontSize: '14px', width: '100%' };
  return (
    <section id="booking" style={{ ...container, padding: m ? '52px 20px' : '88px 20px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '36px' : '56px', alignItems: 'center' }}>
      <div>
        <span style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.blush, fontWeight: 700 }}>Reservations</span>
        <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, lineHeight: 1.1, margin: '12px 0 18px' }}>Book your visit</h2>
        <p style={{ fontSize: '1rem', color: C.muted, lineHeight: 1.8, margin: '0 0 22px' }}>Choose a treatment and time that suits you. We'll confirm within the hour. Gift vouchers available for every service.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: C.muted }}>
          <span><b style={{ color: C.ink }}>Open</b> · Mon–Sat, 9am–8pm</span>
          <span><b style={{ color: C.ink }}>Find us</b> · 3 Willow Court, Manchester</span>
          <span><b style={{ color: C.ink }}>Call</b> · +44 161 496 0170</span>
        </div>
      </div>
      <form onSubmit={(e) => e.preventDefault()} style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: '16px', padding: m ? '22px' : '30px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <input placeholder="Full name" style={field} />
        <select style={field} defaultValue=""><option value="" disabled>Select a treatment</option>{Object.values(services).flat().map((s) => <option key={s.name}>{s.name} · ${s.price}</option>)}</select>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}><input type="date" style={field} /><input type="time" style={field} /></div>
        <button type="submit" style={{ background: C.sage, color: '#fff', border: 'none', borderRadius: '999px', padding: '14px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Request appointment</button>
      </form>
    </section>
  );
}

function Footer() {
  const m = useIsMobile();
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, padding: '44px 20px 28px' }}>
      <div style={{ ...container, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px', alignItems: 'center', textAlign: m ? 'center' : 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px', justifyContent: m ? 'center' : 'flex-start', width: m ? '100%' : 'auto' }}><Leaf /><span style={{ fontFamily: serif, fontSize: '20px', fontWeight: 700, letterSpacing: '0.06em' }}>LUMEN</span></div>
        <span style={{ fontSize: '14px', color: C.muted }}>3 Willow Court, Manchester · Open Mon–Sat</span>
        <span style={{ fontSize: '13px', color: C.faint }}>© {new Date().getFullYear()} Lumen Spa</span>
      </div>
    </footer>
  );
}
