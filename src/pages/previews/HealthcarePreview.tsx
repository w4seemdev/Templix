const doctors = [
  { name: 'Dr. Rachel Kim', specialty: 'Cardiologist', exp: '14 yrs', rating: 4.9, img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80', available: 'Today' },
  { name: 'Dr. James Osei', specialty: 'Neurologist', exp: '11 yrs', rating: 4.8, img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80', available: 'Tomorrow' },
  { name: 'Dr. Priya Nair', specialty: 'Pediatrician', exp: '9 yrs', rating: 5.0, img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&q=80', available: 'Today' },
];

const services = ['General Check-up', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Mental Health', 'Nutrition'];

export default function HealthcarePreview() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f0f9ff', color: '#0c1a2e', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e0f2fe', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', background: '#0284c7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>⚕️</div>
          <span style={{ fontSize: '17px', fontWeight: 800, color: '#0c1a2e', letterSpacing: '-0.01em' }}>CarePoint</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Find a Doctor', 'Services', 'Locations', 'Patient Portal', 'Insurance'].map(item => (
            <span key={item} style={{ fontSize: '13px', color: '#475569', cursor: 'pointer', fontWeight: 500 }}>{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ background: 'transparent', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', color: '#0c1a2e', cursor: 'pointer' }}>Patient Login</button>
          <button style={{ background: '#0284c7', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Book Appointment</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0c1a2e 0%, #0369a1 100%)', padding: '5rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%', opacity: 0.15, backgroundImage: 'url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ maxWidth: '700px', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '9999px', padding: '5px 14px', marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>Open 7 days · Same-day appointments available</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.15, margin: '0 0 1rem' }}>
            Your health deserves<br />the best care.
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: '520px' }}>
            Board-certified physicians, cutting-edge diagnostics, and compassionate care under one roof.
          </p>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '1.25rem', display: 'flex', gap: '10px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <select style={{ flex: 1, border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', color: '#475569', outline: 'none' }}>
              <option>Select Specialty</option>
              {services.map(s => <option key={s}>{s}</option>)}
            </select>
            <input type="date" style={{ flex: 1, border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', color: '#0c1a2e', outline: 'none' }} />
            <button style={{ background: '#0284c7', border: 'none', borderRadius: '8px', padding: '10px 24px', fontSize: '14px', fontWeight: 600, color: '#fff', cursor: 'pointer', whiteSpace: 'nowrap' }}>Find Doctor</button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e0f2fe' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1.5rem 2rem', display: 'flex', gap: '4rem', justifyContent: 'center' }}>
          {[['200+', 'Specialist Doctors'], ['50K+', 'Patients Treated'], ['98%', 'Patient Satisfaction'], ['15', 'Specialties']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0284c7', margin: '0 0 2px' }}>{v}</p>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Doctors */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Our Specialists</h2>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Top-rated physicians available for booking</p>
          </div>
          <button style={{ background: 'transparent', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', color: '#0c1a2e', cursor: 'pointer', fontWeight: 500 }}>View all doctors</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {doctors.map(doc => (
            <div key={doc.name} style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img src={doc.img} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>{doc.name}</h3>
                  <span style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 700 }}>⭐ {doc.rating}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#0284c7', fontWeight: 600, margin: '0 0 4px' }}>{doc.specialty}</p>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 1rem' }}>{doc.exp} experience</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: 600 }}>Available: {doc.available}</span>
                  <button style={{ background: '#0284c7', border: 'none', borderRadius: '8px', padding: '7px 16px', fontSize: '12px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
