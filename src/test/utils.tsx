/**
 * Shared render helper for component tests.
 *
 * Mirrors the provider stack App.tsx mounts (router + AuthProvider), with
 * MemoryRouter standing in for BrowserRouter so no test touches window.history.
 *
 *   import { renderWithProviders, screen, userEvent } from '../test/utils';
 *
 *   it('shows the wishlist badge', async () => {
 *     renderWithProviders(<Navbar />, { route: '/templates' });
 *     expect(screen.getByRole('navigation')).toBeInTheDocument();
 *   });
 *
 * Everything React Testing Library exports (screen, waitFor, within, fireEvent,
 * the raw render, …) is re-exported from here, plus `userEvent`, so a test file
 * needs a single import. Use plain `render` when a component must be mounted
 * without any provider.
 */
import type { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

export interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  /** URL the MemoryRouter starts on. Defaults to '/'. */
  route?: string;
}

export function renderWithProviders(
  ui: ReactElement,
  options: RenderWithProvidersOptions = {},
): RenderResult {
  const { route = '/', ...renderOptions } = options;

  function Providers({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={[route]}>
        <AuthProvider>{children}</AuthProvider>
      </MemoryRouter>
    );
  }

  return render(ui, { wrapper: Providers, ...renderOptions });
}

// eslint-disable-next-line react-refresh/only-export-components -- test-only module, never in the Fast Refresh graph
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
