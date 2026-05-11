import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import Container from '../components/ui/Container';

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'For personal projects and exploration.',
    cta: 'Get started free',
    ctaTo: '/templates',
    highlighted: false,
    features: ['Access to all free templates', 'Community support', 'Personal use license', '1 active project'],
  },
  {
    name: 'Pro',
    price: 79,
    description: 'For freelancers and professional developers.',
    cta: 'Get Pro',
    ctaTo: '/templates',
    highlighted: true,
    features: ['Access to all templates', 'Priority email support', 'Commercial use license', 'Unlimited projects', 'Figma source files', 'Free lifetime updates'],
  },
  {
    name: 'Team',
    price: 199,
    description: 'For agencies and growing teams.',
    cta: 'Get Team',
    ctaTo: '/templates',
    highlighted: false,
    features: ['Everything in Pro', 'Up to 10 team members', 'Dedicated support', 'Custom license terms', 'Invoice billing', 'Early access to new templates'],
  },
];

export default function PricingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      <Container style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#38bdf8', marginBottom: '8px' }}>
            Pricing
          </p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff', margin: '0 0 1rem', letterSpacing: '-0.02em' }}>
            Simple, transparent pricing
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8', maxWidth: '440px', margin: '0 auto' }}>
            Start for free. Upgrade when you're ready.
          </p>
        </div>

        {/* Plans */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '960px', margin: '0 auto' }}>
          {plans.map(plan => (
            <div
              key={plan.name}
              style={{
                position: 'relative', display: 'flex', flexDirection: 'column',
                borderRadius: '20px', padding: '2rem',
                border: plan.highlighted ? '1px solid #38bdf8' : '1px solid #1e293b',
                background: plan.highlighted ? 'rgba(56,189,248,0.04)' : '#0f172a',
                boxShadow: plan.highlighted ? '0 0 60px rgba(56,189,248,0.08)' : 'none',
              }}
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <div style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
                  <span style={{
                    borderRadius: '9999px', background: '#38bdf8',
                    padding: '4px 16px', fontSize: '11px', fontWeight: 700,
                    color: '#020617', textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>
                    Most popular
                  </span>
                </div>
              )}

              <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', margin: '0 0 4px' }}>{plan.name}</h2>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 1.5rem' }}>{plan.description}</p>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '2rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                  {plan.price === 0 ? 'Free' : `$${plan.price}`}
                </span>
                {plan.price > 0 && (
                  <span style={{ fontSize: '14px', color: '#475569', marginBottom: '6px' }}>/year</span>
                )}
              </div>

              {/* Features */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#cbd5e1' }}>
                    <Check size={15} style={{ color: plan.highlighted ? '#38bdf8' : '#475569', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to={plan.ctaTo} style={{
                display: 'block', textAlign: 'center', borderRadius: '12px',
                padding: '12px', fontSize: '14px', fontWeight: 600,
                textDecoration: 'none',
                background: plan.highlighted ? '#38bdf8' : 'transparent',
                color: plan.highlighted ? '#020617' : '#94a3b8',
                border: plan.highlighted ? 'none' : '1px solid #334155',
              }}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Note */}
        <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: '13px', color: '#475569' }}>
          All plans include a 30-day money-back guarantee. No questions asked.
        </p>

      </Container>
    </div>
  );
}
