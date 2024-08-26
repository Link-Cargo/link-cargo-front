export const fileData = [
  {
    title: '문서',
    cnt: 20,
  },
  {
    title: '사진',
    cnt: 18,
  },
];

export interface ChatProps {
  id: number;
  userInfo: {
    name: string;
    company: string;
  };
  chatInfo: {
    sender: 'me' | 'other';
    content: string;
    date: string;
  }[];
  requestInfo: string;
  noti: number;
  status: boolean;
}

export const chatData: ChatProps[] = [
  {
    id: 0,
    userInfo: {
      name: '김동현',
      company: 'KMTC | 00기업 대리',
    },
    chatInfo: [
      {
        sender: 'me',
        content:
          '김동현 대리님, 안녕하세요. 인천항에서 상하이항으로의 화물 운송 견적을 받고 싶습니다. 예상 운송비와 소요 시간을 알려주세요.',
        date: '오전 10:00',
      },
      {
        sender: 'other',
        content:
          '안녕하세요. 요청하신 인천항 → 상하이항의 운송비는 약 5000달러이며, 소요 시간은 약 10일입니다. 추가 문의사항이 있으시면 말씀해 주세요.',
        date: '오전 11:26',
      },
    ],
    requestInfo: '인천항 → 상하이항 | ETD: 24.06.24 - ETA: 24.07.01',
    noti: 1,
    status: true,
  },
  {
    id: 1,
    userInfo: {
      name: '김현우',
      company: 'KMTC | 00기업 대리',
    },
    chatInfo: [
      {
        sender: 'me',
        content:
          '김현우 대리님, 안녕하세요. 제시된 운송 일정에 대해 문의 드립니다. 현재 화물이 고온에 민감한데, 이를 고려한 별도의 보온 조치가 가능한지 알려주세요.',
        date: '오전 09:22',
      },
      {
        sender: 'other',
        content:
          '안녕하세요. 보온 조치가 가능하며, 추가 비용이 발생합니다. 정확한 비용과 조치 사항에 대한 세부 사항은 별도로 안내드리겠습니다.',
        date: '오전 09:26',
      },
    ],
    requestInfo: '인천항 → 상하이항 | ETD: 24.06.24 - ETA: 24.07.01',
    noti: 1,
    status: true,
  },
  {
    id: 2,
    userInfo: {
      name: '전하린',
      company: 'KMTC | 00기업 대리',
    },
    chatInfo: [
      {
        sender: 'me',
        content:
          '전하린 대리님, 안녕하세요. 항공 운송과 해상 운송의 비용 차이를 알고 싶습니다. 두 방법의 차이를 비교해 주세요.',
        date: '오전 10:30',
      },
      {
        sender: 'other',
        content:
          '안녕하세요. 항공 운송은 해상 운송에 비해 빠르지만 비용이 약 3배 비쌉니다. 상세 견적은 첨부된 문서에서 확인해 주세요.',
        date: '오전 11:26',
      },
    ],
    requestInfo: '인천항 → 상하이항 | ETD: 24.06.24 - ETA: 24.07.01',
    noti: 1,
    status: false,
  },
  {
    id: 3,
    userInfo: {
      name: '이승명',
      company: 'KMTC | 00기업 대리',
    },
    chatInfo: [
      {
        sender: 'me',
        content:
          '이승명 대리님, 안녕하세요. 제 화물의 포장 상태가 좋지 않아 걱정입니다. 포장 상태를 점검해 주시고, 추가 포장 비용이 드는지 알려주세요.',
        date: '오전 10:26',
      },
      {
        sender: 'other',
        content:
          '안녕하세요. 포장 상태를 점검한 결과, 추가 포장이 필요합니다. 포장 비용과 세부 사항을 별도로 안내드리겠습니다.',
        date: '오후 05:23',
      },
    ],
    requestInfo: '인천항 → 상하이항 | ETD: 24.06.24 - ETA: 24.07.01',
    noti: 1,
    status: false,
  },
  {
    id: 4,
    userInfo: {
      name: '권시경',
      company: 'KMTC | 00기업 대리',
    },
    chatInfo: [
      {
        sender: 'me',
        content:
          '권시경 대리님, 안녕하세요. 화물의 특수 요구사항이 있는 경우, 어떻게 처리해야 하는지에 대해 안내 부탁드립니다.',
        date: '오전 11:26',
      },
      {
        sender: 'other',
        content:
          '안녕하세요. 특수 요구사항은 추가 비용이 발생할 수 있으며, 요구사항에 따라 처리 방안을 논의해야 합니다. 자세한 사항은 상담 후 안내드리겠습니다.',
        date: '오전 11:26',
      },
    ],
    requestInfo: '인천항 → 상하이항 | ETD: 24.06.24 - ETA: 24.07.01',
    noti: 1,
    status: true,
  },
];
