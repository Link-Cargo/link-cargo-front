import { postAsync, getAsync, ResponseDto, API } from '../common';
import axios, { AxiosResponse } from 'axios';

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

/*
토큰재발급
*/

export const getReToken = async (
  accessToken: string,
  refreshToken: string,
): Promise<PostILoginDto> => {
  try {
    const url = `/users/refresh`;

    const response: AxiosResponse<PostILoginDto> = await API.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken,
        accept: '*/*',
      },
    });
    return response.data;
  } catch (error) {
    console.error('토큰 재발급 실패:', error);
    throw error;
  }
};
