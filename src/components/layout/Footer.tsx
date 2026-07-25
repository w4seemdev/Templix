import { Link } from 'react-router-dom';

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
      { label: 'Support', to: '/support' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    group: 'Legal',
    items: [
      { label: 'License', to: '/license' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Privacy Policy', to: '/privacy' },
    ],
  },
];

/* Brand social icons inlined (lucide brand icons are deprecated).
   Only profiles that actually exist belong here - a dead link to a platform
   homepage reads as a fake storefront. */
const socials: { label: string; href: string; path: string }[] = [
  {
    label: 'GitHub (opens in new tab)',
    href: 'https://github.com/w4seemdev',
    path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border-subtle bg-canvas-raised">
      <div className="mx-auto max-w-[1240px] px-4 pb-10 pt-16 sm:px-6 md:pt-20">

        {/* ── Top row: brand ──
             No newsletter form here: there is no subscriber backend yet, and a
             form that silently discards the address would be a false promise. */}
        <div className="mb-12 max-w-sm">
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
            Professionally designed website templates for developers and designers -
            preview live, buy once, ship faster.
          </p>
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
            <span className="text-[13px] text-text-tertiary">
              Independently built and run.
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
