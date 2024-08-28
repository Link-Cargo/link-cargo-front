import { ResultData } from '@/app/_apis/getSchedules';

export function formatDate(arr: number[]): string {
  const date = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3], arr[4]));
  return date.toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });
}

export function formatTransitTime(
  transitTime: number,
  transportType: string,
): string {
  return transportType === 'DIRECT'
    ? `${transitTime}일 (직항)`
    : `${transitTime}일 (환적)`;
}

export function processData(data: any) {
  return {
    imageUrl: data.imageUrl,
    선명: data.vessel,
    ETD: formatDate(data.ETD),
    ETA: formatDate(data.ETA),
    소요일: formatTransitTime(data.transitTime, data.transportType),
    서류마감일: formatDate(data.documentCutOff),
    화물마감일: formatDate(data.cargoCutOff),
  };
}

export const schedule = {
  schedules: [
    {
      id: 1,
      exportPortId: 1,
      importPortId: 2,
      imageUrl:
        'https://link-cargo-bucket.s3.ap-northeast-2.amazonaws.com/Image/42fa5ec8-db10-4c66-8037-58abb479e820.jpg',
      carrier: 'Carrier A',
      vessel: 'Vessel Alpha',
      ETD: [2024, 8, 20, 8, 0],
      ETA: [2024, 8, 27, 12, 0],
      transportType: 'DIRECT',
      transitTime: 7,
      documentCutOff: [2024, 8, 18, 16, 0],
      cargoCutOff: [2024, 8, 19, 16, 0],
      created_at: [2024, 8, 15, 12, 29, 54, 661704000],
      updated_at: [2024, 8, 15, 12, 29, 54, 661704000],
    },
    {
      id: 2,
      exportPortId: 1,
      importPortId: 2,
      imageUrl:
        'https://link-cargo-bucket.s3.ap-northeast-2.amazonaws.com/Image/70c40c9b-3dc0-46d9-aafc-db4df74cab99.jpg',
      carrier: 'Carrier C',
      vessel: 'Vessel Gamma',
      ETD: [2024, 9, 15, 6, 0],
      ETA: [2024, 9, 22, 20, 0],
      transportType: 'DIRECT',
      transitTime: 7,
      documentCutOff: [2024, 9, 13, 12, 0],
      cargoCutOff: [2024, 9, 14, 12, 0],
      created_at: [2024, 8, 15, 12, 31, 23, 467951000],
      updated_at: [2024, 8, 15, 12, 31, 23, 467951000],
    },
    {
      id: 3,
      exportPortId: 1,
      importPortId: 2,
      imageUrl:
        'https://link-cargo-bucket.s3.ap-northeast-2.amazonaws.com/Image/40909de2-a49f-492f-994b-fb9fc97c6c45.jpg',
      carrier: 'Carrier A2',
      vessel: 'Vessel Alpha',
      ETD: [2024, 8, 20, 8, 0],
      ETA: [2024, 8, 27, 12, 0],
      transportType: 'DIRECT',
      transitTime: 7,
      documentCutOff: [2024, 8, 18, 16, 0],
      cargoCutOff: [2024, 8, 19, 16, 0],
      created_at: [2024, 8, 15, 12, 37, 50, 349212000],
      updated_at: [2024, 8, 15, 12, 37, 50, 349212000],
    },
    {
      id: 4,
      exportPortId: 1,
      importPortId: 2,
      imageUrl:
        'https://link-cargo-bucket.s3.ap-northeast-2.amazonaws.com/Image/70c40c9b-3dc0-46d9-aafc-db4df74cab99.jpg',
      carrier: 'Carrier A22',
      vessel: 'Vessel Alpha',
      ETD: [2024, 8, 20, 8, 0],
      ETA: [2024, 8, 27, 12, 0],
      transportType: 'DIRECT',
      transitTime: 7,
      documentCutOff: [2024, 8, 18, 16, 0],
      cargoCutOff: [2024, 8, 19, 16, 0],
      created_at: [2024, 8, 15, 13, 19, 42, 660960000],
      updated_at: [2024, 8, 15, 13, 19, 42, 660960000],
    },
    {
      id: 5,
      exportPortId: 1,
      importPortId: 2,
      imageUrl:
        'https://link-cargo-bucket.s3.ap-northeast-2.amazonaws.com/Image/40909de2-a49f-492f-994b-fb9fc97c6c45.jpg',
      carrier: 'string',
      vessel: 'string',
      ETD: [2024, 8, 23, 17, 52, 35, 91000000],
      ETA: [2024, 8, 23, 17, 52, 35, 91000000],
      transportType: 'DIRECT',
      transitTime: 1,
      documentCutOff: [2024, 8, 23, 17, 52, 35, 91000000],
      cargoCutOff: [2024, 8, 23, 17, 52, 35, 91000000],
      created_at: [2024, 8, 23, 17, 53, 14, 746894000],
      updated_at: [2024, 8, 23, 17, 53, 14, 746894000],
    },
    {
      id: 6,
      exportPortId: 1,
      importPortId: 2,
      imageUrl:
        'https://link-cargo-bucket.s3.ap-northeast-2.amazonaws.com/Image/70c40c9b-3dc0-46d9-aafc-db4df74cab99.jpg',
      carrier: 'string',
      vessel: 'string',
      ETD: [2024, 8, 25, 17, 52, 35, 91000000],
      ETA: [2024, 8, 25, 17, 52, 35, 91000000],
      transportType: 'DIRECT',
      transitTime: 1,
      documentCutOff: [2024, 8, 23, 17, 52, 35, 91000000],
      cargoCutOff: [2024, 8, 23, 17, 52, 35, 91000000],
      created_at: [2024, 8, 23, 19, 26, 56, 222742000],
      updated_at: [2024, 8, 23, 19, 26, 56, 222742000],
    },
  ],
  currentPage: 0,
  totalPages: 1,
  totalElements: 6,
};
