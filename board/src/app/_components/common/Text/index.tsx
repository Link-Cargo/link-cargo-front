import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

interface TextProps {
  title?: string;
  subtitle?: string;
  highlight?: string;
  desc?: string;
}

const Text = ({ title, subtitle, highlight, desc }: TextProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      {subtitle && <SubTitle>{subtitle}</SubTitle>}
      <Desc>
        <span>{highlight}</span>
        {desc}
      </Desc>
    </Container>
  );
};

export default Text;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 800;
  color: ${COLORS.bk};
`;

const SubTitle = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: ${COLORS.bk};
`;

const Desc = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: ${COLORS.g3};

  span {
    color: ${COLORS.main};
  }
`;
