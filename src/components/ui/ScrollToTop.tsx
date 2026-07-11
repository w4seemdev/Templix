import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll to the top on every route change (BrowserRouter otherwise
 * preserves scroll position across pushState navigations) and moves focus to
 * the <main> landmark so keyboard/screen-reader users are told navigation
 * happened. Renders nothing.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // 'instant' overrides the global `html { scroll-behavior: smooth }`.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

    // Skip the initial mount so we don't steal focus from the landing page.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
