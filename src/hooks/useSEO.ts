import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
}

const BASE_TITLE = 'Templix';
const BASE_DESC  = 'Browse professionally designed website templates built with React, Next.js, and HTML. Buy once, use forever.';

export function useSEO({ title, description }: SEOProps = {}) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE_TITLE}` : BASE_TITLE;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', description ?? BASE_DESC);
    } else {
      const tag = document.createElement('meta');
      tag.name = 'description';
      tag.content = description ?? BASE_DESC;
      document.head.appendChild(tag);
    }
  }, [title, description]);
}
