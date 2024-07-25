'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import Button from '@/app/_components/common/Button';
import { useRouter } from 'next/navigation';
import Text from '@/app/_components/common/Text';
import Layout from '@/app/_components/common/Layout';
import TextBox from './TextBox';
import MultiTextBox from './MultiTextBox';
import { TextInput } from '@/app/_components/common/Input';
import { 선택한업체, 화물정보 } from './utill';
import useModal from '@/app/_hooks/useModal';
import Modal from '@/app/_components/common/Modal';
import Confirm from '@/app/_components/common/Confirm';
interface AddInfo {
  HS코드: string;
  화물명: {
    이름: string;
    보험부보희망: boolean;
  };
  기타전달사항: string;
}

export default function Page() {
  /*---- router ----*/
  const router = useRouter();
  /*---- hooks ----*/
  const { isShowing, toggle } = useModal();
  /*---- state ----*/
  const [formData, setFormData] = useState<AddInfo>({
    HS코드: '',
    화물명: {
      이름: '',
      보험부보희망: false,
    },
    기타전달사항: '',
  });
  /*---- function ----*/
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === '화물명') {
      setFormData((prevData) => ({
        ...prevData,
        화물명: { ...prevData.화물명, 이름: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
              <MultiTextBox key={index} title={item.title} desc={item.desc} />
            ))}
          </FlexContainer>
        </FormSection>
        <FormSection gapValue={24}>
          <Text subtitle="화물 정보" />
          <FlexContainer>
            {화물정보.slice(0, 3).map((item, index) => (
              <TextBox
                key={index}
                title={item.title}
                desc={item.desc}
                isColored={item.isColored}
              />
            ))}
          </FlexContainer>
          <FlexContainer>
            {화물정보.slice(3, 5).map((item, index) => (
              <TextBox
                key={index}
                title={item.title}
                desc={item.desc}
                isColored={item.isColored}
              />
            ))}
          </FlexContainer>
          <FlexContainer>
            {화물정보.slice(5).map((item, index) => (
              <TextBox
                key={index}
                title={item.title}
                desc={item.desc}
                isColored={item.isColored}
              />
            ))}
          </FlexContainer>
        </FormSection>
        <FormSection gapValue={24}>
          <Text subtitle="추가 정보 입력" />
          <TextInput
            label="HS 코드"
            type="text"
            placeholder="HS 코드를 입력해주세요."
            name="HS코드"
            value={formData.HS코드}
            onChange={handleInputChange}
          />
          <TextInput
            label="화물명"
            type="text"
            placeholder="화물명을 입력해주세요."
            name="화물명"
            value={formData.화물명.이름}
            onChange={handleInputChange}
          />
          <TextInput
            label="기타 전달사항"
            type="text"
            placeholder="전달사항을 입력해주세요."
            name="기타전달사항"
            value={formData.기타전달사항}
            onChange={handleInputChange}
          />
        </FormSection>
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
          ></Confirm>
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
`;

const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;
