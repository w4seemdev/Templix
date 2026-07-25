/* ============================================================
   SAVEUR - Fine Dining Restaurant Template
   Dark espresso with gold accent. Fully responsive.
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
  bg: '#14100c',
  surface: '#1e1813',
  ink: '#f5efe6',
  muted: '#b8a99a',
  faint: '#8a7c6e',
  line: 'rgba(201,164,92,0.18)',
  gold: '#c9a45c',
};
const serif = "'Playfair Display', Georgia, serif";
const sans = "'Inter', system-ui, sans-serif";
const container: React.CSSProperties = { maxWidth: '1120px', margin: '0 auto', width: '100%' };

const courses = ['Starters', 'Mains', 'Desserts', 'Wine'];
const menu: Record<string, { name: string; desc: string; price: string }[]> = {
  Starters: [
    { name: 'Hand-dived Scallops', desc: 'Cauliflower purée, brown butter, capers', price: '18' },
    { name: 'Heritage Beet Tartare', desc: 'Whipped goat curd, walnut, aged sherry', price: '15' },
    { name: 'Wild Mushroom Velouté', desc: 'Chestnut, truffle oil, sourdough crisp', price: '14' },
  ],
  Mains: [
    { name: 'Dry-aged Ribeye', desc: '35-day aged, bone marrow, confit shallot', price: '42' },
    { name: 'Line-caught Halibut', desc: 'Brown shrimp, samphire, beurre blanc', price: '36' },
    { name: 'Roast Celeriac', desc: 'Smoked almond, apple, sage crumb', price: '28' },
  ],
  Desserts: [
    { name: 'Valrhona Soufflé', desc: 'Salted caramel, crème fraîche ice cream', price: '13' },
    { name: 'Tarte Tatin', desc: 'Bramley apple, vanilla, Calvados', price: '12' },
    { name: 'Cheese Selection', desc: 'Five British cheeses, quince, oat biscuits', price: '16' },
  ],
  Wine: [
    { name: 'Chablis Premier Cru', desc: 'Burgundy, France · 2020', price: '58' },
    { name: 'Barolo Riserva', desc: 'Piedmont, Italy · 2016', price: '92' },
    { name: 'Grower Champagne', desc: 'Côte des Bar · Brut Nature', price: '74' },
  ],
};

export default function SaveurRestaurantPreview() {
  return (
    <div style={{ fontFamily: sans, background: C.bg, color: C.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Menu />
      <Story />
      <Gallery />
      <Reserve />
      <Footer />
    </div>
  );
}

function Nav() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const links = ['Menu', 'Story', 'Gallery', 'Reserve'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(20,16,12,0.9)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: '0 20px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ fontFamily: serif, fontSize: '24px', fontWeight: 700, letterSpacing: '0.04em', color: C.gold, textDecoration: 'none' }}>Saveur</a>
        {!m && <nav style={{ display: 'flex', gap: '32px' }}>{links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none' }}>{l}</a>)}</nav>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {!m && <a href="#reserve" style={{ border: `1px solid ${C.gold}`, color: C.gold, borderRadius: '2px', padding: '9px 20px', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600 }}>Book a table</a>}
          {m && <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: 'none', color: C.ink, cursor: 'pointer', padding: 0, display: 'flex' }}><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">{open ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}</svg></button>}
        </div>
      </div>
      {m && open && <nav style={{ borderTop: `1px solid ${C.line}`, padding: '8px 20px 16px', display: 'flex', flexDirection: 'column' }}>{links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{ fontSize: '14px', color: C.muted, textDecoration: 'none', padding: '11px 0', borderBottom: `1px solid ${C.line}`, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</a>)}</nav>}
    </header>
  );
}

function Hero() {
  const m = useIsMobile();
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(900px 460px at 70% 0%, rgba(201,164,92,0.16), transparent 60%)' }} />
      <div style={{ ...container, padding: m ? '64px 20px 72px' : '110px 20px 120px', position: 'relative', textAlign: 'center' }}>
        <span style={{ fontSize: '12px', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.gold }}>Est. 2011 · Michelin recommended</span>
        <h1 style={{ fontFamily: serif, fontSize: m ? '2.9rem' : '5rem', fontWeight: 700, lineHeight: 1.02, margin: '22px auto 22px', maxWidth: '760px' }}>Seasonal cooking, rooted in place.</h1>
        <p style={{ fontSize: m ? '1rem' : '1.15rem', color: C.muted, lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 32px' }}>A modern British table where every plate follows the harvest. Slow-cooked, ingredient-led, and served with quiet warmth.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#reserve" style={{ background: C.gold, color: '#14100c', borderRadius: '2px', padding: '14px 32px', fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>Reserve a table</a>
          <a href="#menu" style={{ border: `1px solid ${C.line}`, color: C.ink, borderRadius: '2px', padding: '14px 32px', fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>View menu</a>
        </div>
      </div>
    </section>
  );
}

function Menu() {
  const m = useIsMobile();
  const [tab, setTab] = useState('Starters');
  return (
    <section id="menu" style={{ ...container, padding: m ? '56px 20px' : '96px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <p style={{ fontSize: '12px', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.gold, margin: '0 0 10px' }}>À la carte</p>
        <h2 style={{ fontFamily: serif, fontSize: m ? '2.2rem' : '3rem', fontWeight: 700, margin: 0 }}>The menu</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
        {courses.map((c) => (
          <button key={c} onClick={() => setTab(c)} style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '8px 6px', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: tab === c ? C.gold : C.faint, borderBottom: `2px solid ${tab === c ? C.gold : 'transparent'}` }}>{c}</button>
        ))}
      </div>
      <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '26px' }}>
        {menu[tab].map((d) => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: serif, fontSize: '1.2rem', fontWeight: 600, margin: '0 0 5px' }}>{d.name}</h3>
              <p style={{ fontSize: '14px', color: C.muted, margin: 0, lineHeight: 1.55 }}>{d.desc}</p>
            </div>
            <span style={{ borderBottom: `1px dotted ${C.faint}`, flex: '0 1 40px', minWidth: '20px', alignSelf: 'center' }} />
            <span style={{ fontFamily: serif, fontSize: '1.15rem', color: C.gold, fontWeight: 600 }}>£{d.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Story() {
  const m = useIsMobile();
  return (
    <section id="story" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '56px 20px' : '96px 20px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '32px' : '64px', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '12px', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.gold, margin: '0 0 14px' }}>Our kitchen</p>
          <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, lineHeight: 1.1, margin: '0 0 20px' }}>Led by chef Rosa Fontaine</h2>
          <p style={{ fontSize: '1rem', color: C.muted, lineHeight: 1.8, margin: '0 0 16px' }}>Rosa trained across kitchens in Lyon and San Sebastián before returning home to build a restaurant around one idea: cook what is best, right now. Menus change with the season and the day's catch.</p>
          <p style={{ fontSize: '1rem', color: C.muted, lineHeight: 1.8, margin: 0 }}>Nearly everything is made in-house - from the sourdough to the aged vinegars - and sourced from farms within forty miles of the door.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div style={{ aspectRatio: '3/4', borderRadius: '4px', background: 'linear-gradient(160deg,#3a2c1c,#1a130c)' }} />
          <div style={{ aspectRatio: '3/4', borderRadius: '4px', background: 'linear-gradient(160deg,#c9a45c,#6b4f22)', marginTop: '28px' }} />
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const m = useIsMobile();
  const tiles = [
    { l: 'The dining room', g: 'linear-gradient(160deg,#2a2016,#120d08)' },
    { l: 'Open kitchen', g: 'linear-gradient(160deg,#c9a45c,#5c421d)' },
    { l: 'Cellar', g: 'linear-gradient(160deg,#3a2418,#160e08)' },
    { l: "Chef's table", g: 'linear-gradient(160deg,#7a5a2e,#2a1d0e)' },
  ];
  return (
    <section id="gallery" style={{ ...container, padding: m ? '56px 20px' : '96px 20px' }}>
      <h2 style={{ fontFamily: serif, fontSize: m ? '2.2rem' : '3rem', fontWeight: 700, textAlign: 'center', margin: '0 0 36px' }}>The room</h2>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4,1fr)', gap: m ? '12px' : '18px' }}>
        {tiles.map((t) => (
          <div key={t.l} style={{ aspectRatio: '3/4', borderRadius: '4px', background: t.g, position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', bottom: '14px', left: '14px', fontSize: '12px', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{t.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Reserve() {
  const m = useIsMobile();
  const field: React.CSSProperties = { background: C.bg, border: `1px solid ${C.line}`, borderRadius: '2px', padding: '13px 14px', color: C.ink, fontSize: '14px', width: '100%' };
  return (
    <section id="reserve" style={{ background: C.surface, borderTop: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '56px 20px' : '96px 20px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '36px' : '64px', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '12px', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.gold, margin: '0 0 14px' }}>Reservations</p>
          <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.8rem', fontWeight: 700, lineHeight: 1.1, margin: '0 0 20px' }}>Join us for dinner</h2>
          <p style={{ fontSize: '1rem', color: C.muted, lineHeight: 1.8, margin: '0 0 24px' }}>We take bookings up to eight weeks ahead. For parties larger than six, please call us directly and we'll take care of the rest.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: C.muted }}>
            <span><b style={{ color: C.ink }}>Dinner</b> · Tue-Sat, 6pm-10pm</span>
            <span><b style={{ color: C.ink }}>Lunch</b> · Fri & Sat, 12pm-2:30pm</span>
            <span><b style={{ color: C.ink }}>Call</b> · +44 20 7946 0110</span>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: '4px', padding: m ? '22px' : '32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <input placeholder="Full name" style={field} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input type="date" style={field} />
            <input type="time" style={field} />
          </div>
          <select style={field} defaultValue="2"><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option><option value="6">6 guests</option></select>
          <button type="submit" style={{ background: C.gold, color: '#14100c', border: 'none', borderRadius: '2px', padding: '14px', fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer' }}>Request booking</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: '48px 20px 30px', textAlign: 'center' }}>
      <div style={{ ...container }}>
        <span style={{ fontFamily: serif, fontSize: '22px', fontWeight: 700, color: C.gold }}>Saveur</span>
        <p style={{ fontSize: '14px', color: C.muted, margin: '14px 0 8px' }}>18 Curlew Street, London SE1 · +44 20 7946 0110</p>
        <p style={{ fontSize: '13px', color: C.faint, margin: 0 }}>© {new Date().getFullYear()} Saveur Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
}
