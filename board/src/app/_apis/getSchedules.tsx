import { ResponseDto, getAsync } from './common';

export interface Schedule {
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
}

/*
ETD와 ETA 응답 형식이 달라서 따로 인터페이스 정의함
*/
export interface ScheduleId {
  id: number;
  exportPortId: number;
  importPortId: number;
  imageUrl: string;
  carrier: string;
  vessel: string;
  ETD: number[];
  ETA: number[];
  transportType: 'DIRECT' | 'TRANSSHIPMENT';
  transitTime: 0;
  documentCutOff: string;
  cargoCutOff: string;
  created_at: string;
  updated_at: string;
}

export interface ResultData {
  schedules: Schedule[];
  currentPage: 0;
  totalPages: 0;
  totalElements: 0;
}

export type GetISchedulesDto = ResponseDto<ResultData>;
export type GetIScheduleDto = ResponseDto<ScheduleId>;

/*
모든 선박 스케쥴 리스트 조회
*/
export const getSchedules = async (at: string) => {
  const url = `/schedules?page=0&size=10`;
  const response = await getAsync<GetISchedulesDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};

/*
모든 선박 스케쥴 리스트 조회
*/
export const getScheduleId = async (scheduleId: number, at: string) => {
  const url = `/schedules/${scheduleId}`;
  const response = await getAsync<GetIScheduleDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};
