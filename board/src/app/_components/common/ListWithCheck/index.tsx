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
      <span>{text}</span>
      <input type="checkbox" onChange={onClick} checked={isChecked} />
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
  padding: 12px;
  border-bottom: ${({ type }) =>
    type === 'title' ? `1px solid ${COLORS.g1}` : 'none'};

  span {
    flex: 1;
    color: ${({ type }) => (type === 'title' ? COLORS.bk : COLORS.g5)};
    font-weight: ${({ type }) => (type === 'title' ? '800' : '400')};
  }

  input[type='checkbox'] {
    margin-left: 20px;
  }
`;
