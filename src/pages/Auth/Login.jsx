import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Activity, Stethoscope, Users, Building, Bot } from 'lucide-react';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('doctor');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(selectedRole);
    if (selectedRole === 'admin') navigate('/admin');
    else if (selectedRole === 'doctor') navigate('/doctor');
    else if (selectedRole === 'receptionist') navigate('/receptionist');
    else if (selectedRole === 'patient') navigate('/patient');
  };

  const roles = [
    { id: 'admin', label: 'Admin', icon: Building, desc: 'Clinic management' },
    { id: 'doctor', label: 'Doctor', icon: Stethoscope, desc: 'Patient care' },
    { id: 'receptionist', label: 'Reception', icon: Users, desc: 'Front desk' },
    { id: 'patient', label: 'Patient', icon: Activity, desc: 'Health portal' }
  ];

  return (
    <div className="app-layout" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--grad-hero)' }}>
      <div className="card-glass" style={{ width: '100%', maxWidth: '440px', padding: 'var(--sp-2xl)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 'var(--sp-xl)' }}>
           <div className="sidebar-logo-icon" style={{ margin: '0 auto var(--sp-md)', width: 56, height: 56 }}>
             <Activity size={32} color="#fff" />
           </div>
           <h1 className="page-title" style={{ fontSize: '1.8rem' }}>Smart Clinic</h1>
           <p className="page-subtitle">Medical Management System</p>
        </div>

        <form onSubmit={handleLogin} className="form-group gap-lg">
          
          <div className="form-group">
             <label className="form-label" style={{ fontSize: '0.7rem' }}>Select your role</label>
             <div className="grid-2" style={{ gap: 'var(--sp-sm)' }}>
              {roles.map(r => (
                <div 
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  style={{
                    padding: '12px', borderRadius: 'var(--r-lg)', cursor: 'pointer',
                    border: `2px solid ${selectedRole === r.id ? 'var(--clr-primary)' : 'var(--clr-border)'}`,
                    background: selectedRole === r.id ? 'var(--clr-surface-3)' : 'var(--clr-surface-2)',
                    transition: 'all var(--tr-fast)',
                    display: 'flex', gap: '10px', alignItems: 'center'
                  }}
                >
                  <r.icon size={16} color={selectedRole === r.id ? 'var(--clr-primary)' : 'var(--clr-text-muted)'} />
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{r.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" required className="form-input" placeholder="demo@clinic.com" defaultValue="demo@clinic.com" />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" required className="form-input" placeholder="••••••••" defaultValue="password123" />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--sp-sm)', padding: '12px' }}>
            Sign In to Dashboard
          </button>

          <div style={{ textAlign: 'center', marginTop: 'var(--sp-md)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-secondary)' }}>
              New user? <Link to="/register" style={{ color: 'var(--clr-primary)', fontWeight: 600, textDecoration: 'none' }}>Register Account</Link>
            </p>
            <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)', display: 'block', marginTop: '8px' }}>Forgot Password?</Link>
          </div>
        </form>

        <div style={{ marginTop: 'var(--sp-2xl)', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', borderRadius: 'var(--r-md)', background: 'var(--clr-surface-2)' }}>
          <Bot size={18} color="var(--clr-primary)" />
          <p style={{ fontSize: '0.7rem', color: 'var(--clr-text-muted)' }}>
            AI Assistant is active. Use voice commands at login if needed.
          </p>
        </div>
      </div>
    </div>
  );
}
