'use client';

import React, { useState, useEffect } from 'react';
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
import { useRouter } from 'next/navigation';
import { Mousewheel, Pagination, Autoplay } from 'swiper/modules';

export default function CompareQuotes() {
  const router = useRouter();
  /*---- state ----*/
  const [최근검색어, set최근검색어] = useState(
    '인천항 → 상하이항 | ETD : 2024.06.24',
  );
  const [견적명세1, set견적명세1] = useState('CFS 비용');
  const [견적명세2, set견적명세2] = useState('핸들링 비용');
  const [견적명세3, set견적명세3] = useState('THC 비용');

  const [randomValues, setRandomValues] = useState([
    {
      hansung: 0,
      jinternational: 0,
      globallogis: 0,
    },
    {
      hansung: 0,
      jinternational: 0,
      globallogis: 0,
    },
    {
      hansung: 0,
      jinternational: 0,
      globallogis: 0,
    },
  ]);

  const barColors = [COLORS.main, COLORS.point, COLORS.g3];

  useEffect(() => {
    // 0~2000 사이의 랜덤값 설정
    setRandomValues([
      {
        hansung: Math.floor(Math.random() * 2000),
        jinternational: Math.floor(Math.random() * 2000),
        globallogis: Math.floor(Math.random() * 2000),
      },
      {
        hansung: Math.floor(Math.random() * 2000),
        jinternational: Math.floor(Math.random() * 2000),
        globallogis: Math.floor(Math.random() * 2000),
      },
      {
        hansung: Math.floor(Math.random() * 2000),
        jinternational: Math.floor(Math.random() * 2000),
        globallogis: Math.floor(Math.random() * 2000),
      },
    ]);
  }, []);

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
                    <li>전달 사항 | {item.전달사항}</li>
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
            label=""
            name="운송사"
            value={견적명세1}
            onChange={(e) => {
              set견적명세1(e.target.value);
            }}
            options={견적_명세}
          />
          <ul>
            <li>
              <span>한성무역</span>
              <span>
                <GraphBar
                  width={(randomValues[0].hansung / 2000) * 100 + '%'}
                  color={barColors[0]}
                />
              </span>
              <span>{randomValues[0].hansung}원</span>
            </li>
            <li>
              <span>J인터네셔널</span>
              <span>
                <GraphBar
                  width={(randomValues[0].jinternational / 2000) * 100 + '%'}
                  color={barColors[1]}
                />
              </span>
              <span>{randomValues[0].jinternational}원</span>
            </li>
            <li>
              <span>글로벌로지스</span>
              <span>
                <GraphBar
                  width={(randomValues[0].globallogis / 2000) * 100 + '%'}
                  color={barColors[2]}
                />
              </span>
              <span>{randomValues[0].globallogis}원</span>
            </li>
          </ul>
        </CompareBox>
        <CompareBox>
          <SelectInput
            label=""
            name="운송사"
            value={견적명세2}
            onChange={(e) => {
              set견적명세2(e.target.value);
            }}
            options={견적_명세}
          />
          <ul>
            <li>
              <span>한성무역</span>
              <span>
                <GraphBar
                  width={(randomValues[1].hansung / 2000) * 100 + '%'}
                  color={barColors[0]}
                />
              </span>
              <span>{randomValues[1].hansung}원</span>
            </li>
            <li>
              <span>J인터네셔널</span>
              <span>
                <GraphBar
                  width={(randomValues[1].jinternational / 2000) * 100 + '%'}
                  color={barColors[1]}
                />
              </span>
              <span>{randomValues[1].jinternational}원</span>
            </li>
            <li>
              <span>글로벌로지스</span>
              <span>
                <GraphBar
                  width={(randomValues[1].globallogis / 2000) * 100 + '%'}
                  color={barColors[2]}
                />
              </span>
              <span>{randomValues[1].globallogis}원</span>
            </li>
          </ul>
        </CompareBox>
        <CompareBox>
          <SelectInput
            label=""
            name="운송사"
            value={견적명세3}
            onChange={(e) => {
              set견적명세3(e.target.value);
            }}
            options={견적_명세}
          />
          <ul>
            <li>
              <span>한성무역</span>
              <span>
                <GraphBar
                  width={(randomValues[2].hansung / 2000) * 100 + '%'}
                  color={barColors[0]}
                />
              </span>
              <span>{randomValues[2].hansung}원</span>
            </li>
            <li>
              <span>J인터네셔널</span>
              <span>
                <GraphBar
                  width={(randomValues[2].jinternational / 2000) * 100 + '%'}
                  color={barColors[1]}
                />
              </span>
              <span>{randomValues[2].jinternational}원</span>
            </li>
            <li>
              <span>글로벌로지스</span>
              <span>
                <GraphBar
                  width={(randomValues[2].globallogis / 2000) * 100 + '%'}
                  color={barColors[2]}
                />
              </span>
              <span>{randomValues[2].globallogis}원</span>
            </li>
          </ul>
        </CompareBox>
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
