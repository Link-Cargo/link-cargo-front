import { ResponseDto, getAsync } from '../common';

export interface ResultData {
  dateDifference: number;
  indexDifference: number;
  estimatedCost: number;
  scheduleInfos: string[];
}

export type GetIRecommendationDto = ResponseDto<ResultData>;

/*
현재 달을 기준으로 6개월 동안의 운임비용이 가장 적을때의 선박 스케줄과 예상 비용 정보를 조회 
*/
export const getRecommendation = async (at: string) => {
  const url = `/dashboards/recommendation?quotationId=66c8cca4d57e4f6fd83d8b80`;
  const response = await getAsync<GetIRecommendationDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};
