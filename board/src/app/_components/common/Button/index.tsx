import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

interface ButtonProps {
  text: string;
  type: 'dark' | 'bright';
  onClick: () => void;
  disabled?: boolean;
  flexValue?: number;
  height?: number;
}

const Button = ({
  text,
  type,
  onClick,
  height = 48,
  disabled = false,
  flexValue = 1,
}: ButtonProps) => {
  return (
    <StyledButton
      height={height}
      type={type}
      onClick={onClick}
      disabled={disabled}
      flexValue={flexValue}
    >
      {text}
    </StyledButton>
  );
};

export default Button;

interface StyledButtonProps {
  type: 'dark' | 'bright';
  flexValue?: number;
  disabled?: boolean;
  height: number;
}

const StyledButton = styled.button<StyledButtonProps>`
  flex: ${({ flexValue }) => flexValue};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  line-height: 20px;
  height: ${({ height }) => `${height}px`};
  text-align: center;
  color: ${({ type }) => (type === 'dark' ? COLORS.w : COLORS.g3)};
  background-color: ${({ type }) => (type === 'dark' ? COLORS.main : COLORS.w)};
  border: ${({ type }) =>
    type === 'dark' ? `1px solid ${COLORS.main}` : `1px solid ${COLORS.g2}`};
  font-weight: ${({ type }) => (type === 'dark' ? '800' : '400')};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
