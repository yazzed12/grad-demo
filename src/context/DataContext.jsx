import React, { createContext, useContext, useState, useEffect } from 'react';
import * as initialData from '../data/mockData';

const DataContext = createContext();

export function DataProvider({ children }) {
  // Initialize state from localStorage or mockData
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('clinic_patients');
    return saved ? JSON.parse(saved) : initialData.patients;
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('clinic_appointments');
    return saved ? JSON.parse(saved) : initialData.appointments;
  });

  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem('clinic_doctors');
    return saved ? JSON.parse(saved) : initialData.doctors;
  });

  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem('clinic_records');
    return saved ? JSON.parse(saved) : [
      { id: 1, patient: 'Eleanor Voss',   type: 'ECG Report',      date: '2026-04-18', doctor: 'Dr. Sarah Mitchell', status: 'Final',    size: '2.4 MB' },
      { id: 2, patient: 'Marcus Cole',    type: 'MRI Scan',         date: '2026-04-15', doctor: 'Dr. James Okafor',   status: 'Final',    size: '48 MB'  },
      { id: 3, patient: 'Oliver Grant',   type: 'X-Ray',            date: '2026-04-20', doctor: 'Dr. Carlos Vega',    status: 'Pending',  size: '12 MB'  },
      { id: 4, patient: 'Priya Sharma',   type: 'Spirometry',       date: '2026-04-12', doctor: 'Dr. Amara Nwosu',    status: 'Final',    size: '1.1 MB' },
      { id: 5, patient: 'Leo Kowalski',   type: 'Psych Evaluation', date: '2026-04-16', doctor: 'Dr. Ryan Patel',     status: 'Draft',    size: '890 KB' },
      { id: 6, patient: 'Nina Johansson', type: 'Blood Work',       date: '2026-04-19', doctor: 'Dr. Sarah Mitchell', status: 'Final',    size: '340 KB' },
      { id: 7, patient: 'David Huang',    type: 'Neurology Report', date: '2026-04-14', doctor: 'Dr. James Okafor',   status: 'Pending',  size: '5.2 MB' },
      { id: 8, patient: 'Taraji Barnes',  type: 'Skin Biopsy',      date: '2026-04-10', doctor: 'Dr. Lena Fischer',   status: 'Final',    size: '760 KB' },
    ];
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('clinic_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('clinic_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('clinic_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('clinic_records', JSON.stringify(records));
  }, [records]);

  // Actions
  const addPatient = (patient) => {
    const newPatient = {
      ...patient,
      id: patients.length + 1,
      avatar: patient.name.split(' ').map(n => n[0]).join('')
    };
    setPatients(prev => [newPatient, ...prev]);
    return newPatient;
  };

  const addAppointment = (appt) => {
    const newAppt = {
      ...appt,
      id: appointments.length + 1
    };
    setAppointments(prev => [newAppt, ...prev]);
    return newAppt;
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const addDoctor = (doc) => {
    const newDoc = {
      ...doc,
      id: doctors.length + 1,
      avatar: doc.name.split(' ').map(n => n[0]).join(''),
      status: 'online',
      patients: 0,
      rating: 5.0
    };
    setDoctors(prev => [newDoc, ...prev]);
    return newDoc;
  };

  const value = {
    patients,
    appointments,
    doctors,
    addPatient,
    addAppointment,
    updateAppointmentStatus,
    addDoctor,
    stats: initialData.stats,
    notifications: initialData.notifications
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
