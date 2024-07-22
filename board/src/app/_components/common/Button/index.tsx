import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

interface ButtonProps {
  text: string;
  type: 'dark' | 'bright';
  onClick: () => void;
  disabled?: boolean;
  flexValue?: number;
}

const Button = ({
  text,
  type,
  onClick,
  disabled = false,
  flexValue = 1,
}: ButtonProps) => {
  return (
    <StyledButton
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
}

const StyledButton = styled.button<StyledButtonProps>`
  flex: ${({ flexValue }) => flexValue};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
  padding: 12px 16px;
  text-align: center;
  color: ${({ type }) => (type === 'dark' ? COLORS.w : COLORS.g3)};
  background-color: ${({ type }) => (type === 'dark' ? COLORS.main : COLORS.w)};
  border: ${({ type }) =>
    type === 'dark' ? `1px solid ${COLORS.main}` : `1px solid ${COLORS.g2}`};
  font-weight: ${({ type }) => (type === 'dark' ? '800' : '400')};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
