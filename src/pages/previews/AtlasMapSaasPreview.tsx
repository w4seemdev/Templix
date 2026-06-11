/* ============================================================
   ATLAS — Map SaaS Template
   Dark slate app theme (#0b1220 / #0f172a) · cyan accent (#22d3ee)
   Location intelligence: maps, data layers, territory management
   React · TypeScript · Mapbox flavor — CSS-only map mock in hero
   ============================================================ */

import { useState } from 'react';

const CYAN = '#22d3ee';
const BG = '#0b1220';
const PANEL_BG = '#0f172a';
const panel = 'rgba(255,255,255,0.03)';
const border = '1px solid rgba(148,163,184,0.14)';
const mono = "'JetBrains Mono', ui-monospace, 'SF Mono', monospace";

const navLinks = ['Home', 'Map', 'Layers', 'Reports', 'Team', 'Settings'];

const logos = ['Fleetly', 'NorthRoute', 'Cartow', 'Urbanly', 'GridPoint', 'TerraServe'];

type LayerKey = 'pins' | 'territories' | 'heat' | 'routes';

const mapLayers: { key: LayerKey; name: string; meta: string; swatch: string }[] = [
  { key: 'pins', name: 'Store locations', meta: '1,284 points', swatch: '#22d3ee' },
  { key: 'territories', name: 'Sales territories', meta: '3 regions', swatch: '#34d399' },
  { key: 'heat', name: 'Demand heatmap', meta: 'live', swatch: '#f472b6' },
  { key: 'routes', name: 'Delivery routes', meta: '42 active', swatch: '#fbbf24' },
];

const mapPins = [
  { x: '16%', y: '30%' }, { x: '24%', y: '52%' }, { x: '33%', y: '24%' },
  { x: '41%', y: '60%' }, { x: '49%', y: '38%' }, { x: '57%', y: '20%' },
  { x: '63%', y: '54%' }, { x: '72%', y: '32%' }, { x: '81%', y: '62%' },
  { x: '88%', y: '26%' }, { x: '12%', y: '70%' }, { x: '70%', y: '76%' },
];

const territoryShapes = [
  { name: 'West · 8 reps', clip: 'polygon(2% 18%, 36% 6%, 44% 50%, 24% 80%, 2% 64%)', rgb: '34,211,238', labelTop: '40%', labelLeft: '14%' },
  { name: 'Central · 11 reps', clip: 'polygon(46% 10%, 70% 16%, 76% 58%, 52% 72%, 40% 46%)', rgb: '52,211,153', labelTop: '36%', labelLeft: '50%' },
  { name: 'East · 6 reps', clip: 'polygon(74% 12%, 98% 24%, 98% 76%, 72% 68%, 78% 40%)', rgb: '251,191,36', labelTop: '42%', labelLeft: '79%' },
];

const heatSpots = [
  { x: '20%', y: '40%', size: 150 }, { x: '55%', y: '30%', size: 190 }, { x: '78%', y: '58%', size: 160 },
];

const features = [
  { icon: '◈', title: 'Stackable data layers', desc: 'Pile demographics, traffic, weather, and your own CSVs onto one map. Reorder, restyle, and blend layers without writing a line of GL code.' },
  { icon: '⬡', title: 'Territory builder', desc: 'Draw, split, and balance sales territories by revenue, drive time, or headcount. Atlas rebalances boundaries and flags overlaps automatically.' },
  { icon: '◎', title: 'Geofenced alerts', desc: 'Drop a fence around any region and get Slack or webhook pings when assets enter, exit, or dwell too long. Polygon, radius, or isochrone — your call.' },
  { icon: '↗', title: 'Drive-time isochrones', desc: 'See exactly which customers sit within 15, 30, or 45 minutes of every branch. Powered by live traffic, refreshed every five minutes.' },
  { icon: '▦', title: 'Spatial reports', desc: 'Turn map questions into shareable answers: coverage gaps, cannibalization, white space. Export to PDF, CSV, or a live embedded map.' },
  { icon: '⊕', title: 'Team workspaces', desc: 'Per-territory permissions keep field reps in their region while ops sees everything. Comments and pins sync in real time across the whole team.' },
];

const regions: { name: string; stats: { label: string; value: string; delta: string }[] }[] = [
  {
    name: 'West',
    stats: [
      { label: 'Accounts covered', value: '4,218', delta: '+6.2%' },
      { label: 'Coverage of TAM', value: '81%', delta: '+4 pts' },
      { label: 'Pipeline in region', value: '$2.4M', delta: '+12%' },
      { label: 'Avg. drive time', value: '23 min', delta: '−9%' },
    ],
  },
  {
    name: 'Central',
    stats: [
      { label: 'Accounts covered', value: '6,043', delta: '+3.8%' },
      { label: 'Coverage of TAM', value: '74%', delta: '+2 pts' },
      { label: 'Pipeline in region', value: '$3.1M', delta: '+8%' },
      { label: 'Avg. drive time', value: '31 min', delta: '−4%' },
    ],
  },
  {
    name: 'East',
    stats: [
      { label: 'Accounts covered', value: '3,512', delta: '+9.1%' },
      { label: 'Coverage of TAM', value: '88%', delta: '+6 pts' },
      { label: 'Pipeline in region', value: '$1.9M', delta: '+15%' },
      { label: 'Avg. drive time', value: '19 min', delta: '−11%' },
    ],
  },
];

const reportRows = [
  { name: 'Q2 coverage gap analysis', owner: 'Priya N.', updated: '2h ago', status: 'Shared' },
  { name: 'Store cannibalization — Denver metro', owner: 'Marcus T.', updated: 'Yesterday', status: 'Draft' },
  { name: 'Territory rebalance proposal v3', owner: 'Elena V.', updated: '3d ago', status: 'Shared' },
];

const integrations = [
  { glyph: '◐', name: 'Mapbox' }, { glyph: '❄', name: 'Snowflake' }, { glyph: '☁', name: 'Salesforce' },
  { glyph: '⬢', name: 'HubSpot' }, { glyph: '▤', name: 'BigQuery' }, { glyph: '◫', name: 'PostGIS' },
  { glyph: '✦', name: 'Slack' }, { glyph: '⚡', name: 'Zapier' },
];

const plans = [
  { name: 'Starter', price: '$29', period: '/mo per seat', desc: 'For small teams putting their first data on a map.', features: ['5 data layers', '50k geocodes / month', '2 territories', 'CSV import', 'Community support'], cta: 'Start free trial', highlight: false },
  { name: 'Growth', price: '$79', period: '/mo per seat', desc: 'For ops teams managing territories at scale.', features: ['Unlimited data layers', '1M geocodes / month', 'Territory builder & rebalancing', 'Geofenced alerts', 'Drive-time isochrones', 'Priority support'], cta: 'Start free trial', highlight: true },
  { name: 'Enterprise', price: 'Custom', period: 'annual', desc: 'For fleets, franchises, and national coverage.', features: ['Everything in Growth', 'SSO & SCIM', 'Private map tiles', 'Warehouse-native sync', 'Dedicated success engineer', '99.95% uptime SLA'], cta: 'Talk to sales', highlight: false },
];

const testimonials = [
  { quote: 'We replaced a $200k custom GIS build with Atlas in three weeks. Our territory rebalance went from a quarterly spreadsheet war to a 20-minute meeting.', name: 'Priya Natarajan', role: 'VP Revenue Ops, NorthRoute', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80' },
  { quote: 'The drive-time isochrones found 1,400 accounts we thought were out of range. That single layer paid for Atlas before the trial ended.', name: 'Marcus Thielen', role: 'Head of Field Sales, Fleetly', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { quote: 'Our analysts live in Snowflake and our reps live on their phones. Atlas is the first map tool both groups actually open every day.', name: 'Elena Vargas', role: 'Director of Analytics, Urbanly', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
];

const footerCols = [
  { title: 'Product', links: ['Map', 'Layers', 'Territories', 'Reports', 'Alerts'] },
  { title: 'Resources', links: ['Documentation', 'API reference', 'Data catalog', 'Changelog'] },
  { title: 'Company', links: ['About', 'Customers', 'Careers', 'Contact'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'DPA'] },
];

export default function AtlasMapSaasPreview() {
  const [layers, setLayers] = useState<Record<LayerKey, boolean>>({ pins: true, territories: true, heat: false, routes: true });
  const [activeRegion, setActiveRegion] = useState<number>(0);

  const toggleLayer = (key: LayerKey) => setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  const region = regions[activeRegion];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: BG, color: '#e2e8f0', minHeight: '100vh', letterSpacing: '-0.01em' }}>

      {/* ─── STICKY NAV ─── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(11,18,32,0.85)', backdropFilter: 'blur(14px)', borderBottom: border }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" /><circle cx="12" cy="10" r="2.6" /></svg>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.03em' }}>Atlas</span>
          </div>
          <nav style={{ display: 'flex', gap: '1.8rem' }}>
            {navLinks.map(l => (
              <a key={l} href="#" style={{ fontSize: '13.5px', color: '#8b9bb4', textDecoration: 'none' }}>{l}</a>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
            <a href="#" style={{ fontSize: '13.5px', color: '#8b9bb4', textDecoration: 'none' }}>Sign in</a>
            <a href="#" style={{ background: CYAN, color: '#06222b', borderRadius: '8px', padding: '8px 17px', fontSize: '13.5px', fontWeight: 700, textDecoration: 'none' }}>Start mapping</a>
          </div>
        </div>
      </header>

      {/* ─── HERO + MAP MOCK ─── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5.5rem 0 5rem' }}>
        <div style={{ position: 'absolute', top: '-180px', left: '50%', transform: 'translateX(-50%)', width: '920px', height: '520px', background: 'radial-gradient(ellipse, rgba(34,211,238,0.13) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.6rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(34,211,238,0.35)', background: 'rgba(34,211,238,0.08)', borderRadius: '9999px', padding: '6px 15px', fontSize: '12.5px', color: '#67e8f9', fontFamily: mono }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: CYAN, boxShadow: '0 0 10px rgba(34,211,238,0.9)' }} />
              New: warehouse-native territory sync
            </span>
          </div>
          <h1 style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto', fontSize: 'clamp(2.6rem, 5.6vw, 4.2rem)', fontWeight: 850, letterSpacing: '-0.045em', lineHeight: 1.06 }}>
            Every business question has{' '}
            <span style={{ background: 'linear-gradient(120deg, #67e8f9, #22d3ee 55%, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>a where</span>
          </h1>
          <p style={{ textAlign: 'center', maxWidth: '580px', margin: '1.4rem auto 0', fontSize: '1.1rem', color: '#8b9bb4', lineHeight: 1.7 }}>
            Atlas is location intelligence for operators — layer your data onto living maps, carve smarter territories, and ship spatial reports your whole team can read.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.9rem', marginTop: '2.4rem', flexWrap: 'wrap' }}>
            <a href="#" style={{ background: CYAN, color: '#06222b', borderRadius: '10px', padding: '14px 28px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 0 45px rgba(34,211,238,0.3)' }}>Start mapping free</a>
            <a href="#" style={{ border: '1px solid rgba(255,255,255,0.13)', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, color: '#e2e8f0', textDecoration: 'none' }}>Watch 2-min tour →</a>
          </div>

          {/* CSS-only map mock */}
          <div style={{ marginTop: '4rem', borderRadius: '16px', border, background: PANEL_BG, overflow: 'hidden', boxShadow: '0 0 90px rgba(34,211,238,0.08), 0 40px 90px rgba(0,0,0,0.55)' }}>
            {/* Browser bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '11px 15px', borderBottom: border, background: BG }}>
              {['#ff5f57', '#febc2e', '#28c840'].map(c => <div key={c} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c }} />)}
              <div style={{ flex: 1, marginLeft: '12px', maxWidth: '320px', background: '#16213a', borderRadius: '6px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '11px', color: '#5a6b88', fontFamily: mono }}>app.atlas.dev/maps/national-rollout</span>
              </div>
            </div>
            <div style={{ display: 'flex', height: '420px' }}>
              {/* Layers sidebar with toggle switches */}
              <div style={{ width: '232px', flexShrink: 0, borderRight: border, padding: '1rem 0.9rem', background: BG }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5a6b88' }}>Layers</span>
                  <span style={{ fontSize: '11px', color: CYAN, fontFamily: mono }}>+ Add</span>
                </div>
                {mapLayers.map(layer => {
                  const on = layers[layer.key];
                  return (
                    <button key={layer.key} onClick={() => toggleLayer(layer.key)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 10px', borderRadius: '10px', marginBottom: '4px', background: on ? 'rgba(34,211,238,0.06)' : 'transparent', border: on ? '1px solid rgba(34,211,238,0.18)' : '1px solid transparent', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                      <span style={{ width: '9px', height: '9px', borderRadius: '3px', background: layer.swatch, opacity: on ? 1 : 0.3, flexShrink: 0, boxShadow: on ? `0 0 8px ${layer.swatch}` : 'none' }} />
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: on ? '#e2e8f0' : '#5a6b88' }}>{layer.name}</span>
                        <span style={{ display: 'block', fontSize: '10.5px', color: '#5a6b88', fontFamily: mono }}>{layer.meta}</span>
                      </span>
                      <span style={{ width: '32px', height: '18px', borderRadius: '9999px', background: on ? CYAN : 'rgba(148,163,184,0.25)', position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}>
                        <span style={{ position: 'absolute', top: '2px', left: on ? '16px' : '2px', width: '14px', height: '14px', borderRadius: '50%', background: on ? '#06222b' : '#94a3b8', transition: 'left 0.2s' }} />
                      </span>
                    </button>
                  );
                })}
                <div style={{ marginTop: '1rem', borderTop: border, paddingTop: '0.9rem' }}>
                  <div style={{ fontSize: '11px', color: '#5a6b88', marginBottom: '6px', fontFamily: mono }}>Basemap</div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {['Dark', 'Satellite', 'Streets'].map((b, i) => (
                      <span key={b} style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '7px', background: i === 0 ? 'rgba(34,211,238,0.12)' : 'rgba(255,255,255,0.04)', color: i === 0 ? '#67e8f9' : '#5a6b88', fontWeight: 600 }}>{b}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Map canvas */}
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #0d1830, #0a1426 60%, #0b1220)' }}>
                {/* Grid lines */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(56,189,248,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.07) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)', backgroundSize: '12px 12px', pointerEvents: 'none' }} />
                {/* Heatmap blobs */}
                {layers.heat && heatSpots.map((h, i) => (
                  <div key={`heat-${i}`} style={{ position: 'absolute', left: h.x, top: h.y, width: `${h.size}px`, height: `${h.size}px`, transform: 'translate(-50%, -50%)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,114,182,0.35) 0%, rgba(244,114,182,0.12) 45%, transparent 70%)', pointerEvents: 'none' }} />
                ))}
                {/* Territory polygons */}
                {layers.territories && territoryShapes.map(t => (
                  <div key={t.name}>
                    <div style={{ position: 'absolute', inset: '6%', clipPath: t.clip, background: `linear-gradient(150deg, rgba(${t.rgb},0.2), rgba(${t.rgb},0.05))`, pointerEvents: 'none' }} />
                    <span style={{ position: 'absolute', top: t.labelTop, left: t.labelLeft, transform: 'translate(-50%, -50%)', fontSize: '10.5px', fontFamily: mono, fontWeight: 700, color: `rgb(${t.rgb})`, background: 'rgba(11,18,32,0.75)', border: `1px solid rgba(${t.rgb},0.4)`, borderRadius: '6px', padding: '3px 8px', whiteSpace: 'nowrap' }}>{t.name}</span>
                  </div>
                ))}
                {/* Delivery routes */}
                {layers.routes && (
                  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline points="14,68 26,50 40,58 50,36 62,52 74,30 88,60" fill="none" stroke="rgba(251,191,36,0.7)" strokeWidth="0.5" strokeDasharray="2 1.4" />
                    <polyline points="10,28 30,22 48,40 64,18 86,26" fill="none" stroke="rgba(251,191,36,0.45)" strokeWidth="0.4" strokeDasharray="2 1.4" />
                  </svg>
                )}
                {/* Glowing location pins */}
                {layers.pins && mapPins.map((p, i) => (
                  <div key={`pin-${i}`} style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%, -50%)' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(34,211,238,0.14)', border: '1px solid rgba(34,211,238,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: CYAN, border: '1.5px solid #cffafe', boxShadow: '0 0 12px rgba(34,211,238,0.9)' }} />
                    </div>
                  </div>
                ))}
                {/* Search bar */}
                <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(11,18,32,0.85)', border, borderRadius: '9px', padding: '8px 13px', backdropFilter: 'blur(8px)' }}>
                  <span style={{ color: '#5a6b88', fontSize: '13px' }}>⌕</span>
                  <span style={{ fontSize: '12px', color: '#5a6b88', fontFamily: mono }}>Search places, accounts, zips…</span>
                </div>
                {/* Zoom controls */}
                <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', flexDirection: 'column', background: 'rgba(11,18,32,0.85)', border, borderRadius: '9px', overflow: 'hidden', backdropFilter: 'blur(8px)' }}>
                  <span style={{ padding: '7px 12px', fontSize: '14px', color: '#e2e8f0', borderBottom: border, fontWeight: 700 }}>+</span>
                  <span style={{ padding: '7px 12px', fontSize: '14px', color: '#e2e8f0', fontWeight: 700 }}>−</span>
                </div>
                {/* Scale + coords */}
                <div style={{ position: 'absolute', bottom: '12px', left: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '54px', height: '3px', background: 'rgba(148,163,184,0.5)', borderRadius: '2px', display: 'inline-block' }} />
                  <span style={{ fontSize: '10.5px', color: '#5a6b88', fontFamily: mono }}>50 km · 39.74°N 104.99°W</span>
                </div>
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#5a6b88', marginTop: '0.9rem', fontFamily: mono }}>↑ Try toggling the layers — the map is live</p>
        </div>
      </section>

      {/* ─── LOGO CLOUD ─── */}
      <section style={{ borderTop: border, borderBottom: border, padding: '2.6rem 0', background: PANEL_BG }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#5a6b88', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '1.5rem' }}>Mapping operations at 900+ companies</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            {logos.map(l => <span key={l} style={{ fontSize: '16px', fontWeight: 700, color: '#33425e', letterSpacing: '-0.02em' }}>{l}</span>)}
          </div>
        </div>
      </section>

      {/* ─── DATA-LAYER FEATURE GRID ─── */}
      <section style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.6rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: CYAN, fontFamily: mono }}>Data layers</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 1rem' }}>Your data, on a map, in minutes</h2>
            <p style={{ color: '#8b9bb4', fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>Connect a warehouse, drop a CSV, or hit the API. Atlas geocodes, styles, and stacks everything into layers your team can actually reason about.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.2rem' }}>
            {features.map(f => (
              <div key={f.title} style={{ borderRadius: '16px', border, background: panel, padding: '1.9rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '11px', background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px', color: '#67e8f9', marginBottom: '1.2rem' }}>{f.icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 9px', letterSpacing: '-0.02em' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: '#8b9bb4', lineHeight: 1.75, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TERRITORIES & REPORTS ─── */}
      <section style={{ padding: '6rem 0', background: PANEL_BG, borderTop: border, borderBottom: border }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: CYAN, fontFamily: mono }}>Territories & reports</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 1rem' }}>Carve regions like a strategist, report like an analyst</h2>
              <p style={{ color: '#8b9bb4', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1.6rem' }}>
                Balance territories by revenue, accounts, or drive time and watch the numbers update as you drag a boundary. When the map answers the question, one click turns it into a report your CFO can read.
              </p>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '1.4rem' }}>
                {regions.map((r, i) => (
                  <button key={r.name} onClick={() => setActiveRegion(i)} style={{ border: activeRegion === i ? '1px solid rgba(34,211,238,0.5)' : border, background: activeRegion === i ? 'rgba(34,211,238,0.1)' : 'rgba(255,255,255,0.03)', color: activeRegion === i ? '#67e8f9' : '#8b9bb4', borderRadius: '9999px', padding: '8px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{r.name}</button>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px' }}>
                {region.stats.map(s => (
                  <div key={s.label} style={{ borderRadius: '12px', border, background: panel, padding: '15px 16px' }}>
                    <div style={{ fontSize: '11.5px', color: '#5a6b88', marginBottom: '7px' }}>{s.label}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '22px', fontWeight: 800, fontFamily: mono, color: '#e2e8f0', fontVariantNumeric: 'tabular-nums' }}>{s.value}</span>
                      <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#34d399', fontFamily: mono }}>{s.delta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ borderRadius: '16px', border, overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,0.45)' }}>
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" alt="Map and compass on a planning desk" style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block', filter: 'saturate(0.85)' }} />
                <div style={{ background: BG, padding: '1.1rem 1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#8b9bb4' }}>Recent reports — {region.name} region</span>
                    <span style={{ fontSize: '11px', color: CYAN, fontFamily: mono }}>View all →</span>
                  </div>
                  {reportRows.map(r => (
                    <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderTop: border }}>
                      <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.25)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#67e8f9', flexShrink: 0 }}>▦</span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</span>
                        <span style={{ display: 'block', fontSize: '11px', color: '#5a6b88' }}>{r.owner} · {r.updated}</span>
                      </span>
                      <span style={{ fontSize: '10.5px', fontWeight: 700, fontFamily: mono, padding: '3px 9px', borderRadius: '9999px', background: r.status === 'Shared' ? 'rgba(52,211,153,0.12)' : 'rgba(148,163,184,0.12)', color: r.status === 'Shared' ? '#34d399' : '#8b9bb4', flexShrink: 0 }}>{r.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTEGRATIONS STRIP ─── */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: CYAN, fontFamily: mono }}>Integrations</span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 0.9rem' }}>Plays nicely with your stack</h2>
            <p style={{ color: '#8b9bb4', fontSize: '1rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>Built on Mapbox GL, synced to your warehouse, and wired into the tools your team already lives in.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.9rem' }}>
            {integrations.map(it => (
              <div key={it.name} style={{ borderRadius: '13px', border, background: panel, padding: '1.2rem 0.8rem', textAlign: 'center' }}>
                <div style={{ fontSize: '22px', color: '#67e8f9', marginBottom: '8px' }}>{it.glyph}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#aebacf' }}>{it.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section style={{ padding: '6rem 0', background: PANEL_BG, borderTop: border, borderBottom: border }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.6rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: CYAN, fontFamily: mono }}>Pricing</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 1rem' }}>Simple plans, serious maps</h2>
            <p style={{ color: '#8b9bb4', fontSize: '1.05rem', maxWidth: '470px', margin: '0 auto', lineHeight: 1.7 }}>Every plan includes unlimited maps, viewer seats for free, and a 14-day trial of Growth — no credit card required.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.3rem', alignItems: 'start' }}>
            {plans.map(plan => (
              <div key={plan.name} style={{ borderRadius: '18px', border: plan.highlight ? '1px solid rgba(34,211,238,0.5)' : border, background: plan.highlight ? 'rgba(34,211,238,0.06)' : panel, padding: '2rem', position: 'relative', boxShadow: plan.highlight ? '0 0 60px rgba(34,211,238,0.12)' : 'none' }}>
                {plan.highlight && (
                  <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: CYAN, color: '#06222b', borderRadius: '9999px', padding: '4px 15px', fontSize: '11.5px', fontWeight: 800, whiteSpace: 'nowrap' }}>Most popular</div>
                )}
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 5px' }}>{plan.name}</h3>
                <p style={{ fontSize: '13px', color: '#8b9bb4', margin: '0 0 1.4rem' }}>{plan.desc}</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', marginBottom: '1.6rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: mono, letterSpacing: '-0.05em' }}>{plan.price}</span>
                  <span style={{ fontSize: '13.5px', color: '#5a6b88', marginBottom: '8px' }}>{plan.period}</span>
                </div>
                <a href="#" style={{ display: 'block', textAlign: 'center', borderRadius: '10px', padding: '12px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', background: plan.highlight ? CYAN : 'rgba(255,255,255,0.06)', color: plan.highlight ? '#06222b' : '#e2e8f0', marginBottom: '1.7rem' }}>{plan.cta}</a>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#aebacf' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.6rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: CYAN, fontFamily: mono }}>Customers</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 0' }}>Teams that found their where</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.3rem' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ borderRadius: '18px', border, background: panel, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                <div style={{ fontSize: '26px', color: CYAN, lineHeight: 1, fontFamily: 'Georgia, serif' }}>“</div>
                <p style={{ fontSize: '14.5px', color: '#aebacf', lineHeight: 1.8, margin: 0, flex: 1 }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={t.img} alt={t.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(34,211,238,0.4)' }} />
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '12.5px', color: '#5a6b88', margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section style={{ padding: '6rem 0', borderTop: border }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ borderRadius: '24px', border: '1px solid rgba(34,211,238,0.3)', background: 'linear-gradient(140deg, rgba(34,211,238,0.12), rgba(34,211,238,0.03) 60%)', padding: '4.2rem 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px)', backgroundSize: '42px 42px', pointerEvents: 'none' }} />
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0 0 1rem', position: 'relative' }}>Put your business on the map</h2>
            <p style={{ color: '#8b9bb4', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto 2.4rem', lineHeight: 1.7, position: 'relative' }}>
              Upload a spreadsheet and see your first layered map in under five minutes. Free for 14 days — your territories will never look the same.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.9rem', flexWrap: 'wrap', position: 'relative' }}>
              <a href="#" style={{ background: CYAN, color: '#06222b', borderRadius: '10px', padding: '14px 30px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 0 45px rgba(34,211,238,0.3)' }}>Start mapping free</a>
              <a href="#" style={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '14px 30px', fontSize: '15px', fontWeight: 600, color: '#e2e8f0', textDecoration: 'none' }}>Book a demo</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: border, padding: '3.5rem 0 2.5rem', background: PANEL_BG }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '250px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" /><circle cx="12" cy="10" r="2.6" /></svg>
                </div>
                <span style={{ fontSize: '16px', fontWeight: 800 }}>Atlas</span>
              </div>
              <p style={{ fontSize: '13px', color: '#5a6b88', lineHeight: 1.7, margin: 0 }}>Location intelligence for operators. Built with React, TypeScript, and Mapbox GL — and a healthy obsession with hexagons.</p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5a6b88', margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => <li key={l}><a href="#" style={{ fontSize: '13.5px', color: '#46586f', textDecoration: 'none' }}>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: border, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '12.5px', color: '#33425e', margin: 0, fontFamily: mono }}>© 2026 Atlas Geo, Inc. — every question has a where.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Twitter', 'GitHub', 'LinkedIn'].map(s => <a key={s} href="#" style={{ fontSize: '12.5px', color: '#33425e', textDecoration: 'none' }}>{s}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
