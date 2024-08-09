import { postAsync, ResponseDto } from './common';

interface LoginContent {
  email: string;
  password: string;
}

interface ResultData {
  accessToken: string;
  refreshToken: string;
}

type GetILoginContentDto = ResponseDto<ResultData>;

const tempAT =
  'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6OCwiZW1haWwiOiJzaWt5dW5nQGdtYWlsLmNvbSIsImlhdCI6MTcyMzE2NTM3NCwiZXhwIjoxNzIzMjUxNzc0fQ.OqnGd8T_wYQkeXFtLSvnGj2yfzfgzkBGHjqiR6GbAig';

export const postLogin = async (req_body: LoginContent) => {
  try {
    const response = await postAsync<GetILoginContentDto, LoginContent>(
      `/users/login`,
      req_body,
      tempAT,
    );
    return response.result;
  } catch (error) {
    console.error('에러:', error);
    throw error;
  }
};
