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
import { CargosContent } from '@/app/_apis/postCargos';
import { Suspense } from 'react';

function ContentPage() {
  /*---- router ----*/
  const router = useRouter();
  const searchParams = useSearchParams();

  /*---- hooks ----*/
  const { isShowing, toggle } = useModal();

  /*---- state ----*/
  const [queryParams, setQueryParams] = useState<CargosContent>({
    exportPortId: 0,
    importPortId: 0,
    wishExportDate: '',
    incoterms: '',
    cargos: [],
  });

  /*---- effect ----*/
  useEffect(() => {
    const exportPortId = Number(searchParams.get('exportPortId')) || 0;
    const importPortId = Number(searchParams.get('importPortId')) || 0;
    const wishExportDate = searchParams.get('wishExportDate') || '';
    const incoterms = searchParams.get('incoterms') || '';
    const cargos = JSON.parse(searchParams.get('cargos') || '[]');

    setQueryParams({
      exportPortId,
      importPortId,
      wishExportDate,
      incoterms,
      cargos,
    });
  }, [searchParams]);

  /*---- function ----*/
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: 'productName' | 'hsCode' | 'additionalNotes',
  ) => {
    const { value } = e.target;
    const updatedCargos = [...queryParams.cargos];
    updatedCargos[index] = {
      ...updatedCargos[index],
      [field]: value,
    };
    setQueryParams({ ...queryParams, cargos: updatedCargos });
  };

  /*---- jsx ----*/
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
            {선택한업체.map((item, index) => (
              <MultiTextBox
                key={index}
                title={`업체 ${item}`}
                desc={`업체 ${item} 설명`}
              />
            ))}
          </FlexContainer>
        </FormSection>
        <FormSection gapValue={24}>
          <Text subtitle="화물 정보" />
          <FlexContainer>
            <TextBox
              title={`${queryParams.exportPortId} > ${queryParams.importPortId}`}
              desc="출발지 > 도착지"
              isColored={true}
            />
            <TextBox
              title={queryParams.wishExportDate}
              desc="희망 출항 날짜"
              isColored={true}
            />
            <TextBox
              title={queryParams.incoterms}
              desc="인코텀즈"
              isColored={true}
            />
          </FlexContainer>
        </FormSection>

        {queryParams.cargos.map((cargo, index) => (
          <React.Fragment key={index}>
            <FormSection gapValue={24}>
              <Text subtitle={`화물 ${index + 1} 정보`} />
              <FlexContainer>
                <TextBox
                  title={`${cargo.totalQuantity} 개`}
                  desc="총 수출 물품 수량"
                  isColored={true}
                />
                <TextBox
                  title={`${cargo.quantityPerBox} 개`}
                  desc="박스 당 물품 수량"
                  isColored={true}
                />
              </FlexContainer>
              <FlexContainer>
                <TextBox
                  title={`${cargo.boxSize.width}x${cargo.boxSize.height}x${cargo.boxSize.depth} m`}
                  desc="박스 길이 (가로x세로x높이) m"
                  isColored={false}
                />
                <TextBox
                  title={`${cargo.weight} kg`}
                  desc="화물 중량"
                  isColored={false}
                />
                <TextBox
                  title={`${cargo.value} 원`}
                  desc="물품 가액"
                  isColored={false}
                />
              </FlexContainer>
            </FormSection>
            <FormSection gapValue={24}>
              <Text subtitle={`화물 ${index + 1} 추가 정보`} />
              <TextInput
                label="HS 코드"
                type="text"
                placeholder="HS 코드를 입력해주세요."
                name="hsCode"
                value={cargo.hsCode}
                onChange={(e) => handleInputChange(e, index, 'hsCode')}
              />
              <TextInput
                label="화물명"
                type="text"
                placeholder="화물명을 입력해주세요."
                name="productName"
                value={cargo.productName}
                onChange={(e) => handleInputChange(e, index, 'productName')}
              />
              <TextInput
                label="기타 전달사항"
                type="text"
                placeholder="전달사항을 입력해주세요."
                name="additionalNotes"
                value={cargo.additionalNotes}
                onChange={(e) => handleInputChange(e, index, 'additionalNotes')}
              />
            </FormSection>
          </React.Fragment>
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
          >
            <ImgC>
              <img src="/assets/expected.png" />
            </ImgC>
          </Confirm>
        }
      />
    </Layout>
  );
}

const Page = () => {
  return (
    <Suspense>
      <ContentPage />
    </Suspense>
  );
};

export default Page;

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

const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;
const ImgC = styled.div`
  width: 800px;
`;
