import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { templates } from '../data/templates';

export default function PurchaseSuccessPage() {
  const [searchParams] = useSearchParams();
  const { user }       = useAuth();
  const [, setVerified] = useState(false);

  const templateId = searchParams.get('template_id') ?? '';
  const template   = templates.find(t => t.id === templateId);

  useEffect(() => {
    // Confirm purchase is saved (webhook may have already done this)
    if (!user || !templateId) return;

    const confirmPurchase = async () => {
      const { data: existing } = await supabase
        .from('purchases')
        .select('id')
        .eq('user_id', user.id)
        .eq('template_id', templateId)
        .single();

      if (!existing) {
        // Fallback: insert manually if webhook hasn't fired yet
        const sessionId = searchParams.get('session_id') ?? '';
        await supabase.from('purchases').insert({
          user_id: user.id,
          template_id: templateId,
          stripe_session_id: sessionId,
          amount: template?.price ?? 0,
        });
      }
      setVerified(true);
    };

    confirmPurchase();
  }, [user, templateId]);

  return (
    <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>

        {/* Success icon */}
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '2px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
          <svg width="36" height="36" fill="none" stroke="#10b981" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', margin: '0 0 0.75rem' }}>
          Payment successful!
        </h1>

        {template && (
          <p style={{ fontSize: '1.0625rem', color: '#64748b', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            You now own <strong style={{ color: '#ffffff' }}>{template.title}</strong>. Head to your dashboard to download it anytime.
          </p>
        )}

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/dashboard" style={{
            background: '#38bdf8', borderRadius: '12px',
            padding: '13px 28px', fontSize: '14px', fontWeight: 600,
            color: '#020617', textDecoration: 'none',
          }}>
            Go to Dashboard
          </Link>
          <Link to="/templates" style={{
            border: '1px solid #334155', borderRadius: '12px',
            padding: '13px 28px', fontSize: '14px', fontWeight: 600,
            color: '#94a3b8', textDecoration: 'none',
          }}>
            Browse more templates
          </Link>
        </div>
      </div>
    </div>
  );
}
