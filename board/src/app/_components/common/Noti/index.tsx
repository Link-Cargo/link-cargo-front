'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import { NotificationItemProps } from './util';

interface NotiProps {
  data: NotificationItemProps[];
}

export const Noti = ({ data }: NotiProps) => {
  return (
    <NotificationDropdown>
      <DropdownHeader>
        <span>모두 확인</span>
        <span>모두 삭제</span>
      </DropdownHeader>
      <NotificationList>
        {data.map((item, index) => (
          <NotificationItem key={index} type={item.type}>
            <div>
              <h6>{item.date}</h6>
              <h3>{item.title}</h3>
            </div>
            <h4>{item.desc}</h4>
            {item.type === 'ad' && item.add && (
              <>
                <p>{item.add.content1}</p>
                <ul>
                  <li>
                    {item.add.content2}
                    <span>{item.add.content2_1}</span>
                  </li>
                  <li>
                    {item.add.content3}
                    <span>{item.add.content3_1}</span>
                  </li>
                </ul>
                <div>
                  {item.add.content4.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </>
            )}
          </NotificationItem>
        ))}
      </NotificationList>
    </NotificationDropdown>
  );
};

const NotificationDropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 20, 0.1);
  border-radius: 40px;
  width: 600px;
  height: 670px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const DropdownHeader = styled.div`
  height: 70px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 0 20px;
  align-items: center;

  span {
    font-size: 16px;
    color: ${COLORS.g3};
    cursor: pointer;
    padding: 12px 16px;
    &:hover {
      color: ${COLORS.main};
    }
  }
`;

const NotificationList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const NotificationItem = styled.div<{ type: 'noti' | 'ad' }>`
  padding: 20px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  background-color: ${({ type }) =>
    type === 'ad' ? 'rgba(76, 119, 231, 0.1)' : 'transparent'};

  &:hover {
    background-color: ${COLORS.g0};
  }

  h3 {
    font-size: 24px;
    color: ${COLORS.bk};
    font-weight: 800;
  }

  h4 {
    font-size: 20px;
    color: ${COLORS.bk};
    font-weight: 400;
  }

  h6 {
    font-size: 14px;
    color: ${COLORS.g4};
    font-weight: 400;
    line-height: 18px;
  }

  p {
    font-size: 16px;
    color: ${COLORS.g4};
    font-weight: 400;
    line-height: 18px;
  }

  ul {
    padding: 15px;
    background-color: ${COLORS.w};
    border-radius: 16px;
    margin: 0;
  }

  li {
    list-style: none;
    line-height: 20px;
  }
`;
