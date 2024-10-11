'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';

import Button from '@/app/_components/common/Button';
import {
  TextInput,
  CheckboxInput,
  SelectInput,
} from '@/app/_components/common/Input';
import Text from '@/app/_components/common/Text';
import Layout from '@/app/_components/common/Layout';

import { CargosContent, CargosInfo } from '@/app/_apis/quotation/postCargos';
import {
  GetIPortDto,
  getPorts,
  getPortsAll,
  PortType,
} from '@/app/_apis/getPorts';
import { getTokenFromLocalStorage } from '@/app/_utils/auth';

import Popup from '@/app/_components/common/Popup';
import { useTutorial } from '@/app/_hooks/useTutorial';
import { PostICalculateDto, QuotationApiService } from '@/app/_apis/quotation';
import { getPortIdByName, transformDate } from '../request/utill';

export default function Page() {
  /*---- router ----*/
  const router = useRouter();
  /*---- auth ----*/
  const tokens = getTokenFromLocalStorage();
  const accessToken = tokens?.accessToken || '';
  /*---- state ----*/
  const [formData, setFormData] = useState<CargosContent>({
    exportPortId: null,
    importPortId: null,
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
  const { isShow, isTodayShow, onClose, onTodayHideToggle } = useTutorial();

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
          totalQuantity: null,
          quantityPerBox: null,
          boxSize: {
            width: null,
            height: null,
            depth: null,
          },
          weight: null,
          value: null,
        },
      ],
    });
  };

  const deleteCargo = (index: number) => {
    const updatedCargos = formData.cargos.filter((_, i) => i !== index);
    setFormData({ ...formData, cargos: updatedCargos });
  };

  const handleSubmit = () => {
    mutateCalc({
      req_body: {
        ...formData,
        exportPortId: getPortIdByName(
          portData as GetIPortDto,
          formData.exportPortId,
        ),
        importPortId: getPortIdByName(
          portData as GetIPortDto,
          formData.importPortId,
        ),
        wishExportDate: transformDate(formData.wishExportDate),
      },
      at: accessToken,
    });

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

  /*---- api call function ----*/
  const {
    data: importPortData,
    error: importPortError,
    isLoading: importPortLoading,
  } = useQuery<GetIPortDto, Error>({
    queryKey: ['importPort'],
    queryFn: () => getPorts({ type: PortType.IMPORT }, accessToken),
    // enabled: !!accessToken,
  });
  const {
    data: exportPortData,
    error: exportPortError,
    isLoading: exportPortLoading,
  } = useQuery<GetIPortDto, Error>({
    queryKey: ['exportPort'],
    queryFn: () => getPorts({ type: PortType.EXPORT }, accessToken),
    // enabled: !!accessToken,
  });

  const {
    data: portData,
    error: portError,
    isLoading: portLoading,
  } = useQuery<GetIPortDto, Error>({
    queryKey: ['Port'],
    queryFn: () => getPortsAll(tokens?.accessToken),
    enabled: !!tokens?.accessToken,
  });

  const {
    mutate: mutateCalc,
    data: CalcData,
    error: CalcError,
  } = useMutation<
    PostICalculateDto,
    Error,
    { req_body: CargosContent; at: string }
  >({
    mutationFn: ({ req_body, at }) =>
      QuotationApiService.postCalculate(req_body, at),
    onSuccess: (response: PostICalculateDto) => {
      localStorage.setItem('calc', response.result.toString());
    },
    onError: (error: any) => {
      const response = error.response?.data;
    },
  });

  /*---- useEffect ----*/
  useEffect(() => {
    // 각 cargo가 유효한지 확인하는 함수
    const isCargoValid = (cargo: CargosInfo) => {
      return (
        cargo.totalQuantity !== null &&
        cargo.quantityPerBox !== null &&
        cargo.boxSize.width !== null &&
        cargo.boxSize.height !== null &&
        cargo.boxSize.depth !== null &&
        cargo.weight !== null &&
        cargo.value !== null
      );
    };

    // 추가된 cargo들의 수에 맞게 그만큼만 유효성 검사
    const areCargosValid =
      formData.cargos.length > 0 && formData.cargos.every(isCargoValid);

    setIsNextButtonDisabled(
      !formData.exportPortId ||
        !formData.importPortId ||
        !formData.wishExportDate ||
        !areCargosValid, // 추가된 모든 cargo가 유효한지 확인
    );
  }, [formData]);

  useEffect(() => {
    addCargo();
  }, []);

  useEffect(() => {
    if (importPortData) {
      const importPorts = importPortData.result;
      setImportPortOptions(
        importPorts.map((port) => ({
          value: port.name,
          label: port.name,
          id: port.id,
        })),
      );
    }
  }, [importPortData]);

  useEffect(() => {
    if (exportPortData) {
      const exportPorts = exportPortData.result;
      setExportPortOptions(
        exportPorts.map((port) => ({
          value: port.name,
          label: port.name,
          id: port.id,
        })),
      );
    }
  }, [exportPortData]);

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
              value={formData.exportPortId?.toString() || ''}
              onChange={handleInputChange}
              options={exportPortOptions}
            />

            <SelectInput
              label="도착지"
              name="importPortId"
              placeholder="도착지 선택"
              value={formData.importPortId?.toString() || ''}
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
              { value: 'CIF', label: 'CIF', desc: '운임, 보험료 포함인도' },
              { value: 'CFR', label: 'CFR', desc: '운임포함인도' },
              { value: 'DAP', label: 'DAP', desc: '도착장소인도' },
              { value: 'DDP', label: 'DDP', desc: '관세지급인도' },
            ]}
            selectedOptions={[formData.incoterms]}
            onChange={(e) =>
              handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
            }
          />
        </FormSection>
        {formData.cargos.map((cargo, index) => (
          <FormSection key={index} gapValue={12}>
            <FlexContainer2>
              <Text subtitle={`화물 ${index + 1} `} />
              {formData.cargos.length > 1 && (
                <Icon2
                  onClick={() => deleteCargo(index)}
                  className="material-icons"
                >
                  {'delete'}
                </Icon2>
              )}
            </FlexContainer2>

            <FlexContainer>
              <TextInput
                label="총 수출 물품 수량"
                type="number"
                placeholder="총 수출 물품 수량"
                name="totalQuantity"
                value={cargo.totalQuantity?.toString() || ''}
                onChange={(e) => handleInputChange(e, index, 'totalQuantity')}
              />
              <TextInput
                label="박스당 물품 수량"
                type="number"
                placeholder="박스당 물품 수량"
                name="quantityPerBox"
                value={cargo.quantityPerBox?.toString() || ''}
                onChange={(e) => handleInputChange(e, index, 'quantityPerBox')}
              />
            </FlexContainer>
            <FlexContainer>
              <TextInput
                label="박스가로"
                type="number"
                placeholder="박스가로"
                name="width"
                value={cargo.boxSize.width?.toString() || ''}
                onChange={(e) => handleInputChange(e, index, 'boxSize.width')}
              />
              <TextInput
                label="박스세로"
                type="number"
                placeholder="박스세로"
                name="height"
                value={cargo.boxSize.height?.toString() || ''}
                onChange={(e) => handleInputChange(e, index, 'boxSize.height')}
              />
              <TextInput
                label="박스높이"
                type="number"
                placeholder="박스높이"
                name="depth"
                value={cargo.boxSize.depth?.toString() || ''}
                onChange={(e) => handleInputChange(e, index, 'boxSize.depth')}
              />
            </FlexContainer>
            <TextInput
              label="박스중량"
              type="number"
              placeholder="박스중량"
              name="weight"
              value={cargo.weight?.toString() || ''}
              onChange={(e) => handleInputChange(e, index, 'weight')}
            />
            <TextInput
              label="물품 가액"
              type="number"
              placeholder="물품 가액"
              name="value"
              value={cargo.value?.toString() || ''}
              onChange={(e) => handleInputChange(e, index, 'value')}
            />
            {formData.cargos.length < 5 && (
              <AddCargoButton onClick={addCargo}>
                <Icon className="material-icons">{'add'}</Icon>
                <div>화물 {index + 2} 추가하기</div>
              </AddCargoButton>
            )}
          </FormSection>
        ))}

        <ButtonSection>
          <Button
            text="운임 조회하기"
            type="dark"
            onClick={handleSubmit}
            disabled={isNextButtonDisabled}
          />
        </ButtonSection>
      </Container>

      <Popup
        isShow={isShow}
        isTodayShow={isTodayShow}
        content={'처음어어도 괜찮아,\n링카고 튜로리얼'}
        onClick={() => router.push('/tutorial#freightQuote')}
        onClose={onClose}
        onTodayHideToggle={onTodayHideToggle}
      />
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
  color: ${COLORS.g5};
  margin-top: 20px;
  display: flex;
  align-items: center;
  font-weight: 400;
  div {
    font-size: 16px;
    padding: 5.5px 0px;
  }
`;

const FlexContainer2 = styled.h1`
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled.span`
  font-size: 30px !important;
  padding-right: 10px;
`;

const Icon2 = styled.span`
  font-size: 30px !important;
  color: ${COLORS.red};
  cursor: pointer;
`;

const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;
