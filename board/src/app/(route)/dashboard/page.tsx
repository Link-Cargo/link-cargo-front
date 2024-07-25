'use client';

import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import Button from '@/app/_components/common/Button';
import { TextInput, CheckboxInput } from '@/app/_components/common/Input';
import { useRouter } from 'next/navigation';
import Text from '@/app/_components/common/Text';
import Layout from '@/app/_components/common/Layout';

export default function Page() {
  /*---- router ----*/
  /*---- hooks ----*/
  /*---- state ----*/
  /*---- api call function ----*/
  /*---- function ----*/
  /*---- useEffect ----*/
  /*---- jsx ----*/
  return (
    <Layout>
      <Container>
        <Text title="대시보드" />
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  width: 850px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding-top: 20px;
`;
