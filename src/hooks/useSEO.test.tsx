/**
 * useSEO owns every per-route SEO signal. The bug it exists to prevent is a
 * catalog of 61 product pages all declaring the homepage as their canonical -
 * which is what index.html alone gives you, since it only ships the defaults
 * for "/". So the assertions here are mostly about the canonical: that it is
 * created when missing, rewritten (never duplicated) when index.html shipped
 * one, and that it follows a client-side navigation.
 *
 * MemoryRouter is used directly rather than renderWithProviders: useSEO reads
 * the router and nothing else, and AuthProvider would pull the real Supabase
 * client into a test that has no business loading it.
 */
import { MemoryRouter, Route, Routes, Link } from 'react-router-dom';
import { render, screen, userEvent } from '../test/utils';
import { useSEO } from './useSEO';

const SITE = 'https://templix-peach.vercel.app';

function Seo({ title, description }: { title?: string; description?: string }) {
  useSEO({ title, description });
  return null;
}

const canonicalHref = () =>
  document.head.querySelector('link[rel="canonical"]')?.getAttribute('href');

const metaContent = (attr: 'name' | 'property', key: string) =>
  document.head.querySelector(`meta[${attr}="${key}"]`)?.getAttribute('content');

/** Renders the hook as the page at `route` would. */
function renderAt(route: string, props: { title?: string; description?: string } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Seo {...props} />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  // Start from a bare document; each test seeds whatever index.html would ship.
  document.head.innerHTML = '';
  document.title = '';
});

describe('useSEO', () => {
  it('titles the page after the route and keeps the brand suffix', () => {
    renderAt('/templates/5', { title: 'Nebula' });

    expect(document.title).toBe('Nebula - Templix');
  });

  it('falls back to the site title and description when a route supplies neither', () => {
    renderAt('/');

    expect(document.title).toBe('Templix - Website Templates for Developers');
    expect(metaContent('name', 'description')).toContain('Buy once, use forever.');
  });

  it('creates the canonical link when index.html did not ship one', () => {
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();

    renderAt('/templates', { title: 'All templates' });

    expect(canonicalHref()).toBe(`${SITE}/templates`);
  });

  it('rewrites the homepage canonical index.html ships instead of adding a second one', () => {
    const shipped = document.createElement('link');
    shipped.rel = 'canonical';
    shipped.href = `${SITE}/`;
    document.head.appendChild(shipped);

    renderAt('/templates/5', { title: 'Nebula' });

    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(canonicalHref()).toBe(`${SITE}/templates/5`);
  });

  it('updates the description tag index.html ships rather than duplicating it', () => {
    const shipped = document.createElement('meta');
    shipped.setAttribute('name', 'description');
    shipped.setAttribute('content', 'Homepage description.');
    document.head.appendChild(shipped);

    renderAt('/templates/5', { title: 'Nebula', description: 'A dark SaaS landing page.' });

    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(metaContent('name', 'description')).toBe('A dark SaaS landing page.');
  });

  it('mirrors the title and description into the Open Graph and Twitter tags', () => {
    renderAt('/templates/5', { title: 'Nebula', description: 'A dark SaaS landing page.' });

    expect(metaContent('property', 'og:title')).toBe('Nebula - Templix');
    expect(metaContent('property', 'og:description')).toBe('A dark SaaS landing page.');
    expect(metaContent('property', 'og:url')).toBe(`${SITE}/templates/5`);
    expect(metaContent('name', 'twitter:title')).toBe('Nebula - Templix');
    expect(metaContent('name', 'twitter:description')).toBe('A dark SaaS landing page.');
  });

  it('moves the canonical and og:url onto the new route after a navigation', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Seo />
                <Link to="/templates/5?ref=home">Nebula</Link>
              </>
            }
          />
          <Route path="/templates/5" element={<Seo title="Nebula" />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(canonicalHref()).toBe(`${SITE}/`);

    await userEvent.click(screen.getByRole('link', { name: 'Nebula' }));

    expect(canonicalHref()).toBe(`${SITE}/templates/5`);
    expect(metaContent('property', 'og:url')).toBe(`${SITE}/templates/5`);
    expect(document.title).toBe('Nebula - Templix');
  });

  it('keeps the query string out of the canonical', () => {
    renderAt('/templates?category=saas&page=2', { title: 'All templates' });

    expect(canonicalHref()).toBe(`${SITE}/templates`);
    expect(metaContent('property', 'og:url')).toBe(`${SITE}/templates`);
  });

  it('drops a trailing slash from the canonical', () => {
    renderAt('/templates/', { title: 'All templates' });

    expect(canonicalHref()).toBe(`${SITE}/templates`);
  });

  it('keeps the single slash of the root canonical', () => {
    renderAt('/');

    expect(canonicalHref()).toBe(`${SITE}/`);
  });
});
