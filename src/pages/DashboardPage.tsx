import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { templates } from '../data/templates';
import type { Template } from '../types';
import Container from '../components/ui/Container';
import { useWishlist } from '../hooks/useWishlist';
import { getTemplateDownloadUrl } from '../lib/downloads';

interface Purchase {
  id: string;
  template_id: string;
  amount: number;
  created_at: string;
}

interface OwnedItem {
  purchase: Purchase;
  template: Template;
}

const mono = { fontFeatureSettings: '"tnum"' } as const;

const inputClass =
  'h-11 w-full rounded-lg border border-border-default bg-surface-2 px-3.5 text-[15px] text-text-primary transition-[border-color,box-shadow] duration-150 focus:border-border-accent focus:shadow-[0_0_0_3px_rgba(124,92,252,0.18)] focus:outline-none';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const [purchases, setPurchases]   = useState<Purchase[]>([]);
  const [loading, setLoading]       = useState(true);
  const [loadError, setLoadError]   = useState('');
  const [reloadKey, setReloadKey]   = useState(0);
  const [activeTab, setActiveTab]   = useState<'purchases' | 'settings'>('purchases');

  // Account settings form state
  const [fullNameInput, setFullNameInput] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg]       = useState<{ ok: boolean; text: string } | null>(null);
  const [newPassword, setNewPassword]         = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword]   = useState(false);
  const [passwordMsg, setPasswordMsg]         = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    setLoading(true);
    setLoadError('');
    supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setLoadError('We couldn’t load your library. Please try again.');
          setPurchases([]);
        } else {
          setPurchases(data ?? []);
        }
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [user, reloadKey]);

  // Seed the profile form from the signed-in user (and re-sync after saves).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- seed form from loaded user
    setFullNameInput(user?.user_metadata?.full_name ?? '');
  }, [user?.id, user?.user_metadata?.full_name]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const name = fullNameInput.trim();
    if (!name) { setProfileMsg({ ok: false, text: 'Please enter your name.' }); return; }
    setSavingProfile(true);
    setProfileMsg(null);
    try {
      // Keep the auth metadata (what the app reads) and the profiles table in sync.
      const { error: authError } = await supabase.auth.updateUser({ data: { full_name: name } });
      if (authError) throw authError;
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({ id: user.id, full_name: name });
      if (profileError) throw profileError;
      setProfileMsg({ ok: true, text: 'Profile updated.' });
    } catch (err) {
      setProfileMsg({ ok: false, text: err instanceof Error ? err.message : 'Could not update profile.' });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) { setPasswordMsg({ ok: false, text: 'Password must be at least 6 characters.' }); return; }
    if (newPassword !== confirmPassword) { setPasswordMsg({ ok: false, text: 'Passwords do not match.' }); return; }
    setSavingPassword(true);
    setPasswordMsg(null);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSavingPassword(false);
    if (error) { setPasswordMsg({ ok: false, text: error.message }); return; }
    setPasswordMsg({ ok: true, text: 'Password updated.' });
    setNewPassword('');
    setConfirmPassword('');
  };

  // Pair each purchase with its template so rows never desync
  const owned: OwnedItem[] = purchases.flatMap(p => {
    const template = templates.find(t => t.id === p.template_id);
    return template ? [{ purchase: p, template }] : [];
  });

  const libraryValue = owned.reduce((sum, o) => sum + o.template.price, 0);
  const displayName  = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const initials     = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  const memberSince  = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    : '—';

  const stats = [
    { label: 'Templates owned', value: String(owned.length) },
    { label: 'Library value', value: `$${libraryValue}` },
    { label: 'Wishlist saves', value: String(wishlist.length) },
    { label: 'Member since', value: memberSince },
  ];

  return (
    <div className="min-h-screen bg-canvas">
      <Container style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full text-base font-semibold text-white"
              style={{ background: 'var(--gradient-brand)' }}
              aria-hidden="true"
            >
              {initials}
            </div>
            <div>
              <h1 className="m-0 text-2xl font-semibold tracking-[-0.02em] text-text-primary">
                Welcome back, {displayName.split(' ')[0]}
              </h1>
              <p className="m-0 text-[13px] text-text-tertiary">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleSignOut} className="btn btn-ghost btn-sm">
            Sign out
          </button>
        </div>

        {/* Stat cards */}
        <div className="mb-10 grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {stats.map(s => (
            <div key={s.label} className="sheen rounded-xl border border-border-subtle bg-surface-1 p-5">
              <p className="m-0 mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                {s.label}
              </p>
              <p className="m-0 font-mono text-[28px] font-semibold leading-none text-text-primary" style={mono}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-7 border-b border-border-subtle" role="tablist">
          {(['purchases', 'settings'] as const).map(tab => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`-mb-px cursor-pointer border-0 border-b-2 border-solid bg-transparent pb-3 text-sm font-medium capitalize transition-colors duration-150 ${
                activeTab === tab
                  ? 'border-b-accent text-text-primary'
                  : 'border-b-transparent text-text-tertiary hover:text-text-secondary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Purchases tab */}
        {activeTab === 'purchases' && (
          <div>
            {loading ? (
              <div role="status" className="py-16 text-center text-sm text-text-tertiary">Loading your purchases...</div>
            ) : loadError ? (
              <div role="alert" className="mx-auto max-w-[420px] rounded-2xl border border-danger-soft-border bg-danger-soft/40 px-8 py-12 text-center">
                <p className="mb-5 text-sm text-text-secondary">{loadError}</p>
                <button onClick={() => setReloadKey(k => k + 1)} className="btn btn-secondary btn-sm">
                  Retry
                </button>
              </div>
            ) : owned.length === 0 ? (
              <div className="mx-auto max-w-[420px] rounded-2xl border border-dashed border-border-default px-8 py-16 text-center">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-accent-soft-border bg-accent-soft">
                  <svg width="22" height="22" fill="none" stroke="var(--color-accent)" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <h2 className="mb-2 text-lg font-semibold tracking-[-0.01em] text-text-primary">No purchases yet</h2>
                <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                  Browse our templates and find the perfect one for your project.
                </p>
                <Link to="/templates" className="btn btn-primary glow-cta">
                  Browse templates
                </Link>
              </div>
            ) : (
              <div>
                <p className="mb-6 text-sm text-text-tertiary">
                  You have <strong className="font-semibold text-text-primary">{owned.length}</strong> template{owned.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                  {owned.map(({ purchase, template }) => (
                    <div
                      key={template.id}
                      className="group overflow-hidden rounded-xl border border-border-subtle bg-surface-1 transition-[border-color,transform,box-shadow] duration-250 hover:border-border-strong"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-surface-2 shadow-thumb-frame">
                        <img
                          src={template.image}
                          alt={template.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
                          style={{ transitionTimingFunction: 'var(--ease-smooth)' }}
                        />
                      </div>
                      <div className="p-4">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">
                          {template.category}
                        </span>
                        <h3 className="mb-1 mt-1 truncate text-[15px] font-semibold text-text-primary">{template.title}</h3>
                        <p className="mb-4 font-mono text-xs text-text-tertiary" style={mono}>
                          Purchased {new Date(purchase.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                        <div className="flex items-start gap-2">
                          <DownloadButton template={template} />
                          <Link to={`/templates/${template.id}`} className="btn btn-secondary btn-sm flex-1">
                            View details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Settings tab */}
        {activeTab === 'settings' && (
          <div className="max-w-[520px]">

            {/* Profile */}
            <form onSubmit={handleSaveProfile} className="sheen mb-5 rounded-2xl border border-border-subtle bg-surface-1 p-7">
              <h2 className="mb-5 text-[15px] font-semibold text-text-primary">Profile</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="tmx-fullname" className="mb-1.5 block text-[13px] font-medium text-text-secondary">Full name</label>
                  <input
                    id="tmx-fullname"
                    type="text"
                    value={fullNameInput}
                    onChange={e => setFullNameInput(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <span className="mb-1.5 block text-[13px] font-medium text-text-secondary">Email address</span>
                  <div className="flex h-11 items-center rounded-lg border border-border-subtle bg-surface-2 px-3.5 text-sm text-text-tertiary">
                    {user?.email}
                  </div>
                </div>
                <div>
                  <span className="mb-1.5 block text-[13px] font-medium text-text-secondary">Member since</span>
                  <div className="flex h-11 items-center rounded-lg border border-border-subtle bg-surface-2 px-3.5 text-sm text-text-tertiary">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown'}
                  </div>
                </div>
                {profileMsg && (
                  <div
                    role={profileMsg.ok ? 'status' : 'alert'}
                    className={`rounded-lg border px-3.5 py-2.5 text-[13px] ${profileMsg.ok ? 'border-success-soft-border bg-success-soft text-success' : 'border-danger-soft-border bg-danger-soft text-danger'}`}
                  >
                    {profileMsg.text}
                  </div>
                )}
                <button type="submit" disabled={savingProfile} className="btn btn-primary btn-sm self-start">
                  {savingProfile ? 'Saving…' : 'Save changes'}
                </button>
              </div>
            </form>

            {/* Password */}
            <form onSubmit={handleChangePassword} className="sheen mb-5 rounded-2xl border border-border-subtle bg-surface-1 p-7">
              <h2 className="mb-1 text-[15px] font-semibold text-text-primary">Password</h2>
              <p className="mb-5 text-[13px] text-text-tertiary">Choose a new password for your account.</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="tmx-newpass" className="mb-1.5 block text-[13px] font-medium text-text-secondary">New password</label>
                  <input
                    id="tmx-newpass"
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="tmx-confirmpass" className="mb-1.5 block text-[13px] font-medium text-text-secondary">Confirm new password</label>
                  <input
                    id="tmx-confirmpass"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className={inputClass}
                  />
                </div>
                {passwordMsg && (
                  <div
                    role={passwordMsg.ok ? 'status' : 'alert'}
                    className={`rounded-lg border px-3.5 py-2.5 text-[13px] ${passwordMsg.ok ? 'border-success-soft-border bg-success-soft text-success' : 'border-danger-soft-border bg-danger-soft text-danger'}`}
                  >
                    {passwordMsg.text}
                  </div>
                )}
                <button type="submit" disabled={savingPassword} className="btn btn-primary btn-sm self-start">
                  {savingPassword ? 'Updating…' : 'Update password'}
                </button>
              </div>
            </form>

            {/* Danger zone */}
            <div className="rounded-2xl border border-danger-soft-border bg-danger-soft/40 p-7">
              <h2 className="mb-2 text-[15px] font-semibold text-danger">Danger zone</h2>
              <p className="mb-5 text-[13px] leading-relaxed text-text-tertiary">
                Once you sign out, you'll need your credentials to sign back in.
              </p>
              <button onClick={handleSignOut} className="btn btn-danger btn-sm">
                Sign out of account
              </button>
            </div>
          </div>
        )}

      </Container>
    </div>
  );
}

/* ─── Download button ─── */
function DownloadButton({ template }: { template: Template }) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    setError('');
    setDownloading(true);
    const fileName = `${template.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.zip`;

    try {
      // Ownership is verified server-side (edge function) before a signed URL
      // is minted — no public-path fallback for paid templates.
      const url = await getTemplateDownloadUrl(template.id, template.isFree);
      triggerDownload(url, fileName);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Download unavailable. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex-1">
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="btn btn-primary btn-sm w-full"
        style={downloading ? { cursor: 'wait' } : undefined}
      >
        {downloading ? (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }} aria-hidden="true">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            Preparing…
          </>
        ) : (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download
          </>
        )}
      </button>
      {error && (
        <p role="alert" className="mt-1.5 text-[11px] leading-snug text-danger">{error}</p>
      )}
    </div>
  );
}

function triggerDownload(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
