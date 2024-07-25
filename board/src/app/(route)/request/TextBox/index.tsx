import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

export interface TextBoxProps {
  title: string;
  desc: string;
  isColored?: boolean;
}

const TextBox = ({ isColored, title, desc }: TextBoxProps) => {
  return (
    <Container>
      <Desc>{desc}</Desc>
      <Title colored={isColored}>{title}</Title>
    </Container>
  );
};

export default TextBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  background-color: '#fff';
  padding: 20px 24px;
  flex: 1;
`;

const Title = styled.div<{ colored?: boolean }>`
  width: 100%;
  background-color: ${COLORS.w};
  font-size: 24px;
  font-weight: 800;
  color: ${({ colored }) => (colored ? COLORS.main : COLORS.bk)};
  text-align: center;
  border-radius: 12px;
  padding: 20px 24px;
`;

const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${COLORS.g3};
`;
