
import React from 'react';

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
      <div className="flex items-center mb-4">
        <span className="text-blue-500 dark:text-blue-400 mr-3">{icon}</span>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
};
