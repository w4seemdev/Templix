/**
 * DashboardPage — the buyer's library.
 *
 * The load-bearing distinction here is "you own nothing" versus "we couldn't
 * check". A paying customer who is told their library is empty has, from where
 * they sit, lost what they paid for.
 *
 * Boundaries mocked: the Supabase client (auth session + the `purchases` query)
 * and the shared download helper.
 */
import { configure, renderWithProviders, screen, userEvent, waitFor } from '../test/utils';
import DashboardPage from './DashboardPage';
import { templates } from '../data/templates';

// The auth session arrives through a dynamic import before the library query
// even starts. RTL's 1s default is tight for that chain under a parallel suite.
configure({ asyncUtilTimeout: 5_000 });

const mocks = vi.hoisted(() => {
  type Row = Record<string, unknown>;
  type Result = { data: Row[] | null; error: { message: string } | null };
  interface QueryStub {
    select: () => QueryStub;
    eq: () => QueryStub;
    order: () => QueryStub;
    returns: () => QueryStub;
    then: (onFulfilled: (result: Result) => void) => Promise<void>;
  }

  const state = {
    session: null as { user: { id: string; email: string; created_at: string } } | null,
    /** Resolves the `purchases` query — swapped per test. */
    purchases: (): Promise<Result> => Promise.resolve({ data: [], error: null }),
  };

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

const OWNED = templates.find(t => t.id === '1')!;

const BUYER = { user: { id: 'user-1', email: 'buyer@example.com', created_at: '2025-11-02T09:00:00.000Z' } };

const PURCHASE_ROW = {
  id: 'p1',
  user_id: BUYER.user.id,
  template_id: OWNED.id,
  stripe_session_id: 'cs_test_1',
  amount: OWNED.price,
  created_at: '2026-01-15T10:00:00.000Z',
};

/** Reads the figure rendered under a stat card's label. */
function statValue(label: string): string {
  return screen.getByText(label).nextElementSibling?.textContent ?? '';
}

beforeEach(() => {
  mocks.state.session = BUYER;
  mocks.state.purchases = () => Promise.resolve({ data: [], error: null });
  downloadTemplateZip.mockReset();
});

describe('DashboardPage', () => {
  it('lists the templates the buyer has purchased', async () => {
    mocks.state.purchases = () => Promise.resolve({ data: [PURCHASE_ROW], error: null });

    renderWithProviders(<DashboardPage />, { route: '/dashboard' });

    expect(await screen.findByRole('heading', { name: OWNED.title, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^download$/i })).toBeInTheDocument();
    expect(statValue('Templates owned')).toBe('1');
  });

  it('shows an honest empty state when the buyer has bought nothing yet', async () => {
    renderWithProviders(<DashboardPage />, { route: '/dashboard' });

    expect(await screen.findByRole('heading', { name: /no purchases yet/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /browse templates/i })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('reports a failed library load as an error, not as an empty library', async () => {
    mocks.state.purchases = () => Promise.resolve({ data: null, error: { message: 'JWT expired' } });

    renderWithProviders(<DashboardPage />, { route: '/dashboard' });

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/load your library/i);
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /no purchases yet/i })).not.toBeInTheDocument();
  });

  it('does not claim the buyer owns zero templates when the library could not be read', async () => {
    mocks.state.purchases = () => Promise.resolve({ data: null, error: { message: 'JWT expired' } });

    renderWithProviders(<DashboardPage />, { route: '/dashboard' });

    await screen.findByRole('alert');
    // "0" here is a factual claim the page is in no position to make.
    expect(statValue('Templates owned')).not.toBe('0');
    expect(statValue('Library value')).not.toBe('$0');
  });

  it('does not state a library size while the library is still loading', async () => {
    mocks.state.purchases = () => new Promise(() => {}); // never settles

    renderWithProviders(<DashboardPage />, { route: '/dashboard' });

    expect(await screen.findByRole('status')).toHaveTextContent(/loading your purchases/i);
    expect(statValue('Templates owned')).not.toBe('0');
    expect(statValue('Library value')).not.toBe('$0');
  });

  it('recovers the library when the buyer retries after a failed load', async () => {
    mocks.state.purchases = () => Promise.resolve({ data: null, error: { message: 'JWT expired' } });
    const user = userEvent.setup();

    renderWithProviders(<DashboardPage />, { route: '/dashboard' });
    await screen.findByRole('alert');

    mocks.state.purchases = () => Promise.resolve({ data: [PURCHASE_ROW], error: null });
    await user.click(screen.getByRole('button', { name: /retry/i }));

    expect(await screen.findByRole('heading', { name: OWNED.title, level: 3 })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('routes a download through the shared, ownership-checked download helper', async () => {
    mocks.state.purchases = () => Promise.resolve({ data: [PURCHASE_ROW], error: null });
    const user = userEvent.setup();

    renderWithProviders(<DashboardPage />, { route: '/dashboard' });
    await user.click(await screen.findByRole('button', { name: /^download$/i }));

    expect(downloadTemplateZip).toHaveBeenCalledWith(expect.objectContaining({ id: OWNED.id }));
  });

  it('tells the buyer why a download failed instead of doing nothing', async () => {
    mocks.state.purchases = () => Promise.resolve({ data: [PURCHASE_ROW], error: null });
    downloadTemplateZip.mockRejectedValue(new Error('Download is not available for this template.'));
    const user = userEvent.setup();

    renderWithProviders(<DashboardPage />, { route: '/dashboard' });
    await user.click(await screen.findByRole('button', { name: /^download$/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Download is not available for this template.');
    });
  });
});
