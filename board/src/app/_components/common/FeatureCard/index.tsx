import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

export interface FeatureCardProps {
  title: string;
  desc: string;
  bgColor: string;
  imgSrc: string;
}

const FeatureCard = ({ title, desc, bgColor, imgSrc }: FeatureCardProps) => {
  return (
    <StyledFeatureCard bgColor={bgColor}>
      <img src={imgSrc} />
      <h3>{title}</h3>
      <p>{desc}</p>
    </StyledFeatureCard>
  );
};

export default FeatureCard;

interface StyledFeatureCardProps {
  bgColor: string;
}

const StyledFeatureCard = styled.div<StyledFeatureCardProps>`
  background-color: ${({ bgColor }) => bgColor};
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  padding: 32px;
  border: none;
  text-align: left;
  width: 332px;
  gap: 20px;

  img {
    width: 80px;
    height: 80px;
  }

  h3 {
    font-size: 25px;
    line-height: 30px;
    font-weight: 700;
    color: ${COLORS.w};
  }

  p {
    font-size: 13px;
    line-height: 20px;
    font-weight: 500;
    color: ${COLORS.g1};
  }
`;
