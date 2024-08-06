'use client';

import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

interface ListItem {
  title: string;
  section: React.ReactNode;
}

interface ListProps {
  listData: ListItem[];
  selectedTitle: string;
  onSectionChange: (section: React.ReactNode, title: string) => void;
}

export const List = ({
  listData,
  selectedTitle,
  onSectionChange,
}: ListProps) => {
  return (
    <Container>
      {listData.map((item, index) => (
        <Item
          key={index}
          onClick={() => onSectionChange(item.section, item.title)}
          isSelected={item.title === selectedTitle}
        >
          {item.title}
        </Item>
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

const Item = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  color: ${({ isSelected }) => (isSelected ? COLORS.main : COLORS.g3)};
  font-size: 16px;
  font-weight: 600;
  line-height: 44px;

  &:hover {
    text-decoration: underline;
  }
`;
