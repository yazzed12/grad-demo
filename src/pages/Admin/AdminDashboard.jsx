import React from 'react';
import { Users, Activity, DollarSign, Calendar, TrendingUp, UserCheck } from 'lucide-react';
import Layout from '../../components/Layout';
import { useData } from '../../context/DataContext';

export default function AdminDashboard() {
  const { patients, doctors, appointments, stats: staticStats } = useData();

  const stats = [
    { label: 'Total Patients', value: patients.length, icon: Users, color: 'primary', trend: '+12%' },
    { label: 'Staff Members', value: doctors.length, icon: UserCheck, color: 'teal', trend: '+2%' },
    { label: 'Revenue (Monthly)', value: staticStats.revenue.value, icon: DollarSign, color: 'success', trend: '+8%' },
    { label: 'Appointments', value: appointments.length, icon: Calendar, color: 'purple', trend: '+15%' }
  ];

  return (
    <Layout pageTitle="Admin Dashboard" pageSubtitle="Platform overview and analytics">
      <div className="animate-fadeIn">

      <div className="grid-4 stagger" style={{ marginBottom: 'var(--sp-xl)' }}>
        {stats.map((stat, i) => (
          <div key={i} className={`stat-card ${stat.color}`}>
            <div className="stat-icon" style={{ background: `var(--clr-surface-2)`, color: `var(--clr-${stat.color})` }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-change up">{stat.trend} this month</div>
          </div>
        ))}
      </div>

      <div className="grid-2 gap-xl">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--sp-md)' }}>
            <h3 style={{ fontSize: '1.2rem' }}>Revenue Overview</h3>
            <div className="badge badge-primary">AI Insight: Peak booking at 10 AM</div>
          </div>
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--clr-border)', borderRadius: 'var(--r-md)' }}>
            <span style={{ color: 'var(--clr-text-muted)' }}>[Chart Placeholder]</span>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--sp-md)' }}>
            <h3 style={{ fontSize: '1.2rem' }}>Staff Directory Activity</h3>
            <button className="btn btn-sm btn-primary">Add Staff</button>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {doctors.slice(0, 3).map((doc, i) => (
                  <tr key={doc.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar" style={{ width: 28, height: 28, fontSize: '0.7rem', background: doc.color, color: '#fff' }}>{doc.avatar}</div>
                        <span style={{ fontWeight: 600 }}>{doc.name}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-purple">{doc.specialty}</span></td>
                    <td>
                      <span className={`status-dot ${doc.status}`} style={{ position: 'static', display: 'inline-block', marginRight: 6 }}></span>
                      <span style={{ textTransform: 'capitalize' }}>{doc.status === 'online' ? 'On Duty' : doc.status}</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-ghost">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}
