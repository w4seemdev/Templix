/**
 * useReveal's whole contract is the class it returns: '' until the element
 * crosses into view, then 'is-inview' — permanently. The class is asserted
 * directly here because it *is* the hook's output, not incidental styling.
 *
 * The global IntersectionObserver stub in src/test/setup.ts intersects
 * synchronously on observe(), which is right for component tests but would make
 * the "before" state unobservable. These tests swap in a controllable one so the
 * transition, the disconnect, and the unmount cleanup can each be checked.
 */
import { act, render, screen } from '../test/utils';
import { useReveal } from './useReveal';

interface ObserverRecord {
  callback: IntersectionObserverCallback;
  observed: Element[];
  disconnected: boolean;
}

const observers: ObserverRecord[] = [];

/* A partial stub, like the one in setup.ts — it carries only the surface
   useReveal touches, so it is cast in rather than declared `implements`. */
class ControllableIntersectionObserver {
  readonly root = null;
  readonly rootMargin: string = '';
  readonly thresholds: readonly number[] = [];
  private readonly record: ObserverRecord;

  constructor(callback: IntersectionObserverCallback) {
    this.record = { callback, observed: [], disconnected: false };
    observers.push(this.record);
  }

  observe(target: Element): void {
    this.record.observed.push(target);
  }

  unobserve(): void {}

  disconnect(): void {
    this.record.disconnected = true;
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

/** Deliver an IntersectionObserver callback the way the browser would. */
function reportIntersection(isIntersecting: boolean) {
  const observer = observers[0];
  act(() => {
    observer.callback(
      observer.observed.map(
        target => ({ isIntersecting, target }) as IntersectionObserverEntry,
      ),
      observer as unknown as IntersectionObserver,
    );
  });
}

function RevealPanel() {
  const [ref, revealClass] = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${revealClass}`}>
      Featured templates
    </div>
  );
}

const panel = () => screen.getByText('Featured templates');

/* Plain assignment, not vi.stubGlobal: setup.ts installs its stub with
   Object.defineProperty and no `configurable`, so the property is writable but
   cannot be redefined. Restored after every test. */
const setupStub = window.IntersectionObserver;

beforeEach(() => {
  observers.length = 0;
  window.IntersectionObserver =
    ControllableIntersectionObserver as unknown as typeof IntersectionObserver;
});

afterEach(() => {
  window.IntersectionObserver = setupStub;
});

describe('useReveal', () => {
  it('observes the element it was attached to and leaves it hidden until then', () => {
    render(<RevealPanel />);

    expect(observers).toHaveLength(1);
    expect(observers[0].observed).toEqual([panel()]);
    expect(panel()).not.toHaveClass('is-inview');
  });

  it('reveals the element once it crosses into view', () => {
    render(<RevealPanel />);

    reportIntersection(true);

    expect(panel()).toHaveClass('is-inview');
  });

  it('leaves the element hidden while the observer reports no intersection', () => {
    render(<RevealPanel />);

    reportIntersection(false);

    expect(panel()).not.toHaveClass('is-inview');
    expect(observers[0].disconnected).toBe(false);
  });

  it('stops observing after the one reveal and never hides the element again', () => {
    render(<RevealPanel />);

    reportIntersection(true);
    expect(observers[0].disconnected).toBe(true);

    // Scrolling back past it must not re-run the entrance animation.
    reportIntersection(false);
    expect(panel()).toHaveClass('is-inview');
  });

  it('disconnects the observer when the element unmounts', () => {
    const { unmount } = render(<RevealPanel />);

    unmount();

    expect(observers[0].disconnected).toBe(true);
  });

  it('starts visible when the browser has no IntersectionObserver', () => {
    window.IntersectionObserver = undefined as unknown as typeof IntersectionObserver;

    render(<RevealPanel />);

    // Content can never be stuck hidden behind an unsupported API.
    expect(panel()).toHaveClass('is-inview');
    expect(observers).toHaveLength(0);
  });
});
