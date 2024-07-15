'use client';

import React from 'react';
import styled from 'styled-components';

interface TestProps {
  title: string;
}

const Test = ({ title }: TestProps) => {
  return (
    <>
      <Title>{title}</Title>
    </>
  );
};

export default Test;

const Title = styled.div`
  border-radius: 50px;
  border: 1px solid #333;
  width: 200px;
  padding: 10px;
  text-align: center;
`;
