'use client';

import React from 'react';
import styled from 'styled-components';
import { MoonLoader } from 'react-spinners';
import { COLORS } from '@/app/_constant/color';

interface LoadingProps {
  width?: string;
  height?: string;
}

const LoadingContainer = styled.div<LoadingProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
`;

export default function Loading({ width, height }: LoadingProps) {
  return (
    <LoadingContainer width={width} height={height}>
      <MoonLoader size={60} color={COLORS.main} />
    </LoadingContainer>
  );
}
