/**
 * ErrorBoundary is the last line between a render crash and a white screen on
 * a storefront people are paying on. It takes no providers, so these render it
 * bare.
 */
import { render, screen } from '../../test/utils';
import ErrorBoundary from './ErrorBoundary';

/** A child that fails during render, the only thing a boundary can catch. */
function Exploding(): never {
  throw new Error('render exploded');
}

/**
 * React re-throws caught errors to console.error, and componentDidCatch logs a
 * second time. Silencing keeps a passing run readable; the spy is restored so
 * a later genuine error still surfaces.
 */
function silenceExpectedErrorLogging() {
  return vi.spyOn(console, 'error').mockImplementation(() => {});
}

describe('ErrorBoundary', () => {
  it('renders its children while nothing throws', () => {
    render(
      <ErrorBoundary>
        <p>Catalog loaded</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Catalog loaded')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('replaces a crashed subtree with a recovery screen', () => {
    const consoleError = silenceExpectedErrorLogging();

    try {
      render(
        <ErrorBoundary>
          <Exploding />
        </ErrorBoundary>,
      );

      expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Reload page' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/');
    } finally {
      consoleError.mockRestore();
    }
  });

  it('announces the failure to assistive technology', () => {
    const consoleError = silenceExpectedErrorLogging();

    try {
      render(
        <ErrorBoundary>
          <Exploding />
        </ErrorBoundary>,
      );

      // role="alert" is an assertive live region: screen readers announce it
      // without the user having to go looking for what changed.
      expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');
    } finally {
      consoleError.mockRestore();
    }
  });

  it('hides the crashed children rather than rendering them alongside the fallback', () => {
    const consoleError = silenceExpectedErrorLogging();

    try {
      render(
        <ErrorBoundary>
          <p>Half-rendered checkout</p>
          <Exploding />
        </ErrorBoundary>,
      );

      expect(screen.queryByText('Half-rendered checkout')).not.toBeInTheDocument();
    } finally {
      consoleError.mockRestore();
    }
  });
});
