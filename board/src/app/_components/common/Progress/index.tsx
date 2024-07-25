'use client';

import React from 'react';
import styled from 'styled-components';
import ProgressEl from './El';
import { StateType, titles } from './utill';

interface CurrProps {
  level: number;
}

const Progress = ({ level }: CurrProps) => {
  return (
    <Container>
      {titles.map((el, index) => (
        <ProgressEl
          key={index}
          idx={index + 1}
          step={
            index + 1 < level
              ? StateType.PREV
              : index + 1 === level
                ? StateType.CURRENT
                : StateType.NEXT
          }
          title={el}
        />
      ))}
    </Container>
  );
};

export default Progress;

const Container = styled.div`
  display: flex;
  min-width: 500px;
  width: 580px;
  justify-content: space-between;
`;
