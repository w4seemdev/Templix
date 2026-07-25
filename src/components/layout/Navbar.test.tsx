/**
 * Navbar carries the storefront on every page. The mobile sheet's focus
 * handling exists to fix a WCAG violation (a dialog claiming aria-modal while
 * leaving focus loose behind the scrim), so it is asserted through real
 * keyboard gestures rather than by inspecting refs.
 */
import type { Template } from '../../types';
import { act, renderWithProviders, screen, userEvent, within } from '../../test/utils';
import TemplateCard from '../ui/TemplateCard';
import Navbar from './Navbar';

const WISHLIST_KEY = 'templix_wishlist';
const MOBILE_BREAKPOINT = '(max-width: 860px)';

vi.mock('../../lib/supabase', () => ({
  // A session that never settles leaves Navbar in its signed-out state — the
  // one these tests are about — and keeps AuthProvider from updating state
  // after the test has finished.
  supabase: {
    auth: {
      getSession: () => new Promise(() => {}),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
  },
}));

const realMatchMedia = window.matchMedia;

/**
 * The setup file reports desktop for every query. Navbar reads the breakpoint
 * during its initial useState, so the viewport has to be chosen before render.
 */
function setViewport(kind: 'mobile' | 'desktop') {
  window.matchMedia = ((query: string) => ({
    matches: kind === 'mobile' && query === MOBILE_BREAKPOINT,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

/** See the same note in TemplateCard.test.tsx — the store is module-scoped. */
function resetSharedWishlist() {
  act(() => {
    localStorage.clear();
    window.dispatchEvent(new StorageEvent('storage', { key: WISHLIST_KEY }));
  });
}

const templateFixture: Template = {
  id: 'fixture-1',
  title: 'Luminary',
  description: 'A clean single-page SaaS landing template.',
  category: 'saas',
  price: 59,
  image: '/covers/luminary.png',
  tags: ['SaaS'],
  isFree: false,
  isFeatured: true,
  isPremium: true,
  demoUrl: '/preview/luminary',
  techStack: ['React'],
  pages: ['Hero'],
  included: ['Complete React + TypeScript source (Vite)'],
};

const secondTemplateFixture: Template = {
  ...templateFixture,
  id: 'fixture-2',
  title: 'Folio',
};

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  window.matchMedia = realMatchMedia;
});

describe('Navbar', () => {
  it('marks only the section the visitor is on with aria-current', () => {
    setViewport('desktop');

    renderWithProviders(<Navbar />, { route: '/templates' });

    expect(screen.getByRole('link', { name: 'Templates' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Categories' })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current');
  });

  it('treats a nested route as being inside its section', () => {
    setViewport('desktop');

    renderWithProviders(<Navbar />, { route: '/templates/fixture-1' });

    expect(screen.getByRole('link', { name: 'Templates' })).toHaveAttribute('aria-current', 'page');
  });

  it('counts saved templates as they are saved anywhere on the page', async () => {
    const user = userEvent.setup();
    setViewport('desktop');

    renderWithProviders(
      <>
        <Navbar />
        <TemplateCard template={templateFixture} />
        <TemplateCard template={secondTemplateFixture} />
      </>,
      { route: '/' },
    );

    expect(screen.getByRole('link', { name: 'Wishlist (0 items)' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Save Luminary to wishlist' }));

    // Singular, and sourced from the shared store rather than a local count.
    expect(screen.getByRole('link', { name: 'Wishlist (1 item)' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Save Folio to wishlist' }));

    const wishlist = screen.getByRole('link', { name: 'Wishlist (2 items)' });
    expect(within(wishlist).getByText('2')).toBeInTheDocument();

    resetSharedWishlist();
  });

  it('opens the mobile menu and moves focus into the sheet', async () => {
    const user = userEvent.setup();
    setViewport('mobile');

    renderWithProviders(<Navbar />, { route: '/' });

    await user.click(screen.getByRole('button', { name: 'Open menu' }));

    const sheet = screen.getByRole('dialog', { name: 'Menu' });
    // aria-modal="true" asserts the rest of the page is inert, which is only
    // true if focus actually lands inside the sheet.
    expect(within(sheet).getByRole('button', { name: 'Close menu' })).toHaveFocus();
  });

  it('keeps Tab cycling inside the open mobile menu', async () => {
    const user = userEvent.setup();
    setViewport('mobile');

    renderWithProviders(<Navbar />, { route: '/' });
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    const sheet = screen.getByRole('dialog', { name: 'Menu' });

    // More presses than the sheet has focusable children: without the trap
    // focus escapes into the header links sitting behind the scrim.
    for (let i = 0; i < 12; i += 1) {
      await user.tab();
      expect(sheet).toContainElement(document.activeElement as HTMLElement);
    }

    for (let i = 0; i < 12; i += 1) {
      await user.tab({ shift: true });
      expect(sheet).toContainElement(document.activeElement as HTMLElement);
    }
  });

  it('closes the mobile menu on Escape and hands focus back to the toggle', async () => {
    const user = userEvent.setup();
    setViewport('mobile');

    renderWithProviders(<Navbar />, { route: '/' });
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('dialog', { name: 'Menu' })).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog', { name: 'Menu' })).not.toBeInTheDocument();
    // Without this the keyboard user is dumped on <body> and has to tab from
    // the top of the document again.
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus();
  });

  it('closes the mobile menu from its own close button and restores focus', async () => {
    const user = userEvent.setup();
    setViewport('mobile');

    renderWithProviders(<Navbar />, { route: '/' });
    await user.click(screen.getByRole('button', { name: 'Open menu' }));

    const sheet = screen.getByRole('dialog', { name: 'Menu' });
    await user.click(within(sheet).getByRole('button', { name: 'Close menu' }));

    expect(screen.queryByRole('dialog', { name: 'Menu' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus();
  });
});
