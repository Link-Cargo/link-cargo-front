export interface 예약가능리스트객체 {
  schedules: 예약가능리스트배열[];
}
export interface 예약가능리스트배열 {
  id: number;
  exportPortId: number;
  importPortId: number;
  carrier: string;
  vessel: string;
  ETD: string;
  ETA: string;
  transportType: 'DIRECT' | 'TRANSSHIPMENT';
  transitTime: number;
  documentCutOff: string;
  cargoCutOff: string;
  created_at: string;
  updated_at: string;
}

export function formatDateString(dateString: string) {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const date = new Date(dateString);

  const year = String(date.getFullYear()).slice(2); // 연도에서 뒤의 두 자리만 추출
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
  const day = String(date.getDate()).padStart(2, '0'); // 일

  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${year}.${month}.${day}(${dayOfWeek})`;
}

const transportTypeMap = {
  DIRECT: '직항',
  TRANSSHIPMENT: '환적',
} as const;

export function formatTransitTime(
  transitTime: number,
  transportType: keyof typeof transportTypeMap,
): string {
  const transportTypeString = transportTypeMap[transportType];
  return `${transitTime}일 (${transportTypeString})`;
}
