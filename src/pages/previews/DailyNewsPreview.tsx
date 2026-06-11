import { useState } from 'react';

/* ============================================================
   THE DAILY — News & Magazine Template
   Newspaper white · Georgia serif headlines · red #b91c1c
   Thin black rules · dense editorial grid
   ============================================================ */

const RED = '#b91c1c';
const INK = '#111111';
const GREY = '#555555';
const RULE = '#111111';
const LIGHT_RULE = '#e0e0e0';
const SERIF = "Georgia, 'Times New Roman', serif";

const sections = ['Politics', 'Tech', 'Business', 'Culture', 'Science', 'Opinion', 'Sports'];

const breaking = 'Senate passes landmark AI accountability act · Markets rally on rate-cut signals · Wildfire containment reaches 80% in Sierra foothills';

const lead = {
  kicker: 'Politics',
  headline: 'AI Accountability Act clears Senate in rare bipartisan vote',
  standfirst: 'The sweeping bill requires audits for high-risk systems and creates a federal model registry — the most significant technology regulation in two decades.',
  byline: 'By Dana Okonkwo and Felix Marsh',
  time: 'Updated 22 minutes ago',
  img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80',
};

const secondary = [
  { kicker: 'Analysis', title: 'What the act actually requires of model makers — and what it leaves out', time: '1 hr ago' },
  { kicker: 'Markets', title: 'Chipmakers shrug off compliance costs as shares hit record highs', time: '2 hrs ago' },
  { kicker: 'World', title: 'Brussels signals it will mirror US audit framework by spring', time: '3 hrs ago' },
  { kicker: 'Tech', title: 'Startups race to build the audit tooling the new law demands', time: '4 hrs ago' },
];

const categoryBlocks = [
  {
    name: 'Politics',
    leadStory: { title: 'Coalition fractures over infrastructure rider as shutdown clock ticks', img: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800&q=80', byline: 'By Marcus Hale' },
    headlines: ['Governors press White House on disaster-relief formula', 'Redistricting fight heads back to the high court', 'Veterans bill stalls despite broad public support'],
  },
  {
    name: 'Tech',
    leadStory: { title: 'The quiet rise of local-first software — and why big cloud is worried', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', byline: 'By Suki Tanaka' },
    headlines: ['Quantum startup claims error-correction milestone', 'EU opens probe into app-store steering rules', 'Open-source maintainers win landmark funding deal'],
  },
  {
    name: 'Culture',
    leadStory: { title: 'A restored 1920s movie palace becomes the most exciting stage in town', img: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80', byline: 'By Imogen Clarke' },
    headlines: ['The cookbook that turned leftovers into literature', 'Museum returns looted bronzes in landmark ceremony', 'Why everyone is suddenly reading novellas again'],
  },
];

const trending = [
  'AI Accountability Act: full text annotated',
  'The 28-hour city: how night logistics reshaped downtown',
  'Interview: the engineer who refused to ship',
  'Heat-pump nation: a buyer’s guide',
  'Opinion: The case for boring infrastructure',
];

const columnists = [
  { name: 'Evelyn Cho', col: 'The Long View', take: 'Regulation always arrives late. The question is whether it arrives useful.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80' },
  { name: 'Robert Ellison', col: 'Capital Letters', take: 'Markets priced in compliance months ago. Main Street has not.', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80' },
  { name: 'Amara Diallo', col: 'On Culture', take: 'The novella revival is really an attention revival in disguise.', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80' },
];

const photoEssay = [
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=700&q=80',
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=700&q=80',
  'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=700&q=80',
  'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=700&q=80',
];

const footerCols = [
  { title: 'Sections', links: ['Politics', 'Tech', 'Business', 'Culture', 'Sports'] },
  { title: 'The Daily', links: ['About us', 'Staff', 'Ethics policy', 'Careers'] },
  { title: 'Subscribe', links: ['Digital access', 'Print edition', 'Newsletters', 'Gift subscriptions'] },
];

export default function DailyNewsPreview() {
  const [edition] = useState('Morning Edition');

  return (
    <div style={{ fontFamily: SERIF, background: '#ffffff', color: INK, minHeight: '100vh' }}>

      {/* ── Top bar with ticker ── */}
      <div style={{ background: INK, color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '12px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <span style={{ background: RED, padding: '8px 14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', flexShrink: 0 }}>Breaking</span>
        <p style={{ margin: 0, padding: '8px 16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#d4d4d4' }}>{breaking}</p>
      </div>

      {/* ── Masthead ── */}
      <header style={{ borderBottom: `3px double ${RULE}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1.5rem 1rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Inter', sans-serif", fontSize: '11.5px', color: GREY, marginBottom: '0.75rem' }}>
            <span>Thursday, June 11, 2026 · {edition}</span>
            <span style={{ display: 'flex', gap: '1.25rem' }}>
              <a href="#" style={{ color: GREY, textDecoration: 'none' }}>Sign in</a>
              <a href="#" style={{ color: RED, textDecoration: 'none', fontWeight: 700 }}>Subscribe — $1/week</a>
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.6rem, 6vw, 4rem)', fontWeight: 700, letterSpacing: '0.02em', margin: 0 }}>The Daily</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: GREY, margin: '0.4rem 0 1rem' }}>Independent journalism since 1924</p>
          <nav style={{ borderTop: `1px solid ${RULE}`, paddingTop: '0.8rem', display: 'flex', justifyContent: 'center', gap: '1.75rem', flexWrap: 'wrap' }}>
            {sections.map(s => (
              <a key={s} href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: '12.5px', fontWeight: 600, color: INK, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Lead story + secondary stack ── */}
      <section style={{ padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
          <div style={{ gridColumn: 'span 1' }}>
            <img src={lead.img} alt={lead.headline} style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block', marginBottom: '1.25rem' }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: RED, margin: '0 0 0.6rem' }}>{lead.kicker}</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, lineHeight: 1.15, margin: '0 0 0.9rem' }}>{lead.headline}</h2>
            <p style={{ fontSize: '1.08rem', color: '#333', lineHeight: 1.65, margin: '0 0 0.9rem' }}>{lead.standfirst}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: GREY, margin: 0 }}>{lead.byline} · <span style={{ color: RED }}>{lead.time}</span></p>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', borderBottom: `2px solid ${RULE}`, paddingBottom: '8px', margin: '0 0 0.5rem' }}>More on this story</h3>
            {secondary.map(s => (
              <a key={s.title} href="#" style={{ display: 'block', padding: '1.1rem 0', borderBottom: `1px solid ${LIGHT_RULE}`, textDecoration: 'none', color: INK }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: RED, margin: '0 0 5px' }}>{s.kicker}</p>
                <h4 style={{ fontSize: '17.5px', fontWeight: 700, lineHeight: 1.35, margin: '0 0 5px' }}>{s.title}</h4>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11.5px', color: GREY, margin: 0 }}>{s.time}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category sections + trending sidebar ── */}
      <section style={{ padding: '1.5rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          <div style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {categoryBlocks.map(block => (
              <div key={block.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `2px solid ${RULE}`, paddingBottom: '8px', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>{block.name}</h3>
                  <a href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: RED, textDecoration: 'none', fontWeight: 700 }}>All {block.name} →</a>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                  <a href="#" style={{ textDecoration: 'none', color: INK }}>
                    <img src={block.leadStory.img} alt={block.leadStory.title} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block', marginBottom: '0.8rem' }} />
                    <h4 style={{ fontSize: '19px', fontWeight: 700, lineHeight: 1.3, margin: '0 0 6px' }}>{block.leadStory.title}</h4>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11.5px', color: GREY, margin: 0 }}>{block.leadStory.byline}</p>
                  </a>
                  <div>
                    {block.headlines.map(h => (
                      <a key={h} href="#" style={{ display: 'block', padding: '0.8rem 0', borderBottom: `1px solid ${LIGHT_RULE}`, textDecoration: 'none', color: INK }}>
                        <h5 style={{ fontSize: '15.5px', fontWeight: 700, lineHeight: 1.4, margin: 0 }}>{h}</h5>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trending sidebar */}
          <aside>
            <div style={{ border: `1px solid ${RULE}`, padding: '1.5rem' }}>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 1rem', color: RED }}>Most read</h3>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {trending.map((t, i) => (
                  <li key={t} style={{ display: 'flex', gap: '1rem', padding: '0.9rem 0', borderBottom: i < trending.length - 1 ? `1px solid ${LIGHT_RULE}` : 'none' }}>
                    <span style={{ fontSize: '26px', fontWeight: 700, color: '#cccccc', lineHeight: 1, flexShrink: 0 }}>{i + 1}</span>
                    <a href="#" style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.4, color: INK, textDecoration: 'none' }}>{t}</a>
                  </li>
                ))}
              </ol>
            </div>
            <div style={{ background: '#f7f7f7', border: `1px solid ${LIGHT_RULE}`, padding: '1.5rem', marginTop: '1.5rem', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: RED, margin: '0 0 0.6rem' }}>The Evening Brief</p>
              <h4 style={{ fontSize: '19px', fontWeight: 700, margin: '0 0 0.6rem' }}>The day’s five stories, told straight</h4>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: GREY, lineHeight: 1.6, margin: '0 0 1.1rem' }}>Join 480,000 readers who end the day informed, not exhausted.</p>
              <a href="#" style={{ display: 'block', background: INK, color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, padding: '12px', textDecoration: 'none' }}>Sign up free</a>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Opinion / columnists ── */}
      <section style={{ padding: '3rem 1.5rem', borderTop: `2px solid ${RULE}`, background: '#fafafa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 1.75rem' }}>Opinion</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {columnists.map(c => (
              <a key={c.name} href="#" style={{ display: 'flex', gap: '1rem', textDecoration: 'none', color: INK }}>
                <img src={c.avatar} alt={c.name} style={{ width: '58px', height: '58px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, filter: 'grayscale(100%)' }} />
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: RED, margin: '0 0 4px' }}>{c.col}</p>
                  <p style={{ fontSize: '16.5px', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.4, margin: '0 0 5px' }}>“{c.take}”</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: GREY, margin: 0 }}>{c.name}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo essay strip ── */}
      <section style={{ padding: '3rem 1.5rem', borderTop: `1px solid ${LIGHT_RULE}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>Photo essay · The last print shops of Mott Street</h3>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: GREY }}>Photographs by Lena Brightwater</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {photoEssay.map((src, i) => (
              <img key={src} src={src} alt={`Photo essay frame ${i + 1}`} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Subscription band ── */}
      <section style={{ padding: '3.5rem 1.5rem', borderTop: `3px double ${RULE}`, borderBottom: `3px double ${RULE}` }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, margin: '0 0 0.9rem' }}>Journalism worth paying for</h2>
          <p style={{ fontSize: '1.05rem', color: GREY, lineHeight: 1.7, margin: '0 0 1.75rem' }}>
            Unlimited digital access, the Sunday print edition, and every newsletter — for less than a coffee a week. Cancel anytime.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.875rem', flexWrap: 'wrap' }}>
            <a href="#" style={{ background: RED, color: '#fff', fontFamily: "'Inter', sans-serif", padding: '14px 32px', fontSize: '14px', fontWeight: 800, textDecoration: 'none' }}>Subscribe for $1/week</a>
            <a href="#" style={{ border: `1px solid ${INK}`, color: INK, fontFamily: "'Inter', sans-serif", padding: '14px 32px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Gift a subscription</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ padding: '3rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <div style={{ maxWidth: '280px' }}>
              <h3 style={{ fontSize: '26px', fontWeight: 700, margin: '0 0 0.75rem' }}>The Daily</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: GREY, lineHeight: 1.7, margin: 0 }}>
                Independent journalism since 1924. 88 Beacon Street, New York, NY.
              </p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: GREY, margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: '13.5px', color: '#333', textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${LIGHT_RULE}`, paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: GREY, margin: 0 }}>© 2026 The Daily Press Company · Terms · Privacy · Ethics</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['X', 'Instagram', 'RSS'].map(s => (
                <a key={s} href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: GREY, textDecoration: 'none' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
