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
export const getPrediction = async (
  at: string,
  importId: number,
  exportId: number,
) => {
  const url = `/dashboards/prediction?exportPortId=${exportId}&importPortId=${importId}`;
  const response = await getAsync<GetIPredictionDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};
