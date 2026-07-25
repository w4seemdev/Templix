import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import Container from '../components/ui/Container';

/* Canonical Templix Standard License - must stay identical to the summary shown
   on each template detail page and referenced from the Terms of Service. */
const canDo = [
  'Use the template in unlimited personal and commercial end-products',
  'Modify, customize, and extend it freely',
  'Use it in paid client and freelance work - no attribution required',
];

const cannotDo = [
  'Resell or redistribute the template itself',
  'Sublicense the template to another party',
  'Offer the template (or a lightly-modified copy) for download or as a competing product',
];

export default function LicensePage() {
  useSEO({
    title: 'License',
    description: 'The Templix Standard License - how you may use free and paid templates from Templix.',
  });

  return (
    <div className="min-h-screen bg-canvas">
      <Container style={{ paddingTop: '5rem', paddingBottom: '7rem', maxWidth: '760px' }}>

        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Legal</p>
        <h1 className="m-0 mb-3 text-[clamp(2rem,4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text-primary">
          Templix Standard License
        </h1>
        <p className="m-0 mb-8 font-mono text-[13px] text-text-tertiary" style={{ fontFeatureSettings: '"tnum"' }}>
          Last updated: July 2026
        </p>

        <div className="hairline mb-12" />

        <p className="m-0 mb-10 text-[15px] leading-[1.85] text-text-secondary">
          Every template on Templix - free or paid - is covered by the single Templix Standard License below.
          There are no separate personal and commercial tiers: one license covers both. By downloading a template
          you agree to these terms.
        </p>

        {/* The grant - canonical wording */}
        <section className="mb-10 rounded-2xl border border-border-subtle bg-surface-1 p-6 sm:p-8">
          <h2 className="m-0 mb-3 text-lg font-semibold tracking-[-0.01em] text-text-primary">The grant</h2>
          <p className="m-0 text-[15px] leading-[1.85] text-text-secondary">
            The purchaser may use this template in unlimited personal and commercial end-products and may modify it
            freely. You may <strong className="font-semibold text-text-primary">not</strong> resell, redistribute,
            sublicense, or offer the template itself for download. Free templates carry the same usage terms with no
            purchase required.
          </p>
        </section>

        {/* What you can / cannot do */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6">
            <h2 className="m-0 mb-4 text-[15px] font-semibold text-text-primary">What you can do</h2>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {canDo.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-text-secondary">
                  <Check size={15} className="mt-[3px] shrink-0 text-success" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6">
            <h2 className="m-0 mb-4 text-[15px] font-semibold text-text-primary">What you cannot do</h2>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {cannotDo.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-text-secondary">
                  <X size={15} className="mt-[3px] shrink-0 text-danger" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mb-10">
          <h2 className="m-0 mb-3 text-lg font-semibold tracking-[-0.01em] text-text-primary">Free templates</h2>
          <p className="m-0 text-[15px] leading-[1.85] text-text-secondary">
            Free templates are covered by the exact same usage terms as paid ones - the only difference is that no
            purchase is required to download them. The restriction on reselling or redistributing the template itself
            still applies.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="m-0 mb-3 text-lg font-semibold tracking-[-0.01em] text-text-primary">Ownership</h2>
          <p className="m-0 text-[15px] leading-[1.85] text-text-secondary">
            A license grants you the right to use the template - it does not transfer ownership of the underlying
            design or source code. You may not claim the original template as your own work.
          </p>
        </section>

        <div className="hairline mt-2 mb-8" />
        <p className="m-0 text-[13px] leading-[1.7] text-text-tertiary">
          This license forms part of the{' '}
          <Link to="/terms" className="font-medium text-accent no-underline transition-colors duration-150 hover:text-accent-hover hover:underline">
            Terms of Service
          </Link>
          . Still have questions? Visit{' '}
          <Link to="/support" className="font-medium text-accent no-underline transition-colors duration-150 hover:text-accent-hover hover:underline">
            Support
          </Link>
          {' '}or the{' '}
          <Link to="/faq" className="font-medium text-accent no-underline transition-colors duration-150 hover:text-accent-hover hover:underline">
            FAQ
          </Link>
          .
        </p>

      </Container>
    </div>
  );
}
