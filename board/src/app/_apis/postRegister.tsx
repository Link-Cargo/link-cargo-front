import { postAsync, ResponseDto } from './common';

export enum ROLE {
  CONSIGNOR,
  FORWARDER,
  OTHER,
}

interface RegisterContent {
  role: string[];
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName: string;
  jobTitle: string;
  businessNumber: string;
}

interface ResultData {
  id: number;
}

type GetIRegisterContentDto = ResponseDto<ResultData>;

const tempAT =
  'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6OCwiZW1haWwiOiJzaWt5dW5nQGdtYWlsLmNvbSIsImlhdCI6MTcyMzE2NTM3NCwiZXhwIjoxNzIzMjUxNzc0fQ.OqnGd8T_wYQkeXFtLSvnGj2yfzfgzkBGHjqiR6GbAig';

export const postRegister = async (req_body: RegisterContent) => {
  try {
    const response = await postAsync<GetIRegisterContentDto, RegisterContent>(
      `/users/register`,
      req_body,
      tempAT,
    );
    return response.result;
  } catch (error) {
    console.error('에러:', error);
    throw error;
  }
};
