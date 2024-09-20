'use client';

import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/app/_recoil/userAtom';

import { Box } from '@/app/_components/dashboard/Box';
import { BgType } from '@/app/_components/dashboard/Box';
import Button from '@/app/_components/common/Button';
import { SelectInput } from '@/app/_components/common/Input';
import Layout from '@/app/_components/dashboard/Layout';

import { GetICompareDto, DashboardApiService } from '@/app/_apis/dashboard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useRouter } from 'next/navigation';
import { Mousewheel, Pagination, Autoplay } from 'swiper/modules';

//TODO
import { CostListItem, dummy } from '@/app/_apis/dashboard/getCompare';
import { 최근검색어_리스트 } from '../Overview/utils';
import { 견적_명세, getCostListByType, barColors } from './utils';

export default function CompareQuotes() {
  /*---- hooks ----*/
  const router = useRouter();

  /*---- state ----*/
  const { accessToken } = useRecoilValue(userAtom);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  //set init value
  const [selectedCostType1, setSelectedCostType1] = useState('THC 비용');
  const [selectedCostType2, setSelectedCostType2] = useState('CIC 비용');
  const [selectedCostType3, setSelectedCostType3] = useState('CFS 비용');

  /*---- api call function ----*/
  const {
    data: compareData,
    error: compareError,
    isLoading: compareLoading,
  } = useQuery<GetICompareDto, Error>({
    queryKey: ['compare'],
    queryFn: () =>
      DashboardApiService.getCompare('66c2f12d81322169373e2f8d', accessToken!),
    enabled: !!accessToken,
  });

  //TODO
  const [최근검색어, set최근검색어] = useState(
    '인천항 → 상하이항 | ETD : 2024.06.24',
  );

  /*---- jsx ----*/
  const renderCostList = (costList: CostListItem[]) => (
    <ul>
      {costList.map((item, index) => (
        <li key={index}>
          <span>{Object.keys(item)[0]}</span>
          <span>
            <GraphBar
              width={(Object.values(item)[0] as number) / 100 + '%'}
              color={barColors[index % barColors.length]}
            />
          </span>
          <span>{Object.values(item)[0]}원</span>
        </li>
      ))}
    </ul>
  );
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
        <ReportButton onClick={() => setDropdownVisible(!dropdownVisible)}>
          <div>도착한 견적서</div>
          <b>{dummy?.result.quotationCount}개</b>
        </ReportButton>
        {dropdownVisible && (
          <DropdownMenu>
            {dummy.result.dashboardQuotationResponseList.map((item, index) => (
              <DropdownItem key={index}>{item.forwarderEmail}</DropdownItem>
            ))}
          </DropdownMenu>
        )}
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
        {dummy?.result.dashboardQuotationResponseList.map((item, index) => (
          <SwiperSlide key={index}>
            <SlideContent>
              <Box bgType={BgType.NONE} onClick={() => {}} width="60%">
                <img
                  src={'assets/report.png'}
                  alt={`견적서 이미지 ${index + 1}`}
                />
              </Box>
              <Box bgType={BgType.NONE} width="40%">
                <StyledTable>
                  <ul>
                    <li>
                      <span>기업명</span>
                      <span>{item.firmName}</span>
                    </li>
                    <li>
                      <span>총 비용</span>
                      <span>{item.totalCost}</span>
                    </li>
                    <li>
                      <span>담당자</span>
                      <span>{item.forwarderName}</span>
                    </li>
                    <li>
                      <span>이메일</span>
                      <span>{item.forwarderEmail}</span>
                    </li>
                    <li>
                      <span>전화번호</span>
                      <span>{item.forwarderTel}</span>
                    </li>
                    <li>전달 사항 | </li>
                  </ul>
                  <Button
                    text="1:1 문의하기"
                    flexValue={1}
                    type="dark"
                    onClick={() => {
                      router.push('/dashboard#chat_history');
                    }}
                  />
                </StyledTable>
              </Box>
            </SlideContent>
          </SwiperSlide>
        ))}
      </StyledSwiper>
      <FlexBox>
        <CompareBox>
          <SelectInput
            name="견적 명세 1"
            value={selectedCostType1}
            onChange={(e) => setSelectedCostType1(e.target.value)}
            options={견적_명세}
          />
          {renderCostList(getCostListByType(dummy, selectedCostType1))}
        </CompareBox>
        <CompareBox>
          <SelectInput
            name="견적 명세 2"
            value={selectedCostType2}
            onChange={(e) => setSelectedCostType2(e.target.value)}
            options={견적_명세}
          />
          {renderCostList(getCostListByType(dummy, selectedCostType2))}
        </CompareBox>
        <CompareBox>
          <SelectInput
            name="견적 명세 3"
            value={selectedCostType3}
            onChange={(e) => setSelectedCostType3(e.target.value)}
            options={견적_명세}
          />
          {renderCostList(getCostListByType(dummy, selectedCostType3))}
        </CompareBox>
      </FlexBox>
    </Layout>
  );
}

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  gap: 25px;
  position: relative;
`;

const ReportButton = styled.div`
  background: ${COLORS.w};
  width: 265px;
  display: flex;
  gap: 15px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;

  b {
    color: ${COLORS.main};
    font-weight: 800;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  background-color: ${COLORS.w};
  border-radius: 12px;
  margin-top: 10px;
  z-index: 10;
  overflow; hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.div`
  padding: 12px;
  font-size: 16px;
  color: ${COLORS.g2};
  cursor: pointer;
  text-align: right;
  &:hover {
    background-color: ${COLORS.g0};
    color: ${COLORS.g4};
  }
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
  ul > li:nth-child(2) > span:nth-child(2) {
    color: ${COLORS.main};
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

  background: #fff;
  border-radius: 12px;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  gap: 20px;
`;

const CompareBox = styled.div`
  background-color: ${COLORS.g0};
  padding: 16px;
  width: 33%;
  border-radius: 13px;

  ul {
    padding: 0;
    list-style: none;
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: 14px;

    span:nth-child(1) {
      width: 33%;
      text-align: left;
      color: ${COLORS.g3};
    }
    span:nth-child(2) {
      width: 50%;
    }
    span:nth-child(3) {
      width: 17%;
      text-align: right;
      color: ${COLORS.g2};
    }
  }
`;

const GraphBar = styled.div<{ width: string; color: string }>`
  height: 12px;
  background-color: ${({ color }) => color};
  border-radius: 0px 8px 8px 0px;
  width: ${({ width }) => width};
`;
