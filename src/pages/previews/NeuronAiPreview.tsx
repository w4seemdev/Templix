/* ============================================================
   NEURON — AI Platform Landing Template
   Near-black with cyan/violet accent. Self-contained, inline
   styles only, fully responsive (375px → 1280px).
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

const T = { bg: '#060815', panel: '#0b0f22', line: 'rgba(255,255,255,0.08)', ink: '#f4f7ff', mut: '#9aa6c9', dim: '#5c6684', a: '#22d3ee', a2: '#a855f7' };
const grad = 'linear-gradient(120deg, #22d3ee, #a855f7)';
const NAV = [['Platform', 'platform'], ['Models', 'models'], ['Pricing', 'pricing'], ['Docs', 'platform']] as const;

export default function NeuronAiPreview() {
  const mobile = useIsMobile();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, color: T.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav mobile={mobile} />
      <Hero mobile={mobile} />
      <Capabilities mobile={mobile} />
      <Benchmarks mobile={mobile} />
      <Pricing mobile={mobile} />
      <Cta />
      <Foot mobile={mobile} />
    </div>
  );
}

function Nav({ mobile }: { mobile: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${T.line}`, background: 'rgba(6,8,21,0.82)', backdropFilter: 'blur(16px)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#050813" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="5" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="18" r="2" /><path d="M12 7v4M12 11l-6 5M12 11l6 5" /></svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>Neuron</span>
        </div>
        {!mobile && <nav style={{ display: 'flex', gap: 28 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} style={{ fontSize: 14, color: T.mut, textDecoration: 'none' }}>{l}</a>)}</nav>}
        {!mobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <a href="#pricing" style={{ fontSize: 14, color: T.mut, textDecoration: 'none' }}>Sign in</a>
            <a href="#pricing" style={{ background: grad, borderRadius: 10, padding: '9px 18px', fontSize: 14, fontWeight: 700, color: '#050813', textDecoration: 'none' }}>Get API key</a>
          </div>
        ) : (
          <button aria-label="Menu" onClick={() => setOpen(o => !o)} style={{ background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 8, padding: 8, cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M3 6h18M3 12h18M3 18h18'} /></svg>
          </button>
        )}
      </div>
      {mobile && open && <div style={{ padding: '8px 20px 18px', borderTop: `1px solid ${T.line}`, display: 'flex', flexDirection: 'column', gap: 4 }}>{NAV.map(([l, h]) => <a key={l} href={`#${h}`} onClick={() => setOpen(false)} style={{ padding: '10px 0', fontSize: 15, color: T.mut, textDecoration: 'none' }}>{l}</a>)}<a href="#pricing" onClick={() => setOpen(false)} style={{ marginTop: 8, textAlign: 'center', background: grad, borderRadius: 10, padding: 11, fontSize: 14, fontWeight: 700, color: '#050813', textDecoration: 'none' }}>Get API key</a></div>}
    </header>
  );
}

function Hero({ mobile }: { mobile: boolean }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: mobile ? '48px 20px 36px' : '80px 20px 56px' }}>
      <div style={{ position: 'absolute', top: -140, right: -80, width: 520, height: 520, background: 'radial-gradient(circle, rgba(168,85,247,0.18), transparent 68%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 40, left: -100, width: 460, height: 460, background: 'radial-gradient(circle, rgba(34,211,238,0.14), transparent 68%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1120, margin: '0 auto', position: 'relative', display: mobile ? 'block' : 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 44, alignItems: 'center' }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${T.line}`, background: 'rgba(255,255,255,0.03)', borderRadius: 9999, padding: '6px 14px', fontSize: 13, color: T.a }}>Neuron-4 now with 200K context</span>
          <h1 style={{ fontSize: mobile ? '2.3rem' : '3.6rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.06, margin: '20px 0 0' }}>
            Ship <span style={{ background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI features</span> without the infra
          </h1>
          <p style={{ fontSize: mobile ? '1rem' : '1.12rem', color: T.mut, lineHeight: 1.7, margin: '18px 0 0', maxWidth: 460 }}>
            One API for frontier reasoning, embeddings, and vision. Sub-second latency, streaming responses, and a 99.99% SLA.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <a href="#pricing" style={{ background: grad, borderRadius: 12, padding: '13px 24px', fontSize: 15, fontWeight: 700, color: '#050813', textDecoration: 'none' }}>Start building free</a>
            <a href="#models" style={{ border: `1px solid ${T.line}`, borderRadius: 12, padding: '13px 24px', fontSize: 15, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>View benchmarks</a>
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 30, flexWrap: 'wrap' }}>
            {[['1M+', 'requests/day'], ['<400ms', 'p50 latency'], ['99.99%', 'uptime']].map(([v, l]) => (
              <div key={l}><div style={{ fontSize: 22, fontWeight: 800 }}>{v}</div><div style={{ fontSize: 12, color: T.dim }}>{l}</div></div>
            ))}
          </div>
        </div>
        <Console mobile={mobile} />
      </div>
    </section>
  );
}

function Console({ mobile }: { mobile: boolean }) {
  return (
    <div style={{ marginTop: mobile ? 36 : 0, borderRadius: 16, border: `1px solid ${T.line}`, background: T.panel, overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,0.55), 0 0 60px rgba(34,211,238,0.1)', fontFamily: "'SF Mono', ui-monospace, monospace" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '11px 14px', borderBottom: `1px solid ${T.line}`, background: '#080b1a' }}>
        {['#ff5f57', '#febc2e', '#28c840'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
        <span style={{ marginLeft: 10, fontSize: 11, color: T.dim }}>playground — neuron-4</span>
      </div>
      <div style={{ padding: 18, fontSize: 12.5, lineHeight: 1.8 }}>
        <div style={{ color: T.dim }}>{'>'} POST /v1/chat</div>
        <div style={{ color: T.a2, marginTop: 6 }}>user:</div>
        <div style={{ color: T.mut }}>Summarize this contract and flag risky clauses.</div>
        <div style={{ color: T.a, marginTop: 12 }}>neuron-4:</div>
        <div style={{ color: '#dbe4ff', marginTop: 2 }}>3 key risks found:</div>
        {['Auto-renewal with 90-day notice (§7.2)', 'Unlimited liability on data breach (§11)', 'Non-compete extends 24 months (§14)'].map((r, i) => (
          <div key={i} style={{ color: '#dbe4ff', display: 'flex', gap: 8, marginTop: 3 }}><span style={{ color: T.a }}>{i + 1}.</span>{r}</div>
        ))}
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.a, boxShadow: `0 0 8px ${T.a}` }} />
          <span style={{ color: T.dim, fontSize: 11 }}>streamed 412 tokens · 0.38s</span>
        </div>
      </div>
    </div>
  );
}

const ICONS: Record<string, string> = {
  brain: 'M9.5 2a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM14.5 2a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5',
  vector: 'M4 4h6v6H4zM14 14h6v6h-6zM10 7h4M7 10v4',
  eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  bolt: 'M13 2L3 14h7l-1 8 10-12h-7z',
  code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
};
function CIcon({ name }: { name: string }) { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.a} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[name]} /></svg>; }

function Capabilities({ mobile }: { mobile: boolean }) {
  const items = [
    ['brain', 'Frontier reasoning', 'Neuron-4 tops independent evals on math, code, and long-document analysis.'],
    ['vector', 'Embeddings & RAG', 'Best-in-class retrieval embeddings with a managed vector store built in.'],
    ['eye', 'Multimodal vision', 'Parse screenshots, charts, and PDFs with pixel-accurate grounding.'],
    ['bolt', 'Streaming & tools', 'Token streaming, function calling, and structured JSON outputs by default.'],
    ['shield', 'Private by design', 'Zero data retention, SOC 2, and dedicated VPC deployments on request.'],
    ['code', 'SDKs for everything', 'First-class TypeScript, Python, and REST — go from key to prod in an hour.'],
  ];
  return (
    <Section id="platform" mobile={mobile} tag="Platform" title="Everything you need to build with AI" sub="A single, dependable API surface for every intelligent feature.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 16 }}>
        {items.map(([ic, t, d]) => (
          <div key={t} style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: 'rgba(255,255,255,0.02)', padding: 22 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><CIcon name={ic} /></div>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{t}</h3>
            <p style={{ fontSize: 14, color: T.dim, lineHeight: 1.65, margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Benchmarks({ mobile }: { mobile: boolean }) {
  const rows: [string, number, number][] = [['Reasoning (MMLU)', 91, 84], ['Code (HumanEval)', 88, 79], ['Math (GSM8K)', 95, 88], ['Long-context recall', 97, 82]];
  return (
    <Section id="models" mobile={mobile} alt tag="Benchmarks" title="Neuron-4 leads where it matters" sub="Independent evaluations vs. the leading open model.">
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {rows.map(([label, a, b]) => (
          <div key={label} style={{ marginBottom: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 7 }}>
              <span style={{ width: 60, fontSize: 12, color: T.a }}>Neuron-4</span>
              <div style={{ flex: 1, height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.06)' }}><div style={{ width: `${a}%`, height: '100%', borderRadius: 6, background: grad }} /></div>
              <span style={{ width: 34, fontSize: 12, fontWeight: 700 }}>{a}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 60, fontSize: 12, color: T.dim }}>Baseline</span>
              <div style={{ flex: 1, height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.06)' }}><div style={{ width: `${b}%`, height: '100%', borderRadius: 6, background: '#2a3350' }} /></div>
              <span style={{ width: 34, fontSize: 12, color: T.dim }}>{b}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Pricing({ mobile }: { mobile: boolean }) {
  const plans = [
    { name: 'Hobby', price: '$0', note: 'to start', desc: 'Prototype and learn.', feats: ['$5 free credit', '20 req/min', 'Community support'], hot: false },
    { name: 'Scale', price: '$0.60', note: '/1M tokens', desc: 'For production apps.', feats: ['Pay as you go', '2K req/min', 'Streaming & tools', 'Email support'], hot: true },
    { name: 'Enterprise', price: 'Custom', note: '', desc: 'Dedicated capacity.', feats: ['VPC deployment', 'Fine-tuning', '99.99% SLA', 'Solutions engineer'], hot: false },
  ];
  return (
    <Section id="pricing" mobile={mobile} tag="Pricing" title="Usage-based pricing" sub="Only pay for the tokens you use.">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 18, alignItems: 'start' }}>
        {plans.map(p => (
          <div key={p.name} style={{ borderRadius: 20, border: p.hot ? '1px solid rgba(34,211,238,0.5)' : `1px solid ${T.line}`, background: p.hot ? 'rgba(34,211,238,0.06)' : 'rgba(255,255,255,0.02)', padding: 26, position: 'relative' }}>
            {p.hot && <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: grad, borderRadius: 9999, padding: '3px 14px', fontSize: 12, fontWeight: 700, color: '#050813' }}>Most popular</div>}
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>{p.name}</h3>
            <p style={{ fontSize: 13, color: T.dim, margin: '0 0 16px' }}>{p.desc}</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, marginBottom: 18 }}><span style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em' }}>{p.price}</span><span style={{ fontSize: 13, color: T.dim, marginBottom: 8 }}>{p.note}</span></div>
            <a href="#pricing" style={{ display: 'block', textAlign: 'center', borderRadius: 10, padding: 11, fontSize: 14, fontWeight: 700, textDecoration: 'none', background: p.hot ? grad : 'rgba(255,255,255,0.06)', color: p.hot ? '#050813' : '#fff', marginBottom: 20 }}>{p.name === 'Enterprise' ? 'Contact sales' : 'Start now'}</a>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>{p.feats.map(f => <li key={f} style={{ display: 'flex', gap: 9, fontSize: 13, color: T.mut }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.a} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>{f}</li>)}</ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Cta() {
  return (
    <section style={{ padding: '20px 20px 72px' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', borderRadius: 24, border: '1px solid rgba(34,211,238,0.28)', background: 'linear-gradient(120deg, rgba(34,211,238,0.1), rgba(168,85,247,0.08))', padding: '54px 28px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.9rem,4vw,2.7rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px' }}>Build something intelligent</h2>
        <p style={{ color: T.mut, fontSize: '1.05rem', maxWidth: 440, margin: '0 auto 26px' }}>Get an API key in seconds. Your first $5 of usage is on us.</p>
        <a href="#pricing" style={{ display: 'inline-block', background: grad, borderRadius: 12, padding: '14px 30px', fontSize: 15, fontWeight: 700, color: '#050813', textDecoration: 'none' }}>Get your API key</a>
      </div>
    </section>
  );
}

function Section({ id, mobile, tag, title, sub, alt, children }: { id: string; mobile: boolean; tag: string; title: string; sub: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: mobile ? '52px 20px' : '80px 20px', background: alt ? '#080b1a' : T.bg, borderTop: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: mobile ? 34 : 52 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: T.a }}>{tag}</span>
          <h2 style={{ fontSize: mobile ? '1.7rem' : '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '10px 0 10px' }}>{title}</h2>
          <p style={{ color: T.dim, fontSize: '1.03rem', maxWidth: 520, margin: '0 auto' }}>{sub}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function Foot({ mobile }: { mobile: boolean }) {
  const cols = [['Product', ['Platform', 'Models', 'Pricing', 'Changelog']], ['Developers', ['Docs', 'API reference', 'SDKs', 'Status']], ['Company', ['About', 'Blog', 'Careers', 'Contact']]] as const;
  return (
    <footer style={{ borderTop: `1px solid ${T.line}`, background: T.bg, padding: '48px 20px 28px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ display: mobile ? 'block' : 'flex', justifyContent: 'space-between', gap: 40, marginBottom: 36 }}>
          <div style={{ maxWidth: 250, marginBottom: mobile ? 28 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}><div style={{ width: 28, height: 28, borderRadius: 8, background: grad }} /><span style={{ fontWeight: 800, fontSize: 16 }}>Neuron</span></div>
            <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.7 }}>Frontier AI models, delivered as a simple, reliable API.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3,auto)', gap: mobile ? 24 : 56 }}>
            {cols.map(([t, ls]) => (
              <div key={t}><h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.dim, marginBottom: 12 }}>{t}</h4><ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>{ls.map(l => <li key={l}><a href="#platform" style={{ fontSize: 14, color: '#3a4463', textDecoration: 'none' }}>{l}</a></li>)}</ul></div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 18, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#33405f' }}>© {new Date().getFullYear()} Neuron AI, Inc.</span>
          <div style={{ display: 'flex', gap: 18 }}>{['Twitter', 'GitHub', 'Discord'].map(s => <a key={s} href="#platform" style={{ fontSize: 13, color: '#33405f', textDecoration: 'none' }}>{s}</a>)}</div>
        </div>
      </div>
    </footer>
  );
}
