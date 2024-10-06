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
import { formatWishExportDate, processData } from './utill';
import { getTokenFromLocalStorage } from '@/app/_utils/auth';
import Confirm from '@/app/_components/common/Confirm';
import { GetISchedulesDto, QuotationApiService } from '@/app/_apis/quotation';
import useModal from '@/app/_hooks/useModal';
import Modal from '@/app/_components/common/Modal';

import Popup from '@/app/_components/common/Popup';
import { useTutorial } from '@/app/_hooks/useTutorial';

function ContentPage() {
  /*---- router ----*/
  const router = useRouter();
  /*---- auth ----*/
  const tokens = getTokenFromLocalStorage();
  const accessToken = tokens?.accessToken || '';
  /*---- hooks ----*/
  const searchParams = useSearchParams();
  const { isShowing, toggle } = useModal();
  const { isShowing: isQuotationShowing, toggle: quotationtoggle } = useModal();
  const { isShow, isTodayShow, onClose, onTodayHideToggle } = useTutorial();

  /*---- state ----*/
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const exportPortId = decodeURIComponent(
    searchParams.get('exportPortId') || '',
  );
  const importPortId = decodeURIComponent(
    searchParams.get('importPortId') || '',
  );

  const rawWishExportDate = searchParams.get('wishExportDate') || '';
  const wishExportDate = formatWishExportDate(rawWishExportDate);

  const searchBoxText = `${exportPortId} → ${importPortId} | ${rawWishExportDate}`;

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
      if (params.has('rawQuotationId')) {
        quotationtoggle();
      } else {
        router.push(`/request?${params.toString()}`);
      }
    } else {
      toggle(); // accessToken이 없는 경우
    }
  }

  const handleTutorial = () => {
    const params = searchParams.toString();
    router.push(`/tutorial#reserveList?${params}`);
  };

  function goLogin() {
    const params = new URLSearchParams(searchParams);
    params.set('selectedList', JSON.stringify(selectedList));
    const reserveListPath = `/reserve-list?${params.toString()}`;
    router.push(`/login?redirect=${encodeURIComponent(reserveListPath)}`);
  }
  function goDash() {
    router.push(`/dashboard`);
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
    queryFn: () => QuotationApiService.getSchedules(wishExportDate),
    staleTime: 0, // 데이터가 즉시 만료되도록 설정
    refetchOnMount: true, // 컴포넌트가 마운트될 때마다 새로 요청
    refetchOnWindowFocus: true, // 브라우저 창이 포커스될 때마다 리페치
  });

  /*---- jsx ----*/
  return (
    <Layout>
      <Container>
        <Text
          title="예약 가능 리스트"
          desc="원하는 업체를 선택하여 견적을 요청해보세요."
        />

        {scheduleData?.result.schedules.length === 0 ? (
          <FormSection gapValue={100}>
            <FlexContainer>
              <SearchBox>{searchBoxText}</SearchBox>
              <GrayBox>
                <div>예상 비용</div>
                <span>1,073,280원</span>
              </GrayBox>
            </FlexContainer>
            <FormSection gapValue={30} style={{ height: '200px' }}>
              <Title>출항 가능한 선박 스케줄이 없습니다.</Title>
              <Desc>
                세부 화물정보를 입력한 후 포워더의 새로운 스케줄 제안과 견적을
                받아보세요.
                <br />
                24시간 이내로 견적서가 도착합니다.
              </Desc>
            </FormSection>
          </FormSection>
        ) : (
          <>
            <FormSection gapValue={10}>
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
                  화물의 품질 및 수량 확인, 수출 처리, 컨테이너 배송 및 회수,
                  추가 검사 등 FCL보다 더 많은 과정을 거쳐요. 스케줄을 선택할 때
                  이 점을 고려해주세요.
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
          </>
        )}

        <ButtonSection>
          <Button
            text={
              scheduleData?.result.schedules.length === 0
                ? '직접 견적 요청하기'
                : '포워딩 업체 선택 완료'
            }
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
      <Modal
        isShowing={isQuotationShowing}
        content={
          <Confirm
            title="견적서를 요청했습니다!"
            desc={`해당 스케줄에 해당하는 포워더에게 견적서 송부 요청을 보냈어요.\n24시간 이내로 견적서가 도착해요.`}
            onLeft={{
              onClick: quotationtoggle,
              text: '닫기',
            }}
            onRight={{
              onClick: goDash,
              text: '나의 대시보드 바로가기',
            }}
          >
            <ImgC>
              <img src="/assets/estimated.png" />
            </ImgC>
          </Confirm>
        }
      />

      <Popup
        isShow={isShow}
        isTodayShow={isTodayShow}
        content={'처음어어도 괜찮아,\n링카고 튜로리얼'}
        onClick={() => handleTutorial()}
        onClose={onClose}
        onTodayHideToggle={onTodayHideToggle}
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

const Title = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: ${COLORS.bk};
  white-space: pre-wrap;
  width: 100%;
  text-align: center;
`;

const Desc = styled.div`
  font-size: 20px;
  line-height: 30px;
  font-weight: 400;
  color: ${COLORS.g4};
  white-space: pre-wrap;
  width: 100%;
  text-align: center;
`;

const ImgC = styled.div`
  width: 800px;
`;
