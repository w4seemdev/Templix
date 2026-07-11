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

      if (templateId && userId) {
        // Idempotent on the Stripe session id — webhook retries must not create
        // duplicate rows. Recommended DB hardening: a UNIQUE constraint on
        // purchases.stripe_session_id so concurrent retries can't both insert.
        const { data: existing } = await supabase
          .from('purchases')
          .select('id')
          .eq('stripe_session_id', session.id)
          .maybeSingle();

        if (!existing) {
          await supabase.from('purchases').insert({
            user_id:           userId,
            template_id:       templateId,
            stripe_session_id: session.id,
            amount,
          });
        }
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
