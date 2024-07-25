'use client';

import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import Button from '@/app/_components/common/Button';
import { TextInput, CheckboxInput } from '@/app/_components/common/Input';
import { useRouter } from 'next/navigation';
import Text from '@/app/_components/common/Text';
import Layout from '@/app/_components/common/Layout';

interface CargoItem {
  총수출물품수량: number;
  박스당물품수량: number;
  박스가로: number;
  박스세로: number;
  박스높이: number;
  박스중량: number;
  물품가액: number;
}

interface CargoInfo {
  출발지: string;
  도착지: string;
  희망출항날짜: string;
  인코텀즈: string[];
  화물: CargoItem[];
}

export default function Page() {
  /*---- router ----*/
  /*---- hooks ----*/
  /*---- state ----*/
  /*---- api call function ----*/
  /*---- function ----*/
  /*---- useEffect ----*/
  /*---- jsx ----*/

  const [curr, setCurr] = useState(1);
  const [formData, setFormData] = useState<CargoInfo>({
    출발지: '',
    도착지: '',
    희망출항날짜: '',
    인코텀즈: [],
    화물: [
      {
        총수출물품수량: 0,
        박스당물품수량: 0,
        박스가로: 0,
        박스세로: 0,
        박스높이: 0,
        박스중량: 0,
        물품가액: 0,
      },
    ],
  });

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number,
    field?: keyof CargoItem,
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement) {
      const { name, value, type, checked } = target;

      if (index !== undefined && field) {
        const updatedCargo = [...formData.화물];
        updatedCargo[index] = {
          ...updatedCargo[index],
          [field]: type === 'checkbox' ? checked : parseFloat(value) || 0,
        };
        setFormData({ ...formData, 화물: updatedCargo });
      } else {
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value,
        });
      }
    } else if (target instanceof HTMLSelectElement) {
      const { name, value } = target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const addCargo = () => {
    if (formData.화물.length < 5) {
      setFormData({
        ...formData,
        화물: [
          ...formData.화물,
          {
            총수출물품수량: 0,
            박스당물품수량: 0,
            박스가로: 0,
            박스세로: 0,
            박스높이: 0,
            박스중량: 0,
            물품가액: 0,
          },
        ],
      });
    }
  };

  useEffect(() => {
    setIsNextButtonDisabled(
      !formData.출발지 || !formData.도착지 || !formData.희망출항날짜,
    );
  }, [formData]);

  return (
    <Layout>
      <Container>
        <Text
          title="화물 정보 입력"
          highlight="링카고"
          desc="와 함께 견적을 산출해보세요!"
        />
        <FormSection gapValue={30}>
          <FlexContainer>
            <TextInput
              label="출발지"
              type="text"
              placeholder="출발지 선택"
              name="출발지"
              value={formData.출발지}
              onChange={handleInputChange}
            />
            <TextInput
              label="도착지"
              type="text"
              placeholder="도착지 선택"
              name="도착지"
              value={formData.도착지}
              onChange={handleInputChange}
            />
          </FlexContainer>
          <TextInput
            label="희망출항 날짜"
            type="date"
            placeholder="시작날짜 선택"
            name="희망출항날짜"
            value={formData.희망출항날짜}
            onChange={handleInputChange}
          />
          <CheckboxInput
            label="인코텀즈"
            name="인코텀즈"
            options={[
              { value: 'CIF', label: 'CIF' },
              { value: 'CFR', label: 'CFR' },
              { value: 'DAP', label: 'DAP' },
              { value: 'DDP', label: 'DDP' },
            ]}
            selectedOptions={formData.인코텀즈}
            onChange={(e) =>
              handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
            }
          />
        </FormSection>
        {formData.화물.map((cargo, index) => (
          <FormSection key={index} gapValue={12}>
            <Text subtitle={`화물 ${index + 1} `} />
            <FlexContainer>
              <TextInput
                label="총 수출 물품 수량"
                type="number"
                placeholder="총 수출 물품 수량"
                name="총수출물품수량"
                value={cargo.총수출물품수량.toString()}
                onChange={(e) => handleInputChange(e, index, '총수출물품수량')}
              />
              <TextInput
                label="박스당 물품 수량"
                type="number"
                placeholder="박스당 물품 수량"
                name="박스당물품수량"
                value={cargo.박스당물품수량.toString()}
                onChange={(e) => handleInputChange(e, index, '박스당물품수량')}
              />
            </FlexContainer>
            <FlexContainer>
              <TextInput
                label="박스가로"
                type="number"
                placeholder="박스가로"
                name="박스가로"
                value={cargo.박스가로.toString()}
                onChange={(e) => handleInputChange(e, index, '박스가로')}
              />
              <TextInput
                label="박스세로"
                type="number"
                placeholder="박스세로"
                name="박스세로"
                value={cargo.박스세로.toString()}
                onChange={(e) => handleInputChange(e, index, '박스세로')}
              />
              <TextInput
                label="박스높이"
                type="number"
                placeholder="박스높이"
                name="박스높이"
                value={cargo.박스높이.toString()}
                onChange={(e) => handleInputChange(e, index, '박스높이')}
              />
            </FlexContainer>
            <TextInput
              label="박스중량"
              type="number"
              placeholder="박스중량"
              name="박스중량"
              value={cargo.박스중량.toString()}
              onChange={(e) => handleInputChange(e, index, '박스중량')}
            />
            <TextInput
              label="물품 가액"
              type="number"
              placeholder="물품 가액"
              name="물품가액"
              value={cargo.물품가액.toString()}
              onChange={(e) => handleInputChange(e, index, '물품가액')}
            />
          </FormSection>
        ))}
        {formData.화물.length < 5 && (
          <AddCargoButton onClick={addCargo}>
            <Text desc={`화물 ${formData.화물.length + 1} 추가하기`} />
          </AddCargoButton>
        )}
        <ButtonSection>
          <Button
            text="운임 조회하기"
            type="dark"
            onClick={() => router.push('/reserve-list')}
            disabled={isNextButtonDisabled}
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

const AddCargoButton = styled.h1`
  cursor: pointer;
  color: ${COLORS.main};
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
`;

const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;
