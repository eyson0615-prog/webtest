import React, { useState, useEffect, useMemo } from 'react';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { SERVICE_CONFIG } from './constants';
import { ServiceType, CalculationResult } from './types';
import { HeaderIcon } from './components/Icons';
import { ContactButton } from './components/ContactButton';

const App: React.FC = () => {
  const [enlistmentDate, setEnlistmentDate] = useState<string>('');
  const [serviceType, setServiceType] = useState<ServiceType>(ServiceType.ARMY);
  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    if (enlistmentDate) {
      const config = SERVICE_CONFIG[serviceType];
      const startDate = new Date(enlistmentDate + 'T00:00:00'); // Use local time
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today's date

      const dischargeDate = new Date(startDate);
      dischargeDate.setMonth(dischargeDate.getMonth() + config.durationMonths);
      dischargeDate.setDate(dischargeDate.getDate() - 1);

      const totalServiceDays = Math.round((dischargeDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      const daysServed = Math.max(0, Math.round((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1);
      const daysRemaining = Math.max(0, totalServiceDays - daysServed);
      const progress = totalServiceDays > 0 ? Math.min(100, (daysServed / totalServiceDays) * 100) : 0;

      const monthsServed = Math.floor(daysServed / 30.44);
      
      let currentRank = config.ranks[0];
      let nextPromotionDate: string | null = null;
      const promotionSchedule = [];

      // Determine current rank
      for (let i = config.ranks.length - 1; i >= 0; i--) {
        const rank = config.ranks[i];
        const promotionMonthStart = new Date(startDate);
        promotionMonthStart.setMonth(startDate.getMonth() + rank.startMonth - 1, 1);
        promotionMonthStart.setHours(0, 0, 0, 0);

        if (today >= promotionMonthStart) {
          currentRank = rank;
          break;
        }
      }

      // Find next promotion and build schedule
      for (const rank of config.ranks) {
         const promotionMonthStart = new Date(startDate);
         promotionMonthStart.setMonth(startDate.getMonth() + rank.startMonth - 1, 1);
         promotionMonthStart.setHours(0, 0, 0, 0);

         if (promotionMonthStart > today) {
            const promoDateStr = promotionMonthStart.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
            if (!nextPromotionDate) {
                nextPromotionDate = promoDateStr;
            }
            promotionSchedule.push({
                date: promoDateStr,
                rank: rank.name,
                salary: rank.salary
            });
         }
      }
      
      let totalReceived = 0;
      let totalExpected = 0;
      let monthlyBreakdown = [];

      for (let m = 0; m < config.durationMonths; m++) {
        const currentMonth = new Date(startDate);
        currentMonth.setMonth(startDate.getMonth() + m, 1);
        currentMonth.setHours(0,0,0,0);
        
        let monthRank = config.ranks[0];
        // find rank for this month
        for (let i = config.ranks.length - 1; i >= 0; i--) {
          const rank = config.ranks[i];
          const promotionMonthStart = new Date(startDate);
          promotionMonthStart.setMonth(startDate.getMonth() + rank.startMonth - 1, 1);
          promotionMonthStart.setHours(0, 0, 0, 0);
          
          if (currentMonth >= promotionMonthStart) {
            monthRank = rank;
            break;
          }
        }
        
        if (currentMonth < today) {
          totalReceived += monthRank.salary;
        }
        totalExpected += monthRank.salary;

        monthlyBreakdown.push({
            date: currentMonth.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' }),
            salary: monthRank.salary,
            rank: monthRank.name
        });
      }

      setResult({
        enlistmentDate: startDate.toLocaleDateString('ko-KR'),
        dischargeDate: dischargeDate.toLocaleDateString('ko-KR'),
        totalServiceDays,
        daysServed,
        daysRemaining,
        progress,
        currentRank,
        monthsServed: monthsServed + 1,
        totalReceived,
        totalExpected,
        monthlyBreakdown,
        promotionSchedule,
        nextPromotionDate,
      });
    } else {
      setResult(null);
    }
  }, [enlistmentDate, serviceType]);

  const handleDateChange = (date: string) => {
    setEnlistmentDate(date);
  };
  
  const handleServiceTypeChange = (type: ServiceType) => {
    setServiceType(type);
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <HeaderIcon />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              대한민국 군인 월급 계산기
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            입대일과 군 종류를 선택하여 복무 기간과 예상 월급을 확인해보세요. (2025년 기준)
          </p>
        </header>
        
        <CalculatorForm 
          onDateChange={handleDateChange}
          onServiceTypeChange={handleServiceTypeChange}
          serviceType={serviceType}
        />

        <ResultsDisplay result={result} />

        <footer className="mt-12 text-center text-xs text-slate-500 dark:text-slate-400">
            <p className="font-semibold mb-1">⚠️ 면책조항</p>
            <p>
                이 계산은 일반적인 기준을 바탕으로 한 예상치입니다. 
                실제 월급은 부대 상황, 정책 변경, 개인 사유에 따라 달라질 수 있습니다.
                정확한 정보는 소속 부대나 관련 기관에 확인하시기 바랍니다.
            </p>
            <p className="mt-2">
                💡 월급 기준은 2025년 기준이며, 매년 정부 정책에 따라 변경될 수 있습니다.
            </p>
        </footer>
      </main>
      <ContactButton />
    </div>
  );
};

export default App;
