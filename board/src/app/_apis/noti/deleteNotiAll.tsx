import { ResponseDto, deleteAsync } from '../common';

export type DeleteINotiDto = ResponseDto<any>;

/*
알림 목록 전체 삭제
*/
export const deleteNotiAll = async (at: string): Promise<DeleteINotiDto> => {
  const url = `/notifications`;
  const response = await deleteAsync<DeleteINotiDto, undefined>(url, at);
  return response;
};
