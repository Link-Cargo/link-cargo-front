import { ResponseDto, getAsync } from '../common';

interface ResultData {
  quotationCount: number;
  dashboardQuotationResponseList: [
    {
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
    },
  ];
  thcCostList: [
    {
      additionalProp1: number;
      additionalProp2: number;
      additionalProp3: number;
    },
  ];
  handlingCostList: [
    {
      additionalProp1: number;
      additionalProp2: number;
      additionalProp3: number;
    },
  ];
  cfsCostList: [
    {
      additionalProp1: number;
      additionalProp2: number;
      additionalProp3: number;
    },
  ];
  listStatusCostList: [
    {
      additionalProp1: number;
      additionalProp2: number;
      additionalProp3: number;
    },
  ];
  customsClearanceCostList: [
    {
      additionalProp1: number;
      additionalProp2: number;
      additionalProp3: number;
    },
  ];
  truckingCostList: [
    {
      additionalProp1: number;
      additionalProp2: number;
      additionalProp3: number;
    },
  ];
}

type GetICompareDto = ResponseDto<ResultData[]>;

/*
요청한 견적서를 포워더가 업데이트 한 후 견적서 끼리 비교
*/
export const getCompare = async (id: number) => {
  const url = `/dashboards/compare/${id}`;
  const response = await getAsync<GetICompareDto, undefined>(
    url,
    process.env.NEXT_PUBLIC_TEMP_AT,
    undefined,
    undefined,
  );
  return response.result;
};
