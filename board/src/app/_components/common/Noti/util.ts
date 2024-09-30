import { Notification } from '@/app/_apis/noti/getNoti';

export const AD_NOTI: Notification = {
  id: 100,
  userId: 0,
  type: 'ADMIN',
  title: 'Link cargo',
  content: '(광고) 링카고 화주님! 올해 수출계획은 어떻게 되시나요?',
  buttonTitle: '화물정보 입력하러 가기',
  buttonUrl: 'http://www.link-cargo.com/freight-quote',
  createdAt: '오전 09:56',
  isRead: false,
  add: [
    {
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
  ],
};
