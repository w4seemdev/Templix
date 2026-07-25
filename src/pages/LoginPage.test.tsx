/**
 * LoginPage - the gate a buyer has to pass before they can pay or re-download.
 *
 * The failure that matters most is the silent one: a submit button that never
 * leaves "Please wait..." and never says why. Every path through the form has to
 * end with either a navigation or a message the person can read.
 *
 * Boundary mocked: the Supabase client behind AuthContext. `isSupabaseConfigured`
 * is forced on because the test environment ships no Supabase env vars, and the
 * page (correctly) disables the whole form when they are missing.
 */
import { Route, Routes } from 'react-router-dom';
import { configure, renderWithProviders, screen, userEvent, within } from '../test/utils';
import LoginPage from './LoginPage';
import { MIN_PASSWORD_LENGTH } from '../lib/constants';

// Every auth call reaches the client through a dynamic import, so the banner
// lands a few turns after the click. RTL's 1s default is tight under a parallel
// suite - and a flaky auth test is one nobody trusts when it does catch something.
configure({ asyncUtilTimeout: 5_000 });

// Every userEvent session below passes `delay: null`. The default awaits a tick
// per keystroke, and these forms are the only ones in the suite that get typed
// into character by character - enough to blow the 5s test timeout under load.

const auth = vi.hoisted(() => ({
  signInWithPassword: vi.fn(),
  signUp: vi.fn(),
  signInWithOAuth: vi.fn(),
  resetPasswordForEmail: vi.fn(),
  resend: vi.fn(),
  getSession: vi.fn(),
  onAuthStateChange: vi.fn(),
}));

vi.mock('../lib/supabase', () => ({ supabase: { auth }, isSupabaseConfigured: true }));

vi.mock('../lib/constants', async importOriginal => ({
  ...(await importOriginal<typeof import('../lib/constants')>()),
  isSupabaseConfigured: true,
}));

const EMAIL = 'buyer@example.com';

function renderLogin() {
  return renderWithProviders(
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<h1>Your library</h1>} />
    </Routes>,
    { route: '/login' },
  );
}

/**
 * The form's own submit button. Scoped to the <form> because "Sign in" is also
 * the mode tab and the bottom mode-switch link.
 */
function submitButton(): HTMLElement {
  const form = screen.getByLabelText(/^password$/i).closest('form')!;
  return within(form).getByRole('button', { name: /sign in|create account|please wait/i });
}

beforeEach(() => {
  auth.getSession.mockResolvedValue({ data: { session: null } });
  auth.onAuthStateChange.mockReturnValue({ data: { subscription: { unsubscribe: () => {} } } });
  auth.signInWithPassword.mockReset();
  auth.signUp.mockReset();
  auth.resetPasswordForEmail.mockReset();
});

describe('LoginPage', () => {
  it(`rejects a password shorter than ${MIN_PASSWORD_LENGTH} characters without calling the auth service`, async () => {
    const user = userEvent.setup({ delay: null });
    renderLogin();

    await user.click(screen.getByRole('button', { name: 'Sign up' }));
    await user.type(screen.getByLabelText(/full name/i), 'Buyer One');
    await user.type(screen.getByLabelText(/email address/i), EMAIL);
    await user.type(screen.getByLabelText(/^password$/i), 'a'.repeat(MIN_PASSWORD_LENGTH - 1));
    await user.click(submitButton());

    expect(await screen.findByRole('alert')).toHaveTextContent(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    );
    expect(auth.signUp).not.toHaveBeenCalled();
    expect(submitButton()).toBeEnabled();
  });

  it('asks for an email address before sending a password reset', async () => {
    const user = userEvent.setup({ delay: null });
    renderLogin();

    await user.click(screen.getByRole('button', { name: /forgot password/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Enter your email first.');
    expect(auth.resetPasswordForEmail).not.toHaveBeenCalled();
  });

  it('shows the rejection reason and re-enables the submit button when sign-in is refused', async () => {
    auth.signInWithPassword.mockResolvedValue({ error: { message: 'Invalid login credentials' } });
    const user = userEvent.setup({ delay: null });
    renderLogin();

    await user.type(screen.getByLabelText(/email address/i), EMAIL);
    await user.type(screen.getByLabelText(/^password$/i), 'wrong-password');
    await user.click(submitButton());

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid login credentials');
    expect(submitButton()).toBeEnabled();
    expect(submitButton()).not.toHaveTextContent(/please wait/i);
  });

  it('leaves the loading state and explains itself when the auth service is unreachable', async () => {
    // The auth client rejecting outright - a stale cached index.html after a
    // deploy, or a blocked chunk. There is no Supabase message to relay.
    auth.signInWithPassword.mockRejectedValue(new Error('Failed to fetch dynamically imported module'));
    const user = userEvent.setup({ delay: null });
    renderLogin();

    await user.type(screen.getByLabelText(/email address/i), EMAIL);
    await user.type(screen.getByLabelText(/^password$/i), 'correct-horse');
    await user.click(submitButton());

    expect(await screen.findByRole('alert')).toHaveTextContent(/reach the sign-in service/i);
    expect(submitButton()).not.toHaveTextContent(/please wait/i);
    expect(submitButton()).toBeEnabled();
  });

  it('sends the buyer on to their library once sign-in succeeds', async () => {
    auth.signInWithPassword.mockResolvedValue({ error: null });
    const user = userEvent.setup({ delay: null });
    renderLogin();

    await user.type(screen.getByLabelText(/email address/i), EMAIL);
    await user.type(screen.getByLabelText(/^password$/i), 'correct-horse');
    await user.click(submitButton());

    expect(await screen.findByRole('heading', { name: 'Your library' })).toBeInTheDocument();
  });
});
