import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, Download, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { templates } from '../data/templates';
import { useSEO } from '../hooks/useSEO';

export default function PurchaseSuccessPage() {
  const [searchParams]    = useSearchParams();
  const { user }          = useAuth();
  const [downloading, setDownloading] = useState(false);
  const [downloaded,  setDownloaded]  = useState(false);
  const didAutoDownload = useRef(false);

  const templateId = searchParams.get('template_id') ?? '';
  const sessionId  = searchParams.get('session_id') ?? '';
  const template   = templates.find(t => t.id === templateId);

  useSEO({ title: 'Payment successful' });

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
        const stripeSessionId = searchParams.get('session_id') ?? '';
        await supabase.from('purchases').insert({
          user_id:           user.id,
          template_id:       templateId,
          stripe_session_id: stripeSessionId,
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
    <div className="aurora aurora--dim grain flex min-h-screen items-center justify-center bg-canvas p-6">
      <div className="glass w-full max-w-[540px] p-8 text-center sm:p-12">

        {/* Success disc */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-success-soft-border bg-success-soft">
          <Check size={34} strokeWidth={2.5} className="text-success" aria-hidden="true" />
        </div>

        <p className="m-0 mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-success">
          Order confirmed
        </p>
        <h1 className="m-0 mb-3 text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] text-text-primary">
          Payment successful!
        </h1>

        {template ? (
          <>
            <p className="m-0 mb-5 text-[15px] leading-[1.6] text-text-secondary">
              You now own <strong className="font-semibold text-text-primary">{template.title}</strong>.
              Your files are on their way.
            </p>

            {/* Download status pill */}
            <div
              role="status"
              aria-live="polite"
              className={`mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 ${
                downloading
                  ? 'border-info-soft-border bg-info-soft'
                  : downloaded
                    ? 'border-success-soft-border bg-success-soft'
                    : 'border-border-default bg-surface-2'
              }`}
            >
              {downloading ? (
                <>
                  <Loader2 size={13} className="shrink-0 text-info" style={{ animation: 'spin 1s linear infinite' }} />
                  <span className="text-[13px] font-semibold text-info">Preparing your download…</span>
                </>
              ) : downloaded ? (
                <>
                  <Check size={13} strokeWidth={2.5} className="shrink-0 text-success" />
                  <span className="text-[13px] font-semibold text-success">Download started!</span>
                </>
              ) : (
                <span className="text-[13px] text-text-tertiary">Download starting…</span>
              )}
            </div>
          </>
        ) : (
          <p className="m-0 mb-8 text-[15px] leading-[1.6] text-text-secondary">
            Your purchase is confirmed. Head to your dashboard to download it.
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {template && (
            <button
              onClick={triggerDownload}
              disabled={downloading}
              className="btn bg-success text-[#04150C] hover:brightness-110"
              style={downloading ? { cursor: 'wait' } : undefined}
            >
              <Download size={15} />
              {downloading ? 'Downloading…' : 'Download again'}
            </button>
          )}

          <Link to="/dashboard" className="btn btn-primary">
            My dashboard
          </Link>

          <Link to="/templates" className="btn btn-secondary">
            Browse more
          </Link>
        </div>

        {sessionId && (
          <>
            <div className="hairline mt-8" />
            <p
              className="m-0 mt-4 truncate font-mono text-[11px] text-text-tertiary"
              style={{ fontFeatureSettings: '"tnum"' }}
              title={sessionId}
            >
              Ref: {sessionId}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
