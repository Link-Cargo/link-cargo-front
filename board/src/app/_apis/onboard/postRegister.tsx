import { postAsync, ResponseDto } from '../common';

export enum ROLE {
  CONSIGNOR,
  FORWARDER,
  OTHER,
}

export interface RegisterContent {
  role: string[];
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName: string;
  jobTitle: string;
  businessNumber: string;
}

export interface ResultData {
  id: number;
}

export type PostIRegisterDto = ResponseDto<ResultData>;

export const postRegister = async (req_body: RegisterContent, at: string) => {
  const url = `/users/register`;
  const response = await postAsync<PostIRegisterDto, RegisterContent>(
    url,
    req_body,
    at,
  );
  return response;
};
