import { ResponseDto, getAsync } from '../common';

export interface CostListItem {
  [key: string]: number;
}

export interface QuotationInfoResponse {
  quotationId: string;
  originalQuotationId: string;
  quotationStatus: string;
  carrier: string;
  exportPort: string;
  importPort: string;
  freightLCL: number;
  freightCBM: number;
  freightCost: number;
  transitTime: number;
  scheduleRemark: string;
  THC: CostDetail;
  CIC: CostDetail;
  DO_FEE: CostDetail;
  HANDLING_FEE: CostDetail;
  CFS_CHARGE: CostDetail;
  LIFT_STATUS: CostDetail;
  CUSTOMS_CLEARANCE_FEE: CostDetail;
  WARFAGE_FEE: CostDetail;
  TRUCKING: CostDetail;
  chargeExportCost: number;
  totalCost: number;
}

export interface CostDetail {
  unit: string;
  remark: string;
  lcl: number;
}

export interface DashboardQuotationResponse {
  firmName: string;
  totalCost: number;
  forwarderId?: number;
  forwarderName: string;
  forwarderEmail: string;
  forwarderTel: string | null;
  particulars: string;
  quotationInfoResponse: QuotationInfoResponse;
}

export interface ResultData {
  quotationCount: number;
  dashboardQuotationResponseList: DashboardQuotationResponse[];
  thcCostList: CostListItem[];
  handlingCostList: CostListItem[];
  cfsCostList: CostListItem[];
  listStatusCostList: CostListItem[];
  customsClearanceCostList: CostListItem[];
  truckingCostList: CostListItem[];
}

export type GetICompareDto = ResponseDto<ResultData>;

/*
요청한 견적서를 포워더가 업데이트 한 후 견적서 끼리 비교
*/
export const getCompare = async (id: string, at: string) => {
  const url = `/dashboards/compare?rawQuotationId=${id}`;
  const response = await getAsync<GetICompareDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};
