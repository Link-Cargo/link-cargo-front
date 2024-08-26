import { ResponseDto, getAsync } from '../common';

export interface ResultData {
  percent: number;
  status: string;
  description: string;
}

type GetICongestionDto = ResponseDto<ResultData>;

/*
입국항의 혼잡도 정보를 조회
*/
export const getCongestion = async () => {
  const url = `dashboards/port/congestion?importPortId=2`;
  const response = await getAsync<GetICongestionDto, undefined>(
    url,
    process.env.NEXT_PUBLIC_TEMP_AT,
    undefined,
    undefined,
  );
  return response.result;
};
