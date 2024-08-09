'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import Button from '@/app/_components/common/Button';
import { TextInput } from '@/app/_components/common/Input';
import { useRouter } from 'next/navigation';
import { postLogin } from '@/app/_apis/postLogin';

export default function Page() {
  /*---- router ----*/
  const router = useRouter();
  /*---- state ----*/
  const [formData, setFormData] = useState({
    email: '',
    pw: '',
  });
  /*---- function ----*/
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /*---- api call function ----*/
  function wrapPostLogin() {
    postLogin({
      email: formData.email,
      password: formData.pw,
    })
      .then((response) => {
        router.push('/main');
      })
      .catch((error) => {
        console.error('Error fetching register:', error);
      });
  }

  /*---- jsx ----*/
  return (
    <Container>
      <Logo>
        <img src="/logo.png" alt="Logo" />
      </Logo>
      <FormSection gapValue={12}>
        <TextInput
          label="이메일"
          type="text"
          placeholder="이메일을 입력해 주세요."
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          name="pw"
          value={formData.pw}
          onChange={handleInputChange}
        />
      </FormSection>
      <ButtonSection>
        <Button
          text="로그인하기"
          type="dark"
          flexValue={3}
          onClick={wrapPostLogin}
        />
      </ButtonSection>
      <FlexContainer>
        <Desc>회원가입</Desc>
        <Desc>아이디 찾기</Desc>
        <Desc>비밀번호 찾기</Desc>
      </FlexContainer>
    </Container>
  );
}

const Logo = styled.div`
  width: 210px;

  img {
    width: 100%;
    height: auto;
  }
`;

const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 70px;
  padding-top: 20px;
`;

interface FormSectionProps {
  gapValue: number;
}

const FormSection = styled.div<FormSectionProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ gapValue }) => gapValue}px;

  p {
    font-size: 14px;
    color: ${COLORS.g2};
    padding: 0px 12px;
  }
`;

const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Desc = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${COLORS.g2};
  text-align: center;
  width: 100px;

  border-right: 1px solid ${COLORS.g1};

  &:nth-child(3) {
    border: none;
  }
`;
