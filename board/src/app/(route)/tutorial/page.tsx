'use client';

import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';
import { useRouter } from 'next/navigation';
import Layout from '@/app/_components/common/Layout';
import { COLORS } from '@/app/_constant/color';

import Popup from '@/app/_components/common/Popup';
import { useTutorial } from '@/app/_hooks/useTutorial';

function Page() {
  const [hash, setHash] = useState<keyof typeof tutorial_config>('main');
  const { isShow, isTodayShow, onClose, onTodayHideToggle } = useTutorial();
  const [bannerVisible, setBannerVisible] = useState(false);
  const router = useRouter();

  // 기존 쿼리 파라미터를 URL에 유지
  let queryParams = '';

  // 쿼리 파라미터 직접 추출
  if (typeof window !== 'undefined') {
    const href = window.location.href;
    queryParams = href.includes('?') ? href.split('?')[1] : ''; // '?' 기준으로 쿼리 파라미터 추출
  }

  useEffect(() => {
    const updateHash = () => {
      // 해시와 쿼리 문자열 분리하여 해시 값만 추출
      const currentHash =
        window.location.hash.split('?')[0].replace('#', '') || 'main';
      setHash(currentHash as keyof typeof tutorial_config);
    };
    window.addEventListener('hashchange', updateHash);
    updateHash();
    setTimeout(() => setBannerVisible(true), 200);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  const tutorial_config = {
    main: {
      img: '/assets/reserve-tutorial.png',
      popup_text: '화물 정보 입력\n바로가기',
      popup_click: `/freight-quote?${queryParams}`,
    },
    freightQuote: {
      img: '/assets/reserve-tutorial.png',
      popup_text: '화물 정보 입력\n바로가기',
      popup_click: `/freight-quote?${queryParams}`,
    },
    reserveList: {
      img: '/assets/schedule-tutorial.png',
      popup_text: '예약 가능 리스트\n바로가기',
      popup_click: `/reserve-list?${queryParams}`,
    },
  };

  const defaultConfig = tutorial_config['main'];
  const currentConfig = tutorial_config[hash] || defaultConfig;

  return (
    <>
      <GlobalStyle />
      <StyledLayout>
        <Overlay />
        <ImageWrapper>
          {currentConfig && (
            <img src={currentConfig.img} alt="Tutorial Image" />
          )}
        </ImageWrapper>
        <TopBanner isVisible={bannerVisible}>
          <div>처음이어도 괜찮아, 링카고 튜토리얼</div>
          {hash === 'main' && (
            <NextButton onClick={() => setHash('reserveList')}>다음</NextButton>
          )}
        </TopBanner>
      </StyledLayout>
      <Popup
        isShow={isShow}
        isTodayShow={isTodayShow}
        content={currentConfig.popup_text}
        onClick={() => {
          router.push(currentConfig.popup_click);
        }}
        onClose={onClose}
        onTodayHideToggle={onTodayHideToggle}
      />
    </>
  );
}

export default Page;

const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 30px 0 0 0;
  }
`;

const StyledLayout = styled(Layout)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const ImageWrapper = styled.div`
  position: relative;
  z-index: 2;
  img {
    max-width: 100%;
    height: auto;
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const TopBanner = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: ${COLORS.main};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-left: 50px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;

  transform: translateY(-100%); /* 초기 위치를 화면 위쪽으로 설정 */
  z-index: 3;

  ${({ isVisible }) =>
    isVisible &&
    css`
      animation: ${slideDown} 0.5s ease-out forwards;
    `}
`;

const NextButton = styled.button`
  margin-right: 80px;
  font-size: 20px;
  font-weight: bold;
  height: 40px;
  width: 100px;
  text-align: center;
  color: ${COLORS.main};
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: rgba(250, 250, 250, 0.4);
  backdrop-filter: blur(4px);

  &:hover {
    background-color: ${COLORS.main};
    color: #fff;
  }
`;
