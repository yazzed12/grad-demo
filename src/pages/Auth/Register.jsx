import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, UserPlus, Mail, Lock, User, ArrowLeft } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate registration
    navigate('/login');
  };

  return (
    <div className="app-layout" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--grad-hero)' }}>
      <div className="card-glass" style={{ width: '100%', maxWidth: '440px', padding: 'var(--sp-2xl)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 'var(--sp-xl)' }}>
           <div className="sidebar-logo-icon" style={{ margin: '0 auto var(--sp-md)', width: 56, height: 56 }}>
             <UserPlus size={32} color="#fff" />
           </div>
           <h1 className="page-title" style={{ fontSize: '1.8rem' }}>Create Account</h1>
           <p className="page-subtitle">Join our smart medical network</p>
        </div>

        <form onSubmit={handleRegister} className="form-group gap-md">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--clr-text-muted)' }} />
              <input 
                type="text" required className="form-input" style={{ paddingLeft: 40 }}
                placeholder="John Doe" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--clr-text-muted)' }} />
              <input 
                type="email" required className="form-input" style={{ paddingLeft: 40 }}
                placeholder="john@example.com" 
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--clr-text-muted)' }} />
              <input 
                type="password" required className="form-input" style={{ paddingLeft: 40 }}
                placeholder="••••••••" 
                value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--sp-sm)', padding: '12px' }}>
            Create Account
          </button>

          <div style={{ textAlign: 'center', marginTop: 'var(--sp-md)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-secondary)' }}>
              Already have an account? <Link to="/login" style={{ color: 'var(--clr-primary)', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
