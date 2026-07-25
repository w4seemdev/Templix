/* ============================================================
   NEXUS - Corporate / Enterprise Template
   Light, professional theme with navy/blue accent.
   Self-contained, inline styles only, fully responsive.
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

const T = { bg: '#ffffff', alt: '#f6f8fc', line: '#e2e8f0', ink: '#0f172a', mut: '#475569', dim: '#94a3b8', a: '#2563eb', deep: '#1e3a8a' };
const NAV = [['Solutions', 'solutions'], ['Industries', 'industries'], ['Results', 'results'], ['About', 'about']] as const;

export default function NexusCorporatePreview() {
  const mobile = useIsMobile();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, color: T.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav mobile={mobile} />
      <Hero mobile={mobile} />
      <Logos />
      <Solutions mobile={mobile} />
      <Industries mobile={mobile} />
      <Results mobile={mobile} />
      <Testimonial mobile={mobile} />
      <Cta />
      <Foot mobile={mobile} />
    </div>
  );
}

function Nav({ mobile }: { mobile: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${T.line}`, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(14px)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: T.deep, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7v10l10 5 10-5V7z" /><path d="M12 12L2 7M12 12l10-5M12 12v10" /></svg>
          </div>
          <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-0.02em', color: T.deep }}>Nexus</span>
        </div>
        {!mobile && <nav style={{ display: 'flex', gap: 30 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} style={{ fontSize: 14, fontWeight: 500, color: T.mut, textDecoration: 'none' }}>{l}</a>)}</nav>}
        {!mobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href="#about" style={{ fontSize: 14, fontWeight: 500, color: T.mut, textDecoration: 'none' }}>Client login</a>
            <a href="#cta" style={{ background: T.a, borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>Book a call</a>
          </div>
        ) : (
          <button aria-label="Menu" onClick={() => setOpen(o => !o)} style={{ background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 8, padding: 8, cursor: 'pointer' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.ink} strokeWidth="2" strokeLinecap="round"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M3 6h18M3 12h18M3 18h18'} /></svg></button>
        )}
      </div>
      {mobile && open && <div style={{ padding: '8px 24px 18px', borderTop: `1px solid ${T.line}`, display: 'flex', flexDirection: 'column', gap: 4 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} onClick={() => setOpen(false)} style={{ padding: '10px 0', fontSize: 15, color: T.mut, textDecoration: 'none' }}>{l}</a>)}<a href="#cta" onClick={() => setOpen(false)} style={{ marginTop: 8, textAlign: 'center', background: T.a, borderRadius: 8, padding: 12, fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>Book a call</a></div>}
    </header>
  );
}

function Hero({ mobile }: { mobile: boolean }) {
  return (
    <section style={{ padding: mobile ? '48px 24px 40px' : '80px 24px 60px', background: T.bg }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: mobile ? 'block' : 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 48, alignItems: 'center' }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${T.line}`, background: T.alt, borderRadius: 9999, padding: '6px 14px', fontSize: 13, fontWeight: 500, color: T.a }}>Trusted by Fortune 500 teams</span>
          <h1 style={{ fontSize: mobile ? '2.4rem' : '3.6rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.08, margin: '20px 0 0', color: T.ink }}>
            Enterprise consulting that <span style={{ color: T.a }}>delivers</span>
          </h1>
          <p style={{ fontSize: mobile ? '1.05rem' : '1.18rem', color: T.mut, lineHeight: 1.7, margin: '18px 0 0', maxWidth: 480 }}>
            We help large organizations modernize operations, adopt cloud, and unlock growth - with measurable results in months, not years.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <a href="#cta" style={{ background: T.a, borderRadius: 8, padding: '13px 26px', fontSize: 15, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>Schedule a consultation</a>
            <a href="#solutions" style={{ border: `1px solid ${T.line}`, borderRadius: 8, padding: '13px 26px', fontSize: 15, fontWeight: 600, color: T.ink, textDecoration: 'none' }}>Explore solutions</a>
          </div>
        </div>
        <div style={{ marginTop: mobile ? 40 : 0, borderRadius: 18, border: `1px solid ${T.line}`, background: T.alt, padding: mobile ? 24 : 30, boxShadow: '0 30px 60px rgba(15,23,42,0.08)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[['Revenue growth', '+34%', T.a], ['Cost reduced', '−28%', '#0ea5e9'], ['Time to market', '3.2×', T.deep], ['NPS uplift', '+41', '#16a34a']].map(([l, v, col]) => (
              <div key={l} style={{ background: T.bg, border: `1px solid ${T.line}`, borderRadius: 12, padding: 18 }}>
                <div style={{ fontSize: 12, color: T.dim }}>{l}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em', color: col as string, marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, background: T.bg, border: `1px solid ${T.line}`, borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 12, color: T.dim, marginBottom: 10 }}>Client value delivered · 2020-2025</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 60 }}>
              {[40, 55, 48, 70, 82, 95].map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '4px 4px 0 0', background: i === 5 ? T.a : '#c7d5f0' }} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Logos() {
  return (
    <section style={{ borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, padding: '30px 24px', background: T.alt }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <p style={{ textAlign: 'center', fontSize: 12, color: T.dim, marginBottom: 18, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Chosen by industry leaders</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px 44px', flexWrap: 'wrap' }}>
          {['Meridian', 'Halcyon', 'Vantage', 'Crestline', 'Ardent', 'Solstice'].map(n => <span key={n} style={{ fontSize: 17, fontWeight: 700, color: '#b4c0d4', letterSpacing: '-0.02em' }}>{n}</span>)}
        </div>
      </div>
    </section>
  );
}

const ICONS: Record<string, string> = {
  cloud: 'M18 10a4 4 0 0 0-7.7-1.3A3.5 3.5 0 1 0 6 15h12a3 3 0 0 0 0-6z',
  cog: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V22',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  chart: 'M3 3v18h18M7 15l3-3 3 3 5-6',
  bulb: 'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z',
  data: 'M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7',
};
function NIcon({ name }: { name: string }) { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.a} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[name]} /></svg>; }

function Solutions({ mobile }: { mobile: boolean }) {
  const items = [
    ['cloud', 'Cloud transformation', 'Migrate legacy systems to secure, scalable cloud infrastructure with zero downtime.'],
    ['cog', 'Operations & automation', 'Streamline workflows and automate manual processes to cut cost and error.'],
    ['data', 'Data & analytics', 'Turn scattered data into a single source of truth that leadership can act on.'],
    ['shield', 'Cybersecurity', 'Assess, harden, and monitor your environment against modern threats.'],
    ['bulb', 'Digital strategy', 'Define a clear roadmap that aligns technology investment with business goals.'],
    ['chart', 'Change management', 'Bring your people along with structured training, communication, and support.'],
  ];
  return (
    <Section id="solutions" mobile={mobile} tag="Solutions" title="Expertise across the enterprise" sub="End-to-end services that move the metrics that matter.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 18 }}>
        {items.map(([ic, t, d]) => (
          <div key={t} style={{ borderRadius: 14, border: `1px solid ${T.line}`, background: T.bg, padding: 24, boxShadow: '0 1px 2px rgba(15,23,42,0.04)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#eef4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><NIcon name={ic} /></div>
            <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 8px' }}>{t}</h3>
            <p style={{ fontSize: 14, color: T.mut, lineHeight: 1.65, margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Industries({ mobile }: { mobile: boolean }) {
  const inds = ['Financial services', 'Healthcare', 'Manufacturing', 'Retail & CPG', 'Energy & utilities', 'Public sector', 'Telecom', 'Logistics'];
  return (
    <Section id="industries" mobile={mobile} alt tag="Industries" title="Deep experience in your sector" sub="We speak your industry's language and its regulations.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 14 }}>
        {inds.map(name => (
          <div key={name} style={{ borderRadius: 12, border: `1px solid ${T.line}`, background: T.bg, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.a, flexShrink: 0 }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{name}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Results({ mobile }: { mobile: boolean }) {
  const stats: [string, string][] = [['$4.2B', 'Client value created'], ['500+', 'Engagements delivered'], ['96%', 'Client retention'], ['30', 'Countries served']];
  return (
    <section id="results" style={{ padding: mobile ? '56px 24px' : '76px 24px', background: T.deep, color: '#fff' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#93c5fd' }}>Results</span>
          <h2 style={{ fontSize: mobile ? '1.8rem' : '2.4rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '10px 0 0' }}>Outcomes we're proud of</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 24 }}>
          {stats.map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: mobile ? '2.2rem' : '3rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>{v}</div>
              <div style={{ fontSize: 14, color: '#bfd3f5', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial({ mobile }: { mobile: boolean }) {
  return (
    <Section id="about" mobile={mobile} tag="Client story" title="What partnership looks like" sub="">
      <div style={{ maxWidth: 800, margin: '0 auto', borderRadius: 18, border: `1px solid ${T.line}`, background: T.bg, padding: mobile ? 28 : 40, textAlign: 'center', boxShadow: '0 10px 30px rgba(15,23,42,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 3, marginBottom: 18 }}>{[0, 1, 2, 3, 4].map(i => <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l3 6.5 7 .6-5.3 4.6 1.6 6.8L12 17l-6 3.5 1.6-6.8L2 9.1l7-.6z" /></svg>)}</div>
        <p style={{ fontSize: mobile ? '1.15rem' : '1.4rem', fontWeight: 500, lineHeight: 1.5, color: T.ink, margin: '0 0 22px' }}>
          “Nexus modernized our core platform in eight months and cut infrastructure costs by nearly a third. They felt like part of our team from day one.”
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ width: 46, height: 46, borderRadius: '50%', background: T.deep, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: '#fff' }}>DH</div>
          <div style={{ textAlign: 'left' }}><div style={{ fontSize: 15, fontWeight: 700 }}>Diana Hoffmann</div><div style={{ fontSize: 13, color: T.dim }}>CTO, Meridian Financial</div></div>
        </div>
      </div>
    </Section>
  );
}

function Cta() {
  return (
    <section id="cta" style={{ padding: '20px 24px 76px', background: T.bg }}>
      <div style={{ maxWidth: 1000, margin: '40px auto 0', borderRadius: 20, background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', padding: '54px 32px', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ fontSize: 'clamp(1.9rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px' }}>Let's build your advantage</h2>
        <p style={{ color: '#dbe6fb', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto 28px' }}>Book a no-obligation consultation with a Nexus principal and get a tailored roadmap.</p>
        <a href="#cta" style={{ display: 'inline-block', background: '#fff', color: T.deep, borderRadius: 8, padding: '14px 30px', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>Schedule a consultation</a>
      </div>
    </section>
  );
}

function Section({ id, mobile, tag, title, sub, alt, children }: { id: string; mobile: boolean; tag: string; title: string; sub: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: mobile ? '52px 24px' : '78px 24px', background: alt ? T.alt : T.bg, borderTop: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: mobile ? 32 : 48 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: T.a }}>{tag}</span>
          <h2 style={{ fontSize: mobile ? '1.8rem' : '2.4rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '10px 0 10px', color: T.ink }}>{title}</h2>
          {sub && <p style={{ color: T.mut, fontSize: '1.03rem', maxWidth: 520, margin: '0 auto' }}>{sub}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function Foot({ mobile }: { mobile: boolean }) {
  const cols = [['Solutions', ['Cloud', 'Operations', 'Data', 'Security']], ['Company', ['About', 'Leadership', 'Careers', 'Newsroom']], ['Resources', ['Insights', 'Case studies', 'Events', 'Contact']]] as const;
  return (
    <footer style={{ borderTop: `1px solid ${T.line}`, background: T.alt, padding: '48px 24px 28px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: mobile ? 'block' : 'flex', justifyContent: 'space-between', gap: 40, marginBottom: 36 }}>
          <div style={{ maxWidth: 260, marginBottom: mobile ? 28 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: T.deep }} /><span style={{ fontWeight: 800, fontSize: 16, color: T.deep }}>Nexus</span></div>
            <p style={{ fontSize: 13, color: T.mut, lineHeight: 1.7 }}>Enterprise consulting for organizations ready to lead their market.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3,auto)', gap: mobile ? 24 : 56 }}>
            {cols.map(([t, ls]) => (
              <div key={t}><h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: T.dim, marginBottom: 12 }}>{t}</h4><ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>{ls.map(l => <li key={l}><a href="#solutions" style={{ fontSize: 14, color: T.mut, textDecoration: 'none' }}>{l}</a></li>)}</ul></div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 18, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: T.dim }}>© {new Date().getFullYear()} Nexus Consulting Group.</span>
          <div style={{ display: 'flex', gap: 18 }}>{['LinkedIn', 'X', 'YouTube'].map(s => <a key={s} href="#solutions" style={{ fontSize: 13, color: T.dim, textDecoration: 'none' }}>{s}</a>)}</div>
        </div>
      </div>
    </footer>
  );
}
