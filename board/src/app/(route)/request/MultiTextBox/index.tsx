import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

export interface MultiTextBoxProps {
  title: string;
  desc: string;
}

const MultiTextBox = ({ title, desc }: MultiTextBoxProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
    </Container>
  );
};

export default MultiTextBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  background-color: ${COLORS.w};
  flex: 1;
  border-radius: 12px;
  padding: 20px 24px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: 800;
  color: ${COLORS.main};
`;

const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${COLORS.g3};
`;
