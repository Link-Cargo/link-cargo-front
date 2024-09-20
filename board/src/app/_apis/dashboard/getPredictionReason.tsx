import { ResponseDto, getAsync } from '../common';

export interface ResultData {
  predictionReasons: [
    {
      date: [
        {
          month: string;
          year: string;
        },
        {
          month: string;
          year: string;
        },
      ];
      status: string;
      reason: string;
    },
  ];
}

export type GetIPredictionReasonDto = ResponseDto<ResultData>;

/*
운임 비용 관련 이유 정보를 조회
*/
export const getPredictionReason = async (at: string) => {
  const url = `/dashboards/prediction/reason`;
  const response = await getAsync<GetIPredictionReasonDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};
