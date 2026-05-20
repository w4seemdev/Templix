/* ============================================================
   BLOOM — Blog / Magazine Template
   Light warm theme — clean editorial design
   ============================================================ */

export default function BloomBlogPreview() {
  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: '#fafaf7', color: '#1a1a1a', minHeight: '100vh' }}>
      <BloomNav />
      <BloomHero />
      <FeaturedPost />
      <PostsGrid />
      <PopularSection />
      <WritersSection />
      <NewsletterSection />
      <BloomFooter />
    </div>
  );
}

function BloomNav() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      borderBottom: '1px solid #e5e0d8',
      background: 'rgba(250,250,247,0.95)', backdropFilter: 'blur(12px)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: '"Georgia", serif', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', color: '#1a1a1a' }}>
          Bloom<span style={{ color: '#d97706' }}>.</span>
        </span>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          {['Design', 'Tech', 'Life', 'Culture', 'About'].map(l => (
            <a key={l} href="#" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#78716c', textDecoration: 'none' }}>{l}</a>
          ))}
        </nav>
        <a href="#" style={{
          fontFamily: 'Inter, sans-serif', background: '#1a1a1a', borderRadius: '8px',
          padding: '7px 16px', fontSize: '13px', fontWeight: 600, color: '#ffffff', textDecoration: 'none',
        }}>Subscribe</a>
      </div>
    </header>
  );
}

function BloomHero() {
  return (
    <section style={{ borderBottom: '1px solid #e5e0d8', padding: '3rem 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#d97706', marginBottom: '1rem' }}>
          Journal of ideas &amp; inspiration
        </p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#1a1a1a', margin: '0 auto 1.25rem', maxWidth: '700px' }}>
          Stories worth reading, ideas worth sharing.
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.0625rem', color: '#78716c', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75 }}>
          A curated magazine for curious minds — covering design, technology, culture, and the art of living well.
        </p>
      </div>
    </section>
  );
}

function FeaturedPost() {
  return (
    <section style={{ padding: '4rem 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a8a29e', marginBottom: '1.5rem' }}>Featured story</p>
        <a href="#" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem',
          alignItems: 'center', textDecoration: 'none',
        }}>
          <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '4/3' }}>
            <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&q=80" alt="Featured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <span style={{ fontFamily: 'Inter, sans-serif', display: 'inline-block', background: '#fef3c7', color: '#d97706', borderRadius: '4px', padding: '3px 10px', fontSize: '12px', fontWeight: 600, marginBottom: '1.25rem' }}>Design</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: '#1a1a1a', marginBottom: '1rem' }}>
              The quiet revolution of minimalist design in 2024
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#78716c', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              How a global shift toward simplicity is reshaping how we build products, live in spaces, and experience the digital world around us.
            </p>
            <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e7e5e4', overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80" alt="author" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Sarah Winters</p>
                <p style={{ fontSize: '12px', color: '#a8a29e', margin: 0 }}>June 12 · 8 min read</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

const posts = [
  { title: 'How typography shapes our emotions online', category: 'Design', author: 'James Liu', date: 'June 10', time: '5 min', img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80' },
  { title: 'The tools every remote team needs in 2024', category: 'Tech', author: 'Mia Roberts', date: 'June 8', time: '6 min', img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=80' },
  { title: 'Morning rituals of highly creative people', category: 'Life', author: 'Kai Tanaka', date: 'June 5', time: '4 min', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80' },
  { title: 'Why analog photography is making a comeback', category: 'Culture', author: 'Nina Wolff', date: 'June 3', time: '7 min', img: 'https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?w=400&q=80' },
  { title: 'Building with intentionality: lessons from Zen', category: 'Design', author: 'Oscar Patel', date: 'May 30', time: '9 min', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80' },
  { title: 'The rise of digital nomad cities', category: 'Life', author: 'Lena Müller', date: 'May 27', time: '5 min', img: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=400&q=80' },
];

function PostsGrid() {
  return (
    <section style={{ borderTop: '1px solid #e5e0d8', padding: '4rem 0 5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a8a29e', margin: 0 }}>Latest posts</p>
          <a href="#" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#d97706', textDecoration: 'none' }}>All posts →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {posts.map(post => (
            <a key={post.title} href="#" style={{ textDecoration: 'none' }}>
              <div style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem', aspectRatio: '16/10' }}>
                <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
              </div>
              <div>
                <span style={{ fontFamily: 'Inter, sans-serif', display: 'inline-block', background: '#fef9ec', color: '#d97706', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 600, marginBottom: '8px' }}>{post.category}</span>
                <h3 style={{ fontSize: '17px', fontWeight: 700, lineHeight: 1.35, color: '#1a1a1a', marginBottom: '10px', letterSpacing: '-0.01em' }}>{post.title}</h3>
                <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#a8a29e' }}>
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.time} read</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularSection() {
  const popular = [
    { rank: '01', title: 'Why silence is the new productivity hack', reads: '42K reads', category: 'Life' },
    { rank: '02', title: 'The Figma features designers still sleep on', reads: '38K reads', category: 'Design' },
    { rank: '03', title: 'GPT-4 changed how I write — here is what I learned', reads: '31K reads', category: 'Tech' },
    { rank: '04', title: 'Finding slowness in a world obsessed with speed', reads: '27K reads', category: 'Culture' },
    { rank: '05', title: "The city that made me fall in love with walking again", reads: '24K reads', category: 'Life' },
  ];
  return (
    <section style={{ borderTop: '1px solid #e5e0d8', padding: '4rem 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a8a29e', marginBottom: '1.5rem' }}>Most popular</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {popular.map((p, i) => (
                <a key={p.rank} href="#" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', padding: '1.25rem 0', borderBottom: i < popular.length - 1 ? '1px solid #e5e0d8' : 'none', textDecoration: 'none' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.5rem', fontWeight: 900, color: '#e5e0d8', letterSpacing: '-0.04em', lineHeight: 1, flexShrink: 0, width: '36px' }}>{p.rank}</span>
                  <div>
                    <span style={{ fontFamily: 'Inter, sans-serif', display: 'inline-block', background: '#fef9ec', color: '#d97706', borderRadius: '3px', padding: '1px 7px', fontSize: '10px', fontWeight: 600, marginBottom: '5px' }}>{p.category}</span>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.35, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{p.title}</h3>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#a8a29e', margin: 0 }}>{p.reads}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a8a29e', marginBottom: '1.5rem' }}>Topics</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[['Design', '#fef3c7', '#d97706'], ['Technology', '#eff6ff', '#3b82f6'], ['Life & Wellness', '#f0fdf4', '#22c55e'], ['Culture', '#fdf4ff', '#a855f7'], ['Travel', '#fff7ed', '#f97316'], ['Business', '#fefce8', '#ca8a04'], ['Creativity', '#fdf2f8', '#ec4899'], ['Philosophy', '#f8fafc', '#64748b']].map(([label, bg, color]) => (
                <a key={label} href="#" style={{ fontFamily: 'Inter, sans-serif', display: 'inline-block', background: bg as string, color: color as string, borderRadius: '999px', padding: '6px 14px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>{label}</a>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem', borderRadius: '12px', background: '#1a1a1a', padding: '2rem' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#d97706', marginBottom: '0.75rem' }}>This week in Bloom</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.3, margin: '0 0 1rem' }}>
                Why rest is the most rebellious act of our time
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#78716c', lineHeight: 1.7, margin: 0 }}>
                A personal essay on finding meaning in doing less, sleeping more, and saying no to the hustle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WritersSection() {
  const writers = [
    { name: 'Sarah Winters', role: 'Design Editor', posts: 42, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
    { name: 'James Liu', role: 'Tech Correspondent', posts: 38, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
    { name: 'Kai Tanaka', role: 'Life & Culture', posts: 31, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
    { name: 'Nina Wolff', role: 'Photography', posts: 27, img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80' },
  ];
  return (
    <section style={{ borderTop: '1px solid #e5e0d8', padding: '4rem 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a8a29e', marginBottom: '2rem' }}>Our writers</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {writers.map(w => (
            <a key={w.name} href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src={w.img} alt={w.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a', margin: '0 0 2px' }}>{w.name}</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#a8a29e', margin: '0 0 2px' }}>{w.role}</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#d97706', margin: 0 }}>{w.posts} articles</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section style={{ background: '#1a1a1a', padding: '5rem 2rem', textAlign: 'center' }}>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#d97706', marginBottom: '1rem' }}>Newsletter</p>
      <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff', margin: '0 auto 1rem', maxWidth: '520px' }}>
        Get the best stories in your inbox
      </h2>
      <p style={{ fontFamily: 'Inter, sans-serif', color: '#78716c', fontSize: '15px', marginBottom: '2rem' }}>
        Join 24,000 readers. No spam, ever.
      </p>
      <div style={{ display: 'flex', gap: '8px', maxWidth: '440px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
        <input
          type="email"
          placeholder="your@email.com"
          style={{
            flex: 1, minWidth: '200px', background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px',
            padding: '12px 16px', fontSize: '14px', color: '#ffffff', outline: 'none',
            fontFamily: 'Inter, sans-serif',
          }}
        />
        <button style={{
          background: '#d97706', border: 'none', borderRadius: '8px',
          padding: '12px 24px', fontSize: '14px', fontWeight: 600, color: '#ffffff', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
        }}>
          Subscribe
        </button>
      </div>
    </section>
  );
}

function BloomFooter() {
  return (
    <footer style={{ borderTop: '1px solid #e5e0d8', background: '#fafaf7', padding: '2rem 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: '"Georgia", serif', fontSize: '18px', fontWeight: 700, color: '#1a1a1a' }}>Bloom.</span>
        <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', gap: '2rem' }}>
          {['About', 'Write for us', 'Privacy', 'Twitter'].map(l => (
            <a key={l} href="#" style={{ fontSize: '13px', color: '#a8a29e', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#d4cfc9' }}>© {new Date().getFullYear()} Bloom Magazine</span>
      </div>
    </footer>
  );
}
