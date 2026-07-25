/**
 * usePurchases guards money: every caller decides from its output whether to
 * offer a checkout. The distinction these tests exist to protect is
 * "you own nothing" (purchasedIds === [], error === false) versus
 * "we could not check" (purchasedIds === [], error === true). Collapse the two
 * and TemplateDetailPage offers a second checkout to someone who already paid.
 *
 * The Supabase client is mocked at the module boundary, so both this hook (which
 * imports it statically) and AuthProvider (which imports it lazily) resolve to
 * the fake below. Queries are handed back as deferred promises: the test decides
 * when — and in what order — each one settles.
 */
import { AuthProvider } from '../context/AuthContext';
import { act, renderHook, waitFor } from '../test/utils';
import { usePurchases } from './usePurchases';

interface QueryBuilder {
  select: () => QueryBuilder;
  eq: (column: string, value: string) => QueryBuilder;
  returns: () => Promise<unknown>;
}

interface QueryResult {
  data: { template_id: string }[] | null;
  error: { message: string } | null;
}

type AuthCallback = (event: string, session: unknown) => void;

const boundary = vi.hoisted(() => {
  const queries: { userId: string; resolve: (result: unknown) => void }[] = [];
  let authCallback: ((event: string, session: unknown) => void) | null = null;
  let session: unknown = null;

  const client = {
    from: () => {
      let userId = '';
      const builder: QueryBuilder = {
        select: () => builder,
        eq: (_column: string, value: string) => {
          userId = value;
          return builder;
        },
        // Deferred on purpose — nothing settles until a test says so.
        returns: () =>
          new Promise<unknown>(resolve => {
            queries.push({ userId, resolve });
          }),
      };
      return builder;
    },
    auth: {
      getSession: () => Promise.resolve({ data: { session } }),
      onAuthStateChange: (callback: AuthCallback) => {
        authCallback = callback;
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
    },
  };

  return {
    client,
    queries,
    isListening: () => authCallback !== null,
    /** Session that `getSession()` resolves with — set this before rendering. */
    startSignedInAs: (userId: string | null) => {
      session = userId === null ? null : { user: { id: userId } };
    },
    /** Fire a supabase auth event, exactly as the real client would. */
    emitAuth: (event: string, next: unknown) => {
      authCallback?.(event, next);
    },
    reset: () => {
      queries.length = 0;
      authCallback = null;
      session = null;
    },
  };
});

vi.mock('../lib/supabase', () => ({
  supabase: boundary.client,
  isSupabaseConfigured: true,
}));

const renderPurchases = () => renderHook(() => usePurchases(), { wrapper: AuthProvider });

/** Settle a pending query and flush the state update it triggers. */
async function settleQuery(index: number, result: QueryResult) {
  await act(async () => {
    boundary.queries[index].resolve(result);
  });
}

/** Render, wait for the query the signed-in session triggers, and hand it over. */
async function renderSignedIn(userId: string) {
  boundary.startSignedInAs(userId);
  const rendered = renderPurchases();
  await waitFor(() => expect(boundary.queries).toHaveLength(1));
  return rendered;
}

beforeEach(() => {
  boundary.reset();
});

describe('usePurchases', () => {
  it('loads the ids of the templates the signed-in buyer owns', async () => {
    const { result } = await renderSignedIn('buyer-1');

    expect(boundary.queries[0].userId).toBe('buyer-1');
    await settleQuery(0, { data: [{ template_id: '3' }, { template_id: '17' }], error: null });

    expect(result.current.purchasedIds).toEqual(['3', '17']);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);
  });

  it('reports ownership only for the templates in the buyer library', async () => {
    const { result } = await renderSignedIn('buyer-1');
    await settleQuery(0, { data: [{ template_id: '3' }, { template_id: '17' }], error: null });

    expect(result.current.hasPurchased('3')).toBe(true);
    expect(result.current.hasPurchased('17')).toBe(true);
    expect(result.current.hasPurchased('4')).toBe(false);
  });

  it('reports an empty library rather than a failure when the buyer owns nothing', async () => {
    const { result } = await renderSignedIn('buyer-1');
    await settleQuery(0, { data: [], error: null });

    expect(result.current.purchasedIds).toEqual([]);
    expect(result.current.loading).toBe(false);
    // The load succeeded — a caller may safely offer checkout on this state.
    expect(result.current.error).toBe(false);
  });

  it('flags a failed query instead of passing it off as an empty library', async () => {
    const { result } = await renderSignedIn('buyer-1');
    await settleQuery(0, { data: null, error: { message: 'JWT expired' } });

    expect(result.current.error).toBe(true);
    expect(result.current.loading).toBe(false);
    // purchasedIds is empty here too, which is exactly why `error` has to be
    // consulted: without it this state is indistinguishable from "owns nothing".
    expect(result.current.purchasedIds).toEqual([]);
    expect(result.current.hasPurchased('3')).toBe(false);
  });

  it('does not leave the previous buyer library on screen after another account signs in', async () => {
    const { result } = await renderSignedIn('buyer-1');
    await settleQuery(0, { data: [{ template_id: '3' }], error: null });

    await waitFor(() => expect(boundary.isListening()).toBe(true));
    act(() => {
      boundary.emitAuth('SIGNED_IN', { user: { id: 'buyer-2' } });
    });

    await waitFor(() => expect(boundary.queries).toHaveLength(2));
    expect(boundary.queries[1].userId).toBe('buyer-2');
    expect(result.current.purchasedIds).toEqual([]);
    expect(result.current.loading).toBe(true);
  });

  it('ignores a late response for the account the buyer already switched away from', async () => {
    const { result } = await renderSignedIn('buyer-1');
    await waitFor(() => expect(boundary.isListening()).toBe(true));

    act(() => {
      boundary.emitAuth('SIGNED_IN', { user: { id: 'buyer-2' } });
    });
    await waitFor(() => expect(boundary.queries).toHaveLength(2));

    // buyer-1's query finally comes back, out of order and for the wrong account.
    await settleQuery(0, { data: [{ template_id: '3' }], error: null });
    expect(result.current.purchasedIds).toEqual([]);
    expect(result.current.loading).toBe(true);

    await settleQuery(1, { data: [{ template_id: '17' }], error: null });
    expect(result.current.purchasedIds).toEqual(['17']);
  });

  it('keeps the loaded library and issues no second query when the token refreshes', async () => {
    const { result } = await renderSignedIn('buyer-1');
    await settleQuery(0, { data: [{ template_id: '3' }], error: null });
    await waitFor(() => expect(boundary.isListening()).toBe(true));

    // TOKEN_REFRESHED (~hourly) hands over a brand new session and user object
    // for the same person. Re-querying would blank the library mid-session.
    act(() => {
      boundary.emitAuth('TOKEN_REFRESHED', { user: { id: 'buyer-1' } });
    });

    expect(boundary.queries).toHaveLength(1);
    expect(result.current.purchasedIds).toEqual(['3']);
    expect(result.current.loading).toBe(false);
  });

  it('clears the library and stops loading when the buyer signs out', async () => {
    const { result } = await renderSignedIn('buyer-1');
    await settleQuery(0, { data: [{ template_id: '3' }], error: null });
    await waitFor(() => expect(boundary.isListening()).toBe(true));

    act(() => {
      boundary.emitAuth('SIGNED_OUT', null);
    });

    expect(result.current.purchasedIds).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);
    expect(boundary.queries).toHaveLength(1);
  });

  it('settles without querying for an anonymous visitor', async () => {
    boundary.startSignedInAs(null);
    const { result } = renderPurchases();

    await waitFor(() => expect(boundary.isListening()).toBe(true));

    expect(boundary.queries).toHaveLength(0);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);
    expect(result.current.purchasedIds).toEqual([]);
  });
});
