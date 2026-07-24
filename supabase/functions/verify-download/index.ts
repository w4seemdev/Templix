// Supabase Edge Function — Verify Download
// Deploy with: supabase functions deploy verify-download
//
// Purpose: gate access to premium template zips. The caller must be
// authenticated; for a paid template they must own a `purchases` row, and only
// then do we hand back a short-lived signed URL to the zip in the PRIVATE
// 'templates' storage bucket.
//
// Required Supabase setup before this works in production:
//   1. Create a PRIVATE storage bucket named `templates` (Storage → New bucket,
//      "Public" OFF).
//   2. Upload each premium zip as `<templateId>.zip` (e.g. `3.zip`).
//   Free templates stay in the public /templates/ path and never reach here.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2?target=deno';

// Free templates are publicly downloadable and need no ownership check.
// Keep in sync with the isFree:true rows in src/data/templates.ts.
const FREE_TEMPLATE_IDS = new Set(['2', '6', '14', '19', '23', '28', '45', '51', '59']);

// Signing paid-content URLs is the most sensitive thing this project does, so
// CORS is restricted to our own origins rather than '*'. Keep in sync with
// create-checkout.
const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://templix-peach.vercel.app';
const ALLOWED_ORIGINS = new Set([SITE_URL, 'http://localhost:5173']);

const corsHeaders = (origin: string | null): Record<string, string> => {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Vary': 'Origin',
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
};

const json = (body: unknown, status: number, origin: string | null) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  const reply = (body: unknown, status = 200) => json(body, status, origin);

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders(origin) });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return reply({ error: 'Authentication required' }, 401);
    }

    // Service-role client: verifies the JWT, reads purchases (bypassing RLS,
    // which is safe because we've already authenticated the caller), and signs
    // the private object.
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: userData, error: userErr } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', ''),
    );
    const user = userData?.user;
    if (userErr || !user) {
      return reply({ error: 'Authentication required' }, 401);
    }

    const { templateId } = await req.json();
    if (!templateId) {
      return reply({ error: 'templateId is required' }, 400);
    }
    const id = String(templateId);

    if (!FREE_TEMPLATE_IDS.has(id)) {
      // `limit(1)`, not `.maybeSingle()`: nothing enforces uniqueness on
      // (user_id, template_id) — the UNIQUE constraint is on stripe_session_id
      // — so a customer who legitimately bought the same template twice has two
      // rows, and .maybeSingle() would error (PGRST116) and lock them out of a
      // template they paid for. Existence is the question; one row is enough.
      const { data: purchases, error: purchaseErr } = await supabase
        .from('purchases')
        .select('id')
        .eq('user_id', user.id)
        .eq('template_id', id)
        .limit(1);

      // A failed lookup is our fault, not a missing entitlement — never bill it
      // to the customer as a 403.
      if (purchaseErr) {
        console.error('[verify-download] ownership lookup failed', {
          userId: user.id,
          templateId: id,
          error: purchaseErr,
        });
        return reply({ error: 'Something went wrong. Please try again.' }, 500);
      }

      if (!purchases || purchases.length === 0) {
        return reply({ error: 'You do not own this template' }, 403);
      }
    }

    const { data: signed, error: signErr } = await supabase.storage
      .from('templates')
      .createSignedUrl(`${id}.zip`, 60);

    if (signErr || !signed?.signedUrl) {
      return reply(
        { error: 'Download unavailable. The template file has not been uploaded to the private storage bucket yet.' },
        404,
      );
    }

    return reply({ url: signed.signedUrl });
  } catch (error) {
    // Real cause goes to the Supabase function logs, not to the caller.
    console.error('[verify-download]', error);
    return reply({ error: 'Something went wrong. Please try again.' }, 500);
  }
});
