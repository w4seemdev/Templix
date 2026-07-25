/**
 * TemplateDetailPage - the page that decides whether a visitor is asked to pay.
 *
 * Everything here guards money: the CTA must quote the catalog price, must never
 * appear while ownership is unknown (that window is how an existing owner gets
 * charged twice), and the structured data Google reads must agree with the price
 * the buyer is shown.
 *
 * Boundaries mocked: the Supabase client (auth session + the `purchases` query +
 * edge-function invocations) and the shared download helper. Everything else -
 * AuthProvider, usePurchases, the page itself - runs for real.
 */
import { Route, Routes } from 'react-router-dom';
import { configure, renderWithProviders, screen, userEvent, waitFor } from '../test/utils';
import TemplateDetailPage from './TemplateDetailPage';
import { templates } from '../data/templates';

// Nothing on this page settles until the auth session has come back through a
// dynamic import and the library query has answered. RTL's 1s default is tight
// for that chain once the whole suite runs in parallel.
configure({ asyncUtilTimeout: 5_000 });

const mocks = vi.hoisted(() => {
  type Row = { template_id: string };
  type Result = { data: Row[] | null; error: { message: string } | null };
  interface QueryStub {
    select: () => QueryStub;
    eq: () => QueryStub;
    order: () => QueryStub;
    returns: () => QueryStub;
    then: (onFulfilled: (result: Result) => void) => Promise<void>;
  }

  const state = {
    session: null as { user: { id: string; email: string } } | null,
    /** Resolves the `purchases` query - swapped per test: empty, owned, failed, or pending. */
    purchases: (): Promise<Result> => Promise.resolve({ data: [], error: null }),
  };

  const invoke = vi.fn();

  const query = (): QueryStub => {
    const q: QueryStub = {
      select: () => q,
      eq: () => q,
      order: () => q,
      returns: () => q,
      then: onFulfilled => state.purchases().then(onFulfilled),
    };
    return q;
  };

  return {
    state,
    invoke,
    supabase: {
      auth: {
        getSession: () => Promise.resolve({ data: { session: state.session } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => query(),
      functions: { invoke },
    },
  };
});

const downloadTemplateZip = vi.hoisted(() => vi.fn());

vi.mock('../lib/supabase', () => ({ supabase: mocks.supabase, isSupabaseConfigured: true }));
vi.mock('../lib/downloads', () => ({ downloadTemplateZip }));

/** A paid template and a free one, read from the catalog that prices them. */
const PAID = templates.find(t => t.id === '1')!;
const FREE = templates.find(t => t.id === '2')!;

const BUYER = { user: { id: 'user-1', email: 'buyer@example.com' } };

function renderDetail(id: string) {
  return renderWithProviders(
    <Routes>
      <Route path="/templates/:id" element={<TemplateDetailPage />} />
    </Routes>,
    { route: `/templates/${id}` },
  );
}

/** The Product node the page injects into <head> for Google. */
function productStructuredData(): { offers: { price: number } } | undefined {
  const scripts = Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
  );
  const nodes = scripts.flatMap(s => JSON.parse(s.textContent ?? '[]') as { '@type': string }[]);
  return nodes.find(n => n['@type'] === 'Product') as { offers: { price: number } } | undefined;
}

/** The dollar figure inside an element, e.g. "Buy now - $59" -> 59. */
function dollarsIn(el: HTMLElement): number {
  const match = /\$(\d+)/.exec(el.textContent ?? '');
  return match ? Number(match[1]) : NaN;
}

let restoreLocation: (() => void) | null = null;

/**
 * Swaps window.location for a stand-in whose `assign` is observable. jsdom has no
 * navigation, so without this the Stripe redirect is a "Not implemented" error
 * rather than something a test can read.
 */
function stubLocationAssign(): ReturnType<typeof vi.fn> {
  const original = Object.getOwnPropertyDescriptor(window, 'location')!;
  const assign = vi.fn();
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { ...window.location, assign },
  });
  restoreLocation = () => Object.defineProperty(window, 'location', original);
  return assign;
}

beforeEach(() => {
  mocks.state.session = null;
  mocks.state.purchases = () => Promise.resolve({ data: [], error: null });
  mocks.invoke.mockReset();
  downloadTemplateZip.mockReset();
});

afterEach(() => {
  restoreLocation?.();
  restoreLocation = null;
});

describe('TemplateDetailPage', () => {
  it('offers a visitor who is not signed in the catalog price on the buy CTA', async () => {
    renderDetail(PAID.id);

    const buy = await screen.findByRole('button', { name: /buy now/i });

    expect(dollarsIn(buy)).toBe(PAID.price);
    expect(screen.queryByRole('button', { name: /download template/i })).not.toBeInTheDocument();
  });

  it('sends the price the buyer was shown to the checkout function', async () => {
    mocks.state.session = BUYER;
    mocks.invoke.mockResolvedValue({ data: { url: 'https://checkout.stripe.com/c/pay/cs_test_1' }, error: null });
    const assign = stubLocationAssign();
    const user = userEvent.setup();

    renderDetail(PAID.id);
    const buy = await screen.findByRole('button', { name: /buy now/i });
    const advertised = dollarsIn(buy);
    await user.click(buy);

    expect(mocks.invoke).toHaveBeenCalledWith('create-checkout', {
      body: {
        templateId: PAID.id,
        templateTitle: PAID.title,
        price: advertised,
        userId: BUYER.user.id,
      },
    });
    expect(advertised).toBe(PAID.price);
    await waitFor(() =>
      expect(assign).toHaveBeenCalledWith('https://checkout.stripe.com/c/pay/cs_test_1'),
    );
  });

  it('withholds the buy CTA while the buyer library is still loading', async () => {
    mocks.state.session = BUYER;
    mocks.state.purchases = () => new Promise(() => {}); // never settles

    renderDetail(PAID.id);

    // Ownership unknown means "wait", never "pay again".
    expect(await screen.findByRole('button', { name: /checking your library/i })).toBeDisabled();
    expect(screen.queryByRole('button', { name: /buy now/i })).not.toBeInTheDocument();
    expect(mocks.invoke).not.toHaveBeenCalled();
  });

  it('offers an owner the download and never a second purchase', async () => {
    mocks.state.session = BUYER;
    mocks.state.purchases = () => Promise.resolve({ data: [{ template_id: PAID.id }], error: null });

    renderDetail(PAID.id);

    expect(await screen.findByRole('button', { name: /download template/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /buy now/i })).not.toBeInTheDocument();
  });

  it('refuses checkout and offers a retry when the library lookup fails', async () => {
    mocks.state.session = BUYER;
    mocks.state.purchases = () => Promise.resolve({ data: null, error: { message: 'JWT expired' } });

    renderDetail(PAID.id);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/verify your library/i);
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    // A failed lookup is not "you don't own this" - charging here bills an owner twice.
    expect(screen.queryByRole('button', { name: /buy now/i })).not.toBeInTheDocument();
    expect(mocks.invoke).not.toHaveBeenCalled();
  });

  it('downloads a free template without creating a checkout session', async () => {
    const user = userEvent.setup();
    renderDetail(FREE.id);

    await user.click(await screen.findByRole('button', { name: /download free/i }));

    expect(downloadTemplateZip).toHaveBeenCalledWith(expect.objectContaining({ id: FREE.id, isFree: true }));
    expect(mocks.invoke).not.toHaveBeenCalled();
  });

  it('publishes the same price in the Product structured data as on the buy CTA', async () => {
    renderDetail(PAID.id);

    const buy = await screen.findByRole('button', { name: /buy now/i });
    const product = productStructuredData();

    expect(product).toBeDefined();
    expect(product!.offers.price).toBe(dollarsIn(buy));
  });

  it('shows a not-found page instead of a buy CTA for an id outside the catalog', async () => {
    renderDetail('not-a-real-template');

    expect(await screen.findByRole('heading', { name: /template not found/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /buy now/i })).not.toBeInTheDocument();
  });
});
