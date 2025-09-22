
export enum ServiceType {
  ARMY = '육군/해군/해병대',
  AIR_FORCE = '공군',
  AUXILIARY = '의무경찰/의무소방/사회복무요원',
}

export interface Rank {
  name: string;
  startMonth: number;
  salary: number;
}

export interface ServiceConfig {
  durationMonths: number;
  ranks: Rank[];
}

export interface CalculationResult {
  enlistmentDate: string;
  dischargeDate: string;
  totalServiceDays: number;
  daysServed: number;
  daysRemaining: number;
  progress: number;
  currentRank: Rank;
  monthsServed: number;
  totalReceived: number;
  totalExpected: number;
  monthlyBreakdown: { date: string; salary: number; rank: string }[];
  promotionSchedule: { date: string; rank: string; salary: number }[];
  nextPromotionDate: string | null;
}
