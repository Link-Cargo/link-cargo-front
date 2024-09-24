import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

interface CustomSelectInputProps {
  label?: string;
  name: string;
  value: string;
  options: { value: string; label: string; id?: string }[];
  onChange: (value: string, id?: string) => void;
  placeholder?: string;
}

const CustomSelectInput = ({
  label,
  name,
  value,
  options,
  onChange,
  placeholder,
}: CustomSelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const handleOptionClick = (value: string, id?: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange(value, id);
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <DropdownContainer>
        <SelectedOption
          onClick={() => setIsOpen(!isOpen)}
          isPlaceholder={!selectedValue}
        >
          {selectedValue || placeholder}
          <Arrow isOpen={isOpen} />
        </SelectedOption>
        {isOpen && (
          <DropdownMenu>
            {options.map((option) => (
              <DropdownItem
                key={option.value}
                onClick={() => handleOptionClick(option.value, option.id)}
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

export default CustomSelectInput;

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

const SelectedOption = styled.div<{ isPlaceholder: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(215, 215, 215, 1);
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 16px;
  line-height: 20px;
  color: ${({ isPlaceholder }) => (isPlaceholder ? COLORS.g2 : 'black')};
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
