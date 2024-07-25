'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import { StateType } from './utill';

interface ProgressElProps {
  step: StateType;
  idx: number;
  title: string;
}

const ProgressEl = ({ step, idx, title }: ProgressElProps) => {
  return (
    <El>
      <Circle step={step}>{idx}</Circle>
      <Title step={step}>{title}</Title>
    </El>
  );
};

export default ProgressEl;

const Circle = styled.div<{ step: StateType }>`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  line-height: 64px;
  text-align: center;
  font-size: 24px;

  ${({ step }) =>
    step === StateType.PREV &&
    css`
      background-color: ${COLORS.main};
      color: ${COLORS.w};
    `}
  ${({ step }) =>
    step === StateType.CURRENT &&
    css`
      box-shadow: 0px 0px 10px 0px rgba(37, 44, 81, 0.5);
      background-color: ${COLORS.main};
      color: white;
    `}
    ${({ step }) =>
    step === StateType.NEXT &&
    css`
      background-color: ${COLORS.w};
      color: ${COLORS.g2};
    `};
`;

const Title = styled.div<{ step: StateType }>`
  font-size: 16px;
  text-align: center;

  ${({ step }) =>
    step === StateType.PREV &&
    css`
      color: ${COLORS.g3};
      font-weight: 600;
    `}

  ${({ step }) =>
    step === StateType.CURRENT &&
    css`
      color: ${COLORS.bk};
      font-weight: 800;
    `}

  ${({ step }) =>
    step === StateType.NEXT &&
    css`
      color: ${COLORS.g3};
      font-weight: 400;
    `}
`;

const El = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80px;
  align-items: center;
`;
