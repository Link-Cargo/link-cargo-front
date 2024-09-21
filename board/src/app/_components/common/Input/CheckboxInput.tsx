import { COLORS } from '@/app/_constant/color';
import React from 'react';
import styled from 'styled-components';

interface CheckboxInputProps {
  label: string;
  name: string;
  options: { value: string; label: string; desc?: string }[];
  selectedOptions: string[] | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxInput = ({
  label,
  name,
  options,
  selectedOptions,
  onChange,
}: CheckboxInputProps) => {
  const handleBoxClick = (value: string) => {
    //React.ChangeEvent<HTMLInputElement>
    onChange({
      target: { name, value, checked: !selectedOptions.includes(value) },
    } as any);
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <FlexContainer>
        {options.map((option) => (
          <CheckboxContainer
            key={option.value}
            isSelected={selectedOptions.includes(option.value)}
            onClick={() => handleBoxClick(option.value)}
          >
            {option.label}
            {option.desc && <p>{option.desc}</p>}
          </CheckboxContainer>
        ))}
      </FlexContainer>
    </Container>
  );
};

export default CheckboxInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  color: black;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
`;

const CheckboxContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;

  flex: 1;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  background: ${COLORS.w};
  border: 1px solid
    ${({ isSelected }) => (isSelected ? COLORS.main : COLORS.g1)};
  color: ${({ isSelected }) => (isSelected ? COLORS.main : COLORS.g5)};
  cursor: pointer;
  text-align: center;
  justify-content: center;

  p {
    color: ${COLORS.g2};
    font-weight: 500;
    font-size: 14px;
    padding-top: 10px;
    display: inline-block;
  }
`;
const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  flex-wrap: wrap;
`;
