import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ArrowUpDown, ChevronDown, SearchX, X } from 'lucide-react';
import TemplateCard from '../components/ui/TemplateCard';
import { templates, categories } from '../data/templates';
import Container from '../components/ui/Container';
import { useSEO } from '../hooks/useSEO';

type PriceFilter = 'all' | 'free' | 'premium';
type SortOption  = 'featured' | 'price-low' | 'price-high' | 'newest';

const priceOptions: ReadonlyArray<{ id: PriceFilter; label: string }> = [
  { id: 'all',     label: 'All'     },
  { id: 'free',    label: 'Free'    },
  { id: 'premium', label: 'Premium' },
];

const idNum = (id: string) => parseInt(id, 10) || 0;

const isValidCategory = (v: string | null): v is string =>
  v !== null && categories.some(c => c.id === v);

const isPriceParam = (v: string | null): v is 'free' | 'premium' =>
  v === 'free' || v === 'premium';

const TNUM = { fontFeatureSettings: '"tnum"' } as const;

export default function TemplatesPage() {
  useSEO({
    title: 'Browse Templates',
    description: 'Browse all Templix website templates — free and premium, filterable by category and price.',
  });

  const [searchParams] = useSearchParams();

  const [search,         setSearch]         = useState('');
  const [activeCategory, setActiveCategory] = useState(() => {
    const c = searchParams.get('category');
    return isValidCategory(c) ? c : 'all';
  });
  const [priceFilter,    setPriceFilter]    = useState<PriceFilter>(() => {
    const f = searchParams.get('filter');
    return isPriceParam(f) ? f : 'all';
  });
  const [sortBy,         setSortBy]         = useState<SortOption>('featured');
  const [searchFocused,  setSearchFocused]  = useState(false);

  // Keep deep links live: /templates?category=saas and /templates?filter=free
  // (HomePage + CategoriesPage link here with query params). State is adjusted
  // during render on param change — no effect, no cascading re-render.
  const [prevParams, setPrevParams] = useState(searchParams);
  if (searchParams !== prevParams) {
    setPrevParams(searchParams);
    const c = searchParams.get('category');
    if (isValidCategory(c)) setActiveCategory(c);
    const f = searchParams.get('filter');
    if (isPriceParam(f)) setPriceFilter(f);
  }

  // Per-category counts, derived from the data so new templates are picked up automatically.
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: templates.length };
    for (const t of templates) counts[t.category] = (counts[t.category] ?? 0) + 1;
    return counts;
  }, []);

  const filtered = useMemo(() => {
    let result = [...templates];
    if (activeCategory !== 'all')  result = result.filter(t => t.category === activeCategory);
    if (priceFilter === 'free')    result = result.filter(t => t.isFree);
    if (priceFilter === 'premium') result = result.filter(t => !t.isFree);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q)),
      );
    }
    // Array.prototype.sort is stable, so ties keep their original data order.
    if (sortBy === 'featured')   result.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    if (sortBy === 'price-low')  result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest')     result.sort((a, b) => idNum(b.id) - idNum(a.id));
    return result;
  }, [search, activeCategory, priceFilter, sortBy]);

  const hasActiveFilters = search.trim() !== '' || activeCategory !== 'all' || priceFilter !== 'all';

  const clearFilters = () => {
    setSearch('');
    setActiveCategory('all');
    setPriceFilter('all');
  };

  return (
    <div className="min-h-screen bg-canvas">
      <Container style={{ paddingTop: 'clamp(48px, 8vw, 80px)', paddingBottom: '96px' }}>

        {/* Page header */}
        <header className="mb-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
            Catalog
          </p>
          <h1 className="headline-fade text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[44px]">
            Browse all templates
          </h1>
          <p className="mt-3 max-w-[52ch] text-[15px] text-text-secondary">
            <span className="font-mono font-medium text-text-primary" style={TNUM}>{templates.length}</span>
            {' '}production-ready templates — free &amp; premium, lifetime updates included.
          </p>
        </header>

        {/* Search / price / sort toolbar */}
        <div className="mb-5 flex flex-wrap items-center gap-3">

          {/* Search */}
          <div className="relative min-w-[220px] flex-1">
            <Search
              size={16}
              className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-150 ${searchFocused ? 'text-accent-hover' : 'text-text-tertiary'}`}
            />
            <input
              type="text"
              placeholder="Search templates, tags, keywords…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="h-11 w-full rounded-lg border bg-surface-2 pl-10 text-[15px] text-text-primary transition-[border-color,box-shadow] duration-150 placeholder:text-text-tertiary"
              style={{
                borderColor: searchFocused ? 'var(--color-border-accent)' : 'var(--color-border-default)',
                boxShadow: searchFocused ? '0 0 0 3px rgba(124,92,252,0.18)' : 'none',
                paddingRight: search ? '40px' : '16px',
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                title="Clear search"
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 grid h-6 w-6 -translate-y-1/2 cursor-pointer place-items-center rounded-md border-0 bg-transparent text-text-tertiary transition-colors duration-150 hover:bg-white/[0.06] hover:text-text-primary"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Price segmented control */}
          <div
            role="group"
            aria-label="Price filter"
            className="flex h-11 items-center gap-1 rounded-lg border border-border-default bg-surface-2 p-1"
          >
            {priceOptions.map(p => (
              <button
                key={p.id}
                type="button"
                aria-pressed={priceFilter === p.id}
                onClick={() => setPriceFilter(p.id)}
                className={`h-full cursor-pointer rounded-md px-4 text-[13px] font-medium transition-colors duration-150 ${
                  priceFilter === p.id
                    ? 'border border-border-strong bg-surface-3 text-text-primary'
                    : 'border border-transparent bg-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative flex h-11 items-center gap-2 rounded-lg border border-border-default bg-surface-2 pl-3.5 transition-colors duration-150 hover:border-border-strong">
            <ArrowUpDown size={14} className="pointer-events-none shrink-0 text-text-tertiary" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              aria-label="Sort templates"
              className="h-full cursor-pointer appearance-none border-0 bg-transparent pr-9 text-[13px] font-medium text-text-secondary"
            >
              <option value="featured">Featured first</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="newest">Newest</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 text-text-tertiary" />
          </div>
        </div>

        {/* Category chips */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              className="chip"
              aria-pressed={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
              <span className="font-mono text-[11px] text-text-tertiary" style={TNUM}>
                {categoryCounts[cat.id] ?? 0}
              </span>
            </button>
          ))}
        </div>

        <div className="hairline mb-6" />

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-border-default px-6 py-24 text-center">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-full border border-accent-soft-border bg-accent-soft">
              <SearchX size={22} className="text-accent-text" />
            </div>
            <h2 className="text-lg font-semibold text-text-primary">No templates found</h2>
            <p className="mt-1.5 max-w-[40ch] text-[15px] text-text-secondary">
              {search.trim()
                ? <>Nothing matches <span className="text-text-primary">“{search.trim()}”</span> with the current filters.</>
                : 'Try adjusting your filters.'}
            </p>
            {hasActiveFilters && (
              <button type="button" onClick={clearFilters} className="btn btn-secondary mt-6">
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between gap-3">
              <p className="text-[13px] text-text-tertiary">
                Showing{' '}
                <span className="font-mono font-medium text-text-secondary" style={TNUM}>{filtered.length}</span>
                {' '}of{' '}
                <span className="font-mono font-medium" style={TNUM}>{templates.length}</span>
                {' '}template{templates.length !== 1 ? 's' : ''}
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="cursor-pointer border-0 bg-transparent p-0 text-[13px] font-medium text-accent-text transition-colors duration-150 hover:text-accent-hover"
                >
                  Clear filters
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 min-[1440px]:grid-cols-4">
              {filtered.map(t => <TemplateCard key={t.id} template={t} />)}
            </div>
          </>
        )}

      </Container>
    </div>
  );
}
