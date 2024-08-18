import { ResponseDto, getAsync } from './common';

interface ResultData {
  schedules: SchedulesData[];
}

interface SchedulesData {
  id: number;
  exportPortId: number;
  importPortId: number;
  carrier: string;
  vessel: string;
  ETD: string;
  ETA: string;
  transportType: 'DIRECT' | 'TRANSSHIPMENT';
  transitTime: number;
  documentCutOff: string;
  cargoCutOff: string;
  created_at: string;
  updated_at: string;
}

type GetIScheduleDto = ResponseDto<ResultData>;

export const getSchedule = async () => {
  const url = `/schedules`;
  const response = await getAsync<GetIScheduleDto, undefined>(
    url,
    process.env.NEXT_PUBLIC_TEMP_AT,
    undefined,
    undefined,
  );
  return response.result;
};
