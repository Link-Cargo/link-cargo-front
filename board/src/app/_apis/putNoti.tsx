import { ResponseDto, putAsync } from './common';

export type PutINotiDto = ResponseDto<{}>;

/*
알림 읽음으로 변경
*/
export const putNoti = async (id: number, at: string): Promise<PutINotiDto> => {
  const url = `/notifications/${id}/read`;
  const response = await putAsync<PutINotiDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};

export const putNotiAll = async (at: string): Promise<PutINotiDto> => {
  const url = `/notifications/read`;
  const response = await putAsync<PutINotiDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};
