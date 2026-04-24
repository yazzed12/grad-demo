import React from 'react';
import { Calendar, FileText, Bell, MessageSquare, Bot, User, Clock, CheckCircle } from 'lucide-react';
import Layout from '../../components/Layout';
import { useData } from '../../context/DataContext';

export default function PatientDashboard() {
  const { appointments: allAppts, patients } = useData();
  
  // For demo purposes, we show data for Eleanor Voss
  const myAppts = allAppts.filter(a => a.patient.includes('Eleanor Voss'));
  const nextAppt = myAppts[0];

  const reports = [
    { id: 1, title: 'General Checkup Summary', date: '20 April 2026', status: 'Analysis Available' },
    { id: 2, title: 'Lab Results: Blood Work', date: '15 April 2026', status: 'Completed' }
  ];

  return (
    <Layout pageTitle="My Health Portal" pageSubtitle="Welcome back, Ahmed. Your health data is securely stored.">
      <div className="animate-fadeIn">

      <div className="grid-3 mb-xl" style={{ marginBottom: 'var(--sp-xl)' }}>
        <div className="card" style={{ background: 'var(--grad-primary)', color: '#fff', border: 'none' }}>
           <h3 style={{ marginBottom: '8px' }}>Next Appointment</h3>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: 'var(--r-md)' }}>
                 <Calendar size={24} />
              </div>
              <div>
                 <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{nextAppt ? `${nextAppt.date}, ${nextAppt.time}` : 'No upcoming appts'}</div>
                 <div style={{ opacity: 0.8 }}>{nextAppt ? `with ${nextAppt.doctor}` : 'Stay healthy!'}</div>
              </div>
           </div>
           <button className="btn btn-sm btn-secondary" style={{ width: '100%', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>Reschedule</button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Bot size={22} color="var(--clr-primary)" />
              <h4 style={{ color: 'var(--clr-primary)' }}>AI Health Tip</h4>
           </div>
           <p style={{ fontSize: '0.875rem' }}>Your physical activity is up by 15% this week! Keep it up for better cardiovascular health.</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
           <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Bell size={18} /> Notifications</h4>
           <div style={{ fontSize: '0.8rem', padding: '8px', background: 'var(--clr-surface-2)', borderRadius: 'var(--r-md)' }}>
              Your lab results for <b>Blood Test</b> are now available for review.
           </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
           <h3 style={{ marginBottom: 'var(--sp-lg)', display: 'flex', alignItems: 'center', gap: '10px' }}><FileText size={20} /> Medical Reports</h3>
           <div className="flex flex-col gap-md">
              {reports.map((report) => (
                <div key={report.id} className="card-glass" style={{ padding: 'var(--sp-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                   <div>
                      <div style={{ fontWeight: 600 }}>{report.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>{report.date}</div>
                   </div>
                   <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-success" style={{ marginBottom: '8px', display: 'inline-flex' }}><CheckCircle size={12}/> {report.status}</span>
                      <br/>
                      <button className="btn btn-sm btn-primary">View AI Summary</button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--clr-primary-glow)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--sp-md)' }}>
              <div className="sidebar-logo-icon" style={{ width: 32, height: 32 }}>
                <Bot size={18} color="#fff" />
              </div>
              <h3>Talk to Health AI</h3>
           </div>
           <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-secondary)', marginBottom: 'var(--sp-md)' }}>Ask questions about your reports, medical jargon, or book your next appointment via voice.</p>
           
           <div style={{ flex: 1, background: 'var(--clr-surface-2)', borderRadius: 'var(--r-lg)', padding: 'var(--sp-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--clr-border)' }}>
              <button className="btn btn-primary btn-lg" style={{ borderRadius: '50%', width: '64px', height: '64px', padding: 0 }}>
                 <MessageSquare size={24} />
              </button>
           </div>
           
           <div style={{ marginTop: 'var(--sp-md)', textAlign: 'center', fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>
              Try: "Summarize my last blood report"
           </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}
