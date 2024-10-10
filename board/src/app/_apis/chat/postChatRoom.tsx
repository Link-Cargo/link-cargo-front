import { postAsync, ResponseDto } from '../common';

export interface ChatRoomContent {
  targetUserId: number; //포워더id
  schedule: string;
}

export interface ResultData {
  chatRoomId: number;
}

export type PostIChatRoomDto = ResponseDto<ResultData>;

export const postChatRoom = async (req_body: ChatRoomContent, at: string) => {
  const url = `/chat/rooms`;
  const response = await postAsync<PostIChatRoomDto, ChatRoomContent>(
    url,
    req_body,
    at,
  );
  return response;
};
