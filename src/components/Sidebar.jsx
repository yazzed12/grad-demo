import React from 'react';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { Activity, LayoutDashboard, Users, CalendarDays, FileText, Settings, ShieldAlert, Bot } from 'lucide-react';

export default function Sidebar() {
  const { user } = useAuth();
  
  // Define links based on role
  let links = [];

  if (user?.role === 'admin') {
    links = [
      { path: '/admin', icon: LayoutDashboard, label: 'Admin Dashboard' },
      { path: '/admin/doctors', icon: Users, label: 'Manage Doctors' },
      { path: '/admin/receptionists', icon: Users, label: 'Receptionists' },
      { path: '/admin/reports', icon: FileText, label: 'System Reports' },
      { path: '/admin/security', icon: ShieldAlert, label: 'Access Control' }
    ];
  } else if (user?.role === 'doctor') {
    links = [
      { path: '/doctor', icon: LayoutDashboard, label: 'Dr Dashboard' },
      { path: '/doctor/appointments', icon: CalendarDays, label: 'Appointments' },
      { path: '/doctor/patients', icon: Users, label: 'My Patients' },
      { path: '/doctor/ai-reports', icon: Bot, label: 'AI Reports' }
    ];
  } else if (user?.role === 'receptionist') {
    links = [
      { path: '/receptionist', icon: LayoutDashboard, label: 'Front Desk' },
      { path: '/receptionist/calendar', icon: CalendarDays, label: 'Master Calendar' },
      { path: '/receptionist/patients', icon: Users, label: 'Patient Directory' }
    ];
  } else if (user?.role === 'patient') {
    links = [
      { path: '/patient', icon: LayoutDashboard, label: 'My Portal' },
      { path: '/patient/appointments', icon: CalendarDays, label: 'Book Appointment' },
      { path: '/patient/records', icon: FileText, label: 'Medical Records' },
      { path: '/patient/ai-assistant', icon: Bot, label: 'Talk to AI' }
    ];
  }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Activity size={20} color="#fff" />
        </div>
        <div>
          <div className="sidebar-logo-text">Smart Clinic</div>
          <div className="sidebar-logo-sub text-gradient-teal">AI-Powered System</div>
        </div>
      </div>
      
      <div className="sidebar-nav">
        <div className="sidebar-section-label">Main Menu</div>
        {links.map(link => (
          <NavLink 
            key={link.path} 
            to={link.path} 
            end={link.path === '/admin' || link.path === '/doctor' || link.path === '/receptionist' || link.path === '/patient'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <link.icon size={18} className="nav-icon" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="nav-item" onClick={() => alert('Settings')} style={{ margin: 0 }}>
           <Settings size={18} className="nav-icon" />
           <span>Settings</span>
        </div>
      </div>
    </div>
  );
}
