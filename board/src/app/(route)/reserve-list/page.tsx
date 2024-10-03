'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';

import Button from '@/app/_components/common/Button';
import Text from '@/app/_components/common/Text';
import Layout from '@/app/_components/common/Layout';
import OptionCard from '@/app/_components/common/OptionCard';
import { processData } from './utill';
import { getTokenFromLocalStorage } from '@/app/_utils/auth';
import Confirm from '@/app/_components/common/Confirm';
import { GetISchedulesDto, QuotationApiService } from '@/app/_apis/quotation';
import useModal from '@/app/_hooks/useModal';
import Modal from '@/app/_components/common/Modal';

function ContentPage() {
  /*---- router ----*/
  const router = useRouter();
  /*---- auth ----*/
  const tokens = getTokenFromLocalStorage();
  const accessToken = tokens?.accessToken || '';
  /*---- hooks ----*/
  const searchParams = useSearchParams();
  const { isShowing, toggle } = useModal();
  /*---- state ----*/
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const exportPortId = decodeURIComponent(
    searchParams.get('exportPortId') || '',
  );
  const importPortId = decodeURIComponent(
    searchParams.get('importPortId') || '',
  );
  const wishExportDate = searchParams.get('wishExportDate') || '';
  const searchBoxText = `${exportPortId} → ${importPortId} | ${wishExportDate}`;
  /*---- function ----*/
  const handleSelect = (id: number) => {
    if (selectedList.includes(id)) {
      // 이미 선택된 항목을 클릭하면 선택 해제
      setSelectedList(selectedList.filter((item) => item !== id));
    } else {
      // 선택된 항목이 3개 미만일 때만 새로운 항목 선택 허용
      if (selectedList.length < 3) {
        setSelectedList([...selectedList, id]);
      }
    }
  };

  function handleNext() {
    const params = new URLSearchParams(searchParams);
    params.set('selectedList', JSON.stringify(selectedList));
    if (accessToken) {
      router.push(`/request?${params.toString()}`);
    } else {
      toggle();
    }
  }

  function goLogin() {
    const params = new URLSearchParams(searchParams);
    params.set('selectedList', JSON.stringify(selectedList));
    const reserveListPath = `/reserve-list?${params.toString()}`;
    router.push(`/login?redirect=${encodeURIComponent(reserveListPath)}`);
  }

  /*---- useEffect ----*/
  useEffect(() => {
    // URL 파라미터에서 selectedList 값을 가져와서 상태에 반영
    const selectedListParam = searchParams.get('selectedList');
    if (selectedListParam) {
      try {
        // JSON 파싱하여 selectedList에 설정
        const parsedList = JSON.parse(selectedListParam) as number[];
        setSelectedList(parsedList);
      } catch (error) {
        console.error('selectedList 파싱 오류:', error);
      }
    }
  }, [searchParams]);
  /*---- api call function ----*/
  const {
    data: scheduleData,
    error: scheduleError,
    isLoading: scheduleLoading,
  } = useQuery<GetISchedulesDto, Error>({
    queryKey: ['schedule'],
    queryFn: () => QuotationApiService.getSchedules(),
  });

  /*---- jsx ----*/
  return (
    <Layout>
      <Container>
        <Text
          title="예약 가능 리스트"
          desc="원하는 업체를 선택하여 견적을 요청해보세요."
        />
        <FormSection gapValue={8}>
          <FlexContainer>
            <SearchBox>{searchBoxText}</SearchBox>
            <GrayBox>
              <div>예상 비용</div>
              <span>1,073,280원</span>
            </GrayBox>
          </FlexContainer>
          <Tip>
            <span>TIP!</span>
            <div>
              LCL 화물은 FCL 화물보다 4~5일 더 소요돼요. 적재 전과 운송 후에
              화물의 품질 및 수량 확인, 수출 처리, 컨테이너 배송 및 회수, 추가
              검사 등 FCL보다 더 많은 과정을 거쳐요. 스케줄을 선택할 때 이 점을
              고려해주세요.
            </div>
          </Tip>
        </FormSection>
        <FormSection gapValue={30}>
          <Caution>
            <span>
              도착일자는 현지시간 기준으로, 업체 사정에 따라 사전고지 없이
              변경될 수 있습니다.
            </span>
            <span>도움말</span>
          </Caution>
          <CardContainer>
            {scheduleData?.result.schedules.map((el) => {
              const processedData = processData(el);
              return (
                <OptionCard
                  key={el.id}
                  data={processedData}
                  select={{
                    isSelected: selectedList.includes(el.id),
                    num: selectedList.indexOf(el.id) + 1,
                  }}
                  onClick={() => handleSelect(el.id)}
                />
              );
            })}
          </CardContainer>
        </FormSection>
        <ButtonSection>
          <Button
            text="포워딩 업체 선택 완료"
            type="dark"
            onClick={handleNext}
          />
        </ButtonSection>
      </Container>

      <Modal
        isShowing={isShowing}
        content={
          <Confirm
            title="로그인이 필요한 서비스입니다."
            desc={`로그인 후 즉시 포워더로부터 실제 견적서를 받고 비교해보세요.
            합리적인 선택을 할 수 있도록 링카고가 도와드려요. `}
            onLeft={{
              onClick: toggle,
              text: '닫기',
            }}
            onRight={{
              onClick: goLogin,
              text: '로그인 바로가기',
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

const CardContainer = styled.div`
  margin: 0 auto;
  display: flex;
  gap: 18px 18px;
  flex-wrap: wrap;
  justify-content: space-between;
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

const GrayBox = styled.div`
  display: flex;
  height: 56px;
  padding: 0px 28px;
  align-items: center;
  gap: 24px;
  border-radius: 12px;
  background-color: ${COLORS.g0};
  justify-content: space-between;

  div,
  span {
    white-space: nowrap;
    font-size: 20px;
  }

  div {
    color: ${COLORS.g4};
  }

  span {
    color: ${COLORS.main};
    font-weight: 800;
  }
`;

const SearchBox = styled.div`
  height: 56px;
  line-height: 56px;
  padding: 0px 28px;
  border-radius: 12px;
  background-color: ${COLORS.w};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  flex: 1;
  text-align: center;

  font-size: 20px;
  color: ${COLORS.g4};
`;

const Tip = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  padding: 10px 0px;

  div {
    color: ${COLORS.g3};
  }

  span {
    color: ${COLORS.red};
    font-weight: 800;
  }
`;

const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const Icon = styled.span`
  font-size: 30px;
  color: ${COLORS.main};
`;

const Caution = styled.span`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: ${COLORS.g2};
`;
