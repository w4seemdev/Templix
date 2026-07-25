/**
 * ProtectedRoute gates every signed-in surface (dashboard, purchases,
 * downloads). These tests drive the *real* AuthProvider and mock only the
 * boundary it talks to — the lazily imported supabase module — so each of the
 * four states a visitor can land in is reached through production code paths.
 */
import { Route, Routes } from 'react-router-dom';
import { renderWithProviders, screen, userEvent } from '../../test/utils';
import ProtectedRoute from './ProtectedRoute';

const auth = vi.hoisted(() => ({
  /** Flipped per test to simulate the supabase chunk failing to load. */
  moduleUnavailable: false,
  getSession: vi.fn(),
  onAuthStateChange: vi.fn(),
}));

vi.mock('../../lib/supabase', () => ({
  /**
   * AuthContext loads auth as `(await import('../lib/supabase')).supabase` and
   * treats *any* failure at that expression as "auth is dead". A throwing getter
   * reproduces the stale-index.html chunk 404 through the identical catch —
   * and unlike a factory that throws, it can be flipped per test rather than
   * once per file, so these tests do not depend on execution order.
   */
  get supabase() {
    if (auth.moduleUnavailable) {
      throw new Error('Failed to fetch dynamically imported module');
    }
    return {
      auth: { getSession: auth.getSession, onAuthStateChange: auth.onAuthStateChange },
    };
  },
}));

const signedInSession = { user: { id: 'user-1', email: 'buyer@example.com' } };

/** Mounts the guard on /dashboard with a reachable /login to redirect into. */
function renderGuardedDashboard() {
  return renderWithProviders(
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <h1>Your purchases</h1>
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<h1>Sign in</h1>} />
    </Routes>,
    { route: '/dashboard' },
  );
}

beforeEach(() => {
  auth.moduleUnavailable = false;
  auth.getSession.mockResolvedValue({ data: { session: null } });
  auth.onAuthStateChange.mockReturnValue({
    data: { subscription: { unsubscribe: vi.fn() } },
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('ProtectedRoute', () => {
  it('renders the protected page for a signed-in visitor', async () => {
    auth.getSession.mockResolvedValue({ data: { session: signedInSession } });

    renderGuardedDashboard();

    expect(await screen.findByRole('heading', { name: 'Your purchases' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Sign in' })).not.toBeInTheDocument();
  });

  it('redirects an anonymous visitor to the login page', async () => {
    auth.getSession.mockResolvedValue({ data: { session: null } });

    renderGuardedDashboard();

    expect(await screen.findByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Your purchases' })).not.toBeInTheDocument();
  });

  it('shows a busy indicator while the session is still resolving', async () => {
    // Never settles: the visitor is mid-handshake.
    auth.getSession.mockReturnValue(new Promise(() => {}));

    renderGuardedDashboard();

    expect(await screen.findByRole('status', { name: 'Loading' })).toBeInTheDocument();
    // Neither decision may be made before the session is known.
    expect(screen.queryByRole('heading', { name: 'Your purchases' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Sign in' })).not.toBeInTheDocument();
  });

  it('offers a reload instead of spinning or bouncing when the auth module cannot load', async () => {
    // The real-world trigger: a cached index.html asks for a hashed supabase
    // chunk that the current deploy no longer serves.
    auth.moduleUnavailable = true;

    renderGuardedDashboard();

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/couldn’t load your account/i);
    expect(screen.getByRole('button', { name: 'Reload page' })).toBeInTheDocument();

    // The two failure modes this branch exists to prevent: an endless spinner,
    // and a redirect to /login — which imports the same dead chunk.
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Sign in' })).not.toBeInTheDocument();
  });

  it('reloads the page when the recovery button is pressed', async () => {
    const user = userEvent.setup();
    auth.moduleUnavailable = true;
    const reload = vi.fn();
    // jsdom marks Location.reload non-configurable, so the whole object is
    // swapped rather than spied on, and restored however the test exits.
    const realLocation = window.location;
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...realLocation, reload },
    });

    try {
      renderGuardedDashboard();

      await user.click(await screen.findByRole('button', { name: 'Reload page' }));

      expect(reload).toHaveBeenCalledTimes(1);
    } finally {
      Object.defineProperty(window, 'location', { configurable: true, value: realLocation });
    }
  });
});
