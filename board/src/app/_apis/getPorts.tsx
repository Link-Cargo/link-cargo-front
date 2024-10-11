import { ResponseDto, getAsync } from './common';

export enum PortType {
  IMPORT = 'IMPORT',
  EXPORT = 'EXPORT',
}

interface ResultData {
  id: number;
  name: string;
  type: PortType;
}

interface typeContent {
  type: PortType;
}

export type GetIPortDto = ResponseDto<ResultData[]>;

/*
포트 조회
*/
export const getPorts = async (type: typeContent, at: string) => {
  const url = `/ports/search?type=${type.type}`;
  const response = await getAsync<GetIPortDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};

export const getPortsAll = async () => {
  const url = `/ports`;
  const response = await getAsync<GetIPortDto, undefined>(
    url,
    undefined,
    undefined,
    undefined,
  );
  return response;
};
