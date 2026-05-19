const campaigns = [
  { name: 'Spring Launch 2025', status: 'Sent', opens: '42%', clicks: '8.3%', sent: '12,400', date: 'May 12' },
  { name: 'Weekly Newsletter #48', status: 'Sent', opens: '38%', clicks: '6.1%', sent: '9,800', date: 'May 10' },
  { name: 'Re-engagement Drip', status: 'Active', opens: '29%', clicks: '4.7%', sent: '3,200', date: 'May 8' },
  { name: 'Product Update — v2.4', status: 'Draft', opens: '—', clicks: '—', sent: '—', date: 'Scheduled' },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const openRates = [34, 38, 31, 40, 42, 45];

export default function EmailMarketingPreview() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#0c0c14', color: '#f1f5f9', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', background: '#10101a', borderRight: '1px solid #1e1e2e', padding: '1.5rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}>
          <div style={{ width: '30px', height: '30px', background: 'linear-gradient(135deg, #f97316, #ef4444)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>✉️</div>
          <span style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '-0.01em' }}>Spark</span>
        </div>
        {[['📊', 'Dashboard', true], ['📧', 'Campaigns', false], ['👥', 'Audience', false], ['🤖', 'Automations', false], ['📝', 'Templates', false], ['📈', 'Analytics', false], ['⚙️', 'Settings', false]].map(([icon, label, active]) => (
          <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '8px', background: active ? 'rgba(249,115,22,0.12)' : 'transparent', cursor: 'pointer', marginBottom: '2px' }}>
            <span style={{ fontSize: '14px' }}>{icon as string}</span>
            <span style={{ fontSize: '13px', fontWeight: active ? 600 : 400, color: active ? '#f97316' : '#64748b' }}>{label as string}</span>
          </div>
        ))}
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.375rem', fontWeight: 700, margin: '0 0 2px' }}>Overview</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>May 2025 · All Lists</p>
          </div>
          <button style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>+ New Campaign</button>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Subscribers', value: '24,812', change: '+482 this month', icon: '👥', positive: true },
            { label: 'Avg Open Rate', value: '41.2%', change: '+2.8% vs last month', icon: '📬', positive: true },
            { label: 'Avg Click Rate', value: '7.4%', change: '-0.3% vs last month', icon: '🖱️', positive: false },
            { label: 'Campaigns Sent', value: '18', change: 'This month', icon: '🚀', positive: true },
          ].map(card => (
            <div key={card.label} style={{ background: '#16162a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{card.label}</span>
                <span style={{ fontSize: '18px' }}>{card.icon}</span>
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>{card.value}</p>
              <span style={{ fontSize: '11px', color: card.positive ? '#22c55e' : '#ef4444', fontWeight: 600 }}>{card.change}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
          {/* Open rate chart */}
          <div style={{ background: '#16162a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 1.5rem' }}>Open Rate Trend</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '100px' }}>
              {openRates.map((rate, i) => (
                <div key={months[i]} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '10px', color: i === 5 ? '#f97316' : '#64748b', fontWeight: i === 5 ? 700 : 400 }}>{rate}%</span>
                  <div style={{ width: '100%', background: i === 5 ? '#f97316' : 'rgba(249,115,22,0.2)', borderRadius: '4px 4px 0 0', height: `${rate * 2}px` }} />
                  <span style={{ fontSize: '10px', color: '#64748b' }}>{months[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Audience breakdown */}
          <div style={{ background: '#16162a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 1.25rem' }}>Audience Segments</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[['Active Subscribers', 18400, '#f97316'], ['Inactive (90d)', 4200, '#64748b'], ['Unsubscribed', 2212, '#ef4444']].map(([label, count, color]) => (
                <div key={label as string}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{label as string}</span>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{(count as number).toLocaleString()}</span>
                  </div>
                  <div style={{ height: '5px', background: '#1e1e2e', borderRadius: '9999px' }}>
                    <div style={{ height: '100%', width: `${((count as number) / 24812) * 100}%`, background: color as string, borderRadius: '9999px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Campaigns table */}
        <div style={{ background: '#16162a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>Recent Campaigns</h3>
            <span style={{ fontSize: '13px', color: '#f97316', cursor: 'pointer' }}>View all →</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e1e2e' }}>
                {['Campaign', 'Status', 'Opens', 'Clicks', 'Sent', 'Date'].map(h => (
                  <th key={h} style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textAlign: 'left', padding: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map(c => (
                <tr key={c.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }}>
                  <td style={{ padding: '12px 0', fontSize: '13px', fontWeight: 600 }}>{c.name}</td>
                  <td style={{ padding: '12px 0' }}><span style={{ fontSize: '11px', fontWeight: 600, color: c.status === 'Sent' ? '#22c55e' : c.status === 'Active' ? '#3b82f6' : '#f59e0b', background: c.status === 'Sent' ? 'rgba(34,197,94,0.1)' : c.status === 'Active' ? 'rgba(59,130,246,0.1)' : 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: '9999px' }}>{c.status}</span></td>
                  <td style={{ padding: '12px 0', fontSize: '13px', color: '#94a3b8' }}>{c.opens}</td>
                  <td style={{ padding: '12px 0', fontSize: '13px', color: '#94a3b8' }}>{c.clicks}</td>
                  <td style={{ padding: '12px 0', fontSize: '13px', color: '#94a3b8' }}>{c.sent}</td>
                  <td style={{ padding: '12px 0', fontSize: '13px', color: '#64748b' }}>{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
