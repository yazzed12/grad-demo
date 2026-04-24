import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, FileText, History, Mic, Sparkles, Upload, 
  Search, Plus, X, Check, BrainCircuit, MicOff,
  FileSearch, Stethoscope, Image as ImageIcon, Crosshair,
  User, Activity, Info, Settings, Layers, ChevronRight,
  AlertCircle, Clock, Edit3, Clipboard, ShieldCheck
} from 'lucide-react';
import Layout from '../../components/Layout';
import Dental3DModel from '../../components/Dental3DModel';
import { FDI_TOOTH_MAP, TOOTH_STATUS, INITIAL_TOOTH_DATA, getToothById } from '../../data/toothData';

// Detailed Dental Patient Mock
const PATIENT_MOCK = {
  id: 'D-10293',
  name: 'Ahmed Hassan',
  age: 45,
  gender: 'Male',
  bloodType: 'O+',
  phone: '+1 234-567-8900',
  reason: 'Severe tooth pain in lower right jaw and sensitivity',
  lastVisit: '12 Jan 2024',
  vitals: { bp: '135/88', hr: 78, temp: '37.2°C', glucose: '110 mg/dL' }
};

export default function ConsultationFlow() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 3D & UI State
  const [viewMode, setViewMode] = useState('both');
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [toothData, setToothData] = useState(() => {
    // Initialize with some mock data for demonstration
    const initial = { ...INITIAL_TOOTH_DATA };
    initial[14] = { ...initial[14], status: TOOTH_STATUS.PROBLEM, notes: 'Deep decay observed' };
    initial[16] = { ...initial[16], status: TOOTH_STATUS.TREATED, notes: 'Old composite filling' };
    initial[36] = { ...initial[36], status: TOOTH_STATUS.PROBLEM, notes: 'Sensitivity to cold' };
    return initial;
  });

  // Side Panel Data
  const [clinicalNotes, setClinicalNotes] = useState('');
  
  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const transcriptTimer = useRef(null);
  
  // Report State
  const [report, setReport] = useState('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // --- Handlers ---

  const handleToothSelect = (toothId) => {
    setSelectedTooth(toothId);
    setClinicalNotes(toothData[toothId]?.notes || '');
  };

  const handleStatusChange = (status) => {
    if (!selectedTooth) return;
    setToothData(prev => ({
      ...prev,
      [selectedTooth]: {
        ...prev[selectedTooth],
        status
      }
    }));
  };

  const handleNotesChange = (notes) => {
    if (!selectedTooth) return;
    setClinicalNotes(notes);
    setToothData(prev => ({
      ...prev,
      [selectedTooth]: {
        ...prev[selectedTooth],
        notes
      }
    }));
  };

  // ADVANCED VOICE SYSTEM (FDI Aware)
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      clearInterval(transcriptTimer.current);
      processVoiceInput(transcript);
    } else {
      setIsListening(true);
      setTranscript('');
      
      const demoPhrases = [
        "Tooth 14 has pain and sensitivity",
        "Checking tooth 16, it looks treated and stable",
        "Found some decay on tooth 46, looks like caries"
      ];
      const demoText = demoPhrases[Math.floor(Math.random() * demoPhrases.length)];
      let charIndex = 0;
      
      transcriptTimer.current = setInterval(() => {
        if (charIndex <= demoText.length) {
          setTranscript(demoText.substring(0, charIndex));
          charIndex += 2;
        } else {
          clearInterval(transcriptTimer.current);
          setIsListening(false);
          processVoiceInput(demoText);
        }
      }, 40);
    }
  };

  const processVoiceInput = (text) => {
    const lowerText = text.toLowerCase();
    
    // Extract Tooth Number (FDI)
    const toothMatch = lowerText.match(/tooth (\d+)/);
    if (toothMatch) {
      const tId = parseInt(toothMatch[1]);
      if (FDI_TOOTH_MAP[tId]) {
        // Detect Symptom -> Update Status
        let newStatus = TOOTH_STATUS.HEALTHY;
        if (lowerText.includes('pain') || lowerText.includes('decay') || lowerText.includes('caries') || lowerText.includes('problem')) {
          newStatus = TOOTH_STATUS.PROBLEM;
        } else if (lowerText.includes('treated') || lowerText.includes('stable') || lowerText.includes('filling')) {
          newStatus = TOOTH_STATUS.TREATED;
        }
        
        setToothData(prev => ({
          ...prev, 
          [tId]: { ...prev[tId], status: newStatus }
        }));
        handleToothSelect(tId);
      }
    }
  };

  const generateReport = () => {
    if (!selectedTooth) return;
    setIsGeneratingReport(true);
    
    setTimeout(() => {
      const tooth = getToothById(selectedTooth);
      const data = toothData[selectedTooth];
      const generatedText = `OFFICIAL DENTAL EXAMINATION REPORT
-----------------------------------------
PATIENT: ${PATIENT_MOCK.name} (ID: ${PATIENT_MOCK.id})
DATE: ${new Date().toLocaleDateString()}

[CLINICAL FINDINGS]
Target: Tooth FDI #${selectedTooth} (${tooth.name})
Arch: ${tooth.arch} | Quadrant: ${tooth.quadrant} | Type: ${tooth.type}
Status: ${data.status.toUpperCase()}

[NOTES]
${data.notes || 'No additional clinical notes provided.'}

-----------------------------------------
SIGNED: Dr. [DENTIST_NAME]`;

      setReport(generatedText);
      setIsGeneratingReport(false);
    }, 1500);
  };

  const selectedToothInfo = selectedTooth ? getToothById(selectedTooth) : null;
  const currentToothData = selectedTooth ? toothData[selectedTooth] : null;

  return (
    <Layout pageTitle="Dental Clinical Suite" pageSubtitle="Interactive FDI 3D Mapping">
      
      {/* PROFESSIONAL PATIENT HEADER */}
      <div className="card-glass" style={{ marginBottom: 'var(--sp-lg)', padding: 'var(--sp-md)', borderTop: '4px solid var(--clr-primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 'var(--sp-md)', alignItems: 'center' }}>
            <div style={{ width: 45, height: 45, borderRadius: '10px', background: 'var(--grad-hero)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {PATIENT_MOCK.name[0]}
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', margin: 0 }}>{PATIENT_MOCK.name} <span style={{ color: 'var(--clr-text-muted)', fontSize: '0.8rem', fontWeight: 'normal' }}>#{PATIENT_MOCK.id}</span></h2>
              <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.8rem', margin: 0 }}>{PATIENT_MOCK.age}y • {PATIENT_MOCK.gender} • BP: {PATIENT_MOCK.vitals.bp}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-sm btn-secondary"><Clock size={14} /> History</button>
            <button className="btn btn-sm btn-primary" onClick={() => navigate('/doctor')}><Save size={14} /> Save Session</button>
          </div>
        </div>
      </div>

      <div className="grid-12 gap-lg" style={{ height: 'calc(100vh - 180px)', minHeight: '750px' }}>
        
        {/* LEFT: 3D VISUALIZER */}
        <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)' }}>
          <div className="card" style={{ flexGrow: 1, padding: 0, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', border: '1px solid var(--clr-border)' }}>
             <div style={{ padding: '12px', background: 'var(--clr-bg)', borderBottom: '1px solid var(--clr-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <Layers size={18} className="text-primary" />
                   <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>FDI 3D Tooth Navigator</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className={`btn btn-xs ${viewMode === 'upper' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setViewMode('upper')}>Upper Arch</button>
                  <button className={`btn btn-xs ${viewMode === 'both' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setViewMode('both')}>Full Dentition</button>
                  <button className={`btn btn-xs ${viewMode === 'lower' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setViewMode('lower')}>Lower Arch</button>
                </div>
             </div>
             
             <div style={{ flexGrow: 1 }}>
                <Dental3DModel 
                  toothData={toothData} 
                  selectedTooth={selectedTooth} 
                  onToothSelect={handleToothSelect} 
                  viewMode={viewMode}
                />
             </div>
          </div>

          {/* VOICE INPUT CONSOLE */}
          <div className="card-glass" style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', border: isListening ? '1px solid var(--clr-danger)' : '1px solid var(--clr-border)' }}>
             <button 
               className={`btn btn-sm ${isListening ? 'btn-danger' : 'btn-secondary'}`} 
               onClick={toggleListening}
               style={{ minWidth: '140px' }}
             >
               {isListening ? <><MicOff size={14} /> Stop</> : <><Mic size={14} /> Voice Input</>}
             </button>
             <div style={{ flexGrow: 1, fontSize: '0.85rem', color: transcript ? 'var(--clr-text-primary)' : 'var(--clr-text-muted)' }}>
                {transcript || "Try: 'Tooth 14 has pain' or 'Tooth 16 is treated'..."}
                {isListening && <span className="pulsing-dot" style={{ display: 'inline-block', width: 6, height: 6, background: 'var(--clr-danger)', borderRadius: '50%', marginLeft: '8px', animation: 'pulse 1s infinite' }}></span>}
             </div>
          </div>
        </div>

        {/* RIGHT: SMART SIDE PANEL */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)', overflowY: 'auto', paddingRight: '4px' }}>
          
          {/* 1. TOOTH INFO */}
          <div className="card">
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: 'var(--clr-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Info size={14} /> TOOTH DETAILS (FDI)
            </h4>
            {selectedToothInfo ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div style={{ padding: '8px', background: 'var(--clr-bg-alt)', borderRadius: '8px' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--clr-text-muted)', margin: '0 0 2px 0' }}>FDI Number</p>
                    <p style={{ fontWeight: 'bold', margin: 0 }}>#{selectedToothInfo.fdi}</p>
                  </div>
                  <div style={{ padding: '8px', background: 'var(--clr-bg-alt)', borderRadius: '8px' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--clr-text-muted)', margin: '0 0 2px 0' }}>Type</p>
                    <p style={{ fontWeight: 'bold', margin: 0 }}>{selectedToothInfo.type}</p>
                  </div>
                </div>

                <div style={{ padding: '8px', background: 'var(--clr-bg-alt)', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--clr-text-muted)', margin: '0 0 2px 0' }}>Anatomic Name</p>
                  <p style={{ fontWeight: 'bold', fontSize: '0.85rem', margin: 0 }}>{selectedToothInfo.name}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div style={{ padding: '8px', background: 'var(--clr-bg-alt)', borderRadius: '8px' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--clr-text-muted)', margin: '0 0 2px 0' }}>Arch</p>
                    <p style={{ fontWeight: 'bold', margin: 0 }}>{selectedToothInfo.arch}</p>
                  </div>
                  <div style={{ padding: '8px', background: 'var(--clr-bg-alt)', borderRadius: '8px' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--clr-text-muted)', margin: '0 0 2px 0' }}>Quadrant</p>
                    <p style={{ fontWeight: 'bold', margin: 0 }}>Q{selectedToothInfo.quadrant}</p>
                  </div>
                </div>
                
                {/* 2. STATUS SELECTOR */}
                <div style={{ marginTop: '4px' }}>
                   <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)', margin: '0 0 8px 0' }}>Update Clinical Status:</p>
                   <div style={{ display: 'flex', gap: '6px' }}>
                      {[TOOTH_STATUS.HEALTHY, TOOTH_STATUS.PROBLEM, TOOTH_STATUS.TREATED].map(s => (
                        <button 
                          key={s}
                          onClick={() => handleStatusChange(s)}
                          style={{ flex: 1, padding: '8px 4px', fontSize: '0.7rem', borderRadius: '6px', border: '1px solid var(--clr-border)', textTransform: 'capitalize', transition: 'all 0.2s',
                                   background: currentToothData?.status === s ? 
                                    (s === TOOTH_STATUS.PROBLEM ? '#ef4444' : s === TOOTH_STATUS.TREATED ? '#10b981' : 'var(--clr-primary)') 
                                    : 'transparent',
                                   color: currentToothData?.status === s ? 'white' : 'inherit',
                                   fontWeight: currentToothData?.status === s ? '600' : 'normal' }}
                        >
                          {s}
                        </button>
                      ))}
                   </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--clr-text-muted)' }}>
                <Crosshair size={32} style={{ opacity: 0.2, marginBottom: '10px' }} />
                <p style={{ fontSize: '0.85rem' }}>Select a tooth on the 3D model to view detailed diagnostics</p>
              </div>
            )}
          </div>

          {/* 3. NOTES & HISTORY */}
          <div className="card" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: 'var(--clr-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Edit3 size={14} /> CLINICAL OBSERVATIONS
            </h4>
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <textarea 
                className="form-textarea" 
                placeholder={selectedTooth ? `Enter observations for tooth #${selectedTooth}...` : "Select a tooth first..."}
                style={{ fontSize: '0.85rem', minHeight: '100px', flexGrow: 1, resize: 'none' }}
                value={clinicalNotes}
                onChange={(e) => handleNotesChange(e.target.value)}
                disabled={!selectedTooth}
              ></textarea>
              
              <div style={{ borderTop: '1px solid var(--clr-border)', paddingTop: '10px' }}>
                 <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--clr-text-muted)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                   <History size={12} /> TREATMENT HISTORY
                 </p>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {selectedTooth ? (
                      <>
                        <div style={{ fontSize: '0.75rem', padding: '8px', background: 'var(--clr-bg-alt)', borderRadius: '6px', borderLeft: '3px solid var(--clr-primary)' }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                             <strong>Initial Exam</strong>
                             <span style={{ opacity: 0.6 }}>2024-04-20</span>
                           </div>
                           <p style={{ margin: 0, fontSize: '0.7rem' }}>Patient reported minor sensitivity. Visual inspection clear.</p>
                        </div>
                        <div style={{ fontSize: '0.75rem', padding: '8px', background: 'var(--clr-bg-alt)', borderRadius: '6px', borderLeft: '3px solid #10b981' }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                             <strong>Fluoride App</strong>
                             <span style={{ opacity: 0.6 }}>2023-10-12</span>
                           </div>
                           <p style={{ margin: 0, fontSize: '0.7rem' }}>Preventative treatment applied to all quadrants.</p>
                        </div>
                      </>
                    ) : (
                      <p style={{ fontSize: '0.7rem', color: 'var(--clr-text-muted)', textAlign: 'center' }}>No history to display</p>
                    )}
                 </div>
              </div>
            </div>
            
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '16px', gap: '8px' }} 
              disabled={!selectedTooth || isGeneratingReport}
              onClick={generateReport}
            >
              {isGeneratingReport ? <><Sparkles size={14} className="animate-spin" /> Analyzing...</> : <><ShieldCheck size={14} /> Generate Clinical Report</>}
            </button>
          </div>

          {/* 4. AUTO REPORT PREVIEW */}
          {report && (
            <div className="card animate-fadeIn" style={{ background: '#f8fafc', border: '1px solid #cbd5e1' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--clr-primary)' }}>REPORT DRAFT</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button className="btn btn-xs btn-ghost" onClick={() => setReport('')}><X size={12} /></button>
                  </div>
               </div>
               <pre style={{ fontSize: '0.7rem', whiteSpace: 'pre-wrap', fontFamily: 'monospace', margin: 0, color: '#334155', maxHeight: '150px', overflowY: 'auto' }}>
                  {report}
               </pre>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}
