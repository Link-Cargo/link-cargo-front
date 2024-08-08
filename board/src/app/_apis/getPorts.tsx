import { ResponseDto, getAsync } from './common';

interface ResultData {
  id: number;
  name: string;
  type: string;
}

type GetIPortsDto = ResponseDto<ResultData[]>;

const tempAT =
  'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6OCwiZW1haWwiOiJzaWt5dW5nQGdtYWlsLmNvbSIsImlhdCI6MTcyMzEwMjAwNiwiZXhwIjoxNzIzMTg4NDA2fQ.okTGUkABu5L7V-mJgeJeSSCsQQIm8dbwet9vBXAGkXI';

export const getPorts = async () => {
  const url = `/ports`;
  const response = await getAsync<GetIPortsDto, undefined>(
    url,
    tempAT,
    undefined,
    undefined,
  );
  return response.result;
};
