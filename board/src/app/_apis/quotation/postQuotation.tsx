import { postAsync, ResponseDto } from '../common';

export interface ReqScheduleQuotationContent {
  scheduleId: number;
  rawQuotationId: string;
}

export type postIQuotationDto = ResponseDto<string[]>;

/*
화주 견적서 여러개 요청
*/
export const postQuotation = async (
  req_body: ReqScheduleQuotationContent[],
  at: string,
): Promise<postIQuotationDto> => {
  const url = `/quotations/bulk`;
  const response = await postAsync<
    postIQuotationDto,
    ReqScheduleQuotationContent[]
  >(url, req_body, at);
  return response;
};
