import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import TemplateCard from '../components/ui/TemplateCard';
import { templates, categories } from '../data/templates';
import Container from '../components/ui/Container';

type PriceFilter = 'all' | 'free' | 'paid';
type SortOption  = 'default' | 'price-low' | 'price-high';

export default function TemplatesPage() {
  const [search,         setSearch]         = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceFilter,    setPriceFilter]    = useState<PriceFilter>('all');
  const [sortBy,         setSortBy]         = useState<SortOption>('default');

  const filtered = useMemo(() => {
    let result = [...templates];
    if (activeCategory !== 'all') result = result.filter(t => t.category === activeCategory);
    if (priceFilter === 'free')   result = result.filter(t => t.isFree);
    if (priceFilter === 'paid')   result = result.filter(t => !t.isFree);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q)),
      );
    }
    if (sortBy === 'price-low')  result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    return result;
  }, [search, activeCategory, priceFilter, sortBy]);

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
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                borderRadius: '12px', border: '1px solid #334155',
                background: 'rgba(30,41,59,0.6)',
                paddingLeft: '40px', paddingRight: '16px',
                paddingTop: '10px', paddingBottom: '10px',
                fontSize: '14px', color: '#ffffff',
                outline: 'none',
              }}
            />
          </div>

          {/* Price pills */}
          {(['all', 'free', 'paid'] as PriceFilter[]).map(p => (
            <button
              key={p}
              onClick={() => setPriceFilter(p)}
              style={{
                padding: '10px 18px', borderRadius: '12px',
                fontSize: '14px', fontWeight: 500,
                cursor: 'pointer', textTransform: 'capitalize',
                border: priceFilter === p ? 'none' : '1px solid #334155',
                background: priceFilter === p ? '#38bdf8' : 'rgba(30,41,59,0.6)',
                color: priceFilter === p ? '#020617' : '#94a3b8',
                transition: 'all 0.15s',
              }}
            >
              {p}
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
              <option value="default">Default</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
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
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      width: '100%', textAlign: 'left',
                      padding: '8px 12px', borderRadius: '8px',
                      fontSize: '14px', cursor: 'pointer', border: 'none',
                      background: activeCategory === cat.id ? 'rgba(56,189,248,0.1)' : 'transparent',
                      color: activeCategory === cat.id ? '#38bdf8' : '#94a3b8',
                      fontWeight: activeCategory === cat.id ? 600 : 400,
                      transition: 'all 0.15s',
                    }}
                  >
                    {cat.label}
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
                <p style={{ marginTop: '6px', color: '#64748b' }}>Try adjusting your search or filters.</p>
              </div>
            ) : (
              <>
                <p style={{ fontSize: '13px', color: '#475569', marginBottom: '1.5rem' }}>
                  Showing {filtered.length} template{filtered.length !== 1 ? 's' : ''}
                </p>
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
