/* ============================================================
   MARGINALIA — Independent Bookstore Template
   Warm paper cream with forest-green & oxblood accents.
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
  bg: '#f4efe3',
  surface: '#fbf8f0',
  ink: '#22261f',
  muted: '#5f5a4e',
  faint: '#948d7c',
  line: '#e2d9c6',
  wine: '#7a2a2a',
  green: '#2f4a37',
};
const serif = "'Playfair Display', Georgia, serif";
const sans = "'Inter', system-ui, sans-serif";
const container: React.CSSProperties = { maxWidth: '1140px', margin: '0 auto', width: '100%' };

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: '1px' }} aria-label={`${rating} of 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.round(rating) ? C.wine : 'none'} stroke={s <= Math.round(rating) ? C.wine : '#cdc2ab'} strokeWidth="1.5"><path d="M12 2l3 6.5 7 .8-5.2 4.8L18.2 22 12 18.3 5.8 22 7.2 14.1 2 9.3l7-.8z" /></svg>
      ))}
    </span>
  );
}

const genres = ['All', 'Fiction', 'Non-fiction', 'Poetry', 'Children'];
const books = [
  { title: 'The Midnight Library', author: 'Matt Haig', genre: 'Fiction', price: 16, rating: 4.6, from: '#2f4a63', to: '#14202e' },
  { title: 'Braiding Sweetgrass', author: 'Robin Wall Kimmerer', genre: 'Non-fiction', price: 14, rating: 4.9, from: '#3a5a3a', to: '#18291a' },
  { title: 'Devotions', author: 'Mary Oliver', genre: 'Poetry', price: 18, rating: 4.8, from: '#7a3a52', to: '#3a1826' },
  { title: 'Piranesi', author: 'Susanna Clarke', genre: 'Fiction', price: 15, rating: 4.7, from: '#4a4a63', to: '#20202e' },
  { title: 'The Wild Robot', author: 'Peter Brown', genre: 'Children', price: 12, rating: 4.9, from: '#3a6a5a', to: '#183329' },
  { title: 'Entangled Life', author: 'Merlin Sheldrake', genre: 'Non-fiction', price: 17, rating: 4.8, from: '#6a5230', to: '#2e2312' },
  { title: 'Ariel', author: 'Sylvia Plath', genre: 'Poetry', price: 13, rating: 4.6, from: '#7a2a2a', to: '#3a1212' },
  { title: 'Where the Crawdads Sing', author: 'Delia Owens', genre: 'Fiction', price: 14, rating: 4.5, from: '#4a6330', to: '#202e14' },
];

export default function BookstorePreview() {
  return (
    <div style={{ fontFamily: sans, background: C.bg, color: C.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Shelf />
      <StaffPick />
      <Events />
      <Newsletter />
      <Footer />
    </div>
  );
}

function Mark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.wine} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h9a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H4z" /><path d="M20 4h-4a3 3 0 0 0-3 3v13" /></svg>
  );
}

function Nav() {
  const m = useIsMobile();
  const [open, setOpen] = useState(false);
  const links = ['Shop', 'Staff picks', 'Events'];
  const anchors = ['shelf', 'staff', 'events'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(244,239,227,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: '0 20px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none', color: C.ink }}><Mark /><span style={{ fontFamily: serif, fontSize: '21px', fontWeight: 700 }}>Marginalia</span></a>
        {!m && <nav style={{ display: 'flex', gap: '30px' }}>{links.map((l, i) => <a key={l} href={`#${anchors[i]}`} style={{ fontSize: '14px', color: C.muted, textDecoration: 'none', fontWeight: 500 }}>{l}</a>)}</nav>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {!m && <a href="#shelf" style={{ background: C.green, color: '#fff', borderRadius: '4px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Browse books</a>}
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
    <section id="top" style={{ ...container, padding: m ? '44px 20px 40px' : '80px 20px 72px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1.1fr 0.9fr', gap: m ? '32px' : '52px', alignItems: 'center' }}>
      <div>
        <span style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.wine, fontWeight: 700 }}>Independent since 1998</span>
        <h1 style={{ fontFamily: serif, fontSize: m ? '2.7rem' : '4.4rem', fontWeight: 700, lineHeight: 1.04, margin: '16px 0 20px' }}>A room full of good books.</h1>
        <p style={{ fontSize: m ? '1rem' : '1.125rem', color: C.muted, lineHeight: 1.7, maxWidth: '440px', margin: '0 0 30px' }}>Carefully chosen titles, honest recommendations, and a reading chair in every corner. Order online or come get lost in the stacks.</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="#shelf" style={{ background: C.green, color: '#fff', borderRadius: '4px', padding: '14px 30px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Shop new arrivals</a>
          <a href="#events" style={{ border: `1px solid ${C.wine}`, color: C.wine, borderRadius: '4px', padding: '14px 30px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>What's on</a>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
        {books.slice(0, 3).map((b, i) => (
          <div key={b.title} style={{ aspectRatio: '2/3', borderRadius: '4px', background: `linear-gradient(160deg,${b.from},${b.to})`, marginTop: i === 1 ? '0' : '24px', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 24px rgba(34,38,31,0.14)' }}>
            <span style={{ fontFamily: serif, color: '#fff', fontSize: '13px', fontWeight: 700, lineHeight: 1.25 }}>{b.title}</span>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '10px' }}>{b.author}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Shelf() {
  const m = useIsMobile();
  const [active, setActive] = useState('All');
  const list = active === 'All' ? books : books.filter((b) => b.genre === active);
  return (
    <section id="shelf" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '84px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.6rem', fontWeight: 700, margin: 0 }}>On the shelf</h2>
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {genres.map((g) => (
              <button key={g} onClick={() => setActive(g)} style={{ flexShrink: 0, cursor: 'pointer', borderRadius: '4px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, border: `1px solid ${active === g ? C.green : C.line}`, background: active === g ? C.green : 'transparent', color: active === g ? '#fff' : C.muted }}>{g}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: m ? '18px' : '28px' }}>
          {list.map((b) => (
            <article key={b.title}>
              <div style={{ aspectRatio: '2/3', borderRadius: '4px', background: `linear-gradient(160deg,${b.from},${b.to})`, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '12px', boxShadow: '0 8px 20px rgba(34,38,31,0.12)' }}>
                <span style={{ fontFamily: serif, color: '#fff', fontSize: '14px', fontWeight: 700, lineHeight: 1.25 }}>{b.title}</span>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px' }}>{b.author}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <Stars rating={b.rating} />
                <span style={{ fontSize: '15px', fontWeight: 700, color: C.green }}>${b.price}</span>
              </div>
              <p style={{ fontSize: '12px', color: C.faint, margin: 0 }}>{b.genre}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StaffPick() {
  const m = useIsMobile();
  return (
    <section id="staff" style={{ ...container, padding: m ? '52px 20px' : '88px 20px' }}>
      <div style={{ background: C.green, color: '#f2efe4', borderRadius: '16px', padding: m ? '32px 24px' : '52px', display: 'grid', gridTemplateColumns: m ? '1fr' : '0.7fr 1.3fr', gap: m ? '28px' : '48px', alignItems: 'center' }}>
        <div style={{ aspectRatio: '2/3', borderRadius: '6px', background: 'linear-gradient(160deg,#7a3a52,#3a1826)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 16px 40px rgba(0,0,0,0.3)', maxWidth: m ? '180px' : 'none', margin: m ? '0 auto' : '0' }}>
          <span style={{ fontFamily: serif, color: '#fff', fontSize: '1.3rem', fontWeight: 700 }}>Devotions</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Mary Oliver</span>
        </div>
        <div>
          <span style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#d9a9a9', fontWeight: 700 }}>Staff pick of the month</span>
          <h2 style={{ fontFamily: serif, fontSize: m ? '1.9rem' : '2.6rem', fontWeight: 700, lineHeight: 1.1, margin: '12px 0 16px' }}>"The poems I return to most."</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, opacity: 0.92, margin: '0 0 20px' }}>A career-spanning collection of Mary Oliver's luminous nature poems. If you only buy one book of poetry this year, make it this one — start with "Wild Geese" and see if you can stop.</p>
          <p style={{ fontSize: '14px', opacity: 0.85, margin: '0 0 22px' }}>— Priya, bookseller since 2016</p>
          <a href="#shelf" style={{ background: '#f2efe4', color: C.green, borderRadius: '4px', padding: '13px 26px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Add to basket · $18</a>
        </div>
      </div>
    </section>
  );
}

function Events() {
  const m = useIsMobile();
  const list = [
    { date: 'Thu 18', title: 'Poetry night with local writers', time: '7:00pm · Free' },
    { date: 'Sat 20', title: "Children's story hour", time: '10:30am · Ages 3–7' },
    { date: 'Wed 24', title: 'Book club: Piranesi', time: '6:30pm · All welcome' },
    { date: 'Fri 26', title: 'Author signing: Merlin Sheldrake', time: '6:00pm · Ticketed' },
  ];
  return (
    <section id="events" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ ...container, padding: m ? '52px 20px' : '84px 20px' }}>
        <h2 style={{ fontFamily: serif, fontSize: m ? '2rem' : '2.6rem', fontWeight: 700, textAlign: 'center', margin: '0 0 36px' }}>What's on this month</h2>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: '16px', maxWidth: '820px', margin: '0 auto' }}>
          {list.map((e) => (
            <div key={e.title} style={{ display: 'flex', gap: '16px', alignItems: 'center', background: C.bg, border: `1px solid ${C.line}`, borderRadius: '10px', padding: '18px 20px' }}>
              <div style={{ flexShrink: 0, width: '54px', textAlign: 'center' }}>
                <div style={{ fontFamily: serif, fontSize: '1.4rem', fontWeight: 700, color: C.wine, lineHeight: 1 }}>{e.date.split(' ')[1]}</div>
                <div style={{ fontSize: '11px', color: C.faint, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{e.date.split(' ')[0]}</div>
              </div>
              <div><h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px' }}>{e.title}</h3><p style={{ fontSize: '13px', color: C.muted, margin: 0 }}>{e.time}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const m = useIsMobile();
  return (
    <section style={{ ...container, padding: m ? '52px 20px' : '84px 20px', textAlign: 'center' }}>
      <h2 style={{ fontFamily: serif, fontSize: m ? '1.9rem' : '2.4rem', fontWeight: 700, margin: '0 0 10px' }}>Our monthly reading letter</h2>
      <p style={{ color: C.muted, margin: '0 0 24px', fontSize: '15px' }}>New arrivals, staff picks and event invites — once a month, never more.</p>
      <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '10px', maxWidth: '440px', margin: '0 auto', flexDirection: m ? 'column' : 'row' }}>
        <input type="email" placeholder="you@email.com" style={{ flex: 1, background: C.surface, border: `1px solid ${C.line}`, borderRadius: '4px', padding: '13px 16px', color: C.ink, fontSize: '14px' }} />
        <button type="submit" style={{ background: C.wine, color: '#fff', border: 'none', borderRadius: '4px', padding: '13px 26px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Subscribe</button>
      </form>
    </section>
  );
}

function Footer() {
  const m = useIsMobile();
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, padding: '44px 20px 28px' }}>
      <div style={{ ...container, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px', alignItems: 'center', textAlign: m ? 'center' : 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px', justifyContent: m ? 'center' : 'flex-start', width: m ? '100%' : 'auto' }}><Mark /><span style={{ fontFamily: serif, fontSize: '19px', fontWeight: 700 }}>Marginalia</span></div>
        <span style={{ fontSize: '14px', color: C.muted }}>7 Chapter Street, Edinburgh · Open daily 9–7</span>
        <span style={{ fontSize: '13px', color: C.faint }}>© {new Date().getFullYear()} Marginalia Books</span>
      </div>
    </footer>
  );
}
