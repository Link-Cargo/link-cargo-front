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
  exportPortId: any;
  importPortId: any;
  wishExportDate: string;
  incoterms: string;
  cargos: CargosInfo[];
}

export interface ResultData {
  cargoIds: string[];
}

export type GetICargosContentDto = ResponseDto<ResultData>;

export const postCargos = async (
  req_body: CargosContent,
  at: string,
): Promise<ResponseDto<ResultData>> => {
  const url = `/cargos`;
  const response = await postAsync<ResponseDto<ResultData>, CargosContent>(
    url,
    req_body,
    at,
  );
  return response;
};
