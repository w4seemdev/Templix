/* ============================================================
   SENDWELL — Email marketing platform (landing)
   Bright, friendly SaaS: emerald primary, coral accent
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

const BG = '#ffffff';
const SOFT = '#f4f8f6';
const INK = '#0f1e1a';
const MUTE = '#5f6f6a';
const EMERALD = '#0ea672';
const CORAL = '#ff6b5c';
const LINE = '#e4ebe8';

const NAV = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
];

function Check() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={EMERALD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>;
}

export default function EmailMarketingPreview() {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: BG, color: INK, minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${LINE}`, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '9px', color: INK, textDecoration: 'none' }}>
            <span style={{ width: '30px', height: '30px', borderRadius: '9px', background: EMERALD, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </span>
            <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em' }}>Sendwell</span>
          </a>
          {!mobile && <nav style={{ display: 'flex', gap: '2rem' }}>{NAV.map(l => <a key={l.label} href={l.href} style={{ fontSize: '14px', color: MUTE, textDecoration: 'none' }}>{l.label}</a>)}</nav>}
          {!mobile ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <a href="#top" style={{ fontSize: '14px', color: INK, textDecoration: 'none', fontWeight: 600 }}>Log in</a>
              <a href="#pricing" style={{ background: EMERALD, color: '#fff', borderRadius: '9px', padding: '9px 18px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>Start free</a>
            </div>
          ) : (
            <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '7px 9px', cursor: 'pointer', display: 'grid', gap: '4px' }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: '18px', height: '2px', background: INK, display: 'block' }} />)}
            </button>
          )}
        </div>
        {mobile && open && <nav style={{ display: 'grid', padding: '0.5rem 1.25rem 1rem', borderTop: `1px solid ${LINE}` }}>{NAV.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ padding: '11px 0', fontSize: '15px', color: INK, textDecoration: 'none', borderBottom: `1px solid ${LINE}` }}>{l.label}</a>)}</nav>}
      </header>

      <section id="top" style={{ background: SOFT, borderBottom: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: mobile ? '3.5rem 1.25rem' : '5.5rem 2rem', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.05fr 1fr', gap: mobile ? '2.5rem' : '4rem', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: 700, color: EMERALD, background: 'rgba(14,166,114,0.1)', borderRadius: '999px', padding: '5px 14px', marginBottom: '1.5rem' }}>New · AI subject-line assistant</span>
            <h1 style={{ fontSize: mobile ? '2.6rem' : 'clamp(2.8rem,6vw,4.4rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.05, margin: '0 0 1.25rem' }}>
              Email your people <span style={{ color: EMERALD }}>actually open.</span>
            </h1>
            <p style={{ fontSize: mobile ? '1.05rem' : '1.2rem', color: MUTE, lineHeight: 1.65, margin: '0 0 2rem', maxWidth: '460px' }}>
              Sendwell is the email platform for creators and small teams — beautiful campaigns, smart automations, and analytics you&rsquo;ll actually read.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <a href="#pricing" style={{ background: EMERALD, color: '#fff', borderRadius: '10px', padding: '14px 26px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>Start free — no card</a>
              <a href="#how" style={{ border: `1px solid ${LINE}`, background: '#fff', color: INK, borderRadius: '10px', padding: '14px 26px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>See how it works</a>
            </div>
            <p style={{ fontSize: '13px', color: MUTE }}>Trusted by 12,000+ senders · Free up to 1,000 subscribers</p>
          </div>
          {/* dashboard mock */}
          <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', boxShadow: '0 24px 60px rgba(15,30,26,0.1)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '11px 14px', borderBottom: `1px solid ${LINE}` }}>
              {[CORAL, '#f2c94c', EMERALD].map(c => <span key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
              <span style={{ marginLeft: '10px', fontSize: '12px', color: MUTE }}>Spring Launch · Campaign</span>
            </div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                {[{ v: '42.6%', l: 'Open rate' }, { v: '8.3%', l: 'Click rate' }, { v: '12,480', l: 'Delivered' }].map(s => (
                  <div key={s.l} style={{ background: SOFT, borderRadius: '10px', padding: '0.9rem' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>{s.v}</div>
                    <div style={{ fontSize: '11px', color: MUTE }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '90px', padding: '0 2px' }}>
                {[45, 62, 50, 78, 66, 88, 72, 95, 80].map((h, i) => (
                  <span key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '4px 4px 0 0', background: i === 7 ? EMERALD : 'rgba(14,166,114,0.25)' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" style={{ maxWidth: '1160px', margin: '0 auto', padding: mobile ? '3.5rem 1.25rem' : '5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
          <h2 style={{ fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.75rem' }}>Everything you need to send well</h2>
          <p style={{ fontSize: '1.05rem', color: MUTE, maxWidth: '480px', margin: '0 auto' }}>From your first newsletter to a fully automated welcome series.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '1.25rem' }}>
          {[
            { t: 'Drag-and-drop builder', d: 'Compose on-brand emails in minutes — no code, no fiddly HTML, mobile-perfect by default.', p: 'M4 5h16M4 12h10M4 19h7' },
            { t: 'Automations that convert', d: 'Welcome flows, drips, and re-engagement journeys triggered by what your readers actually do.', p: 'M12 2v6m0 0l3-3m-3 3L9 5M4 12h16M6 20h12' },
            { t: 'Segments in one click', d: 'Group by activity, tags, or purchase history and send the right message to the right people.', p: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
            { t: 'Analytics you\'ll read', d: 'Opens, clicks, growth, and revenue in one clean dashboard — no spreadsheet gymnastics.', p: 'M3 3v18h18M7 15l4-4 3 3 5-6' },
            { t: 'A/B testing built in', d: 'Test subject lines and content, then auto-send the winner to the rest of your list.', p: 'M8 3v18M16 3v18M3 8h5M16 16h5' },
            { t: 'Deliverability first', d: 'Authenticated sending, warm-up, and spam-scoring so your emails reach the inbox.', p: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z' },
          ].map(f => (
            <div key={f.t} style={{ border: `1px solid ${LINE}`, borderRadius: '16px', padding: '1.75rem', background: '#fff' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: 'rgba(14,166,114,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={EMERALD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={f.p} /></svg>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.01em', margin: '0 0 0.5rem' }}>{f.t}</h3>
              <p style={{ fontSize: '14px', color: MUTE, lineHeight: 1.65, margin: 0 }}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" style={{ background: INK, color: '#fff', padding: mobile ? '3.5rem 1.25rem' : '5rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', margin: '0 0 2.75rem' }}>Live in three steps</h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: mobile ? '1.75rem' : '2rem' }}>
            {[
              { n: '01', t: 'Import your list', d: 'Upload a CSV or connect your store. We clean and validate every address for you.' },
              { n: '02', t: 'Design your campaign', d: 'Start from a template or brand kit and make it yours with the drag-and-drop editor.' },
              { n: '03', t: 'Send & learn', d: 'Hit send, watch the results roll in, and let automations do the rest on repeat.' },
            ].map(s => (
              <div key={s.n}>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: CORAL, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>{s.n}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{s.t}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ maxWidth: '1160px', margin: '0 auto', padding: mobile ? '3.5rem 1.25rem' : '5rem 2rem' }}>
        <h2 style={{ fontSize: mobile ? '2rem' : '2.6rem', fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', margin: '0 0 0.75rem' }}>Simple, honest pricing</h2>
        <p style={{ fontSize: '1.05rem', color: MUTE, textAlign: 'center', margin: '0 0 2.75rem' }}>Start free. Upgrade when your list grows. Cancel anytime.</p>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '1.25rem', maxWidth: '960px', margin: '0 auto' }}>
          {[
            { t: 'Free', p: '$0', sub: 'up to 1,000 subscribers', d: ['Unlimited campaigns', 'Drag-and-drop builder', 'Basic analytics'], hot: false },
            { t: 'Grow', p: '$29', sub: 'per month · 10,000 subs', d: ['Everything in Free', 'Automations & segments', 'A/B testing', 'Remove Sendwell badge'], hot: true },
            { t: 'Scale', p: '$79', sub: 'per month · 50,000 subs', d: ['Everything in Grow', 'Send-time optimization', 'Priority support', 'Dedicated IP'], hot: false },
          ].map(t => (
            <div key={t.t} style={{ border: `1.5px solid ${t.hot ? EMERALD : LINE}`, borderRadius: '18px', padding: '2rem 1.75rem', background: '#fff', position: 'relative' }}>
              {t.hot && <span style={{ position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)', background: EMERALD, color: '#fff', fontSize: '11px', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: '999px', padding: '4px 12px' }}>Most popular</span>}
              <div style={{ fontSize: '14px', fontWeight: 700, color: MUTE, marginBottom: '0.5rem' }}>{t.t}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}><span style={{ fontSize: '2.6rem', fontWeight: 900, letterSpacing: '-0.03em' }}>{t.p}</span></div>
              <p style={{ fontSize: '13px', color: MUTE, margin: '0.25rem 0 1.5rem' }}>{t.sub}</p>
              <div style={{ display: 'grid', gap: '0.7rem', marginBottom: '1.75rem' }}>
                {t.d.map(f => <div key={f} style={{ display: 'flex', gap: '9px', alignItems: 'center' }}><Check /><span style={{ fontSize: '14px' }}>{f}</span></div>)}
              </div>
              <a href="#pricing" style={{ display: 'block', textAlign: 'center', padding: '13px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', background: t.hot ? EMERALD : 'transparent', color: t.hot ? '#fff' : INK, border: t.hot ? 'none' : `1px solid ${LINE}` }}>{t.t === 'Free' ? 'Start free' : `Choose ${t.t}`}</a>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: SOFT, borderTop: `1px solid ${LINE}`, padding: mobile ? '4rem 1.25rem' : '5.5rem 2rem' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: mobile ? '2.1rem' : '2.8rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 1rem' }}>Send your best email yet</h2>
          <p style={{ fontSize: '1.05rem', color: MUTE, margin: '0 0 2rem' }}>Free forever up to 1,000 subscribers. No credit card required.</p>
          <a href="#pricing" style={{ display: 'inline-block', background: EMERALD, color: '#fff', borderRadius: '10px', padding: '15px 34px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>Create your free account</a>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${LINE}`, padding: '2.5rem 0', background: '#fff' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '16px', fontWeight: 800 }}>Sendwell</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>{['Product', 'Docs', 'Privacy', 'Contact'].map(s => <a key={s} href="#top" style={{ fontSize: '13px', color: MUTE, textDecoration: 'none' }}>{s}</a>)}</div>
          <span style={{ fontSize: '13px', color: '#aab4b0' }}>© {new Date().getFullYear()} Sendwell</span>
        </div>
      </footer>
    </div>
  );
}
