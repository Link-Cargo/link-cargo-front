export function formatDate(arr: number[]): string {
  // 시와 분이 없는 경우 기본값 0으로 설정
  const hours = arr[3] !== undefined ? arr[3] : 0;
  const minutes = arr[4] !== undefined ? arr[4] : 0;

  const date = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], hours, minutes));

  return date.toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });
}

export function formatTransitTime(
  transitTime: number,
  transportType: string,
): string {
  return transportType === 'DIRECT'
    ? `${transitTime}일 (직항)`
    : `${transitTime}일 (환적)`;
}

export function processData(data: any) {
  return {
    imageUrl: data.imageUrl,
    선명: data.vessel,
    ETD: formatDate(data.ETD),
    ETA: formatDate(data.ETA),
    소요일: formatTransitTime(data.transitTime, data.transportType),
    서류마감일: formatDate(data.documentCutOff),
    화물마감일: formatDate(data.cargoCutOff),
  };
}
