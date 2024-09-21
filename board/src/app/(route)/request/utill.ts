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
