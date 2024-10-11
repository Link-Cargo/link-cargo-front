import { useRouter } from 'next/navigation';

/**
 * 공통 에러 핸들링 함수
 * @param error 에러 객체
 * @param router Next.js의 useRouter 객체
 */
const handleErrorAndRedirect = (error: any, router: any) => {
  console.error('에러 발생:', error);

  if (typeof window !== 'undefined') {
    router.push('/main');
  }

  throw error;
};
/**
 * 로컬 스토리지에서 토큰을 가져오는 함수
 */
export const getTokenFromLocalStorage = () => {
  try {
    // 클라이언트 환경인지 확인
    if (typeof window !== 'undefined') {
      const tokenData = localStorage.getItem('tokens');
      if (tokenData) {
        const { accessToken, refreshToken } = JSON.parse(tokenData);
        return { accessToken, refreshToken };
      }
    }
    return { accessToken: null, refreshToken: null };
  } catch (error) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return { accessToken: null, refreshToken: null };
  }
};

/**
 * 로컬 스토리지에 토큰 저장하는 함수
 */
export const saveTokenToLocalStorage = (
  accessToken: string,
  refreshToken: string,
) => {
  try {
    const tokenData = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    localStorage.setItem('tokens', JSON.stringify(tokenData));
  } catch (error) {
    window.location.href = '/login';
  }
};

/**
 * 로그아웃 처리 함수
 * 로컬 스토리지에 토큰 삭제하는 함수
 */
export const handleLogout = () => {
  // 로컬 스토리지에서 토큰 삭제
  localStorage.removeItem('tokens');
  console.log('로그아웃 성공');
  // 로그인 페이지로 리다이렉트
  // window.location.href = '/login';
};
