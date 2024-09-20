import { CostListItem, GetICompareDto } from '@/app/_apis/dashboard/getCompare';
import { COLORS } from '@/app/_constant/color';

export const 견적_명세 = [
  {
    value: 'THC 비용',
    label: 'THC 비용',
  },
  {
    value: 'CIC 비용',
    label: 'CIC 비용',
  },
  {
    value: '실행 비용',
    label: '실행 비용',
  },
  {
    value: 'CFS 비용',
    label: 'CFS 비용',
  },
  {
    value: '핸들링 비용',
    label: '핸들링 비용',
  },
  {
    value: '통관 수수료',
    label: '통관 수수료',
  },
];

export const getCostListByType = (dummy: GetICompareDto, type: string) => {
  switch (type) {
    case 'THC 비용':
      return dummy.result.thcCostList;
    case 'CIC 비용':
      return dummy.result.handlingCostList;
    case 'CFS 비용':
      return dummy.result.cfsCostList;
    case '통관 수수료':
      return dummy.result.listStatusCostList;
    case '실행 비용':
      return dummy.result.customsClearanceCostList;
    case '핸들링 비용':
      return dummy.result.truckingCostList;
    default:
      return [];
  }
};

export const barColors = [COLORS.main, COLORS.point, COLORS.g3];
