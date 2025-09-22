
import React from 'react';
import { CalculationResult } from '../types';
import { InfoCard } from './InfoCard';
import { ProgressBar } from './ProgressBar';
import { CalendarIcon, ClockIcon, DollarIcon, FlagIcon, UpIcon, TargetIcon, ChartIcon } from './Icons';

interface ResultsDisplayProps {
  result: CalculationResult | null;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="text-center p-10 bg-white dark:bg-slate-800 rounded-xl shadow-md">
        <p className="text-slate-500 dark:text-slate-400">입대 정보를 입력하시면 복무 현황이 여기에 표시됩니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
       {/* Summary Section */}
      <InfoCard title="복무 현황 요약" icon={<TargetIcon />}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">전역까지</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">D-{result.daysRemaining}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">이번 달 월급</p>
            <p className="text-2xl font-bold">{result.currentRank.salary.toLocaleString()}원</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">다음 진급</p>
            <p className="text-lg font-semibold">{result.nextPromotionDate ? result.nextPromotionDate.split(' ').slice(1).join(' ') : '없음'}</p>
          </div>
           <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">총 예상 수령액</p>
            <p className="text-lg font-semibold">{result.totalExpected.toLocaleString()}원</p>
          </div>
        </div>
      </InfoCard>

      {/* Service Period Info */}
      <InfoCard title="복무 기간 정보" icon={<CalendarIcon />}>
        <div className="mb-4">
          <ProgressBar percentage={result.progress} />
          <p className="text-center mt-2 font-medium">{result.progress.toFixed(2)}% 완료</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg">
            <strong>입대일:</strong> {result.enlistmentDate}
          </div>
          <div className="bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg">
            <strong>전역 예정일:</strong> {result.dischargeDate}
          </div>
          <div className="bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg">
            <strong>총 복무일:</strong> {result.totalServiceDays}일
          </div>
          <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
            <strong>현재 복무일:</strong> {result.daysServed}일
          </div>
          <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">
            <strong>남은 복무일:</strong> {result.daysRemaining}일
          </div>
        </div>
      </InfoCard>

      {/* Rank & Salary Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title="계급 및 월급" icon={<FlagIcon />}>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">현재 계급 ({result.monthsServed}개월차)</p>
              <p className="text-xl font-bold">{result.currentRank.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">현재 월급</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">{result.currentRank.salary.toLocaleString()}원</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">지금까지 총 수령액</p>
              <p className="text-xl font-bold">{result.totalReceived.toLocaleString()}원</p>
            </div>
          </div>
        </InfoCard>
        <InfoCard title="진급 스케줄" icon={<UpIcon />}>
            <ul className="space-y-3">
                {result.promotionSchedule.length > 0 ? result.promotionSchedule.map(promo => (
                    <li key={promo.rank} className="flex justify-between items-center text-sm p-2 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                        <span>{promo.date}</span>
                        <span className="font-semibold">{promo.rank}</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">{promo.salary.toLocaleString()}원</span>
                    </li>
                )) : (
                    <p className="text-slate-500 dark:text-slate-400">모든 진급이 완료되었습니다.</p>
                )}
            </ul>
        </InfoCard>
      </div>
      
      {/* Monthly Breakdown */}
      <InfoCard title="월별 상세 수령액" icon={<ChartIcon />}>
        <div className="max-h-60 overflow-y-auto pr-2">
            <ul className="space-y-2 text-sm">
                {result.monthlyBreakdown.map((month, index) => (
                    <li key={index} className="flex justify-between items-center p-2 rounded-md even:bg-slate-100 dark:even:bg-slate-700/50">
                        <span className="font-mono w-1/3">{month.date}</span>
                        <span className="font-semibold w-1/3 text-center">{month.rank}</span>
                        <span className="font-semibold w-1/3 text-right">{month.salary.toLocaleString()}원</span>
                    </li>
                ))}
            </ul>
        </div>
      </InfoCard>
    </div>
  );
};
