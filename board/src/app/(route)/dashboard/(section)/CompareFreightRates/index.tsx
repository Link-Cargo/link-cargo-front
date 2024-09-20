'use client';

import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/app/_recoil/userAtom';

import { Box } from '@/app/_components/dashboard/Box';
import { BgType } from '@/app/_components/dashboard/Profile';
import { SelectInput } from '@/app/_components/common/Input';
import Button from '@/app/_components/common/Button';
import Layout from '@/app/_components/dashboard/Layout';
import Graph from './Graph';

import {
  GetIPredictionDto,
  GetISummaryDto,
  GetIPredictionReasonDto,
  GetIRecommendationDto,
  DashboardApiService,
} from '@/app/_apis/dashboard';

//TODO
import { 운송사리스트, 최근검색어_리스트 } from '../Overview/utils';
import { ResultData } from '@/app/_apis/dashboard/getPrediction';

export default function CompareFreightRates() {
  /*---- hooks ----*/
  /*---- state ----*/
  const { accessToken } = useRecoilValue(userAtom);

  //TODO
  const [최근검색어, set최근검색어] = useState(
    '인천항 → 상하이항 | ETD : 2024.06.21',
  );
  const [월별_검색_리스트, set월별_검색_리스트] = useState<
    { value: string; label: string }[]
  >([
    { value: '9월', label: '9월' },
    { value: '10월', label: '10월' },
    { value: '11월', label: '11월' },
  ]);
  const [prediction, setPrediction] = useState<ResultData>();
  const [selectedMonth, setSelectedMonth] = useState({
    month: '9월',
    status: '',
    reason: '',
  });
  function handleMonthChange() {}

  /*---- api call function ----*/
  const {
    data: summaryData,
    error: summaryError,
    isLoading: summaryLoading,
  } = useQuery<GetISummaryDto, Error>({
    queryKey: ['summary'],
    queryFn: () => DashboardApiService.getSummary(accessToken!),
    enabled: !!accessToken,
  });

  const {
    data: graphData,
    error: graphError,
    isLoading: graphLoading,
  } = useQuery<GetIPredictionDto, Error>({
    queryKey: ['graph'],
    queryFn: () => DashboardApiService.getPrediction(accessToken!),
    enabled: !!accessToken,
  });

  const {
    data: recommendationData,
    error: recommendationError,
    isLoading: recommendationLoading,
  } = useQuery<GetIRecommendationDto, Error>({
    queryKey: ['recommendation'],
    queryFn: () => DashboardApiService.getRecommendation(accessToken!),
    enabled: !!accessToken,
  });

  const {
    data: transformedData,
    error: predictionError,
    isLoading: predictionLoading,
  } = useQuery<
    GetIPredictionReasonDto,
    Error,
    {
      monthOptions: { value: string; label: string }[];
      selectedMonth: { month: string; status: string; reason: string };
    }
  >({
    queryKey: ['prediction'],
    queryFn: () => DashboardApiService.getPredictionReason(accessToken!),
    enabled: !!accessToken,
    select: (data) => {
      // 월별 검색어 리스트 생성
      const monthOptions = data.result.predictionReasons.map((item) => {
        const month = item.date[1]?.month || '';
        return { value: `${month}월`, label: `${month}월` };
      });

      // 첫 번째 월별 데이터 기본 선택
      let selectedMonth = {
        month: '',
        status: '',
        reason: '',
      };
      if (monthOptions && monthOptions.length > 0) {
        const firstMonth = monthOptions[0].value;
        const firstPrediction = data.result.predictionReasons.find((item) =>
          item.date.some((date) => `${date.month}월` === firstMonth),
        );
        selectedMonth = {
          month: firstMonth || '',
          status: firstPrediction?.status || '',
          reason: firstPrediction?.reason || '',
        };
      }

      return {
        monthOptions,
        selectedMonth,
      };
    },
  });

  /*---- jsx ----*/
  return (
    <Layout>
      <SelectInput
        label=""
        name="운송사"
        value={최근검색어}
        onChange={(e) => {}}
        options={최근검색어_리스트}
      />
      <FlexBox>
        <Box
          desc="입국항 주요 항만 운임지수"
          bgType={BgType.BRIGHT}
          width="70%"
        >
          <SubTitle>
            현재를 기준으로 {graphData?.result.exportPortName} →{' '}
            {graphData?.result.importPortName} 운임 예측값입니다.
          </SubTitle>
          <Graph predictions={graphData?.result.predictions || {}} />
        </Box>
        <Box desc="운임지수 변화 이유" bgType={BgType.BRIGHT} width="30%">
          <FlexBox>
            <SelectInput
              label=""
              name="월별"
              value={selectedMonth.month}
              onChange={handleMonthChange}
              options={월별_검색_리스트}
            />
            <SubTitle>
              {selectedMonth.status === 'rising'
                ? '상승이 예상됩니다.'
                : '하락이 예상됩니다.'}
            </SubTitle>
          </FlexBox>
          <Desc>
            {selectedMonth.status === 'rising'
              ? '상승 요인 | '
              : '하락 요인 | '}
            {selectedMonth.reason}
          </Desc>
        </Box>
      </FlexBox>
      <FlexBox>
        <Box desc="더 저렴한 가격 추천" bgType={BgType.BRIGHT} width="70%">
          <div>
            <Title>
              <b>{recommendationData?.result.dateDifference}개월 뒤,</b> 운임이{' '}
              <b>{recommendationData?.result.indexDifference}</b>
              만큼 <b>낮을 것</b>
              으로 예상
            </Title>
            <SubTitle>
              예상 비용 | <b>{recommendationData?.result.estimatedCost}원</b>
            </SubTitle>
          </div>
          <div>
            <Desc>
              2개월 뒤 예약가능한 운송사 리스트
              <hr />
            </Desc>
            <Table>
              <thead>
                <tr>
                  <th>운송사</th>
                  <th>ETD-ETA</th>
                  <th>소요일</th>
                  <th>서류 마감일</th>
                  <th>화물 마감일</th>
                </tr>
              </thead>
              <tbody>
                {운송사리스트.map((item, index) => (
                  <tr key={index}>
                    <td>{item.운송사}</td>
                    <td>{item.ETD_ETA}</td>
                    <td>{item.소요일}</td>
                    <td>{item.서류마감일}</td>
                    <td>{item.화물마감일}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div>
            <Button text="견적 다시 요청하기" type="dark" onClick={() => {}} />
          </div>
        </Box>
        <Box desc="관련정보 요약" bgType={BgType.DARK} width="30%">
          <SummaryBox>
            {summaryData?.result.interests.map((interest, index) => (
              <div key={index}>
                <span
                  className="material-icons"
                  style={{
                    borderRadius: '10px',
                    color: '#bbb',
                  }}
                >
                  check_box
                </span>
                <span>{interest}</span>
              </div>
            ))}
          </SummaryBox>
          <Desc>{summaryData?.result.summary}</Desc>
        </Box>
      </FlexBox>
    </Layout>
  );
}

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  gap: 25px;
`;

const SummaryBox = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;

  div {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;

const Title = styled.div`
  color: ${COLORS.g4};
  font-size: 28px;
  font-weight: 500;
  white-space: pre;

  b {
    color: ${COLORS.main};
    font-weight: 800;
  }
`;

const SubTitle = styled.div`
  color: ${COLORS.g4};
  font-size: 20px;
  font-weight: 500;
  white-space: pre;
  line-height: 46px;
`;

const Desc = styled.div`
  color: ${COLORS.g4};
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;

  hr {
    border: 0.5px solid ${COLORS.g1};
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  text-align: left;
  width: 100%;

  font-size: 16px;
  line-height: 32px;

  margin: 20px 0;

  th {
    color: ${COLORS.g5};
  }

  td {
    color: ${COLORS.g3};
  }
`;
const Icon = styled.span`
  font-size: 20px;
  color: ${COLORS.main};
`;
