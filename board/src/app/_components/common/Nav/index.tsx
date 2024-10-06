'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Noti } from '../Noti';

import { NotiApiService, GetINotiDto } from '@/app/_apis/noti';
import { getTokenFromLocalStorage, handleLogout } from '@/app/_utils/auth';

interface NavProps {
  type?: 'default' | 'main';
}

export const Nav = ({ type = 'default' }: NavProps) => {
  /*---- router ----*/
  const router = useRouter();
  /*---- auth ----*/
  const tokens = getTokenFromLocalStorage();
  const accessToken = tokens?.accessToken || '';

  /*---- hooks ----*/
  const queryClient = useQueryClient();
  /*---- state ----*/
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  /*---- function ----*/
  const notiReadHandler = (_id?: number) => {
    if (_id) {
      markAsRead(_id);
    } else {
      markAsAllRead();
    }
  };
  /*---- api call function ----*/
  const {
    data: notiData,
    error: notiError,
    isLoading: notiLoading,
  } = useQuery<GetINotiDto, Error>({
    queryKey: ['noti'],
    queryFn: () => NotiApiService.getNoti(accessToken),
    enabled: !!accessToken,
  });

  const {
    mutate: markAsRead,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: (id: number) => NotiApiService.putNoti(id, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['noti'] });
    },
  });

  const { mutate: markAsAllRead } = useMutation({
    mutationFn: () => NotiApiService.putNotiAll(accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['noti'] });
    },
  });

  const { mutate: deleteAllNoti } = useMutation({
    mutationFn: () => NotiApiService.deleteNotiAll(accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['noti'] });
    },
  });

  useEffect(() => {
    if (!accessToken) {
      // router.push('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  /*---- jsx ----*/
  return (
    <Container type={type}>
      <ContentWrapper>
        <Logo>
          <img
            src="/logo.png"
            alt="Logo"
            onClick={() => router.push('/main')}
          />
        </Logo>
        <Links type={type}>
          {isLoggedIn && <a href="/dashboard">나의 대시보드</a>}
          <a href="/freight-quote">운임 조회</a>
          {isLoggedIn ? (
            <span
              onClick={() => {
                setIsLoggedIn(false);
                handleLogout();
                router.push('/login');
              }}
            >
              로그아웃
            </span>
          ) : (
            <a href="/login">로그인</a>
          )}
          {isLoggedIn && (
            <IconContainer>
              <Icon
                onClick={() => setIsOpen(!isOpen)}
                className="material-icons"
              >
                {'notifications'}
              </Icon>
              {isOpen && (
                <Noti
                  notifications={notiData?.notifications}
                  notiReadHandler={notiReadHandler}
                  notiDeleteHandler={deleteAllNoti}
                />
              )}
            </IconContainer>
          )}
        </Links>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div<NavProps>`
  width: 100%;
  ${({ type }) =>
    type === 'main'
      ? `
      background: linear-gradient(to bottom, #fff 0%, rgba(255, 255, 255, 0) 80%);
      padding: 40px 0;
      height: 150px;

      position: absolute;
      top: 0;
      z-index: 99;
      `
      : `
      background-color: transparent;
      padding: 10px 0px;
      margin: 30px auto;
      `}
`;

const ContentWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const Links = styled.div<NavProps>`
  display: flex;
  gap: 12px;
  align-items: center;

  a,
  span {
    color: ${COLORS.main};
    font-size: 16px;
    font-weight: 600;
    line-height: 44px;
    text-decoration: none;
    padding: 0px 20px;
    border-radius: 100px;
    height: 44px;
    line-height: 44px;

    cursor: pointer;

    background-color: ${({ type }) =>
      type === 'main' ? 'rgba(250, 250, 250, 0.4)' : 'transparent'};
    backdrop-filter: ${({ type }) => (type === 'main' ? 'blur(4px)' : 'none')};
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

const IconContainer = styled.div`
  position: relative;
`;

const Icon = styled.div`
  font-size: 35px;
  color: ${COLORS.main};
  line-height: 44px;
  cursor: pointer;
`;
