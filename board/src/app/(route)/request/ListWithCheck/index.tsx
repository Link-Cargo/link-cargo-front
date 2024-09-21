import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

interface ListWithCheckProps {
  text: string;
  type: 'title' | 'subTitle';
  onClick: () => void;
  isChecked?: boolean;
}

const ListWithCheck = ({
  text,
  type,
  onClick,
  isChecked = false,
}: ListWithCheckProps) => {
  return (
    <AgreementList type={type}>
      <input type="checkbox" onChange={onClick} checked={isChecked} />
      <span>{text}</span>
    </AgreementList>
  );
};

export default ListWithCheck;

interface AgreementListProps {
  type: 'title' | 'subTitle';
}

const AgreementList = styled.div<AgreementListProps>`
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: ${({ type }) =>
    type === 'title' ? `1px solid ${COLORS.g1}` : 'none'};

  span {
    flex: 1;
    gap: 4px;
    line-height: 44px;

    font-size: 16px;
    color: ${COLORS.g5};
  }

  /* 기본 체크박스 숨기기 */
  input[type='checkbox'] {
    width: 20px;
    height: 20px;
    border: 2px solid ${COLORS.g2}; 
    border-radius: 10px; 
    background-color: white;
    cursor: pointer;
  }
  
  input[type='checkbox']:checked {
    background-color: ${COLORS.main};
    border-color: ${COLORS.main}; /* 선택 시 테두리 색상 */
    color: white;
    position: relative;
  }
  
  input[type='checkbox']:checked::after {
    font-size: 14px;
    color: white;
    position: absolute;
`;
