'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import Button from '@/app/_components/common/Button';
import { SelectInput } from '@/app/_components/common/Input';
import { useRouter } from 'next/navigation';
import Text from '@/app/_components/common/Text';
import Layout from '@/app/_components/common/Layout';
import { 예약가능리스트, 운송사옵션 } from './utill';
import OptionCard from '@/app/_components/common/OptionCard';

export default function Page() {
  /*---- router ----*/
  const router = useRouter();
  /*---- state ----*/
  const [검색정보, set검색정보] = useState('부산항 → 상하이항 | 2024.06.24 ~');
  const [예상비용, use예상비용] = useState<string>('1,234,456');
  const [운송사, set운송사] = useState('운송사 선택');
  const [선택한업체, use선택한업체] = useState<number[]>([]);
  /*---- function ----*/
  const handleSelect = (id: number) => {
    if (선택한업체.includes(id)) {
      use선택한업체(선택한업체.filter((item) => item !== id));
    } else {
      use선택한업체([...선택한업체, id]);
    }
  };
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
              <Icon className="material-icons">{'search'}</Icon>
              <div>{검색정보}</div>
            </SearchBox>
            <GrayBox>
              <div>예상 비용</div>
              <span>{예상비용}원</span>
            </GrayBox>
          </FlexContainer>
          <SelectInput
            label=""
            name="운송사"
            value={운송사}
            onChange={(e) => {}}
            options={운송사옵션}
          />
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
            {예약가능리스트.map((el) => (
              <OptionCard
                key={el.id}
                data={el}
                select={{
                  isSelected: 선택한업체.includes(el.id),
                  num: 선택한업체.indexOf(el.id) + 1,
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
            onClick={() => {
              router.push('/request');
            }}
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
  gap: 18px 18px;
  flex-wrap: wrap;
  justify-content: space-between;
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
  display: flex;
  height: 56px;
  padding: 0px 28px;
  align-items: center;
  gap: 24px;
  border-radius: 12px;
  background-color: ${COLORS.w};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  flex: 1;

  div {
    font-size: 20px;
    color: ${COLORS.g4};
  }
`;

const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const Icon = styled.span`
  font-size: 30px;
  color: ${COLORS.main};
`;

const Caution = styled.span`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: ${COLORS.g2};
`;
