'use client';

import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import { useRouter } from 'next/navigation';

export const Nav = () => {
  const router = useRouter();

  return (
    <Container>
      <Logo>
        <img src="/logo.png" alt="Logo" onClick={() => router.push('/main')} />
      </Logo>
      <Links>
        <a href="/freight-quote">운임 조회</a>
        <a href="/dashboard">나의 대시보드</a>
        <Icon className="material-icons">{'notifications'}</Icon>
      </Links>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
`;

const Links = styled.div`
  display: flex;
  gap: 12px;

  a {
    color: ${COLORS.main};
    font-size: 16px;
    font-weight: 600;
    line-height: 44px;
    text-decoration: none;
  }
`;

const Logo = styled.div`
  width: 210px;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
  }
`;

const Icon = styled.span`
  font-size: 35px;
  color: ${COLORS.main};
  line-height: 44px;
  cursor: pointer;
`;
