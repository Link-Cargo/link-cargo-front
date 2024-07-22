import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

interface TextInputProps {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </Container>
  );
};

export default TextInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const Label = styled.label`
  color: black;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
`;

const Input = styled.input`
  border: 1px solid rgba(215, 215, 215, 1);
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 16px;
  line-height: 20px;
  color: black;

  &::placeholder {
    color: ${COLORS.g2};
    font-size: 14px;
  }
`;
