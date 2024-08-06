'use client';

import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Box } from '@/app/_components/dashboard/Box';
import { BgType } from '@/app/_components/dashboard/Profile';
import { COLORS } from '@/app/_constant/color';
import { SelectInput } from '@/app/_components/common/Input';
import useModal from '@/app/_hooks/useModal';
import { TextInput, CheckboxInput } from '@/app/_components/common/Input';
import Button from '@/app/_components/common/Button';
import { 운송사리스트 } from '../Overview/utils';
import Layout from '@/app/_components/dashboard/Layout';
export const 최근검색어_리스트 = [
  {
    value: '인천항 → 상하이항 | ETD : 2024.06.20',
    label: '인천항 → 상하이항 | ETD : 2024.06.20',
  },
  {
    value: '인천항 → 상하이항 | ETD : 2024.06.21',
    label: '인천항 → 상하이항 | ETD : 2024.06.21',
  },
  {
    value: '인천항 → 상하이항 | ETD : 2024.06.22',
    label: '인천항 → 상하이항 | ETD : 2024.06.22',
  },
  {
    value: '인천항 → 상하이항 | ETD : 2024.06.23',
    label: '인천항 → 상하이항 | ETD : 2024.06.23',
  },
];

export const 월별_검색_리스트 = [
  {
    value: '6월',
    label: '6월',
  },
  {
    value: '7월',
    label: '7월',
  },
  {
    value: '8월',
    label: '8월',
  },
];

export default function CompareFreightRates() {
  /*---- state ----*/
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [최근검색어, set최근검색어] = useState(
    '인천항 → 상하이항 | ETD : 2024.06.21',
  );
  const [월별검색어, set월별검색어] = useState('7월');

  /*---- function ----*/
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setCheckedItems((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value),
    );
  };

  /*---- jsx ----*/
  return (
    <Layout>
      <SelectInput
        label=""
        name="운송사"
        value={최근검색어}
        onChange={(e) => {}}
        options={최근검색어_리스트}
      />
      <FlexBox>
        <Box
          desc="입국항 주요 항만 운임지수"
          bgType={BgType.BRIGHT}
          width="70%"
        >
          <SubTitle>
            현재를 기준으로 부산항 → 상하이항 운임 예측값입니다.
          </SubTitle>
        </Box>
        <Box desc="운임지수 변화 이유" bgType={BgType.BRIGHT} width="30%">
          <FlexBox>
            <SelectInput
              label=""
              name="월별"
              value={월별검색어}
              onChange={(e) => {}}
              options={월별_검색_리스트}
            />
            <SubTitle>하락이 예상됩니다.</SubTitle>
          </FlexBox>
        </Box>
      </FlexBox>
      <FlexBox>
        <Box desc="더 저렴한 가격 추천" bgType={BgType.BRIGHT} width="70%">
          <div>
            <Title>
              <b>두 달 뒤,</b>운임이 <b>20</b>만큼 <b>낮을 것</b>으로 예상
            </Title>
            <SubTitle>
              예상 비용 | <b>1,234,567원</b>
            </SubTitle>
          </div>
          <div>
            <Desc>
              2주 뒤 예약가능한 운송사 리스트
              <hr />
            </Desc>
            <Table>
              <thead>
                <tr>
                  <th>운송사</th>
                  <th>ETD-ETA</th>
                  <th>소요일</th>
                  <th>서류 마감일</th>
                  <th>화물 마감일</th>
                </tr>
              </thead>
              <tbody>
                {운송사리스트.map((item, index) => (
                  <tr key={index}>
                    <td>{item.운송사}</td>
                    <td>{item.ETD_ETA}</td>
                    <td>{item.소요일}</td>
                    <td>{item.서류마감일}</td>
                    <td>{item.화물마감일}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div>
            <Button text="견적 다시 요청하기" type="dark" onClick={() => {}} />
          </div>
        </Box>
        <Box desc="관련정보 요약" bgType={BgType.DARK} width="30%">
          <CheckboxInput
            label=""
            name="관련정보 요약"
            options={[
              { value: '수출국', label: '수출국' },
              { value: '수입국', label: '수입국' },
              { value: '운송사', label: '운송사' },
              { value: '환율', label: '환율' },
              { value: '주요항로', label: '주요항로' },
            ]}
            selectedOptions={checkedItems}
            onChange={handleCheckboxChange}
          />
          <Desc>
            항구에 머물고 있는 컨테이너선의 비율이 큽니다. 선박이 대기하는
            시간이 길어지고, 항구 혼잡으로 인해 하역 및 적재 작업이 지연될 수
            있으니 이를 고려해서 수출입 스케줄을 조정해항구에 머물고 있는
            컨테이너선의 비율이 큽니다. 선박이 대기하는 시간이 길어지고, 항구 혼
          </Desc>
        </Box>
      </FlexBox>
    </Layout>
  );
}

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  gap: 25px;
`;

const Title = styled.div`
  color: ${COLORS.g4};
  font-size: 28px;
  font-weight: 500;
  white-space: pre;

  b {
    color: ${COLORS.main};
    font-weight: 800;
  }
`;

const SubTitle = styled.div`
  color: ${COLORS.g5};
  font-size: 20px;
  font-weight: 800;
  white-space: pre;
  line-height: 46px;
`;

const Desc = styled.div`
  color: ${COLORS.g4};
  font-size: 16px;
  font-weight: 400;

  hr {
    border: 0.5px solid ${COLORS.g1};
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  text-align: left;
  width: 100%;

  font-size: 16px;
  line-height: 32px;

  margin: 20px 0;

  th {
    color: ${COLORS.g5};
  }

  td {
    color: ${COLORS.g3};
  }
`;
