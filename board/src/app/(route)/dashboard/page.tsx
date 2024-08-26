'use client';

import React, { useState, useEffect } from 'react';
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
  [id: string]: {
    title: string;
    section: React.ReactNode;
  };
}

const dashboardListConfig: ListItem = {
  overview: { title: '한눈에 보기', section: <Overview /> },
  compare_quotes: { title: '견적서 비교', section: <CompareQuotes /> },
  compare_freight: {
    title: '운임 관련 비교',
    section: <CompareFreightRates />,
  },
  chat_history: { title: '나의 대화 이력', section: <MyChatHistory /> },
  payment_history: { title: '결제 내역', section: <PaymentHistory /> },
};

function Page() {
  const [selectedId, setSelectedId] = useState<string>('overview');
  const { section: selectedSection, title: selectedTitle } =
    dashboardListConfig[selectedId];

  // section update
  const handleSectionChange = (id: string) => {
    setSelectedId(id);
    window.location.hash = `#${id}`;
  };
  useEffect(() => {
    const hash = window.location.hash.substring(1) || 'overview';
    if (dashboardListConfig[hash]) {
      setSelectedId(hash);
    }
  }, []);

  // hash update
  const handleHashChange = () => {
    const hash = window.location.hash.substring(1) || 'overview';
    if (dashboardListConfig[hash]) {
      setSelectedId(hash);
    }
  };
  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
            listData={Object.entries(dashboardListConfig).map(
              ([id, { title, section }]) => ({
                id,
                title,
                section, // 이 부분에서 section을 포함
              }),
            )}
            selectedTitle={selectedTitle}
            onSectionChange={(section, title) => {
              const id =
                Object.keys(dashboardListConfig).find(
                  (key) => dashboardListConfig[key].title === title,
                ) || 'overview';
              handleSectionChange(id);
            }}
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

export default Page;
