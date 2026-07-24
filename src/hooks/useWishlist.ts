import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'templix_wishlist';

/**
 * One shared external store instead of per-hook `useState` copies. Every
 * consumer (61 TemplateCards, the Navbar badge, WishlistPage) reads the same
 * snapshot, so a heart click updates all of them instantly — and localStorage is
 * read once per page instead of once per card.
 */
function readStored(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    // JSON.parse returns `any`; anything that isn't an array of strings (legacy
    // writes, another tab, corruption) must not reach `.includes` / `.filter`.
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

let snapshot: string[] = readStored();
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

// Another tab wrote the key — re-read and notify this tab's consumers.
function handleStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== STORAGE_KEY) return;
  snapshot = readStored();
  emit();
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) window.addEventListener('storage', handleStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener('storage', handleStorage);
  };
}

const getSnapshot = () => snapshot;

export function useWishlist() {
  const wishlist = useSyncExternalStore(subscribe, getSnapshot);

  const toggle = useCallback((templateId: string) => {
    snapshot = snapshot.includes(templateId)
      ? snapshot.filter(id => id !== templateId)
      : [...snapshot, templateId];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    } catch {
      // Quota exceeded or storage blocked (private mode): the in-memory
      // snapshot still updates, the wishlist just won't survive a reload.
    }
    emit();
  }, []);

  const isWishlisted = useCallback(
    (templateId: string) => wishlist.includes(templateId),
    [wishlist],
  );

  return { wishlist, toggle, isWishlisted };
}
