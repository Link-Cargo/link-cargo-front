import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput = ({
  label,
  name,
  value,
  options,
  onChange,
}: SelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange({
      target: { name, value },
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <Container>
      <Label>{label}</Label>
      <DropdownContainer>
        <SelectedOption onClick={() => setIsOpen(!isOpen)}>
          {selectedValue || '직책을 선택해 주세요.'}
          <Arrow isOpen={isOpen} />
        </SelectedOption>
        {isOpen && (
          <DropdownMenu>
            {options.map((option) => (
              <DropdownItem
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </DropdownContainer>
    </Container>
  );
};

export default SelectInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const Label = styled.label`
  color: ${COLORS.bk};
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectedOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(215, 215, 215, 1);
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 16px;
  line-height: 20px;
  color: black;
  cursor: pointer;
  background-color: white;
  user-select: none;
`;

const Arrow = styled.div<{ isOpen: boolean }>`
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(-135deg)' : 'rotate(45deg)')};
  transition: transform 0.3s ease;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid rgba(215, 215, 215, 1);
  border-radius: 12px;
  background-color: white;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  font-size: 16px;
  line-height: 20px;
  color: black;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.g1};
  }
`;
