import { GetICompareDto } from '@/app/_apis/dashboard/getCompare';
import { COLORS } from '@/app/_constant/color';
import { formatDate } from '../reserve-list/utill';

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

export const getCostListByType = (data: GetICompareDto, type: string) => {
  switch (type) {
    case 'THC 비용':
      return data?.result.thcCostList;
    case 'CIC 비용':
      return data?.result.handlingCostList;
    case 'CFS 비용':
      return data?.result.cfsCostList;
    case '통관 수수료':
      return data?.result.listStatusCostList;
    case '실행 비용':
      return data?.result.customsClearanceCostList;
    case '핸들링 비용':
      return data?.result.truckingCostList;
    default:
      return [];
  }
};

export const barColors = [COLORS.main, COLORS.point, COLORS.g3];

export function formatQuoteListEl(item: {
  rawQuotationId: string;
  exportPort: string;
  importPort: string;
  ETD: number[];
  requestDate: number[];
}) {
  return {
    text: `${item.exportPort} → ${item.importPort} | ETD: ${formatDate(item.ETD)} | 요청일: ${formatDate(item.requestDate)}`,
    importPort: item.importPort, // 입국항 이름
    exportPort: item.exportPort, // 출국항 이름
    ETD: formatDate(item.ETD),
  };
}

export function formatWishExportDate(
  monthDifference: number,
  dateArray: number[],
): string {
  const [year, month, day] = dateArray;

  const newMonth = month + monthDifference;

  const newYear = year + Math.floor((newMonth - 1) / 12);
  const adjustedMonth = ((newMonth - 1) % 12) + 1;

  const newDate = new Date(Date.UTC(newYear, adjustedMonth - 1, day));

  const formattedYear = newDate.getUTCFullYear();
  const formattedMonth = String(newDate.getUTCMonth() + 1).padStart(2, '0');
  const formattedDay = String(newDate.getUTCDate()).padStart(2, '0');

  return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}
