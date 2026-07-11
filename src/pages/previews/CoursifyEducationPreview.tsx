/* ============================================================
   COURSIFY — Online course platform template
   Light vibrant theme · violet + amber accents
   Self-contained, fully responsive, no external assets.
   ============================================================ */

import { useState, useEffect } from 'react';

const violet = '#7c3aed';
const amber = '#f59e0b';
const ink = '#1e1b2e';
const muted = '#6b6685';

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

const categories = ['All', 'Design', 'Development', 'Marketing', 'Business', 'Data'];

const courses = [
  { title: 'Figma UI/UX Design Masterclass', category: 'Design', instructor: 'Maya Rodriguez', rating: 4.9, price: '$89', students: '12,480', lessons: 64, badge: 'Bestseller', c1: '#7c3aed', c2: '#c084fc' },
  { title: 'React & TypeScript Bootcamp', category: 'Development', instructor: 'Daniel Okafor', rating: 4.8, price: '$119', students: '18,932', lessons: 92, badge: 'Bestseller', c1: '#2563eb', c2: '#60a5fa' },
  { title: 'Content Marketing That Converts', category: 'Marketing', instructor: 'Sofia Lindqvist', rating: 4.7, price: '$69', students: '7,654', lessons: 41, badge: 'New', c1: '#db2777', c2: '#f9a8d4' },
  { title: 'Data Analytics with Python', category: 'Data', instructor: 'James Park', rating: 4.9, price: '$99', students: '14,210', lessons: 78, badge: 'Top Rated', c1: '#0d9488', c2: '#5eead4' },
  { title: 'Brand Strategy for Founders', category: 'Business', instructor: 'Amara Bello', rating: 4.8, price: '$79', students: '5,873', lessons: 36, badge: 'New', c1: '#ea580c', c2: '#fdba74' },
  { title: 'Motion Design in After Effects', category: 'Design', instructor: 'Lucas Meyer', rating: 4.7, price: '$94', students: '9,341', lessons: 57, badge: 'Top Rated', c1: '#4f46e5', c2: '#a5b4fc' },
];

const instructors = [
  { name: 'Maya Rodriguez', role: 'Product Designer, ex-Figma', courses: 8, learners: '64k', c1: '#7c3aed', c2: '#c084fc' },
  { name: 'Daniel Okafor', role: 'Staff Engineer, ex-Stripe', courses: 6, learners: '88k', c1: '#2563eb', c2: '#60a5fa' },
  { name: 'Sofia Lindqvist', role: 'Growth Lead, ex-Spotify', courses: 5, learners: '41k', c1: '#db2777', c2: '#f9a8d4' },
  { name: 'James Park', role: 'Data Scientist, ex-Airbnb', courses: 7, learners: '57k', c1: '#0d9488', c2: '#5eead4' },
];

const curriculum = [
  { module: 'Foundations & Environment Setup', lessons: 9, duration: '1h 45m', topics: ['Why TypeScript changes how you write React', 'Project scaffolding with Vite', 'Strict mode, linting & editor superpowers'] },
  { module: 'Components, Props & Typed State', lessons: 14, duration: '3h 20m', topics: ['Typing props, children & events', 'useState and discriminated unions', 'Building a reusable component library'] },
  { module: 'Hooks Deep Dive & Data Fetching', lessons: 16, duration: '4h 05m', topics: ['Custom hooks with generics', 'Caching, loading & error states', 'Suspense-ready fetching patterns'] },
  { module: 'State Architecture at Scale', lessons: 12, duration: '3h 10m', topics: ['Context vs. stores — when and why', 'Reducers with exhaustive type checks', 'Performance profiling & memoization'] },
  { module: 'Capstone: Ship a Production App', lessons: 11, duration: '4h 30m', topics: ['Auth, routing & protected pages', 'Testing the critical path', 'CI, deployment & monitoring'] },
];

const outcomes = [
  { value: '94%', label: 'finish the courses they start', dark: false },
  { value: '3.2x', label: 'average salary growth reported', dark: true },
  { value: '21 days', label: 'median time to first certificate', dark: false },
  { value: '4.8/5', label: 'average learner rating', dark: true },
];

const tiers = [
  { name: 'Starter', price: '$0', period: 'forever', desc: 'Sample lessons and community access to get moving.', features: ['Access to 40+ free lessons', 'Community forum', 'Course previews', 'Weekly newsletter'], highlight: false, cta: 'Start learning free' },
  { name: 'Pro Learner', price: '$24', period: '/month', desc: 'Unlimited access to every course and certificate.', features: ['All 1,200+ courses unlocked', 'Verified certificates', 'Downloadable resources', 'Progress dashboard', 'Offline viewing', 'Priority instructor Q&A'], highlight: true, cta: 'Go Pro — 7 days free' },
  { name: 'Teams', price: '$19', period: '/seat/month', desc: 'Upskill your whole team with admin insights.', features: ['Everything in Pro', 'Team analytics & reporting', 'Custom learning paths', 'SSO & provisioning', 'Dedicated success manager'], highlight: false, cta: 'Talk to sales' },
];

const testimonials = [
  { quote: 'I went from marketing coordinator to product designer in eight months. The project-based curriculum gave me a portfolio that actually got interviews.', name: 'Priya Sharma', role: 'Product Designer at Linear', c1: '#7c3aed', c2: '#c084fc' },
  { quote: 'The TypeScript bootcamp is the single best technical course I have taken anywhere — and I have taken a lot. Daniel explains the "why" behind everything.', name: 'Tom Becker', role: 'Frontend Engineer at Shopify', c1: '#2563eb', c2: '#60a5fa' },
  { quote: 'We rolled Coursify Teams out to 120 people. Completion rates tripled compared to our old platform, and the analytics make my reviews easy.', name: 'Elena Vasquez', role: 'Head of L&D at Notion', c1: '#db2777', c2: '#f9a8d4' },
];

const footerCols = [
  { title: 'Learn', links: ['All Courses', 'Learning Paths', 'Certificates', 'Free Lessons'] },
  { title: 'Teach', links: ['Become an Instructor', 'Handbook', 'Studio Guidelines', 'Revenue Share'] },
  { title: 'Company', links: ['About', 'Careers', 'Blog', 'Contact'] },
  { title: 'Support', links: ['Help Center', 'Privacy', 'Terms', 'Accessibility'] },
];

function Thumb({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <div style={{ aspectRatio: '16 / 9', background: `linear-gradient(135deg, ${c1}, ${c2})`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
      </div>
    </div>
  );
}

function Avatar({ c1, c2, name, size, ring }: { c1: string; c2: string; name: string; size: number; ring?: boolean }) {
  const initials = name.split(' ').map(w => w[0]).join('');
  return <div style={{ width: size, height: size, borderRadius: '50%', background: `linear-gradient(140deg, ${c1}, ${c2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: size / 2.6, fontWeight: 800, flexShrink: 0, border: ring ? `3px solid ${amber}` : 'none' }}>{initials}</div>;
}

export default function CoursifyEducationPreview() {
  const m = useIsMobile();
  const [cat, setCat] = useState('All');
  const [openModule, setOpenModule] = useState(1);
  const pad = m ? '0 1.25rem' : '0 2rem';
  const visible = cat === 'All' ? courses : courses.filter(c => c.category === cat);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#fff', color: ink, minHeight: '100vh' }}>
      {/* Nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(14px)', borderBottom: '1px solid #eee9fb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad, height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: `linear-gradient(135deg, ${violet}, #a855f7)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '17px', boxShadow: '0 4px 14px rgba(124,58,237,0.35)' }}>C</div>
            <span style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.03em' }}>Coursify</span>
          </div>
          {!m && <nav style={{ display: 'flex', gap: '1.9rem' }}>{['Courses', 'Paths', 'Instructors', 'Pricing', 'For Teams'].map(l => <a key={l} href="#courses" style={{ fontSize: '14px', fontWeight: 500, color: muted, textDecoration: 'none' }}>{l}</a>)}</nav>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {!m && <a href="#" style={{ fontSize: '14px', fontWeight: 600, color: ink, textDecoration: 'none' }}>Log in</a>}
            <a href="#" style={{ background: violet, color: '#fff', borderRadius: '9999px', padding: m ? '9px 16px' : '10px 22px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 6px 18px rgba(124,58,237,0.3)' }}>Start free</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #faf7ff 0%, #fff 100%)' }}>
        <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.16), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: m ? '3rem 1.25rem 3.5rem' : '4.5rem 2rem 5rem', display: 'grid', gridTemplateColumns: m ? '1fr' : '1.1fr 0.9fr', gap: m ? '2.5rem' : '3.5rem', alignItems: 'center', position: 'relative' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.35)', color: '#b45309', borderRadius: '9999px', padding: '6px 16px', fontSize: '13px', fontWeight: 600, marginBottom: '1.5rem' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#b45309"><path d="M13 2L3 14h7l-1 8 10-12h-7z" /></svg>New: 120 courses added this season
            </span>
            <h1 style={{ fontSize: m ? '2.4rem' : 'clamp(2.6rem, 5.5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.07, margin: 0 }}>
              Learn the skills that <span style={{ background: `linear-gradient(90deg, ${violet}, ${amber})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>move your career</span>
            </h1>
            <p style={{ fontSize: m ? '1rem' : '1.125rem', color: muted, lineHeight: 1.75, maxWidth: '480px', margin: '1.5rem 0 2rem' }}>Project-based courses taught by industry experts, with progress tracking, certificates, and a community that won&apos;t let you quit.</p>
            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #e7e2f5', borderRadius: '16px', padding: '8px 8px 8px 18px', boxShadow: '0 14px 40px rgba(30,27,46,0.08)', maxWidth: '520px' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={muted} strokeWidth="2" style={{ marginRight: '10px', flexShrink: 0 }}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
              <span style={{ flex: 1, fontSize: '15px', color: muted }}>Try &ldquo;TypeScript&rdquo;, &ldquo;Figma&rdquo;, &ldquo;SQL&rdquo;…</span>
              <button style={{ background: violet, color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 22px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 16px rgba(124,58,237,0.3)' }}>Explore</button>
            </div>
            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.5rem', alignItems: 'center' }}>
              <a href="#courses" style={{ fontSize: '14px', fontWeight: 700, color: violet, textDecoration: 'none' }}>Browse all courses →</a>
              <span style={{ fontSize: '13px', color: muted }}>No credit card needed</span>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 70px rgba(124,58,237,0.22)', border: '4px solid #fff' }}>
              <div style={{ aspectRatio: m ? '16 / 10' : '4 / 5', background: `linear-gradient(150deg, ${violet}, #9333ea 55%, ${amber})`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem', background: 'rgba(255,255,255,0.95)', borderRadius: '14px', padding: '0.9rem 1.1rem' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800 }}>React & TypeScript Bootcamp</div>
                  <div style={{ fontSize: '12px', color: muted }}>Lesson 12 of 92 · 94% complete</div>
                  <div style={{ height: '6px', borderRadius: '9999px', background: '#eee', marginTop: '8px', overflow: 'hidden' }}><div style={{ width: '94%', height: '100%', background: violet }} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section style={{ borderTop: '1px solid #f0ecfb', borderBottom: '1px solid #f0ecfb', background: '#fdfcff', padding: '1.75rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a39ec2' }}>Teams learn with Coursify</span>
          {['Shopify', 'Notion', 'Linear', 'Duolingo', 'Canva', 'Intercom'].map(b => <span key={b} style={{ fontSize: m ? '15px' : '17px', fontWeight: 800, color: '#c9c3e2', letterSpacing: '-0.02em' }}>{b}</span>)}
        </div>
      </section>

      {/* Courses */}
      <section id="courses" style={{ padding: m ? '3.5rem 0' : '5.5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: violet }}>Catalog</span>
            <h2 style={{ fontSize: m ? '1.9rem' : 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0.6rem 0 0.8rem' }}>Find your next course</h2>
            <p style={{ color: muted, fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto' }}>Hand-vetted instructors, project-first lessons, and certificates employers recognize.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{ padding: '9px 20px', borderRadius: '9999px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', border: cat === c ? `1.5px solid ${violet}` : '1.5px solid #e7e2f5', background: cat === c ? violet : '#fff', color: cat === c ? '#fff' : muted, boxShadow: cat === c ? '0 6px 16px rgba(124,58,237,0.28)' : 'none' }}>{c}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
            {visible.map(course => (
              <div key={course.title} style={{ borderRadius: '20px', border: '1px solid #f0ecfb', background: '#fff', overflow: 'hidden', boxShadow: '0 8px 28px rgba(30,27,46,0.06)' }}>
                <div style={{ position: 'relative' }}>
                  <Thumb c1={course.c1} c2={course.c2} />
                  <span style={{ position: 'absolute', top: '12px', left: '12px', background: course.badge === 'Bestseller' ? amber : violet, color: '#fff', borderRadius: '9999px', padding: '4px 12px', fontSize: '11px', fontWeight: 700 }}>{course.badge}</span>
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

      {/* Instructors */}
      <section style={{ background: '#faf7ff', padding: m ? '3.5rem 0' : '5.5rem 0', borderTop: '1px solid #f0ecfb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: violet }}>Instructors</span>
              <h2 style={{ fontSize: m ? '1.8rem' : 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0.6rem 0 0' }}>Learn from people who&apos;ve done it</h2>
            </div>
            {!m && <a href="#" style={{ fontSize: '14px', fontWeight: 700, color: violet, textDecoration: 'none' }}>Meet all 240 instructors →</a>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4, 1fr)', gap: m ? '1rem' : '1.5rem' }}>
            {instructors.map(p => (
              <div key={p.name} style={{ background: '#fff', borderRadius: '20px', border: '1px solid #f0ecfb', padding: m ? '1.25rem' : '1.75rem', textAlign: 'center', boxShadow: '0 8px 24px rgba(30,27,46,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}><Avatar c1={p.c1} c2={p.c2} name={p.name} size={84} ring /></div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px' }}>{p.name}</h3>
                <p style={{ fontSize: '13px', color: muted, margin: '0 0 14px' }}>{p.role}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', fontSize: '12px', fontWeight: 600, flexWrap: 'wrap' }}>
                  <span style={{ background: '#f5f1fd', borderRadius: '9999px', padding: '5px 12px' }}>{p.courses} courses</span>
                  <span style={{ background: 'rgba(245,158,11,0.12)', borderRadius: '9999px', padding: '5px 12px', color: '#b45309' }}>{p.learners} learners</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section style={{ padding: m ? '3.5rem 0' : '5.5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad, display: 'grid', gridTemplateColumns: m ? '1fr' : '0.85fr 1.15fr', gap: m ? '2rem' : '3.5rem', alignItems: 'start' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: violet }}>Featured course</span>
            <h2 style={{ fontSize: m ? '1.7rem' : 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0.6rem 0 1rem', lineHeight: 1.15 }}>React & TypeScript Bootcamp</h2>
            <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>Sixty-two hours of hands-on lessons that take you from typed components to a deployed production app. Every module ends with a project you&apos;ll actually want in your portfolio.</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {['92 lessons', '16h 50m video', 'Certificate included', 'Lifetime access'].map(t => <span key={t} style={{ fontSize: '12px', fontWeight: 600, background: '#f5f1fd', color: violet, borderRadius: '9999px', padding: '6px 14px' }}>{t}</span>)}
            </div>
            <a href="#" style={{ display: 'inline-block', background: `linear-gradient(135deg, ${violet}, #a855f7)`, color: '#fff', borderRadius: '14px', padding: '14px 30px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 10px 26px rgba(124,58,237,0.32)' }}>Enroll for $119</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {curriculum.map((mod, i) => {
              const open = openModule === i;
              return (
                <div key={mod.module} style={{ border: open ? `1.5px solid ${violet}` : '1.5px solid #ece7f8', borderRadius: '16px', background: open ? '#faf7ff' : '#fff', overflow: 'hidden' }}>
                  <button onClick={() => setOpenModule(open ? -1 : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', background: 'transparent', border: 'none', padding: '1.1rem 1.25rem', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                      <span style={{ width: '30px', height: '30px', borderRadius: '9px', background: open ? violet : '#f0ebfb', color: open ? '#fff' : violet, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ fontSize: m ? '14px' : '15px', fontWeight: 700, color: ink }}>{mod.module}</span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                      {!m && <span style={{ fontSize: '12px', color: muted, fontWeight: 600 }}>{mod.lessons} · {mod.duration}</span>}
                      <span style={{ fontSize: '15px', color: violet, fontWeight: 800 }}>{open ? '−' : '+'}</span>
                    </span>
                  </button>
                  {open && (
                    <ul style={{ listStyle: 'none', margin: 0, padding: m ? '0 1.25rem 1.2rem 1.25rem' : '0 1.4rem 1.2rem 3.75rem', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                      {mod.topics.map(t => <li key={t} style={{ fontSize: '14px', color: muted, display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: amber, flexShrink: 0 }} />{t}</li>)}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section style={{ background: ink, padding: m ? '3.5rem 0' : '4.5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: amber }}>Outcomes</span>
            <h2 style={{ fontSize: m ? '1.7rem' : 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0.6rem 0 0', color: '#fff' }}>Learning that actually sticks</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? 'repeat(2,1fr)' : 'repeat(4, 1fr)', gap: m ? '1rem' : '1.5rem' }}>
            {outcomes.map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '18px', padding: m ? '1.5rem 1rem' : '2rem 1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: m ? '1.9rem' : '2.4rem', fontWeight: 900, letterSpacing: '-0.03em', color: s.dark ? '#fbbf24' : '#a78bfa', marginBottom: '8px' }}>{s.value}</div>
                <div style={{ fontSize: '13px', color: '#b8b3d0', lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section id="Pricing" style={{ padding: m ? '3.5rem 0' : '5.5rem 0', background: '#fdfcff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: violet }}>Membership</span>
            <h2 style={{ fontSize: m ? '1.9rem' : 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0.6rem 0 0.8rem' }}>One subscription, every course</h2>
            <p style={{ color: muted, fontSize: '1.05rem' }}>Cancel anytime. Certificates and progress stay yours forever.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '1.75rem', alignItems: 'start' }}>
            {tiers.map(t => (
              <div key={t.name} style={{ position: 'relative', background: '#fff', borderRadius: '22px', padding: m ? '1.75rem' : '2.25rem', border: t.highlight ? `2px solid ${violet}` : '1px solid #ece7f8', boxShadow: t.highlight ? '0 24px 60px rgba(124,58,237,0.18)' : '0 8px 24px rgba(30,27,46,0.05)' }}>
                {t.highlight && <span style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(90deg, ${violet}, ${amber})`, color: '#fff', borderRadius: '9999px', padding: '5px 18px', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>Most popular</span>}
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 6px' }}>{t.name}</h3>
                <p style={{ fontSize: '13px', color: muted, margin: '0 0 1.25rem', lineHeight: 1.6 }}>{t.desc}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2.6rem', fontWeight: 900, letterSpacing: '-0.04em' }}>{t.price}</span>
                  <span style={{ fontSize: '14px', color: muted }}>{t.period}</span>
                </div>
                <a href="#" style={{ display: 'block', textAlign: 'center', borderRadius: '12px', padding: '12px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', background: t.highlight ? violet : '#f5f1fd', color: t.highlight ? '#fff' : violet, marginBottom: '1.5rem', boxShadow: t.highlight ? '0 8px 20px rgba(124,58,237,0.3)' : 'none' }}>{t.cta}</a>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {t.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#4b4666' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={amber} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: m ? '3.5rem 0' : '5.5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: violet }}>Learner stories</span>
            <h2 style={{ fontSize: m ? '1.9rem' : 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0.6rem 0 0' }}>People change careers here</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: '#faf7ff', borderRadius: '20px', border: '1px solid #ece7f8', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ color: amber, fontSize: '15px', letterSpacing: '2px' }}>★★★★★</div>
                <p style={{ fontSize: '14.5px', color: '#4b4666', lineHeight: 1.75, margin: 0, flex: 1 }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar c1={t.c1} c2={t.c2} name={t.name} size={44} />
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

      {/* CTA */}
      <section style={{ padding: m ? '0 1.25rem 3.5rem' : '0 2rem 5.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', borderRadius: '28px', background: `linear-gradient(120deg, ${violet} 0%, #9333ea 55%, ${amber} 130%)`, padding: m ? '3rem 1.5rem' : '4.5rem 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
          <h2 style={{ fontSize: m ? '2rem' : 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 1rem', position: 'relative' }}>Your future self says thanks</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', maxWidth: '460px', margin: '0 auto 2.25rem', position: 'relative' }}>Join 2.4 million learners building careers they&apos;re proud of. Your first week of Pro is on us.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', position: 'relative' }}>
            <a href="#" style={{ background: '#fff', color: violet, borderRadius: '14px', padding: '15px 32px', fontSize: '15px', fontWeight: 800, textDecoration: 'none', boxShadow: '0 12px 30px rgba(30,27,46,0.25)' }}>Start 7-day free trial</a>
            <a href="#courses" style={{ border: '1.5px solid rgba(255,255,255,0.5)', color: '#fff', borderRadius: '14px', padding: '15px 32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>View all courses</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #ece7f8', background: '#faf8ff', padding: m ? '3rem 0 2rem' : '3.5rem 0 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: pad }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: m ? '2rem' : '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
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
                  {col.links.map(l => <li key={l}><a href="#" style={{ fontSize: '13.5px', color: muted, textDecoration: 'none' }}>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #ece7f8', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '13px', color: '#a39ec2', margin: 0 }}>© 2026 Coursify Learning, Inc.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>{['Twitter', 'YouTube', 'Instagram', 'LinkedIn'].map(s => <a key={s} href="#" style={{ fontSize: '13px', color: '#a39ec2', textDecoration: 'none' }}>{s}</a>)}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
