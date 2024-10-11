'use client';

import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import useModal from '@/app/_hooks/useModal';
import Modal from '@/app/_components/common/Modal';
import Confirm from '@/app/_components/common/Confirm';
import { Box } from '@/app/_components/dashboard/Box';
import { BgType } from '@/app/_components/dashboard/Profile';
import { SelectInput, CustomSelectInput } from '@/app/_components/common/Input';
import Button from '@/app/_components/common/Button';
import Layout from '@/app/_components/dashboard/Layout';
import Graph from './Graph';
import { formatDateRange, getPortIdByName } from '@/app/(route)/request/utill';
import {
  formatDate,
  formatTransitTime,
} from '@/app/(route)/reserve-list/utill';
import { formatQuoteListEl } from '../../_util';
import { getTokenFromLocalStorage } from '@/app/_utils/auth';
import {
  GetIPredictionDto,
  GetISummaryDto,
  GetIPredictionReasonDto,
  GetIRecommendationDto,
  GetIUserRawQuotationDto,
  DashboardApiService,
} from '@/app/_apis/dashboard';

import { GetIPortDto, getPortsAll } from '@/app/_apis/getPorts';
import { 월별_리스트, 이유_리스트 } from './mock';
import Loading from '@/app/_components/common/Loading';

interface 견적다시요청하기용_ROWQUOTATION {
  rawQuotationId: string;
  exportPort: string;
  importPort: string;
  ETD: number[];
  requestDate: number[];
}

export default function CompareFreightRates() {
  /*---- hooks ----*/
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isShowing: isExpandShowing, toggle: toggleExpandModal } = useModal();
  /*---- state ----*/
  const tokens = getTokenFromLocalStorage();
  //선택된 RawQuotationId
  const [selectedRawQuotationId, setSelectedRawQuotationId] =
    useState<string>('');
  //선택된 RawQuotationId에 대해 포매팅된 텍스트, 입국항, 출국항
  const [selectedIdFormatting, setSelectedIdFormatting] = useState<{
    text: string;
    importId: number;
    exportId: number;
  } | null>(null); // 객체 또는 null 값을 허용
  //월별 검색어 초기 리스트 인덱스 선택
  const [selectedMonth, setSelectedMonth] = useState(이유_리스트[0]);
  const [selectedItem, setSelectedItem] =
    useState<견적다시요청하기용_ROWQUOTATION>(); //견적다시요청하기용
  /*---- function ----*/
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = 이유_리스트.find((item) => item.month === e.target.value);
    if (selected) setSelectedMonth(selected);
  };

  /*---- api call function ----*/
  const {
    data: summaryData,
    error: summaryError,
    isLoading: summaryLoading,
  } = useQuery<GetISummaryDto, Error>({
    queryKey: ['summary'],
    queryFn: () => DashboardApiService.getSummary(tokens?.accessToken),
    enabled: !!tokens?.accessToken,
  });
  const {
    data: graphData,
    error: graphError,
    isLoading: graphLoading,
  } = useQuery<GetIPredictionDto, Error>({
    queryKey: ['graph'],
    queryFn: () =>
      DashboardApiService.getPrediction(
        tokens?.accessToken,
        selectedIdFormatting?.importId || 0,
        selectedIdFormatting?.exportId || 0,
      ),
    enabled: !!tokens?.accessToken && !!selectedRawQuotationId,
  });
  const {
    data: recommendationData,
    error: recommendationError,
    isLoading: recommendationLoading,
  } = useQuery<GetIRecommendationDto, Error>({
    queryKey: ['recommendation'],
    queryFn: () =>
      DashboardApiService.getRecommendation(
        tokens?.accessToken,
        selectedRawQuotationId,
      ),
    enabled: !!selectedRawQuotationId,
  });
  const {
    data: userRawQuotationData,
    error: userRawQuotationError,
    isLoading: userRawQuotationLoading,
  } = useQuery<GetIUserRawQuotationDto, Error>({
    queryKey: ['userRawQuotationData'],
    queryFn: () => DashboardApiService.getUserRawQuotation(tokens?.accessToken),
    enabled: !!tokens?.accessToken,
  });
  const {
    data: reasonData,
    error: reasonError,
    isLoading: reasonLoading,
  } = useQuery<
    GetIPredictionReasonDto,
    Error,
    {
      monthOptions: { value: string; label: string }[];
      selectedMonth: { month: string; status: string; reason: string };
    }
  >({
    queryKey: ['reason'],
    queryFn: () => DashboardApiService.getPredictionReason(tokens?.accessToken),
    enabled: !!tokens?.accessToken,
  });
  const {
    data: portData,
    error: portError,
    isLoading: portLoading,
  } = useQuery<GetIPortDto, Error>({
    queryKey: ['Port'],
    queryFn: () => getPortsAll(),
  });

  /*---- useEffect----*/
  useEffect(() => {
    if (selectedRawQuotationId) {
      queryClient.invalidateQueries({ queryKey: ['recommendation'] });
      queryClient.invalidateQueries({ queryKey: ['cheapest'] });
      queryClient.invalidateQueries({ queryKey: ['graph'] });
      queryClient.invalidateQueries({ queryKey: ['reason'] });
    }
  }, [selectedRawQuotationId, queryClient]);

  const RawQuotationList =
    userRawQuotationData?.result?.rawQuotationInfoList?.map((item) => {
      const formatted = formatQuoteListEl(item); // 포매팅된 결과를 가져옴
      return {
        value: formatted.text, // 텍스트를 문자열로 설정
        label: formatted.text, // 동일한 텍스트를 라벨로 설정
        id: item.rawQuotationId, // rawQuotationId를 ID로 사용
      };
    }) || [];

  useEffect(() => {
    if (
      userRawQuotationData &&
      userRawQuotationData.result.rawQuotationInfoList.length > 0
    ) {
      const firstItem = userRawQuotationData.result.rawQuotationInfoList[0];
      const firstValue = formatQuoteListEl(firstItem);
      setSelectedRawQuotationId(firstItem.rawQuotationId);
      setSelectedIdFormatting({
        text: firstValue.text,
        importId:
          getPortIdByName(portData as GetIPortDto, firstValue.importPort) ?? 0, // undefined일 경우 0으로 설정
        exportId:
          getPortIdByName(portData as GetIPortDto, firstValue.exportPort) ?? 0, // undefined일 경우 0으로 설정
      });
    }
  }, [userRawQuotationData]);

  useEffect(() => {
    if (
      userRawQuotationData &&
      userRawQuotationData.result.rawQuotationInfoList.length > 0
    ) {
      const firstItem = userRawQuotationData.result.rawQuotationInfoList[0];
      setSelectedItem(firstItem); //견적다시요청하기용
      const firstValue = formatQuoteListEl(firstItem);
      setSelectedRawQuotationId(firstItem.rawQuotationId);
      setSelectedIdFormatting({
        text: firstValue.text,
        importId:
          getPortIdByName(portData as GetIPortDto, firstValue.importPort) ?? 0, // undefined일 경우 0으로 설정
        exportId:
          getPortIdByName(portData as GetIPortDto, firstValue.exportPort) ?? 0, // undefined일 경우 0으로 설정
      });
    }
  }, [userRawQuotationData]);

  if (
    summaryLoading ||
    graphLoading ||
    recommendationLoading ||
    userRawQuotationLoading
  ) {
    return <Loading width="1000px" height="500px" />;
  }

  /*---- jsx ----*/
  return (
    <Layout>
      {selectedIdFormatting && (
        <CustomSelectInput
          label=""
          name="운송사"
          value={selectedIdFormatting?.text || ''} // 선택된 포맷팅된 텍스트를 표시
          onChange={(value, id) => {
            const selectedItem =
              userRawQuotationData?.result.rawQuotationInfoList.find(
                (item) => item.rawQuotationId === id,
              );

            setSelectedItem(selectedItem); //견적다시요청하기용
            if (selectedItem) {
              const formatted = formatQuoteListEl(selectedItem); // 선택된 아이템을 포맷팅

              setSelectedIdFormatting({
                text: formatted.text,
                importId:
                  getPortIdByName(
                    portData as GetIPortDto,
                    formatted.importPort,
                  ) ?? 0,
                exportId:
                  getPortIdByName(
                    portData as GetIPortDto,
                    formatted.exportPort,
                  ) ?? 0,
              });

              setSelectedRawQuotationId(id || '');
            }
          }}
          options={RawQuotationList}
          placeholder="운송사를 선택하세요"
        />
      )}
      <FlexBox>
        <Box
          desc="입국항 주요 항만 운임지수"
          bgType={BgType.BRIGHT}
          width="70%"
        >
          <SubTitle>
            현재를 기준으로{' '}
            <b>
              {graphData?.result.exportPortName} →{' '}
              {graphData?.result.importPortName}
            </b>{' '}
            운임 예측값입니다.
            <p>*CBM당 해당 운임</p>
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
              options={월별_리스트}
            />
            <SubTitle>
              {selectedMonth.status === 'rising' ? (
                <>
                  <b>상승</b>이 예상됩니다.
                </>
              ) : (
                <>
                  <b>하락</b>이 예상됩니다.
                </>
              )}
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
              예상 비용 |{' '}
              <b>
                {Math.floor(
                  recommendationData?.result.estimatedCost || 0,
                ).toLocaleString()}
                원
              </b>
            </SubTitle>
          </div>
          <div style={{ flex: '1' }}>
            <Desc>
              {recommendationData?.result.dateDifference}개월 뒤 예약가능한
              운송사 리스트
              <hr />
            </Desc>
            <div>
              <Table>
                <thead>
                  <tr>
                    <th>선명</th>
                    <th>ETD-ETA</th>
                    <th>소요일</th>
                    <th>서류 마감일</th>
                    <th>화물 마감일</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendationData?.result.scheduleInfos.map(
                    (item, index) => (
                      <tr key={index}>
                        <td>{item.vesselName}</td>
                        <td>{formatDateRange(item.ETD, item.ETD)}</td>
                        <td>
                          {formatTransitTime(
                            item.transitTime,
                            item.transportType,
                          )}
                        </td>
                        <td>{formatDate(item.documentCutOff)}</td>
                        <td>{formatDate(item.cargoCutOff)}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </Table>
            </div>
          </div>
          <div>
            <Button
              text="견적 다시 요청하기"
              type="dark"
              onClick={() => {
                router.push(
                  `/reserve-list?exportPortId=${selectedItem?.exportPort}&importPortId=${selectedItem?.importPort}&wishExportDate=${formatDate(selectedItem?.ETD as number[])}&rawQuotationId=${selectedItem?.rawQuotationId}`,
                );
              }}
            />
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

  b {
    font-weight: 700;
    color: ${COLORS.main};
  }

  p {
    font-size: 13px;
    font-weight: 400;
    line-height: 13px;
  }
`;

const Desc = styled.div`
  color: ${COLORS.g4};
  font-size: 16px;
  font-weight: 400;

  line-height: 26px;

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
    position: sticky; /* 테이블 헤더 고정 */
    top: 0;
    z-index: 1;
  }

  td {
    color: ${COLORS.g3};
  }

  thead,
  tbody,
  tr,
  th,
  td {
    display: block; /* block으로 변환하여 tbody에 스크롤 적용 */
  }

  tbody {
    height: 100px; /* 스크롤 높이 설정 */
    overflow-y: auto; /* 수직 스크롤 */
    overflow-x: hidden; /* 수평 스크롤 숨김 */
  }

  /* 스크롤바 숨기기 */
  tbody::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
  }

  tr {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;
  }

  th,
  td {
    box-sizing: border-box;
  }

  tbody,
  thead {
    tr {
      td:nth-child(1) {
        width: 50px;
        overflow: hidden; /* 내용이 넘칠 경우 숨김 */
        text-overflow: ellipsis; /* 말줄임표 적용 */
        white-space: nowrap; /* 텍스트를 한 줄로 */
      }
    }
  }
`;

const Icon = styled.span`
  font-size: 20px;
  color: ${COLORS.main};
`;
