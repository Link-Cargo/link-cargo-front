import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import styled from 'styled-components';
import Layout from '@/app/_components/dashboard/Layout';
import { CheckboxInput, TextInput } from '@/app/_components/common/Input';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import { COLORS } from '@/app/_constant/color';
import { getTokenFromLocalStorage } from '@/app/_utils/auth';
import { useQuery } from '@tanstack/react-query';

import { GetIUserDto, OnboardApiService } from '@/app/_apis/onboard';

export default function MyChatHistory() {
  /*---- auth ----*/
  const tokens = getTokenFromLocalStorage();
  /*---- state ----*/
  //전체/부킹요청포워더 선택
  const [checkedItems, setCheckedItems] = useState<string>('');
  //채팅방 리스트 중 선택한 채팅방
  const [selectChatRoom, setSelectChatRoom] = useState<any>(null);
  //채팅방 리스트
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  //채팅방에서 조회되는 채팅 리스트
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  //채팅방에서 조회되는 파일 리스트
  const [chatFiles, setChatFiles] = useState<any>({});
  //소켓 연결
  const [stompClient, setStompClient] = useState<Client | null>(null);
  //입력한 채팅창 메세지
  const [messageInput, setMessageInput] = useState('');
  //스크롤 위치 ref
  const messagesEndRef = useRef<HTMLDivElement>(null);
  //부킹요청 버튼 상태
  const [요청, set요청] = useState(false);
  //로그인 된 사용자 id
  const [userId, setUserId] = useState<number>();

  /*---- api call function ----*/
  const { data: UserData } = useQuery<GetIUserDto, Error>({
    queryKey: ['User'],
    queryFn: () => OnboardApiService.getUser(tokens?.accessToken),
    enabled: !!tokens?.accessToken,
  });

  useEffect(() => {
    setUserId(UserData?.result.user.id);
  }, []);

  //GET 채팅방 리스트
  useEffect(() => {
    if (tokens?.accessToken) {
      axios
        .get('http://www.link-cargo-dev.com/api/v1/chat/rooms', {
          headers: { Authorization: `Bearer ${tokens.accessToken}` },
        })
        .then((response) => {
          const rooms = response.data.result.chatRooms;
          setChatRooms(rooms);
          if (rooms.length > 0) {
            setSelectChatRoom(rooms[0]);
            setupWebSocket(rooms[0].chatRoomId);
            fetchMessages(rooms[0].chatRoomId);
            fetchFiles(rooms[0].chatRoomId);
          }
        });
    }
  }, [tokens?.accessToken]);

  // 소켓 연결
  const setupWebSocket = (roomId: number) => {
    const socketUrl = 'ws://43.202.227.122:8080/ws/chat';
    const client = new Client({
      connectHeaders: { Authorization: `Bearer ${tokens?.accessToken}` },
      debug: (str) => console.log(str),
      reconnectDelay: 10000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      webSocketFactory: () => new WebSocket(socketUrl),
    });

    client.onConnect = () => {
      setStompClient(client);
      client.subscribe(`/sub/chatroom/${roomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setChatMessages((prevMessages) => {
          if (prevMessages.some((msg) => msg.id === newMessage.id)) {
            return prevMessages;
          }
          return [...prevMessages, newMessage];
        });
      });
    };

    client.onStompError = (frame) => {
      console.error(`Broker reported error: ${frame.headers['message']}`);
    };
    client.activate();
  };

  //채팅룸 선택, 선택한 채팅룸 소켓 연결
  const selectChatRoomHandler = useCallback(
    (room: any) => {
      setSelectChatRoom(room);
      if (stompClient) {
        stompClient.deactivate();
      }
      setupWebSocket(room.chatRoomId);
      fetchMessages(room.chatRoomId);
      fetchFiles(room.chatRoomId);
    },
    [stompClient],
  );

  // 텍스트 메세지 채팅 전송
  const sendMessage = () => {
    if (stompClient && messageInput && userId) {
      const message = {
        chatRoomId: selectChatRoom.chatRoomId,
        messageType: 'CHAT',
        content: messageInput,
      };

      stompClient.publish({
        destination: '/pub/chat',
        body: JSON.stringify(message),
      });

      setMessageInput('');
      fetchMessages(selectChatRoom.chatRoomId);
    }
  };

  //GET 선택한 채팅룸 파일 조회
  const fetchFiles = (roomId: number) => {
    axios
      .get(`http://www.link-cargo-dev.com/api/v1/chat/${roomId}/file`, {
        headers: { Authorization: `Bearer ${tokens?.accessToken}` },
      })
      .then((response) => {
        setChatFiles(response.data.result);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  };

  //GET 선택한 채팅룸 채팅 조회
  const fetchMessages = (roomId: number) => {
    axios
      .get(`http://www.link-cargo-dev.com/api/v1/chat/${roomId}/messages`, {
        headers: { Authorization: `Bearer ${tokens?.accessToken}` },
      })
      .then((response) => {
        setChatMessages(response.data.result.chats);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  };

  //날짜 포매팅
  const formatDate = (dateInput: string | number[]): string => {
    if (Array.isArray(dateInput)) {
      const [year, month, day, hour, minute, second] = dateInput;
      return `${year}년${String(month).padStart(2, '0')}월 ${String(day).padStart(2, '0')}일 ${String(hour).padStart(2, '0')}시${String(minute).padStart(2, '0')}분`;
    }

    if (typeof dateInput === 'string' && !isNaN(Date.parse(dateInput))) {
      const date = new Date(dateInput);

      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}.`;
    }

    return 'Invalid Date Format';
  };

  //엔터 키보드 이벤트
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      sendMessage();
      scrollToBottom();
    }
  };

  //채팅 하단으로 항상 스크롤 내리기
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <Layout>
      <FlexBox>
        <UtilBox>
          <div>
            <TextInput
              type="text"
              placeholder="검색어 입력"
              name="search"
              value=""
              onChange={() => {}}
            />
          </div>
          <CheckboxInput
            label=""
            name="관련정보 요약"
            options={[
              { value: '전체', label: '전체' },
              { value: '부킹요청 포워더', label: '부킹요청 포워더' },
            ]}
            selectedOptions={checkedItems}
            onChange={(e) => setCheckedItems(e.target.value)}
          />
          <ChatList>
            {chatRooms.map((room) => (
              <ChatEl
                key={room.chatRoomId}
                onClick={() => selectChatRoomHandler(room)}
                isSelected={selectChatRoom?.chatRoomId === room.chatRoomId}
              >
                <h3>{room.targetUserName}</h3>
                <ChatSummary>
                  <div>{room.latestContent}</div>
                </ChatSummary>
              </ChatEl>
            ))}
          </ChatList>
        </UtilBox>
        <ContentBox>
          <Top>
            {selectChatRoom && (
              <>
                <div>
                  <b>{selectChatRoom.targetUserName}</b>
                  <span>{selectChatRoom.targetUserCompany}</span>
                  <div>{selectChatRoom.schedule}</div>
                </div>
                <div>
                  <BookingButton status={요청} onClick={() => set요청(!요청)}>
                    {요청 ? '부킹요청' : '부킹요청취소'}
                  </BookingButton>
                </div>
              </>
            )}
          </Top>
          <hr />
          <Main>
            {chatMessages.length > 0 ? (
              chatMessages.map((el, index) => {
                return (
                  <ChatBox
                    key={index}
                    type={el.senderId === userId ? 'me' : 'other'}
                  >
                    <div>{el.content}</div>
                    <p>{formatDate(el.createdAt)}</p>
                  </ChatBox>
                );
              })
            ) : (
              <NoMessage>대화 기록이 없습니다.</NoMessage>
            )}
            <div ref={messagesEndRef} />
          </Main>
          <InputContainer>
            <FileIcon>
              <FaPaperclip />
            </FileIcon>
            <TextInput
              type="text"
              name=""
              placeholder="채팅을 입력하세요"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SubmitButton onClick={sendMessage}>
              <FaPaperPlane />
            </SubmitButton>
          </InputContainer>
        </ContentBox>
        <FileBox>
          <h3>파일 {chatFiles.fileCount}개</h3>
          {chatFiles.files && chatFiles.files.length > 0 ? (
            chatFiles.files.map((el: any) => (
              <FileEl key={el.name}>
                <h6>{el.name}</h6>
                <p>{formatDate(el.createdAt)}</p>
              </FileEl>
            ))
          ) : (
            <p></p>
          )}
        </FileBox>
      </FlexBox>
    </Layout>
  );
}

const NoMessage = styled.div`
  text-align: center;
  color: ${COLORS.g4};
  font-size: 16px;
  padding: 20px;
`;

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;

  height: 700px;
`;

const UtilBox = styled.div`
  flex: 2;

  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: start;
`;

const ChatList = styled.div`
  border: 1px solid ${COLORS.g1};

  display: flex;
  flex-direction: column;
  border-radius: 12px;

  overflow-y: scroll;
  overflow-x: hidden;

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
  padding: 30px 20px;

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
  flex: 5;
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

  min-height: 400px;
  max-height: 500px;
  overflow: scroll;
`;

const ChatBox = styled.div<{ type: 'me' | 'other' }>`
  background-color: ${COLORS.g0};
  padding: 20px;
  border-radius: 12px;
  max-width: 70%;
  display: flex;
  flex-direction: column;
  align-self: ${(props) =>
    props.type === 'other' ? 'flex-start' : 'flex-end'};

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
