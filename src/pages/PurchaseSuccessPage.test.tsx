/**
 * PurchaseSuccessPage — where the buyer lands back from Stripe.
 *
 * Stripe redirecting here proves nothing: the URL is guessable and the buyer can
 * reload it forever. Ownership is written server-side by the webhook, so this
 * page may only ever *read* — it must not announce a successful purchase, or
 * offer a download, until the purchase row actually exists.
 *
 * Boundary mocked: the Supabase client (auth session + the `purchases` poll) and
 * the shared download helper.
 */
import { act, configure, renderWithProviders, screen, userEvent, waitFor } from '../test/utils';
import PurchaseSuccessPage from './PurchaseSuccessPage';
import { templates } from '../data/templates';

// The auth session arrives through a dynamic import before the first poll runs.
// RTL's 1s default is tight for that chain under a parallel suite.
configure({ asyncUtilTimeout: 5_000 });

const mocks = vi.hoisted(() => {
  const maybeSingle = vi.fn();

  interface QueryStub {
    select: () => QueryStub;
    eq: () => QueryStub;
    limit: () => QueryStub;
    maybeSingle: typeof maybeSingle;
  }

  const state = { session: null as { user: { id: string; email: string } } | null };

  const query = (): QueryStub => {
    const q: QueryStub = {
      select: () => q,
      eq: () => q,
      limit: () => q,
      maybeSingle,
    };
    return q;
  };

  return {
    state,
    maybeSingle,
    supabase: {
      auth: {
        getSession: () => Promise.resolve({ data: { session: state.session } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => query(),
    },
  };
});

const downloadTemplateZip = vi.hoisted(() => vi.fn());

vi.mock('../lib/supabase', () => ({ supabase: mocks.supabase, isSupabaseConfigured: true }));
vi.mock('../lib/downloads', () => ({ downloadTemplateZip }));

const BOUGHT = templates.find(t => t.id === '1')!;
const BUYER = { user: { id: 'user-1', email: 'buyer@example.com' } };
const RETURN_URL = `/purchase-success?session_id=cs_test_1&template_id=${BOUGHT.id}`;

beforeEach(() => {
  mocks.state.session = BUYER;
  mocks.maybeSingle.mockReset();
  mocks.maybeSingle.mockResolvedValue({ data: null, error: null });
  downloadTemplateZip.mockReset();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('PurchaseSuccessPage', () => {
  it('never grants access from the return URL alone', async () => {
    renderWithProviders(<PurchaseSuccessPage />, { route: RETURN_URL });

    // The server has been asked and has no purchase row for this buyer.
    await waitFor(() => expect(mocks.maybeSingle).toHaveBeenCalled());

    expect(screen.getByRole('heading', { name: /confirming your purchase/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /payment successful/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /download/i })).not.toBeInTheDocument();
  });

  it('announces success and offers the download once the purchase row exists', async () => {
    mocks.maybeSingle.mockResolvedValue({ data: { id: 'p1' }, error: null });

    renderWithProviders(<PurchaseSuccessPage />, { route: RETURN_URL });

    expect(await screen.findByRole('heading', { name: /payment successful/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /download template/i })).toBeInTheDocument();
  });

  it('downloads through the shared, ownership-checked helper after confirmation', async () => {
    mocks.maybeSingle.mockResolvedValue({ data: { id: 'p1' }, error: null });
    const user = userEvent.setup();

    renderWithProviders(<PurchaseSuccessPage />, { route: RETURN_URL });
    await user.click(await screen.findByRole('button', { name: /download template/i }));

    expect(downloadTemplateZip).toHaveBeenCalledWith(expect.objectContaining({ id: BOUGHT.id }));
  });

  it('says confirmation is taking longer rather than claiming the purchase succeeded', async () => {
    vi.useFakeTimers();

    renderWithProviders(<PurchaseSuccessPage />, { route: RETURN_URL });
    // Run the clock past the page's confirmation deadline with the row still
    // absent. One `act` per step, not one around the loop: React flushes each
    // poll's state update at the act boundary, so a single jump never polls.
    for (let step = 0; step < 15; step += 1) {
      await act(async () => {
        await vi.advanceTimersByTimeAsync(2_000);
      });
    }

    expect(screen.getByRole('heading', { name: /taking longer than expected/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /payment successful/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /download/i })).not.toBeInTheDocument();
  });

  it('asks an anonymous visitor to sign in instead of confirming anything', async () => {
    mocks.state.session = null;

    renderWithProviders(<PurchaseSuccessPage />, { route: RETURN_URL });

    expect(
      await screen.findByRole('heading', { name: /sign in to confirm your purchase/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /payment successful/i })).not.toBeInTheDocument();
    expect(mocks.maybeSingle).not.toHaveBeenCalled();
  });
});
