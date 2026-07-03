import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-entrance reveal (Obsidian Gallery motion spec):
 * pair with the `.reveal` / `.reveal-group` recipes in App.css.
 * Adds `is-inview` once, when the element crosses the bottom 20%
 * of the viewport.
 *
 * Usage:
 *   const [headingRef, headingCls] = useReveal<HTMLDivElement>();
 *   <div ref={headingRef} className={`reveal ${headingCls}`}>…</div>
 *
 * Starts visible when IntersectionObserver is unavailable, so content
 * can never be stuck hidden.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === 'undefined',
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      // Fire once the element crosses the bottom 20% of the viewport —
      // height-independent, so tall grids can't stay hidden.
      { rootMargin: '0px 0px -20% 0px', threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView ? 'is-inview' : ''] as const;
}
