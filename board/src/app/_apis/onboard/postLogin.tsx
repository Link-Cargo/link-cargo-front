import { postAsync, ResponseDto } from '../common';

export interface LoginContent {
  email: string;
  password: string;
}

export interface ResultData {
  accessToken: string;
  refreshToken: string;
}

export type PostILoginDto = ResponseDto<ResultData>;

export const postLogin = async (req_body: LoginContent) => {
  try {
    const response = await postAsync<PostILoginDto, LoginContent>(
      `/users/login`,
      req_body,
      undefined,
    );

    return response;
  } catch (error) {
    console.error('에러:', error);
    throw error;
  }
};
