import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextInput } from '@/app/_components/common/Input';
import { COLORS } from '@/app/_constant/color';

interface PasswordFormProps {
  formData: {
    password: string;
    confirmPassword: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const PasswordForm = ({ formData, handleInputChange }: PasswordFormProps) => {
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    number: false,
    letter: false,
    match: false,
  });

  useEffect(() => {
    const { password, confirmPassword } = formData;
    const lengthCheck = password.length >= 8;
    const numberCheck = /[0-9]/.test(password);
    const letterCheck = /[a-zA-Z]/.test(password);
    const matchCheck = password === confirmPassword;

    setPasswordErrors({
      length: lengthCheck,
      number: numberCheck,
      letter: letterCheck,
      match: matchCheck,
    });
  }, [formData]);

  const validationCriteria = [
    { key: 'length', label: '8 자리 이상', isValid: passwordErrors.length },
    { key: 'number', label: '숫자 포함', isValid: passwordErrors.number },
    { key: 'letter', label: '영문 포함', isValid: passwordErrors.letter },
  ];

  return (
    <>
      <TextInput
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해 주세요."
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <ValidationList>
        {validationCriteria.map(({ key, label, isValid }) => (
          <ValidationItem key={key} isValid={isValid}>
            <Icon isValid={isValid} className="material-icons">
              {isValid ? 'check_circle' : 'cancel'}
            </Icon>
            <span>{label}</span>
          </ValidationItem>
        ))}
      </ValidationList>
      <TextInput
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 한번 더 입력해 주세요."
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />
      <MatchStatus isValid={passwordErrors.match}>
        {passwordErrors.match ? '비밀번호 일치' : '비밀번호를 확인해주세요'}
      </MatchStatus>
    </>
  );
};

export default PasswordForm;

const ValidationList = styled.div`
  display: flex;
  gap: 12px;
`;

const ValidationItem = styled.div<{ isValid: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;

  span {
    color: ${({ isValid }) => (isValid ? COLORS.point : COLORS.g2)};
    font-size: 14px;
  }
`;

const Icon = styled.span<{ isValid: boolean }>`
  font-size: 20px;
  color: ${({ isValid }) => (isValid ? COLORS.point : COLORS.g2)};
`;

const MatchStatus = styled.span<{ isValid: boolean }>`
  color: ${({ isValid }) => (isValid ? COLORS.point : COLORS.g2)};
  font-size: 12px;
  font-weight: bold;
`;
