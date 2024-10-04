'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

import { Notification } from '@/app/_apis/noti/getNoti';
import { AD_NOTI } from './util';

interface notiProps {
  notifications?: Notification[];
  notiReadHandler: (id?: number) => void;
  notiDeleteHandler: () => void;
}

export const Noti = (props: notiProps) => {
  const [formatNoti, setFormatNoti] = useState<Notification[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null); // 클릭된 요소의 ID 상태
  const notifications = props.notifications || [];

  useEffect(() => {
    setFormatNoti([...AD_NOTI, ...notifications]);
  }, [notifications]);

  function notiReadHandler(id?: number) {
    props.notiReadHandler(id);
  }

  const handleItemClick = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id)); // 클릭된 ID와 동일하면 접기
  };

  return (
    <NotificationDropdown>
      <DropdownHeader>
        <span onClick={() => notiReadHandler()}>모두 확인</span>
        <span onClick={() => props.notiDeleteHandler()}>모두 삭제</span>
      </DropdownHeader>
      <NotificationList>
        {formatNoti.map((item, index) => {
          const isSelected = selectedId === item.id;
          return (
            <NotificationItem
              key={item.id} // 고유한 id를 key로 설정
              isSelected={isSelected}
              isRead={item.isRead}
              onClick={() => {
                notiReadHandler(item.id);
                handleItemClick(item.id);
              }}
            >
              <div>
                <h6>{item.createdAt}</h6>
                <h3>{item.title}</h3>
              </div>
              <h4>{item.content}</h4>

              {/* add가 있을 때만 렌더링 */}
              {isSelected && item.add && (
                <>
                  <p>{item.add[0].content1}</p>
                  <ul>
                    <li>
                      {item.add[0].content2}
                      <span>{item.add[0].content2_1}</span>
                    </li>
                    <li>
                      {item.add[0].content3}
                      <span>{item.add[0].content3_1}</span>
                    </li>
                  </ul>
                  <div>
                    {item.add[0].content4.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </>
              )}

              {/* add2가 있을 때만 렌더링 */}
              {isSelected && item.add2 && (
                <Add2Container>
                  {item.add2.map((info, idx) => (
                    <Add2Item key={idx}>
                      <Add2Key>{Object.keys(info)[0]}</Add2Key>
                      <Add2Value>{Object.values(info)[0]}</Add2Value>
                    </Add2Item>
                  ))}
                </Add2Container>
              )}

              <ButtonContainer>
                <CustomButton
                  href={item.buttonUrl}
                  onClick={(e) => {
                    e.stopPropagation(); // 클릭 이벤트 전파 방지
                    notiReadHandler(item.id);
                  }}
                >
                  {item.buttonTitle}
                </CustomButton>
              </ButtonContainer>
            </NotificationItem>
          );
        })}
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

const NotificationItem = styled.div<{ isSelected: boolean; isRead: boolean }>`
  position: relative;
  padding: 20px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? 'rgba(76, 119, 231, 0.1)' : 'transparent'};

  &:hover {
    position: relative;
    z-index: 0;
    background-color: ${COLORS.g0};
  }

  /* isRead가 true일 때 반투명 오버레이 */
  ${({ isRead }) =>
    isRead &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8); /* 흰색 반투명 */
      z-index: 1; /* 텍스트 위에 표시되도록 */
    }
  `}

  /* 오버레이 아래에 텍스트가 표시되도록 z-index를 낮게 설정 */
  & > * {
    position: relative;
    z-index: -1;
  }

  h3 {
    font-size: 24px;
    color: ${COLORS.bk};
    font-weight: 800;
  }

  h4 {
    font-size: 20px;
    color: ${COLORS.g4};
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
    padding: 0px 15px;
    background-color: ${COLORS.w};
    border-radius: 16px;
    margin: 0;
    z-index: 1;
  }

  li {
    list-style: none;
    line-height: 15px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const CustomButton = styled.a`
  padding: 0px 16px !important;
  gap: 10px !important;
  border-radius: 52px !important;
  color: #fff !important;
  background-color: ${COLORS.main}!important;
  line-height: 44px !important;
  width: 146px !important;
  text-align: center !important;
  font-weight: 600 !important;
`;

const Add2Container = styled.div``;

const Add2Item = styled.div`
  display: flex;
  gap: 10px;

  font-size: 16px;
`;

const Add2Key = styled.div`
  color: rgba(89, 89, 89, 1);
  font-weight: 400;
`;

const Add2Value = styled.div`
  color: ${COLORS.main};
  font-weight: 700;
`;

export default Noti;
