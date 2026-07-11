import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Check, Clock, Download, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { templates } from '../data/templates';
import { getTemplateDownloadUrl } from '../lib/downloads';
import { useSEO } from '../hooks/useSEO';

type Status = 'confirming' | 'confirmed' | 'timeout' | 'signedout';

const CONFIRM_TIMEOUT_MS = 20_000;
const POLL_INTERVAL_MS = 1_800;

function triggerBrowserDownload(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function PurchaseSuccessPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();

  const templateId = searchParams.get('template_id') ?? '';
  const sessionId = searchParams.get('session_id') ?? '';
  const template = templates.find(t => t.id === templateId);

  const [status, setStatus] = useState<Status>('confirming');
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  useSEO({ title: 'Payment successful' });

  /* Poll for the purchase row written server-side by the Stripe webhook.
     Ownership is NEVER granted from the client — we only read. */
  useEffect(() => {
    if (authLoading) return;
    if (!user) { setStatus('signedout'); return; }
    if (!sessionId && !templateId) { setStatus('timeout'); return; }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const deadline = Date.now() + CONFIRM_TIMEOUT_MS;

    const poll = async () => {
      if (cancelled) return;

      // Prefer the Stripe session id (exact match to the webhook-written row);
      // fall back to template id if the session id is missing from the URL.
      let query = supabase.from('purchases').select('id').eq('user_id', user.id);
      query = sessionId
        ? query.eq('stripe_session_id', sessionId)
        : query.eq('template_id', templateId);

      const { data, error } = await query.limit(1).maybeSingle();
      if (cancelled) return;

      if (!error && data) { setStatus('confirmed'); return; }
      if (Date.now() >= deadline) { setStatus('timeout'); return; }
      timer = setTimeout(poll, POLL_INTERVAL_MS);
    };

    setStatus('confirming');
    poll();

    return () => { cancelled = true; clearTimeout(timer); };
  }, [authLoading, user, sessionId, templateId]);

  const handleDownload = async () => {
    if (!template) return;
    setDownloadError('');
    setDownloading(true);
    const fileName = `${template.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.zip`;
    try {
      const url = await getTemplateDownloadUrl(template.id, template.isFree);
      triggerBrowserDownload(url, fileName);
      setDownloaded(true);
    } catch (e) {
      setDownloadError(e instanceof Error ? e.message : 'Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  /* ── Disc + copy per status ── */
  const disc =
    status === 'confirmed'
      ? { border: 'border-success-soft-border', bg: 'bg-success-soft', icon: <Check size={34} strokeWidth={2.5} className="text-success" aria-hidden="true" /> }
      : status === 'timeout'
        ? { border: 'border-warning-soft-border', bg: 'bg-warning-soft', icon: <Clock size={32} className="text-warning" aria-hidden="true" /> }
        : { border: 'border-info-soft-border', bg: 'bg-info-soft', icon: <Loader2 size={30} className="text-info" style={{ animation: 'spin 1s linear infinite' }} aria-hidden="true" /> };

  return (
    <div className="aurora aurora--dim grain flex min-h-screen items-center justify-center bg-canvas p-6">
      <div className="glass w-full max-w-[540px] p-8 text-center sm:p-12">

        <div className={`mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border ${disc.border} ${disc.bg}`}>
          {disc.icon}
        </div>

        <div role="status" aria-live="polite">
          {status === 'confirming' && (
            <>
              <p className="m-0 mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-info">
                Finalizing
              </p>
              <h1 className="m-0 mb-3 text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] text-text-primary">
                Confirming your purchase…
              </h1>
              <p className="m-0 mb-8 text-[15px] leading-[1.6] text-text-secondary">
                Hang tight — we're verifying your payment on our secure server. This usually takes just a few seconds.
              </p>
            </>
          )}

          {status === 'confirmed' && (
            <>
              <p className="m-0 mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-success">
                Order confirmed
              </p>
              <h1 className="m-0 mb-3 text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] text-text-primary">
                Payment successful!
              </h1>
              {template ? (
                <p className="m-0 mb-8 text-[15px] leading-[1.6] text-text-secondary">
                  You now own <strong className="font-semibold text-text-primary">{template.title}</strong>.
                  Download it below or any time from your dashboard.
                </p>
              ) : (
                <p className="m-0 mb-8 text-[15px] leading-[1.6] text-text-secondary">
                  Your purchase is confirmed. Head to your dashboard to download it.
                </p>
              )}
            </>
          )}

          {status === 'timeout' && (
            <>
              <p className="m-0 mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-warning">
                Almost there
              </p>
              <h1 className="m-0 mb-3 text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] text-text-primary">
                This is taking longer than expected
              </h1>
              <p className="m-0 mb-8 text-[15px] leading-[1.6] text-text-secondary">
                Your payment may still be processing. Confirmation can take a moment to arrive — your
                template will appear in your dashboard automatically once it does.
              </p>
            </>
          )}

          {status === 'signedout' && (
            <>
              <p className="m-0 mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-info">
                One more step
              </p>
              <h1 className="m-0 mb-3 text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] text-text-primary">
                Sign in to confirm your purchase
              </h1>
              <p className="m-0 mb-8 text-[15px] leading-[1.6] text-text-secondary">
                Please sign in with the account you used at checkout to see and download your new template.
              </p>
            </>
          )}
        </div>

        {/* Download error */}
        {downloadError && (
          <div role="alert" className="mb-6 rounded-lg border border-danger-soft-border bg-danger-soft px-3.5 py-2.5 text-[13px] text-danger">
            {downloadError}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {status === 'confirmed' && template && (
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="btn bg-success text-[#04150C] hover:brightness-110"
              style={downloading ? { cursor: 'wait' } : undefined}
            >
              {downloading ? (
                <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} aria-hidden="true" />
              ) : (
                <Download size={15} aria-hidden="true" />
              )}
              {downloading ? 'Preparing…' : downloaded ? 'Download again' : 'Download template'}
            </button>
          )}

          {status === 'signedout' ? (
            <Link
              to="/login"
              state={{ next: `${location.pathname}${location.search}` }}
              className="btn btn-primary"
            >
              Sign in
            </Link>
          ) : (
            <Link to="/dashboard" className="btn btn-primary">
              My dashboard
            </Link>
          )}

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
