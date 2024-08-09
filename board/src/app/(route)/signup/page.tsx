'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Progress from '@/app/_components/common/Progress';
import { COLORS } from '@/app/_constant/color';
import Button from '@/app/_components/common/Button';
import ListWithCheck from '@/app/_components/common/ListWithCheck';
import { acceptList, JopOption } from './utill';
import {
  TextInput,
  CheckboxInput,
  SelectInput,
} from '@/app/_components/common/Input';
import PasswordForm from './PasswordForm';
import { useRouter } from 'next/navigation';
import { getPorts } from '@/app/_apis/getPorts';
import { postRegister } from '@/app/_apis/postRegister';

export default function Page() {
  /*---- router ----*/
  const router = useRouter();
  /*---- state ----*/
  const [curr, setCurr] = useState(1);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(4).fill(false),
  );
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    role: [] as string[],
    jobTitle: '직책을 선택해주세요',
    businessNumber: '',
  });
  /*---- function ----*/
  const handleAllCheck = () => {
    const newCheckedState = Array(acceptList.length).fill(!isAllChecked);
    setCheckedItems(newCheckedState);
    setIsAllChecked(!isAllChecked);
  };

  const handleCheckChange = (index: number) => {
    const newCheckedItems = [...checkedItems]; // 현재 체크박스 상태 배열 복사 (얕은 복사)
    newCheckedItems[index] = !newCheckedItems[index]; // 각 체크박스 상태 토글 체크
    setCheckedItems(newCheckedItems); // 현재 체크박스 상태 배열로 업데이트
    setIsAllChecked(newCheckedItems.every((item) => item)); // 모든 체크 박스 요소가 true인지 검사하여 업데이트
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isNextButtonDisabled = !checkedItems.slice(0, 3).every((item) => item);
  /*---- api call function ----*/

  function wrapPostRegister() {
    postRegister({
      role: formData.role,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      companyName: formData.companyName,
      jobTitle: formData.jobTitle,
      businessNumber: formData.businessNumber,
    })
      .then((response) => {
        router.push('/login');
      })
      .catch((error) => {
        console.error('Error fetching register:', error);
      });
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  /*---- jsx ----*/
  return (
    <Container>
      <Logo>
        <img src="/logo.png" alt="Logo" />
      </Logo>

      {curr < 4 && (
        <>
          <Progress level={curr} />
          {curr === 1 && (
            <FormSection gapValue={10}>
              <ListWithCheck
                text="이용약관 전체 동의"
                type="title"
                onClick={handleAllCheck}
                isChecked={isAllChecked}
              />
              {acceptList.map((el, idx) => (
                <ListWithCheck
                  key={idx}
                  text={el}
                  type="subTitle"
                  onClick={() => handleCheckChange(idx)}
                  isChecked={checkedItems[idx]}
                />
              ))}
              <p>
                ※마케팅 수신정보 동의 시, 사용자 데이터를 기반으로 해운정보를
                추천받습니다.
              </p>
            </FormSection>
          )}
          {curr === 2 && (
            <FormSection gapValue={12}>
              <FlexContainer>
                <TextInput
                  label="성"
                  type="text"
                  placeholder="성을 입력해 주세요."
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <TextInput
                  label="이름"
                  type="text"
                  placeholder="이름을 입력해 주세요."
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </FlexContainer>

              <TextInput
                label="이메일"
                type="email"
                placeholder="이메일을 입력해 주세요."
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <PasswordForm
                formData={{
                  password: formData.password,
                  confirmPassword: formData.confirmPassword,
                }}
                handleInputChange={(e) =>
                  handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
                }
              />
            </FormSection>
          )}
          {curr === 3 && (
            <FormSection gapValue={12}>
              <TextInput
                label="회사명"
                type="text"
                placeholder="회사명을 입력해 주세요."
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
              />
              <CheckboxInput
                label="서비스 사용 유형 (중복 가능)"
                name="role"
                options={[
                  { value: 'CONSIGNOR', label: 'LCL 화주' },
                  { value: 'FORWARDER', label: '포워더' },
                ]}
                selectedOptions={formData.role}
                onChange={(e) =>
                  handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
                }
              />
              <SelectInput
                label="직책"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={(e) =>
                  handleInputChange(e as React.ChangeEvent<HTMLSelectElement>)
                }
                options={JopOption}
              />
              <TextInput
                label="사업자 등록번호"
                type="text"
                placeholder="사업자 등록번호를 입력해 주세요."
                name="businessNumber"
                value={formData.businessNumber}
                onChange={handleInputChange}
              />
            </FormSection>
          )}

          <ButtonSection>
            <Button
              text="이전으로"
              type="bright"
              flexValue={1}
              onClick={() => {
                if (curr > 1) {
                  setCurr(curr - 1);
                }
              }}
            />
            <Button
              text="다음으로"
              type="dark"
              flexValue={3}
              onClick={() => {
                if (curr === 3) {
                  wrapPostRegister();
                } else {
                  setCurr(curr + 1);
                }
              }}
              disabled={isNextButtonDisabled}
            />
          </ButtonSection>
        </>
      )}
      {curr === 4 && (
        <>
          <CenteredFormSection gapValue={100}>
            <Icon className="material-icons">{'check_circle'}</Icon>
            <FormSection gapValue={30}>
              <Title>홍길동님, 가입을 축하합니다!</Title>
              <Desc>
                LCL 전문 해상수출 플랫폼 Link-Cargo 입니다.
                <br /> 지금 바로 LCL화주와 연결해보세요.
              </Desc>
            </FormSection>
            <WideButton onClick={() => router.push('/login')}>
              로그인하고 운임 조회하러가기
            </WideButton>
          </CenteredFormSection>
        </>
      )}
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

const CenteredFormSection = styled(FormSection)`
  align-items: center;
`;

const WideButton = styled.div`
  width: 348px;
  font-size: 24px;
  font-weight: 800;

  border-radius: 100px;
  line-height: 80px;
  height: 80px;
  text-align: center;
  color: ${COLORS.w};
  background-color: ${COLORS.main};
  font-weight: 800;
  cursor: pointer;
`;

const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

const Icon = styled.span`
  font-size: 120px;
  color: ${COLORS.main};
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 700;
  line-height: 43px;
  text-align: center;
`;

const Desc = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: ${COLORS.g4};
  text-align: center;
`;
