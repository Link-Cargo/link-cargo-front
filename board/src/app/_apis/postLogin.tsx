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

export const postLogin = async (req_body: LoginContent) => {
  try {
    const response = await postAsync<GetILoginContentDto, LoginContent>(
      `/users/login`,
      req_body,
      undefined,
    );

    if (response && response.result && response.result.accessToken) {
      localStorage.setItem('link-cargo-at', response.result.accessToken);
    }

    return response.result;
  } catch (error) {
    console.error('에러:', error);
    throw error;
  }
};
