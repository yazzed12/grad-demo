import React from 'react';
import { Calendar, Users, Clock, CheckCircle, ArrowRight, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useData } from '../../context/DataContext';

export default function DoctorDashboard() {
  const { appointments: allAppts, patients } = useData();
  
  // For demo purposes, we show appointments for Dr. Mitchell
  const appointments = allAppts.filter(a => a.doctor.includes('Sarah Mitchell')).slice(0, 3);
  
  return (
    <Layout pageTitle="Doctor Dashboard" pageSubtitle={`Welcome back, Dr. Mitchell. You have ${appointments.length} appointments scheduled for today.`}>
      <div className="animate-fadeIn">

      <div className="grid-4 stagger mb-xl" style={{ marginBottom: 'var(--sp-xl)' }}>
        <div className="stat-card primary">
          <div className="stat-label">Pending Reviews</div>
          <div className="stat-value">5</div>
          <div className="stat-change up">+2 from yesterday</div>
        </div>
        <div className="stat-card success">
          <div className="stat-label">Completed Consults</div>
          <div className="stat-value">12</div>
          <div className="stat-change up">+4 today</div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-md)', background: 'rgba(5, 150, 105, 0.05)', borderColor: 'rgba(5, 150, 105, 0.1)' }}>
          <div className="stat-icon" style={{ background: 'var(--clr-primary)', color: '#fff', marginBottom: 0 }}>
             <Bot size={20} />
          </div>
          <div>
             <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--clr-primary)' }}>AI SUGGESTION</div>
             <p style={{ fontSize: '0.82rem', lineHeight: 1.3, color: 'var(--clr-text-secondary)' }}>
                Patient <b>Ahmed Hassan</b> has high blood pressure in recent records.
             </p>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--sp-lg)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Calendar size={20} /> Upcoming Appointments</h3>
            <button className="btn btn-sm btn-secondary">View Calendar</button>
          </div>
          <div className="flex flex-col gap-md">
            {appointments.map((appt) => (
              <div key={appt.id} className="card-glass" style={{ padding: 'var(--sp-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="avatar" style={{ width: 40, height: 40 }}>{appt.patient[0]}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{appt.patient}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>{appt.type}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <div style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                     <Clock size={14} /> {appt.time}
                   </div>
                   <Link to={`/doctor/consultation/${appt.id}`} className="btn btn-sm btn-primary" style={{ marginTop: '8px' }}>
                     Start Consultation <ArrowRight size={14} />
                   </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--sp-lg)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={20} /> Recent AI Summaries</h3>
            <div className="badge badge-primary">8 Analyzed Today</div>
          </div>
          <div className="table-wrapper">
             <table>
               <thead>
                 <tr>
                   <th>Patient</th>
                   <th>Summary</th>
                   <th>Action</th>
                 </tr>
               </thead>
               <tbody>
                  {['Sarah Jones', 'Michael Chen', 'Emma Davis'].map((p, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{p}</td>
                      <td><p style={{ fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>AI identified potential chronic fatigue markers...</p></td>
                      <td><button className="btn btn-sm btn-ghost">Review</button></td>
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
