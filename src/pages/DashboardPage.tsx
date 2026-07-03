import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { templates } from '../data/templates';
import type { Template } from '../types';
import Container from '../components/ui/Container';
import { useWishlist } from '../hooks/useWishlist';

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

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const [purchases, setPurchases]   = useState<Purchase[]>([]);
  const [loading, setLoading]       = useState(true);
  const [activeTab, setActiveTab]   = useState<'purchases' | 'settings'>('purchases');

  useEffect(() => {
    if (!user) return;
    supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPurchases(data ?? []);
        setLoading(false);
      });
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
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
              <div className="py-16 text-center text-sm text-text-tertiary">Loading your purchases...</div>
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
                        <div className="flex gap-2">
                          <DownloadButton templateId={template.id} templateTitle={template.title} />
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
            <div className="sheen mb-5 rounded-2xl border border-border-subtle bg-surface-1 p-7">
              <h3 className="mb-5 text-[15px] font-semibold text-text-primary">Account information</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">Full name</span>
                  <div className="rounded-lg border border-border-subtle bg-surface-2 px-3.5 py-2.5 text-sm text-text-secondary">
                    {user?.user_metadata?.full_name || 'Not set'}
                  </div>
                </div>
                <div>
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">Email address</span>
                  <div className="rounded-lg border border-border-subtle bg-surface-2 px-3.5 py-2.5 text-sm text-text-secondary">
                    {user?.email}
                  </div>
                </div>
                <div>
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">Member since</span>
                  <div className="rounded-lg border border-border-subtle bg-surface-2 px-3.5 py-2.5 text-sm text-text-secondary">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown'}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-danger-soft-border bg-danger-soft/40 p-7">
              <h3 className="mb-2 text-[15px] font-semibold text-danger">Danger zone</h3>
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
function DownloadButton({ templateId, templateTitle }: { templateId: string; templateTitle: string }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    const fileName = `${templateTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.zip`;

    try {
      // 1️⃣  Try Supabase Storage first (production signed URL)
      const { data, error } = await supabase.storage
        .from('templates')
        .createSignedUrl(`${templateId}.zip`, 60);

      if (!error && data?.signedUrl) {
        triggerDownload(data.signedUrl, fileName);
        return;
      }

      // 2️⃣  Fall back to the static zip bundled in public/templates/
      const staticUrl = `/templates/${templateId}.zip`;
      const res = await fetch(staticUrl, { method: 'HEAD' });
      if (res.ok) {
        triggerDownload(staticUrl, fileName);
        return;
      }

      alert('Download not available. Please contact support.');
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="btn btn-primary btn-sm flex-1"
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
