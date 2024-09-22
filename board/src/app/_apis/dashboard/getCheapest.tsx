import { ResponseDto, getAsync } from '../common';

export interface ResultData {
  firmName: string;
  totalCost: number;
  forwarderName: string;
  forwarderEmail: string;
  forwarderTel: string;
  quotationInfoResponse: {
    carrier: string;
    exportPort: string;
    importPort: string;
    freightLCL: number;
    freightCBM: number;
    freightCost: number;
    transitTime: number;
    scheduleRemark: string;
    THC: {
      unit: string;
      remark: string;
      lcl: number;
    };
    CIC: {
      unit: string;
      remark: string;
      lcl: number;
    };
    DO_FEE: {
      unit: string;
      remark: string;
      lcl: number;
    };
    HANDLING_FEE: {
      unit: string;
      remark: string;
      lcl: number;
    };
    CFS_CHARGE: {
      unit: string;
      remark: string;
      lcl: number;
    };
    LIFT_STATUS: {
      unit: string;
      remark: string;
      lcl: number;
    };
    CUSTOMS_CLEARANCE_FEE: {
      unit: string;
      remark: string;
      lcl: number;
    };
    WARFAGE_FEE: {
      unit: string;
      remark: string;
      lcl: number;
    };
    TRUCKING: {
      unit: string;
      remark: string;
      lcl: number;
    };
    chargeExportCost: number;
    totalCost: number;
  };
}

export type GetICheapestDto = ResponseDto<ResultData>;

/*
운임비용이 가장 적은 견적서를 조회
*/
export const getCheapest = async (at: string, RQId?: string) => {
  const url = `/dashboards/cheapest?rawQuotationId=66ed9921d1c9de05d5906000`;
  const response = await getAsync<GetICheapestDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};
