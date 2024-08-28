import { postAsync, ResponseDto } from './common';

export interface CargosInfo {
  productName: string;
  hsCode: string;
  additionalNotes: string;
  totalQuantity: number;
  quantityPerBox: number;
  boxSize: {
    width: number;
    height: number;
    depth: number;
  };
  weight: number;
  value: number;
}

export interface CargosContent {
  exportPortId: number | string;
  importPortId: number | string;
  wishExportDate: string;
  incoterms: string;
  cargos: CargosInfo[];
}

interface ResultData {
  cargoIds: string[];
}

type GetICargosContentDto = ResponseDto<ResultData>;

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
