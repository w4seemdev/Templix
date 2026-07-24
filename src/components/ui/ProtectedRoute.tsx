import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, authUnavailable } = useAuth();

  // The auth module never loaded, so we cannot tell whether this visitor is
  // signed in. Bouncing to /login would be a dead end — that page imports the
  // same module — so surface the failure with a reload affordance instead.
  if (authUnavailable) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
        <div role="alert" className="max-w-[420px] text-center">
          <h1 className="mb-2 text-xl font-semibold tracking-[-0.015em] text-text-primary">
            Couldn’t load your account
          </h1>
          <p className="mb-6 text-[13px] text-text-tertiary">
            We couldn’t reach the sign-in service. This usually clears up after a reload.
          </p>
          <button type="button" onClick={() => window.location.reload()} className="btn btn-primary h-11 px-6">
            Reload page
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas" role="status" aria-label="Loading">
        <div
          aria-hidden="true"
          style={{
            width: '32px',
            height: '32px',
            border: '3px solid var(--color-surface-3)',
            borderTopColor: 'var(--color-accent)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
