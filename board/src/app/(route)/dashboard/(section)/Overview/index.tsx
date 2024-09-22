import React, { useState } from 'react';
import { styled } from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/app/_recoil/userAtom';

import { Box } from '@/app/_components/dashboard/Box';
import { BgType } from '@/app/_components/dashboard/Profile';
import Button from '@/app/_components/common/Button';
import { SelectInput } from '@/app/_components/common/Input';
import useModal from '@/app/_hooks/useModal';
import Modal from '@/app/_components/common/Modal';
import Confirm from '@/app/_components/common/Confirm';
import Layout from '@/app/_components/dashboard/Layout';

import {
  GetIRecommendationDto,
  GetICongestionDto,
  GetICheapestDto,
  GetISummaryDto,
  DashboardApiService,
} from '@/app/_apis/dashboard';

//TODO
import { 운송사리스트, 최근검색어_리스트 } from './utils';

export default function Overview() {
  /*---- hooks ----*/
  const { isShowing: isAiShowing, toggle: toggleAiModal } = useModal();
  const { isShowing: isExpandShowing, toggle: toggleExpandModal } = useModal();

  /*---- state ----*/
  const { accessToken } = useRecoilValue(userAtom);
  const [최근검색어, set최근검색어] = useState(
    '인천항 → 상하이항 | ETD : 2024.06.24',
  );

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
    data: recommendationData,
    error: recommendationError,
    isLoading: recommendationLoading,
  } = useQuery<GetIRecommendationDto, Error>({
    queryKey: ['recommendation'],
    queryFn: () => DashboardApiService.getRecommendation(accessToken!),
    enabled: !!accessToken,
  });

  const {
    data: congestionData,
    error: congestionError,
    isLoading: congestionLoading,
  } = useQuery<GetICongestionDto, Error>({
    queryKey: ['congestion'],
    queryFn: () => DashboardApiService.getCongestion(accessToken!),
    enabled: !!accessToken,
  });

  const {
    data: cheapestData,
    error: cheapestError,
    isLoading: cheapestLoading,
  } = useQuery<GetICheapestDto, Error>({
    queryKey: ['cheapest'],
    queryFn: () => DashboardApiService.getCheapest(accessToken!),
    enabled: !!accessToken,
  });

  /*---- function ----*/
  const exportPdf = () => {};
  const exportImg = () => {};

  /*---- jsx ----*/
  return (
    <Layout>
      <FlexBox>
        <SelectInput
          label=""
          name="운송사"
          value={최근검색어}
          onChange={(e) => set최근검색어(e.target.value)}
          options={최근검색어_리스트}
        />
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
          <ImgContainer>
            <img src={'assets/report.png'} />
            <Icon className="material-icons" onClick={toggleExpandModal}>
              {'fullscreen'}
            </Icon>
          </ImgContainer>
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
      </FlexBox>
      <FlexBox>
        <Box desc="입국항 혼잡도" bgType={BgType.DARK} width="30%">
          <Title>
            <b>{congestionData?.result.percent}%</b>{' '}
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
            title="AI 요약 보고서 PDF 내보내기"
            desc={`AI가 한 페이지로 요약한 내용을 PDF 형식으로 내보냅니다.`}
            onLeft={{
              onClick: toggleAiModal,
              text: '닫기',
            }}
            onRight={{
              onClick: exportPdf,
              text: 'PDF 내보내기',
            }}
          >
            <ImgD>
              <img src="/assets/pdf.png" />
            </ImgD>
          </Confirm>
        }
      />
      <Modal
        isShowing={isExpandShowing}
        content={
          <Confirm
            onLeft={{
              onClick: toggleExpandModal,
              text: '닫기',
            }}
            onRight={{
              onClick: exportImg,
              text: '다운로드',
            }}
          >
            <ImgC>
              <img src="/assets/report.png" />
            </ImgC>
          </Confirm>
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

const Title = styled.div`
  color: ${COLORS.g4};
  font-size: 28px;
  font-weight: 500;

  b {
    color: ${COLORS.main};
    font-weight: 800;
  }
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
  }

  td {
    color: ${COLORS.g3};
  }
`;

const ImgContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  position: relative;

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
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
