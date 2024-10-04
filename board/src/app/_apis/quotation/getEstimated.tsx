import { ResponseDto, getAsync } from '../common';

export interface ResultData {
  estimatedQuotations: {
    carrier: string;
    ETD: number[];
    ETA: number[];
    forwardingName: string;
  }[];
  count: number;
}

export type GetIEstimatedDto = ResponseDto<ResultData>;

/*
예상 견적서 조회
*/
export const getEstimated = async (quotationIds: string[], at: string) => {
  const queryString = quotationIds.map((id) => `quotationIds=${id}`).join('&');
  const url = `/quotations/estimated?${queryString}`;
  const response = await getAsync<GetIEstimatedDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};
