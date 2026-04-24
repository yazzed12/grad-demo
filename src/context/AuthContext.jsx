import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Roles: 'admin', 'doctor', 'receptionist', 'patient'
  const [user, setUser] = useState(null); // e.g. { name: 'Dr. Smith', role: 'doctor' }
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('en'); // 'en' or 'ar'

  const login = (role) => {
    setUser({ name: `Test ${role}`, role });
  };
  
  const logout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    setLang(newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, theme, toggleTheme, lang, toggleLang }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
