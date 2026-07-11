/* ============================================================
   ATLAS — Location Platform Landing Template
   Dark slate theme with sky/cyan accent + inline-SVG map.
   Self-contained, inline styles only, fully responsive.
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

const T = { bg: '#0b1220', panel: '#0f172a', line: 'rgba(255,255,255,0.08)', ink: '#f0f6ff', mut: '#93a4c3', dim: '#5b6b8a', a: '#0ea5e9', a2: '#38bdf8' };
const grad = 'linear-gradient(135deg, #0ea5e9, #6366f1)';
const NAV = [['Product', 'product'], ['Use cases', 'cases'], ['Coverage', 'coverage'], ['Pricing', 'pricing']] as const;

export default function AtlasMapSaasPreview() {
  const mobile = useIsMobile();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, color: T.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav mobile={mobile} />
      <Hero mobile={mobile} />
      <Features mobile={mobile} />
      <Cases mobile={mobile} />
      <Coverage mobile={mobile} />
      <Pricing mobile={mobile} />
      <Cta />
      <Foot mobile={mobile} />
    </div>
  );
}

function Nav({ mobile }: { mobile: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${T.line}`, background: 'rgba(11,18,32,0.82)', backdropFilter: 'blur(16px)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-6-5.5-6-10a6 6 0 0 1 12 0c0 4.5-6 10-6 10z" /><circle cx="12" cy="11" r="2" /></svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>Atlas</span>
        </div>
        {!mobile && <nav style={{ display: 'flex', gap: 28 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} style={{ fontSize: 14, color: T.mut, textDecoration: 'none' }}>{l}</a>)}</nav>}
        {!mobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <a href="#pricing" style={{ fontSize: 14, color: T.mut, textDecoration: 'none' }}>Sign in</a>
            <a href="#pricing" style={{ background: grad, borderRadius: 10, padding: '9px 18px', fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>Get API key</a>
          </div>
        ) : (
          <button aria-label="Menu" onClick={() => setOpen(o => !o)} style={{ background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 8, padding: 8, cursor: 'pointer' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M3 6h18M3 12h18M3 18h18'} /></svg></button>
        )}
      </div>
      {mobile && open && <div style={{ padding: '8px 20px 18px', borderTop: `1px solid ${T.line}`, display: 'flex', flexDirection: 'column', gap: 4 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} onClick={() => setOpen(false)} style={{ padding: '10px 0', fontSize: 15, color: T.mut, textDecoration: 'none' }}>{l}</a>)}<a href="#pricing" onClick={() => setOpen(false)} style={{ marginTop: 8, textAlign: 'center', background: grad, borderRadius: 10, padding: 11, fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>Get API key</a></div>}
    </header>
  );
}

function Hero({ mobile }: { mobile: boolean }) {
  return (
    <section style={{ padding: mobile ? '48px 20px 36px' : '78px 20px 52px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', display: mobile ? 'block' : 'grid', gridTemplateColumns: '1fr 1fr', gap: 44, alignItems: 'center' }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${T.line}`, background: 'rgba(14,165,233,0.08)', borderRadius: 9999, padding: '6px 14px', fontSize: 13, color: T.a2 }}>Maps, geocoding & routing — one API</span>
          <h1 style={{ fontSize: mobile ? '2.3rem' : '3.5rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.07, margin: '20px 0 0' }}>
            Location intelligence,<br /><span style={{ background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>built for developers</span>
          </h1>
          <p style={{ fontSize: mobile ? '1rem' : '1.12rem', color: T.mut, lineHeight: 1.7, margin: '18px 0 0', maxWidth: 470 }}>
            Drop-in maps, address autocomplete, and turn-by-turn routing with a generous free tier and no vendor lock-in.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
            <a href="#pricing" style={{ background: grad, borderRadius: 12, padding: '13px 24px', fontSize: 15, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>Start free</a>
            <a href="#product" style={{ border: `1px solid ${T.line}`, borderRadius: 12, padding: '13px 24px', fontSize: 15, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>Live demo</a>
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 28, flexWrap: 'wrap' }}>
            {[['220+', 'countries'], ['<50ms', 'geocode p50'], ['100K', 'free req/mo']].map(([v, l]) => (
              <div key={l}><div style={{ fontSize: 22, fontWeight: 800 }}>{v}</div><div style={{ fontSize: 12, color: T.dim }}>{l}</div></div>
            ))}
          </div>
        </div>
        <MapMock mobile={mobile} />
      </div>
    </section>
  );
}

function MapMock({ mobile }: { mobile: boolean }) {
  const pins = [[70, 90], [180, 60], [250, 140], [120, 170], [300, 90]];
  return (
    <div style={{ marginTop: mobile ? 34 : 0, borderRadius: 16, border: `1px solid ${T.line}`, overflow: 'hidden', background: '#0a1120', boxShadow: '0 40px 90px rgba(0,0,0,0.5), 0 0 60px rgba(14,165,233,0.1)' }}>
      <svg viewBox="0 0 360 240" width="100%" style={{ display: 'block' }}>
        <rect width="360" height="240" fill="#0a1120" />
        {Array.from({ length: 10 }).map((_, i) => <line key={'h' + i} x1="0" y1={i * 26} x2="360" y2={i * 26} stroke="rgba(255,255,255,0.04)" />)}
        {Array.from({ length: 14 }).map((_, i) => <line key={'v' + i} x1={i * 28} y1="0" x2={i * 28} y2="240" stroke="rgba(255,255,255,0.04)" />)}
        <path d="M20 200 C 90 150, 90 150, 160 160 S 280 120, 340 60" fill="none" stroke="rgba(20,50,80,0.9)" strokeWidth="18" strokeLinecap="round" />
        <path d="M20 200 C 90 150, 90 150, 160 160 S 280 120, 340 60" fill="none" stroke={T.a} strokeWidth="3" strokeLinecap="round" strokeDasharray="8 7" />
        {pins.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="14" fill="rgba(14,165,233,0.15)" />
            <path d={`M${x} ${y - 10} C ${x - 6} ${y - 10} ${x - 6} ${y - 2} ${x} ${y + 4} C ${x + 6} ${y - 2} ${x + 6} ${y - 10} ${x} ${y - 10} Z`} fill={i === 2 ? '#6366f1' : T.a} />
            <circle cx={x} cy={y - 6} r="2" fill="#0a1120" />
          </g>
        ))}
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderTop: `1px solid ${T.line}` }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(14,165,233,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.a2} strokeWidth="2"><path d="M12 2v20M2 12h20" strokeLinecap="round" /></svg></div>
        <div><div style={{ fontSize: 13, fontWeight: 600 }}>Route optimized · 5 stops</div><div style={{ fontSize: 11, color: T.dim }}>18.4 km · 27 min · ETA 3:42 PM</div></div>
      </div>
    </div>
  );
}

const ICONS: Record<string, string> = {
  pin: 'M12 21s-6-5.5-6-10a6 6 0 0 1 12 0c0 4.5-6 10-6 10zM12 11h.01',
  route: 'M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM9 16h6a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35',
  layers: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  bolt: 'M13 2L3 14h7l-1 8 10-12h-7z',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z',
};
function AIcon({ name }: { name: string }) { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.a2} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[name]} /></svg>; }

function Features({ mobile }: { mobile: boolean }) {
  const items = [
    ['pin', 'Interactive maps', 'Vector tiles, custom styles, and 60fps rendering on web and mobile.'],
    ['search', 'Geocoding & autocomplete', 'Turn any address into coordinates — and back — with typo tolerance.'],
    ['route', 'Routing & ETAs', 'Traffic-aware directions and multi-stop route optimization out of the box.'],
    ['layers', 'Custom overlays', 'Heatmaps, clusters, and GeoJSON layers you can style with a few lines.'],
    ['bolt', 'Edge-fast', 'Tiles and APIs served from 40+ POPs so maps load instantly everywhere.'],
    ['globe', 'Global coverage', 'Fresh data for 220+ countries, updated weekly from trusted sources.'],
  ];
  return (
    <Section id="product" mobile={mobile} tag="Product" title="A complete mapping toolkit" sub="Everything you need to put location in your app.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 16 }}>
        {items.map(([ic, t, d]) => (
          <div key={t} style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: T.panel, padding: 22 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><AIcon name={ic} /></div>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{t}</h3>
            <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.65, margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Cases({ mobile }: { mobile: boolean }) {
  const cases = [
    ['Delivery & logistics', 'Optimize routes for fleets, track drivers live, and share accurate ETAs with customers.'],
    ['Store locators', 'Help users find the nearest branch with search, clustering, and directions in minutes.'],
    ['Real estate', 'Render property maps with neighborhood layers, isochrones, and points of interest.'],
    ['Field services', 'Dispatch technicians, geofence job sites, and log location history for compliance.'],
  ];
  return (
    <Section id="cases" mobile={mobile} alt tag="Use cases" title="Powering location in every industry" sub="From the first pin to a nationwide fleet.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2,1fr)', gap: 16 }}>
        {cases.map(([t, d]) => (
          <div key={t} style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: T.panel, padding: 24, display: 'flex', gap: 16 }}>
            <div style={{ width: 8, borderRadius: 4, background: grad, flexShrink: 0 }} />
            <div><h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 8px' }}>{t}</h3><p style={{ fontSize: 14, color: T.dim, lineHeight: 1.7, margin: 0 }}>{d}</p></div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Coverage({ mobile }: { mobile: boolean }) {
  const stats: [string, string][] = [['220+', 'Countries & territories'], ['150M', 'Points of interest'], ['40+', 'Edge locations'], ['99.99%', 'API uptime SLA']];
  return (
    <Section id="coverage" mobile={mobile} tag="Coverage" title="Trusted at global scale" sub="Data and infrastructure that go where your users are.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 16 }}>
        {stats.map(([v, l]) => (
          <div key={l} style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: T.panel, padding: 26, textAlign: 'center' }}>
            <div style={{ fontSize: mobile ? '1.8rem' : '2.3rem', fontWeight: 800, letterSpacing: '-0.03em', background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</div>
            <div style={{ fontSize: 13, color: T.mut, marginTop: 6 }}>{l}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Pricing({ mobile }: { mobile: boolean }) {
  const plans = [
    { name: 'Free', price: '$0', note: '', desc: 'For prototypes.', feats: ['100K requests/mo', 'All map styles', 'Community support'], hot: false },
    { name: 'Growth', price: '$99', note: '/mo', desc: 'For growing products.', feats: ['1M requests/mo', 'Routing & optimization', 'Custom styles', 'Email support'], hot: true },
    { name: 'Scale', price: 'Custom', note: '', desc: 'For high volume.', feats: ['Volume discounts', 'SLA & SSO', 'On-prem tiles', 'Solutions engineer'], hot: false },
  ];
  return (
    <Section id="pricing" mobile={mobile} alt tag="Pricing" title="Fair, predictable pricing" sub="A free tier that actually gets you to launch.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 18, alignItems: 'start' }}>
        {plans.map(p => (
          <div key={p.name} style={{ borderRadius: 20, border: p.hot ? '1px solid rgba(14,165,233,0.5)' : `1px solid ${T.line}`, background: p.hot ? 'rgba(14,165,233,0.06)' : T.panel, padding: 26, position: 'relative' }}>
            {p.hot && <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: grad, borderRadius: 9999, padding: '3px 14px', fontSize: 12, fontWeight: 600 }}>Most popular</div>}
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>{p.name}</h3>
            <p style={{ fontSize: 13, color: T.dim, margin: '0 0 16px' }}>{p.desc}</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, marginBottom: 18 }}><span style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em' }}>{p.price}</span><span style={{ fontSize: 13, color: T.dim, marginBottom: 8 }}>{p.note}</span></div>
            <a href="#pricing" style={{ display: 'block', textAlign: 'center', borderRadius: 10, padding: 11, fontSize: 14, fontWeight: 600, textDecoration: 'none', background: p.hot ? grad : 'rgba(255,255,255,0.06)', color: '#fff', marginBottom: 20 }}>{p.name === 'Scale' ? 'Contact sales' : 'Start now'}</a>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>{p.feats.map(f => <li key={f} style={{ display: 'flex', gap: 9, fontSize: 13, color: T.mut }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.a2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>{f}</li>)}</ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Cta() {
  return (
    <section style={{ padding: '20px 20px 72px' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', borderRadius: 24, border: '1px solid rgba(14,165,233,0.28)', background: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(99,102,241,0.08))', padding: '54px 28px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.9rem,4vw,2.7rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px' }}>Put your product on the map</h2>
        <p style={{ color: T.mut, fontSize: '1.05rem', maxWidth: 440, margin: '0 auto 26px' }}>Sign up and drop your first map in under five minutes.</p>
        <a href="#pricing" style={{ display: 'inline-block', background: grad, borderRadius: 12, padding: '14px 30px', fontSize: 15, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>Get your free API key</a>
      </div>
    </section>
  );
}

function Section({ id, mobile, tag, title, sub, alt, children }: { id: string; mobile: boolean; tag: string; title: string; sub: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: mobile ? '52px 20px' : '78px 20px', background: alt ? '#0f172a' : T.bg, borderTop: `1px solid ${T.line}` }}>
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
  const cols = [['Product', ['Maps', 'Geocoding', 'Routing', 'Pricing']], ['Developers', ['Docs', 'SDKs', 'Status', 'Changelog']], ['Company', ['About', 'Blog', 'Careers', 'Contact']]] as const;
  return (
    <footer style={{ borderTop: `1px solid ${T.line}`, background: T.bg, padding: '48px 20px 28px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: mobile ? 'block' : 'flex', justifyContent: 'space-between', gap: 40, marginBottom: 36 }}>
          <div style={{ maxWidth: 250, marginBottom: mobile ? 28 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}><div style={{ width: 28, height: 28, borderRadius: 8, background: grad }} /><span style={{ fontWeight: 800, fontSize: 16 }}>Atlas</span></div>
            <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.7 }}>The developer-first location platform.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3,auto)', gap: mobile ? 24 : 56 }}>
            {cols.map(([t, ls]) => (
              <div key={t}><h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.dim, marginBottom: 12 }}>{t}</h4><ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>{ls.map(l => <li key={l}><a href="#product" style={{ fontSize: 14, color: '#3a4763', textDecoration: 'none' }}>{l}</a></li>)}</ul></div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 18, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#33405c' }}>© {new Date().getFullYear()} Atlas Labs, Inc.</span>
          <div style={{ display: 'flex', gap: 18 }}>{['Twitter', 'GitHub', 'LinkedIn'].map(s => <a key={s} href="#product" style={{ fontSize: 13, color: '#33405c', textDecoration: 'none' }}>{s}</a>)}</div>
        </div>
      </div>
    </footer>
  );
}
