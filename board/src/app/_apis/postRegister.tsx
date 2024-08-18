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

export const postRegister = async (req_body: RegisterContent) => {
  try {
    const response = await postAsync<GetIRegisterContentDto, RegisterContent>(
      `/users/register`,
      req_body,
      process.env.NEXT_PUBLIC_TEMP_AT,
    );
    return response.result;
  } catch (error) {
    console.error('에러:', error);
    throw error;
  }
};
