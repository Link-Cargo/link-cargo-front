import { ResponseDto, getAsync } from './common';

export interface ResultData {
  schedules: [
    {
      id: number;
      exportPortId: number;
      importPortId: number;
      imageUrl: string;
      carrier: string;
      vessel: string;
      ETD: string;
      ETA: string;
      transportType: 'DIRECT' | 'TRANSSHIPMENT';
      transitTime: 0;
      documentCutOff: string;
      cargoCutOff: string;
      created_at: string;
      updated_at: string;
    },
  ];
  currentPage: 0;
  totalPages: 0;
  totalElements: 0;
}

type GetISchedulesDto = ResponseDto<ResultData>;

/*
모든 선박 스케쥴 리스트 조회
*/
export const getSchedules = async () => {
  const url = `/schedules?page=0&size=10`;
  const response = await getAsync<GetISchedulesDto, undefined>(
    url,
    process.env.NEXT_PUBLIC_TEMP_AT,
    undefined,
  );
  return response.result;
};
