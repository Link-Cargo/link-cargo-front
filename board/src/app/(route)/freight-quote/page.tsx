'use client';

import React, { useEffect, useState } from 'react';
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
import { CargosContent, CargosInfo } from '@/app/_apis/postCargos';

export default function Page() {
  /*---- router ----*/
  const router = useRouter();

  /*---- state ----*/
  const [formData, setFormData] = useState<CargosContent>({
    exportPortId: 0,
    importPortId: 0,
    wishExportDate: '',
    incoterms: '',
    cargos: [],
  });
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [importPortOptions, setImportPortOptions] = useState<
    { value: string; label: string; id: number }[]
  >([]);
  const [exportPortOptions, setExportPortOptions] = useState<
    { value: string; label: string; id: number }[]
  >([]);

  /*---- function ----*/
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number,
    field?:
      | keyof CargosInfo
      | 'boxSize.width'
      | 'boxSize.height'
      | 'boxSize.depth',
  ) => {
    const { name, value } = e.target;

    if (index !== undefined && field) {
      const updatedCargos = [...formData.cargos];
      if (field.startsWith('boxSize.')) {
        const [_, boxField] = field.split('.');
        updatedCargos[index] = {
          ...updatedCargos[index],
          boxSize: {
            ...updatedCargos[index].boxSize,
            [boxField]: Number(value),
          },
        };
      } else {
        updatedCargos[index] = {
          ...updatedCargos[index],
          [field]: value,
        };
      }
      setFormData({ ...formData, cargos: updatedCargos });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
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
          additionalNotes: '',
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
    const params = new URLSearchParams();

    (Object.keys(formData) as (keyof CargosContent)[]).forEach((key) => {
      const value = formData[key];

      if (Array.isArray(value)) {
        params.append(key, JSON.stringify(value));
      } else {
        params.append(key, value.toString());
      }
    });

    router.push(`/reserve-list?${params.toString()}`);
  };

  /*---- useEffect ----*/
  useEffect(() => {
    setIsNextButtonDisabled(
      !formData?.exportPortId ||
        !formData.importPortId ||
        !formData.wishExportDate,
    );
  }, [formData]);

  useEffect(() => {
    fetchPorts();
  }, []);

  /*---- api call function ----*/
  const fetchPorts = async () => {
    try {
      const importPorts = await getPorts('IMPORT');
      const exportPorts = await getPorts('EXPORT');

      setImportPortOptions(
        importPorts.map((port) => ({
          value: port.name,
          label: port.name,
          id: port.id,
        })),
      );
      setExportPortOptions(
        exportPorts.map((port) => ({
          value: port.name,
          label: port.name,
          id: port.id,
        })),
      );
    } catch (error) {
      console.error('Failed to fetch ports:', error);
    }
  };

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
              name="exportPortId"
              placeholder="출발지 선택"
              value={formData.exportPortId.toString()}
              onChange={handleInputChange}
              options={exportPortOptions}
            />
            <SelectInput
              label="도착지"
              name="importPortId"
              placeholder="도착지 선택"
              value={formData.importPortId.toString()}
              onChange={handleInputChange}
              options={importPortOptions}
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
            selectedOptions={[formData.incoterms]}
            onChange={(e) =>
              handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
            }
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
                name="totalQuantity"
                value={cargo.totalQuantity.toString()}
                onChange={(e) => handleInputChange(e, index, 'totalQuantity')}
              />
              <TextInput
                label="박스당 물품 수량"
                type="number"
                placeholder="박스당 물품 수량"
                name="quantityPerBox"
                value={cargo.quantityPerBox.toString()}
                onChange={(e) => handleInputChange(e, index, 'quantityPerBox')}
              />
            </FlexContainer>
            <FlexContainer>
              <TextInput
                label="박스가로"
                type="number"
                placeholder="박스가로"
                name="width"
                value={cargo.boxSize.width.toString()}
                onChange={(e) => handleInputChange(e, index, 'boxSize.width')}
              />
              <TextInput
                label="박스세로"
                type="number"
                placeholder="박스세로"
                name="height"
                value={cargo.boxSize.height.toString()}
                onChange={(e) => handleInputChange(e, index, 'boxSize.height')}
              />
              <TextInput
                label="박스높이"
                type="number"
                placeholder="박스높이"
                name="depth"
                value={cargo.boxSize.depth.toString()}
                onChange={(e) => handleInputChange(e, index, 'boxSize.depth')}
              />
            </FlexContainer>
            <TextInput
              label="박스중량"
              type="number"
              placeholder="박스중량"
              name="weight"
              value={cargo.weight.toString()}
              onChange={(e) => handleInputChange(e, index, 'weight')}
            />
            <TextInput
              label="물품 가액"
              type="number"
              placeholder="물품 가액"
              name="value"
              value={cargo.value.toString()}
              onChange={(e) => handleInputChange(e, index, 'value')}
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
