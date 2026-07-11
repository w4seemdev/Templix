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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return json({ error: 'Authentication required' }, 401);
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
      return json({ error: 'Authentication required' }, 401);
    }

    const { templateId } = await req.json();
    if (!templateId) {
      return json({ error: 'templateId is required' }, 400);
    }
    const id = String(templateId);

    if (!FREE_TEMPLATE_IDS.has(id)) {
      const { data: purchase } = await supabase
        .from('purchases')
        .select('id')
        .eq('user_id', user.id)
        .eq('template_id', id)
        .maybeSingle();

      if (!purchase) {
        return json({ error: 'You do not own this template' }, 403);
      }
    }

    const { data: signed, error: signErr } = await supabase.storage
      .from('templates')
      .createSignedUrl(`${id}.zip`, 60);

    if (signErr || !signed?.signedUrl) {
      return json(
        { error: 'Download unavailable. The template file has not been uploaded to the private storage bucket yet.' },
        404,
      );
    }

    return json({ url: signed.signedUrl });
  } catch (error) {
    return json({ error: (error as Error).message }, 500);
  }
});
