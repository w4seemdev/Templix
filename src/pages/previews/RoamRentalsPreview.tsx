/* ============================================================
   ROAM - Vacation Rental Marketplace Template
   Light ocean-teal with warm sand accents. Fully responsive.
   ============================================================ */

import { useState, useEffect } from 'react';

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

const C = {
  bg: '#f6f8f7',
  surface: '#ffffff',
  ink: '#12211f',
  muted: '#5e716e',
  faint: '#93a5a1',
  line: '#e2e9e7',
  teal: '#0e8f82',
  sand: '#e8a06a',
};
const sans = "'Inter', system-ui, sans-serif";
const container: React.CSSProperties = { maxWidth: '1200px', margin: '0 auto', width: '100%' };

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '13px', color: C.ink, fontWeight: 600 }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill={C.sand} stroke={C.sand} strokeWidth="1"><path d="M12 2l3 6.5 7 .8-5.2 4.8L18.2 22 12 18.3 5.8 22 7.2 14.1 2 9.3l7-.8z" /></svg>
      {rating.toFixed(2)}
    </span>
  );
}

const filters = ['All stays', 'Beachfront', 'Cabins', 'City lofts', 'Countryside'];
const stays = [
  { name: 'Cliffside Glass House', place: 'Big Sur, California', type: 'Beachfront', price: 320, rating: 4.97, reviews: 214, guests: 4, from: '#1f7a76', to: '#0c3b3a' },
  { name: 'Pinewood A-Frame', place: 'Whistler, Canada', type: 'Cabins', price: 185, rating: 4.92, reviews: 168, guests: 5, from: '#3a5f3f', to: '#16251a' },
  { name: 'Old Town Loft', place: 'Lisbon, Portugal', type: 'City lofts', price: 140, rating: 4.88, reviews: 302, guests: 3, from: '#c07a4a', to: '#5a3117' },
  { name: 'Olive Grove Villa', place: 'Puglia, Italy', type: 'Countryside', price: 260, rating: 4.95, reviews: 121, guests: 6, from: '#7d8a4a', to: '#3a411f' },
  { name: 'Dune Beach House', place: 'Tulum, Mexico', type: 'Beachfront', price: 295, rating: 4.9, reviews: 187, guests: 4, from: '#2497a8', to: '#0d4550' },
  { name: 'Fjord Cabin', place: 'Lofoten, Norway', type: 'Cabins', price: 210, rating: 4.99, reviews: 96, guests: 4, from: '#456a8f', to: '#1a2c3e' },
];

export default function RoamRentalsPreview() {
  return (
    <div style={{ fontFamily: sans, background: C.bg, color: C.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Stays />
      <How />
      <HostCta />
      <Reviews />
      <Footer />
    </div>
  );
}

function Logo() {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" /></svg>
      <span style={{ fontSize: '21px', fontWeight: 800, letterSpacing: '-0.03em' }}>Roam</span>
    </span>
  );
}

function Nav() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const links = ['Stays', 'How it works', 'Become a host'];
  const anchors = ['stays', 'how', 'host'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(246,248,247,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: '0 20px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ textDecoration: 'none', color: C.ink }}><Logo /></a>
        {!m && <nav style={{ display: 'flex', gap: '30px' }}>{links.map((l, i) => <a key={l} href={`#${anchors[i]}`} style={{ fontSize: '14px', color: C.muted, textDecoration: 'none', fontWeight: 500 }}>{l}</a>)}</nav>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {!m && <a href="#stays" style={{ background: C.teal, color: '#fff', borderRadius: '999px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Sign in</a>}
          {m && <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: 'none', color: C.ink, cursor: 'pointer', padding: 0, display: 'flex' }}><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">{open ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}</svg></button>}
        </div>
      </div>
      {m && open && <nav style={{ borderTop: `1px solid ${C.line}`, padding: '8px 20px 16px', display: 'flex', flexDirection: 'column' }}>{links.map((l, i) => <a key={l} href={`#${anchors[i]}`} onClick={() => setOpen(false)} style={{ fontSize: '15px', color: C.muted, textDecoration: 'none', padding: '11px 0', borderBottom: `1px solid ${C.line}` }}>{l}</a>)}</nav>}
    </header>
  );
}

function Hero() {
  const m = useIsMobile();
  const field: React.CSSProperties = { border: 'none', background: 'transparent', fontSize: '14px', color: C.ink, outline: 'none', width: '100%', padding: '4px 0' };
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(820px 420px at 80% -10%, rgba(14,143,130,0.16), transparent 60%)' }} />
      <div style={{ ...container, padding: m ? '52px 20px 44px' : '92px 20px 64px', position: 'relative', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', background: 'rgba(14,143,130,0.1)', color: C.teal, borderRadius: '999px', padding: '6px 14px', fontSize: '12px', fontWeight: 700, marginBottom: '20px' }}>28,000+ homes in 92 countries</span>
        <h1 style={{ fontSize: m ? '2.7rem' : '4.4rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '0 auto 18px', maxWidth: '740px' }}>Find a place you'll never want to leave.</h1>
        <p style={{ fontSize: m ? '1rem' : '1.15rem', color: C.muted, lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 30px' }}>Hand-picked homes from hosts we trust - from beach houses to mountain cabins, booked in a couple of taps.</p>
        <form onSubmit={(e) => e.preventDefault()} style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: m ? '16px' : '999px', boxShadow: '0 16px 44px rgba(18,33,31,0.1)', padding: m ? '14px' : '8px 8px 8px 24px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1.4fr 1fr 1fr auto', gap: m ? '10px' : '0', alignItems: 'center', maxWidth: '820px', margin: '0 auto', textAlign: 'left' }}>
          <label style={{ borderRight: m ? 'none' : `1px solid ${C.line}`, paddingRight: '16px' }}><div style={{ fontSize: '11px', fontWeight: 700, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Where</div><input placeholder="Anywhere" style={field} /></label>
          <label style={{ borderRight: m ? 'none' : `1px solid ${C.line}`, padding: m ? '0' : '0 16px' }}><div style={{ fontSize: '11px', fontWeight: 700, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.05em' }}>When</div><input placeholder="Any week" style={field} /></label>
          <label style={{ padding: m ? '0' : '0 16px' }}><div style={{ fontSize: '11px', fontWeight: 700, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Guests</div><input placeholder="Add guests" style={field} /></label>
          <button type="submit" style={{ background: C.teal, color: '#fff', border: 'none', borderRadius: m ? '12px' : '999px', padding: m ? '14px' : '14px 22px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></svg>Search
          </button>
        </form>
      </div>
    </section>
  );
}

function Stays() {
  const m = useIsMobile();
  const [active, setActive] = useState('All stays');
  const list = active === 'All stays' ? stays : stays.filter((s) => s.type === active);
  return (
    <section id="stays" style={{ ...container, padding: m ? '40px 20px' : '64px 20px' }}>
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '28px' }}>
        {filters.map((f) => (
          <button key={f} onClick={() => setActive(f)} style={{ flexShrink: 0, cursor: 'pointer', borderRadius: '999px', padding: '9px 18px', fontSize: '13px', fontWeight: 600, border: `1px solid ${active === f ? C.teal : C.line}`, background: active === f ? C.teal : C.surface, color: active === f ? '#fff' : C.muted }}>{f}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: m ? '14px' : '24px' }}>
        {list.map((s) => (
          <article key={s.name}>
            <div style={{ aspectRatio: '1/1', borderRadius: '16px', background: `linear-gradient(155deg,${s.from},${s.to})`, position: 'relative', marginBottom: '12px' }}>
              <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.9)', borderRadius: '999px', padding: '5px 10px', fontSize: '12px', fontWeight: 700 }}>Guest favourite</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>{s.name}</h3>
              {!m && <Stars rating={s.rating} />}
            </div>
            <p style={{ fontSize: '13px', color: C.muted, margin: '4px 0 6px' }}>{s.place} · {s.guests} guests</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '15px' }}><b>${s.price}</b> <span style={{ color: C.muted, fontWeight: 400 }}>night</span></span>
              {m && <Stars rating={s.rating} />}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function How() {
  const m = useIsMobile();
  const steps = [
    { t: 'Search with confidence', d: 'Every listing is verified, with real photos and honest reviews from past guests.', p: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3' },
    { t: 'Book in seconds', d: 'Transparent pricing, no hidden fees, and instant confirmation on most homes.', p: 'M20 6 9 17l-5-5' },
    { t: 'Stay protected', d: '24/7 support and a full refund guarantee if a home is not as described.', p: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z' },
  ];
  return (
    <section id="how" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
        <h2 style={{ fontSize: m ? '2rem' : '2.6rem', fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', margin: '0 0 44px' }}>Booking, minus the stress</h2>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '26px' }}>
          {steps.map((s) => (
            <div key={s.t} style={{ textAlign: 'center' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'rgba(14,143,130,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width="26" height="26" fill="none" stroke={C.teal} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={s.p} /></svg>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 8px' }}>{s.t}</h3>
              <p style={{ fontSize: '14px', color: C.muted, lineHeight: 1.7, margin: '0 auto', maxWidth: '300px' }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HostCta() {
  const m = useIsMobile();
  return (
    <section id="host" style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
      <div style={{ borderRadius: '24px', overflow: 'hidden', background: 'linear-gradient(135deg,#0e8f82,#0a5f57)', color: '#fff', padding: m ? '36px 24px' : '56px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1.3fr 1fr', gap: '28px', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: m ? '1.9rem' : '2.6rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 14px' }}>Open your door. Earn on your terms.</h2>
          <p style={{ fontSize: m ? '1rem' : '1.1rem', opacity: 0.9, lineHeight: 1.6, margin: '0 0 26px', maxWidth: '420px' }}>Hosts on Roam earn an average of $1,240 a month. We handle payments, insurance and support - you set the rules.</p>
          <a href="#host" style={{ background: '#fff', color: C.teal, borderRadius: '999px', padding: '14px 28px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Start hosting</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {[['$1,240', 'Avg. monthly earnings'], ['48h', 'To first booking'], ['$1M', 'Host protection'], ['4.9★', 'Host satisfaction']].map(([n, l]) => (
            <div key={l} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '14px', padding: '18px' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{n}</div><div style={{ fontSize: '12px', opacity: 0.85, marginTop: '2px' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const m = useIsMobile();
  const data = [
    { text: 'The glass house in Big Sur was even better than the photos. Booking took two minutes.', a: 'Naomi R.', p: 'Big Sur' },
    { text: 'We host our cabin on Roam and it pays the mortgage. Support has been genuinely great.', a: 'Tomas & Ida', p: 'Superhosts' },
    { text: 'Cancelled last-minute because of weather and got a full refund with zero fuss.', a: 'Priya D.', p: 'Lisbon' },
  ];
  return (
    <section style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
      <h2 style={{ fontSize: m ? '2rem' : '2.6rem', fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', margin: '0 0 36px' }}>Travellers and hosts love Roam</h2>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '20px' }}>
        {data.map((r) => (
          <figure key={r.a} style={{ margin: 0, background: C.surface, border: `1px solid ${C.line}`, borderRadius: '16px', padding: '26px' }}>
            <span style={{ display: 'inline-flex', gap: '2px', marginBottom: '12px' }}>{[1, 2, 3, 4, 5].map((s) => <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={C.sand} stroke={C.sand}><path d="M12 2l3 6.5 7 .8-5.2 4.8L18.2 22 12 18.3 5.8 22 7.2 14.1 2 9.3l7-.8z" /></svg>)}</span>
            <blockquote style={{ fontSize: '1rem', lineHeight: 1.65, margin: '0 0 16px', color: C.ink }}>"{r.text}"</blockquote>
            <figcaption style={{ fontSize: '13px', color: C.muted }}><b style={{ color: C.ink }}>{r.a}</b> · {r.p}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, padding: '44px 20px 28px' }}>
      <div style={{ ...container, display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'space-between' }}>
        <div style={{ maxWidth: '250px' }}><Logo /><p style={{ fontSize: '14px', color: C.faint, marginTop: '12px', lineHeight: 1.7 }}>Homes worth travelling for, from hosts you can trust.</p></div>
        {[{ h: 'Explore', l: ['Beachfront', 'Cabins', 'City lofts', 'Countryside'] }, { h: 'Hosting', l: ['Become a host', 'Host resources', 'Insurance', 'Community'] }, { h: 'Support', l: ['Help centre', 'Cancellation', 'Trust & safety', 'Contact'] }].map((col) => (
          <div key={col.h}>
            <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: C.faint, margin: '0 0 14px' }}>{col.h}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>{col.l.map((l) => <li key={l}><a href="#stays" style={{ fontSize: '14px', color: C.muted, textDecoration: 'none' }}>{l}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div style={{ ...container, marginTop: '32px', paddingTop: '20px', borderTop: `1px solid ${C.line}` }}><span style={{ fontSize: '13px', color: C.faint }}>© {new Date().getFullYear()} Roam. All rights reserved.</span></div>
    </footer>
  );
}
