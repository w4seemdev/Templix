export default function CRMDashboardPreview() {
  const contacts = [
    { name: 'Sarah Johnson', company: 'Acme Corp', status: 'Active', value: '$12,400', avatar: 'SJ', color: '#38bdf8' },
    { name: 'Marcus Lee', company: 'TechStart', status: 'Lead', value: '$8,200', avatar: 'ML', color: '#a78bfa' },
    { name: 'Priya Patel', company: 'GrowthCo', status: 'Active', value: '$21,000', avatar: 'PP', color: '#34d399' },
    { name: 'James Okafor', company: 'Nexus Ltd', status: 'Closed', value: '$5,600', avatar: 'JO', color: '#f59e0b' },
    { name: 'Lena Fischer', company: 'Spark Inc', status: 'Lead', value: '$9,800', avatar: 'LF', color: '#f472b6' },
  ];

  const pipeline = [
    { stage: 'Prospecting', count: 24, value: '$48k', color: '#334155' },
    { stage: 'Qualified', count: 18, value: '$72k', color: '#38bdf8' },
    { stage: 'Proposal', count: 11, value: '$95k', color: '#a78bfa' },
    { stage: 'Negotiation', count: 6, value: '$61k', color: '#f59e0b' },
    { stage: 'Closed Won', count: 4, value: '$44k', color: '#34d399' },
  ];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#0a0f1e', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', background: '#060c1a', borderRight: '1px solid #1e293b', padding: '1.5rem 0', flexShrink: 0 }}>
        <div style={{ padding: '0 1.25rem 1.5rem', borderBottom: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '30px', height: '30px', background: '#6366f1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" fill="#fff" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>Relate CRM</span>
          </div>
        </div>
        <nav style={{ padding: '1rem 0.75rem' }}>
          {[
            { icon: '▦', label: 'Dashboard', active: true },
            { icon: '👥', label: 'Contacts' },
            { icon: '💼', label: 'Deals' },
            { icon: '📊', label: 'Pipeline' },
            { icon: '📧', label: 'Emails' },
            { icon: '📅', label: 'Calendar' },
            { icon: '📋', label: 'Tasks' },
            { icon: '⚙️', label: 'Settings' },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '9px 12px', borderRadius: '8px', marginBottom: '2px',
              background: item.active ? 'rgba(99,102,241,0.15)' : 'transparent',
              cursor: 'pointer',
            }}>
              <span style={{ fontSize: '14px' }}>{item.icon}</span>
              <span style={{ fontSize: '13px', color: item.active ? '#818cf8' : '#475569', fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Header */}
        <header style={{ padding: '1.25rem 2rem', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#060c1a' }}>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>Dashboard</h1>
            <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>Monday, May 19 2026</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button style={{ background: '#6366f1', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>+ Add Deal</button>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#fff' }}>AK</div>
          </div>
        </header>

        <div style={{ padding: '2rem' }}>
          {/* KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { label: 'Total Revenue', value: '$284,500', change: '+18%', up: true },
              { label: 'Active Deals', value: '63', change: '+7', up: true },
              { label: 'New Contacts', value: '142', change: '+23%', up: true },
              { label: 'Avg Deal Size', value: '$4,516', change: '-3%', up: false },
            ].map(kpi => (
              <div key={kpi.label} style={{ borderRadius: '14px', border: '1px solid #1e293b', background: '#0f172a', padding: '1.25rem' }}>
                <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{kpi.label}</p>
                <p style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>{kpi.value}</p>
                <span style={{ fontSize: '12px', color: kpi.up ? '#34d399' : '#f87171', fontWeight: 600 }}>{kpi.change} vs last month</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            {/* Pipeline */}
            <div style={{ borderRadius: '14px', border: '1px solid #1e293b', background: '#0f172a', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: '0 0 1.25rem' }}>Sales Pipeline</h3>
              {pipeline.map(stage => (
                <div key={stage.stage} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>{stage.stage}</span>
                    <span style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>{stage.value} · {stage.count} deals</span>
                  </div>
                  <div style={{ height: '6px', background: '#1e293b', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(stage.count / 24) * 100}%`, background: stage.color, borderRadius: '9999px' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Activity */}
            <div style={{ borderRadius: '14px', border: '1px solid #1e293b', background: '#0f172a', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: '0 0 1.25rem' }}>Recent Activity</h3>
              {[
                { text: 'Sarah closed deal with Acme Corp', time: '2m ago', color: '#34d399' },
                { text: 'New lead: TechStart inquiry received', time: '18m ago', color: '#38bdf8' },
                { text: 'Marcus moved to Negotiation stage', time: '1h ago', color: '#a78bfa' },
                { text: 'Follow-up email sent to GrowthCo', time: '3h ago', color: '#f59e0b' },
                { text: 'New contact added: Lena Fischer', time: '5h ago', color: '#38bdf8' },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '1rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: a.color, flexShrink: 0, marginTop: '4px' }} />
                  <div>
                    <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>{a.text}</p>
                    <p style={{ fontSize: '11px', color: '#334155', margin: '2px 0 0' }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contacts table */}
          <div style={{ borderRadius: '14px', border: '1px solid #1e293b', background: '#0f172a', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: 0 }}>Top Contacts</h3>
              <button style={{ fontSize: '13px', color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer' }}>View all</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Contact', 'Company', 'Status', 'Deal Value'].map(h => (
                    <th key={h} style={{ fontSize: '11px', color: '#475569', textAlign: 'left', paddingBottom: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map(c => (
                  <tr key={c.name} style={{ borderTop: '1px solid #1e293b' }}>
                    <td style={{ padding: '12px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: c.color + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: c.color }}>{c.avatar}</div>
                      <span style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>{c.name}</span>
                    </td>
                    <td style={{ fontSize: '13px', color: '#64748b', padding: '12px 0' }}>{c.company}</td>
                    <td style={{ padding: '12px 0' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '9999px', background: c.status === 'Active' ? 'rgba(52,211,153,0.1)' : c.status === 'Lead' ? 'rgba(56,189,248,0.1)' : 'rgba(100,116,139,0.1)', color: c.status === 'Active' ? '#34d399' : c.status === 'Lead' ? '#38bdf8' : '#64748b' }}>{c.status}</span>
                    </td>
                    <td style={{ fontSize: '13px', color: '#fff', fontWeight: 600, padding: '12px 0' }}>{c.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
