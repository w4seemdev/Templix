import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [mode, setMode]         = useState<'login' | 'register'>('login');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState('');

  const { signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const inputStyle = {
    width: '100%', boxSizing: 'border-box' as const,
    borderRadius: '10px', border: '1px solid #334155',
    background: '#020617', padding: '10px 14px',
    fontSize: '14px', color: '#ffffff', outline: 'none',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) { setError(error); setLoading(false); return; }
      navigate('/dashboard');
    } else {
      if (!name.trim()) { setError('Please enter your full name.'); setLoading(false); return; }
      if (password.length < 6) { setError('Password must be at least 6 characters.'); setLoading(false); return; }
      const { error } = await signUp(email, password, name);
      if (error) { setError(error); setLoading(false); return; }
      navigate('/dashboard');
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError('');
    const { error } = await signInWithGoogle();
    if (error) setError(error);
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

        {/* Card */}
        <div style={{ borderRadius: '20px', border: '1px solid #1e293b', background: '#0f172a', padding: '2rem' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', borderRadius: '10px', background: '#020617', padding: '4px', marginBottom: '1.75rem' }}>
            {(['login', 'register'] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); setSuccess(''); }} style={{
                flex: 1, padding: '8px', borderRadius: '7px',
                fontSize: '14px', fontWeight: 500, cursor: 'pointer', border: 'none',
                background: mode === m ? '#1e293b' : 'transparent',
                color: mode === m ? '#ffffff' : '#64748b',
                transition: 'all 0.15s',
              }}>
                {m === 'login' ? 'Sign in' : 'Sign up'}
              </button>
            ))}
          </div>

          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.35rem' }}>
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 1.5rem' }}>
            {mode === 'login' ? 'Sign in to access your templates and purchases.' : 'Start browsing and buying templates today.'}
          </p>

          {/* Google button */}
          <button onClick={handleGoogle} style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            borderRadius: '10px', border: '1px solid #334155', background: '#0f172a',
            padding: '10px', fontSize: '14px', fontWeight: 500, color: '#ffffff', cursor: 'pointer',
            marginBottom: '1.25rem',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: '1px', background: '#1e293b' }} />
            <span style={{ fontSize: '12px', color: '#475569' }}>or continue with email</span>
            <div style={{ flex: 1, height: '1px', background: '#1e293b' }} />
          </div>

          {/* Error / Success */}
          {error && (
            <div style={{ borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', padding: '10px 14px', marginBottom: '1rem', fontSize: '13px', color: '#fca5a5' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ borderRadius: '8px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '10px 14px', marginBottom: '1rem', fontSize: '13px', color: '#6ee7b7' }}>
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mode === 'register' && (
              <div>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Full name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required style={inputStyle} />
              </div>
            )}
            <div>
              <label style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>Password</label>
                {mode === 'login' && (
                  <button type="button" onClick={async () => {
                    if (!email) { setError('Enter your email first.'); return; }
                    const { error } = await import('../lib/supabase').then(m => m.supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` }));
                    if (error) setError(error.message);
                    else setSuccess('Password reset email sent!');
                  }} style={{ fontSize: '13px', color: '#38bdf8', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    Forgot password?
                  </button>
                )}
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={inputStyle} />
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', borderRadius: '10px',
              background: loading ? '#1e293b' : '#38bdf8',
              border: 'none', padding: '12px', fontSize: '15px',
              fontWeight: 600, color: loading ? '#64748b' : '#020617',
              cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.5rem',
            }}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '13px', color: '#64748b' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setSuccess(''); }}
              style={{ color: '#38bdf8', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '13px' }}>
          <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>← Back to Templix</Link>
        </p>
      </div>
    </div>
  );
}
