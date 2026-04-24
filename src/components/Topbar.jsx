import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, Bell, Moon, Sun, Languages, LogOut } from 'lucide-react';

export default function Topbar({ pageTitle, pageSubtitle }) {
  const { user, theme, toggleTheme, lang, toggleLang, logout } = useAuth();

  return (
    <div className="topbar">
      <div style={{ display: 'flex', flexDirection: 'column', marginRight: 'var(--sp-xl)' }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--clr-primary)', marginBottom: 0 }}>{pageTitle || 'Dashboard'}</h1>
        {pageSubtitle && <p style={{ fontSize: '0.7rem', color: 'var(--clr-text-muted)', marginTop: -2 }}>{pageSubtitle}</p>}
      </div>

      <div className="topbar-search-wrap">
        <Search size={16} />
        <input type="text" className="topbar-search" placeholder="Search patients, appointments..." />
      </div>

      <div className="topbar-actions">
        <button className="icon-btn" onClick={toggleLang} title="Switch Language">
           <Languages size={18} />
           <span className="notif-dot" style={{ background: 'var(--clr-primary)', display: lang === 'ar' ? 'block' : 'none' }}></span>
        </button>

        <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
           {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="icon-btn">
          <Bell size={18} />
          <span className="notif-dot"></span>
        </button>

        <div style={{ width: '1px', height: '24px', background: 'var(--clr-border)', marginLeft: 'var(--sp-sm)', marginRight: 'var(--sp-sm)' }}></div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-sm)' }}>
           <div style={{ textAlign: 'right' }}>
             <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{user?.name || 'User'}</div>
             <div style={{ fontSize: '0.65rem', color: 'var(--clr-text-muted)', textTransform: 'uppercase' }}>{user?.role || 'Guest'}</div>
           </div>
           <div className="avatar-wrap">
             <div className="avatar">{(user?.name || 'U')[0]}</div>
             <span className="status-dot online"></span>
           </div>
        </div>

        <button className="icon-btn" onClick={logout} title="Logout" style={{ marginLeft: 'var(--sp-sm)', color: 'var(--clr-danger)' }}>
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
}
