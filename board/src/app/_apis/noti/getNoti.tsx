import { ResponseDto, getAsync } from '../common';

export interface Notification {
  id: number;
  userId: number;
  /** ADMIN: 클라이언트 더미용 타입 */
  type: 'MESSAGE' | 'AD' | 'QUOTATION' | 'ADMIN';
  title: string;
  content: string;
  buttonTitle: string;
  buttonUrl: string;
  createdAt: string;
  isRead: boolean;
  /** 클라이언트 더미용 타입 */
  add?: {
    content1: string;
    content2: string;
    content2_1: string;
    content3: string;
    content3_1: string;
    content4: string[];
  }[];
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
