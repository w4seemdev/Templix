import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import TemplateCard from '../components/ui/TemplateCard';
import { templates, categories } from '../data/templates';
import Container from '../components/ui/Container';

type PriceFilter = 'all' | 'free' | 'premium';
type SortOption  = 'featured' | 'price-low' | 'price-high' | 'newest';

const priceOptions: ReadonlyArray<{ id: PriceFilter; label: string }> = [
  { id: 'all',     label: 'All'     },
  { id: 'free',    label: 'Free'    },
  { id: 'premium', label: 'Premium' },
];

const idNum = (id: string) => parseInt(id, 10) || 0;

export default function TemplatesPage() {
  const [search,         setSearch]         = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceFilter,    setPriceFilter]    = useState<PriceFilter>('all');
  const [sortBy,         setSortBy]         = useState<SortOption>('featured');
  const [searchFocused,  setSearchFocused]  = useState(false);

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
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      <Container style={{ paddingTop: '3.5rem', paddingBottom: '4rem' }}>

        {/* Page header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#38bdf8', marginBottom: '8px' }}>
            Browse
          </p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
            All Templates
          </h1>
          <p style={{ marginTop: '8px', color: '#94a3b8' }}>
            {templates.length} templates — free &amp; premium.
          </p>
        </div>

        {/* Search + filter bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>

          {/* Search input */}
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: searchFocused ? '#38bdf8' : '#475569', transition: 'color 0.15s' }} />
            <input
              type="text"
              placeholder="Search by title, description or tag..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                width: '100%', boxSizing: 'border-box',
                borderRadius: '12px',
                border: `1px solid ${searchFocused ? '#38bdf8' : '#334155'}`,
                background: 'rgba(30,41,59,0.6)',
                paddingLeft: '40px', paddingRight: search ? '40px' : '16px',
                paddingTop: '10px', paddingBottom: '10px',
                fontSize: '14px', color: '#ffffff',
                outline: 'none',
                transition: 'border-color 0.15s',
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                title="Clear search"
                style={{
                  position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                  border: 'none', background: 'transparent', cursor: 'pointer',
                  color: '#64748b', fontSize: '16px', lineHeight: 1, padding: '4px',
                }}
              >
                ×
              </button>
            )}
          </div>

          {/* Price pills */}
          {priceOptions.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPriceFilter(p.id)}
              style={{
                padding: '10px 18px', borderRadius: '12px',
                fontSize: '14px', fontWeight: priceFilter === p.id ? 600 : 500,
                cursor: 'pointer',
                border: priceFilter === p.id ? '1px solid #38bdf8' : '1px solid #334155',
                background: priceFilter === p.id ? '#38bdf8' : 'rgba(30,41,59,0.6)',
                color: priceFilter === p.id ? '#020617' : '#94a3b8',
                transition: 'all 0.15s',
              }}
            >
              {p.label}
            </button>
          ))}

          {/* Sort */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            borderRadius: '12px', border: '1px solid #334155',
            background: 'rgba(30,41,59,0.6)',
            padding: '10px 14px',
          }}>
            <SlidersHorizontal size={16} style={{ color: '#475569', flexShrink: 0 }} />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              style={{ fontSize: '14px', color: '#94a3b8', background: 'transparent', border: 'none', outline: 'none', cursor: 'pointer' }}
            >
              <option value="featured">Featured first</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Sidebar + Grid */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <aside style={{ width: '180px', flexShrink: 0 }}>
            <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', marginBottom: '0.75rem' }}>
              Categories
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {categories.map(cat => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      width: '100%', textAlign: 'left',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px',
                      padding: '8px 12px', borderRadius: '8px',
                      fontSize: '14px', cursor: 'pointer', border: 'none',
                      background: activeCategory === cat.id ? 'rgba(56,189,248,0.1)' : 'transparent',
                      color: activeCategory === cat.id ? '#38bdf8' : '#94a3b8',
                      fontWeight: activeCategory === cat.id ? 600 : 400,
                      transition: 'all 0.15s',
                    }}
                  >
                    <span>{cat.label}</span>
                    <span style={{
                      fontSize: '11px',
                      color: activeCategory === cat.id ? '#38bdf8' : '#475569',
                      fontWeight: 500,
                    }}>
                      {categoryCounts[cat.id] ?? 0}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Grid */}
          <div style={{ flex: 1 }}>
            {filtered.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 0', textAlign: 'center' }}>
                <Search size={40} style={{ color: '#1e293b', marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', margin: 0 }}>No templates found</h3>
                <p style={{ marginTop: '6px', color: '#64748b' }}>
                  {search.trim()
                    ? <>Nothing matches <span style={{ color: '#94a3b8' }}>“{search.trim()}”</span> with the current filters.</>
                    : 'Try adjusting your filters.'}
                </p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    style={{
                      marginTop: '1.25rem', padding: '10px 24px',
                      borderRadius: '9999px',
                      border: '1px solid rgba(56,189,248,0.4)',
                      background: 'rgba(56,189,248,0.1)',
                      color: '#38bdf8', fontSize: '14px', fontWeight: 600,
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.2)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.1)'}
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>
                    Showing {filtered.length} of {templates.length} template{templates.length !== 1 ? 's' : ''}
                  </p>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      style={{
                        border: 'none', background: 'transparent', cursor: 'pointer',
                        fontSize: '13px', fontWeight: 500, color: '#38bdf8', padding: 0,
                      }}
                    >
                      Clear filters
                    </button>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {filtered.map(t => <TemplateCard key={t.id} template={t} />)}
                </div>
              </>
            )}
          </div>

        </div>
      </Container>
    </div>
  );
}
