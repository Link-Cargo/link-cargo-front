import { ResponseDto, getAsync } from '../common';

export interface ResultData {
  percent: number;
  status: string;
  description: string;
}

export type GetICongestionDto = ResponseDto<ResultData>;

/*
입국항의 혼잡도 정보를 조회
*/
export const getCongestion = async (at: string, importId: number) => {
  const url = `dashboards/port/congestion?importPortId=${importId}`;
  const response = await getAsync<GetICongestionDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};
