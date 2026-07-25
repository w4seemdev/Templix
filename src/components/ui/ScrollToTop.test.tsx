/**
 * ScrollToTop renders nothing, but it owns two behaviours a visitor notices:
 * a route change starts at the top of the page, and it announces itself to
 * keyboard and screen-reader users by moving focus to the <main> landmark -
 * without stealing focus on the very first paint.
 */
import { Link } from 'react-router-dom';
import { renderWithProviders, screen, userEvent } from '../../test/utils';
import ScrollToTop from './ScrollToTop';

vi.mock('../../lib/supabase', () => ({
  // ScrollToTop reads no auth state; AuthProvider only mounts because the
  // shared render helper supplies it.
  supabase: {
    auth: {
      getSession: () => new Promise(() => {}),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
  },
}));

/** Stands in for App's shell: the landmark ScrollToTop targets, plus a route to move to. */
function RouterHarness() {
  return (
    <>
      <ScrollToTop />
      <main id="main" tabIndex={-1}>
        Page body
      </main>
      <Link to="/templates">Browse templates</Link>
    </>
  );
}

const realScrollTo = window.scrollTo;
let scrollTo: ReturnType<typeof vi.fn>;

beforeEach(() => {
  scrollTo = vi.fn();
  window.scrollTo = scrollTo as unknown as typeof window.scrollTo;
});

afterEach(() => {
  window.scrollTo = realScrollTo;
});

describe('ScrollToTop', () => {
  it('jumps to the top of the page on a route change', async () => {
    const user = userEvent.setup();
    renderWithProviders(<RouterHarness />, { route: '/' });
    scrollTo.mockClear();

    await user.click(screen.getByRole('link', { name: 'Browse templates' }));

    // 'instant' matters: the global `scroll-behavior: smooth` would otherwise
    // animate the jump and the new page would open mid-scroll.
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' });
  });

  it('leaves focus alone on first paint', () => {
    renderWithProviders(<RouterHarness />, { route: '/' });

    // Landing directly on a page must not yank focus off the document start.
    expect(screen.getByRole('main')).not.toHaveFocus();
    expect(document.body).toHaveFocus();
  });

  it('moves focus to the main landmark after navigating', async () => {
    const user = userEvent.setup();
    renderWithProviders(<RouterHarness />, { route: '/' });

    await user.click(screen.getByRole('link', { name: 'Browse templates' }));

    // Without this a screen-reader user is never told the page changed, and a
    // keyboard user resumes tabbing from wherever the old link was.
    expect(screen.getByRole('main')).toHaveFocus();
  });
});
