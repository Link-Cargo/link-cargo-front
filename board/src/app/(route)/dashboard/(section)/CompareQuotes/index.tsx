'use client';

import React, { useState, useCallback } from 'react';
import { styled } from 'styled-components';
import { Box } from '@/app/_components/dashboard/Box';
import { BgType } from '@/app/_components/dashboard/Box';
import { COLORS } from '@/app/_constant/color';
import Button from '@/app/_components/common/Button';
import { 최근검색어_리스트 } from '../Overview/utils';
import { SelectInput } from '@/app/_components/common/Input';
import Layout from '@/app/_components/dashboard/Layout';
import { 도착한_견적서_업체, 견적_명세 } from './utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Mousewheel, Pagination, Autoplay } from 'swiper/modules';

export default function CompareQuotes() {
  /*---- state ----*/
  const [최근검색어, set최근검색어] = useState(
    '인천항 → 상하이항 | ETD : 2024.06.24',
  );
  const [견적명세, set견적명세] = useState('CFS비용');
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
        <ReportButton>
          <div>도착한 견적서</div>
          <div>{도착한_견적서_업체.length}개</div>
        </ReportButton>
      </FlexBox>
      <StyledSwiper
        direction="horizontal"
        slidesPerView={1}
        spaceBetween={0}
        mousewheel
        speed={1000}
        pagination={{ clickable: true }}
        modules={[Mousewheel, Pagination, Autoplay]}
        className="swiper-compare"
      >
        {도착한_견적서_업체.map((item, index) => (
          <SwiperSlide key={index}>
            <SlideContent>
              <Box bgType={BgType.NONE} onClick={() => {}} width="60%">
                <img
                  src={item.견적서이미지}
                  alt={`견적서 이미지 ${index + 1}`}
                />
              </Box>
              <Box bgType={BgType.NONE} width="40%">
                <StyledTable>
                  <ul>
                    <li>
                      <span>기업명</span>
                      <span>{item.회사명}</span>
                    </li>
                    <li>
                      <span>총 비용</span>
                      <span>{item.총비용}</span>
                    </li>
                    <li>
                      <span>담당자</span>
                      <span>{item.담당자}</span>
                    </li>
                    <li>
                      <span>이메일</span>
                      <span>{item.이메일}</span>
                    </li>
                    <li>
                      <span>전화번호</span>
                      <span>{item.전화번호}</span>
                    </li>
                    <li>전달사항입니다.</li>
                  </ul>
                  <Button
                    text="1:1 문의하기"
                    flexValue={1}
                    type="dark"
                    onClick={() => {}}
                  />
                </StyledTable>
              </Box>
            </SlideContent>
          </SwiperSlide>
        ))}
      </StyledSwiper>
      <FlexBox>
        <Box bgType={BgType.DARK} width="33%">
          <SelectInput
            label=""
            name="운송사"
            value={견적명세}
            onChange={(e) => set견적명세(e.target.value)}
            options={견적_명세}
          />
        </Box>
        <Box bgType={BgType.DARK} width="33%">
          <SelectInput
            label=""
            name="운송사"
            value={견적명세}
            onChange={(e) => set견적명세(e.target.value)}
            options={견적_명세}
          />
        </Box>
        <Box bgType={BgType.DARK} width="33%">
          <SelectInput
            label=""
            name="운송사"
            value={견적명세}
            onChange={(e) => set견적명세(e.target.value)}
            options={견적_명세}
          />
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

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  flex: 1;

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 5;
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
  }

  ul > li:nth-child(1) > span:nth-child(2),
  ul > li:nth-child(2) > span:nth-child(2),
  ul > li:nth-child(3) > span:nth-child(2) {
    color: ${COLORS.g4};
    font-weight: 800;
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

const SlideContent = styled.div`
  display: flex;
  height: 100%;
  padding: 16px;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  gap: 20px;
`;
