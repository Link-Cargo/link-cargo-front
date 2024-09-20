import { ResponseDto, getAsync } from '../common';

export interface Notification {
  id: number;
  userId: number;
  title: string;
  content: string;
  isRead: boolean;
  date?: string; // TODO 서버 요청하기
  type?: string[];
}

export interface ResultData {
  notifications?: Notification[];
  totalCount: number;
  page: number;
  per_page: number;
}

export type GetINotiDto = ResultData;

/*
알림 목록 조회
*/
export const getNoti = async (at: string): Promise<GetINotiDto> => {
  const url = `/notifications?page=0&size=10`;
  const response = await getAsync<GetINotiDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};
