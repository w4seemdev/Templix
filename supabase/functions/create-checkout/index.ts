// Supabase Edge Function — Create Stripe Checkout Session
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
const CATALOG: Record<string, { title: string; priceCents: number }> = {
  '1':  { title: 'Luminary — SaaS', priceCents: 4900 },
  '3':  { title: 'ShopDrop — Ecommerce', priceCents: 7900 },
  '4':  { title: 'Bloom — Blog', priceCents: 2900 },
  '5':  { title: 'Agency Pro', priceCents: 5900 },
  '7':  { title: 'LaunchPad — Landing Page', priceCents: 3900 },
  '8':  { title: 'Dashify — Dashboard', priceCents: 8900 },
  '9':  { title: 'Saveur — Restaurant', priceCents: 4900 },
  '10': { title: 'Nexus — Corporate', priceCents: 5900 },
  '11': { title: 'MedCare — Healthcare', priceCents: 6900 },
  '12': { title: 'Coursify — Education', priceCents: 8900 },
  '13': { title: 'Estatly — Real Estate', priceCents: 7900 },
  '15': { title: 'Eventful — Events', priceCents: 4900 },
  '16': { title: 'Relate — CRM', priceCents: 9900 },
  '17': { title: 'Maison — Fashion Store', priceCents: 8900 },
  '18': { title: 'Floww — App Landing', priceCents: 4900 },
  '20': { title: 'DevLog — Tech Blog', priceCents: 3900 },
  '21': { title: 'Vault — Finance SaaS', priceCents: 7900 },
  '22': { title: 'Pixel — Creative Studio', priceCents: 6900 },
  '24': { title: 'Pulse — Analytics SaaS', priceCents: 8900 },
  '25': { title: 'Nomad — Travel Blog', priceCents: 2900 },
  '26': { title: 'Brix — Construction', priceCents: 5900 },
  '27': { title: 'Glow — Beauty & Spa', priceCents: 4900 },
  '29': { title: 'Atlas — Map SaaS', priceCents: 9900 },
  '30': { title: 'Forge — Dev Tools', priceCents: 5900 },
  '31': { title: 'Ora — Productivity App', priceCents: 3900 },
  '32': { title: 'Luxe — Hotel', priceCents: 7900 },
  '33': { title: 'Fit — Gym & Fitness', priceCents: 4900 },
  '34': { title: 'Archi — Architecture', priceCents: 6900 },
  '35': { title: 'Crypto — Web3 Landing', priceCents: 7900 },
  '36': { title: 'Shelf — Bookstore', priceCents: 5900 },
  '37': { title: 'Verde — Eco & Sustainability', priceCents: 4900 },
  '38': { title: 'Swift — Delivery App', priceCents: 5900 },
  '39': { title: 'Law & Co — Legal Firm', priceCents: 6900 },
  '40': { title: 'Spark — Email Marketing', priceCents: 8900 },
  '41': { title: 'NestFind — Real Estate', priceCents: 8900 },
  '42': { title: 'IronPeak — Gym & Fitness', priceCents: 5900 },
  '43': { title: 'Signal — Podcast', priceCents: 4900 },
  '44': { title: 'LaunchConf — Event', priceCents: 6900 },
  '46': { title: 'Vega — Music Artist', priceCents: 5900 },
  '47': { title: 'Aria — Photography', priceCents: 4900 },
  '48': { title: 'Finwise — Personal Finance', priceCents: 7900 },
  '49': { title: 'Petal — Florist', priceCents: 4900 },
  '50': { title: 'Nomad — Remote Jobs', priceCents: 7900 },
  '52': { title: 'Roam — Airbnb Style', priceCents: 9900 },
  '53': { title: 'Clinic — Healthcare', priceCents: 7900 },
  '54': { title: 'Pixel — Game Studio', priceCents: 6900 },
  '55': { title: 'Scout — Talent Agency', priceCents: 5900 },
  '56': { title: 'Hope — Nonprofit & Charity', priceCents: 4900 },
  '57': { title: 'Neuron — AI Platform', priceCents: 9900 },
  '58': { title: 'Velocity — Auto Dealership', priceCents: 6900 },
  '60': { title: 'Haven — Interior Design', priceCents: 5900 },
  '61': { title: 'The Daily — News & Magazine', priceCents: 6900 },
};

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
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Verify the caller from the Supabase auth JWT — never from the body.
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return json({ error: 'Authentication required' }, 401);
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
      return json({ error: 'Authentication required' }, 401);
    }

    const { templateId } = await req.json();
    const entry = templateId ? CATALOG[String(templateId)] : undefined;
    if (!entry) {
      // Unknown or free template — not purchasable.
      return json({ error: 'This template is not available for purchase' }, 400);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: entry.title,
              description: `Templix — ${entry.title} template`,
              images: [],
            },
            unit_amount: entry.priceCents, // trusted, server-derived
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/purchase-success?session_id={CHECKOUT_SESSION_ID}&template_id=${templateId}`,
      cancel_url:  `${req.headers.get('origin')}/templates/${templateId}`,
      metadata: {
        template_id: String(templateId),
        user_id: user.id, // verified, from the JWT
      },
    });

    return json({ url: session.url });
  } catch (error) {
    return json({ error: (error as Error).message }, 500);
  }
});
