'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import Layout from '@/app/_components/common/Layout';
import { List } from '@/app/_components/dashboard/List';
import ProfileCard from '@/app/_components/dashboard/Profile';
import { getTokenFromLocalStorage } from '@/app/_utils/auth';

import { GetIUserDto, OnboardApiService } from '@/app/_apis/onboard';

const Overview = dynamic(() => import('./(section)/Overview'), { ssr: false });
const CompareQuotes = dynamic(() => import('./(section)/CompareQuotes'), {
  ssr: false,
});
const CompareFreightRates = dynamic(
  () => import('./(section)/CompareFreightRates'),
  { ssr: false },
);
const MyChatHistory = dynamic(() => import('./(section)/MyChatHistory'), {
  ssr: false,
});
const PaymentHistory = dynamic(() => import('./(section)/PaymentHistory'), {
  ssr: false,
});

interface dashboardListItem {
  [id: string]: {
    title: string;
    section: React.ReactNode;
  };
}

const dashboardListConfig: dashboardListItem = {
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
  /*---- router ----*/
  const router = useRouter();
  /*---- auth ----*/
  const tokens = getTokenFromLocalStorage();
  const accessToken = tokens?.accessToken || '';
  if (!accessToken) {
    router.push('/login');
  }
  /*---- state ----*/
  const [selectedId, setSelectedId] = useState<string>('overview');
  const { section: selectedSection, title: selectedTitle } =
    dashboardListConfig[selectedId];
  /*---- function ----*/
  const handleSectionChange = (id: string) => {
    setSelectedId(id);
    window.location.hash = `#${id}`;
  };
  const handleHashChange = () => {
    const hash = window.location.hash.substring(1) || 'overview';
    if (dashboardListConfig[hash]) {
      setSelectedId(hash);
    }
  };

  /*---- api call function ----*/
  const {
    data: UserData,
    error: UserError,
    isLoading: UserLoading,
  } = useQuery<GetIUserDto, Error>({
    queryKey: ['User'],
    queryFn: () => OnboardApiService.getUser(tokens?.accessToken),
    enabled: !!tokens?.accessToken,
  });

  /*---- useEffect ----*/
  useEffect(() => {
    const hash = window.location.hash.substring(1) || 'overview';
    if (dashboardListConfig[hash]) {
      setSelectedId(hash);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <Layout>
      <Container>
        <div>
          <ProfileCard
            imgSrc={UserData?.result.user.profile || '/assets/r1.png'}
            title={`${UserData?.result.user.lastName}${UserData?.result.user.firstName}`}
            desc={
              UserData?.result.user.role === 'CONSIGNOR'
                ? '소규모 수출 화주'
                : '포워더'
            }
          />
          <List
            listData={Object.entries(dashboardListConfig).map(
              ([id, { title, section }]) => ({
                id,
                title,
                section,
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
