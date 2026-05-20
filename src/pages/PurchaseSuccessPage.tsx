import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { templates } from '../data/templates';

export default function PurchaseSuccessPage() {
  const [searchParams]    = useSearchParams();
  const { user }          = useAuth();
  const [downloading, setDownloading] = useState(false);
  const [downloaded,  setDownloaded]  = useState(false);
  const didAutoDownload = useRef(false);

  const templateId = searchParams.get('template_id') ?? '';
  const template   = templates.find(t => t.id === templateId);

  /* ── Helper: trigger zip download ── */
  const triggerDownload = async () => {
    if (!template) return;
    setDownloading(true);
    const fileName = `${template.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.zip`;

    try {
      const { data, error } = await supabase.storage
        .from('templates')
        .createSignedUrl(`${templateId}.zip`, 60);

      const url = (!error && data?.signedUrl)
        ? data.signedUrl
        : `/templates/${templateId}.zip`;

      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloaded(true);
    } catch {
      window.open(`/templates/${templateId}.zip`, '_blank');
      setDownloaded(true);
    } finally {
      setDownloading(false);
    }
  };

  /* ── Confirm purchase in DB, then auto-download ── */
  useEffect(() => {
    if (!user || !templateId) return;

    const run = async () => {
      // 1. Ensure purchase row exists
      const { data: existing } = await supabase
        .from('purchases')
        .select('id')
        .eq('user_id', user.id)
        .eq('template_id', templateId)
        .single();

      if (!existing) {
        const sessionId = searchParams.get('session_id') ?? '';
        await supabase.from('purchases').insert({
          user_id:           user.id,
          template_id:       templateId,
          stripe_session_id: sessionId,
          amount:            template?.price ?? 0,
        });
      }

      // 2. Auto-download once (guard against double-run in StrictMode)
      if (!didAutoDownload.current) {
        didAutoDownload.current = true;
        await triggerDownload();
      }
    };

    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, templateId]);

  return (
    <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '520px' }}>

        {/* Animated success icon */}
        <div style={{
          width: '88px', height: '88px', borderRadius: '50%',
          background: 'rgba(16,185,129,0.12)', border: '2px solid rgba(16,185,129,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 2rem',
        }}>
          <svg width="40" height="40" fill="none" stroke="#10b981" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', margin: '0 0 0.75rem' }}>
          Payment successful!
        </h1>

        {template ? (
          <>
            <p style={{ fontSize: '1.0625rem', color: '#64748b', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              You now own <strong style={{ color: '#ffffff' }}>{template.title}</strong>.
            </p>

            {/* Download status pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              borderRadius: '9999px', padding: '6px 16px', marginBottom: '2.5rem',
              background: downloading
                ? 'rgba(56,189,248,0.08)'
                : downloaded
                  ? 'rgba(16,185,129,0.08)'
                  : 'rgba(100,116,139,0.08)',
              border: `1px solid ${downloading ? 'rgba(56,189,248,0.2)' : downloaded ? 'rgba(16,185,129,0.2)' : 'rgba(100,116,139,0.2)'}`,
            }}>
              {downloading ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  <span style={{ fontSize: '13px', color: '#38bdf8', fontWeight: 600 }}>Preparing your download…</span>
                </>
              ) : downloaded ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ fontSize: '13px', color: '#10b981', fontWeight: 600 }}>Download started!</span>
                </>
              ) : (
                <span style={{ fontSize: '13px', color: '#64748b' }}>Download starting…</span>
              )}
            </div>
          </>
        ) : (
          <p style={{ fontSize: '1.0625rem', color: '#64748b', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Your purchase is confirmed. Head to your dashboard to download it.
          </p>
        )}

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Re-download button */}
          {template && (
            <button
              onClick={triggerDownload}
              disabled={downloading}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: downloading ? '#1e293b' : '#10b981',
                borderRadius: '12px', padding: '13px 24px',
                fontSize: '14px', fontWeight: 600,
                color: downloading ? '#64748b' : '#ffffff',
                border: 'none', cursor: downloading ? 'wait' : 'pointer',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {downloading ? 'Downloading…' : 'Download again'}
            </button>
          )}

          <Link to="/dashboard" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: '#38bdf8', borderRadius: '12px',
            padding: '13px 24px', fontSize: '14px', fontWeight: 600,
            color: '#020617', textDecoration: 'none',
          }}>
            My dashboard
          </Link>

          <Link to="/templates" style={{
            border: '1px solid #334155', borderRadius: '12px',
            padding: '13px 24px', fontSize: '14px', fontWeight: 600,
            color: '#94a3b8', textDecoration: 'none',
          }}>
            Browse more
          </Link>
        </div>
      </div>
    </div>
  );
}
