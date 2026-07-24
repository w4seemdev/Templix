/* ============================================================
   EVELYN & JAMES — Wedding
   Soft cream, blush + antique-gold accents, romantic serif
   Self-contained, responsive single-page site
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

const CREAM = '#fbf6f1';
const INK = '#3a332e';
const MUTE = '#8f857c';
const BLUSH = '#c98a8a';
const GOLD = '#b3924f';
const LINE = 'rgba(58,51,46,0.12)';
const SERIF = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";

const NAV = [
  { label: 'Our Story', href: '#story' },
  { label: 'Details', href: '#details' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'RSVP', href: '#rsvp' },
];

const schedule = [
  { time: '3:00 PM', t: 'Ceremony', d: 'Olive Grove Terrace' },
  { time: '4:30 PM', t: 'Cocktail Hour', d: 'The Courtyard' },
  { time: '6:00 PM', t: 'Dinner & Toasts', d: 'The Long Hall' },
  { time: '8:30 PM', t: 'Dancing', d: 'Under the lights' },
];

const gallery = [
  'linear-gradient(150deg,#e2c6bf,#bb8f88)',
  'linear-gradient(150deg,#cdd3c2,#8fa082)',
  'linear-gradient(150deg,#e6d4b8,#c2a266)',
  'linear-gradient(150deg,#d8c4c9,#a98790)',
  'linear-gradient(150deg,#cfd6cd,#93a08f)',
  'linear-gradient(150deg,#e3cbbd,#bd917c)',
];

export default function WeddingPreview() {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: CREAM, color: INK, minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${LINE}`, background: 'rgba(251,246,241,0.9)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ fontFamily: SERIF, fontSize: '24px', fontStyle: 'italic', color: INK, textDecoration: 'none' }}>E <span style={{ color: GOLD }}>&amp;</span> J</a>
          {!mobile && <nav style={{ display: 'flex', gap: '2.25rem' }}>{NAV.map(l => <a key={l.label} href={l.href} style={{ fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', color: MUTE, textDecoration: 'none' }}>{l.label}</a>)}</nav>}
          {!mobile ? (
            <a href="#rsvp" style={{ background: BLUSH, color: CREAM, borderRadius: '999px', padding: '8px 20px', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>RSVP</a>
          ) : (
            <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: `1px solid ${LINE}`, borderRadius: '4px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '1.5px', background: INK, display: 'block' }} />)}
            </button>
          )}
        </div>
        {mobile && open && <nav style={{ display: 'grid', padding: '0.5rem 1.25rem 1rem', borderTop: `1px solid ${LINE}` }}>{NAV.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ padding: '11px 0', fontSize: '15px', color: INK, textDecoration: 'none', borderBottom: `1px solid ${LINE}` }}>{l.label}</a>)}</nav>}
      </header>

      <section id="top" style={{ position: 'relative', minHeight: mobile ? '440px' : '560px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'linear-gradient(160deg,#efdcd2,#d4b8ad 60%,#b79a7a)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, rgba(251,246,241,0.35), transparent 60%)' }} />
        <div style={{ position: 'relative', padding: '2rem' }}>
          <p style={{ fontSize: '13px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(58,51,46,0.7)', margin: '0 0 1.25rem' }}>We&rsquo;re getting married</p>
          <h1 style={{ fontFamily: SERIF, fontSize: mobile ? '3.4rem' : 'clamp(4rem,10vw,7rem)', fontWeight: 500, lineHeight: 1, margin: 0 }}>
            Evelyn <span style={{ fontStyle: 'italic', color: '#fff' }}>&amp;</span> James
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center', marginTop: '1.5rem' }}>
            <span style={{ width: '40px', height: '1px', background: 'rgba(58,51,46,0.4)' }} />
            <p style={{ fontFamily: SERIF, fontSize: mobile ? '1.2rem' : '1.5rem', fontStyle: 'italic', margin: 0 }}>September 14, 2026 · Tuscany</p>
            <span style={{ width: '40px', height: '1px', background: 'rgba(58,51,46,0.4)' }} />
          </div>
        </div>
      </section>

      <section id="story" style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', padding: mobile ? '3.5rem 1.25rem' : '5.5rem 2rem' }}>
        <span style={{ fontSize: '12px', letterSpacing: '0.24em', textTransform: 'uppercase', color: GOLD }}>How it began</span>
        <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '2.4rem' : '3rem', fontWeight: 500, margin: '1rem 0 1.5rem' }}>Our story</h2>
        <p style={{ fontSize: '1.05rem', color: MUTE, lineHeight: 1.9, margin: '0 0 1.25rem' }}>
          We met on a rained-out train platform in Bologna, sharing one small umbrella and a bad cup of coffee. Seven years, two cities, and one very opinionated dog later, we&rsquo;re finally saying the words out loud.
        </p>
        <p style={{ fontSize: '1.05rem', color: MUTE, lineHeight: 1.9, margin: 0 }}>
          We would be honoured to have you with us as we begin the next chapter.
        </p>
      </section>

      <section id="details" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, background: '#f3e7dd', padding: mobile ? '3.5rem 1.25rem' : '5rem 2rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '2.2rem' : '2.8rem', fontWeight: 500, textAlign: 'center', margin: '0 0 2.5rem' }}>The day</h2>
          <div style={{ maxWidth: '480px', margin: '0 auto' }}>
            {schedule.map((s, i) => (
              <div key={s.t} style={{ display: 'flex', gap: '1.5rem', paddingBottom: i === schedule.length - 1 ? 0 : '1.75rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ width: '11px', height: '11px', borderRadius: '50%', border: `2px solid ${GOLD}`, background: CREAM }} />
                  {i !== schedule.length - 1 && <span style={{ width: '1px', flex: 1, background: LINE, marginTop: '4px' }} />}
                </div>
                <div style={{ paddingBottom: '4px' }}>
                  <span style={{ fontFamily: SERIF, fontSize: '1.3rem', fontStyle: 'italic', color: GOLD }}>{s.time}</span>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '2px 0 2px' }}>{s.t}</h3>
                  <p style={{ fontSize: '14px', color: MUTE, margin: 0 }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" style={{ maxWidth: '1040px', margin: '0 auto', padding: mobile ? '3.5rem 1.25rem' : '5rem 2rem' }}>
        <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '2.2rem' : '2.8rem', fontWeight: 500, textAlign: 'center', margin: '0 0 2.5rem' }}>Moments</h2>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3,1fr)', gap: mobile ? '0.6rem' : '1rem' }}>
          {gallery.map((g, i) => (
            <div key={i} style={{ aspectRatio: i % 5 === 0 ? '3/4' : '1/1', borderRadius: '4px', background: g }} />
          ))}
        </div>
      </section>

      <section id="rsvp" style={{ borderTop: `1px solid ${LINE}`, background: '#f3e7dd', padding: mobile ? '4rem 1.25rem' : '6rem 2rem' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', letterSpacing: '0.24em', textTransform: 'uppercase', color: GOLD }}>Kindly respond by August 1</span>
          <h2 style={{ fontFamily: SERIF, fontSize: mobile ? '2.4rem' : '3rem', fontWeight: 500, margin: '1rem 0 1.75rem' }}>Will you join us?</h2>
          {sent ? (
            <p style={{ fontFamily: SERIF, fontSize: '1.6rem', fontStyle: 'italic', color: BLUSH }}>Thank you — we can&rsquo;t wait to celebrate with you.</p>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: 'grid', gap: '0.9rem', textAlign: 'left' }}>
              <input required placeholder="Full name" style={{ padding: '13px 16px', borderRadius: '6px', border: `1px solid ${LINE}`, background: CREAM, color: INK, fontSize: '15px', outline: 'none' }} />
              <input required type="email" placeholder="Email address" style={{ padding: '13px 16px', borderRadius: '6px', border: `1px solid ${LINE}`, background: CREAM, color: INK, fontSize: '15px', outline: 'none' }} />
              <select style={{ padding: '13px 16px', borderRadius: '6px', border: `1px solid ${LINE}`, background: CREAM, color: INK, fontSize: '15px', outline: 'none' }}>
                <option>Joyfully accepts</option>
                <option>Regretfully declines</option>
              </select>
              <button type="submit" style={{ background: BLUSH, color: CREAM, border: 'none', borderRadius: '999px', padding: '14px', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', marginTop: '0.25rem' }}>Send RSVP</button>
            </form>
          )}
        </div>
      </section>

      <footer style={{ padding: '3rem 0', textAlign: 'center' }}>
        <p style={{ fontFamily: SERIF, fontSize: '2rem', fontStyle: 'italic', margin: '0 0 0.5rem' }}>E <span style={{ color: GOLD }}>&amp;</span> J</p>
        <p style={{ fontSize: '13px', color: MUTE, margin: 0 }}>September 14, 2026 · With love, from Tuscany</p>
      </footer>
    </div>
  );
}
