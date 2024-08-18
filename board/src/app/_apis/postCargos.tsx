import { postAsync, ResponseDto } from './common';

interface CargosContent {
  exportPortId: number;
  importPortId: number;
  wishExportDate: string;
  incoterms: string;
  cargos: [
    {
      productName: string;
      hsCode: string;
      totalQuantity: number;
      quantityPerBox: number;
      boxSize: {
        width: number;
        height: number;
        depth: number;
      };
      weight: number;
      value: number;
    },
  ];
}

// interface ResultData {}

type GetICargosContentDto = ResponseDto<string>;

export const postCargos = async (req_body: CargosContent) => {
  try {
    const response = await postAsync<GetICargosContentDto, CargosContent>(
      `/cargos`,
      req_body,
      process.env.NEXT_PUBLIC_TEMP_AT,
    );
    return response.result;
  } catch (error) {
    console.error('에러:', error);
    throw error;
  }
};
