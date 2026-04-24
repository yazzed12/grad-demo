import React from 'react';
import { Calendar, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';
import Layout from '../../components/Layout';
import { useData } from '../../context/DataContext';

export default function ReceptionDashboard() {
  const { appointments, patients } = useData();
  const today = new Date().toISOString().split('T')[0]; // Simplify for demo
  const todayAppts = appointments.filter(a => a.date === '2026-04-23'); // Using mock date

  return (
    <Layout pageTitle="Reception Desk" pageSubtitle="Manage appointments and walk-ins">
      <div className="animate-fadeIn">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--sp-md)' }}>
          <button className="btn btn-primary btn-sm">
            <Plus size={18} /> Book New Appointment
          </button>
        </div>

      <div className="grid-3 gap-lg mb-xl" style={{ marginBottom: 'var(--sp-xl)' }}>
        <div className="stat-card primary">
          <div className="stat-label">Pending Approvals</div>
          <div className="stat-value text-gradient">12</div>
        </div>
        <div className="stat-card success">
          <div className="stat-label">Appointments Today</div>
          <div className="stat-value text-gradient-teal">45</div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-md)', background: 'rgba(16, 185, 129, 0.1)' }}>
          <div style={{ flex: 1 }}>
            <h4 style={{ color: 'var(--clr-primary)', marginBottom: '4px' }}>AI Suggestion</h4>
            <p style={{ fontSize: '0.8rem' }}>Dr. Sarah has a free slot at 11:30 AM due to a cancellation. Would you like to notify waitlisted patients?</p>
          </div>
          <button className="btn btn-sm btn-primary">Notify All</button>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 'var(--sp-md)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Calendar size={20} /> Today's Schedule
        </h3>
        
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Patient Name</th>
                <th>Assigned Doctor</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todayAppts.slice(0, 5).map((appt, i) => (
                <tr key={appt.id}>
                  <td style={{ fontWeight: 600, color: 'var(--clr-text-primary)' }}>{appt.time}</td>
                  <td>{appt.patient}</td>
                  <td><div className="badge badge-purple">{appt.doctor}</div></td>
                  <td>
                    {appt.status === 'Pending' && <span className="badge badge-warning"><Clock size={12}/> Pending</span>}
                    {appt.status === 'Confirmed' && <span className="badge badge-success"><CheckCircle size={12}/> Confirmed</span>}
                    {appt.status === 'Cancelled' && <span className="badge badge-danger"><XCircle size={12}/> Cancelled</span>}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="btn btn-sm btn-success">Approve</button>
                      <button className="btn btn-sm btn-ghost">Reschedule</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </Layout>
  );
}
