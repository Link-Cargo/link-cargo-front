import { ResponseDto, getAsync } from './common';

interface ResultData {
  id: number;
  name: string;
  type: string;
}

type GetIPortsDto = ResponseDto<ResultData[]>;

export const getPorts = async () => {
  const url = `/ports`;
  const response = await getAsync<GetIPortsDto, undefined>(
    url,
    process.env.NEXT_PUBLIC_TEMP_AT,
    undefined,
    undefined,
  );
  return response.result;
};

/*
[[ 사용 예시 ]]
*/

getPorts()
  .then((response) => {
    console.log('Ports data:', response);
  })
  .catch((error) => {
    console.error('Error fetching ports:', error);
  });
