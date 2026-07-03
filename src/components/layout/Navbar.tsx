import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Heart, Menu, Search, X } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../hooks/useWishlist';

const navLinks = [
  { label: 'Templates',  to: '/templates'  },
  { label: 'Categories', to: '/categories' },
  { label: 'About',      to: '/about'      },
];

// Keep in sync with the storage key inside src/hooks/useWishlist.ts —
// the hook holds per-instance state, so the navbar re-reads storage to stay live.
const WISHLIST_STORAGE_KEY = 'templix_wishlist';

const MOBILE_BREAKPOINT = '(max-width: 860px)';

/* Shared logomark: violet gradient tile + wordmark */
function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="inline-flex shrink-0 items-center gap-2.5 no-underline">
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
        style={{ background: 'var(--gradient-brand)', boxShadow: '0 0 12px -2px rgba(124,92,252,0.5)' }}
      >
        <svg width="13" height="13" fill="#FFFFFF" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" />
        </svg>
      </div>
      {!compact && (
        <span className="text-base font-semibold tracking-[-0.02em] text-text-primary">Templix</span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile]         = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_BREAKPOINT).matches : false,
  );
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY > 24 : false,
  );
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const { wishlist } = useWishlist();
  const [wishlistCount, setWishlistCount] = useState(wishlist.length);

  // Track viewport so the hamburger / desktop nav swap correctly.
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_BREAKPOINT);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Nav glass fades in once scrollY > 24 (spec: transparent at top of page).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close any open menus when the route changes.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- resetting transient menu state on navigation is intentional */
    setMenuOpen(false);
    setUserMenuOpen(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [pathname]);

  // A11y: Escape closes the mobile sheet / user dropdown.
  useEffect(() => {
    if (!menuOpen && !userMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setUserMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, userMenuOpen]);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    if (!(isMobile && menuOpen)) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobile, menuOpen]);

  // Keep the wishlist badge fresh: re-read on navigation, cross-tab storage
  // events, and window focus (useWishlist state is local to each consumer).
  useEffect(() => {
    const readCount = () => {
      try {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
        setWishlistCount(stored ? (JSON.parse(stored) as string[]).length : 0);
      } catch {
        setWishlistCount(0);
      }
    };
    readCount();
    window.addEventListener('storage', readCount);
    window.addEventListener('focus', readCount);
    return () => {
      window.removeEventListener('storage', readCount);
      window.removeEventListener('focus', readCount);
    };
  }, [pathname]);

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const initials    = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    setMenuOpen(false);
    navigate('/');
  };

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);
  const wishlistActive = isActive('/wishlist');

  const wishlistButton = (
    <Link
      to="/wishlist"
      aria-label={`Wishlist (${wishlistCount} item${wishlistCount === 1 ? '' : 's'})`}
      className={clsx(
        'relative flex h-9 w-9 items-center justify-center rounded-lg border no-underline transition-colors duration-150',
        wishlistActive
          ? 'border-accent-soft-border bg-accent-soft text-accent-text'
          : 'border-border-default bg-surface-2 text-text-secondary hover:border-border-strong hover:text-text-primary',
      )}
    >
      <Heart size={16} fill={wishlistActive ? 'currentColor' : 'none'} aria-hidden="true" />
      {wishlistCount > 0 && (
        <span
          className="absolute -right-1.5 -top-1.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-none text-white"
          style={{ boxShadow: '0 0 0 2px var(--color-canvas)' }}
        >
          {wishlistCount > 99 ? '99+' : wishlistCount}
        </span>
      )}
    </Link>
  );

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 w-full transition-all duration-200',
        scrolled ? 'glass-nav' : 'border-b border-transparent bg-transparent',
      )}
    >
      <div
        className={clsx(
          'mx-auto h-16 max-w-[1240px] items-center px-4 sm:px-6',
          isMobile ? 'flex justify-between' : 'grid grid-cols-[1fr_auto_1fr]',
        )}
      >

        {/* ── Left: Logo ── */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* ── Center: Nav links (desktop) ── */}
        {!isMobile && (
          <nav className="flex h-16 items-center gap-1" aria-label="Primary">
            {navLinks.map(link => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? 'page' : undefined}
                  className={clsx(
                    'relative flex h-16 items-center px-3 text-sm font-medium no-underline transition-colors duration-150',
                    active ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary',
                  )}
                >
                  {link.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-0 h-0.5 rounded-full"
                      style={{ background: 'var(--gradient-brand)' }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        {/* ── Right: search affordance + wishlist + auth state ── */}
        <div className="flex items-center justify-end gap-3">
          {!isMobile && (
            <Link
              to="/templates"
              aria-label="Search templates"
              className="group flex h-9 w-[200px] items-center gap-2 rounded-lg border border-border-default bg-surface-2 px-3 no-underline transition-colors duration-150 hover:border-border-strong"
            >
              <Search size={14} className="shrink-0 text-text-tertiary" aria-hidden="true" />
              <span className="flex-1 truncate text-[13px] text-text-tertiary group-hover:text-text-secondary">
                Search templates
              </span>
              <kbd className="rounded border border-border-default bg-surface-3 px-1.5 py-px font-mono text-[11px] leading-4 text-text-tertiary">
                ⌘K
              </kbd>
            </Link>
          )}

          {wishlistButton}

          {!isMobile && (user ? (
            /* ── Logged in: avatar + dropdown ── */
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border-default bg-surface-2 py-1 pl-1 pr-2.5 transition-colors duration-150 hover:border-border-strong"
              >
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                  style={{ background: 'var(--gradient-brand)' }}
                >
                  {initials}
                </div>
                <span className="max-w-[120px] truncate text-[13px] text-text-secondary">
                  {displayName.split(' ')[0]}
                </span>
                <ChevronDown
                  size={13}
                  className={clsx('shrink-0 text-text-tertiary transition-transform duration-150', userMenuOpen && 'rotate-180')}
                  aria-hidden="true"
                />
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div
                  className="absolute right-0 top-[calc(100%+10px)] z-[100] min-w-[210px] overflow-hidden rounded-xl border border-border-subtle bg-surface-3 shadow-pop"
                  style={{ animation: 'tmx-fade 150ms ease-out' }}
                >
                  <div className="border-b border-border-subtle px-3.5 py-3">
                    <p className="m-0 truncate text-[13px] font-semibold text-text-primary">{displayName}</p>
                    <p className="m-0 mt-0.5 truncate text-[11px] text-text-tertiary">{user.email}</p>
                  </div>
                  {[
                    { label: 'Dashboard', to: '/dashboard' },
                    { label: 'My purchases', to: '/dashboard' },
                  ].map(item => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setUserMenuOpen(false)}
                      className="block border-b border-border-subtle px-3.5 py-2.5 text-sm text-text-secondary no-underline transition-colors duration-150 hover:bg-white/[0.04] hover:text-text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <button
                    onClick={handleSignOut}
                    className="block w-full cursor-pointer border-0 bg-transparent px-3.5 py-2.5 text-left text-sm text-danger transition-colors duration-150 hover:bg-danger-soft"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ── Logged out: Sign in + Get started ── */
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">
                Sign in
              </Link>
              <Link to="/login" className="btn btn-primary btn-sm">
                Get started
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </>
          ))}

          {/* ── Mobile toggle ── */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border-default bg-surface-2 p-0 text-text-secondary transition-colors duration-150 hover:border-border-strong hover:text-text-primary"
            >
              {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
            </button>
          )}
        </div>

      </div>

      {/* ── Mobile menu: glass sheet sliding from the right ── */}
      {isMobile && menuOpen && (
        <>
          <style>{'@keyframes tmx-sheet-in { from { transform: translateX(100%); } to { transform: translateX(0); } }'}</style>
          <div
            className="fixed inset-0 z-[60] bg-black/50"
            style={{ animation: 'tmx-fade 200ms ease-out' }}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="glass fixed right-0 top-0 z-[70] flex h-dvh w-[280px] flex-col gap-1 overflow-y-auto p-5"
            style={{ borderRadius: 0, borderTop: 'none', borderBottom: 'none', borderRight: 'none', animation: 'tmx-sheet-in 320ms var(--ease-sheet)' }}
          >
            <div className="mb-4 flex items-center justify-between">
              <Logo />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-border-default bg-surface-2 p-0 text-text-secondary hover:text-text-primary"
              >
                <X size={17} aria-hidden="true" />
              </button>
            </div>

            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(link.to) ? 'page' : undefined}
                className={clsx(
                  'rounded-lg px-3 py-2.5 text-[15px] font-medium no-underline transition-colors duration-150',
                  isActive(link.to)
                    ? 'bg-accent-soft text-accent-text'
                    : 'text-text-secondary hover:bg-white/[0.05] hover:text-text-primary',
                )}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className={clsx(
                'flex items-center justify-between rounded-lg px-3 py-2.5 text-[15px] font-medium no-underline transition-colors duration-150',
                wishlistActive
                  ? 'bg-accent-soft text-accent-text'
                  : 'text-text-secondary hover:bg-white/[0.05] hover:text-text-primary',
              )}
            >
              Wishlist
              {wishlistCount > 0 && (
                <span className="min-w-[20px] rounded-full border border-accent-soft-border bg-accent-soft px-2 py-px text-center text-xs font-semibold text-accent-text">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <div className="hairline my-3" />

            {user ? (
              <>
                <div className="mb-1 flex items-center gap-2.5 px-3">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                    style={{ background: 'var(--gradient-brand)' }}
                  >
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="m-0 truncate text-[13px] font-semibold text-text-primary">{displayName}</p>
                    <p className="m-0 truncate text-[11px] text-text-tertiary">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-text-secondary no-underline transition-colors duration-150 hover:bg-white/[0.05] hover:text-text-primary"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="cursor-pointer rounded-lg border-0 bg-transparent px-3 py-2.5 text-left text-[15px] font-medium text-danger transition-colors duration-150 hover:bg-danger-soft"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-text-secondary no-underline transition-colors duration-150 hover:bg-white/[0.05] hover:text-text-primary"
                >
                  Sign in
                </Link>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="btn btn-primary mt-2 w-full">
                  Get started →
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </header>
  );
}
