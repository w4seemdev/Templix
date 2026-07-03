import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const linkColumns: { group: string; items: { label: string; to: string }[] }[] = [
  {
    group: 'Product',
    items: [
      { label: 'Browse Templates', to: '/templates' },
      { label: 'Categories', to: '/categories' },
      { label: 'Wishlist', to: '/wishlist' },
    ],
  },
  {
    group: 'Company',
    items: [
      { label: 'About', to: '/about' },
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Sign in', to: '/login' },
    ],
  },
  {
    group: 'Legal',
    items: [
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Privacy Policy', to: '/privacy' },
    ],
  },
];

/* Brand social icons inlined (lucide brand icons are deprecated). */
const socials: { label: string; href: string; path: string }[] = [
  {
    label: 'X (Twitter)',
    href: 'https://x.com',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
  {
    label: 'Dribbble',
    href: 'https://dribbble.com',
    path: 'M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z',
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <footer className="relative overflow-hidden border-t border-border-subtle bg-canvas-raised">
      <div className="mx-auto max-w-[1240px] px-4 pb-10 pt-16 sm:px-6 md:pt-20">

        {/* ── Top row: brand + newsletter ── */}
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="max-w-sm">
            <Link to="/" className="mb-4 inline-flex items-center gap-2.5 no-underline">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                style={{ background: 'var(--gradient-brand)', boxShadow: '0 0 12px -2px rgba(124,92,252,0.5)' }}
              >
                <svg width="13" height="13" fill="#FFFFFF" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" />
                </svg>
              </div>
              <span className="text-base font-semibold tracking-[-0.02em] text-text-primary">Templix</span>
            </Link>
            <p className="m-0 text-[13px] leading-relaxed text-text-tertiary">
              Professionally designed website templates for developers and designers —
              preview live, buy once, ship faster.
            </p>
          </div>

          {/* Newsletter */}
          <div className="w-full max-w-sm">
            <p className="m-0 mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
              Stay in the loop
            </p>
            <p className="m-0 mb-3 text-[13px] text-text-secondary">
              New drops, restocks and freebies. No spam.
            </p>
            {subscribed ? (
              <div className="flex h-10 items-center gap-2 rounded-lg border border-success-soft-border bg-success-soft px-3.5 text-[13px] font-medium text-success">
                <Check size={15} aria-hidden="true" />
                You&apos;re on the list — welcome aboard.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <label htmlFor="footer-newsletter" className="sr-only">Email address</label>
                <input
                  id="footer-newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@studio.com"
                  className="h-10 min-w-0 flex-1 rounded-lg border border-border-default bg-surface-2 px-3.5 text-[13px] text-text-primary outline-none transition-colors duration-150 placeholder:text-text-tertiary focus:border-border-accent"
                />
                <button type="submit" className="btn btn-primary btn-sm shrink-0">
                  Subscribe
                  <ArrowRight size={13} aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="hairline mb-12" />

        {/* ── Link columns ── */}
        <div className="mb-16 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:max-w-2xl">
          {linkColumns.map(({ group, items }) => (
            <div key={group}>
              <p className="m-0 mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                {group}
              </p>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {items.map(item => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-sm text-text-secondary no-underline transition-colors duration-150 hover:text-text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-6">
          <p className="m-0 text-[13px] text-text-tertiary">
            © {new Date().getFullYear()} Templix. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {/* Status dot */}
            <span className="flex items-center gap-2 text-[13px] text-text-tertiary">
              <span className="tmx-pulse h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
              All systems normal
            </span>

            {/* Socials */}
            <div className="flex items-center gap-4">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="text-text-secondary opacity-50 transition-opacity duration-150 hover:opacity-100"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>

            <div className="flex gap-5">
              <Link to="/terms" className="text-[13px] text-text-tertiary no-underline transition-colors duration-150 hover:text-text-secondary">Terms</Link>
              <Link to="/privacy" className="text-[13px] text-text-tertiary no-underline transition-colors duration-150 hover:text-text-secondary">Privacy</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Signature watermark, clipped at the footer's bottom edge ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-8 select-none text-center font-semibold leading-none tracking-[-0.04em] text-white/[0.03]"
        style={{ fontSize: 'clamp(72px, 12vw, 160px)' }}
      >
        TEMPLIX
      </div>
    </footer>
  );
}
