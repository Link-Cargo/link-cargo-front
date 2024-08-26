import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

export interface OptionCardProps {
  select: {
    isSelected: boolean;
    num: number;
  };
  data: Record<string, any>;
  onClick: () => void;
}

const OptionCard = ({ select, data, onClick }: OptionCardProps) => {
  return (
    <StyledOptionCard isSelected={select.isSelected} onClick={onClick}>
      {select.num > 0 && <p>{select.num}</p>}
      {data.imageUrl && <img src={data.imageUrl} alt={`${data.선명} 이미지`} />}
      <ul>
        {Object.entries(data).map(
          ([key, value]) =>
            key !== 'imageUrl' && (
              <li key={key}>
                <span>{key}</span>
                <span>{value}</span>
              </li>
            ),
        )}
      </ul>
    </StyledOptionCard>
  );
};

export default OptionCard;

interface StyledOptionCardProps {
  isSelected: boolean;
}

const StyledOptionCard = styled.div<StyledOptionCardProps>`
  background-color: ${COLORS.w};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-radius: 12px;
  width: 268px;
  overflow: hidden;
  position: relative;
  padding-bottom: 32px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid
      ${({ isSelected }) => (isSelected ? COLORS.main : 'transparent')};
    background-color: ${({ isSelected }) =>
      isSelected ? `${COLORS.main}33` : 'transparent'};
    border-radius: 12px;
    z-index: 2;
    pointer-events: none;
  }

  p {
    margin: 0;
    position: absolute;
    border-radius: 100px;
    background-color: #fff;
    color: #000;
    line-height: 32px;
    width: 32px;
    height: 32px;
    text-align: center;
    top: 10px;
    right: 10px;
    z-index: 3;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    z-index: 1;
  }

  ul {
    margin: 0;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  li {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    color: ${COLORS.g4};
    display: flex;
    gap: 16px;
    width: 100%;
    justify-content: center;
  }

  ul > li:nth-child(1) > span:nth-child(2),
  ul > li:nth-child(2) > span:nth-child(2),
  ul > li:nth-child(3) > span:nth-child(2) {
    color: ${COLORS.main};
  }

  ul > li:nth-child(1) > span:nth-child(2) {
    font-weight: 800;
  }

  ul > li > span:nth-child(1) {
    text-align: right;
    flex: 2;
  }

  ul > li > span:nth-child(2) {
    text-align: left;
    flex: 3;
  }
`;
