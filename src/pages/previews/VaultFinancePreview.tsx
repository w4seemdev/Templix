/* ============================================================
   VAULT — Fintech Landing Template
   Deep navy with emerald accent. Self-contained, inline styles
   only, fully responsive (375px → 1280px). App-card hero mock.
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

const T = { bg: '#03080f', panel: '#0a1420', line: 'rgba(255,255,255,0.08)', ink: '#e8f5ee', mut: '#94b3a6', dim: '#5a7568', a: '#10b981', a2: '#34d399' };
const grad = 'linear-gradient(135deg, #10b981, #059669)';
const NAV = [['Features', 'features'], ['Security', 'security'], ['Reviews', 'reviews'], ['Pricing', 'pricing']] as const;

export default function VaultFinancePreview() {
  const mobile = useIsMobile();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, color: T.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav mobile={mobile} />
      <Hero mobile={mobile} />
      <Features mobile={mobile} />
      <Security mobile={mobile} />
      <Reviews mobile={mobile} />
      <Pricing mobile={mobile} />
      <Cta />
      <Foot mobile={mobile} />
    </div>
  );
}

function Nav({ mobile }: { mobile: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${T.line}`, background: 'rgba(3,8,15,0.85)', backdropFilter: 'blur(16px)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#022c1e" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>Vault</span>
        </div>
        {!mobile && <nav style={{ display: 'flex', gap: 28 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} style={{ fontSize: 14, color: T.mut, textDecoration: 'none' }}>{l}</a>)}</nav>}
        {!mobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <a href="#pricing" style={{ fontSize: 14, color: T.mut, textDecoration: 'none' }}>Log in</a>
            <a href="#pricing" style={{ background: grad, borderRadius: 10, padding: '9px 18px', fontSize: 14, fontWeight: 700, color: '#022c1e', textDecoration: 'none' }}>Open account</a>
          </div>
        ) : (
          <button aria-label="Menu" onClick={() => setOpen(o => !o)} style={{ background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 8, padding: 8, cursor: 'pointer' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M3 6h18M3 12h18M3 18h18'} /></svg></button>
        )}
      </div>
      {mobile && open && <div style={{ padding: '8px 20px 18px', borderTop: `1px solid ${T.line}`, display: 'flex', flexDirection: 'column', gap: 4 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} onClick={() => setOpen(false)} style={{ padding: '10px 0', fontSize: 15, color: T.mut, textDecoration: 'none' }}>{l}</a>)}<a href="#pricing" onClick={() => setOpen(false)} style={{ marginTop: 8, textAlign: 'center', background: grad, borderRadius: 10, padding: 11, fontSize: 14, fontWeight: 700, color: '#022c1e', textDecoration: 'none' }}>Open account</a></div>}
    </header>
  );
}

function Hero({ mobile }: { mobile: boolean }) {
  return (
    <section style={{ padding: mobile ? '48px 20px 36px' : '78px 20px 52px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', display: mobile ? 'block' : 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 44, alignItems: 'center' }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.08)', borderRadius: 9999, padding: '6px 14px', fontSize: 13, color: T.a2 }}>FDIC-insured up to $250,000</span>
          <h1 style={{ fontSize: mobile ? '2.3rem' : '3.5rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.07, margin: '20px 0 0' }}>
            Banking that grows<br />your money <span style={{ background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>automatically</span>
          </h1>
          <p style={{ fontSize: mobile ? '1rem' : '1.12rem', color: T.mut, lineHeight: 1.7, margin: '18px 0 0', maxWidth: 460 }}>
            A checking account with 4.5% APY, instant transfers, and smart round-ups that invest your spare change — no fees, ever.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
            <a href="#pricing" style={{ background: grad, borderRadius: 12, padding: '13px 24px', fontSize: 15, fontWeight: 700, color: '#022c1e', textDecoration: 'none' }}>Open free account</a>
            <a href="#features" style={{ border: `1px solid ${T.line}`, borderRadius: 12, padding: '13px 24px', fontSize: 15, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>How it works</a>
          </div>
          <p style={{ fontSize: 13, color: T.dim, marginTop: 16 }}>2 minutes to open · No minimum balance · No hidden fees</p>
        </div>
        <PhoneCard mobile={mobile} />
      </div>
    </section>
  );
}

function PhoneCard({ mobile }: { mobile: boolean }) {
  const bars = [40, 62, 55, 78, 70, 92];
  return (
    <div style={{ marginTop: mobile ? 34 : 0, maxWidth: 320, marginLeft: mobile ? 'auto' : 0, marginRight: mobile ? 'auto' : 0, borderRadius: 26, border: `1px solid ${T.line}`, background: T.panel, padding: 18, boxShadow: '0 40px 90px rgba(0,0,0,0.5), 0 0 60px rgba(16,185,129,0.1)' }}>
      <div style={{ borderRadius: 18, background: grad, padding: 20, color: '#022c1e', marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.8 }}>Total balance</div>
        <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-0.03em', margin: '4px 0' }}>$24,918.40</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 12, fontWeight: 600 }}>•••• 8821</span><span style={{ fontSize: 12, fontWeight: 700 }}>+4.5% APY</span></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
        {[['↑', 'Send'], ['↓', 'Request'], ['+', 'Invest'], ['≡', 'More']].map(([ic, l]) => (
          <div key={l} style={{ textAlign: 'center' }}><div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.a2, fontSize: 16, fontWeight: 700, margin: '0 auto 4px' }}>{ic}</div><div style={{ fontSize: 10, color: T.dim }}>{l}</div></div>
        ))}
      </div>
      <div style={{ borderRadius: 14, border: `1px solid ${T.line}`, padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}><span style={{ fontSize: 12, fontWeight: 600, color: T.mut }}>This month</span><span style={{ fontSize: 12, color: T.a2 }}>+$412 earned</span></div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 54 }}>
          {bars.map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 3, background: i === bars.length - 1 ? T.a : 'rgba(16,185,129,0.25)' }} />)}
        </div>
      </div>
    </div>
  );
}

const ICONS: Record<string, string> = {
  percent: 'M19 5L5 19M6.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM17.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  bolt: 'M13 2L3 14h7l-1 8 10-12h-7z',
  coins: 'M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3zM4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
  bell: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  card: 'M3 5h18v14H3zM3 10h18',
  pie: 'M21 15.5A9 9 0 1 1 8.5 3M21 12a9 9 0 0 0-9-9v9z',
};
function VIcon({ name }: { name: string }) { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.a2} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[name]} /></svg>; }

function Features({ mobile }: { mobile: boolean }) {
  const items = [
    ['percent', '4.5% APY, paid daily', 'Earn one of the highest yields in the country on every dollar in your account.'],
    ['bolt', 'Instant transfers', 'Move money in seconds to any bank or Vault user — no waiting, no wire fees.'],
    ['coins', 'Automatic round-ups', 'Round up purchases to the nearest dollar and invest the change on autopilot.'],
    ['pie', 'Smart budgeting', 'Vault categorizes spending and nudges you before you overshoot a budget.'],
    ['card', 'Metal debit card', 'A card with 2% cashback on everything and no foreign transaction fees.'],
    ['bell', 'Real-time alerts', 'Every transaction, instantly — with one tap to freeze your card if needed.'],
  ];
  return (
    <Section id="features" mobile={mobile} tag="Features" title="A bank account that works for you" sub="Everything you expect from a bank, plus the parts they forgot.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 16 }}>
        {items.map(([ic, t, d]) => (
          <div key={t} style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: T.panel, padding: 22 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><VIcon name={ic} /></div>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{t}</h3>
            <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.65, margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Security({ mobile }: { mobile: boolean }) {
  const points = [
    ['256-bit encryption', 'Every transaction and stored value is encrypted end to end.'],
    ['FDIC insured', 'Your deposits are insured up to $250,000 through our partner bank.'],
    ['Biometric login', 'Face ID and fingerprint keep your account locked to you alone.'],
    ['Card controls', 'Freeze, unfreeze, and set limits on your card from the app instantly.'],
  ];
  return (
    <Section id="security" mobile={mobile} alt tag="Security" title="Your money, seriously protected" sub="Bank-grade security, without the bank.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2,1fr)', gap: 16 }}>
        {points.map(([t, d]) => (
          <div key={t} style={{ display: 'flex', gap: 14, borderRadius: 16, border: `1px solid ${T.line}`, background: T.bg, padding: 22 }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={T.a2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg></div>
            <div><h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px' }}>{t}</h3><p style={{ fontSize: 14, color: T.dim, lineHeight: 1.65, margin: 0 }}>{d}</p></div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Reviews({ mobile }: { mobile: boolean }) {
  const t = [
    ['Switched from my big bank and my savings actually earn something now. The app is gorgeous.', 'Elena M.', '4.5% APY member'],
    ['Round-ups quietly invested $1,200 last year without me noticing. Genuinely brilliant.', 'Devon K.', 'Invest user'],
    ['Support answered in under a minute at 11pm. No bank has ever done that for me.', 'Aisha R.', 'Since 2023'],
  ];
  return (
    <Section id="reviews" mobile={mobile} tag="Reviews" title="Loved by 500,000+ members" sub="4.8 on the App Store across 60k ratings.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 18 }}>
        {t.map(([q, n, r]) => (
          <div key={n} style={{ borderRadius: 18, border: `1px solid ${T.line}`, background: T.panel, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 3 }}>{[0, 1, 2, 3, 4].map(i => <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill={T.a2}><path d="M12 2l3 6.5 7 .6-5.3 4.6 1.6 6.8L12 17l-6 3.5 1.6-6.8L2 9.1l7-.6z" /></svg>)}</div>
            <p style={{ fontSize: 14.5, color: T.mut, lineHeight: 1.7, margin: 0, flex: 1 }}>“{q}”</p>
            <div><div style={{ fontSize: 14, fontWeight: 600 }}>{n}</div><div style={{ fontSize: 12, color: T.dim }}>{r}</div></div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Pricing({ mobile }: { mobile: boolean }) {
  const plans = [
    { name: 'Vault', price: '$0', note: '/mo', desc: 'Everything to start growing.', feats: ['4.5% APY checking', 'No account fees', 'Instant transfers', 'Virtual + physical card'], hot: false },
    { name: 'Vault Plus', price: '$8', note: '/mo', desc: 'For serious savers.', feats: ['Everything in Vault', 'Auto round-up investing', '2% cashback card', 'Priority support'], hot: true },
  ];
  return (
    <Section id="pricing" mobile={mobile} alt tag="Pricing" title="No fees. No fine print." sub="Upgrade only if you want the extras.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2,1fr)', gap: 18, maxWidth: 720, margin: '0 auto', alignItems: 'start' }}>
        {plans.map(p => (
          <div key={p.name} style={{ borderRadius: 20, border: p.hot ? '1px solid rgba(16,185,129,0.5)' : `1px solid ${T.line}`, background: p.hot ? 'rgba(16,185,129,0.06)' : T.bg, padding: 28, position: 'relative' }}>
            {p.hot && <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: grad, borderRadius: 9999, padding: '3px 14px', fontSize: 12, fontWeight: 700, color: '#022c1e' }}>Most popular</div>}
            <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 4px' }}>{p.name}</h3>
            <p style={{ fontSize: 13, color: T.dim, margin: '0 0 16px' }}>{p.desc}</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, marginBottom: 18 }}><span style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>{p.price}</span><span style={{ fontSize: 14, color: T.dim, marginBottom: 8 }}>{p.note}</span></div>
            <a href="#pricing" style={{ display: 'block', textAlign: 'center', borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none', background: p.hot ? grad : 'rgba(255,255,255,0.06)', color: p.hot ? '#022c1e' : '#fff', marginBottom: 20 }}>Open account</a>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>{p.feats.map(f => <li key={f} style={{ display: 'flex', gap: 9, fontSize: 13.5, color: T.mut }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.a2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>{f}</li>)}</ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Cta() {
  return (
    <section style={{ padding: '20px 20px 72px' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', borderRadius: 24, border: '1px solid rgba(16,185,129,0.28)', background: 'linear-gradient(135deg, rgba(16,185,129,0.12), transparent)', padding: '54px 28px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.9rem,4vw,2.7rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px' }}>Start earning 4.5% today</h2>
        <p style={{ color: T.mut, fontSize: '1.05rem', maxWidth: 440, margin: '0 auto 26px' }}>Open a free account in two minutes. Your money starts working immediately.</p>
        <a href="#pricing" style={{ display: 'inline-block', background: grad, borderRadius: 12, padding: '14px 30px', fontSize: 15, fontWeight: 700, color: '#022c1e', textDecoration: 'none' }}>Open free account</a>
      </div>
    </section>
  );
}

function Section({ id, mobile, tag, title, sub, alt, children }: { id: string; mobile: boolean; tag: string; title: string; sub: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: mobile ? '52px 20px' : '78px 20px', background: alt ? '#061019' : T.bg, borderTop: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: mobile ? 34 : 50 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: T.a2 }}>{tag}</span>
          <h2 style={{ fontSize: mobile ? '1.7rem' : '2.4rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '10px 0 10px' }}>{title}</h2>
          <p style={{ color: T.dim, fontSize: '1.03rem', maxWidth: 520, margin: '0 auto' }}>{sub}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function Foot({ mobile }: { mobile: boolean }) {
  const cols = [['Product', ['Checking', 'Investing', 'Card', 'Pricing']], ['Company', ['About', 'Careers', 'Press', 'Contact']], ['Legal', ['Privacy', 'Terms', 'Disclosures', 'FDIC']]] as const;
  return (
    <footer style={{ borderTop: `1px solid ${T.line}`, background: T.bg, padding: '48px 20px 28px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: mobile ? 'block' : 'flex', justifyContent: 'space-between', gap: 40, marginBottom: 30 }}>
          <div style={{ maxWidth: 280, marginBottom: mobile ? 28 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}><div style={{ width: 28, height: 28, borderRadius: 8, background: grad }} /><span style={{ fontWeight: 800, fontSize: 16 }}>Vault</span></div>
            <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.7 }}>Modern banking that grows your money. Member FDIC.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3,auto)', gap: mobile ? 24 : 56 }}>
            {cols.map(([t, ls]) => (
              <div key={t}><h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.dim, marginBottom: 12 }}>{t}</h4><ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>{ls.map(l => <li key={l}><a href="#features" style={{ fontSize: 14, color: '#3a5548', textDecoration: 'none' }}>{l}</a></li>)}</ul></div>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 11, color: '#33473e', lineHeight: 1.6, marginBottom: 18 }}>Vault is a financial technology company, not a bank. Banking services provided by Partner Bank, Member FDIC. APY accurate as of publication and subject to change.</p>
        <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 18, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#33473e' }}>© {new Date().getFullYear()} Vault Financial, Inc.</span>
          <div style={{ display: 'flex', gap: 18 }}>{['Twitter', 'Instagram', 'LinkedIn'].map(s => <a key={s} href="#features" style={{ fontSize: 13, color: '#33473e', textDecoration: 'none' }}>{s}</a>)}</div>
        </div>
      </div>
    </footer>
  );
}
