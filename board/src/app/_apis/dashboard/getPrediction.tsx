import { ResponseDto, getAsync } from '../common';

interface ResultData {
  predictions: {
    additionalProp1: number;
    additionalProp2: number;
    additionalProp3: number;
  };
  exportPortName: string;
  importPortName: string;
}

interface PortContent {
  exportPortId: number;
  importPortId: number;
}

type GetIPredictionDto = ResponseDto<ResultData[]>;

/*
운임 비용 관련 그래프 정보를 조회
*/
export const getPrediction = async (req_body: PortContent) => {
  const url = `/dashboards/prediction`;
  const response = await getAsync<GetIPredictionDto, undefined>(
    url,
    process.env.NEXT_PUBLIC_TEMP_AT,
    { params: req_body },
    undefined,
  );
  return response.result;
};
