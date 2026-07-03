import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import Container from '../components/ui/Container';
import { templates } from '../data/templates';
import { useReveal } from '../hooks/useReveal';

const team = [
  { name: 'Alex Rivera', role: 'Founder & Designer', avatar: 'AR' },
  { name: 'Sam Chen', role: 'Lead Developer', avatar: 'SC' },
  { name: 'Jordan Lee', role: 'Template Creator', avatar: 'JL' },
];

const values = [
  {
    title: 'Quality first',
    desc: 'Every template goes through a rigorous design and code review before it reaches our marketplace.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="var(--color-accent)" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: 'Developer experience',
    desc: 'Clean, well-documented code so you spend time building features — not deciphering someone else\'s spaghetti.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="var(--color-accent)" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Fair pricing',
    desc: 'Buy once, use forever. No subscriptions, no seat limits — just honest one-time pricing.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="var(--color-accent)" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

/** Cursor-following spotlight for .bento-tile */
function handleSpot(e: React.PointerEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
}

const templateCount = templates.length;
const freeCount = templates.filter(t => t.isFree).length;

export default function AboutPage() {
  useSEO({ title: 'About', description: 'Learn about Templix — who we are, our mission, and the team behind the templates.' });

  const [valuesGridRef, valuesGridCls] = useReveal<HTMLDivElement>();
  const [teamRowRef, teamRowCls] = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-canvas">

      {/* Hero */}
      <section className="aurora aurora--dim grain">
        <Container style={{ paddingTop: '7rem', paddingBottom: '6rem', maxWidth: '760px', textAlign: 'center', position: 'relative' }}>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">
            About us
          </p>
          <h1 className="headline-fade m-0 mb-5 text-[clamp(2.25rem,5vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
            We build templates so you can build products
          </h1>
          <p className="m-0 text-[17px] leading-relaxed text-text-secondary">
            Templix started with a simple frustration — spending days on boilerplate instead of shipping features.
            We build high-quality, production-ready templates so developers and founders can skip the setup and get straight to building.
          </p>
        </Container>
      </section>

      <div className="hairline" />

      {/* Values — bento */}
      <section>
        <Container style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Our principles</p>
          <h2 className="m-0 mb-10 text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-text-primary">
            What we believe
          </h2>

          <div ref={valuesGridRef} className={`reveal-group grid grid-cols-12 gap-6 ${valuesGridCls}`}>
            {/* Stat tile */}
            <div
              className="bento-tile col-span-4 flex flex-col justify-between p-7 max-lg:col-span-6 max-sm:col-span-12"
              onPointerMove={handleSpot}
            >
              <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">The library</p>
              <div>
                <p className="text-gradient-brand m-0 font-mono text-[64px] font-semibold leading-none" style={{ fontFeatureSettings: '"tnum"' }}>
                  {templateCount}
                </p>
                <p className="m-0 mt-2 text-sm text-text-secondary">
                  production-ready templates, {freeCount} of them free
                </p>
              </div>
            </div>

            {/* Mission tile */}
            <div
              className="bento-tile col-span-8 flex flex-col justify-center p-7 max-lg:col-span-6 max-sm:col-span-12"
              onPointerMove={handleSpot}
            >
              <p className="m-0 mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">The mission</p>
              <h3 className="m-0 mb-3 text-2xl font-semibold leading-[1.25] tracking-[-0.015em] text-text-primary">
                Skip the boilerplate. Ship the product.
              </h3>
              <p className="m-0 max-w-[52ch] text-[15px] leading-relaxed text-text-secondary">
                Every hour spent wiring up auth screens and pricing pages is an hour not spent on the thing that makes your product different. We handle the first mile.
              </p>
            </div>

            {/* Value tiles */}
            {values.map(v => (
              <div
                key={v.title}
                className="bento-tile col-span-4 p-7 max-lg:col-span-6 max-sm:col-span-12"
                onPointerMove={handleSpot}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-accent-soft-border bg-accent-soft">
                  {v.icon}
                </div>
                <h3 className="m-0 mb-1.5 text-lg font-semibold tracking-[-0.01em] text-text-primary">{v.title}</h3>
                <p className="m-0 text-sm leading-relaxed text-text-secondary">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div className="hairline" />

      {/* Team */}
      <section className="bg-canvas-raised">
        <Container style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">The people</p>
          <h2 className="m-0 mb-10 text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-text-primary">
            The team
          </h2>
          <div ref={teamRowRef} className={`reveal-group flex flex-wrap gap-6 ${teamRowCls}`}>
            {team.map(member => (
              <div
                key={member.name}
                className="sheen flex min-w-[240px] items-center gap-4 rounded-2xl border border-border-subtle bg-surface-1 px-6 py-5 transition-colors duration-200 hover:border-border-strong"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ background: 'var(--gradient-brand)' }}
                  aria-hidden="true"
                >
                  {member.avatar}
                </div>
                <div>
                  <p className="m-0 text-[15px] font-semibold text-text-primary">{member.name}</p>
                  <p className="m-0 mt-0.5 text-[13px] text-text-tertiary">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div className="hairline" />

      {/* CTA */}
      <section>
        <Container style={{ paddingTop: '6rem', paddingBottom: '7rem', textAlign: 'center' }}>
          <h2 className="m-0 mb-3 text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-text-primary">
            Ready to build faster?
          </h2>
          <p className="m-0 mb-8 text-[15px] text-text-secondary">
            Browse our library of professionally designed templates.
          </p>
          <Link to="/templates" className="btn btn-primary btn-lg glow-cta">
            Browse templates
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </Container>
      </section>

    </div>
  );
}
