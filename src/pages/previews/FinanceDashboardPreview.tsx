const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const spending = [2400, 1800, 3100, 2700, 2200, 2900];
const maxSpend = Math.max(...spending);

const transactions = [
  { name: 'Netflix', category: 'Entertainment', amount: -15.99, icon: '🎬', date: 'Today' },
  { name: 'Whole Foods', category: 'Groceries', amount: -84.20, icon: '🛒', date: 'Yesterday' },
  { name: 'Salary Deposit', category: 'Income', amount: 6800.00, icon: '💼', date: 'May 15' },
  { name: 'Uber', category: 'Transport', amount: -22.40, icon: '🚗', date: 'May 14' },
  { name: 'Spotify', category: 'Entertainment', amount: -9.99, icon: '🎵', date: 'May 13' },
];

export default function FinanceDashboardPreview() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#0f0f14', color: '#f1f5f9', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', background: '#13131a', borderRight: '1px solid #1e1e2e', padding: '1.5rem', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>💰</div>
          <span style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '-0.01em' }}>Finwise</span>
        </div>
        {[['📊', 'Overview', true], ['💳', 'Accounts', false], ['📈', 'Investments', false], ['🎯', 'Goals', false], ['🏷️', 'Budget', false], ['📄', 'Reports', false], ['⚙️', 'Settings', false]].map(([icon, label, active]) => (
          <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '8px', background: active ? 'rgba(34,197,94,0.12)' : 'transparent', cursor: 'pointer' }}>
            <span style={{ fontSize: '15px' }}>{icon as string}</span>
            <span style={{ fontSize: '13px', fontWeight: active ? 600 : 400, color: active ? '#22c55e' : '#94a3b8' }}>{label as string}</span>
          </div>
        ))}
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.375rem', fontWeight: 700, margin: '0 0 2px', letterSpacing: '-0.01em' }}>Good morning, Alex 👋</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Here's your financial overview</p>
          </div>
          <button style={{ background: '#22c55e', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>+ Add Account</button>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Net Worth', value: '$142,840', change: '+$2,340', positive: true, icon: '💎' },
            { label: 'Monthly Income', value: '$8,200', change: '+12%', positive: true, icon: '📥' },
            { label: 'Monthly Spending', value: '$2,900', change: '-8%', positive: true, icon: '💸' },
            { label: 'Savings Rate', value: '35%', change: '+3pp', positive: true, icon: '🎯' },
          ].map(card => (
            <div key={card.label} style={{ background: '#13131a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{card.label}</span>
                <span style={{ fontSize: '18px' }}>{card.icon}</span>
              </div>
              <p style={{ fontSize: '1.375rem', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>{card.value}</p>
              <span style={{ fontSize: '12px', color: card.positive ? '#22c55e' : '#ef4444', fontWeight: 600 }}>{card.change} this month</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
          {/* Spending chart */}
          <div style={{ background: '#13131a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 2px' }}>Monthly Spending</h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Last 6 months</p>
              </div>
              <select style={{ background: '#1e1e2e', border: '1px solid #2e2e3e', borderRadius: '6px', color: '#94a3b8', fontSize: '12px', padding: '4px 8px', outline: 'none' }}>
                <option>6 months</option><option>12 months</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '120px' }}>
              {spending.map((val, i) => (
                <div key={months[i]} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '100%', background: i === 5 ? '#22c55e' : 'rgba(34,197,94,0.25)', borderRadius: '4px 4px 0 0', height: `${(val / maxSpend) * 100}px`, transition: 'height 0.3s' }} />
                  <span style={{ fontSize: '10px', color: '#64748b' }}>{months[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Budget breakdown */}
          <div style={{ background: '#13131a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 1.25rem' }}>Budget Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[['Housing', 1400, 1500, '#6366f1'], ['Food', 520, 600, '#f59e0b'], ['Transport', 210, 250, '#22c55e'], ['Entertainment', 140, 150, '#ec4899']].map(([cat, spent, budget, color]) => (
                <div key={cat as string}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{cat as string}</span>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>${spent as number} / ${budget as number}</span>
                  </div>
                  <div style={{ height: '6px', background: '#1e1e2e', borderRadius: '9999px' }}>
                    <div style={{ height: '100%', width: `${((spent as number) / (budget as number)) * 100}%`, background: color as string, borderRadius: '9999px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div style={{ background: '#13131a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 1.25rem' }}>Recent Transactions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {transactions.map(tx => (
              <div key={tx.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
                <div style={{ width: '36px', height: '36px', background: '#1e1e2e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{tx.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 2px' }}>{tx.name}</p>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{tx.category} · {tx.date}</p>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: tx.amount > 0 ? '#22c55e' : '#f1f5f9' }}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
