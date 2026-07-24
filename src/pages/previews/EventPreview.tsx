/* ============================================================
   EVENTIDE — Event Planning & Celebrations Template
   Midnight plum with champagne gold. Fully responsive.
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
  bg: '#141019',
  surface: '#1e1727',
  ink: '#f4eff7',
  muted: '#b3a7c0',
  faint: '#7d7290',
  line: 'rgba(205,170,106,0.16)',
  gold: '#cdaa6a',
};
const serif = "'Playfair Display', Georgia, serif";
const sans = "'Inter', system-ui, sans-serif";
const container: React.CSSProperties = { maxWidth: '1160px', margin: '0 auto', width: '100%' };

const kinds = ['Weddings', 'Corporate', 'Private', 'Galas'];
const details: Record<string, { tagline: string; points: string[] }> = {
  Weddings: { tagline: 'From intimate ceremonies to 300-guest celebrations.', points: ['Full planning & design', 'Venue & vendor sourcing', 'On-the-day coordination', 'Guest experience'] },
  Corporate: { tagline: 'Launches, conferences and awards that mean business.', points: ['Brand-led production', 'Stage & AV management', 'Delegate registration', 'Catering & hospitality'] },
  Private: { tagline: 'Milestone birthdays, anniversaries and dinner parties.', points: ['Theme & styling', 'Entertainment booking', 'Bespoke menus', 'Guest logistics'] },
  Galas: { tagline: 'Fundraisers and ceremonies with a sense of occasion.', points: ['Run-of-show direction', 'Auction & donations', 'VIP & press handling', 'Full production crew'] },
};

const gallery = [
  { name: 'The Hartley Wedding', place: 'Cotswolds · 180 guests', from: '#7a4a63', to: '#2e1826', big: true },
  { name: 'Northwind Product Launch', place: 'London · 400 guests', from: '#3a4a6a', to: '#161f2e', big: false },
  { name: 'Aurora Charity Gala', place: 'Edinburgh · 260 guests', from: '#b5893f', to: '#4a3312', big: false },
  { name: 'The Vaughan 50th', place: 'Bath · 90 guests', from: '#5a4a7a', to: '#221a34', big: false },
  { name: 'Meridian Awards Night', place: 'Manchester · 320 guests', from: '#7a3a4a', to: '#2e141c', big: true },
];

const packages = [
  { name: 'Coordination', price: 'from £1,800', desc: 'On-the-day management for couples who have planned it all.', feats: ['Final-month handover', 'Timeline & run sheet', 'Vendor coordination', 'On-the-day team'], hot: false },
  { name: 'Signature', price: 'from £4,500', desc: 'Our most-loved service — design and planning, start to finish.', feats: ['Full concept & design', 'Venue & vendor sourcing', 'Budget management', 'On-the-day direction'], hot: true },
  { name: 'Bespoke', price: 'on request', desc: 'A blank canvas for the truly one-of-a-kind celebration.', feats: ['Everything in Signature', 'Custom builds & sets', 'Multi-day events', 'Dedicated producer'], hot: false },
];

export default function EventPreview() {
  return (
    <div style={{ fontFamily: sans, background: C.bg, color: C.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Services />
      <Gallery />
      <Packages />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const links = ['Services', 'Events', 'Packages', 'Contact'];
  const anchors = ['services', 'gallery', 'packages', 'contact'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(20,16,25,0.9)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: '0 20px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ fontFamily: serif, fontSize: '23px', fontWeight: 700, letterSpacing: '0.06em', color: C.gold, textDecoration: 'none' }}>Eventide</a>
        {!m && <nav style={{ display: 'flex', gap: '32px' }}>{links.map((l, i) => <a key={l} href={`#${anchors[i]}`} style={{ fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none' }}>{l}</a>)}</nav>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {!m && <a href="#contact" style={{ border: `1px solid ${C.gold}`, color: C.gold, borderRadius: '2px', padding: '9px 20px', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>Enquire</a>}
          {m && <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: 'none', color: C.ink, cursor: 'pointer', padding: 0, display: 'flex' }}><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">{open ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}</svg></button>}
        </div>
      </div>
      {m && open && <nav style={{ borderTop: `1px solid ${C.line}`, padding: '8px 20px 16px', display: 'flex', flexDirection: 'column' }}>{links.map((l, i) => <a key={l} href={`#${anchors[i]}`} onClick={() => setOpen(false)} style={{ fontSize: '14px', color: C.muted, textDecoration: 'none', padding: '11px 0', borderBottom: `1px solid ${C.line}`, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</a>)}</nav>}
    </header>
  );
}

function Hero() {
  const m = useIsMobile();
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(820px 440px at 75% 0%, rgba(205,170,106,0.16), transparent 60%)' }} />
      <div style={{ ...container, padding: m ? '60px 20px 64px' : '104px 20px 112px', position: 'relative', textAlign: 'center' }}>
        <span style={{ fontSize: '12px', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.gold }}>Event planning & production</span>
        <h1 style={{ fontFamily: serif, fontSize: m ? '2.9rem' : '5rem', fontWeight: 700, lineHeight: 1.02, margin: '22px auto 22px', maxWidth: '760px' }}>Occasions worth remembering.</h1>
        <p style={{ fontSize: m ? '1rem' : '1.15rem', color: C.muted, lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 34px' }}>We design, plan and produce weddings, celebrations and corporate events across the UK and beyond — so you can be a guest at your own party.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#contact" style={{ background: C.gold, color: '#141019', borderRadius: '2px', padding: '14px 32px', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>Start planning</a>
          <a href="#gallery" style={{ border: `1px solid ${C.line}`, color: C.ink, borderRadius: '2px', padding: '14px 32px', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>See our events</a>
        </div>
        <div style={{ display: 'flex', gap: m ? '28px' : '52px', justifyContent: 'center', marginTop: '52px', flexWrap: 'wrap' }}>
          {[['500+', 'Events produced'], ['12', 'Years planning'], ['4.9★', 'Client rating']].map(([n, l]) => (
            <div key={l}><div style={{ fontFamily: serif, fontSize: m ? '1.7rem' : '2.2rem', fontWeight: 700, color: C.gold }}>{n}</div><div style={{ fontSize: '12px', color: C.muted, letterSpacing: '0.04em' }}>{l}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const m = useIsMobile();
  const [tab, setTab] = useState('Weddings');
  const d = details[tab];
  return (
    <section id="services" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, margin: '0 0 10px' }}>What we do</p>
          <h2 style={{ fontFamily: serif, fontSize: m ? '2.2rem' : '3rem', fontWeight: 700, margin: 0 }}>Events of every kind</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {kinds.map((k) => (
            <button key={k} onClick={() => setTab(k)} style={{ cursor: 'pointer', borderRadius: '2px', padding: '10px 22px', fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600, border: `1px solid ${tab === k ? C.gold : C.line}`, background: tab === k ? C.gold : 'transparent', color: tab === k ? '#141019' : C.muted }}>{k}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '28px' : '52px', alignItems: 'center' }}>
          <div style={{ aspectRatio: m ? '16/9' : '4/3', borderRadius: '6px', background: 'linear-gradient(155deg,#7a4a63,#241628)' }} />
          <div>
            <h3 style={{ fontFamily: serif, fontSize: m ? '1.7rem' : '2.2rem', fontWeight: 700, margin: '0 0 14px' }}>{tab}</h3>
            <p style={{ fontSize: '1.05rem', color: C.muted, lineHeight: 1.7, margin: '0 0 22px' }}>{d.tagline}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {d.points.map((p) => (
                <li key={p} style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '14px', color: C.ink }}>
                  <svg width="16" height="16" fill="none" stroke={C.gold} strokeWidth="2.2" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>{p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const m = useIsMobile();
  return (
    <section id="gallery" style={{ ...container, padding: m ? '52px 20px' : '92px 20px' }}>
      <h2 style={{ fontFamily: serif, fontSize: m ? '2.2rem' : '3rem', fontWeight: 700, textAlign: 'center', margin: '0 0 40px' }}>Recent events</h2>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: m ? '16px' : '20px' }}>
        {gallery.map((g) => (
          <div key={g.name} style={{ gridColumn: !m && g.big ? 'span 2' : 'span 1', aspectRatio: !m && g.big ? '16/9' : '4/5', borderRadius: '6px', background: `linear-gradient(155deg,${g.from},${g.to})`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '22px', background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%)' }}>
              <span style={{ fontFamily: serif, color: '#fff', fontSize: '1.3rem', fontWeight: 700 }}>{g.name}</span>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', marginTop: '4px' }}>{g.place}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Packages() {
  const m = useIsMobile();
  return (
    <section id="packages" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, margin: '0 0 10px' }}>How we work together</p>
          <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, margin: 0 }}>Planning packages</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '22px', alignItems: 'stretch' }}>
          {packages.map((p) => (
            <div key={p.name} style={{ background: p.hot ? C.gold : C.bg, color: p.hot ? '#141019' : C.ink, border: `1px solid ${p.hot ? C.gold : C.line}`, borderRadius: '8px', padding: '32px', position: 'relative' }}>
              {p.hot && <span style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(20,16,25,0.15)', borderRadius: '999px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }}>Most loved</span>}
              <h3 style={{ fontFamily: serif, fontSize: '1.5rem', fontWeight: 700, margin: '0 0 6px' }}>{p.name}</h3>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 14px' }}>{p.price}</div>
              <p style={{ fontSize: '14px', lineHeight: 1.6, margin: '0 0 22px', color: p.hot ? 'rgba(20,16,25,0.75)' : C.muted }}>{p.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 26px', display: 'flex', flexDirection: 'column', gap: '11px' }}>
                {p.feats.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '14px' }}>
                    <svg width="16" height="16" fill="none" stroke={p.hot ? '#141019' : C.gold} strokeWidth="2.2" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>{f}
                  </li>
                ))}
              </ul>
              <a href="#contact" style={{ display: 'block', textAlign: 'center', background: p.hot ? '#141019' : C.gold, color: p.hot ? C.gold : '#141019', borderRadius: '2px', padding: '13px', fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>Enquire</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const m = useIsMobile();
  const data = [
    { text: 'Eventide made our wedding utterly effortless. We genuinely enjoyed every second of the day.', a: 'Amara & Josh', c: 'Cotswolds wedding' },
    { text: 'The most organised team we have worked with. Our product launch ran like clockwork.', a: 'Northwind', c: 'Corporate launch' },
    { text: 'They thought of details we never would have. The gala raised a record amount this year.', a: 'Aurora Trust', c: 'Charity gala' },
  ];
  return (
    <section style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
      <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, textAlign: 'center', margin: '0 0 36px' }}>Kind words</h2>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: '20px' }}>
        {data.map((r) => (
          <figure key={r.a} style={{ margin: 0, background: C.surface, border: `1px solid ${C.line}`, borderRadius: '8px', padding: '28px' }}>
            <span style={{ display: 'inline-flex', gap: '2px', marginBottom: '14px' }}>{[1, 2, 3, 4, 5].map((s) => <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={C.gold} stroke={C.gold}><path d="M12 2l3 6.5 7 .8-5.2 4.8L18.2 22 12 18.3 5.8 22 7.2 14.1 2 9.3l7-.8z" /></svg>)}</span>
            <blockquote style={{ fontFamily: serif, fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 18px' }}>"{r.text}"</blockquote>
            <figcaption style={{ fontSize: '13px', color: C.muted }}><b style={{ color: C.ink }}>{r.a}</b> · {r.c}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const m = useIsMobile();
  const field: React.CSSProperties = { background: C.surface, border: `1px solid ${C.line}`, borderRadius: '2px', padding: '13px 14px', color: C.ink, fontSize: '14px', width: '100%' };
  return (
    <section id="contact" style={{ background: C.surface, borderTop: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '88px 20px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '36px' : '56px', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, margin: '0 0 12px' }}>Let's talk</p>
          <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, lineHeight: 1.1, margin: '0 0 18px' }}>Tell us about your event</h2>
          <p style={{ fontSize: '1rem', color: C.muted, lineHeight: 1.8, margin: '0 0 24px' }}>Share a few details and we'll be in touch within two working days to arrange a call. Consultations are always complimentary.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: C.muted }}>
            <span><b style={{ color: C.ink }}>Email</b> · hello@eventide.co</span>
            <span><b style={{ color: C.ink }}>Studio</b> · 14 Lantern Court, London</span>
            <span><b style={{ color: C.ink }}>Call</b> · +44 20 7946 0155</span>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: '6px', padding: m ? '22px' : '30px', display: 'flex', flexDirection: 'column', gap: '13px' }}>
          <input placeholder="Your name" style={field} />
          <input type="email" placeholder="Email address" style={field} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <select style={field} defaultValue=""><option value="" disabled>Event type</option>{kinds.map((k) => <option key={k}>{k}</option>)}</select>
            <input type="date" style={field} />
          </div>
          <textarea placeholder="A little about your event" rows={3} style={{ ...field, resize: 'vertical' }} />
          <button type="submit" style={{ background: C.gold, color: '#141019', border: 'none', borderRadius: '2px', padding: '14px', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer' }}>Send enquiry</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const m = useIsMobile();
  return (
    <footer style={{ padding: '44px 20px 28px' }}>
      <div style={{ ...container, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px', alignItems: 'center', textAlign: m ? 'center' : 'left' }}>
        <span style={{ fontFamily: serif, fontSize: '20px', fontWeight: 700, letterSpacing: '0.06em', color: C.gold, width: m ? '100%' : 'auto' }}>Eventide</span>
        <span style={{ fontSize: '14px', color: C.muted }}>Weddings · Corporate · Private · Galas</span>
        <span style={{ fontSize: '13px', color: C.faint }}>© {new Date().getFullYear()} Eventide Events</span>
      </div>
    </footer>
  );
}
