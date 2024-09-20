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
  forwarderName: string;
  forwarderEmail: string;
  forwarderTel: string | null;
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
  const url = `/dashboards/compare/${id}`;
  const response = await getAsync<GetICompareDto, undefined>(
    url,
    at,
    undefined,
    undefined,
  );
  return response;
};

/*
견적서 비교 더미데이터 : GetICompareDto
*/
export const dummy: GetICompareDto = {
  isSuccess: true,
  code: 'COMMON200',
  message: '성공입니다.',
  result: {
    quotationCount: 3,
    dashboardQuotationResponseList: [
      {
        firmName: '한성무역',
        totalCost: 0,
        forwarderName: 'string string',
        forwarderEmail: 'test@gmail.com',
        forwarderTel: '+53617531243380',
        quotationInfoResponse: {
          quotationId: '66c2f13681322169373e2f8f',
          originalQuotationId: '66c2f12d81322169373e2f8d',
          quotationStatus: 'DETAIL_INFO',
          carrier: 'string',
          exportPort: 'string2',
          importPort: 'string',
          freightLCL: 0,
          freightCBM: 0,
          freightCost: 0,
          transitTime: 1,
          scheduleRemark: 'string',
          THC: {
            unit: 'CMB/CNTR',
            remark: 'string',
            lcl: 0,
          },
          CIC: {
            unit: 'CMB/CNTR',
            remark: 'string',
            lcl: 0,
          },
          DO_FEE: {
            unit: 'BL',
            remark: 'string',
            lcl: 0,
          },
          HANDLING_FEE: {
            unit: 'BL',
            remark: 'string',
            lcl: 0,
          },
          CFS_CHARGE: {
            unit: 'CBM',
            remark: 'string',
            lcl: 0,
          },
          LIFT_STATUS: {
            unit: 'CMB/CNTR',
            remark: 'string',
            lcl: 0,
          },
          CUSTOMS_CLEARANCE_FEE: {
            unit: 'SHEET/CNTR',
            remark: 'string',
            lcl: 0,
          },
          WARFAGE_FEE: {
            unit: 'CNTR',
            remark: 'string',
            lcl: 0,
          },
          TRUCKING: {
            unit: 'TRUK',
            remark: 'string',
            lcl: 0,
          },
          chargeExportCost: 0,
          totalCost: 0,
        },
      },
      {
        firmName: 'J인터네셔널',
        totalCost: 12.33,
        forwarderName: 'string string',
        forwarderEmail: 'test@gmail.com',
        forwarderTel: '+53617531243380',
        quotationInfoResponse: {
          quotationId: '66ec310de6e1bd719fc09e93',
          originalQuotationId: '66c2f12d81322169373e2f8d',
          quotationStatus: 'DETAIL_INFO',
          carrier: 'string',
          exportPort: 'string2',
          importPort: 'string',
          freightLCL: 0,
          freightCBM: 0,
          freightCost: 0,
          transitTime: 1,
          scheduleRemark: 'string',
          THC: {
            unit: 'CMB/CNTR',
            remark: 'string',
            lcl: 10,
          },
          CIC: {
            unit: 'CMB/CNTR',
            remark: 'string',
            lcl: 10,
          },
          DO_FEE: {
            unit: 'BL',
            remark: 'string',
            lcl: 10,
          },
          HANDLING_FEE: {
            unit: 'BL',
            remark: 'string',
            lcl: 10,
          },
          CFS_CHARGE: {
            unit: 'CBM',
            remark: 'string',
            lcl: 0,
          },
          LIFT_STATUS: {
            unit: 'CMB/CNTR',
            remark: 'string',
            lcl: 0,
          },
          CUSTOMS_CLEARANCE_FEE: {
            unit: 'SHEET/CNTR',
            remark: 'string',
            lcl: 0,
          },
          WARFAGE_FEE: {
            unit: 'CNTR',
            remark: 'string',
            lcl: 0,
          },
          TRUCKING: {
            unit: 'TRUK',
            remark: 'string',
            lcl: 0,
          },
          chargeExportCost: 40,
          totalCost: 40,
        },
      },
      {
        firmName: '글로벌로지스',
        totalCost: 12.33,
        forwarderName: 'string string',
        forwarderEmail: 'test@gmail.com',
        forwarderTel: '+53617531243380',
        quotationInfoResponse: {
          quotationId: '66ec310de6e1bd719fc09e93',
          originalQuotationId: '66c2f12d81322169373e2f8d',
          quotationStatus: 'DETAIL_INFO',
          carrier: 'string',
          exportPort: 'string2',
          importPort: 'string',
          freightLCL: 0,
          freightCBM: 0,
          freightCost: 0,
          transitTime: 1,
          scheduleRemark: 'string',
          THC: {
            unit: 'CMB/CNTR',
            remark: 'string',
            lcl: 10,
          },
          CIC: {
            unit: 'CMB/CNTR',
            remark: 'string',
            lcl: 10,
          },
          DO_FEE: {
            unit: 'BL',
            remark: 'string',
            lcl: 10,
          },
          HANDLING_FEE: {
            unit: 'BL',
            remark: 'string',
            lcl: 10,
          },
          CFS_CHARGE: {
            unit: 'CBM',
            remark: 'string',
            lcl: 0,
          },
          LIFT_STATUS: {
            unit: 'CMB/CNTR',
            remark: 'string',
            lcl: 0,
          },
          CUSTOMS_CLEARANCE_FEE: {
            unit: 'SHEET/CNTR',
            remark: 'string',
            lcl: 0,
          },
          WARFAGE_FEE: {
            unit: 'CNTR',
            remark: 'string',
            lcl: 0,
          },
          TRUCKING: {
            unit: 'TRUK',
            remark: 'string',
            lcl: 0,
          },
          chargeExportCost: 40,
          totalCost: 40,
        },
      },
    ],
    thcCostList: [
      {
        한성무역: 1110,
      },
      {
        J인터네셔널: 1200,
      },
      {
        글로벌로지스: 100,
      },
    ],
    handlingCostList: [
      {
        한성무역: 1234,
      },
      {
        J인터네셔널: 1234,
      },
      {
        글로벌로지스: 2356,
      },
    ],
    cfsCostList: [
      {
        한성무역: 4560,
      },
      {
        J인터네셔널: 3110,
      },
      {
        글로벌로지스: 3450,
      },
    ],
    listStatusCostList: [
      {
        한성무역: 1340,
      },
      {
        J인터네셔널: 3450,
      },
      {
        글로벌로지스: 467,
      },
    ],
    customsClearanceCostList: [
      {
        한성무역: 8456,
      },
      {
        J인터네셔널: 4568,
      },
      {
        글로벌로지스: 4568,
      },
    ],
    truckingCostList: [
      {
        한성무역: 7113,
      },
      {
        J인터네셔널: 2346,
      },
      {
        글로벌로지스: 123,
      },
    ],
  },
};
