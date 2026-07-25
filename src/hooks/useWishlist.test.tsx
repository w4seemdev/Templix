/**
 * useWishlist is a single module-scoped store read through useSyncExternalStore,
 * so its state outlives any one component - and any one test. Every test below
 * therefore re-imports the module after clearing localStorage, which is also the
 * only way to exercise the hydrate-on-load path (`snapshot = readStored()` runs
 * at import time, not on render).
 *
 * The behaviour worth protecting: one store, many consumers. The bug this
 * rewrite fixed was per-hook `useState` copies, where the navbar badge kept
 * showing a stale count after a card's heart was clicked.
 */
import { act, render, renderHook, screen, userEvent } from '../test/utils';

const STORAGE_KEY = 'templix_wishlist';

let useWishlist: typeof import('./useWishlist').useWishlist;

/** Re-import the store so it re-reads whatever localStorage currently holds. */
async function loadStore() {
  vi.resetModules();
  ({ useWishlist } = await import('./useWishlist'));
}

beforeEach(async () => {
  localStorage.clear();
  await loadStore();
});

/* Two consumers of the same store, shaped like the real ones: the navbar badge
   that only reads, and a card heart that toggles. */
function WishlistBadge() {
  const { wishlist } = useWishlist();
  return <span>Saved ({wishlist.length})</span>;
}

function SaveButton({ id, name }: { id: string; name: string }) {
  const { toggle, isWishlisted } = useWishlist();
  return (
    <button type="button" aria-pressed={isWishlisted(id)} onClick={() => toggle(id)}>
      Save {name}
    </button>
  );
}

describe('useWishlist', () => {
  it('starts empty when nothing has been saved before', () => {
    const { result } = renderHook(() => useWishlist());

    expect(result.current.wishlist).toEqual([]);
    expect(result.current.isWishlisted('3')).toBe(false);
  });

  it('restores the saved template ids on load', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['3', '17']));
    await loadStore();

    const { result } = renderHook(() => useWishlist());

    expect(result.current.wishlist).toEqual(['3', '17']);
    expect(result.current.isWishlisted('17')).toBe(true);
  });

  it('adds a template on the first toggle and removes it on the second', () => {
    const { result } = renderHook(() => useWishlist());

    act(() => result.current.toggle('3'));
    expect(result.current.wishlist).toEqual(['3']);
    expect(result.current.isWishlisted('3')).toBe(true);

    act(() => result.current.toggle('3'));
    expect(result.current.wishlist).toEqual([]);
    expect(result.current.isWishlisted('3')).toBe(false);
  });

  it('persists the wishlist so it survives a reload', async () => {
    const { result } = renderHook(() => useWishlist());
    act(() => result.current.toggle('3'));

    expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(['3']));

    await loadStore();
    const reloaded = renderHook(() => useWishlist());
    expect(reloaded.result.current.wishlist).toEqual(['3']);
  });

  it('keeps every consumer in sync when one of them toggles', async () => {
    render(
      <>
        <WishlistBadge />
        <SaveButton id="3" name="Nebula" />
        <SaveButton id="17" name="Atlas" />
      </>,
    );

    expect(screen.getByText('Saved (0)')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Save Nebula' }));

    // The badge is a separate consumer that never touched `toggle`.
    expect(screen.getByText('Saved (1)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save Nebula' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Save Atlas' })).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(screen.getByRole('button', { name: 'Save Atlas' }));
    expect(screen.getByText('Saved (2)')).toBeInTheDocument();
  });

  it('falls back to an empty wishlist when localStorage holds corrupted JSON', async () => {
    localStorage.setItem(STORAGE_KEY, '{"ids": [3, 17');
    await loadStore();

    const { result } = renderHook(() => useWishlist());

    expect(result.current.wishlist).toEqual([]);
    // Still usable - a corrupt key must not brick the heart on every card.
    act(() => result.current.toggle('3'));
    expect(result.current.wishlist).toEqual(['3']);
  });

  it('drops stored entries that are not template ids', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([3, null, '17', { id: '19' }]));
    await loadStore();

    expect(renderHook(() => useWishlist()).result.current.wishlist).toEqual(['17']);
  });

  it('ignores a stored value that is not an array at all', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ '3': true }));
    await loadStore();

    expect(renderHook(() => useWishlist()).result.current.wishlist).toEqual([]);
  });

  it('picks up a wishlist saved in another tab', () => {
    const { result } = renderHook(() => useWishlist());

    localStorage.setItem(STORAGE_KEY, JSON.stringify(['42']));
    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', { key: STORAGE_KEY, newValue: JSON.stringify(['42']) }),
      );
    });

    expect(result.current.wishlist).toEqual(['42']);
  });

  it('empties the wishlist when another tab clears storage', () => {
    const { result } = renderHook(() => useWishlist());
    act(() => result.current.toggle('3'));

    // localStorage.clear() in another tab fires a storage event with a null key.
    localStorage.clear();
    act(() => {
      window.dispatchEvent(new StorageEvent('storage'));
    });

    expect(result.current.wishlist).toEqual([]);
  });

  it('ignores storage events for keys that are not the wishlist', () => {
    const { result } = renderHook(() => useWishlist());
    act(() => result.current.toggle('3'));

    // A supabase session write, say. The key we own has not changed, so neither
    // should the wishlist - even though this value would parse to something else.
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    act(() => {
      window.dispatchEvent(new StorageEvent('storage', { key: 'sb-templix-auth-token' }));
    });

    expect(result.current.wishlist).toEqual(['3']);
  });

  it('still updates the wishlist when localStorage refuses the write', () => {
    const { result } = renderHook(() => useWishlist());
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    // Private browsing / quota exceeded: the save just will not outlive the tab.
    act(() => result.current.toggle('3'));

    expect(result.current.wishlist).toEqual(['3']);
    setItem.mockRestore();
  });
});
