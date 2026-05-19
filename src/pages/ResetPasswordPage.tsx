import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useSEO } from '../hooks/useSEO';

export default function ResetPasswordPage() {
  useSEO({ title: 'Reset Password' });

  const [password, setPassword]     = useState('');
  const [confirm, setConfirm]       = useState('');
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [success, setSuccess]       = useState(false);
  const [validSession, setValidSession] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase sets a session from the URL hash automatically
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setValidSession(true);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2500);
    }
  };

  const inputStyle = {
    width: '100%', boxSizing: 'border-box' as const,
    borderRadius: '10px', border: '1px solid #334155',
    background: '#020617', padding: '10px 14px',
    fontSize: '14px', color: '#ffffff', outline: 'none',
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#020617',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div style={{ width: '32px', height: '32px', background: '#38bdf8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" fill="#020617" viewBox="0 0 24 24">
              <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" />
            </svg>
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>Templix</span>
        </div>

        <div style={{ borderRadius: '20px', border: '1px solid #1e293b', background: '#0f172a', padding: '2rem' }}>

          {success ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '50%',
                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem',
              }}>
                <svg width="22" height="22" fill="none" stroke="#10b981" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.5rem' }}>
                Password updated!
              </h2>
              <p style={{ fontSize: '14px', color: '#64748b' }}>Redirecting you to the dashboard…</p>
            </div>
          ) : !validSession ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.75rem' }}>
                Link expired
              </h2>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '1.5rem' }}>
                This password reset link is invalid or has expired.
              </p>
              <Link to="/login" style={{
                display: 'inline-flex', borderRadius: '10px', background: '#38bdf8',
                padding: '10px 20px', fontSize: '14px', fontWeight: 600,
                color: '#020617', textDecoration: 'none',
              }}>
                Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.35rem' }}>
                Set new password
              </h1>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 1.5rem' }}>
                Choose a strong password for your account.
              </p>

              {error && (
                <div style={{ borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', padding: '10px 14px', marginBottom: '1rem', fontSize: '13px', color: '#fca5a5' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                    New password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                    Confirm password
                  </label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder="Repeat your password"
                    required
                    style={inputStyle}
                  />
                </div>

                <button type="submit" disabled={loading} style={{
                  width: '100%', borderRadius: '10px',
                  background: loading ? '#1e293b' : '#38bdf8',
                  border: 'none', padding: '12px', fontSize: '15px',
                  fontWeight: 600, color: loading ? '#64748b' : '#020617',
                  cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.25rem',
                }}>
                  {loading ? 'Updating…' : 'Update password'}
                </button>
              </form>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '13px' }}>
          <Link to="/login" style={{ color: '#64748b', textDecoration: 'none' }}>← Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
