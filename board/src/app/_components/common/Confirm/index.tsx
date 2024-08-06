import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

export interface ConfirmProps {
  title?: string;
  desc?: string;
  /** 팝업 컴포넌트에서 자식 노드로 들어갈 컴포넌트  */
  children?: ReactNode;
  /** 옵션1 이벤트 핸들러   */
  onLeft?: {
    onClick: () => void;
    text: string;
  };
  /** 옵션2 이벤트 핸들러   */
  onRight?: {
    onClick: () => void;
    text: string;
  };
}

/**
 * 두 가지 옵션 선택 팝업 컴포넌트
 */
const Confirm = ({ title, desc, children, onLeft, onRight }: ConfirmProps) => (
  <Wrap>
    <Title>{title}</Title>
    <Desc>{desc}</Desc>
    {children}
    <OptionContainer>
      <OptionLeft onClick={onLeft?.onClick}>{onLeft?.text}</OptionLeft>
      <OptionRight onClick={onRight?.onClick}>{onRight?.text}</OptionRight>
    </OptionContainer>
  </Wrap>
);

export default Confirm;

const Wrap = styled.div`
  border-radius: 40px;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 80px 100px;
  overflow: hidden;
`;

const OptionContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 50px 0px 0px 0px;
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

const OptionRight = styled.div`
  ${baseStyle}
  border: 1px solid ${COLORS.main};
  color: ${COLORS.w};
  background: ${COLORS.main};
  width: 380px;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: ${COLORS.bk};
  white-space: pre-wrap;
  text-align: center;
`;

const Desc = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: ${COLORS.g4};
  white-space: pre-wrap;
  text-align: center;
`;
