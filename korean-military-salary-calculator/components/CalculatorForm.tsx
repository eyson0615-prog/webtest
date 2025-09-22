
import React from 'react';
import { ServiceType } from '../types';

interface CalculatorFormProps {
  onDateChange: (date: string) => void;
  onServiceTypeChange: (type: ServiceType) => void;
  serviceType: ServiceType;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ onDateChange, onServiceTypeChange, serviceType }) => {
  
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="enlistment-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            입대일
          </label>
          <input
            type="date"
            id="enlistment-date"
            max={today}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        <div>
          <label htmlFor="service-type" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            군 종류
          </label>
          <select
            id="service-type"
            value={serviceType}
            onChange={(e) => onServiceTypeChange(e.target.value as ServiceType)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {Object.values(ServiceType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
