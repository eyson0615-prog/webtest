
import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  const safePercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
      <div
        className="bg-blue-500 h-4 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${safePercentage}%` }}
      ></div>
    </div>
  );
};
