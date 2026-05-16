import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2, Sparkles } from 'lucide-react';
import './App.css';
import TaskCard from './components/TaskCard';
import AddTaskModal from './components/AddTaskModal';
import ProgressRing from './components/ProgressRing';

function App() {
  const [activeTab, setActiveTab] = useState('Tests & Quizzes');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Initialize from localStorage or defaults
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('focus_tasks');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1,
        title: 'AP Physics Midterm',
        type: 'Test',
        dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0]
      },
      {
        id: 2,
        title: 'History Essay Outline',
        type: 'Homework',
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
      },
      {
        id: 3,
        title: 'Math Worksheet 4.2',
        type: 'Homework',
        dueDate: new Date().toISOString().split('T')[0]
      }
    ];
  });

  const [completedTasksCount, setCompletedTasksCount] = useState(() => {
    const saved = localStorage.getItem('focus_completed_count');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('focus_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('focus_completed_count', completedTasksCount.toString());
  }, [completedTasksCount]);


  const getFilteredTasks = () => {
    if (activeTab === 'Tests & Quizzes') {
      return tasks.filter(t => t.type === 'Test' || t.type === 'Quiz');
    }
    return tasks.filter(t => t.type === 'Homework' || t.type === 'Assignment');
  };

  const handleCompleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    setCompletedTasksCount(prev => prev + 1);
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    // Automatically switch to the correct tab if they added a task that belongs elsewhere
    if (newTask.type === 'Test' || newTask.type === 'Quiz') {
      setActiveTab('Tests & Quizzes');
    } else {
      setActiveTab('Homework & Assignments');
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const totalToday = tasks.length + completedTasksCount;
  const progressPercentage = totalToday === 0 ? 0 : (completedTasksCount / totalToday) * 100;

  const filteredTasks = getFilteredTasks();

  return (
    <div className="app-container animate-fade-in">
      <header className="header">
        <div>
          <h1 className="header-title">Focus</h1>
          <p className="header-date">{currentDate}</p>
        </div>
        <ProgressRing percentage={progressPercentage} />
      </header>

      <div className="top-bar">
        <div className="tabs-container">
          <button 
            className={`tab ${activeTab === 'Tests & Quizzes' ? 'active' : ''}`}
            onClick={() => setActiveTab('Tests & Quizzes')}
          >
            Tests & Quizzes
          </button>
          <button 
            className={`tab ${activeTab === 'Homework & Assignments' ? 'active' : ''}`}
            onClick={() => setActiveTab('Homework & Assignments')}
          >
            Homework & Assignments
          </button>
        </div>
        <button 
          className="add-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          <span>New Task</span>
        </button>
      </div>

      <main className="main-content glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onComplete={handleCompleteTask} 
            />
          ))
        ) : (
          <div className="empty-state animate-fade-in">
            {activeTab === 'Tests & Quizzes' ? (
              <Sparkles className="empty-icon" />
            ) : (
              <CheckCircle2 className="empty-icon" />
            )}
            <div>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                All caught up!
              </h3>
              <p>You have no pending {activeTab.toLowerCase()}. Time to relax!</p>
            </div>
            <button 
              className="btn-primary" 
              style={{ width: 'auto', padding: '0.75rem 2rem' }}
              onClick={() => setIsModalOpen(true)}
            >
              Add a new task
            </button>
          </div>
        )}
      </main>

      <AddTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddTask}
      />
    </div>
  );
}

export default App;
