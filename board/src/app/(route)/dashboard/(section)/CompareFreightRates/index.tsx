'use client';

import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { Box } from '@/app/_components/dashboard/Box';
import { BgType } from '@/app/_components/dashboard/Profile';
import { COLORS } from '@/app/_constant/color';
import { SelectInput } from '@/app/_components/common/Input';
import Button from '@/app/_components/common/Button';
import { 운송사리스트, 최근검색어_리스트 } from '../Overview/utils';
import Layout from '@/app/_components/dashboard/Layout';
import {
  getRecommendation,
  ResultData as RecommendationData,
} from '@/app/_apis/dashboard/getRecommendation';
import {
  getSummary,
  ResultData as SummaryData,
} from '@/app/_apis/dashboard/getSummary';
import {
  getPredictionReason,
  ResultData as PredictionReasonData,
} from '@/app/_apis/dashboard/getPredictionReason';

export default function CompareFreightRates() {
  /*---- state ----*/
  const [최근검색어, set최근검색어] = useState(
    '인천항 → 상하이항 | ETD : 2024.06.21',
  );
  const [월별_검색_리스트, set월별_검색_리스트] = useState<
    { value: string; label: string }[]
  >([]);

  const [recommendationInfo, setRecommendationInfo] =
    useState<RecommendationData>();
  const [prediction, setPrediction] = useState<PredictionReasonData>();
  const [summary, setSummary] = useState<SummaryData>();
  const [selectedMonth, setSelectedMonth] = useState({
    month: '9월',
    status: '',
    reason: '',
  });

  /*---- function ----*/

  //선택한 달 데이터 setSelectedMonth
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonthValue = e.target.value;

    const selectedPrediction = prediction?.predictionReasons.find((item) =>
      item.date.some((date) => `${date.month}월` === selectedMonthValue),
    );

    if (selectedPrediction) {
      setSelectedMonth({
        month: selectedMonthValue,
        status: selectedPrediction.status,
        reason: selectedPrediction.reason,
      });
    }
  };

  /*---- api call function ----*/
  const fetchCompare = async () => {
    try {
      const data = await getRecommendation();
      const predictionData = await getPredictionReason();
      const summaryData = await getSummary();
      setRecommendationInfo(data);
      setPrediction(predictionData);
      setSummary(summaryData);

      // 월별 검색어 리스트 생성
      const monthOptions = predictionData?.predictionReasons.map((item) => {
        const month = item.date[1]?.month || '';
        return { value: `${month}월`, label: `${month}월` };
      });
      set월별_검색_리스트(monthOptions || []);

      // 첫 번째 월별 데이터를 기본 선택
      if (monthOptions && monthOptions.length > 0) {
        const firstMonth = monthOptions[0].value;
        const firstPrediction = predictionData.predictionReasons.find((item) =>
          item.date.some((date) => `${date.month}월` === firstMonth),
        );
        setSelectedMonth({
          month: firstPrediction?.status || '',
          status: firstPrediction?.status || '',
          reason: firstPrediction?.reason || '',
        });
      }
    } catch (error) {
      console.error('정보를 가져오는 데 실패했습니다:', error);
    }
  };

  /*---- effect ----*/
  useEffect(() => {
    fetchCompare();
  }, []);

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
            현재를 기준으로 부산항 → 상하이항 운임 예측값입니다.
          </SubTitle>
          <img src="/assets/graph.png" />
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
              <b>{recommendationInfo?.dateDifference}개월 뒤,</b> 운임이{' '}
              <b>{recommendationInfo?.indexDifference}</b>만큼 <b>낮을 것</b>
              으로 예상
            </Title>
            <SubTitle>
              예상 비용 | <b>{recommendationInfo?.estimatedCost}원</b>
            </SubTitle>
          </div>
          <div>
            <Desc>
              2주 뒤 예약가능한 운송사 리스트
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
            {summary?.interests.map((interest, index) => (
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
          <Desc>{summary?.summary}</Desc>
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
  color: ${COLORS.g5};
  font-size: 20px;
  font-weight: 500;
  white-space: pre;
  line-height: 46px;
`;

const Desc = styled.div`
  color: ${COLORS.g4};
  font-size: 16px;
  font-weight: 400;

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
