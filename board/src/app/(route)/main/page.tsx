'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import { useRouter } from 'next/navigation';
import FeatureCard from '@/app/_components/common/FeatureCard';
import { useSpring, animated, config } from '@react-spring/web';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Mousewheel, Pagination, Autoplay } from 'swiper/modules';
import { featureCardsConfigs } from './utill';

export default function Page() {
  /*---- router ----*/
  const router = useRouter();
  /*---- state ----*/
  const [slideIndex, setSlideIndex] = useState(0);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  /*---- function ----*/

  // 타이핑 이벤트
  let index = 0;
  const [title, setTitle] = useState('');
  const fullTitle = `복잡하고 어려운 화물 배송, \n링카고가 화주와 포워더를 연결해드립니다.`;
  const typingEffect = () => {
    if (index < fullTitle.length) {
      setTitle(fullTitle.slice(0, index + 1));
      index++;
      typingTimeoutRef.current = setTimeout(typingEffect, 100);
    }
  };

  const handleSlideChange = useCallback((swiper: any) => {
    setSlideIndex(swiper.activeIndex);
  }, []);

  const springs = featureCardsConfigs.map((_, index) =>
    useSpring({
      from: { opacity: 0, transform: 'translateY(-50px)' },
      to:
        slideIndex === 1
          ? { opacity: 1, transform: 'translateY(0px)' }
          : { opacity: 0, transform: 'translateY(-50px)' },
      delay: index * 500,
      config: config.wobbly,
    }),
  );

  /*---- useEffect ----*/
  //타이핑 효과 제어
  useEffect(() => {
    if (slideIndex === 1) {
      typingEffect();
    } else {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    };
  }, [slideIndex, fullTitle]);

  /*---- jsx ----*/
  return (
    <Container>
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
          <Title>{title}</Title>
          <FlexContainer>
            {featureCardsConfigs.map((card, index) => (
              <animated.div style={springs[index]} key={index}>
                <FeatureCard
                  imgSrc={card.imgSrc}
                  title={card.title}
                  desc={card.desc}
                  bgColor={card.bgColor}
                />
              </animated.div>
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
  flex: 6;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: ${COLORS.main};
  text-align: center;
  line-height: 51.2px;
  background-color: ${COLORS.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  flex: 2;
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
