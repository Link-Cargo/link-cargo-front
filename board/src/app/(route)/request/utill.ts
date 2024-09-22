import { GetIPortDto } from '@/app/_apis/getPorts';

/**
 * 항구 name으로 항구 id를 반환하는 유틸리티 함수
 * @param portsData 검색할 전체 데이터 : GetIPortDto
 * @param name 검색할 항구 name
 */
export const getPortIdByName = (portsData: GetIPortDto, name: string) => {
  const port = portsData.result.find((port) => port.name === name);
  return port ? port.id : undefined;
};

/**
 * ISOString 날짜 형식을 반환하는 함수
 * @param raw 변경 전 날짜 형식 (XXXX-XX-XX)
 */
export const transformDate = (raw: string) => {
  const date = new Date(raw);
  return date.toISOString();
};

/**
 * 견적 요청 시 체크리스트 항목
 */
export const requestList = [
  '보험부보 희망',
  '해상수출 경험이 많이 없어요. 포워더의 친절한 설명을 원해요. ',
];

/**
 * 정수형 배열의 날짜 형식을 변환하고 범위로 반환하는 함수
 * @param ETD 변경 전 출발 시간 배열 [연, 월, 일, 시?, 분?]
 * @param ETA 변경 전 도착 시간 배열 [연, 월, 일, 시?, 분?]
 */
export function formatDateRange(ETD: number[], ETA: number[]): string {
  // Date 객체로 변환 (시, 분이 없을 경우 기본값 0 사용)
  const etdDate = new Date(
    ETD[0], // 연
    ETD[1] - 1, // 월 (0부터 시작하므로 -1)
    ETD[2], // 일
    ETD[3] !== undefined ? ETD[3] : 0, // 시 (기본값 0)
    ETD[4] !== undefined ? ETD[4] : 0, // 분 (기본값 0)
  );

  const etaDate = new Date(
    ETA[0], // 연
    ETA[1] - 1, // 월 (0부터 시작하므로 -1)
    ETA[2], // 일
    ETA[3] !== undefined ? ETA[3] : 0, // 시 (기본값 0)
    ETA[4] !== undefined ? ETA[4] : 0, // 분 (기본값 0)
  );

  // 날짜 형식을 'YY.MM.DD(요일)'로 변환하는 함수
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);
    const dayOfWeek = new Intl.DateTimeFormat('ko-KR', {
      weekday: 'short',
    }).format(date); // 요일 추출

    return `${year}.${month}.${day}(${dayOfWeek})`;
  };

  // ETD와 ETA 사이의 날짜 범위 포맷
  return `${formatDate(etdDate)} - ${formatDate(etaDate)}`;
}
