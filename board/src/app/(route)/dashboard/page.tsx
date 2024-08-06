'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '@/app/_components/common/Layout';
import { List } from '@/app/_components/dashboard/List';
import ProfileCard from '@/app/_components/dashboard/Profile';
import {
  CompareFreightRates,
  CompareQuotes,
  Overview,
  MyChatHistory,
  PaymentHistory,
} from './(section)';

interface ListItem {
  title: string;
  section: React.ReactNode;
}

export const dashboardListConfigs: ListItem[] = [
  {
    title: '한눈에 보기',
    section: <Overview />,
  },
  {
    title: '견적서 비교',
    section: <CompareQuotes />,
  },
  {
    title: '운임 관련 비교',
    section: <CompareFreightRates />,
  },
  {
    title: '나의 대화 이력',
    section: <MyChatHistory />,
  },
  {
    title: '결제 내역',
    section: <PaymentHistory />,
  },
];

export default function Page() {
  const [selectedSection, setSelectedSection] = useState<React.ReactNode>(
    <Overview />,
  );
  const [selectedTitle, setSelectedTitle] = useState<string>('한눈에 보기');

  const handleSectionChange = (section: React.ReactNode, title: string) => {
    setSelectedSection(section);
    setSelectedTitle(title);
  };

  return (
    <Layout>
      <Container>
        <div>
          <ProfileCard
            imgSrc="/assets/r1.png"
            title="홍길동"
            desc="소규모 수출 화주"
          />
          <List
            listData={dashboardListConfigs}
            selectedTitle={selectedTitle}
            onSectionChange={handleSectionChange}
          />
        </div>
        <section>{selectedSection}</section>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  gap: 50px;

  section {
    flex: 1;
  }
`;
