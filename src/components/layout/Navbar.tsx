import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
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

export default function Navbar() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile]         = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_BREAKPOINT).matches : false,
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

  // Close any open menus when the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

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
    navigate('/');
  };

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  const navLinkStyle = (active: boolean): CSSProperties => ({
    fontSize: '14px',
    fontWeight: 500,
    padding: '6px 12px',
    borderRadius: '8px',
    color: active ? '#38bdf8' : '#94a3b8',
    background: active ? 'rgba(56,189,248,0.1)' : 'transparent',
    textDecoration: 'none',
    transition: 'color 0.15s, background 0.15s',
  });

  const wishlistActive = isActive('/wishlist');

  const wishlistButton = (
    <Link
      to="/wishlist"
      aria-label={`Wishlist (${wishlistCount} item${wishlistCount === 1 ? '' : 's'})`}
      style={{
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '36px', height: '36px',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.08)',
        background: wishlistActive ? 'rgba(56,189,248,0.1)' : 'rgba(255,255,255,0.03)',
        color: wishlistActive ? '#38bdf8' : '#94a3b8',
        textDecoration: 'none',
        transition: 'color 0.15s, background 0.15s',
      }}
    >
      <Heart size={17} fill={wishlistActive ? 'currentColor' : 'none'} />
      {wishlistCount > 0 && (
        <span style={{
          position: 'absolute', top: '-6px', right: '-6px',
          minWidth: '17px', height: '17px', padding: '0 4px',
          borderRadius: '999px',
          background: '#38bdf8', color: '#020617',
          fontSize: '10px', fontWeight: 700, lineHeight: '17px',
          textAlign: 'center',
          boxShadow: '0 0 0 2px #020617',
        }}>
          {wishlistCount > 99 ? '99+' : wishlistCount}
        </span>
      )}
    </Link>
  );

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50, width: '100%',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      background: 'rgba(2,6,23,0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        paddingLeft: isMobile ? '1.25rem' : '2rem',
        paddingRight: isMobile ? '1.25rem' : '2rem',
        height: '64px',
        display: isMobile ? 'flex' : 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        justifyContent: isMobile ? 'space-between' : undefined,
        alignItems: 'center',
      }}>

        {/* ── Left: Logo ── */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '32px', height: '32px', background: '#38bdf8', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="16" height="16" fill="#020617" viewBox="0 0 24 24">
              <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" />
            </svg>
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Templix
          </span>
        </Link>

        {/* ── Center: Nav links (desktop) ── */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} aria-label="Primary">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={isActive(link.to) ? 'page' : undefined}
                style={navLinkStyle(isActive(link.to))}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* ── Right: wishlist + auth state ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', justifyContent: 'flex-end' }}>
          {wishlistButton}

          {!isMobile && (user ? (
            /* ── Logged in: avatar + dropdown ── */
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'none', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px', padding: '6px 10px',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #38bdf8, #0891b2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 700, color: '#020617', flexShrink: 0,
                }}>
                  {initials}
                </div>
                <span style={{ fontSize: '13px', color: '#94a3b8', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {displayName.split(' ')[0]}
                </span>
                <svg width="12" height="12" fill="none" stroke="#475569" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  minWidth: '180px', borderRadius: '12px',
                  border: '1px solid #1e293b', background: '#0f172a',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                  overflow: 'hidden', zIndex: 100,
                }}>
                  <div style={{ padding: '12px 14px', borderBottom: '1px solid #1e293b' }}>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', margin: 0 }}>{displayName}</p>
                    <p style={{ fontSize: '11px', color: '#475569', margin: '2px 0 0' }}>{user.email}</p>
                  </div>
                  {[
                    { label: 'Dashboard', to: '/dashboard' },
                    { label: 'My purchases', to: '/dashboard' },
                  ].map(item => (
                    <Link key={item.label} to={item.to} onClick={() => setUserMenuOpen(false)} style={{
                      display: 'block', padding: '10px 14px',
                      fontSize: '14px', color: '#94a3b8', textDecoration: 'none',
                      borderBottom: '1px solid #1e293b',
                    }}>
                      {item.label}
                    </Link>
                  ))}
                  <button onClick={handleSignOut} style={{
                    width: '100%', padding: '10px 14px', textAlign: 'left',
                    background: 'none', border: 'none', fontSize: '14px',
                    color: '#ef4444', cursor: 'pointer',
                  }}>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ── Logged out: Sign in + Get started ── */
            <>
              <Link to="/login" style={{ fontSize: '14px', fontWeight: 500, color: '#94a3b8', textDecoration: 'none' }}>
                Sign in
              </Link>
              <Link to="/login" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#38bdf8', borderRadius: '10px',
                padding: '8px 18px', fontSize: '14px', fontWeight: 600,
                color: '#020617', textDecoration: 'none',
              }}>
                Get started
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '36px', height: '36px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                color: '#94a3b8', cursor: 'pointer', padding: 0,
              }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>

      </div>

      {/* ── Mobile menu ── */}
      {isMobile && menuOpen && (
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)', background: '#020617',
          padding: '1rem 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.375rem',
        }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} style={{
              fontSize: '15px', fontWeight: 500,
              padding: '10px 12px', borderRadius: '10px',
              color: isActive(link.to) ? '#38bdf8' : '#94a3b8',
              background: isActive(link.to) ? 'rgba(56,189,248,0.1)' : 'transparent',
              textDecoration: 'none',
            }}>
              {link.label}
            </Link>
          ))}
          <Link to="/wishlist" onClick={() => setMenuOpen(false)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontSize: '15px', fontWeight: 500,
            padding: '10px 12px', borderRadius: '10px',
            color: wishlistActive ? '#38bdf8' : '#94a3b8',
            background: wishlistActive ? 'rgba(56,189,248,0.1)' : 'transparent',
            textDecoration: 'none',
          }}>
            Wishlist
            {wishlistCount > 0 && (
              <span style={{
                minWidth: '20px', padding: '1px 7px', borderRadius: '999px',
                background: 'rgba(56,189,248,0.15)', color: '#38bdf8',
                fontSize: '12px', fontWeight: 700, textAlign: 'center',
              }}>
                {wishlistCount}
              </span>
            )}
          </Link>
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '8px 0' }} />
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} style={{ fontSize: '15px', padding: '10px 12px', color: '#94a3b8', textDecoration: 'none' }}>
                Dashboard
              </Link>
              <button onClick={handleSignOut} style={{ textAlign: 'left', background: 'none', border: 'none', fontSize: '15px', color: '#ef4444', cursor: 'pointer', padding: '10px 12px' }}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} style={{ fontSize: '15px', padding: '10px 12px', color: '#94a3b8', textDecoration: 'none' }}>
                Sign in
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: '#38bdf8', borderRadius: '10px', padding: '10px 18px', marginTop: '4px',
                fontSize: '14px', fontWeight: 600, color: '#020617', textDecoration: 'none',
              }}>
                Get started →
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
