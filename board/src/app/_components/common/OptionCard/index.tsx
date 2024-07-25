import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

export interface OptionCardProps {
  select: {
    isSelected: boolean;
    num: number;
  };
  data: {
    id: number;
    이미지: string;
    운송사: string;
    ETD: string;
    ETA: string;
    소요일: string;
    서류마감일: string;
    화물마감일: string;
  };
  onClick: () => void;
}

const OptionCard = ({ select, data, onClick }: OptionCardProps) => {
  return (
    <StyledOptionCard isSelected={select.isSelected} onClick={onClick}>
      {select.num > 0 && <p>{select.num}</p>}
      <img src={data.이미지} alt={`${data.운송사} 이미지`} />
      <ul>
        <li>
          <span>운송사</span>
          <span>{data.운송사}</span>
        </li>
        <li>
          <span>ETD</span>
          <span>{data.ETD}</span>
        </li>
        <li>
          <span>ETA</span>
          <span>{data.ETA}</span>
        </li>
        <li>
          <span>소요일</span>
          <span>{data.소요일}</span>
        </li>
        <li>
          <span>서류 마감일</span>
          <span>{data.서류마감일}</span>
        </li>
        <li>
          <span>화물 마감일</span>
          <span>{data.화물마감일}</span>
        </li>
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
  box-shadow: ${({ isSelected }) =>
    isSelected ? `0 0 0 2px ${COLORS.main} inset` : 'none'};
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
    background-color: ${({ isSelected }) =>
      isSelected ? `${COLORS.main}33` : 'transparent'};
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
    z-index: 99;
  }

  img {
    width: 100%;
    height: auto;
  }

  ul {
    margin: 0;
    padding: 0;
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
    flex: 1;
  }

  ul > li > span:nth-child(2) {
    text-align: left;
    flex: 1;
  }
`;
