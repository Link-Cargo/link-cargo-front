import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import { useRouter } from 'next/navigation';

interface PopupProps {
  isShow: boolean;
  isTodayShow: boolean;
  onClick: () => void;
  onClose: () => void;
  onTodayHideToggle: () => void;
}

const Popup = ({
  isShow,
  isTodayShow,
  onClick,
  onClose,
  onTodayHideToggle,
}: PopupProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isShow) {
      setIsClosing(false);
    }
  }, [isShow]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <Container isShow={isShow} isClosing={isClosing}>
      <Content onClick={onClick}>
        <Logo>
          <img src="/assets/logo_icon.png" />
        </Logo>
        <h3>
          처음이어도 괜찮아,
          <br />
          링카고 튜토리얼
        </h3>
      </Content>
      <Bottom>
        <TodayShow onClick={onTodayHideToggle}>
          <img
            src={
              isTodayShow
                ? '/assets/icon/check-white.svg'
                : '/assets/icon/check-off.svg'
            }
          />
          오늘 하루 보지 않기
        </TodayShow>
        <span onClick={handleClose}>닫기</span>
      </Bottom>
    </Container>
  );
};

export default Popup;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(30px);
  }
`;

const Container = styled.div<{ isShow: boolean; isClosing: boolean }>`
  width: 302px;
  height: 251px;
  border-radius: 20px;
  background-color: #fff;
  border: 1px solid ${COLORS.g2};
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 30px;
  bottom: 30px;
  overflow: hidden;
  z-index: 9999;

  ${({ isShow, isClosing }) =>
    isShow && !isClosing
      ? css`
          animation: ${slideUp} 1s ease forwards;
        `
      : isClosing
        ? css`
            animation: ${slideDown} 1s ease forwards;
          `
        : css`
            display: none;
          `}
`;

const Logo = styled.div`
  width: 140px;
  margin: 0 auto;
`;

const Content = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: ${COLORS.main};
  text-align: center;
  flex: 1;
  cursor: pointer;
  padding: 30px 0px;
`;

const Bottom = styled.div`
  padding: 0 20px 0 10px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLORS.main};
  color: #fff;

  span {
    cursor: pointer;
  }
`;

const TodayShow = styled.span`
  display: flex;
  align-items: center;

  img {
    width: 45px !important;
  }
`;
