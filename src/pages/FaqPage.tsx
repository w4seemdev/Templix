import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import Container from '../components/ui/Container';

interface Faq {
  q: string;
  a: React.ReactNode;
}

const faqs: Faq[] = [
  {
    q: 'What license do templates come with?',
    a: (
      <>
        Every template — free or paid — is covered by the single Templix Standard License. You may use it in
        unlimited personal and commercial end-products and modify it freely; you may not resell, redistribute,
        sublicense, or offer the template itself for download. Read the full{' '}
        <Link to="/license" className="font-medium text-accent no-underline hover:underline">License</Link>.
      </>
    ),
  },
  {
    q: 'What is included when I buy a template?',
    a: (
      <>
        The complete React + TypeScript source (built with Vite), a fully responsive mobile-first layout, a
        quick-start README with setup steps, and the Templix Standard License. That is the entire deliverable — we
        do not advertise design files or extras that are not in the download.
      </>
    ),
  },
  {
    q: 'What is the tech stack?',
    a: (
      <>
        Each template is one responsive single-page site built with React 19 and TypeScript, bundled with Vite.
        Styling is self-contained, so there is no build-time CSS framework to configure — you can run it with a
        single <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[13px] text-text-primary">npm install</code>{' '}
        and <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[13px] text-text-primary">npm run dev</code>.
      </>
    ),
  },
  {
    q: 'Can I preview a template before buying?',
    a: (
      <>
        Yes. Every template has a live preview you can open from its detail page — click through the real,
        fully-interactive site at desktop and mobile widths before you decide.
      </>
    ),
  },
  {
    q: 'How do I pay?',
    a: (
      <>
        Checkout is handled by Stripe. All major credit and debit cards are accepted, and prices are listed in USD.
        Payment happens entirely on Stripe&apos;s secure checkout page — we never see or store your card details — and
        Stripe emails you a receipt automatically after purchase.
      </>
    ),
  },
  {
    q: 'How do I download after purchasing?',
    a: (
      <>
        Your download is available the moment checkout clears, from the template page and from your dashboard.
        You can re-download a template you own at any time. Free templates can be downloaded without a purchase.
      </>
    ),
  },
  {
    q: 'Do templates receive updates?',
    a: (
      <>
        When we ship a fix or improvement to a template, the updated version becomes available to re-download from
        your dashboard at no additional cost — you will not be charged again for a template you already own.
      </>
    ),
  },
  {
    q: 'What is your refund policy?',
    a: (
      <>
        Because templates are digital downloads, sales are generally final. If a template is fundamentally broken or
        materially misrepresented, email us within 7 days of purchase and we will review your case.{' '}
        <Link to="/support" className="font-medium text-accent no-underline hover:underline">Contact support</Link>{' '}
        to start.
      </>
    ),
  },
  {
    q: 'Do I need an account to buy?',
    a: (
      <>
        Yes — an account ties your purchases to you so you can re-download anytime and see your library. Browsing
        and live previews are open to everyone; only downloading a paid template requires signing in.
      </>
    ),
  },
];

export default function FaqPage() {
  useSEO({
    title: 'FAQ',
    description: 'Answers to common questions about Templix licensing, refunds, downloads, updates, and tech stack.',
  });

  return (
    <div className="min-h-screen bg-canvas">
      <Container style={{ paddingTop: 'clamp(48px, 8vw, 80px)', paddingBottom: '96px', maxWidth: '760px' }}>

        <header className="mb-12 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Help center</p>
          <h1 className="headline-fade mx-auto text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[44px]">
            Frequently asked questions
          </h1>
          <p className="mx-auto mt-3 max-w-[52ch] text-[15px] leading-[1.6] text-text-secondary">
            Licensing, refunds, downloads, updates, and the tech behind every template.
          </p>
        </header>

        <div className="flex flex-col gap-3">
          {faqs.map(faq => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-border-subtle bg-surface-1 [&[open]]:border-border-strong"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[15px] font-semibold text-text-primary marker:hidden [&::-webkit-details-marker]:hidden">
                {faq.q}
                <ChevronDown
                  size={18}
                  className="shrink-0 text-text-tertiary transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="px-6 pb-5 text-[15px] leading-[1.7] text-text-secondary">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        {/* Still stuck */}
        <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-border-subtle bg-canvas-raised px-6 py-10 text-center">
          <h2 className="m-0 text-lg font-semibold text-text-primary">Still have a question?</h2>
          <p className="m-0 max-w-[42ch] text-[15px] leading-[1.6] text-text-secondary">
            If your question is not answered here, our support team is happy to help.
          </p>
          <Link to="/support" className="btn btn-primary">
            Contact support
            <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>

      </Container>
    </div>
  );
}
