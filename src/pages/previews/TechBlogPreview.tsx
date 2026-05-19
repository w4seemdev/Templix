const posts = [
  { title: 'Building scalable APIs with tRPC and Next.js', tag: 'Engineering', read: '8 min', date: 'May 14', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', author: 'Dan M.' },
  { title: 'Why we migrated from REST to GraphQL (and back)', tag: 'Architecture', read: '12 min', date: 'May 10', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80', author: 'Yuki T.' },
  { title: 'CSS Container Queries are a game changer', tag: 'Frontend', read: '5 min', date: 'May 7', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', author: 'Sara K.' },
  { title: 'An honest look at Bun vs Node in production', tag: 'Performance', read: '10 min', date: 'May 2', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80', author: 'Alex R.' },
  { title: 'How we cut our build times by 70%', tag: 'DevOps', read: '7 min', date: 'Apr 28', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80', author: 'Mia C.' },
];

const tags = ['All', 'Engineering', 'Frontend', 'Architecture', 'Performance', 'DevOps', 'AI/ML'];

export default function TechBlogPreview() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#09090b', color: '#fafafa', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid #27272a', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'rgba(9,9,11,0.9)', backdropFilter: 'blur(12px)', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <span style={{ fontSize: '17px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{'<DevLog />'}</span>
          {['Articles', 'Tutorials', 'Newsletter', 'About'].map(item => (
            <span key={item} style={{ fontSize: '13px', color: '#71717a', cursor: 'pointer' }}>{item}</span>
          ))}
        </div>
        <button style={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', padding: '7px 16px', fontSize: '13px', color: '#fafafa', cursor: 'pointer', fontWeight: 500 }}>
          Subscribe
        </button>
      </nav>

      {/* Hero post */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 2rem' }}>
        <div style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative', height: '420px', marginBottom: '3rem', cursor: 'pointer' }}>
          <img src={posts[0].img} alt={posts[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '2rem' }}>
            <span style={{ background: '#3b82f6', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.875rem', display: 'inline-block' }}>
              {posts[0].tag}
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: '0 0 0.75rem', letterSpacing: '-0.02em', maxWidth: '600px', lineHeight: 1.25 }}>
              {posts[0].title}
            </h2>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#a1a1aa' }}>By {posts[0].author}</span>
              <span style={{ fontSize: '13px', color: '#52525b' }}>·</span>
              <span style={{ fontSize: '13px', color: '#a1a1aa' }}>{posts[0].date}</span>
              <span style={{ fontSize: '13px', color: '#52525b' }}>·</span>
              <span style={{ fontSize: '13px', color: '#a1a1aa' }}>{posts[0].read} read</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {tags.map((tag, i) => (
            <button key={tag} style={{ padding: '6px 16px', borderRadius: '9999px', border: '1px solid', borderColor: i === 0 ? '#3b82f6' : '#27272a', background: i === 0 ? 'rgba(59,130,246,0.1)' : 'transparent', color: i === 0 ? '#60a5fa' : '#71717a', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
              {tag}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {posts.slice(1).map(post => (
            <article key={post.title} style={{ background: '#18181b', borderRadius: '16px', overflow: 'hidden', border: '1px solid #27272a', cursor: 'pointer' }}>
              <div style={{ height: '180px', overflow: 'hidden' }}>
                <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{post.tag}</span>
                  <span style={{ fontSize: '11px', color: '#3f3f46' }}>·</span>
                  <span style={{ fontSize: '11px', color: '#52525b' }}>{post.read} read</span>
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fafafa', margin: '0 0 0.875rem', lineHeight: 1.4 }}>{post.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#52525b' }}>{post.author} · {post.date}</span>
                  <svg width="16" height="16" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{ marginTop: '4rem', background: 'linear-gradient(135deg, #18181b, #1e1b4b)', borderRadius: '20px', padding: '3rem', textAlign: 'center', border: '1px solid #27272a' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>Stay in the loop</h2>
          <p style={{ fontSize: '14px', color: '#71717a', marginBottom: '1.5rem' }}>Weekly articles on engineering, frontend, and developer tools.</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <input type="email" placeholder="you@company.com" style={{ borderRadius: '8px', border: '1px solid #3f3f46', background: '#09090b', padding: '10px 16px', fontSize: '14px', color: '#fafafa', outline: 'none', minWidth: '240px' }} />
            <button style={{ background: '#3b82f6', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
