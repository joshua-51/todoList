import React, { useState } from 'react';
import { X, UploadCloud, Loader2 } from 'lucide-react';

const AddTaskModal = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Homework');
  const [dueDate, setDueDate] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    
    onAdd({
      id: Date.now(),
      title,
      type,
      dueDate
    });
    
    setTitle('');
    setType('Homework');
    setDueDate('');
    onClose();
  };

  const simulateAIScan = () => {
    setIsScanning(true);
    // Simulate AI processing time
    setTimeout(() => {
      setTitle('AP Calculus BC Unit 4 Exam');
      setType('Test');
      
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      setDueDate(nextWeek.toISOString().split('T')[0]);
      
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal-content glass-panel">
        <div className="modal-header">
          <h2 className="task-title" style={{ fontSize: '1.5rem' }}>Add New Task</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div 
          className="drag-zone"
          onClick={simulateAIScan}
        >
          {isScanning ? (
            <>
              <Loader2 className="upload-icon loading-glow" />
              <p>Analyzing assignment details...</p>
            </>
          ) : (
            <>
              <UploadCloud className="upload-icon" />
              <p>Click or drag Google Classroom screenshot to auto-fill with AI</p>
            </>
          )}
        </div>

        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '-0.5rem 0' }}>
          — or enter manually —
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="input-group">
            <label>Task Name</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Read Chapters 4-5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isScanning}
              required
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Type</label>
              <select 
                className="input-field"
                value={type}
                onChange={(e) => setType(e.target.value)}
                disabled={isScanning}
              >
                <option value="Homework">Homework</option>
                <option value="Test">Test</option>
                <option value="Quiz">Quiz</option>
              </select>
            </div>
            
            <div className="input-group" style={{ flex: 1 }}>
              <label>Due Date</label>
              <input 
                type="date" 
                className="input-field"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                disabled={isScanning}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={isScanning || !title || !dueDate}
          >
            Confirm & Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
