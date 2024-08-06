'use client';

import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

export type ModalProps = {
  /** (비)노출을 나타내는 불리언 */
  isShowing: boolean;
  /** 모달 내 자식 노드로 Popup컴포넌트가 들어옴 */
  content: React.ReactNode;
};

/**
 * Popup 컴포넌트를 노드로 받는 모달 레이아웃 컴포넌트
 */
const Modal = ({ isShowing, content }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return isShowing
    ? ReactDOM.createPortal(
        <OutSide>
          <ModalLayOut ref={ref}>{content}</ModalLayOut>
        </OutSide>,
        document.body,
      )
    : null;
};

export default Modal;

const OutSide = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.3);

  z-index: 999;
`;

const ModalLayOut = styled.div`
  margin: auto;
  background-color: ${COLORS.w};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.2);
  position: relative;

  z-index: 9999;
`;
