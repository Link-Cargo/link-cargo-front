import { ResponseDto, getAsync } from '../common';

export interface ResultData {
  rawQuotationInfoList: {
    rawQuotationId: string;
    exportPort: string;
    importPort: string;
    ETD: number[];
    requestDate: number[];
  }[];
}

export type GetIUserRawQuotationDto = ResponseDto<ResultData>;

/*
유저 원시 견적서 조회
*/
export const getUserRawQuotation = async (at: string) => {
  const url = `/dashboards/list`;
  const response = await getAsync<GetIUserRawQuotationDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};
