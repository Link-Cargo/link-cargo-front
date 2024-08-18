import { COLORS } from '@/app/_constant/color';
import React from 'react';
import styled from 'styled-components';

interface CheckboxInputProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void; // Changed to pass selected options directly
}

const CheckboxInput = ({
  label,
  name,
  options,
  selectedOptions,
  onChange,
}: CheckboxInputProps) => {
  const handleBoxClick = (value: string) => {
    const newSelectedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];

    onChange(newSelectedOptions); // Directly passing the updated array
  };

  return (
    <Container>
      <Label>{label}</Label>
      <FlexContainer>
        {options.map((option) => (
          <CheckboxContainer
            key={option.value}
            isSelected={selectedOptions.includes(option.value)}
            onClick={() => handleBoxClick(option.value)}
          >
            {option.label}
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
`;
const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  flex-wrap: wrap;
`;
