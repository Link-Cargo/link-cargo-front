import { getCongestion } from './getCongestion';
import { getCheapest } from './getCheapest';
import { getCompare } from './getCompare';
import { getPrediction } from './getPrediction';
import { getPredictionReason } from './getPredictionReason';
import { getRecommendation } from './getRecommendation';
import { getSummary } from './getSummary';

import { GetICheapestDto } from './getCheapest';
import { GetICompareDto } from './getCompare';
import { GetICongestionDto } from './getCongestion';
import { GetIPredictionDto } from './getPrediction';
import { GetIPredictionReasonDto } from './getPredictionReason';
import { GetIRecommendationDto } from './getRecommendation';
import { GetISummaryDto } from './getSummary';

export const DashboardApiService = {
  getCongestion,
  getCompare,
  getCheapest,
  getPrediction,
  getPredictionReason,
  getRecommendation,
  getSummary,
};

export type {
  GetICheapestDto,
  GetICompareDto,
  GetICongestionDto,
  GetIPredictionDto,
  GetIPredictionReasonDto,
  GetIRecommendationDto,
  GetISummaryDto,
};
