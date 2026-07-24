import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
}

/* Single source of truth for absolute URLs. When a custom domain lands, change this
   together with public/robots.txt, public/sitemap.xml and index.html in one commit. */
const SITE_URL      = 'https://templix-peach.vercel.app';
const BASE_TITLE    = 'Templix';
const DEFAULT_TITLE = 'Templix — Website Templates for Developers';
const BASE_DESC     = 'Browse professionally designed, fully responsive website templates built with React, TypeScript, and Vite. Buy once, use forever.';

/** Sets a meta tag's content, creating the tag if index.html does not ship it. */
function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/** Points <link rel="canonical"> at the current route, creating it if missing. */
function setCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
}

/**
 * Owns every per-route SEO signal. index.html only carries the pre-hydration
 * defaults for "/", so without this the whole catalog would declare the homepage
 * as its canonical and share the homepage's title, description and og:url.
 */
export function useSEO({ title, description }: SEOProps = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} — ${BASE_TITLE}` : DEFAULT_TITLE;
    const desc      = description ?? BASE_DESC;
    // Canonicals carry no query string and no trailing slash (except the root).
    const path      = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
    const url       = `${SITE_URL}${path}`;

    document.title = fullTitle;
    setCanonical(url);

    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);
  }, [title, description, pathname]);
}
