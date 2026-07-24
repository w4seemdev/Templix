import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * App-level error boundary. A render error in any single route or preview
 * component shows a themed fallback instead of white-screening the whole
 * marketplace. Recovery is a full reload (React boundaries don't self-reset).
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // No external logging wired up; surface to the console for debugging.
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center text-text-primary">
        <div role="alert" className="w-full max-w-md">
          <p className="font-mono text-sm text-accent-text">Error</p>
          <h1 className="mt-3 text-2xl font-semibold">Something went wrong</h1>
          <p className="mt-3 text-text-secondary">
            An unexpected error interrupted this page. Reloading usually fixes it.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Reload page
            </button>
            <a className="btn btn-secondary" href="/">
              Back to home
            </a>
          </div>
        </div>
      </div>
    );
  }
}
