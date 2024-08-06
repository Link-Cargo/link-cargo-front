import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

export enum BgType {
  BRIGHT = 'bright',
  DARK = 'dark',
  NONE = 'none',
}

export interface BoxProps {
  desc?: string;
  children: React.ReactNode;
  bgType: BgType;
  width?: string;
  onClick?: () => void;
}

export const Box = ({ desc, children, width, bgType, onClick }: BoxProps) => {
  return (
    <StyledBox bgType={bgType} width={width}>
      <p>{desc}</p>
      {children}
    </StyledBox>
  );
};

interface StyledBoxProps {
  bgType: BgType;
  width?: string;
}

const StyledBox = styled.div<StyledBoxProps>`
  background-color: ${COLORS.w};
  box-shadow: ${({ bgType }) =>
    bgType === BgType.BRIGHT
      ? `0px 0px 50px 0px rgba(0, 0, 0, 0.1);
    `
      : 'none'};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  padding: 32px;

  width: ${({ width }) => width || 'auto'};

  background-color: ${({ bgType }) => {
    switch (bgType) {
      case BgType.BRIGHT:
        return COLORS.w;
      case BgType.DARK:
        return COLORS.g0;
      case BgType.NONE:
        return 'transparent';
      default:
        return 'transparent';
    }
  }};

  p {
    color: ${COLORS.g4};
    font-size: 16px;
    font-weight: 500;
  }
`;
