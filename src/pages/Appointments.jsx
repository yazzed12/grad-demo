import { useState } from 'react';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import {
  Search, Plus, Calendar, Clock, MapPin, User,
  X, ChevronLeft, ChevronRight, Filter
} from 'lucide-react';

const STATUS_CLASS = {
  Confirmed: 'badge badge-success',
  Pending:   'badge badge-warning',
  Cancelled: 'badge badge-danger',
};

const TYPE_CLASS = {
  'Follow-up':    'badge badge-primary',
  'Consultation': 'badge badge-cyan',
  'Urgent':       'badge badge-danger',
  'Check-up':     'badge badge-success',
  'Therapy':      'badge badge-purple',
  'ECG Test':     'badge badge-primary',
  'MRI Review':   'badge badge-cyan',
  'Surgery Prep': 'badge badge-warning',
};

/* ── Add Appointment Modal ─────────────────────────────────── */
function AddModal({ onClose }) {
  const { addAppointment, doctors, patients } = useData();
  const [formData, setFormData] = useState({
    patient: '',
    doctor: doctors[0]?.name || '',
    date: '2026-04-23',
    time: '09:00',
    type: 'Consultation',
    room: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addAppointment({
      ...formData,
      status: 'Pending'
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }} onSubmit={handleSubmit}>
        <div className="modal-header">
          <h2 className="modal-title">New Appointment</h2>
          <button type="button" className="modal-close" onClick={onClose}><X size={14} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="grid-2" style={{ gap: 12 }}>
            <div className="form-group">
              <label className="form-label">Patient Name</label>
              <input 
                className="form-input" 
                placeholder="Search patient…" 
                required 
                value={formData.patient}
                onChange={e => setFormData({...formData, patient: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Doctor</label>
              <select 
                className="form-select"
                value={formData.doctor}
                onChange={e => setFormData({...formData, doctor: e.target.value})}
              >
                {doctors.map(d => <option key={d.id}>{d.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid-2" style={{ gap: 12 }}>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input 
                className="form-input" type="date" 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Time</label>
              <input 
                className="form-input" type="time" 
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
              />
            </div>
          </div>

          <div className="grid-2" style={{ gap: 12 }}>
            <div className="form-group">
              <label className="form-label">Appointment Type</label>
              <select 
                className="form-select"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option>Consultation</option>
                <option>Follow-up</option>
                <option>Check-up</option>
                <option>Urgent</option>
                <option>Therapy</option>
                <option>Surgery Prep</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Room</label>
              <input 
                className="form-input" placeholder="e.g. A-101" 
                value={formData.room}
                onChange={e => setFormData({...formData, room: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea 
              className="form-textarea" placeholder="Any special notes…" style={{ minHeight: 80 }} 
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              <Calendar size={15} /> Confirm Appointment
            </button>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

/* ── Mini Calendar ─────────────────────────────────────────── */
function MiniCalendar({ selectedDate, onSelect }) {
  const [month, setMonth] = useState(new Date(2026, 3, 1)); // April 2026

  const year  = month.getFullYear();
  const mon   = month.getMonth();
  const first = new Date(year, mon, 1).getDay();
  const days  = new Date(year, mon + 1, 0).getDate();

  const { appointments } = useData();
  const dateStr = (d) =>
    `${year}-${String(mon + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const apptDays = new Set(appointments.map(a => a.date));

  const monthNames = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];

  return (
    <div className="card" style={{ padding: 'var(--sp-md)' }}>
      {/* Month Nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <button className="icon-btn" style={{ width: 28, height: 28 }}
          onClick={() => setMonth(new Date(year, mon - 1, 1))}>
          <ChevronLeft size={14} />
        </button>
        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
          {monthNames[mon]} {year}
        </span>
        <button className="icon-btn" style={{ width: 28, height: 28 }}
          onClick={() => setMonth(new Date(year, mon + 1, 1))}>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Day Headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: '0.65rem', color: 'var(--clr-text-muted)', fontWeight: 700, padding: '2px 0' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {Array.from({ length: first }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: days }, (_, i) => i + 1).map(d => {
          const ds = dateStr(d);
          const isSelected = ds === selectedDate;
          const hasAppt    = apptDays.has(ds);
          return (
            <button key={d}
              onClick={() => onSelect(ds)}
              style={{
                aspectRatio: '1', borderRadius: 'var(--r-sm)',
                border: 'none', cursor: 'pointer',
                fontSize: '0.75rem', fontWeight: hasAppt ? 700 : 400,
                position: 'relative',
                background: isSelected ? 'var(--grad-primary)' : 'transparent',
                color: isSelected ? '#fff' : hasAppt ? 'var(--clr-primary)' : 'var(--clr-text-secondary)',
                transition: 'all var(--tr-fast)',
              }}
              onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--clr-surface-2)'; }}
              onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
            >
              {d}
              {hasAppt && !isSelected && (
                <span style={{
                  position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
                  width: 4, height: 4, borderRadius: '50%', background: 'var(--clr-primary)',
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Appointments Page ─────────────────────────────────────── */
export default function Appointments() {
  const { appointments } = useData();
  const [search, setSearch]   = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState('2026-04-23');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = appointments.filter(a => {
    const matchSearch = (a.patient?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (a.doctor?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (a.type?.toLowerCase() || '').includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    const matchDate   = !selectedDate || a.date === selectedDate;
    return matchSearch && matchStatus && matchDate;
  });

  const counts = {
    Confirmed: appointments.filter(a => a.status === 'Confirmed').length,
    Pending:   appointments.filter(a => a.status === 'Pending').length,
    Cancelled: appointments.filter(a => a.status === 'Cancelled').length,
  };

  return (
    <Layout pageTitle="Appointments" pageSubtitle={`${appointments.length} scheduled appointments`}>

      {/* ── Summary Strip ── */}
      <div className="grid-4 stagger animate-fadeIn" style={{ marginBottom: 'var(--sp-xl)' }}>
        {[
          { label: 'Total',     value: appointments.length, color: '#3b82f6' },
          { label: 'Confirmed', value: counts.Confirmed,    color: '#10b981' },
          { label: 'Pending',   value: counts.Pending,      color: '#f59e0b' },
          { label: 'Cancelled', value: counts.Cancelled,    color: '#ef4444' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card" style={{ padding: '16px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color }}>{value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ── Main Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'var(--sp-lg)', alignItems: 'start' }}>

        {/* Sidebar: Calendar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)' }}>
          <MiniCalendar selectedDate={selectedDate} onSelect={d => setSelectedDate(prev => prev === d ? '' : d)} />

          {/* Legend */}
          <div className="card" style={{ padding: 'var(--sp-md)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--clr-text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Status Legend
            </div>
            {[
              { label: 'Confirmed', cls: 'badge badge-success' },
              { label: 'Pending',   cls: 'badge badge-warning' },
              { label: 'Cancelled', cls: 'badge badge-danger' },
            ].map(({ label, cls }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span className={cls}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main: Table */}
        <div>
          {/* Controls */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 'var(--sp-lg)', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
              <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--clr-text-muted)' }} />
              <input className="form-input" style={{ paddingLeft: 38, borderRadius: 'var(--r-full)' }}
                placeholder="Search appointments…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <div style={{ display: 'flex', gap: 6 }}>
              {['All', 'Confirmed', 'Pending', 'Cancelled'].map(s => (
                <button key={s}
                  className={`btn btn-sm ${statusFilter === s ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setStatusFilter(s)}>
                  {s}
                </button>
              ))}
            </div>

            {selectedDate && (
              <button className="btn btn-sm btn-ghost" onClick={() => setSelectedDate('')}>
                <X size={12} /> Clear date
              </button>
            )}

            <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(true)}>
              <Plus size={14} /> Add
            </button>
          </div>

          {selectedDate && (
            <div style={{ marginBottom: 12, fontSize: '0.82rem', color: 'var(--clr-primary)', fontWeight: 600 }}>
              📅 Showing appointments for {selectedDate}
            </div>
          )}

          {/* Table */}
          <div className="card animate-fadeIn" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="table-wrapper" style={{ borderRadius: 0, border: 'none' }}>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Room</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(a => (
                    <tr key={a.id}>
                      <td style={{ color: 'var(--clr-text-muted)', fontFamily: 'var(--font-mono)' }}>#{a.id.toString().padStart(3,'0')}</td>
                      <td style={{ fontWeight: 600, color: 'var(--clr-text-primary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <User size={13} style={{ color: 'var(--clr-text-muted)' }} />
                          {a.patient}
                        </div>
                      </td>
                      <td>{a.doctor}</td>
                      <td><span className={TYPE_CLASS[a.type] || 'badge badge-primary'}>{a.type}</span></td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <Calendar size={12} style={{ color: 'var(--clr-text-muted)' }} /> {a.date}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <Clock size={12} style={{ color: 'var(--clr-text-muted)' }} /> {a.time}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <MapPin size={12} style={{ color: 'var(--clr-text-muted)' }} /> {a.room}
                        </div>
                      </td>
                      <td><span className={STATUS_CLASS[a.status]}>{a.status}</span></td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} style={{ textAlign: 'center', padding: 48, color: 'var(--clr-text-muted)' }}>
                        <Calendar size={32} style={{ marginBottom: 8, opacity: 0.3, display: 'block', margin: '0 auto 8px' }} />
                        No appointments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showAdd && <AddModal onClose={() => setShowAdd(false)} />}
    </Layout>
  );
}
