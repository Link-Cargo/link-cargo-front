import { postAsync, ResponseDto } from '../common';

export interface ReqCargosContent {
  cargoIds: string[];
}

export type postIRawQuotationDto = ResponseDto<string>;

/*
원시 견적서 생성
*/
export const postRawQuotation = async (
  req_body: ReqCargosContent,
  at: string,
): Promise<postIRawQuotationDto> => {
  const url = `/quotations/raw`;
  const response = await postAsync<postIRawQuotationDto, ReqCargosContent>(
    url,
    req_body,
    at,
  );
  return response;
};
