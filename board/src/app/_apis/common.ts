import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

/*
[[ API 공통 응답 타입 ]]
*/

export interface ResponseDto<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

/*
[[ API 에러 처리 함수 ]]
*/

/**
 * API 호출 함수에서 발생하는 에러 타입
 * @param T info의 타입
 */
export interface ApiError {
  isSuccess: boolean;
  code: string;
  message?: string;
}

/**
 * API 호출 함수의 반환 타입
 * @param T 호출에 성공하면 가져오는 데이터의 타입
 */

/**
 * API 호출 함수의 에러를 받아 클라이언트의 에러 형식으로 가공하는 함수
 * @param error 처리할 에러
 * @param getErrorMessage status code에 따라 에러 메시지를 결정하는 함수
 */
function processError(
  error: unknown,
  errorMessages?: Record<number, string>,
): ApiError {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return {
        isSuccess: error.response.data.isSuccess,
        code: error.response.data.status,
        message:
          errorMessages?.[error.response.data.message] ??
          '문제가 발생했어요. 다시 시도하거나 문의해 주세요.',
      };
    }
  }

  // 케이스 분류 실패
  return {
    isSuccess: false,
    code: '-1',
    message: '문제가 발생했어요. 다시 시도하거나 문의해 주세요.',
  };
}

/*
[[ API 호출 함수 ]]
*/

/**
 * GET 요청을 보내는 API 호출 함수
 * @param T 서버 응답 타입
 * @param D parameter 또는 body로 전달할 데이터의 타입
 *
 * @param path API Endpoint
 * @param accessToken 엑세스 토큰 (옵션)
 * @param config `AxiosRequestConfig`
 * @param errorMessages status code에 따른 에러 메시지
 
 */
export async function getAsync<T, D>(
  path: string,
  accessToken?: string,
  config?: AxiosRequestConfig<D>,
  errorMessages?: Record<number, string>,
): Promise<T> {
  try {
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {};

    const response = await axios.get<T, AxiosResponse<T, D>, D>(path, {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      responseType: 'json',
      headers: { ...headers, ...config?.headers },
      ...config,
    });

    return response.data;
  } catch (error) {
    // return을 쓰면 resolve가 됨
    throw processError(error, errorMessages);
  }
}

/**
 * POST 요청을 보내는 API 호출 함수
 * @param T 서버 응답 타입
 * @param D parameter 또는 body로 전달할 데이터의 타입
 *
 * @param path API Endpoint
 * @param data body로 전달할 데이터
 * @param accessToken 엑세스 토큰 (옵션)
 * @param config `AxiosRequestConfig`
 * @param errorMessages status code에 따른 에러 메시지
 */
export async function postAsync<T, D>(
  path: string,
  data?: D,
  accessToken?: string,
  config?: AxiosRequestConfig,
  errorMessages?: Record<number, string>,
): Promise<T> {
  try {
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {};

    const response = await axios.post<T, AxiosResponse<T, D>, D>(path, data, {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      responseType: 'json',
      headers: { ...headers, ...config?.headers },
      ...config,
    });

    return response.data;
  } catch (error) {
    throw processError(error, errorMessages);
  }
}

/**
 * DELETE 요청을 보내는 API 호출 함수
 * @param T 서버 응답 타입
 * @param D parameter 또는 body로 전달할 데이터의 타입
 *
 * @param path API Endpoint
 * @param config `AxiosRequestConfig`
 * @param errorMessages status code에 따른 에러 메시지
 */
export async function deleteAsync<T, D>(
  path: string,
  config?: AxiosRequestConfig,
  errorMessages?: Record<number, string>,
): Promise<T> {
  try {
    const response = await axios.delete<T, AxiosResponse<T, D>, D>(path, {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      responseType: 'json',
      ...config,
    });

    return response.data;
  } catch (error) {
    throw processError(error, errorMessages);
  }
}

/**
 * PATCH 요청을 보내는 API 호출 함수
 * @param T 서버 응답 타입
 * @param D parameter 또는 body로 전달할 데이터의 타입
 *
 * @param path API Endpoint
 * @param config `AxiosRequestConfig`
 * @param errorMessages status code에 따른 에러 메시지
 */
export async function patchAsync<T, D>(
  path: string,
  data?: D,
  config?: AxiosRequestConfig,
  errorMessages?: Record<number, string>,
): Promise<T> {
  try {
    const response = await axios.patch<T, AxiosResponse<T, D>, D>(path, data, {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      responseType: 'json',
      ...config,
    });

    return response.data;
  } catch (error) {
    throw processError(error, errorMessages);
  }
}
