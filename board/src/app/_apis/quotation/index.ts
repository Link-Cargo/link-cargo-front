import { getEstimated } from './getEstimated';
import { getSchedules } from './getSchedules';
import { getScheduleId } from './getSchedules';
import { postCargos } from './postCargos';
import { postQuotation } from './postQuotation';
import { postRawQuotation } from './postRawQuotation';
import { postCalculate } from './getCalculate';

import { GetIEstimatedDto } from './getEstimated';
import { GetISchedulesDto, GetIScheduleDto } from './getSchedules';
import { GetICargosContentDto } from './postCargos';
import { postIQuotationDto } from './postQuotation';
import { postIRawQuotationDto } from './postRawQuotation';
import { PostICalculateDto } from './getCalculate';

export const QuotationApiService = {
  getEstimated,
  getSchedules,
  getScheduleId,
  postCargos,
  postQuotation,
  postRawQuotation,
  postCalculate,
};

export type {
  GetIEstimatedDto,
  GetISchedulesDto,
  GetIScheduleDto,
  postIQuotationDto,
  GetICargosContentDto,
  postIRawQuotationDto,
  PostICalculateDto,
};
