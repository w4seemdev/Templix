/**
 * TemplateCard is the storefront's unit of merchandise: it has to state the
 * price correctly, link to the product page, and let a shopper save something
 * for later without breaking the card's own link.
 */
import type { Template } from '../../types';
import { act, renderWithProviders, screen, userEvent } from '../../test/utils';
import TemplateCard from './TemplateCard';

const WISHLIST_KEY = 'templix_wishlist';

vi.mock('../../lib/supabase', () => ({
  // TemplateCard reads no auth state; AuthProvider only mounts because the
  // shared render helper supplies it. A session that never settles keeps the
  // provider from updating state after the test has finished.
  supabase: {
    auth: {
      getSession: () => new Promise(() => {}),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
  },
}));

/**
 * A local fixture, not a row from src/data/templates.ts: repricing a real
 * template is a business decision and must not turn this suite red.
 */
const paidTemplate: Template = {
  id: 'fixture-paid',
  title: 'Luminary',
  description: 'A clean single-page SaaS landing template.',
  category: 'saas',
  price: 59,
  image: '/covers/luminary.png',
  tags: ['SaaS', 'Landing Page', 'Dark Mode'],
  isFree: false,
  isFeatured: true,
  isPremium: true,
  demoUrl: '/preview/luminary',
  techStack: ['React'],
  pages: ['Hero'],
  included: ['Complete React + TypeScript source (Vite)'],
};

const freeTemplate: Template = {
  ...paidTemplate,
  id: 'fixture-free',
  title: 'Folio',
  price: 0,
  isFree: true,
  isPremium: false,
};

beforeEach(() => {
  localStorage.clear();
});

/**
 * useWishlist keeps one snapshot in module scope and only re-reads storage
 * while a consumer is mounted (it attaches the `storage` listener on first
 * subscribe and drops it on last unsubscribe). So the shared store has to be
 * put back with the tree still up - call this at the end of any test that
 * leaves entries behind, or they leak into the next one.
 */
function resetSharedWishlist() {
  act(() => {
    localStorage.clear();
    window.dispatchEvent(new StorageEvent('storage', { key: WISHLIST_KEY }));
  });
}

describe('TemplateCard', () => {
  it('renders the title, the price, and a link to the product page', () => {
    renderWithProviders(<TemplateCard template={paidTemplate} />);

    expect(screen.getByRole('heading', { name: 'Luminary' })).toBeInTheDocument();
    expect(screen.getByText('$59')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/templates/fixture-paid');
  });

  it('labels a paid template with its tier and never with "Free"', () => {
    renderWithProviders(<TemplateCard template={paidTemplate} />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.queryByText('Free')).not.toBeInTheDocument();
  });

  it('shows "Free" in place of a price for a free template, never "$0"', () => {
    renderWithProviders(<TemplateCard template={freeTemplate} />);

    expect(screen.queryByText(/\$/)).not.toBeInTheDocument();
    expect(screen.getAllByText('Free').length).toBeGreaterThan(0);
    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('toggles the wishlist through the save control and persists the change', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TemplateCard template={paidTemplate} />);

    const save = screen.getByRole('button', { name: 'Save Luminary to wishlist' });
    expect(save).toHaveAttribute('aria-pressed', 'false');

    await user.click(save);

    const remove = screen.getByRole('button', { name: 'Remove Luminary from wishlist' });
    expect(remove).toHaveAttribute('aria-pressed', 'true');
    // A saved template has to survive a reload, so it must reach storage.
    expect(JSON.parse(localStorage.getItem(WISHLIST_KEY) ?? '[]')).toContain('fixture-paid');

    await user.click(remove);

    expect(screen.getByRole('button', { name: 'Save Luminary to wishlist' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(JSON.parse(localStorage.getItem(WISHLIST_KEY) ?? '[]')).not.toContain('fixture-paid');
  });

  it('keeps the wishlist button outside the card link', () => {
    renderWithProviders(<TemplateCard template={paidTemplate} />);

    const link = screen.getByRole('link');
    const save = screen.getByRole('button', { name: /wishlist/i });

    // Positive control: proves the containment check is actually looking at
    // this link, so the negative assertion below cannot pass vacuously.
    expect(link).toContainElement(screen.getByRole('heading', { name: 'Luminary' }));

    // A <button> inside an <a> is invalid HTML: the browser's accessibility
    // tree and keyboard activation both become unreliable, and the click can
    // navigate instead of toggling.
    expect(link).not.toContainElement(save);
    expect(save.closest('a')).toBeNull();
  });

  it('picks up a save made in another tab', () => {
    renderWithProviders(<TemplateCard template={paidTemplate} />);

    expect(screen.getByRole('button', { name: 'Save Luminary to wishlist' })).toBeInTheDocument();

    act(() => {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(['fixture-paid']));
      window.dispatchEvent(new StorageEvent('storage', { key: WISHLIST_KEY }));
    });

    expect(screen.getByRole('button', { name: 'Remove Luminary from wishlist' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    resetSharedWishlist();
  });
});
