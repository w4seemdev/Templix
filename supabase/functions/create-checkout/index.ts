// Supabase Edge Function - Create Stripe Checkout Session
// Deploy with: supabase functions deploy create-checkout
//
// Security model: the client is NEVER trusted for the price or the buyer id.
//   - price is derived server-side from the template id (CATALOG below)
//   - user id is derived from the verified Supabase auth JWT, not the body
// The client only supplies { templateId }; everything else is ignored.

import Stripe from 'https://esm.sh/stripe@14?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-04-10',
});

// Trusted server-side price list, in cents.
// MUST stay in sync with the paid (isFree:false, price>0) rows in
// src/data/templates.ts. Free / unknown ids are absent and are rejected.
//
// src/data/templates.ts is AUTHORITATIVE: it is the price the buyer was shown
// on the card and detail page, and the value published in the Product JSON-LD.
// `title` is what Stripe prints on the checkout page and the emailed receipt,
// so it must match the current template title exactly.
// Run `npm run check:prices` after touching either file - it fails the build on
// any drift.
const CATALOG: Record<string, { title: string; priceCents: number }> = {
  '1':  { title: 'Luminary - SaaS', priceCents: 5900 },
  '3':  { title: 'ShopDrop - Ecommerce', priceCents: 6900 },
  '4':  { title: 'Bloom - Blog', priceCents: 3900 },
  '5':  { title: 'Agency Pro', priceCents: 5900 },
  '7':  { title: 'LaunchPad - Landing Page', priceCents: 4900 },
  '8':  { title: 'Dashify - Dashboard', priceCents: 7900 },
  '9':  { title: 'Saveur - Restaurant', priceCents: 4900 },
  '10': { title: 'Nexus - Corporate', priceCents: 5900 },
  '11': { title: 'MedCare - Healthcare', priceCents: 6900 },
  '12': { title: 'Coursify - Education', priceCents: 6900 },
  '13': { title: 'Estatly - Real Estate', priceCents: 6900 },
  '15': { title: 'Eventide - Event Planning', priceCents: 4900 },
  '16': { title: 'Relate - CRM', priceCents: 6900 },
  '17': { title: 'Maison - Fashion Store', priceCents: 5900 },
  '18': { title: 'Floww - App Landing', priceCents: 4900 },
  '20': { title: 'DevLog - Tech Blog', priceCents: 3900 },
  '21': { title: 'Vault - Finance SaaS', priceCents: 5900 },
  '22': { title: 'Form& - Creative Studio', priceCents: 4900 },
  '24': { title: 'Pulse - Analytics SaaS', priceCents: 7900 },
  '25': { title: 'Wanderline - Travel Blog', priceCents: 3900 },
  '26': { title: 'Brix - Construction', priceCents: 4900 },
  '27': { title: 'Glow - Beauty & Spa', priceCents: 4900 },
  '29': { title: 'Atlas - Map SaaS', priceCents: 7900 },
  '30': { title: 'Forge - Dev Tools', priceCents: 5900 },
  '31': { title: 'Ora - Productivity App', priceCents: 3900 },
  '32': { title: 'Luxe - Hotel', priceCents: 6900 },
  '33': { title: 'Fit - Gym & Fitness', priceCents: 4900 },
  '34': { title: 'Archi - Architecture', priceCents: 3900 },
  '35': { title: 'Crypto - Web3 Landing', priceCents: 5900 },
  '36': { title: 'Shelf - Bookstore', priceCents: 4900 },
  '37': { title: 'Verde - Eco & Sustainability', priceCents: 4900 },
  '38': { title: 'Swift - Delivery App', priceCents: 4900 },
  '39': { title: 'Law & Co - Legal Firm', priceCents: 5900 },
  '40': { title: 'Spark - Email Marketing', priceCents: 7900 },
  '41': { title: 'NestFind - Real Estate', priceCents: 7900 },
  '42': { title: 'IronPeak - Gym & Fitness', priceCents: 5900 },
  '43': { title: 'Signal - Podcast', priceCents: 4900 },
  '44': { title: 'LaunchConf - Event', priceCents: 5900 },
  '46': { title: 'Vega - Music Artist', priceCents: 5900 },
  '47': { title: 'Aria - Photography', priceCents: 4900 },
  '48': { title: 'Finwise - Personal Finance', priceCents: 6900 },
  '49': { title: 'Petal - Florist', priceCents: 4900 },
  '50': { title: 'Nomad - Remote Jobs', priceCents: 5900 },
  '52': { title: 'Roam - Airbnb Style', priceCents: 7900 },
  '53': { title: 'Clinic - Healthcare', priceCents: 6900 },
  '54': { title: 'PixelForge - Game Studio', priceCents: 5900 },
  '55': { title: 'Scout - Talent Agency', priceCents: 4900 },
  '56': { title: 'Hope - Nonprofit & Charity', priceCents: 4900 },
  '57': { title: 'Neuron - AI Platform', priceCents: 8900 },
  '58': { title: 'Velocity - Auto Dealership', priceCents: 5900 },
  '60': { title: 'Haven - Interior Design', priceCents: 4900 },
  '61': { title: 'The Daily - News & Magazine', priceCents: 5900 },
};

// The only origins this function will talk to or redirect back into. The
// post-payment redirect used to be built from the raw Origin header, so any
// caller with a valid JWT could mint a real Stripe Checkout session that landed
// the buyer on an attacker's page. Keep this list in sync with verify-download.
const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://templix-peach.vercel.app';
const ALLOWED_ORIGINS = new Set([SITE_URL, 'http://localhost:5173']);

const corsHeaders = (origin: string | null): Record<string, string> => {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Vary': 'Origin',
  };
  // Omit the header entirely for unknown origins - never reflect '*' on an
  // authenticated endpoint.
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

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders(origin) });
  }

  try {
    // Verify the caller from the Supabase auth JWT - never from the body.
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return reply({ error: 'Authentication required' }, 401);
    }
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
    );
    const { data: userData, error: userErr } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', ''),
    );
    const user = userData?.user;
    if (userErr || !user) {
      return reply({ error: 'Authentication required' }, 401);
    }

    const { templateId } = await req.json();
    const entry = templateId ? CATALOG[String(templateId)] : undefined;
    if (!entry) {
      // Unknown or free template - not purchasable.
      return reply({ error: 'This template is not available for purchase' }, 400);
    }

    // Redirect targets come from the allowlist, never straight from the header.
    const base = origin && ALLOWED_ORIGINS.has(origin) ? origin : SITE_URL;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: entry.title,
              description: `Templix - ${entry.title} template`,
              images: [],
            },
            unit_amount: entry.priceCents, // trusted, server-derived
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${base}/purchase-success?session_id={CHECKOUT_SESSION_ID}&template_id=${templateId}`,
      cancel_url:  `${base}/templates/${templateId}`,
      metadata: {
        template_id: String(templateId),
        user_id: user.id, // verified, from the JWT
      },
    });

    return reply({ url: session.url });
  } catch (error) {
    // Log the real cause to the Supabase function logs; the caller gets nothing
    // that could leak Stripe internals or missing-env details.
    console.error('[create-checkout]', error);
    return reply({ error: 'Something went wrong. Please try again.' }, 500);
  }
});
