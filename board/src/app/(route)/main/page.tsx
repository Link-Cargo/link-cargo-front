'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import { useRouter } from 'next/navigation';
import FeatureCard from '@/app/_components/common/FeatureCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Mousewheel, Pagination, Autoplay } from 'swiper/modules';
import { featureCardsConfigs } from './utill';
import { Nav } from '@/app/_components/common/Nav';

export default function Page() {
  /*---- router ----*/
  const router = useRouter();
  /*---- state ----*/
  const [slideIndex, setSlideIndex] = useState(0);
  /*---- function ----*/
  const handleSlideChange = useCallback((swiper: any) => {
    setSlideIndex(swiper.activeIndex);
  }, []);
  /*---- jsx ----*/
  return (
    <Container>
      <Nav type="main" />
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        mousewheel
        speed={1000}
        pagination={{ clickable: true }}
        modules={[Mousewheel, Pagination, Autoplay]}
        onSlideChange={handleSlideChange}
        className="mySwiper"
      >
        <StyledSwiperSlide>
          <Bg src="/bg.png" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <Title>
            <div>
              <h6>
                다음과 같은 분이라면 Linkargo가 최고의 선택지가 될 수 있어요
              </h6>
              <ul>
                <li>
                  <span className="material-icons">check</span>
                  수출 화물이 너무 작거나 너무 크고 무겁지 않을 때 (LCL 수출)
                </li>
                <li>
                  <span className="material-icons">check</span>해상 수출 경험이
                  처음일 때
                </li>
                <li>
                  <span className="material-icons">check</span>나 대신
                  전문적으로 해상수출을 진행해줄 여러 포워더의 연결이 필요할 때
                </li>
                <li>
                  <span className="material-icons">check</span>
                  수출 뿐만 아니라 Business Intelligence 까지 얻고 싶을 때
                </li>
              </ul>
            </div>
          </Title>
          <FlexContainer>
            {featureCardsConfigs.map((card, index) => (
              <div key={index}>
                <FeatureCard
                  imgSrc={card.imgSrc}
                  title={card.title}
                  desc={card.desc}
                  bgColor={card.bgColor}
                />
              </div>
            ))}
          </FlexContainer>
          <ButtonSection>
            <Button onClick={() => router.push('/freight-quote')}>
              견적 산출하기
            </Button>
          </ButtonSection>
        </StyledSwiperSlide>
      </Swiper>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${COLORS.w};
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: space-between;
`;

const Bg = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 40px;
  align-items: center;
  flex: 5;
`;

const Title = styled.div`
  background-color: ${COLORS.bg};
  width: 100%;
  padding: 120px 0px 50px 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  flex: 2;

  div {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  h6 {
    font-size: 32px;
    font-weight: 600;
    color: ${COLORS.main};
    line-height: 51.2px;
  }

  span {
    font-size: 30px;
    color: ${COLORS.g4};
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    font-size: 20px;
    font-weight: 600;
    color: ${COLORS.g4};
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const Button = styled.div`
  width: 348px;
  font-size: 24px;
  margin: 0 auto;
  border-radius: 100px;
  line-height: 80px;
  height: 80px;
  text-align: center;
  color: ${COLORS.w};
  background-color: ${COLORS.main};
  font-weight: 800;
  cursor: pointer;
`;

const ButtonSection = styled.div`
  flex: 1;
`;
