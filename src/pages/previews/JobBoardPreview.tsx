import { useState } from 'react';

const jobs = [
  { title: 'Senior Product Designer', company: 'Stripe', location: 'Remote', salary: '$140–$180K', type: 'Full-time', logo: '💳', tags: ['Figma', 'Design Systems', 'B2B'], posted: '2d ago' },
  { title: 'Staff Engineer — Platform', company: 'Linear', location: 'Remote / SF', salary: '$200–$250K', type: 'Full-time', logo: '⚡', tags: ['Go', 'TypeScript', 'Infrastructure'], posted: '3d ago' },
  { title: 'Head of Marketing', company: 'Notion', location: 'New York', salary: '$160–$200K', type: 'Full-time', logo: '📝', tags: ['B2B SaaS', 'Growth', 'Brand'], posted: '5d ago' },
  { title: 'iOS Engineer', company: 'Vercel', location: 'Remote', salary: '$130–$160K', type: 'Full-time', logo: '▲', tags: ['Swift', 'SwiftUI', 'Networking'], posted: '1w ago' },
  { title: 'Data Scientist', company: 'Hugging Face', location: 'Paris / Remote', salary: '$120–$155K', type: 'Full-time', logo: '🤗', tags: ['Python', 'ML', 'NLP'], posted: '1w ago' },
];

const filters = ['All', 'Engineering', 'Design', 'Marketing', 'Data', 'Product'];

export default function JobBoardPreview() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', color: '#0f172a', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🌐</span>
          <span style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.02em' }}>RemoteBase</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Find Jobs', 'Companies', 'Salaries', 'Resources'].map(item => (
            <span key={item} style={{ fontSize: '13px', color: '#64748b', cursor: 'pointer', fontWeight: 500 }}>{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ background: 'transparent', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '7px 16px', fontSize: '13px', color: '#0f172a', cursor: 'pointer', fontWeight: 500 }}>Sign in</button>
          <button style={{ background: '#6366f1', border: 'none', borderRadius: '8px', padding: '7px 16px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Post a Job</button>
        </div>
      </nav>

      {/* Hero search */}
      <section style={{ background: 'linear-gradient(135deg, #312e81 0%, #4f46e5 100%)', padding: '4rem 2rem 3.5rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 0.75rem' }}>
            Find your dream remote job
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>
            1,400+ remote jobs from top companies worldwide
          </p>
          <div style={{ display: 'flex', gap: '10px', background: '#fff', borderRadius: '12px', padding: '8px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Job title, skill, or company..." style={{ flex: 1, border: 'none', outline: 'none', padding: '8px 12px', fontSize: '14px', color: '#0f172a', background: 'transparent' }} />
            <select style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#64748b', background: '#fff', outline: 'none' }}>
              <option>Any Location</option><option>Remote Only</option><option>US</option><option>Europe</option>
            </select>
            <button style={{ background: '#6366f1', border: 'none', borderRadius: '8px', padding: '10px 24px', fontSize: '14px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Search</button>
          </div>
          <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', marginTop: '2rem' }}>
            {[['1,400+', 'Open Roles'], ['340+', 'Companies'], ['100%', 'Remote']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: '0 0 2px' }}>{v}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters + listings */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '7px 18px', borderRadius: '9999px', border: '1px solid', borderColor: filter === f ? '#6366f1' : '#e2e8f0', background: filter === f ? '#eef2ff' : '#fff', color: filter === f ? '#4f46e5' : '#64748b', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
              {f}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#64748b', alignSelf: 'center' }}>{jobs.length} jobs found</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {jobs.map(job => (
            <div key={job.title} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                {job.logo}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>{job.title}</h3>
                  <span style={{ fontSize: '11px', color: '#6366f1', background: '#eef2ff', padding: '2px 8px', borderRadius: '9999px', fontWeight: 600 }}>{job.type}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 6px' }}>{job.company} · {job.location} · {job.posted}</p>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {job.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '11px', color: '#475569', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>{job.salary}</p>
                <button style={{ background: '#6366f1', border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '12px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Apply</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
