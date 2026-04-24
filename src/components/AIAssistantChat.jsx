import React, { useState } from 'react';
import { Bot, X, Send, Mic, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function AIAssistantChat() {
  const { patients, appointments, doctors } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am your AI Assistant. I can help you summarize patient data, check doctor availability, or look up appointments.' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if(!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    
    // Simulate smarter AI response based on data
    setTimeout(() => {
      let response = "I'm not sure about that. Try asking about total patients, doctor status, or today's schedule.";
      
      const lower = userMessage.toLowerCase();
      if (lower.includes('how many patients')) {
        response = `There are currently ${patients.length} patients registered in the system.`;
      } else if (lower.includes('who is online') || lower.includes('doctor status')) {
        const online = doctors.filter(d => d.status === 'online').map(d => d.name);
        response = `The following doctors are currently on duty: ${online.join(', ')}.`;
      } else if (lower.includes('schedule') || lower.includes('appointments today')) {
        const todayCount = appointments.filter(a => a.date === '2026-04-23').length;
        response = `You have ${todayCount} appointments scheduled for today (April 23rd).`;
      } else if (lower.includes('summarize')) {
        response = `Analyzing latest clinical data... AI identifies that hypertension is the most common condition among active patients this week.`;
      }

      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000,
          width: '60px', height: '60px', borderRadius: '50%',
          background: 'var(--grad-primary)', color: '#fff',
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px var(--clr-primary-glow)'
        }}
        className="animate-float"
      >
        <Bot size={28} />
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000,
      width: '350px', height: '500px', background: 'var(--clr-surface)',
      border: '1px solid var(--clr-border)', borderRadius: 'var(--r-xl)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      boxShadow: 'var(--shadow-lg), 0 0 30px var(--clr-primary-glow)'
    }} className="animate-slideUp">
      
      {/* Header */}
      <div style={{
        padding: 'var(--sp-md)', background: 'var(--grad-primary)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-sm)' }}>
          <Bot size={20} />
          <span style={{ fontWeight: 600 }}>AI Assistant</span>
          <Sparkles size={14} style={{ color: '#fbbf24' }} />
        </div>
        <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--sp-md)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === 'ai' ? 'flex-start' : 'flex-end', maxWidth: '80%' }}>
            <div style={{
              background: m.role === 'ai' ? 'var(--clr-surface-2)' : 'var(--clr-primary)',
              color: m.role === 'ai' ? 'var(--clr-text-primary)' : '#fff',
              padding: '10px 14px', borderRadius: 'var(--r-lg)',
              borderBottomLeftRadius: m.role === 'ai' ? '4px' : 'var(--r-lg)',
              borderBottomRightRadius: m.role === 'user' ? '4px' : 'var(--r-lg)',
              fontSize: '0.85rem', boxShadow: m.role === 'user' ? '0 2px 10px var(--clr-primary-glow)' : 'none'
            }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ padding: 'var(--sp-md)', borderTop: '1px solid var(--clr-border)', background: 'var(--clr-surface-2)' }}>
        <form onSubmit={sendMessage} style={{ display: 'flex', gap: 'var(--sp-sm)', alignItems: 'center' }}>
          <button type="button" style={{ background: 'transparent', border: 'none', color: 'var(--clr-text-secondary)', cursor: 'pointer' }}>
            <Mic size={20} />
          </button>
          <input 
            type="text" value={input} onChange={e => setInput(e.target.value)}
            placeholder="Ask AI or dictate..." 
            style={{
              flex: 1, background: 'var(--clr-surface)', border: '1px solid var(--clr-border)',
              padding: '8px 12px', borderRadius: 'var(--r-full)', color: 'var(--clr-text-primary)'
            }}
          />
          <button type="submit" style={{ 
            background: 'var(--clr-primary)', border: 'none', width: '32px', height: '32px',
            borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }}>
            <Send size={14} />
          </button>
        </form>
      </div>

    </div>
  );
}
