/**
 * Invariants of the shipped catalog itself, asserted against the real data.
 *
 * These are the facts the store is sold on: 61 templates, 9 of them free, every
 * paid one actually priced, and every "Live preview" link pointing at a route
 * that exists. Drift here is not a rendering bug — it is a free template being
 * charged for, a paid one being given away, or a dead demo link on a product
 * page. Cheap to keep, and it catches the next person adding template 62.
 *
 * Lives under src/lib with the rest of this owner's suite; the subject is
 * src/data/templates.ts and the route table in src/App.tsx.
 */
// `?raw` gives the route table as text without pulling node:fs into a program
// that is typed for the browser.
import appSource from '../App.tsx?raw';
import { templates } from '../data/templates';

const TOTAL_TEMPLATES = 61;

/** The nine ids that are free. Anything else priced at 0 is a mistake. */
const FREE_IDS = ['2', '6', '14', '19', '23', '28', '45', '51', '59'] as const;

const byId = (a: string, b: string) => Number(a) - Number(b);

describe('the shipped template catalog', () => {
  it('has exactly 61 templates with unique ids', () => {
    expect(templates).toHaveLength(TOTAL_TEMPLATES);
    expect(new Set(templates.map((t) => t.id)).size).toBe(TOTAL_TEMPLATES);
  });

  it('marks exactly the nine known free templates as free', () => {
    const free = templates
      .filter((t) => t.isFree)
      .map((t) => t.id)
      .sort(byId);

    expect(free).toEqual([...FREE_IDS].sort(byId));
  });

  it('prices every free template at 0', () => {
    const mispriced = templates.filter((t) => t.isFree && t.price !== 0).map((t) => t.id);

    expect(mispriced).toEqual([]);
  });

  it('prices every paid template above 0', () => {
    const unpriced = templates.filter((t) => !t.isFree && t.price <= 0).map((t) => t.id);

    expect(unpriced).toEqual([]);
  });

  it('has a /preview/ route in App.tsx for every template demo link', () => {
    const routes = new Set(
      [...appSource.matchAll(/path="(\/preview\/[^"]+)"/g)].map((match) => match[1]),
    );

    const dead = templates.filter((t) => !routes.has(t.demoUrl)).map((t) => `${t.id} ${t.demoUrl}`);

    expect(dead).toEqual([]);
  });
});
