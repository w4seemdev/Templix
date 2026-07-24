// Supabase Edge Function — Stripe Webhook
// Deploy with: supabase functions deploy stripe-webhook --no-verify-jwt
// Set webhook endpoint in Stripe dashboard → Developers → Webhooks
//
// This is the ONLY place a `purchases` row may be written. The browser must
// never insert purchases — ownership is granted here after Stripe confirms the
// session was actually paid, and only after the signature is verified.

import Stripe from 'https://esm.sh/stripe@14?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-04-10',
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

Deno.serve(async (req) => {
  const body      = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // Async variant is required on Deno (SubtleCrypto is async).
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
    );
  } catch (err) {
    return new Response(`Webhook signature failed: ${(err as Error).message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Only fulfil sessions Stripe has confirmed as paid.
    if (session.payment_status === 'paid') {
      const templateId = session.metadata?.template_id;
      const userId     = session.metadata?.user_id;
      const amount     = (session.amount_total ?? 0) / 100;

      // The money is already captured at this point, so a session we cannot
      // attribute is a delivery failure, not something to skip quietly.
      if (!templateId || !userId) {
        console.error(
          '[stripe-webhook] paid session missing metadata',
          { sessionId: session.id, templateId, userId },
        );
        return new Response('Session metadata incomplete', { status: 500 });
      }

      // Idempotent on the Stripe session id — webhook retries must not create
      // duplicate rows. This relies on the UNIQUE constraint added in
      // supabase/migrations/20260724120000_enable_rls_purchases_profiles.sql:
      // a check-then-insert would still race two concurrent retries, whereas
      // ON CONFLICT DO NOTHING is resolved by the database.
      const { error: upsertErr } = await supabase
        .from('purchases')
        .upsert(
          {
            user_id:           userId,
            template_id:       templateId,
            stripe_session_id: session.id,
            amount,
          },
          { onConflict: 'stripe_session_id', ignoreDuplicates: true },
        );

      // Never swallow this. A 200 tells Stripe delivery succeeded and it stops
      // retrying — the buyer would be charged and never granted the download,
      // with nothing left to replay. A 500 hands the problem to Stripe's own
      // retry schedule, which is the only safety net we have here.
      if (upsertErr) {
        console.error(
          '[stripe-webhook] purchase upsert failed',
          { sessionId: session.id, templateId, userId, error: upsertErr },
        );
        return new Response('Failed to record purchase', { status: 500 });
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
