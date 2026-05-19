import { useState } from 'react';

const tasks = [
  { title: 'Review Q2 performance report', done: true, priority: 'High', project: 'Finance' },
  { title: 'Update onboarding documentation', done: false, priority: 'Medium', project: 'Product' },
  { title: 'Schedule team retrospective', done: false, priority: 'Low', project: 'Team' },
  { title: 'Finalize design system tokens', done: false, priority: 'High', project: 'Design' },
  { title: 'Reply to partnership inquiry', done: true, priority: 'Medium', project: 'Business' },
];

const priorityColor: Record<string, string> = { High: '#ef4444', Medium: '#f59e0b', Low: '#22c55e' };

export default function ProductivityPreview() {
  const [checked, setChecked] = useState<number[]>([0, 4]);

  const toggle = (i: number) => setChecked(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f9fafb', color: '#111827', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', background: '#fff', borderRight: '1px solid #e5e7eb', padding: '1.5rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}>
          <div style={{ width: '30px', height: '30px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>⚡</div>
          <span style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '-0.01em' }}>Ora</span>
        </div>
        {/* Spaces */}
        <p style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.75rem' }}>Spaces</p>
        {[['🏠', 'My Tasks', true], ['📁', 'Product', false], ['💡', 'Design', false], ['📊', 'Finance', false], ['👥', 'Team', false]].map(([icon, label, active]) => (
          <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '8px', background: active ? '#f0f0ff' : 'transparent', marginBottom: '2px', cursor: 'pointer' }}>
            <span style={{ fontSize: '14px' }}>{icon as string}</span>
            <span style={{ fontSize: '13px', fontWeight: active ? 600 : 400, color: active ? '#6366f1' : '#374151' }}>{label as string}</span>
          </div>
        ))}
        <div style={{ height: '1px', background: '#e5e7eb', margin: '1rem 0' }} />
        <p style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.75rem' }}>Views</p>
        {[['📋', 'List'], ['📅', 'Calendar'], ['🗂️', 'Board']].map(([icon, label]) => (
          <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', marginBottom: '2px' }}>
            <span style={{ fontSize: '14px' }}>{icon as string}</span>
            <span style={{ fontSize: '13px', color: '#374151' }}>{label as string}</span>
          </div>
        ))}
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.375rem', fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.01em' }}>My Tasks</h1>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Tuesday, May 19 · {tasks.filter((_, i) => !checked.includes(i)).length} tasks remaining</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 14px', fontSize: '13px', color: '#374151', cursor: 'pointer' }}>Filter</button>
            <button style={{ background: '#6366f1', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>+ Add Task</button>
          </div>
        </div>

        {/* Progress */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Today's Progress</span>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>{checked.length}/{tasks.length} done</span>
            </div>
            <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '9999px' }}>
              <div style={{ height: '100%', width: `${(checked.length / tasks.length) * 100}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: '9999px', transition: 'width 0.3s' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexShrink: 0 }}>
            {[['Focus Time', '3h 42m'], ['Streak', '12 days']].map(([l, v]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '15px', fontWeight: 800, color: '#6366f1', margin: '0 0 2px' }}>{v}</p>
                <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Task list */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          {tasks.map((task, i) => (
            <div key={task.title} onClick={() => toggle(i)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem 1.25rem', borderBottom: i < tasks.length - 1 ? '1px solid #f9fafb' : 'none', cursor: 'pointer' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${checked.includes(i) ? '#6366f1' : '#d1d5db'}`, background: checked.includes(i) ? '#6366f1' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                {checked.includes(i) && <svg width="10" height="10" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: checked.includes(i) ? '#9ca3af' : '#111827', textDecoration: checked.includes(i) ? 'line-through' : 'none' }}>{task.title}</p>
              </div>
              <span style={{ fontSize: '11px', color: '#6b7280', background: '#f9fafb', padding: '2px 8px', borderRadius: '9999px' }}>{task.project}</span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: priorityColor[task.priority], background: `${priorityColor[task.priority]}15`, padding: '2px 8px', borderRadius: '9999px' }}>{task.priority}</span>
            </div>
          ))}
        </div>

        {/* Quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1.25rem' }}>
          {[{ label: 'Completed this week', value: '24', icon: '✅' }, { label: 'Overdue', value: '2', icon: '⚠️' }, { label: 'Upcoming (7d)', value: '11', icon: '📅' }].map(card => (
            <div key={card.label} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.25rem', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '1.75rem' }}>{card.icon}</span>
              <div>
                <p style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 2px', letterSpacing: '-0.02em' }}>{card.value}</p>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{card.label}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
