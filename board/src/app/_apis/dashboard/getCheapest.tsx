import { ResponseDto, getAsync } from '../common';

interface ResultData {
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

type GetICheapestDto = ResponseDto<ResultData>;

/*
운임비용이 가장 적은 견적서를 조회
*/
export const getCheapest = async () => {
  const url = `/dashboards/cheapest`;
  const response = await getAsync<GetICheapestDto, undefined>(
    url,
    process.env.NEXT_PUBLIC_TEMP_AT,
    undefined,
    undefined,
  );
  return response.result;
};
