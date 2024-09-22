import { ResponseDto, getAsync } from '../common';

export interface ResultData {
  user: {
    id: number;
    role: string; //TODO 이넘 변경
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profile: string;
    phoneNumber: string | null;
    companyName: string;
    jobTitle: string;
    businessNumber: string;
    status: string; //TODO 이넘 변경
    totalPrice: number;
  };
}

export type GetIUserDto = ResponseDto<ResultData>;

/*
로그인된 유저 정보 조회
*/
export const getUser = async (at: string): Promise<GetIUserDto> => {
  const url = `/users/profile`;
  const response = await getAsync<GetIUserDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};
