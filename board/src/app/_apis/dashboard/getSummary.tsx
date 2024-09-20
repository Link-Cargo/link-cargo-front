import { ResponseDto, getAsync } from '../common';

export interface ResultData {
  interests: string[];
  summary: string;
}

export type GetISummaryDto = ResponseDto<ResultData>;

/*
사용자의 관심사에 따른 뉴스 정보의 요약 정보를 조회
*/
export const getSummary = async (at: string) => {
  const url = `/dashboards/news/summary?interests=%ED%99%98%EC%9C%A8&interests=%EC%9A%B4%EC%9E%84&interests=%EC%88%98%EC%9E%85%EA%B5%AD'`;
  const response = await getAsync<GetISummaryDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};
