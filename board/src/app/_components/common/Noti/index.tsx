'use client';

import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

import { Notification } from '@/app/_apis/noti/getNoti';

interface notiProps {
  notifications?: Notification[];
  notiReadHandler: (id?: number) => void;
}

export const Noti = (props: notiProps) => {
  const notifications = props.notifications;
  function notiReadHandler(id?: number) {
    props.notiReadHandler(id);
  }

  return (
    <NotificationDropdown>
      <DropdownHeader>
        <span onClick={() => notiReadHandler()}>모두 확인</span>
        <span>모두 삭제</span>
      </DropdownHeader>
      <NotificationList>
        {notifications?.map((item, index) => (
          <NotificationItem
            key={index}
            type="noti"
            isRead={item.isRead}
            onClick={() => notiReadHandler(item.id)}
          >
            <div>
              <h6>{item.date || '2023년 9월 20일 | 오전 9시 20분'} </h6>
              <h3>{item.title}</h3>
            </div>
            <h4>{item.content}</h4>
          </NotificationItem>
        ))}
      </NotificationList>
    </NotificationDropdown>
  );
};

// export const Noti = ({ notifications, ...rest }: GetINotiDto) => {
//   return (
//     <NotificationDropdown>
//       <DropdownHeader>
//         <span>모두 확인</span>
//         <span>모두 삭제</span>
//       </DropdownHeader>
//       <NotificationList>
//         {notifications?.map((item, index) => (
//           <NotificationItem key={index} type="noti">
//             <div>
//               <h6>{item.date}</h6>
//               <h3>{item.title}</h3>
//             </div>
//             <h4>{item.content}</h4>
//             {/* {item.type === 'ad' && item.add && (
//               <>
//                 <p>{item.add.content1}</p>
//                 <ul>
//                   <li>
//                     {item.add.content2}
//                     <span>{item.add.content2_1}</span>
//                   </li>
//                   <li>
//                     {item.add.content3}
//                     <span>{item.add.content3_1}</span>
//                   </li>
//                 </ul>
//                 <div>
//                   {item.add.content4.map((el: string) => (
//                     <p key={el}>{el}</p>
//                   ))}
//                 </div>
//                 <FlexContainer>
//                   <Button
//                     text="화물정보 입력하러 가기"
//                     flexValue={1}
//                     type="dark"
//                     onClick={() => {}}
//                   />
//                   <Button
//                     text="담당자 문의 바로가기"
//                     flexValue={1}
//                     type="dark"
//                     onClick={() => {}}
//                   />
//                 </FlexContainer>
//               </>
//             )} */}
//           </NotificationItem>
//         ))}
//       </NotificationList>
//     </NotificationDropdown>
//   );
// };

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

const NotificationItem = styled.div<{ type: 'noti' | 'ad'; isRead: boolean }>`
  position: relative;
  padding: 20px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;

  background-color: ${({ type }) =>
    type === 'ad' ? 'rgba(76, 119, 231, 0.1)' : 'transparent'};

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

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;
