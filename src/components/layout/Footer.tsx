import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #1e293b', background: '#020617' }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>

        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '28px', height: '28px', background: '#38bdf8',
            borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" fill="#020617" viewBox="0 0 24 24">
              <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" />
            </svg>
          </div>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>Templix</span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/templates"  style={{ fontSize: '14px', color: '#64748b', textDecoration: 'none' }}>Templates</Link>
          <Link to="/categories" style={{ fontSize: '14px', color: '#64748b', textDecoration: 'none' }}>Categories</Link>
        </div>

        {/* Copyright */}
        <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>
          © {new Date().getFullYear()} Templix. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
