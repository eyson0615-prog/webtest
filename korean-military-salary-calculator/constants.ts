
import { ServiceType, ServiceConfig } from './types';

export const SERVICE_CONFIG: Record<ServiceType, ServiceConfig> = {
  [ServiceType.ARMY]: {
    durationMonths: 18,
    ranks: [
      { name: '이등병', startMonth: 1, salary: 680000 },
      { name: '일등병', startMonth: 4, salary: 740000 },
      { name: '상등병', startMonth: 9, salary: 810000 },
      { name: '병장', startMonth: 15, salary: 880000 },
    ],
  },
  [ServiceType.AIR_FORCE]: {
    durationMonths: 21,
    ranks: [
      { name: '이등병', startMonth: 1, salary: 680000 },
      { name: '일등병', startMonth: 4, salary: 740000 },
      { name: '상등병', startMonth: 10, salary: 810000 },
      { name: '병장', startMonth: 18, salary: 880000 },
    ],
  },
  [ServiceType.AUXILIARY]: {
    durationMonths: 21,
    ranks: [
      { name: '1-6개월차', startMonth: 1, salary: 680000 },
      { name: '7-12개월차', startMonth: 7, salary: 740000 },
      { name: '13-18개월차', startMonth: 13, salary: 810000 },
      { name: '19-21개월차', startMonth: 19, salary: 880000 },
    ],
  },
};
