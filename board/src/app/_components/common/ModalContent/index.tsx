import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

export interface ModalContentProps {
  /** 팝업 컴포넌트에서 자식 노드로 들어갈 컴포넌트  */
  children?: ReactNode;
  /** 버튼 이벤트 핸들러   */
  onLeft?: {
    onClick: () => void;
    text: string;
  };
}

/**
 * 단일 버튼 팝업 컴포넌트
 */
const ModalContent = ({ children, onLeft }: ModalContentProps) => (
  <Wrap>
    <Scroll>{children}</Scroll>
    <OptionContainer>
      <OptionLeft onClick={onLeft?.onClick}>{onLeft?.text}</OptionLeft>
    </OptionContainer>
  </Wrap>
);

export default ModalContent;

const Wrap = styled.div`
  max-height: 80vh;
  min-width: 70vw;

  border-radius: 40px;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow: hidden;

  padding: 30px 0px 20px 0px;
`;

const Scroll = styled.div`
  overflow: scroll;
  flex: 1;

  width: 90%;
`;

const OptionContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const baseStyle = `
  text-align: center;
  cursor: pointer;
  border-radius: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.2s;
  &:hover {
    opacity: 0.5;
  }
`;

const OptionLeft = styled.div`
  ${baseStyle}
  border: 1px solid ${COLORS.g2};
  color: ${COLORS.g3};
  background: ${COLORS.w};
  width: 152px;
`;
