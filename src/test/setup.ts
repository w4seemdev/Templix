/**
 * Global test setup - runs once per test file before any test.
 *
 * Adds the jest-dom matchers (toBeInTheDocument, toHaveAccessibleName, …) and
 * fills the gaps jsdom leaves in the browser APIs this app actually calls.
 * localStorage is NOT stubbed: jsdom implements it, so useWishlist works as-is.
 *
 * `cleanup()` is not called here either - with `globals: true` React Testing
 * Library registers its own afterEach automatically.
 */
import '@testing-library/jest-dom/vitest';

/* ── matchMedia ──────────────────────────────────────────────
   jsdom ships no media-query engine. Navbar reads it during its initial
   useState and subscribes to 'change', and the useIsMobile hook in all 61
   preview pages does the same. Reports desktop (matches: false) and never
   fires; a test that needs mobile can override this per-case. */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

/* ── IntersectionObserver ────────────────────────────────────
   src/hooks/useReveal.ts observes elements to add `is-inview` on scroll entry.
   This stub reports an intersection synchronously on observe(), so revealed
   content settles into its final visible state instead of sitting forever in
   the pre-animation one. */
class IntersectionObserverStub {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: readonly number[] = [];
  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element): void {
    this.callback(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }

  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: IntersectionObserverStub,
});

/* ── scrollTo ────────────────────────────────────────────────
   jsdom's implementation only prints "Not implemented" to stderr. ScrollToTop
   calls it on every route change, so a no-op keeps test output readable. */
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: () => {},
});
