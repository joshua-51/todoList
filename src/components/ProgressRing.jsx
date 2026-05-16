import React from 'react';

const ProgressRing = ({ percentage }) => {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-container">
      <div className="progress-ring">
        <svg height="60" width="60">
          <circle
            stroke="var(--border-color)"
            fill="transparent"
            strokeWidth="4"
            r={radius}
            cx="30"
            cy="30"
          />
          <circle
            className="progress-ring-circle"
            stroke="var(--accent-primary)"
            fill="transparent"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            r={radius}
            cx="30"
            cy="30"
          />
        </svg>
        <div className="progress-text">{Math.round(percentage)}%</div>
      </div>
      <div className="progress-label">
        <span>Today's Progress</span>
        <span>Keep it up!</span>
      </div>
    </div>
  );
};

export default ProgressRing;
