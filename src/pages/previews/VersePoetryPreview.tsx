/* ============================================================
   VERSE — Poet & poetry collection
   Quiet paper, deep ink, muted olive accent, literary serif
   Self-contained, responsive single-page site
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

const PAPER = '#f4efe4';
const INK = '#2b2b26';
const MUTE = '#847e70';
const OLIVE = '#6b7350';
const LINE = 'rgba(43,43,38,0.12)';
const SERIF = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";

const NAV = [
  { label: 'Poems', href: '#poems' },
  { label: 'Books', href: '#books' },
  { label: 'The poet', href: '#poet' },
  { label: 'Readings', href: '#readings' },
];

const poems = [
  { t: 'Field, Late September', lines: ['The wheat leans toward a light', 'it will not live to keep —', 'and still it leans.'] },
  { t: 'What the River Said', lines: ['I have carried whole cities', 'and forgotten each of them.', 'This is how I stay clean.'] },
  { t: 'Small Hours', lines: ['The kettle, the cat,', 'the blue square of the window —', 'proof enough for now.'] },
];

const books = [
  { t: 'The Weight of Light', y: '2025', d: 'Fifty-two poems on distance, tending, and return.', c: 'linear-gradient(160deg,#8a9068,#5c6242)' },
  { t: 'Salt & Ledger', y: '2022', d: 'A debut collection about inheritance and the sea.', c: 'linear-gradient(160deg,#9a8a72,#6b5c48)' },
  { t: 'Field Notes', y: '2019', d: 'Chapbook. Fifteen poems, hand-sewn, out of print.', c: 'linear-gradient(160deg,#7c8a8f,#4f5c60)' },
];

const readings = [
  { d: 'Jun 09', city: 'Edinburgh', v: 'Lighthouse Books' },
  { d: 'Jun 21', city: 'Dublin', v: 'The Winding Stair' },
  { d: 'Jul 04', city: 'Bristol', v: 'Arnolfini' },
];

export default function VersePoetryPreview() {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: PAPER, color: INK, minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${LINE}`, background: 'rgba(244,239,228,0.9)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '940px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ fontFamily: SERIF, fontWeight: 600, fontSize: '26px', letterSpacing: '0.04em', color: INK, textDecoration: 'none' }}>Verse</a>
          {!mobile && <nav style={{ display: 'flex', gap: '2.25rem' }}>{NAV.map(l => <a key={l.label} href={l.href} style={{ fontSize: '14px', color: MUTE, textDecoration: 'none' }}>{l.label}</a>)}</nav>}
          {!mobile ? (
            <a href="#books" style={{ fontFamily: SERIF, fontSize: '17px', fontStyle: 'italic', color: OLIVE, textDecoration: 'none' }}>Buy the book →</a>
          ) : (
            <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: `1px solid ${LINE}`, borderRadius: '4px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '1.5px', background: INK, display: 'block' }} />)}
            </button>
          )}
        </div>
        {mobile && open && <nav style={{ display: 'grid', padding: '0.5rem 1.25rem 1rem', borderTop: `1px solid ${LINE}` }}>{NAV.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ padding: '11px 0', fontSize: '15px', color: INK, textDecoration: 'none', borderBottom: `1px solid ${LINE}` }}>{l.label}</a>)}</nav>}
      </header>

      <section id="top" style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', padding: mobile ? '4rem 1.25rem 3rem' : '7rem 2rem 4rem' }}>
        <span style={{ fontSize: '12px', letterSpacing: '0.24em', textTransform: 'uppercase', color: OLIVE }}>New collection · The Weight of Light</span>
        <h1 style={{ fontFamily: SERIF, fontSize: mobile ? '2.8rem' : 'clamp(3rem,7vw,5rem)', fontWeight: 500, letterSpacing: '0.01em', lineHeight: 1.15, margin: '1.5rem 0 2rem' }}>
          Poems for the<br /><span style={{ fontStyle: 'italic', color: OLIVE }}>slow, attentive hour.</span>
        </h1>
        <p style={{ fontFamily: SERIF, fontSize: mobile ? '1.3rem' : '1.6rem', fontStyle: 'italic', color: MUTE, lineHeight: 1.6, maxWidth: '540px', margin: '0 auto' }}>
          The collected work of Ada Wren — quiet poems about tending, distance, and the ordinary light we live by.
        </p>
      </section>

      <section id="poems" style={{ maxWidth: '820px', margin: '0 auto', padding: mobile ? '1rem 1.25rem 3.5rem' : '2rem 2rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ display: 'inline-block', width: '40px', height: '1px', background: OLIVE, verticalAlign: 'middle', marginRight: '14px' }} />
          <span style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTE }}>Selected poems</span>
          <span style={{ display: 'inline-block', width: '40px', height: '1px', background: OLIVE, verticalAlign: 'middle', marginLeft: '14px' }} />
        </div>
        <div style={{ display: 'grid', gap: mobile ? '2.5rem' : '3.5rem' }}>
          {poems.map(p => (
            <div key={p.t} style={{ textAlign: 'center' }}>
              <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '1.5rem' : '1.9rem', fontWeight: 500, fontStyle: 'italic', margin: '0 0 1.1rem' }}>{p.t}</h2>
              {p.lines.map((l, i) => (
                <p key={i} style={{ fontFamily: SERIF, fontSize: mobile ? '1.25rem' : '1.5rem', color: INK, lineHeight: 1.7, margin: 0 }}>{l}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="poet" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, background: '#ece5d6', padding: mobile ? '3.5rem 1.25rem' : '5rem 2rem' }}>
        <div style={{ maxWidth: '940px', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1.5fr', gap: mobile ? '2rem' : '3.5rem', alignItems: 'center' }}>
          <div style={{ aspectRatio: '3/4', borderRadius: '4px', background: 'linear-gradient(160deg,#a5a082,#6b6650)', maxWidth: mobile ? '240px' : 'none', margin: mobile ? '0 auto' : 0 }} />
          <div>
            <span style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: OLIVE }}>The poet</span>
            <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '2.2rem' : '2.8rem', fontWeight: 500, margin: '0.75rem 0 1.25rem' }}>Ada Wren</h2>
            <p style={{ fontSize: '1.02rem', color: MUTE, lineHeight: 1.85, margin: '0 0 1rem' }}>
              Ada Wren is a poet living on the west coast of Ireland. Her work has appeared in <span style={{ fontStyle: 'italic' }}>The Paris Review</span>, <span style={{ fontStyle: 'italic' }}>Poetry</span>, and <span style={{ fontStyle: 'italic' }}>Granta</span>, and has been translated into nine languages.
            </p>
            <p style={{ fontSize: '1.02rem', color: MUTE, lineHeight: 1.85, margin: 0 }}>
              She writes slowly, by hand, and believes a poem is finished only when there is nothing left to remove.
            </p>
          </div>
        </div>
      </section>

      <section id="books" style={{ maxWidth: '940px', margin: '0 auto', padding: mobile ? '3.5rem 1.25rem' : '5rem 2rem' }}>
        <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 500, textAlign: 'center', margin: '0 0 2.5rem' }}>The collections</h2>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '2rem' }}>
          {books.map(b => (
            <div key={b.t} style={{ textAlign: 'center' }}>
              <div style={{ aspectRatio: '3/4', borderRadius: '3px', background: b.c, marginBottom: '1rem', boxShadow: '0 12px 30px rgba(43,43,38,0.15)' }} />
              <h3 style={{ fontFamily: SERIF, fontSize: '1.4rem', fontWeight: 500, fontStyle: 'italic', margin: '0 0 0.25rem' }}>{b.t}</h3>
              <span style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: OLIVE }}>{b.y}</span>
              <p style={{ fontSize: '14px', color: MUTE, lineHeight: 1.6, margin: '0.75rem 0 0' }}>{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="readings" style={{ borderTop: `1px solid ${LINE}`, padding: mobile ? '3.5rem 1.25rem' : '5rem 2rem' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '2rem' : '2.4rem', fontWeight: 500, textAlign: 'center', margin: '0 0 2rem' }}>Upcoming readings</h2>
          {readings.map(r => (
            <div key={r.city} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 0', borderTop: `1px solid ${LINE}` }}>
              <span style={{ fontFamily: SERIF, fontSize: '1.3rem', fontStyle: 'italic', color: OLIVE, width: '72px', flexShrink: 0 }}>{r.d}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: 600 }}>{r.city}</div>
                <div style={{ fontSize: '13px', color: MUTE }}>{r.v}</div>
              </div>
              <a href="#readings" style={{ fontSize: '13px', color: OLIVE, textDecoration: 'none', whiteSpace: 'nowrap' }}>RSVP →</a>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${LINE}`, padding: '2.5rem 0' }}>
        <div style={{ maxWidth: '940px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: SERIF, fontSize: '22px' }}>Verse</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>{['Instagram', 'Substack', 'Contact'].map(s => <a key={s} href="#top" style={{ fontSize: '13px', color: MUTE, textDecoration: 'none' }}>{s}</a>)}</div>
          <span style={{ fontSize: '13px', color: 'rgba(43,43,38,0.35)' }}>© {new Date().getFullYear()} Ada Wren</span>
        </div>
      </footer>
    </div>
  );
}
