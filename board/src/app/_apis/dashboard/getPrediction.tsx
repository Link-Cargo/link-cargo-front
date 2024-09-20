import { ResponseDto, getAsync } from '../common';

export interface ResultData {
  predictions: {
    [key: string]: number;
  };
  exportPortName: string;
  importPortName: string;
}

export interface PortContent {
  exportPortId: number;
  importPortId: number;
}

export type GetIPredictionDto = ResponseDto<ResultData>;

/*
운임 비용 관련 그래프 정보를 조회
*/
export const getPrediction = async (at: string) => {
  const url = `/dashboards/prediction?exportPortId=1&importPortId=2`;
  const response = await getAsync<GetIPredictionDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};
