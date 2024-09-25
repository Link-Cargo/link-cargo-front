import { postAsync, ResponseDto } from '../common';

export interface CargosInfo {
  productName: string;
  hsCode: string;
  additionalNotes: string;
  totalQuantity: number | null;
  quantityPerBox: number | null;
  boxSize: {
    width: number | null;
    height: number | null;
    depth: number | null;
  };
  weight: number | null;
  value: number | null;
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

/*
화물 여러개 추가
*/
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
