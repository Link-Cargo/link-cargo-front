'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import Button from '@/app/_components/common/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import Text from '@/app/_components/common/Text';
import Layout from '@/app/_components/common/Layout';
import {
  예약가능리스트객체,
  formatDateString,
  formatTransitTime,
} from './utill';
import OptionCard from '@/app/_components/common/OptionCard';
import { getSchedule } from '@/app/_apis/getSchedule';

export default function Page() {
  /*---- router ----*/
  const router = useRouter();
  const searchParams = useSearchParams();

  /*---- state ----*/
  const [reserveList, setReserveList] = useState<number[]>([1, 2]);
  const [예약가능리스트, set예약가능리스트] = useState<예약가능리스트객체>({
    schedules: [],
  });

  /*---- function ----*/
  const handleSelect = (id: number) => {
    setReserveList((prevList) =>
      prevList.includes(id)
        ? prevList.filter((item) => item !== id)
        : [...prevList, id],
    );
  };

  const handleSubmit = () => {
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.set('reserveList', JSON.stringify(reserveList));

    router.push(`/request?${queryParams.toString()}`);
  };

  /*---- api call function ----*/
  const wrapGetSchedule = async () => {
    try {
      const response = await getSchedule();
      console.log('schedule data>>>', response.schedules);
      set예약가능리스트({ schedules: response.schedules });
    } catch (error) {
      console.error('Error fetching ports:', error);
    }
  };

  /*---- useEffect ----*/
  useEffect(() => {
    wrapGetSchedule();
  }, []);

  /*---- jsx ----*/
  return (
    <Layout>
      <Container>
        <Text
          title="예약 가능 리스트"
          desc="원하는 업체를 선택하여 견적을 요청해보세요."
        />
        <FormSection gapValue={8}>
          <FlexContainer>
            <SearchBox>
              {searchParams.get('importPortId')} →{' '}
              {searchParams.get('exportPortId')} (
              {searchParams.get('wishExportDate')})
            </SearchBox>
            <GrayBox>
              <div>예상 비용</div>
              <span>123,345,345원</span>
            </GrayBox>
          </FlexContainer>
        </FormSection>
        <FormSection gapValue={30}>
          <Caution>
            <span>
              도착일자는 현지시간 기준으로, 업체 사정에 따라 사전고지 없이
              변경될 수 있습니다.
            </span>
            <span>도움말</span>
          </Caution>
          <CardContainer>
            {예약가능리스트.schedules.map((el) => (
              <OptionCard
                key={el.id}
                data={{
                  선명: el.vessel,
                  ETD: formatDateString(el.ETD),
                  ETA: formatDateString(el.ETA),
                  소요일: formatTransitTime(el.transitTime, el.transportType),
                  서류마감일: formatDateString(el.documentCutOff),
                  화물마감일: formatDateString(el.cargoCutOff),
                }}
                select={{
                  isSelected: reserveList.includes(el.id),
                  num: reserveList.indexOf(el.id) + 1,
                }}
                onClick={() => handleSelect(el.id)}
              />
            ))}
          </CardContainer>
        </FormSection>
        <ButtonSection>
          <Button
            text="포워딩 업체 선택 완료"
            type="dark"
            onClick={handleSubmit}
          />
        </ButtonSection>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  width: 850px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const CardContainer = styled.div`
  margin: 0 auto;
  display: flex;
  gap: 20px 20px;
  flex-wrap: wrap;
  justify-content: start;
`;

const FormSection = styled.div<{ gapValue: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ gapValue }) => gapValue}px;
`;

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

const GrayBox = styled.div`
  display: flex;
  height: 56px;
  padding: 0px 28px;
  align-items: center;
  gap: 24px;
  border-radius: 12px;
  background-color: ${COLORS.g0};
  justify-content: space-between;

  div,
  span {
    white-space: nowrap;
    font-size: 20px;
  }

  div {
    color: ${COLORS.g4};
  }

  span {
    color: ${COLORS.main};
    font-weight: 800;
  }
`;

const SearchBox = styled.div`
  height: 56px;
  line-height: 56px;
  padding: 0px 28px;
  border-radius: 12px;
  background-color: ${COLORS.w};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  flex: 1;
  text-align: center;
  font-size: 20px;
  color: ${COLORS.g4};
`;

const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const Caution = styled.span`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: ${COLORS.g2};
`;
