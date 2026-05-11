/* ============================================================
   DASHIFY — Admin Dashboard Template
   Dark with teal accent — full analytics dashboard UI
   ============================================================ */

export default function DashifyPreview() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#0a0f1a', color: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DashNav />
      <div style={{ display: 'flex', flex: 1 }}>
        <DashSidebar />
        <DashMain />
      </div>
    </div>
  );
}

function DashNav() {
  return (
    <header style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0a0f1a', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', flexShrink: 0, zIndex: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '28px', height: '28px', background: '#14b8a6', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        </div>
        <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '-0.02em' }}>Dashify</span>
      </div>
      <div style={{ flex: 1, maxWidth: '400px', margin: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '7px 12px' }}>
          <svg width="14" height="14" fill="none" stroke="#475569" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{ fontSize: '13px', color: '#475569' }}>Search anything...</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ position: 'relative' }}>
          <svg width="18" height="18" fill="none" stroke="#64748b" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', background: '#14b8a6', borderRadius: '50%' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #14b8a6, #0891b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>JD</div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>John Doe</span>
        </div>
      </div>
    </header>
  );
}

function DashSidebar() {
  const sections = [
    { label: 'Main', items: [
      { icon: '▦', label: 'Overview', active: true },
      { icon: '📊', label: 'Analytics' },
      { icon: '💰', label: 'Revenue' },
      { icon: '👥', label: 'Customers' },
    ]},
    { label: 'Manage', items: [
      { icon: '📦', label: 'Products' },
      { icon: '📋', label: 'Orders' },
      { icon: '🏷️', label: 'Discounts' },
    ]},
    { label: 'System', items: [
      { icon: '⚙️', label: 'Settings' },
      { icon: '🔒', label: 'Security' },
    ]},
  ];
  return (
    <aside style={{ width: '220px', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem 1rem', flexShrink: 0, background: '#0a0f1a' }}>
      {sections.map(sec => (
        <div key={sec.label} style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#334155', marginBottom: '6px', padding: '0 10px' }}>{sec.label}</p>
          {sec.items.map(item => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '8px 10px', borderRadius: '8px', marginBottom: '2px',
              background: item.active ? 'rgba(20,184,166,0.12)' : 'transparent',
              color: item.active ? '#14b8a6' : '#475569', fontSize: '13px', cursor: 'pointer',
            }}>
              <span style={{ fontSize: '14px' }}>{item.icon}</span>
              <span style={{ fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
              {item.active && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#14b8a6', marginLeft: 'auto' }} />}
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
}

function DashMain() {
  const kpis = [
    { label: 'Total Revenue', value: '$84,320', change: '+12.5%', up: true, color: '#14b8a6' },
    { label: 'Active Users', value: '12,843', change: '+8.2%', up: true, color: '#3b82f6' },
    { label: 'New Orders', value: '1,284', change: '+5.1%', up: true, color: '#8b5cf6' },
    { label: 'Churn Rate', value: '2.4%', change: '-0.3%', up: false, color: '#f97316' },
  ];

  const recentOrders = [
    { id: '#4821', customer: 'Alice Johnson', product: 'Pro Plan', amount: '$99', status: 'Paid', statusColor: '#14b8a6' },
    { id: '#4820', customer: 'Marcus Webb', product: 'Starter Plan', amount: '$29', status: 'Pending', statusColor: '#f59e0b' },
    { id: '#4819', customer: 'Sofia Reyes', product: 'Enterprise', amount: '$499', status: 'Paid', statusColor: '#14b8a6' },
    { id: '#4818', customer: 'James Liu', product: 'Pro Plan', amount: '$99', status: 'Refunded', statusColor: '#ef4444' },
    { id: '#4817', customer: 'Yuki Tanaka', product: 'Pro Plan', amount: '$99', status: 'Paid', statusColor: '#14b8a6' },
  ];

  const chartBars = [42, 58, 47, 72, 61, 88, 73, 95, 68, 84, 77, 91];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <main style={{ flex: 1, padding: '1.75rem', overflow: 'auto' }}>
      {/* Page header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 4px' }}>Overview</h1>
          <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>Monday, June 10, 2024</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <select style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '7px 12px', fontSize: '13px', color: '#94a3b8', cursor: 'pointer' }}>
            <option>Last 30 days</option>
          </select>
          <button style={{ background: '#14b8a6', border: 'none', borderRadius: '8px', padding: '7px 16px', fontSize: '13px', fontWeight: 600, color: '#ffffff', cursor: 'pointer' }}>
            Export
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {kpis.map(kpi => (
          <div key={kpi.label} style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>{kpi.label}</span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: kpi.up ? '#14b8a6' : '#ef4444', background: kpi.up ? 'rgba(20,184,166,0.1)' : 'rgba(239,68,68,0.1)', borderRadius: '9999px', padding: '2px 7px' }}>{kpi.change}</span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em' }}>{kpi.value}</div>
            <div style={{ marginTop: '10px', height: '3px', borderRadius: '9999px', background: 'rgba(255,255,255,0.06)' }}>
              <div style={{ width: '70%', height: '100%', borderRadius: '9999px', background: kpi.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Top products */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {/* Revenue chart */}
        <div style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>Revenue over time</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['Weekly', 'Monthly', 'Yearly'].map((t, i) => (
                <button key={t} style={{ background: i === 1 ? '#14b8a6' : 'transparent', border: i === 1 ? 'none' : '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontWeight: 500, color: i === 1 ? '#ffffff' : '#475569', cursor: 'pointer' }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
            {chartBars.map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '4px 4px 0 0', background: i === 7 ? '#14b8a6' : 'rgba(20,184,166,0.2)' }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            {months.map(m => <span key={m} style={{ flex: 1, textAlign: 'center', fontSize: '10px', color: '#334155' }}>{m}</span>)}
          </div>
        </div>

        {/* Top products */}
        <div style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 1.25rem' }}>Top plans</h3>
          {[
            { name: 'Enterprise', rev: '$42,000', pct: 50 },
            { name: 'Pro Plan', rev: '$28,000', pct: 33 },
            { name: 'Starter', rev: '$14,320', pct: 17 },
          ].map(p => (
            <div key={p.name} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>{p.name}</span>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{p.rev}</span>
              </div>
              <div style={{ height: '6px', borderRadius: '9999px', background: 'rgba(255,255,255,0.06)' }}>
                <div style={{ width: `${p.pct}%`, height: '100%', borderRadius: '9999px', background: 'linear-gradient(90deg, #14b8a6, #0891b2)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent orders */}
      <div style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>Recent orders</h3>
          <a href="#" style={{ fontSize: '12px', color: '#14b8a6', textDecoration: 'none' }}>View all →</a>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Order ID', 'Customer', 'Product', 'Amount', 'Status'].map(h => (
                <th key={h} style={{ textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, i) => (
              <tr key={order.id}>
                {[order.id, order.customer, order.product, order.amount].map((cell, j) => (
                  <td key={j} style={{ fontSize: '13px', color: j === 0 ? '#94a3b8' : '#ffffff', padding: '12px 0', borderBottom: i < recentOrders.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', paddingRight: '1rem' }}>{cell}</td>
                ))}
                <td style={{ padding: '12px 0', borderBottom: i < recentOrders.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, background: `${order.statusColor}20`, color: order.statusColor, borderRadius: '9999px', padding: '3px 10px' }}>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
