'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import Button from '@/app/_components/common/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import Text from '@/app/_components/common/Text';
import Layout from '@/app/_components/common/Layout';
import TextBox from './TextBox';
import MultiTextBox from './MultiTextBox';
import { TextInput } from '@/app/_components/common/Input';
import { 선택한업체, 화물정보 } from './utill';
import useModal from '@/app/_hooks/useModal';
import Modal from '@/app/_components/common/Modal';
import Confirm from '@/app/_components/common/Confirm';
import { CargoInfo, CargoItem } from '../freight-quote/utill';

export default function Page() {
  /*---- router ----*/
  const router = useRouter();
  const searchParams = useSearchParams();
  //배열, 객체 전처리
  const cargosParam = searchParams.get('cargos');
  const initialCargos: CargoItem[] = cargosParam ? JSON.parse(cargosParam) : [];
  const incotermsParam = searchParams.get('incoterms');
  const initialIncoterms: string[] = incotermsParam
    ? Array.isArray(incotermsParam)
      ? incotermsParam
      : [incotermsParam]
    : [];

  /*---- hooks ----*/
  const { isShowing, toggle } = useModal();

  /*---- state ----*/
  const [formData, setFormData] = useState<CargoInfo>({
    importPortId: Number(searchParams.get('importPortId')),
    exportPortId: Number(searchParams.get('exportPortId')),
    wishExportDate: searchParams.get('wishExportDate') || '',
    incoterms: initialIncoterms,
    reserveList: JSON.parse(searchParams.get('reserveList') || '[]'),
    cargos: initialCargos,
  });

  /*---- function ----*/
  const handleInputChange = (index: number, e: any) => {
    const { name, value } = e.target;
    const updatedCargos = [...formData.cargos];
    updatedCargos[index] = {
      ...updatedCargos[index],
      [name]: value,
    };
    setFormData({ ...formData, cargos: updatedCargos });
  };

  return (
    <Layout>
      <Container>
        <Text
          title="견적 요청"
          desc="화물 정보를 점검하고 업체별로 견적서를 요청해보세요."
        />
        <FormSection gapValue={24}>
          <Text subtitle="선택한 업체" />
          <FlexContainer>
            {formData.reserveList.map((item, index) => (
              <MultiTextBox
                key={index}
                title={String(item)}
                desc={String(item)}
              />
            ))}
          </FlexContainer>
        </FormSection>
        <FormSection gapValue={24}>
          <Text subtitle="화물 정보" />
          <FlexContainer>
            <TextBox
              title={`${formData.importPortId} > ${formData.exportPortId}`}
              desc={'출발지 > 도착지'}
              isColored={true}
            />
            <TextBox
              title={formData.wishExportDate}
              desc={'희망출항 날짜'}
              isColored={true}
            />
            <TextBox
              title={formData.incoterms.join(', ')}
              desc={'인코텀즈'}
              isColored={true}
            />
          </FlexContainer>
        </FormSection>
        {formData.cargos.map((cargo, index) => (
          <FormSection key={index} gapValue={24}>
            <Text subtitle={`화물 ${index + 1} 정보`} />
            <FlexContainer>
              <TextBox
                title={`${cargo.totalQuantity} 개`}
                desc={'총 수출 물품 수량'}
                isColored={true}
              />
              <TextBox
                title={`${cargo.quantityPerBox} 개`}
                desc={'박스 당 물품 수량'}
                isColored={true}
              />
            </FlexContainer>
            <FlexContainer>
              <TextBox
                title={`${cargo.totalQuantity} m`}
                desc={'박스 길이 (가로x세로x높이) m'}
              />
              <TextBox title={`${cargo.weight} kg`} desc={'박스 중량'} />
              <TextBox title={`${cargo.value} 원`} desc={'물품 가액'} />
            </FlexContainer>
            <Text subtitle={`화물 ${index + 1} 추가 정보 입력`} />
            <TextInput
              label="HS 코드"
              type="text"
              placeholder="HS 코드를 입력해주세요."
              name="hsCode"
              value={cargo.hsCode}
              onChange={(e) => handleInputChange(index, e)}
            />
            <TextInput
              label="화물명"
              type="text"
              placeholder="화물명을 입력해주세요."
              name="productName"
              value={cargo.productName}
              onChange={(e) => handleInputChange(index, e)}
            />
            <TextInput
              label="기타 전달사항"
              type="text"
              placeholder="전달사항을 입력해주세요."
              name="content"
              value={cargo.content}
              onChange={(e) => handleInputChange(index, e)}
            />
          </FormSection>
        ))}
        <ButtonSection>
          <Button
            text="운임 조회하기"
            type="dark"
            flexValue={3}
            onClick={() => {
              toggle();
            }}
          />
        </ButtonSection>
      </Container>
      <Modal
        isShowing={isShowing}
        content={
          <Confirm
            title="견적서를 요청했습니다!"
            desc={`해당 스케줄에 해당하는 포워더에게 견적서 송부 요청을 보냈어요.\n24시간 이내로 견적서가 도착해요.`}
            onLeft={{
              onClick: () => {
                toggle();
              },
              text: '닫기',
            }}
            onRight={{
              onClick: () => router.push(`/dashboard`),
              text: '나의 대시보드 바로가기',
            }}
          />
        }
      />
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
  flex-wrap: wrap;
`;

const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;
