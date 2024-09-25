import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { OnboardApiService } from './onboard';
import {
  saveTokenToLocalStorage,
  getTokenFromLocalStorage,
  handleLogout,
} from '../_utils/auth';

/*
[[ AxiosInstance 생성 ]]
*/
export const API: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

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
          errorMessages?.[error.response.data.msg] ??
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

    const response = await API.get<T, AxiosResponse<T, D>, D>(path, {
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

    const response = await API.post<T, AxiosResponse<T, D>, D>(path, data, {
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
 * @param accessToken 엑세스 토큰 (옵션)
 * @param config `AxiosRequestConfig`
 * @param errorMessages status code에 따른 에러 메시지
 */
export async function deleteAsync<T, D>(
  path: string,
  accessToken?: string,
  config?: AxiosRequestConfig,
  errorMessages?: Record<number, string>,
): Promise<T> {
  try {
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {};

    const response = await API.delete<T, AxiosResponse<T, D>, D>(path, {
      headers: { ...headers, ...config?.headers },
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
 * @param accessToken 엑세스 토큰 (옵션)
 * @param config `AxiosRequestConfig`
 * @param errorMessages status code에 따른 에러 메시지
 */
export async function patchAsync<T, D>(
  path: string,
  accessToken?: string,
  data?: D,
  config?: AxiosRequestConfig,
  errorMessages?: Record<number, string>,
): Promise<T> {
  try {
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {};

    const response = await API.patch<T, AxiosResponse<T, D>, D>(path, data, {
      headers: { ...headers, ...config?.headers },
      ...config,
    });

    return response.data;
  } catch (error) {
    throw processError(error, errorMessages);
  }
}

/**
 * PUT 요청을 보내는 API 호출 함수
 * @param T 서버 응답 타입
 * @param D parameter 또는 body로 전달할 데이터의 타입
 *
 * @param path API Endpoint
 * @param accessToken 엑세스 토큰 (옵션)
 * @param config `AxiosRequestConfig`
 * @param errorMessages status code에 따른 에러 메시지
 */
export async function putAsync<T, D>(
  path: string,
  accessToken?: string,
  data?: D,
  config?: AxiosRequestConfig,
  errorMessages?: Record<number, string>,
): Promise<T> {
  try {
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {};

    const response = await API.put<T, AxiosResponse<T, D>, D>(path, data, {
      headers: { ...headers, ...config?.headers },
      ...config,
    });

    return response.data;
  } catch (error) {
    throw processError(error, errorMessages);
  }
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// 토큰 갱신을 기다리는 함수
function subscribeTokenRefresh(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

// 갱신된 토큰을 모든 대기 중인 요청에 전달
function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}
// axios 응답 interceptor
API.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error) => {
    if (error.response.status === 401) {
      const originalRequest = error.config;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { accessToken, refreshToken } =
            await getTokenFromLocalStorage();

          const res = await OnboardApiService.getReToken(
            accessToken,
            refreshToken,
          );

          if (res) {
            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            } = res.result;

            // 갱신된 토큰을 로컬 스토리지에 저장
            saveTokenToLocalStorage(newAccessToken, newRefreshToken);

            // 모든 대기 중인 요청을 재시도
            onRefreshed(newAccessToken);

            isRefreshing = false;

            // 원래 요청을 재시도
            return axios.request({
              ...originalRequest,
              headers: {
                ...originalRequest.headers,
                Authorization: `Bearer ${newAccessToken}`,
              },
            });
          }
        } catch (err) {
          handleLogout();
        } finally {
          isRefreshing = false;
        }
      } else {
        // 이미 토큰 갱신 중이라면 대기
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            // 대기 중이던 요청을 재시도
            resolve(
              axios.request({
                ...originalRequest,
                headers: {
                  ...originalRequest.headers,
                  Authorization: `Bearer ${token}`,
                },
              }),
            );
          });
        });
      }
    }
    return Promise.reject(error);
  },
);
