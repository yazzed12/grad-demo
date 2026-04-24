import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="app-layout" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--grad-hero)' }}>
      <div className="card-glass" style={{ width: '100%', maxWidth: '440px', padding: 'var(--sp-2xl)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 'var(--sp-xl)' }}>
           <div className="sidebar-logo-icon" style={{ margin: '0 auto var(--sp-md)', width: 56, height: 56, background: 'var(--clr-primary-glow)' }}>
             <ShieldCheck size={32} color="var(--clr-primary)" />
           </div>
           <h1 className="page-title" style={{ fontSize: '1.8rem' }}>Reset Password</h1>
           <p className="page-subtitle">We'll send you a recovery link</p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="form-group gap-md">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--clr-text-muted)' }} />
                <input 
                  type="email" required className="form-input" style={{ paddingLeft: 40 }}
                  placeholder="Enter your registered email" 
                  value={email} onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--sp-sm)', padding: '12px' }}>
              Send Link
            </button>

            <div style={{ textAlign: 'center', marginTop: 'var(--sp-md)' }}>
              <Link to="/login" style={{ fontSize: '0.85rem', color: 'var(--clr-text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <ArrowLeft size={14} /> Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--clr-text-secondary)', marginBottom: 'var(--sp-lg)' }}>
              A recovery link has been sent to <strong>{email}</strong> if it exists in our system.
            </p>
            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => navigate('/login')}>
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
