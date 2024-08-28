export interface NotificationItemProps {
  type: 'noti' | 'ad';
  date: string;
  title: string;
  desc: string;
  add?: {
    content1: string;
    content2: string;
    content2_1: string;
    content3: string;
    content3_1: string;
    content4: string[];
  };
}

export const notiData: NotificationItemProps[] = [
  {
    type: 'ad',
    date: '오전 09:56',
    title: 'Link cargo',
    desc: '(광고) 링카고 화주님! 올해 수출계획은 어떻게 되시나요?',
  },
  {
    type: 'noti',
    date: '오전 09:56',
    title: '견적서 도착',
    desc: '금영글로벌(주) 포워딩 업체',
  },
  {
    type: 'noti',
    date: '오전 09:56',
    title: '메시지 도착',
    desc: '주식회사 A로지스 포워딩 업체',
  },

  {
    type: 'ad',
    date: '오전 09:56',
    title: 'Link cargo',
    desc: '(광고) 링카고 화주님! 올해 수출계획은 어떻게 되시나요?',
    add: {
      content1:
        '작년 8월에 베트남으로 화장품을 수출하셨네요! 올해 3분기 최저 운임지수를 확인해보세요.',
      content2: '베트남 북부지역 주요항만 3분기 최저 운임 시기 예상 시기',
      content2_1: '9월초',
      content3: '현재 운임 : 146.13  → 9월 2주차 예상운임 :',
      content3_1: '120.13',
      content4: [
        '2023.08.21 수출계약 포워딩 업체 정보',
        '포워딩 업체: 금영글로벌(주)',
        '담당자: 홍길동 대리',
        '담당자 전화번호: 010-1234-5678',
        '담당자 이메일: akjfalfj@guem.ac.kr',
      ],
    },
  },
  {
    type: 'noti',
    date: '오전 09:56',
    title: '메시지 도착',
    desc: '주식회사 A로지스 포워딩 업체',
  },
  {
    type: 'noti',
    date: '오전 09:56',
    title: '견적서 도착',
    desc: '금영글로벌(주) 포워딩 업체',
  },
  {
    type: 'noti',
    date: '오전 09:56',
    title: '메시지 도착',
    desc: '주식회사 A로지스 포워딩 업체',
  },
];
