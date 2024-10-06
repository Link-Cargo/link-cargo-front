import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Box } from '@/app/_components/dashboard/Box';
import { BgType } from '@/app/_components/dashboard/Profile';
import Button from '@/app/_components/common/Button';
import { CustomSelectInput } from '@/app/_components/common/Input';
import useModal from '@/app/_hooks/useModal';
import Modal from '@/app/_components/common/Modal';
import ModalContent from '@/app/_components/common/ModalContent';
import { Table as CustomTable } from '../CompareQuotes/Table';
import Confirm from '@/app/_components/common/Confirm';
import Layout from '@/app/_components/dashboard/Layout';
import { getPortIdByName } from '@/app/(route)/request/utill';
import { formatDateRange } from '@/app/(route)/request/utill';
import {
  formatDate,
  formatTransitTime,
} from '@/app/(route)/reserve-list/utill';
import { formatQuoteListEl } from '../../_util';
import { getTokenFromLocalStorage } from '@/app/_utils/auth';
import {
  GetIRecommendationDto,
  GetICongestionDto,
  GetICheapestDto,
  GetISummaryDto,
  DashboardApiService,
  GetIUserRawQuotationDto,
} from '@/app/_apis/dashboard';
import { GetIPortDto, getPortsAll } from '@/app/_apis/getPorts';
import { QuotationInfoResponse } from '@/app/_apis/dashboard/getCompare';
import Report from './Report';

interface 견적다시요청하기용_ROWQUOTATION {
  rawQuotationId: string;
  exportPort: string;
  importPort: string;
  ETD: number[];
  requestDate: number[];
}

export default function Overview() {
  /*---- auth ----*/
  const tokens = getTokenFromLocalStorage();
  /*---- hooks ----*/
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isShowing: isAiShowing, toggle: toggleAiModal } = useModal();
  const { isShowing: isExpandShowing, toggle: toggleExpandModal } = useModal();
  /*---- state ----*/
  //선택된 RawQuotationId
  const [selectedRawQuotationId, setSelectedRawQuotationId] =
    useState<string>('');
  //선택된 RawQuotationId에 대해 포매팅된 텍스트, 입국항, 출국항
  const [selectedIdFormatting, setSelectedIdFormatting] = useState<{
    text: string;
    importId: number;
    exportId: number;
  } | null>(null); // 객체 또는 null 값을 허용
  const [selectedItem, setSelectedItem] =
    useState<견적다시요청하기용_ROWQUOTATION>(); //견적다시요청하기용
  /*---- function ----*/
  const exportPdf = () => {};
  const exportImg = () => {};

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
    data: congestionData,
    error: congestionError,
    isLoading: congestionLoading,
  } = useQuery<GetICongestionDto, Error>({
    queryKey: ['congestion'],
    queryFn: () =>
      DashboardApiService.getCongestion(
        tokens?.accessToken,
        selectedIdFormatting?.importId as number,
      ),
    enabled: !!selectedIdFormatting?.importId,
  });

  const {
    data: cheapestData,
    error: cheapestError,
    isLoading: cheapestLoading,
  } = useQuery<GetICheapestDto, Error>({
    queryKey: ['cheapest'],
    queryFn: () =>
      DashboardApiService.getCheapest(
        tokens?.accessToken,
        selectedRawQuotationId,
      ),
    enabled: !!selectedRawQuotationId,
  });

  const {
    data: portData,
    error: portError,
    isLoading: portLoading,
  } = useQuery<GetIPortDto, Error>({
    queryKey: ['Port'],
    queryFn: () => getPortsAll(tokens?.accessToken),
    enabled: !!tokens?.accessToken,
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

  /*---- useEffect ----*/
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

  const RawQuotationList =
    userRawQuotationData?.result?.rawQuotationInfoList?.map((item) => {
      const formatted = formatQuoteListEl(item); // 포매팅된 결과를 가져옴
      return {
        value: formatted.text, // 텍스트를 문자열로 설정
        label: formatted.text, // 동일한 텍스트를 라벨로 설정
        id: item.rawQuotationId, // rawQuotationId를 ID로 사용
      };
    }) || [];

  /*---- useEffect for invalidating queries ----*/
  useEffect(() => {
    if (selectedRawQuotationId) {
      queryClient.invalidateQueries({ queryKey: ['recommendation'] });
      queryClient.invalidateQueries({ queryKey: ['cheapest'] });
      queryClient.invalidateQueries({ queryKey: ['congestion'] });
    }
  }, [selectedRawQuotationId, queryClient]);

  /*---- jsx ----*/
  return (
    <Layout>
      <FlexBox>
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
        {!selectedIdFormatting && <div>값을 불러오는 중...</div>}
        <ReportButton onClick={toggleAiModal}>
          <span className="material-symbols-outlined">draft</span>
          AI 요약 보고서
        </ReportButton>
      </FlexBox>
      <FlexBox>
        <Box desc="추천하는 포워딩 업체" bgType={BgType.BRIGHT} width="30%">
          <div>
            <Title>
              <b>{cheapestData?.result.firmName}</b>
            </Title>
            <SubTitle>
              총 비용 | <b>{cheapestData?.result.totalCost}원</b>
            </SubTitle>
          </div>
          <StyledTable>
            <ul>
              <li>
                <span>담당자</span>
                <span>{cheapestData?.result.forwarderName}</span>
              </li>
              <li>
                <span>이메일</span>
                <span>{cheapestData?.result.forwarderEmail}</span>
              </li>
              <li>
                <span>전화번호</span>
                <span>{cheapestData?.result.forwarderTel}</span>
              </li>
            </ul>
          </StyledTable>

          <TableContainer style={{ position: 'relative' }}>
            <CustomTable
              data={
                cheapestData?.result
                  ?.quotationInfoResponse as QuotationInfoResponse
              }
              size="tiny"
            ></CustomTable>
            <ExpandIcon
              className="material-icons"
              onClick={() => {
                toggleExpandModal();
              }}
            >
              fullscreen
            </ExpandIcon>
          </TableContainer>
        </Box>
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
                {recommendationData?.result.estimatedCost?.toLocaleString()}원
              </b>
            </SubTitle>
          </div>
          <div style={{ flex: '1' }}>
            <Desc>
              {recommendationData?.result.dateDifference}개월 뒤 예약가능한
              운송사 리스트
              <hr />
            </Desc>
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
                {!recommendationData && <div>값을 불러오는 중...</div>}
                {recommendationData?.result.scheduleInfos.map((item, index) => (
                  <tr key={index}>
                    <td>{item.carrier}</td>
                    <td>{formatDateRange(item.ETD, item.ETD)}</td>
                    <td>
                      {formatTransitTime(item.transitTime, item.transportType)}
                    </td>
                    <td>{formatDate(item.documentCutOff)}</td>
                    <td>{formatDate(item.cargoCutOff)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
      </FlexBox>
      <FlexBox>
        <Box desc="입국항 혼잡도" bgType={BgType.DARK} width="30%">
          <Title type={congestionData?.result.status}>
            {congestionData?.result.status}
          </Title>
          <Desc>{congestionData?.result.description}</Desc>
        </Box>
        <Box desc="관련정보 요약" bgType={BgType.DARK} width="70%">
          <Title>
            {summaryData?.result.interests
              .map((interest) => interest.trim())
              .join(' | ')}
          </Title>
          <Desc>{summaryData?.result.summary}</Desc>
        </Box>
      </FlexBox>
      <Modal
        isShowing={isAiShowing}
        content={
          <Confirm
            title="AI 요약 보고서"
            desc={`화물정보 및 일정을 바탕으로 AI가 분석한 수출 요약 보고서를 통해 새로운 인사이트를 얻어보세요.`}
            onLeft={{
              onClick: toggleAiModal,
              text: '닫기',
            }}
          >
            <Report />
          </Confirm>
        }
      />
      <Modal
        isShowing={isExpandShowing}
        content={
          <ModalContent
            onLeft={{
              onClick: () => {
                console.log(cheapestData?.result?.quotationInfoResponse);
                toggleExpandModal();
              },
              text: '닫기',
            }}
          >
            <CustomTable
              data={
                cheapestData?.result
                  ?.quotationInfoResponse as QuotationInfoResponse
              }
              size="large"
            />
          </ModalContent>
        }
      />
    </Layout>
  );
}

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  gap: 25px;
`;

const ReportButton = styled.div`
  background: ${COLORS.w};
  width: 265px;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  cursor: pointer;
`;

const Title = styled.div<{ type?: string }>`
  color: ${COLORS.g4};
  font-size: 28px;
  font-weight: 500;

  b {
    color: ${COLORS.main};
    font-weight: 800;
  }

  color: ${(props) =>
    props.type === '혼잡'
      ? 'rgba(228, 32, 32, 1)'
      : props.type === '보통'
        ? 'rgba(228, 185, 32, 1)'
        : props.type === '양호'
          ? 'rgba(95, 191, 50, 1)'
          : COLORS.g4}; // 기본 값 설정
`;

const SubTitle = styled.div`
  color: ${COLORS.g5};
  font-size: 18px;
  line-height: 36px;
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

const StyledTable = styled.div`
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  li {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    color: ${COLORS.g3};
    display: flex;
    gap: 16px;
    width: 100%;
    justify-content: center;
    font-weight: 400;
  }

  ul > li:nth-child(1) > span:nth-child(2),
  ul > li:nth-child(2) > span:nth-child(2),
  ul > li:nth-child(3) > span:nth-child(2) {
    color: ${COLORS.g4};
    font-weight: 500;
  }

  ul > li > span:nth-child(1) {
    width: 60px;
    text-align: right;
  }

  ul > li > span:nth-child(2) {
    text-align: left;
    flex: 1;
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
  font-size: 35px;
  color: ${COLORS.w};
  cursor: pointer;
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 2;
`;

const ImgC = styled.div`
  width: 800px;
`;
const ImgD = styled.div`
  width: 300px;
`;

const ExpandIcon = styled.span`
  font-size: 50px;
  color: ${COLORS.w};
  cursor: pointer;
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 10;
`;

const TableContainer = styled.div``;
