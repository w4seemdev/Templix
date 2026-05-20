import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { templates } from '../data/templates';
import type { Template } from '../types';
import Container from '../components/ui/Container';

interface Purchase {
  id: string;
  template_id: string;
  amount: number;
  created_at: string;
}

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
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

  const purchasedTemplates: Template[] = purchases
    .map(p => templates.find(t => t.id === p.template_id))
    .filter(Boolean) as Template[];

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const initials    = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      <Container style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #38bdf8, #0891b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: '#020617' }}>
              {initials}
            </div>
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                Welcome back, {displayName.split(' ')[0]}
              </h1>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{user?.email}</p>
            </div>
          </div>
          <button onClick={handleSignOut} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'transparent', border: '1px solid #334155',
            borderRadius: '8px', padding: '8px 16px',
            fontSize: '13px', color: '#64748b', cursor: 'pointer',
          }}>
            Sign out
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #1e293b', marginBottom: '2rem', gap: '2rem' }}>
          {(['purchases', 'settings'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '14px', fontWeight: 500, paddingBottom: '12px',
              borderBottom: activeTab === tab ? '2px solid #38bdf8' : '2px solid transparent',
              color: activeTab === tab ? '#ffffff' : '#64748b',
              textTransform: 'capitalize',
            }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Purchases tab */}
        {activeTab === 'purchases' && (
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: '#475569' }}>Loading your purchases...</div>
            ) : purchasedTemplates.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '5rem 2rem', borderRadius: '16px', border: '1px dashed #1e293b' }}>
                <div style={{ fontSize: '40px', marginBottom: '1rem' }}>🛍️</div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.5rem' }}>No purchases yet</h2>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '1.5rem' }}>Browse our templates and find the perfect one for your project.</p>
                <Link to="/templates" style={{ background: '#38bdf8', borderRadius: '10px', padding: '10px 24px', fontSize: '14px', fontWeight: 600, color: '#020617', textDecoration: 'none' }}>
                  Browse templates
                </Link>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '1.5rem' }}>
                  You have <strong style={{ color: '#ffffff' }}>{purchasedTemplates.length}</strong> template{purchasedTemplates.length !== 1 ? 's' : ''}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
                  {purchasedTemplates.map((template, i) => (
                    <div key={template.id} style={{ borderRadius: '16px', border: '1px solid #1e293b', background: '#0f172a', overflow: 'hidden' }}>
                      <div style={{ aspectRatio: '16/10', overflow: 'hidden', background: '#1e293b' }}>
                        <img src={template.image} alt={template.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: '1.25rem' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#38bdf8' }}>{template.category}</span>
                        <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: '4px 0 8px' }}>{template.title}</h3>
                        <p style={{ fontSize: '12px', color: '#475569', marginBottom: '1rem' }}>
                          Purchased {new Date(purchases[i]?.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <DownloadButton templateId={template.id} templateTitle={template.title} />
                          <Link to={`/templates/${template.id}`} style={{
                            flex: 1, textAlign: 'center', borderRadius: '8px',
                            border: '1px solid #334155', padding: '8px',
                            fontSize: '13px', color: '#94a3b8', textDecoration: 'none',
                          }}>
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
          <div style={{ maxWidth: '520px' }}>
            <div style={{ borderRadius: '16px', border: '1px solid #1e293b', background: '#0f172a', padding: '1.75rem', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', marginBottom: '1.25rem' }}>Account information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Full name</label>
                  <div style={{ fontSize: '14px', color: '#94a3b8', background: '#020617', borderRadius: '8px', padding: '10px 14px', border: '1px solid #1e293b' }}>
                    {user?.user_metadata?.full_name || 'Not set'}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Email address</label>
                  <div style={{ fontSize: '14px', color: '#94a3b8', background: '#020617', borderRadius: '8px', padding: '10px 14px', border: '1px solid #1e293b' }}>
                    {user?.email}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Member since</label>
                  <div style={{ fontSize: '14px', color: '#94a3b8', background: '#020617', borderRadius: '8px', padding: '10px 14px', border: '1px solid #1e293b' }}>
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown'}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ borderRadius: '16px', border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.04)', padding: '1.75rem' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fca5a5', marginBottom: '0.5rem' }}>Danger zone</h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '1.25rem' }}>Once you sign out, you'll need your credentials to sign back in.</p>
              <button onClick={handleSignOut} style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '8px', padding: '9px 20px', fontSize: '13px',
                fontWeight: 600, color: '#fca5a5', cursor: 'pointer',
              }}>
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
    <button onClick={handleDownload} disabled={downloading} style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
      background: downloading ? '#0e7490' : '#38bdf8',
      border: 'none', borderRadius: '8px', padding: '8px',
      fontSize: '13px', fontWeight: 600, color: '#020617',
      cursor: downloading ? 'wait' : 'pointer',
      transition: 'background 0.2s',
    }}>
      {downloading ? (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>
          Preparing…
        </>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
