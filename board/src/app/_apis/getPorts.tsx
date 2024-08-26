import { ResponseDto, getAsync } from './common';

interface ResultData {
  id: number;
  name: string;
  type: 'IMPORT' | 'EXPORT';
}

interface typeContent {
  type: 'IMPORT' | 'EXPORT';
}

type GetISummaryDto = ResponseDto<ResultData[]>;

/*
포트 조회
*/
export const getPorts = async (type?: 'IMPORT' | 'EXPORT') => {
  const url = `/ports/search?type=${type}`;
  const response = await getAsync<GetISummaryDto, undefined>(
    url,
    process.env.NEXT_PUBLIC_TEMP_AT,
    undefined,
  );
  return response.result;
};
