'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '@/app/_components/dashboard/Layout';
import { CheckboxInput, TextInput } from '@/app/_components/common/Input';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import { chatData, ChatProps, fileData } from './utils';
import { COLORS } from '@/app/_constant/color';

export default function MyChatHistory() {
  const [checkedItems, setCheckedItems] = useState<string>('');
  const [selectChatRoom, setSelectChatRoom] = useState<ChatProps>(chatData[0]);

  const handleBookingButtonClick = () => {
    setSelectChatRoom((prevChatRoom) => ({
      ...prevChatRoom,
      status: !prevChatRoom.status,
    }));
  };

  return (
    <Layout>
      <FlexBox>
        <UtilBox>
          <TextInput
            type="text"
            placeholder="검색어 입력"
            name="search"
            value=""
            onChange={() => {}}
          />
          <CheckboxInput
            label=""
            name="관련정보 요약"
            options={[
              { value: '전체', label: '전체' },
              { value: '포워더', label: '포워더' },
            ]}
            selectedOptions={checkedItems}
            onChange={(e) => setCheckedItems(e.target.value)}
          />
          <ChatList>
            {chatData.map((el: ChatProps) => (
              <ChatEl
                key={el.id}
                onClick={() => setSelectChatRoom(el)}
                isSelected={selectChatRoom.id === el.id}
              >
                <h3>{el.userInfo.name}</h3>
                <ChatSummary>
                  <div>{el.chatInfo[el.chatInfo.length - 1].content}</div>
                  <span>{el.noti}</span>
                </ChatSummary>
              </ChatEl>
            ))}
          </ChatList>
        </UtilBox>
        <ContentBox>
          <Top>
            <div>
              <b>{selectChatRoom.userInfo.name}</b>
              <span>{selectChatRoom.userInfo.company}</span>
              <div>{selectChatRoom.requestInfo}</div>
            </div>
            <div>
              <BookingButton
                status={selectChatRoom.status}
                onClick={handleBookingButtonClick}
              >
                {selectChatRoom.status ? '부킹요청' : '부킹요청취소'}
              </BookingButton>
            </div>
          </Top>
          <hr />
          <Main>
            {selectChatRoom.chatInfo.map((el, index) => (
              <ChatBox key={index} type={el.sender}>
                <div>{el.content}</div>
                <p>{el.date}</p>
              </ChatBox>
            ))}
          </Main>
          <InputContainer>
            <FileIcon>
              <FaPaperclip />
            </FileIcon>
            <TextInput
              type="text"
              placeholder="채팅을 입력하세요"
              name=""
              value=""
              onChange={() => {}}
            />
            <SubmitButton>
              <FaPaperPlane />
            </SubmitButton>
          </InputContainer>
        </ContentBox>
        <FileBox>
          <h3>파일 {fileData.reduce((sum, file) => sum + file.cnt, 0)}개</h3>
          {fileData.map((el) => (
            <FileEl key={el.title}>
              <h6>{el.title}</h6>
              <p>{el.cnt}개</p>
            </FileEl>
          ))}
        </FileBox>
      </FlexBox>
    </Layout>
  );
}

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
`;

const UtilBox = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ChatList = styled.div`
  border: 1px solid ${COLORS.g1};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 12px;

  h3 {
    font-weight: bold;
    font-size: 16px;
  }
`;

const ChatEl = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  width: 100%;
  background-color: ${(props) =>
    props.isSelected ? '#ffffff' : 'transparent'};

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChatSummary = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  div {
    font-size: 14px;
    color: ${COLORS.g4};

    width: 35px;
    flex: 1;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-weight: bold;
    padding: 4px 8px;
    height: 20px;
    width: 20px;
    line-height: 20px;
    text-align: center;
    color: ${COLORS.w};
    background-color: ${COLORS.red};
    border-radius: 16px;
  }
`;

const ContentBox = styled.div`
  flex: 3;
  background-color: ${COLORS.w};
  border-radius: 12px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  hr {
    border: 0; /* Removes the default border */
    height: 1px; /* Adjust the height as needed */
    background-color: ${COLORS.g1}; /* Sets the color of the hr line */
    margin: 20px 0; /* Optional: Adjust margin to control spacing */
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 30px;

  b {
    font-size: 16px;
    color: ${COLORS.bk};
  }

  span {
    color: ${COLORS.g3};
    font-size: 14px;
    margin-left: 10px;
  }

  div {
    color: ${COLORS.g3};
    font-size: 14px;
  }
`;

const BookingButton = styled.button<{ status: boolean }>`
  background-color: ${(props) => (props.status ? COLORS.main : COLORS.red)};
  color: white;
  border: none;
  width: 150px;
  height: 50px;
  border-radius: 50px;
  cursor: pointer;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  flex: 1;
`;

const ChatBox = styled.div<{ type: 'me' | 'other' }>`
  background-color: ${COLORS.g0};
  padding: 20px;
  border-radius: 12px;
  max-width: 70%;
  display: flex;
  flex-direction: column;
  align-self: ${(props) => (props.type === 'me' ? 'flex-end' : 'flex-start')};

  p {
    font-size: 14px;
    color: ${COLORS.g3};
    padding-top: 10px;
  }

  div {
    max-width: 100%;
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
`;

const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FileIcon = styled.div`
  border: none;
  background: transparent;
  cursor: pointer;
  width: 40px;
  font-size: 20px;
  color: ${COLORS.g3};
  text-align: center;
`;

const TextInputWithButton = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const SubmitButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  width: 40px;
  font-size: 20px;
  color: ${COLORS.g3};
`;

const FileBox = styled.div`
  flex: 1;
  font-size: 20px;
  background-color: ${COLORS.bg};
  border: 1px solid ${COLORS.g1};
  border-radius: 12px;
  padding: 20px;

  h3 {
    background-color: ${COLORS.g0};
    padding: 20px 0px;
    text-align: center;
    width: 100%;
    color: ${COLORS.g4};
    border-radius: 12px;
  }

  span {
    color: ${COLORS.bk};
  }
`;

const FileEl = styled.div`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 24px 20px;

  h6 {
    font-size: 16px;
    padding-bottom: 10px;
  }

  p {
    font-size: 14px;
  }
`;
