/* ============================================================
   COURSIFY — Education / Online Course Platform Template
   Light vibrant theme · violet (#7c3aed) + amber accents
   ============================================================ */

import { useState } from 'react';

const categories = ['All', 'Design', 'Development', 'Marketing', 'Business', 'Data'];

const courses = [
  { title: 'Figma UI/UX Design Masterclass', category: 'Design', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80', instructor: 'Maya Rodriguez', rating: 4.9, price: '$89', students: '12,480', lessons: 64, badge: 'Bestseller' },
  { title: 'React & TypeScript Bootcamp', category: 'Development', img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80', instructor: 'Daniel Okafor', rating: 4.8, price: '$119', students: '18,932', lessons: 92, badge: 'Bestseller' },
  { title: 'Content Marketing That Converts', category: 'Marketing', img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80', instructor: 'Sofia Lindqvist', rating: 4.7, price: '$69', students: '7,654', lessons: 41, badge: 'New' },
  { title: 'Data Analytics with Python', category: 'Data', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80', instructor: 'James Park', rating: 4.9, price: '$99', students: '14,210', lessons: 78, badge: 'Top Rated' },
  { title: 'Brand Strategy for Founders', category: 'Business', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80', instructor: 'Amara Bello', rating: 4.8, price: '$79', students: '5,873', lessons: 36, badge: 'New' },
  { title: 'Motion Design in After Effects', category: 'Design', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80', instructor: 'Lucas Meyer', rating: 4.7, price: '$94', students: '9,341', lessons: 57, badge: 'Top Rated' },
];

const instructors = [
  { name: 'Maya Rodriguez', role: 'Product Designer, ex-Figma', courses: 8, learners: '64k', img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80' },
  { name: 'Daniel Okafor', role: 'Staff Engineer, ex-Stripe', courses: 6, learners: '88k', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Sofia Lindqvist', role: 'Growth Lead, ex-Spotify', courses: 5, learners: '41k', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
  { name: 'James Park', role: 'Data Scientist, ex-Airbnb', courses: 7, learners: '57k', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
];

const curriculum = [
  { module: 'Foundations & Environment Setup', lessons: 9, duration: '1h 45m', topics: ['Why TypeScript changes how you write React', 'Project scaffolding with Vite', 'Strict mode, linting & editor superpowers'] },
  { module: 'Components, Props & Typed State', lessons: 14, duration: '3h 20m', topics: ['Typing props, children & events', 'useState and discriminated unions', 'Building a reusable component library'] },
  { module: 'Hooks Deep Dive & Data Fetching', lessons: 16, duration: '4h 05m', topics: ['Custom hooks with generics', 'Caching, loading & error states', 'Suspense-ready fetching patterns'] },
  { module: 'State Architecture at Scale', lessons: 12, duration: '3h 10m', topics: ['Context vs. stores — when and why', 'Reducers with exhaustive type checks', 'Performance profiling & memoization'] },
  { module: 'Capstone: Ship a Production App', lessons: 11, duration: '4h 30m', topics: ['Auth, routing & protected pages', 'Testing the critical path', 'CI, deployment & monitoring'] },
];

const outcomes = [
  { value: '94%', label: 'finish the courses they start', accent: '#7c3aed' },
  { value: '3.2x', label: 'average salary growth reported', accent: '#f59e0b' },
  { value: '21 days', label: 'median time to first certificate', accent: '#7c3aed' },
  { value: '4.8/5', label: 'average learner rating', accent: '#f59e0b' },
];

const tiers = [
  { name: 'Starter', price: '$0', period: 'forever', desc: 'Sample lessons and community access to get moving.', features: ['Access to 40+ free lessons', 'Community forum', 'Course previews', 'Weekly newsletter'], highlight: false, cta: 'Start learning free' },
  { name: 'Pro Learner', price: '$24', period: '/month', desc: 'Unlimited access to every course and certificate.', features: ['All 1,200+ courses unlocked', 'Verified certificates', 'Downloadable resources', 'Progress tracking dashboard', 'Offline viewing', 'Priority Q&A with instructors'], highlight: true, cta: 'Go Pro — 7 days free' },
  { name: 'Teams', price: '$19', period: '/seat/month', desc: 'Upskill your whole team with admin insights.', features: ['Everything in Pro', 'Team analytics & reporting', 'Custom learning paths', 'SSO & provisioning', 'Dedicated success manager'], highlight: false, cta: 'Talk to sales' },
];

const testimonials = [
  { quote: 'I went from marketing coordinator to product designer in eight months. The project-based curriculum gave me a portfolio that actually got interviews.', name: 'Priya Sharma', role: 'Product Designer at Linear', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { quote: 'The TypeScript bootcamp is the single best technical course I have taken anywhere — and I have taken a lot. Daniel explains the “why” behind everything.', name: 'Tom Becker', role: 'Frontend Engineer at Shopify', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
  { quote: 'We rolled Coursify Teams out to 120 people. Completion rates tripled compared to our old platform, and the analytics make my quarterly reviews easy.', name: 'Elena Vasquez', role: 'Head of L&D at Notion', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80' },
];

const heroChips = [
  { icon: '🎓', label: '1,200+ courses', top: '8%', right: '-24px' },
  { icon: '⚡', label: '94% completion rate', top: '48%', right: '-40px' },
  { icon: '🏆', label: '380k certificates earned', top: '82%', right: '4%' },
];

const footerCols = [
  { title: 'Learn', links: ['All Courses', 'Learning Paths', 'Certificates', 'Free Lessons', 'Mobile App'] },
  { title: 'Teach', links: ['Become an Instructor', 'Instructor Handbook', 'Studio Guidelines', 'Revenue Share'] },
  { title: 'Company', links: ['About', 'Careers', 'Blog', 'Press Kit', 'Contact'] },
  { title: 'Support', links: ['Help Center', 'Privacy', 'Terms', 'Accessibility'] },
];

const violet = '#7c3aed';
const amber = '#f59e0b';
const ink = '#1e1b2e';
const muted = '#6b6685';

export default function CoursifyEducationPreview() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openModule, setOpenModule] = useState(1);

  const visibleCourses = activeCategory === 'All' ? courses : courses.filter(c => c.category === activeCategory);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#ffffff', color: ink, minHeight: '100vh' }}>

      {/* ─── Nav ─── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(14px)', borderBottom: '1px solid #eee9fb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: `linear-gradient(135deg, ${violet}, #a855f7)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '17px', boxShadow: '0 4px 14px rgba(124,58,237,0.35)' }}>C</div>
            <span style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.03em' }}>Coursify</span>
          </div>
          <nav style={{ display: 'flex', gap: '1.9rem' }}>
            {['Courses', 'Paths', 'Instructors', 'Pricing', 'For Teams'].map(l => (
              <a key={l} href="#" style={{ fontSize: '14px', fontWeight: 500, color: muted, textDecoration: 'none' }}>{l}</a>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="#" style={{ fontSize: '14px', fontWeight: 600, color: ink, textDecoration: 'none' }}>Log in</a>
            <a href="#" style={{ background: violet, color: '#fff', borderRadius: '9999px', padding: '10px 22px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 6px 18px rgba(124,58,237,0.3)' }}>Start free</a>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #faf7ff 0%, #ffffff 100%)' }}>
        <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.16), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-160px', left: '-100px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4.5rem 2rem 5rem', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3.5rem', alignItems: 'center', position: 'relative' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.35)', color: '#b45309', borderRadius: '9999px', padding: '6px 16px', fontSize: '13px', fontWeight: 600, marginBottom: '1.5rem' }}>
              ⚡ New: 120 courses added this season
            </span>
            <h1 style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.07, margin: 0 }}>
              Learn the skills that{' '}
              <span style={{ background: `linear-gradient(90deg, ${violet}, ${amber})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>move your career</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: muted, lineHeight: 1.75, maxWidth: '480px', margin: '1.5rem 0 2rem' }}>
              Project-based courses taught by industry experts, with progress tracking, certificates, and a community that won’t let you quit.
            </p>
            {/* Search-style bar */}
            <div style={{ display: 'flex', alignItems: 'center', background: '#ffffff', border: '1px solid #e7e2f5', borderRadius: '16px', padding: '8px 8px 8px 20px', boxShadow: '0 14px 40px rgba(30,27,46,0.08)', maxWidth: '520px' }}>
              <span style={{ fontSize: '17px', marginRight: '10px' }}>🔍</span>
              <input placeholder="Try “TypeScript”, “Figma”, “SQL”…" style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px', color: ink, background: 'transparent', fontFamily: 'inherit' }} />
              <button style={{ background: violet, color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 26px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 16px rgba(124,58,237,0.3)' }}>Explore</button>
            </div>
            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.5rem', alignItems: 'center' }}>
              <a href="#courses" style={{ fontSize: '14px', fontWeight: 700, color: violet, textDecoration: 'none' }}>Browse all courses →</a>
              <span style={{ fontSize: '13px', color: muted }}>No credit card needed</span>
            </div>
          </div>
          {/* Hero visual with floating chips */}
          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 70px rgba(124,58,237,0.22)', border: '4px solid #ffffff', transform: 'rotate(1.5deg)' }}>
              <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80" alt="Learner studying" style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }} />
            </div>
            {heroChips.map(chip => (
              <div key={chip.label} style={{ position: 'absolute', top: chip.top, right: chip.right, background: '#ffffff', borderRadius: '9999px', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, boxShadow: '0 10px 30px rgba(30,27,46,0.15)', border: '1px solid #f0ecfb', whiteSpace: 'nowrap' }}>
                <span>{chip.icon}</span>{chip.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Social-proof strip ─── */}
      <section style={{ borderTop: '1px solid #f0ecfb', borderBottom: '1px solid #f0ecfb', background: '#fdfcff', padding: '1.75rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a39ec2' }}>Teams learn with Coursify</span>
          {['Shopify', 'Notion', 'Linear', 'Duolingo', 'Canva', 'Intercom'].map(brand => (
            <span key={brand} style={{ fontSize: '17px', fontWeight: 800, color: '#c9c3e2', letterSpacing: '-0.02em' }}>{brand}</span>
          ))}
        </div>
      </section>

      {/* ─── Course grid with filter pills ─── */}
      <section id="courses" style={{ padding: '5.5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: violet }}>Catalog</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0.6rem 0 0.8rem' }}>Find your next course</h2>
            <p style={{ color: muted, fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto' }}>Hand-vetted instructors, project-first lessons, and certificates employers recognize.</p>
          </div>
          {/* Filter pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '2.75rem' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '9px 22px', borderRadius: '9999px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                border: activeCategory === cat ? `1.5px solid ${violet}` : '1.5px solid #e7e2f5',
                background: activeCategory === cat ? violet : '#ffffff',
                color: activeCategory === cat ? '#ffffff' : muted,
                boxShadow: activeCategory === cat ? '0 6px 16px rgba(124,58,237,0.28)' : 'none',
                transition: 'all 0.15s',
              }}>{cat}</button>
            ))}
          </div>
          {/* Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
            {visibleCourses.map(course => (
              <div key={course.title} style={{ borderRadius: '20px', border: '1px solid #f0ecfb', background: '#ffffff', overflow: 'hidden', boxShadow: '0 8px 28px rgba(30,27,46,0.06)', cursor: 'pointer' }}>
                <div style={{ position: 'relative' }}>
                  <img src={course.img} alt={course.title} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
                  <span style={{ position: 'absolute', top: '12px', left: '12px', background: course.badge === 'Bestseller' ? amber : violet, color: '#fff', borderRadius: '9999px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }}>{course.badge}</span>
                  <span style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(30,27,46,0.78)', color: '#fff', borderRadius: '8px', padding: '4px 10px', fontSize: '11px', fontWeight: 600 }}>{course.lessons} lessons</span>
                </div>
                <div style={{ padding: '1.4rem' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: violet }}>{course.category}</span>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.01em', margin: '6px 0 8px', lineHeight: 1.35 }}>{course.title}</h3>
                  <p style={{ fontSize: '13px', color: muted, margin: '0 0 12px' }}>by {course.instructor}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                    <span style={{ color: amber, fontSize: '14px', letterSpacing: '1px' }}>★★★★★</span>
                    <span style={{ fontSize: '13px', fontWeight: 700 }}>{course.rating}</span>
                    <span style={{ fontSize: '12px', color: muted }}>· {course.students} students</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f0fb', paddingTop: '14px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.02em' }}>{course.price}</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: violet }}>Enroll now →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Instructor spotlight ─── */}
      <section style={{ background: '#faf7ff', padding: '5.5rem 0', borderTop: '1px solid #f0ecfb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.75rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: violet }}>Instructors</span>
              <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0.6rem 0 0' }}>Learn from people who’ve done it</h2>
            </div>
            <a href="#" style={{ fontSize: '14px', fontWeight: 700, color: violet, textDecoration: 'none' }}>Meet all 240 instructors →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {instructors.map(person => (
              <div key={person.name} style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #f0ecfb', padding: '1.75rem', textAlign: 'center', boxShadow: '0 8px 24px rgba(30,27,46,0.05)' }}>
                <img src={person.img} alt={person.name} style={{ width: '84px', height: '84px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${amber}`, marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px' }}>{person.name}</h3>
                <p style={{ fontSize: '13px', color: muted, margin: '0 0 14px' }}>{person.role}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', fontSize: '12px', fontWeight: 600, color: ink }}>
                  <span style={{ background: '#f5f1fd', borderRadius: '9999px', padding: '5px 12px' }}>{person.courses} courses</span>
                  <span style={{ background: 'rgba(245,158,11,0.12)', borderRadius: '9999px', padding: '5px 12px', color: '#b45309' }}>{person.learners} learners</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured curriculum accordion ─── */}
      <section style={{ padding: '5.5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '3.5rem', alignItems: 'start' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: violet }}>Featured course</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0.6rem 0 1rem', lineHeight: 1.15 }}>React & TypeScript Bootcamp</h2>
            <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              Sixty-two hours of hands-on lessons that take you from typed components to a deployed production app. Every module ends with a project you’ll actually want in your portfolio.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {['92 lessons', '16h 50m video', 'Certificate included', 'Lifetime access'].map(tag => (
                <span key={tag} style={{ fontSize: '12px', fontWeight: 600, background: '#f5f1fd', color: violet, borderRadius: '9999px', padding: '6px 14px' }}>{tag}</span>
              ))}
            </div>
            <a href="#" style={{ display: 'inline-block', background: `linear-gradient(135deg, ${violet}, #a855f7)`, color: '#fff', borderRadius: '14px', padding: '14px 30px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 10px 26px rgba(124,58,237,0.32)' }}>Enroll for $119</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {curriculum.map((mod, i) => {
              const open = openModule === i;
              return (
                <div key={mod.module} style={{ border: open ? `1.5px solid ${violet}` : '1.5px solid #ece7f8', borderRadius: '16px', background: open ? '#faf7ff' : '#ffffff', overflow: 'hidden', transition: 'all 0.2s' }}>
                  <button onClick={() => setOpenModule(open ? -1 : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: 'transparent', border: 'none', padding: '1.1rem 1.4rem', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ width: '30px', height: '30px', borderRadius: '9px', background: open ? violet : '#f0ebfb', color: open ? '#fff' : violet, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: ink }}>{mod.module}</span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                      <span style={{ fontSize: '12px', color: muted, fontWeight: 600 }}>{mod.lessons} lessons · {mod.duration}</span>
                      <span style={{ fontSize: '13px', color: violet, fontWeight: 800 }}>{open ? '−' : '+'}</span>
                    </span>
                  </button>
                  {open && (
                    <ul style={{ listStyle: 'none', margin: 0, padding: '0 1.4rem 1.2rem 4rem', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                      {mod.topics.map(topic => (
                        <li key={topic} style={{ fontSize: '14px', color: muted, display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: amber, flexShrink: 0 }} />{topic}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Learner outcomes ─── */}
      <section style={{ background: ink, padding: '4.5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: amber }}>Outcomes</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0.6rem 0 0', color: '#ffffff' }}>Learning that actually sticks</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {outcomes.map(stat => (
              <div key={stat.label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '18px', padding: '2rem 1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-0.03em', color: stat.accent === amber ? '#fbbf24' : '#a78bfa', marginBottom: '8px' }}>{stat.value}</div>
                <div style={{ fontSize: '13px', color: '#b8b3d0', lineHeight: 1.5 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Membership tiers ─── */}
      <section style={{ padding: '5.5rem 0', background: '#fdfcff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: violet }}>Membership</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0.6rem 0 0.8rem' }}>One subscription, every course</h2>
            <p style={{ color: muted, fontSize: '1.05rem' }}>Cancel anytime. Certificates and progress stay yours forever.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.75rem', alignItems: 'start' }}>
            {tiers.map(tier => (
              <div key={tier.name} style={{ position: 'relative', background: '#ffffff', borderRadius: '22px', padding: '2.25rem', border: tier.highlight ? `2px solid ${violet}` : '1px solid #ece7f8', boxShadow: tier.highlight ? '0 24px 60px rgba(124,58,237,0.18)' : '0 8px 24px rgba(30,27,46,0.05)' }}>
                {tier.highlight && (
                  <span style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(90deg, ${violet}, ${amber})`, color: '#fff', borderRadius: '9999px', padding: '5px 18px', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>Most popular</span>
                )}
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 6px' }}>{tier.name}</h3>
                <p style={{ fontSize: '13px', color: muted, margin: '0 0 1.25rem', lineHeight: 1.6 }}>{tier.desc}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2.6rem', fontWeight: 900, letterSpacing: '-0.04em' }}>{tier.price}</span>
                  <span style={{ fontSize: '14px', color: muted }}>{tier.period}</span>
                </div>
                <a href="#" style={{ display: 'block', textAlign: 'center', borderRadius: '12px', padding: '12px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', background: tier.highlight ? violet : '#f5f1fd', color: tier.highlight ? '#ffffff' : violet, marginBottom: '1.5rem', boxShadow: tier.highlight ? '0 8px 20px rgba(124,58,237,0.3)' : 'none' }}>{tier.cta}</a>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {tier.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#4b4666' }}>
                      <span style={{ color: amber, fontWeight: 800, fontSize: '14px' }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section style={{ padding: '5.5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: violet }}>Learner stories</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0.6rem 0 0' }}>People change careers here</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: '#faf7ff', borderRadius: '20px', border: '1px solid #ece7f8', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ color: amber, fontSize: '15px', letterSpacing: '2px' }}>★★★★★</div>
                <p style={{ fontSize: '14.5px', color: '#4b4666', lineHeight: 1.75, margin: 0, flex: 1 }}>“{t.quote}”</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={t.img} alt={t.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '12px', color: muted, margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA band ─── */}
      <section style={{ padding: '0 2rem 5.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', borderRadius: '28px', background: `linear-gradient(120deg, ${violet} 0%, #9333ea 55%, ${amber} 130%)`, padding: '4.5rem 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-100px', left: '-70px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1rem', position: 'relative' }}>Your future self says thanks</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', maxWidth: '460px', margin: '0 auto 2.25rem', position: 'relative' }}>
            Join 2.4 million learners building careers they’re proud of. Your first week of Pro is on us.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', position: 'relative' }}>
            <a href="#" style={{ background: '#ffffff', color: violet, borderRadius: '14px', padding: '15px 32px', fontSize: '15px', fontWeight: 800, textDecoration: 'none', boxShadow: '0 12px 30px rgba(30,27,46,0.25)' }}>Start 7-day free trial</a>
            <a href="#" style={{ border: '1.5px solid rgba(255,255,255,0.5)', color: '#ffffff', borderRadius: '14px', padding: '15px 32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>View all courses</a>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ borderTop: '1px solid #ece7f8', background: '#faf8ff', padding: '3.5rem 0 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '250px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: `linear-gradient(135deg, ${violet}, #a855f7)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '15px' }}>C</div>
                <span style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.02em' }}>Coursify</span>
              </div>
              <p style={{ fontSize: '13px', color: muted, lineHeight: 1.7, margin: 0 }}>The online course platform where ambitious people learn the skills that move careers.</p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a39ec2', marginBottom: '1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(link => (
                    <li key={link}><a href="#" style={{ fontSize: '13.5px', color: muted, textDecoration: 'none' }}>{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #ece7f8', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '13px', color: '#a39ec2', margin: 0 }}>© {new Date().getFullYear()} Coursify Learning, Inc. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Twitter', 'YouTube', 'Instagram', 'LinkedIn'].map(s => (
                <a key={s} href="#" style={{ fontSize: '13px', color: '#a39ec2', textDecoration: 'none' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
