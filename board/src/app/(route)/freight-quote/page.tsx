'use client';

import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import Button from '@/app/_components/common/Button';
import {
  TextInput,
  CheckboxInput,
  SelectInput,
} from '@/app/_components/common/Input';

import { useRouter } from 'next/navigation';
import Text from '@/app/_components/common/Text';
import Layout from '@/app/_components/common/Layout';
import { getPorts } from '@/app/_apis/getPorts';
import { 항구SelectOptionsInfo, CargoInfo, CargoItem } from './utill';

export default function Page() {
  /*---- router ----*/
  const router = useRouter();
  const queryParams = new URLSearchParams();
  /*---- [server] state ----*/
  const [항구옵션, set항구옵션] = useState<항구SelectOptionsInfo[]>([]);
  /*---- [client] state ----*/
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [formData, setFormData] = useState<CargoInfo>({
    importPortId: 1,
    exportPortId: 1,
    wishExportDate: '',
    incoterms: [],
    reserveList: [1, 2],
    cargos: [
      {
        productName: '',
        hsCode: '',
        content: '',
        totalQuantity: 0,
        quantityPerBox: 0,
        boxSize: {
          width: 0,
          height: 0,
          depth: 0,
        },
        weight: 0,
        value: 0,
      },
    ],
  });

  /*---- function ----*/
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string[],
    fieldName?: string,
  ) => {
    if (Array.isArray(e)) {
      // Handle the checkbox options
      setFormData((prevFormData) => ({
        ...prevFormData,
        incoterms: e,
      }));
    } else {
      const { name, value, type } = e.target;

      const isCheckbox = type === 'checkbox';
      const isNumber = type === 'number';

      if (name.startsWith('cargos')) {
        const [_, indexStr, field, nestedField] = name.split('.');
        const index = parseInt(indexStr, 10);

        setFormData((prevFormData) => ({
          ...prevFormData,
          cargos: prevFormData.cargos.map((cargo, i) => {
            if (i !== index) return cargo;

            // Ensure the nested field is an object
            const fieldValue = cargo[field as keyof CargoItem];
            const nestedObject =
              typeof fieldValue === 'object' && fieldValue !== null
                ? fieldValue
                : {};

            return {
              ...cargo,
              ...(nestedField
                ? {
                    [field]: {
                      ...nestedObject,
                      [nestedField]: isNumber ? Number(value) : value,
                    },
                  }
                : { [field]: isNumber ? Number(value) : value }),
            };
          }),
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: isNumber ? Number(value) : value,
        }));
      }
    }
  };

  const addCargo = () => {
    setFormData({
      ...formData,
      cargos: [
        ...formData.cargos,
        {
          productName: '',
          hsCode: '',
          content: '',
          totalQuantity: 0,
          quantityPerBox: 0,
          boxSize: {
            width: 0,
            height: 0,
            depth: 0,
          },
          weight: 0,
          value: 0,
        },
      ],
    });
  };

  const handleSubmit = () => {
    for (const key in formData) {
      if (key === 'cargos') {
        queryParams.append('cargos', JSON.stringify(formData.cargos));
      } else if (key === 'reserveList') {
        queryParams.append('reserveList', JSON.stringify(formData.reserveList));
      } else {
        queryParams.append(key, String(formData[key as keyof CargoInfo]));
      }
    }

    router.push(`/reserve-list?${queryParams.toString()}`);
  };

  /*---- useEffect ----*/
  useEffect(() => {
    setIsNextButtonDisabled(
      !formData.importPortId ||
        !formData.exportPortId ||
        !formData.wishExportDate,
    );
  }, [formData]);

  useEffect(() => {
    wrapGetPorts();
  }, []);

  /*---- api call function ----*/
  function wrapGetPorts() {
    getPorts()
      .then((response) => {
        console.log('Ports data:', response);

        const options = response.map((item) => ({
          id: item.id,
          value: item.name,
          label: item.name,
        }));

        set항구옵션(options);
      })
      .catch((error) => {
        console.error('Error fetching ports:', error);
      });
  }

  /*---- jsx ----*/
  return (
    <Layout>
      <Container>
        <Text
          title="화물 정보 입력"
          highlight="링카고"
          desc="와 함께 견적을 산출해보세요!"
        />
        <FormSection gapValue={30}>
          <FlexContainer>
            <SelectInput
              label="출발지"
              options={항구옵션}
              placeholder="출발지 선택"
              name="importPortId"
              value={String(formData.importPortId)}
              onChange={handleInputChange}
            />
            <SelectInput
              label="도착지"
              options={항구옵션}
              placeholder="도착지 선택"
              name="exportPortId"
              value={String(formData.exportPortId)}
              onChange={handleInputChange}
            />
          </FlexContainer>
          <TextInput
            label="희망출항 날짜"
            type="date"
            placeholder="시작날짜 선택"
            name="wishExportDate"
            value={formData.wishExportDate}
            onChange={handleInputChange}
          />
          <CheckboxInput
            label="인코텀즈"
            name="incoterms"
            options={[
              { value: 'CIF', label: 'CIF' },
              { value: 'CFR', label: 'CFR' },
              { value: 'DAP', label: 'DAP' },
              { value: 'DDP', label: 'DDP' },
            ]}
            selectedOptions={formData.incoterms}
            onChange={(selectedOptions) => handleInputChange(selectedOptions)}
          />
        </FormSection>
        {formData.cargos.map((cargo, index) => (
          <FormSection key={index} gapValue={12}>
            <Text subtitle={`화물 ${index + 1} `} />
            <FlexContainer>
              <TextInput
                label="총 수출 물품 수량"
                type="number"
                placeholder="총 수출 물품 수량"
                name={`cargos.${index}.totalQuantity`}
                value={cargo.totalQuantity.toString()}
                onChange={handleInputChange}
              />
              <TextInput
                label="박스당 물품 수량"
                type="number"
                placeholder="박스당 물품 수량"
                name={`cargos.${index}.quantityPerBox`}
                value={cargo.quantityPerBox.toString()}
                onChange={handleInputChange}
              />
            </FlexContainer>
            <FlexContainer>
              <TextInput
                label="박스가로"
                type="number"
                placeholder="박스가로"
                name={`cargos.${index}.boxSize.width`}
                value={cargo.boxSize.width.toString()}
                onChange={handleInputChange}
              />
              <TextInput
                label="박스세로"
                type="number"
                placeholder="박스세로"
                name={`cargos.${index}.boxSize.height`}
                value={cargo.boxSize.height.toString()}
                onChange={handleInputChange}
              />
              <TextInput
                label="박스높이"
                type="number"
                placeholder="박스높이"
                name={`cargos.${index}.boxSize.depth`}
                value={cargo.boxSize.depth.toString()}
                onChange={handleInputChange}
              />
            </FlexContainer>
            <TextInput
              label="박스중량"
              type="number"
              placeholder="박스중량"
              name={`cargos.${index}.weight`}
              value={cargo.weight.toString()}
              onChange={handleInputChange}
            />
            <TextInput
              label="물품 가액"
              type="number"
              placeholder="물품 가액"
              name={`cargos.${index}.value`}
              value={cargo.value.toString()}
              onChange={handleInputChange}
            />
          </FormSection>
        ))}
        {formData.cargos.length < 5 && (
          <AddCargoButton onClick={addCargo}>
            <Text desc={`화물 ${formData.cargos.length + 1} 추가하기`} />
          </AddCargoButton>
        )}
        <ButtonSection>
          <Button
            text="운임 조회하기"
            type="dark"
            onClick={handleSubmit}
            disabled={isNextButtonDisabled}
          />
        </ButtonSection>
      </Container>
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

const AddCargoButton = styled.h1`
  cursor: pointer;
  color: ${COLORS.main};
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
`;

const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;
