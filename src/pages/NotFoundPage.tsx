import { Link } from 'react-router-dom';
import { ArrowLeft, LayoutGrid } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export default function NotFoundPage() {
  useSEO({ title: 'Page not found' });

  return (
    <div className="aurora aurora--dim grain flex min-h-[calc(100vh-64px)] items-center justify-center bg-canvas px-6 py-24">
      <div className="max-w-[520px] text-center">

        {/* Ghost numeral */}
        <p
          aria-hidden="true"
          className="headline-fade m-0 select-none font-mono text-[clamp(96px,20vw,160px)] font-semibold leading-none tracking-[-0.04em]"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          404
        </p>

        <p className="m-0 mb-3 mt-6 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">
          Lost in the gallery
        </p>
        <h1 className="m-0 mb-3 text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] text-text-primary">
          Page not found
        </h1>
        <p className="m-0 mb-10 text-[15px] leading-[1.6] text-text-secondary">
          Sorry, we couldn't find the page you're looking for. It may have been
          moved, renamed, or never existed at all.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={15} />
            Back to home
          </Link>
          <Link to="/templates" className="btn btn-secondary">
            <LayoutGrid size={15} />
            Browse templates
          </Link>
        </div>

        {/* Quick links */}
        <div className="hairline mx-auto mt-12 max-w-[360px]" />
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            { to: '/templates',  label: 'Templates' },
            { to: '/categories', label: 'Categories' },
            { to: '/about',      label: 'About' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[13px] font-medium text-text-tertiary no-underline transition-colors duration-150 hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
