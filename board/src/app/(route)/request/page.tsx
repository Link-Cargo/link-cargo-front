'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { userAtom } from '@/app/_recoil/userAtom';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import Button from '@/app/_components/common/Button';
import Text from '@/app/_components/common/Text';
import Layout from '@/app/_components/common/Layout';
import TextBox from './TextBox';
import MultiTextBox from './MultiTextBox';
import { TextInput } from '@/app/_components/common/Input';
import useModal from '@/app/_hooks/useModal';
import Modal from '@/app/_components/common/Modal';
import Confirm from '@/app/_components/common/Confirm';
import ListWithCheck from './ListWithCheck';

import {
  getPortIdByName,
  requestList,
  transformDate,
  formatDateRange,
} from './utill';

import { GetIPortDto, getPortsAll } from '@/app/_apis/getPorts';
import { getTokenFromLocalStorage } from '@/app/_utils/auth';
import {
  QuotationApiService,
  GetIEstimatedDto,
  GetISchedulesDto,
  GetIScheduleDto,
  postIQuotationDto,
  GetICargosContentDto,
  postIRawQuotationDto,
} from '@/app/_apis/quotation';
import { CargosContent } from '@/app/_apis/quotation/postCargos';

function ContentPage() {
  /*---- hooks ----*/
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isShowing, toggle } = useModal();

  /*---- state ----*/
  const tokens = getTokenFromLocalStorage();
  const accessToken = tokens?.accessToken || '';
  const [queryParams, setQueryParams] = useState<CargosContent>({
    exportPortId: '',
    importPortId: '',
    wishExportDate: '',
    incoterms: '',
    cargos: [],
  });
  const [리스트queryParams, set리스트QueryParams] = useState<string[]>([]);
  const [resCargoId, setResCargoId] = useState<string[]>([]);
  const [reqRawQuotationId, setReqRawQuotationId] = useState<string>();
  const [estimatedQuotations, setEstimatedQuotations] = useState<
    GetIEstimatedDto['result']['estimatedQuotations']
  >([]);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(2).fill(false),
  );

  /*---- function ----*/
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: 'productName' | 'hsCode' | 'additionalNotes',
  ) => {
    const { value } = e.target;
    const updatedCargos = [...queryParams.cargos];
    updatedCargos[index] = {
      ...updatedCargos[index],
      [field]: value,
    };
    setQueryParams({ ...queryParams, cargos: updatedCargos });
  };

  const handleCheckChange = (index: number) => {
    const newCheckedItems = [...checkedItems]; // 현재 체크박스 상태 배열 복사 (얕은 복사)
    newCheckedItems[index] = !newCheckedItems[index]; // 각 체크박스 상태 토글 체크
    setCheckedItems(newCheckedItems); // 현재 체크박스 상태 배열로 업데이트
  };

  /*---- api call function ----*/
  const {
    mutate: mutateCargos,
    data: cargoData,
    error: cargoError,
  } = useMutation<
    GetICargosContentDto,
    Error,
    { req_body: CargosContent; at: string }
  >({
    mutationFn: ({ req_body, at }) =>
      QuotationApiService.postCargos(req_body, at),
    onSuccess: (response: GetICargosContentDto) => {
      const cargoIds = response.result.cargoIds;
      // cargoIds를 사용하여 두 번째 뮤테이션 실행
      mutateRawQuotation({ cargoIds, at: accessToken });
    },
    onError: (error: Error) => {
      console.error('API call failed (POST /cargos):', error.message);
    },
  });

  const {
    mutate: mutateRawQuotation,
    data: rawQuotationData,
    error: rawQuotationError,
  } = useMutation<
    postIRawQuotationDto,
    Error,
    { cargoIds: string[]; at: string }
  >({
    mutationFn: ({ cargoIds, at }) =>
      QuotationApiService.postRawQuotation({ cargoIds }, at),
    onSuccess: (response: postIRawQuotationDto) => {
      const rawQuotationId = response.result;
      // rawQuotationId를 사용하여 세 번째 뮤테이션 실행
      mutateQuotation({
        rawQuotationId,
        scheduleIds: 리스트queryParams,
        at: accessToken,
      });
    },
    onError: (error: Error) => {
      console.error('API call failed (POST /quotations/raw):', error.message);
    },
  });

  const { mutate: mutateQuotation } = useMutation<
    postIQuotationDto,
    Error,
    { rawQuotationId: string; scheduleIds: string[]; at: string }
  >({
    mutationFn: ({ rawQuotationId, scheduleIds, at }) => {
      const requestBody = scheduleIds.map((scheduleId) => ({
        scheduleId: Number(scheduleId),
        rawQuotationId,
      }));
      return QuotationApiService.postQuotation(requestBody, at);
    },
    onSuccess: (response) => {
      const quotationIds = response.result.map((quotation) => quotation);
      // 네 번째 뮤테이션 호출 (예상 업체 견적 요청)
      mutateEstimated({ quotationIds, at: accessToken });
    },
    onError: (error) => {
      console.error('API call failed (POST /quotations):', error.message);
    },
  });

  const { mutate: mutateEstimated } = useMutation<
    GetIEstimatedDto,
    Error,
    { quotationIds: string[]; at: string }
  >({
    mutationFn: ({ quotationIds, at }) =>
      QuotationApiService.getEstimated(quotationIds, at),
    onSuccess: (response) => {
      // 예상 업체 견적을 setState로 저장
      setEstimatedQuotations(response.result.estimatedQuotations);
      console.log('Estimated quotations:', response.result.estimatedQuotations);
    },
    onError: (error) => {
      console.error(
        'API call failed (GET /quotations/estimated):',
        error.message,
      );
    },
  });

  const ScheduleIdData = useQueries({
    queries: 리스트queryParams.map((sId) => ({
      queryKey: ['schedule', sId],
      queryFn: () =>
        QuotationApiService.getScheduleId(Number(sId), accessToken!),
      enabled: !!accessToken,
    })),
  });

  //TODO 캐시로 변경
  const {
    data: PortData,
    error: PortError,
    isLoading: PortLoading,
  } = useQuery<GetIPortDto, Error>({
    queryKey: ['Port'],
    queryFn: () => getPortsAll(accessToken!),
    enabled: !!accessToken,
  });

  function customMutate(req_body: CargosContent, _at: string) {
    const _exportPortId = PortData
      ? getPortIdByName(PortData, req_body.exportPortId)
      : undefined;
    const _importPortId = PortData
      ? getPortIdByName(PortData, req_body.importPortId)
      : undefined;

    const { exportPortId, importPortId, wishExportDate, ...restQueryParams } =
      queryParams;

    mutateCargos({
      req_body: {
        exportPortId: _exportPortId,
        importPortId: _importPortId,
        wishExportDate: transformDate(req_body.wishExportDate),
        ...restQueryParams,
      },
      at: _at,
    });
  }

  /*---- effect ----*/
  useEffect(() => {
    const exportPortId = searchParams.get('exportPortId') || '';
    const importPortId = searchParams.get('importPortId') || '';
    const wishExportDate = searchParams.get('wishExportDate') || '';
    const incoterms = searchParams.get('incoterms') || '';
    const cargos = JSON.parse(searchParams.get('cargos') || '[]');
    const selectedList = JSON.parse(searchParams.get('selectedList') || '[]');

    setQueryParams({
      exportPortId,
      importPortId,
      wishExportDate,
      incoterms,
      cargos,
    });

    set리스트QueryParams(selectedList);
  }, [searchParams]);

  /*---- jsx ----*/
  return (
    <Layout>
      <Container>
        <Text
          title="견적 요청"
          desc="화물 정보를 점검하고 업체별로 견적서를 요청해보세요."
        />
        <FormSection gapValue={24}>
          <Text subtitle="선택한 업체" />
          <FlexContainer>
            {ScheduleIdData.map((query, index) => {
              const { data, isLoading, error } = query;
              return (
                <MultiTextBox
                  key={index}
                  title={data?.result?.vessel || ''}
                  desc={
                    data?.result?.ETD && data?.result?.ETA
                      ? formatDateRange(data.result.ETD, data.result.ETA)
                      : 'No schedule data'
                  }
                />
              );
            })}
          </FlexContainer>
        </FormSection>
        <FormSection gapValue={24}>
          <Text subtitle="화물 정보" />
          <FlexContainer>
            <TextBox
              title={`${queryParams.exportPortId} > ${queryParams.importPortId}`}
              desc="출발지 > 도착지"
              isColored={true}
            />
            <TextBox
              title={queryParams.wishExportDate}
              desc="희망 출항 날짜"
              isColored={true}
            />
            <TextBox
              title={queryParams.incoterms}
              desc="인코텀즈"
              isColored={true}
            />
          </FlexContainer>
        </FormSection>

        {queryParams.cargos.map((cargo, index) => (
          <React.Fragment key={index}>
            <FormSection gapValue={24}>
              <Text subtitle={`화물 ${index + 1} 정보`} />
              <FlexContainer>
                <TextBox
                  title={`${cargo.totalQuantity} 개`}
                  desc="총 수출 물품 수량"
                  isColored={true}
                />
                <TextBox
                  title={`${cargo.quantityPerBox} 개`}
                  desc="박스 당 물품 수량"
                  isColored={true}
                />
              </FlexContainer>
              <FlexContainer>
                <TextBox
                  title={`${cargo.boxSize.width}x${cargo.boxSize.height}x${cargo.boxSize.depth} m`}
                  desc="박스 길이 (가로x세로x높이) m"
                  isColored={false}
                />
                <TextBox
                  title={`${cargo.weight} kg`}
                  desc="화물 중량"
                  isColored={false}
                />
                <TextBox
                  title={`${cargo.value} 원`}
                  desc="물품 가액"
                  isColored={false}
                />
              </FlexContainer>
            </FormSection>
            <FormSection gapValue={24}>
              <Text subtitle={`화물 ${index + 1} 추가 정보`} />
              <TextInput
                label="HS 코드"
                type="text"
                placeholder="HS 코드를 입력해주세요."
                name="hsCode"
                value={cargo.hsCode}
                onChange={(e) => handleInputChange(e, index, 'hsCode')}
              />
              <TextInput
                label="화물명"
                type="text"
                placeholder="화물명을 입력해주세요."
                name="productName"
                value={cargo.productName}
                onChange={(e) => handleInputChange(e, index, 'productName')}
              />
              <TextInput
                label="기타 전달사항"
                type="text"
                placeholder="전달사항을 입력해주세요."
                name="additionalNotes"
                value={cargo.additionalNotes}
                onChange={(e) => handleInputChange(e, index, 'additionalNotes')}
              />
            </FormSection>
          </React.Fragment>
        ))}
        <CheckList>
          {requestList.map((el, idx) => (
            <ListWithCheck
              key={idx}
              text={el}
              type="subTitle"
              onClick={() => handleCheckChange(idx)}
              isChecked={checkedItems[idx]}
            />
          ))}
        </CheckList>
        <ButtonSection>
          <Button
            text="운임 조회하기"
            type="dark"
            flexValue={3}
            onClick={() => {
              customMutate(queryParams, accessToken);
              toggle();
            }}
          />
        </ButtonSection>
      </Container>
      <Modal
        isShowing={isShowing}
        content={
          <Confirm
            title="견적서를 요청했습니다!"
            desc={`해당 스케줄에 해당하는 포워더에게 견적서 송부 요청을 보냈어요.\n24시간 이내로 견적서가 도착해요.`}
            onLeft={{
              onClick: () => {
                toggle();
              },
              text: '닫기',
            }}
            onRight={{
              onClick: () => router.push(`/dashboard`),
              text: '나의 대시보드 바로가기',
            }}
          ></Confirm>
        }
      />
    </Layout>
  );
}

const Page = () => {
  return (
    <Suspense>
      <ContentPage />
    </Suspense>
  );
};

export default Page;

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

const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;
const ImgC = styled.div`
  width: 800px;
`;

const CheckList = styled.div``;
