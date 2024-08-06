'use client';

import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Box } from '@/app/_components/dashboard/Box';
import { BgType } from '@/app/_components/dashboard/Profile';
import { COLORS } from '@/app/_constant/color';
import Button from '@/app/_components/common/Button';
import {
  운송사리스트,
  최근검색어_리스트,
  추천_포워딩_업체,
  정보,
} from './utils';
import { SelectInput } from '@/app/_components/common/Input';
import useModal from '@/app/_hooks/useModal';
import Modal from '@/app/_components/common/Modal';
import Confirm from '@/app/_components/common/Confirm';
import Layout from '@/app/_components/dashboard/Layout';

export default function Overview() {
  /*---- hooks ----*/
  const { isShowing: isAiShowing, toggle: toggleAiModal } = useModal();
  const { isShowing: isExpandShowing, toggle: toggleExpandModal } = useModal();

  /*---- state ----*/
  const [최근검색어, set최근검색어] = useState(
    '인천항 → 상하이항 | ETD : 2024.06.24',
  );

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
            <Title>{추천_포워딩_업체.회사명}</Title>
            <SubTitle>
              총 비용 | <b>{추천_포워딩_업체.총비용}</b>
            </SubTitle>
          </div>
          <StyledTable>
            <ul>
              <li>
                <span>담당자</span>
                <span>{추천_포워딩_업체.담당자}</span>
              </li>
              <li>
                <span>이메일</span>
                <span>{추천_포워딩_업체.이메일}</span>
              </li>
              <li>
                <span>전화번호</span>
                <span>{추천_포워딩_업체.전화번호}</span>
              </li>
            </ul>
          </StyledTable>
          <ImgContainer>
            <img src={추천_포워딩_업체.견적서이미지} />
            <Icon className="material-icons" onClick={toggleExpandModal}>
              {'fullscreen'}
            </Icon>
          </ImgContainer>
        </Box>
        <Box desc="더 저렴한 가격 추천" bgType={BgType.BRIGHT} width="70%">
          <div>
            <Title>
              <b>두 달 뒤,</b>운임이 <b>20</b>만큼 <b>낮을 것</b>으로 예상
            </Title>
            <SubTitle>
              예상 비용 | <b>1,234,567원</b>
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
      </FlexBox>
      <FlexBox>
        <Box desc="입국항 혼잡도" bgType={BgType.DARK} width="30%">
          <Title>
            <b>{정보.혼잡도.수치}</b> {정보.혼잡도.정도}
          </Title>
          <Desc>{정보.혼잡도.설명}</Desc>
        </Box>
        <Box desc="관련정보 요약" bgType={BgType.DARK} width="70%">
          <Title>수출국 | 수입국 | 운송사 | 환율 | 주요항로</Title>
          <Desc>{정보.요약}</Desc>
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
          />
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
