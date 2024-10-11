import { ResponseDto, getAsync, postAsync } from '../common';

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

export type PostICalculateDto = ResponseDto<number>;

/*
예상 견적서 조회
*/
export const postCalculate = async (req_body: CargosContent, at: string) => {
  const url = `/cargos/calculate`;
  const response = await postAsync<PostICalculateDto, CargosContent>(
    url,
    req_body,
    at,
  );
  return response;
};
