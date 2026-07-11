/* ============================================================
   REMOTEBASE — Remote tech job board template
   Cyan · search-forward listing layout
   Self-contained, fully responsive, no external assets.
   ============================================================ */

import { useState, useEffect } from 'react';

const CYAN = '#0891b2';
const CYAN_DK = '#0e7490';
const INK = '#0f172a';
const MUTED = '#64748b';
const BORDER = '#e2e8f0';
const SOFT = '#ecfeff';

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

const nav = ['Find jobs', 'Companies', 'Salaries', 'Resources'];
const filters = ['All', 'Engineering', 'Design', 'Marketing', 'Data', 'Product'];

const jobs = [
  { title: 'Senior Product Designer', company: 'Stripe', mono: 'St', color: '#635bff', loc: 'Remote · Global', salary: '$140–180K', type: 'Full-time', tags: ['Figma', 'Design Systems', 'B2B'], posted: '2d ago' },
  { title: 'Staff Engineer, Platform', company: 'Linear', mono: 'Li', color: '#5e6ad2', loc: 'Remote · US / EU', salary: '$200–250K', type: 'Full-time', tags: ['Go', 'TypeScript', 'Infra'], posted: '3d ago' },
  { title: 'Head of Marketing', company: 'Notion', mono: 'No', color: '#0f172a', loc: 'Remote · Americas', salary: '$160–200K', type: 'Full-time', tags: ['B2B SaaS', 'Growth', 'Brand'], posted: '5d ago' },
  { title: 'iOS Engineer', company: 'Vercel', mono: 'Ve', color: '#111', loc: 'Remote · Global', salary: '$130–160K', type: 'Full-time', tags: ['Swift', 'SwiftUI'], posted: '1w ago' },
  { title: 'Data Scientist', company: 'Cohere', mono: 'Co', color: '#39594d', loc: 'Remote · EU', salary: '$120–155K', type: 'Full-time', tags: ['Python', 'ML', 'NLP'], posted: '1w ago' },
];

const companies = [
  { name: 'Stripe', mono: 'St', color: '#635bff', open: 24 },
  { name: 'Linear', mono: 'Li', color: '#5e6ad2', open: 11 },
  { name: 'Notion', mono: 'No', color: '#0f172a', open: 18 },
  { name: 'Vercel', mono: 'Ve', color: '#111', open: 9 },
  { name: 'Figma', mono: 'Fi', color: '#f24e1e', open: 15 },
  { name: 'Cohere', mono: 'Co', color: '#39594d', open: 7 },
];

const categories = [
  { icon: 'code', name: 'Engineering', count: 640 },
  { icon: 'pen', name: 'Design', count: 180 },
  { icon: 'chart', name: 'Marketing', count: 210 },
  { icon: 'data', name: 'Data & AI', count: 150 },
  { icon: 'box', name: 'Product', count: 130 },
  { icon: 'headset', name: 'Support', count: 90 },
];

function Mono({ mono, color, size }: { mono: string; color: string; size: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size / 4, background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size / 2.4, fontWeight: 800, flexShrink: 0, letterSpacing: '-0.02em' }}>{mono}</div>
  );
}

function CatIcon({ name }: { name: string }) {
  const s = { fill: 'none', stroke: CYAN, strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...s}>
      {name === 'code' && <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>}
      {name === 'pen' && <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />}
      {name === 'chart' && <><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" /></>}
      {name === 'data' && <><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>}
      {name === 'box' && <><path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></>}
      {name === 'headset' && <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="2" y="14" width="4" height="6" rx="1" /><rect x="18" y="14" width="4" height="6" rx="1" /><path d="M20 20a4 4 0 0 1-4 3h-3" /></>}
    </svg>
  );
}

export default function JobBoardPreview() {
  const m = useIsMobile();
  const [filter, setFilter] = useState('All');
  const pad = m ? '0 1.25rem' : '0 2rem';

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#f8fafc', color: INK, minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: pad, height: '62px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: CYAN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
            </div>
            <span style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.02em' }}>Remote<span style={{ color: CYAN }}>Base</span></span>
          </div>
          {!m && <nav style={{ display: 'flex', gap: '1.5rem' }}>{nav.map(l => <a key={l} href="#jobs" style={{ fontSize: '14px', fontWeight: 500, color: MUTED, textDecoration: 'none' }}>{l}</a>)}</nav>}
          <button style={{ background: CYAN, color: '#fff', border: 'none', borderRadius: '9px', padding: m ? '8px 14px' : '8px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Post a job</button>
        </div>
      </header>

      {/* Hero search */}
      <section style={{ background: `linear-gradient(135deg, ${CYAN_DK} 0%, #155e75 100%)`, padding: m ? '2.75rem 1.25rem 3rem' : '4rem 2rem 3.5rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: m ? '2rem' : 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 0.75rem', lineHeight: 1.1 }}>
            Find your next remote role
          </h1>
          <p style={{ fontSize: m ? '0.95rem' : '1.05rem', color: 'rgba(255,255,255,0.78)', margin: '0 0 2rem' }}>1,400+ vetted remote jobs from teams that hire globally.</p>
          <div style={{ display: m ? 'grid' : 'flex', gridTemplateColumns: m ? '1fr' : undefined, gap: '8px', background: '#fff', borderRadius: '14px', padding: '8px', boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 12px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
              <span style={{ fontSize: '14px', color: MUTED }}>Job title, skill, or company…</span>
            </div>
            <div style={{ border: m ? `1px solid ${BORDER}` : 'none', borderLeft: m ? undefined : `1px solid ${BORDER}`, borderRadius: m ? '9px' : 0, padding: '9px 14px', fontSize: '13px', color: MUTED, display: 'flex', alignItems: 'center', fontWeight: 500 }}>Any location</div>
            <button style={{ background: CYAN, color: '#fff', border: 'none', borderRadius: '10px', padding: '11px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>Search</button>
          </div>
          <div style={{ display: 'flex', gap: m ? '1.5rem' : '2.5rem', justifyContent: 'center', marginTop: '1.75rem' }}>
            {[['1,400+', 'Open roles'], ['340+', 'Companies'], ['100%', 'Remote']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}><div style={{ fontSize: m ? '1.15rem' : '1.35rem', fontWeight: 800, color: '#fff' }}>{v}</div><div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section id="jobs" style={{ maxWidth: '1080px', margin: '0 auto', padding: m ? '2.5rem 1.25rem' : '3rem 2rem' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '7px 16px', borderRadius: '9999px', border: `1px solid ${filter === f ? CYAN : BORDER}`, background: filter === f ? SOFT : '#fff', color: filter === f ? CYAN_DK : MUTED, fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>{f}</button>
          ))}
          <span style={{ marginLeft: m ? 0 : 'auto', fontSize: '13px', color: MUTED }}>{jobs.length} jobs</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {jobs.map(job => (
            <div key={job.title} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '14px', padding: m ? '1.1rem' : '1.25rem 1.5rem', display: 'flex', alignItems: m ? 'flex-start' : 'center', gap: m ? '0.9rem' : '1.25rem', flexWrap: m ? 'wrap' : 'nowrap' }}>
              <Mono mono={job.mono} color={job.color} size={46} />
              <div style={{ flex: 1, minWidth: m ? '60%' : 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>{job.title}</h3>
                  <span style={{ fontSize: '11px', color: CYAN_DK, background: SOFT, padding: '2px 8px', borderRadius: '9999px', fontWeight: 600 }}>{job.type}</span>
                </div>
                <p style={{ fontSize: '13px', color: MUTED, margin: '0 0 6px' }}>{job.company} · {job.loc} · {job.posted}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {job.tags.map(t => <span key={t} style={{ fontSize: '11px', color: '#475569', background: '#f1f5f9', padding: '2px 8px', borderRadius: '5px' }}>{t}</span>)}
                </div>
              </div>
              <div style={{ textAlign: m ? 'left' : 'right', flexShrink: 0, width: m ? '100%' : 'auto', display: 'flex', alignItems: 'center', justifyContent: m ? 'space-between' : 'flex-end', gap: '12px', marginTop: m ? '0.4rem' : 0 }}>
                <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{job.salary}</p>
                <button style={{ background: CYAN, color: '#fff', border: 'none', borderRadius: '9px', padding: '8px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Apply</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: m ? '2.75rem 1.25rem' : '3.5rem 2rem' }}>
          <h2 style={{ fontSize: m ? '1.5rem' : '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1.75rem' }}>Browse by category</h2>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(3,1fr)', gap: '12px' }}>
            {categories.map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '1rem 1.25rem', cursor: 'pointer' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: SOFT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CatIcon name={c.icon} /></div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700 }}>{c.name}</div>
                  <div style={{ fontSize: '12px', color: MUTED }}>{c.count} open roles</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies */}
      <section style={{ maxWidth: '1080px', margin: '0 auto', padding: m ? '2.75rem 1.25rem' : '3.5rem 2rem' }}>
        <h2 style={{ fontSize: m ? '1.5rem' : '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1.75rem' }}>Companies hiring now</h2>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(3,1fr)', gap: '12px' }}>
          {companies.map(c => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '1rem 1.25rem' }}>
              <Mono mono={c.mono} color={c.color} size={40} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>{c.name}</div>
                <div style={{ fontSize: '12px', color: CYAN_DK, fontWeight: 600 }}>{c.open} open roles</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: m ? '0 1.25rem 3rem' : '0 2rem 4.5rem' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ background: `linear-gradient(135deg, ${CYAN}, #06b6d4)`, borderRadius: '20px', padding: m ? '2.5rem 1.5rem' : '3.25rem 3rem', display: 'flex', flexDirection: m ? 'column' : 'row', alignItems: m ? 'flex-start' : 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: m ? '1.6rem' : '2rem', fontWeight: 800, color: '#fff', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>Hiring remotely?</h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.6 }}>Post a role to 200k+ remote professionals. First listing is free.</p>
            </div>
            <button style={{ background: '#fff', color: CYAN_DK, border: 'none', borderRadius: '10px', padding: '13px 28px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>Post a job</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, padding: m ? '2.25rem 0 1.75rem' : '2.75rem 0 2rem' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: pad, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '15px', fontWeight: 800 }}>Remote<span style={{ color: CYAN }}>Base</span></span>
          <p style={{ fontSize: '13px', color: MUTED, margin: 0 }}>Remote jobs, worldwide.</p>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>© 2026 RemoteBase</p>
        </div>
      </footer>
    </div>
  );
}
