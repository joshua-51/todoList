import React, { useState } from 'react';
import { Check } from 'lucide-react';

const TaskCard = ({ task, onComplete }) => {
  const [completing, setCompleting] = useState(false);

  const handleComplete = () => {
    setCompleting(true);
    setTimeout(() => {
      onComplete(task.id);
    }, 400); // Wait for animation
  };

  const getTagClass = (type) => {
    switch (type.toLowerCase()) {
      case 'homework': return 'homework';
      case 'test': 
      case 'quiz': return 'test';
      case 'high priority': return 'high-priority';
      default: return 'homework';
    }
  };

  const getDaysLeft = (dateString) => {
    const due = new Date(dateString);
    const today = new Date();
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due in 1 day';
    return `Due in ${diffDays} days`;
  };

  return (
    <div className={`task-card glass-panel ${completing ? 'animate-fade-out' : 'animate-fade-in'}`}>
      <button 
        className={`task-checkbox ${completing ? 'completed' : ''}`}
        onClick={handleComplete}
      >
        <Check size={16} strokeWidth={3} />
      </button>
      
      <div className="task-content">
        <h3 className={`task-title ${completing ? 'completed' : ''}`}>
          {task.title}
        </h3>
        <div className="task-meta">
          <span className={`tag ${getTagClass(task.type)}`}>
            {task.type}
          </span>
          <span>{getDaysLeft(task.dueDate)}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
