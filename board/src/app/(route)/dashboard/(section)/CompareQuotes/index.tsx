'use client';

import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { COLORS } from '@/app/_constant/color';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Box } from '@/app/_components/dashboard/Box';
import { BgType } from '@/app/_components/dashboard/Box';
import Button from '@/app/_components/common/Button';
import { CustomSelectInput, SelectInput } from '@/app/_components/common/Input';
import Layout from '@/app/_components/dashboard/Layout';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useRouter } from 'next/navigation';
import { Mousewheel, Pagination, Autoplay } from 'swiper/modules';
import { CostListItem } from '@/app/_apis/dashboard/getCompare';
import {
  견적_명세,
  getCostListByType,
  barColors,
  formatQuoteListEl,
} from '@/app/(route)/dashboard/_util';
import { getPortIdByName } from '@/app/(route)/request/utill';
import useModal from '@/app/_hooks/useModal';
import Modal from '@/app/_components/common/Modal';
import ModalContent from '@/app/_components/common/ModalContent';
import { Table } from './Table';

import { getTokenFromLocalStorage } from '@/app/_utils/auth';
import { GetIPortDto, getPortsAll } from '@/app/_apis/getPorts';
import {
  GetICompareDto,
  DashboardApiService,
  GetIUserRawQuotationDto,
} from '@/app/_apis/dashboard';

export default function CompareQuotes() {
  /*---- router ----*/
  const router = useRouter();
  /*---- auth ----*/
  const tokens = getTokenFromLocalStorage();
  /*---- hooks ----*/
  const queryClient = useQueryClient();
  const { isShowing, toggle } = useModal();
  /*---- state ----*/
  const [dropdownVisible, setDropdownVisible] = useState(false);
  //set init chart value
  const [selectedCostType1, setSelectedCostType1] = useState('THC 비용');
  const [selectedCostType2, setSelectedCostType2] = useState('CIC 비용');
  const [selectedCostType3, setSelectedCostType3] = useState('CFS 비용');
  //선택된 RawQuotationId
  const [selectedRawQuotationId, setSelectedRawQuotationId] =
    useState<string>('');
  //선택된 RawQuotationId에 대해 포매팅된 텍스트, 입국항, 출국항
  const [selectedIdFormatting, setSelectedIdFormatting] = useState<{
    text: string;
    importId: number;
    exportId: number;
  } | null>(null); // 객체 또는 null 값을 허용
  const [selectedQuoteData, setSelectedQuoteData] = useState<any>(null);

  /*---- api call function ----*/
  const {
    data: compareData,
    error: compareError,
    isLoading: compareLoading,
  } = useQuery<GetICompareDto, Error>({
    queryKey: ['compare'],
    queryFn: () =>
      DashboardApiService.getCompare(
        selectedRawQuotationId,
        tokens?.accessToken,
      ),
    enabled: !!selectedRawQuotationId,
  });

  const {
    data: userRawQuotationData,
    error: userRawQuotationError,
    isLoading: userRawQuotationLoading,
  } = useQuery<GetIUserRawQuotationDto, Error>({
    queryKey: ['userRawQuotationData'],
    queryFn: () => DashboardApiService.getUserRawQuotation(tokens?.accessToken),
    enabled: !!tokens?.accessToken,
  });

  const RawQuotationList =
    userRawQuotationData?.result?.rawQuotationInfoList?.map((item) => {
      const formatted = formatQuoteListEl(item); // 포매팅된 결과를 가져옴
      return {
        value: formatted.text, // 텍스트를 문자열로 설정
        label: formatted.text, // 동일한 텍스트를 라벨로 설정
        id: item.rawQuotationId, // rawQuotationId를 ID로 사용
      };
    }) || [];

  const {
    data: portData,
    error: portError,
    isLoading: portLoading,
  } = useQuery<GetIPortDto, Error>({
    queryKey: ['Port'],
    queryFn: () => getPortsAll(tokens?.accessToken),
    enabled: !!tokens?.accessToken,
  });

  /*---- useEffect ----*/
  useEffect(() => {
    if (
      userRawQuotationData &&
      userRawQuotationData.result.rawQuotationInfoList.length > 0
    ) {
      const firstItem = userRawQuotationData.result.rawQuotationInfoList[0];
      const firstValue = formatQuoteListEl(firstItem);
      setSelectedRawQuotationId(firstItem.rawQuotationId);
      setSelectedIdFormatting({
        text: firstValue.text,
        importId:
          getPortIdByName(portData as GetIPortDto, firstValue.importPort) ?? 0, // undefined일 경우 0으로 설정
        exportId:
          getPortIdByName(portData as GetIPortDto, firstValue.exportPort) ?? 0, // undefined일 경우 0으로 설정
      });
    }
  }, [userRawQuotationData]);

  useEffect(() => {
    if (selectedRawQuotationId) {
      queryClient.invalidateQueries({ queryKey: ['compare'] });
    }
  }, [selectedRawQuotationId, queryClient]);

  /*---- jsx ----*/
  const renderCostList = (costList: CostListItem[]) => (
    <ul>
      {costList?.map((item, index) => (
        <li key={index}>
          <span>{Object.keys(item)[0]}</span>
          <span>
            <GraphBar
              width={(Object.values(item)[0] as number) + '%'}
              color={barColors[index % barColors.length]}
            />
          </span>
          <span>{Object.values(item)[0]}원</span>
        </li>
      ))}
    </ul>
  );
  return (
    <Layout>
      <FlexBox>
        {selectedIdFormatting && (
          <CustomSelectInput
            label=""
            name="운송사"
            value={selectedIdFormatting?.text || ''} // 선택된 포맷팅된 텍스트를 표시
            onChange={(value, id) => {
              const selectedItem =
                userRawQuotationData?.result.rawQuotationInfoList.find(
                  (item) => item.rawQuotationId === id,
                );

              if (selectedItem) {
                const formatted = formatQuoteListEl(selectedItem); // 선택된 아이템을 포맷팅

                setSelectedIdFormatting({
                  text: formatted.text,
                  importId:
                    getPortIdByName(
                      portData as GetIPortDto,
                      formatted.importPort,
                    ) ?? 0,
                  exportId:
                    getPortIdByName(
                      portData as GetIPortDto,
                      formatted.exportPort,
                    ) ?? 0,
                });

                setSelectedRawQuotationId(id || '');
              }
            }}
            options={RawQuotationList}
            placeholder="운송사를 선택하세요"
          />
        )}
        {!selectedIdFormatting && <div>값을 불러오는 중...</div>}
        <ReportButton onClick={() => setDropdownVisible(!dropdownVisible)}>
          <div>도착한 견적서</div>
          <b>{compareData?.result.quotationCount}개</b>
        </ReportButton>
        {dropdownVisible && (
          <DropdownMenu>
            {compareData?.result.dashboardQuotationResponseList.map(
              (item, index) => (
                <DropdownItem key={index}>{item.forwarderEmail}</DropdownItem>
              ),
            )}
          </DropdownMenu>
        )}
      </FlexBox>
      <StyledSwiper
        direction="horizontal"
        slidesPerView={1}
        spaceBetween={0}
        speed={1000}
        pagination={{ clickable: true }}
        modules={[Mousewheel, Pagination, Autoplay]}
        className="swiper-compare"
      >
        {compareData?.result.dashboardQuotationResponseList.map(
          (item, index) => (
            <>
              <SwiperSlide key={index}>
                <SlideContent>
                  <TableContainer
                    style={{ width: '70%', position: 'relative' }}
                  >
                    <ExpandIcon
                      className="material-icons"
                      onClick={() => {
                        setSelectedQuoteData(item); // 선택된 데이터를 저장
                        toggle(); // 모달을 토글
                      }}
                    >
                      fullscreen
                    </ExpandIcon>
                    <Table data={item.quotationInfoResponse} size="small" />
                  </TableContainer>

                  <Box bgType={BgType.NONE} width="30%">
                    <StyledTable>
                      <ul>
                        <li>
                          <span>기업명</span>
                          <span>{item.firmName}</span>
                        </li>
                        <li>
                          <span>총 비용</span>
                          <span>{item.totalCost}</span>
                        </li>
                        <li>
                          <span>담당자</span>
                          <span>{item.forwarderName}</span>
                        </li>
                        <li>
                          <span>이메일</span>
                          <span>{item.forwarderEmail}</span>
                        </li>
                        <li>
                          <span>전화번호</span>
                          <span>{item.forwarderTel}</span>
                        </li>
                        <li>전달 사항 | </li>
                      </ul>
                      <Button
                        text="1:1 문의하기"
                        flexValue={1}
                        type="dark"
                        onClick={() => {
                          router.push('/dashboard#chat_history');
                        }}
                      />
                    </StyledTable>
                  </Box>
                </SlideContent>
              </SwiperSlide>
            </>
          ),
        )}
      </StyledSwiper>
      <FlexBox>
        <CompareBox>
          <SelectInput
            name="견적 명세 1"
            value={selectedCostType1}
            onChange={(e) => setSelectedCostType1(e.target.value)}
            options={견적_명세}
          />
          {renderCostList(
            getCostListByType(compareData as GetICompareDto, selectedCostType1),
          )}
        </CompareBox>
        <CompareBox>
          <SelectInput
            name="견적 명세 2"
            value={selectedCostType2}
            onChange={(e) => setSelectedCostType2(e.target.value)}
            options={견적_명세}
          />
          {renderCostList(
            getCostListByType(compareData as GetICompareDto, selectedCostType2),
          )}
        </CompareBox>
        <CompareBox>
          <SelectInput
            name="견적 명세 3"
            value={selectedCostType3}
            onChange={(e) => setSelectedCostType3(e.target.value)}
            options={견적_명세}
          />
          {renderCostList(
            getCostListByType(compareData as GetICompareDto, selectedCostType3),
          )}
        </CompareBox>
      </FlexBox>
      <Modal
        isShowing={isShowing}
        content={
          selectedQuoteData && (
            <ModalContent
              onLeft={{
                onClick: () => {
                  toggle();
                },
                text: '닫기',
              }}
            >
              <Table
                data={selectedQuoteData.quotationInfoResponse}
                size="large"
              />
            </ModalContent>
          )
        }
      />
    </Layout>
  );
}

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  gap: 25px;
  position: relative;
`;

const ReportButton = styled.div`
  background: ${COLORS.w};
  width: 265px;
  display: flex;
  gap: 15px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;

  b {
    color: ${COLORS.main};
    font-weight: 800;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  background-color: ${COLORS.w};
  border-radius: 12px;
  margin-top: 10px;
  z-index: 10;
  overflow; hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.div`
  padding: 12px;
  font-size: 16px;
  color: ${COLORS.g2};
  cursor: pointer;
  text-align: right;
  &:hover {
    background-color: ${COLORS.g0};
    color: ${COLORS.g4};
  }
`;

const TableContainer = styled.div`
  width: 70%;
  height: 480px;
  overflow: hidden;
  border-radius: 12px;
`;

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  flex: 1;

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 5;
  }

  li {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    color: ${COLORS.g3};
    display: flex;
    gap: 16px;
    width: 100%;
  }

  ul > li:nth-child(1) > span:nth-child(2),
  ul > li:nth-child(2) > span:nth-child(2) {
    color: ${COLORS.main};
    font-weight: 800;
  }

  ul > li > span:nth-child(1) {
    width: 60px;
    text-align: right;
  }

  ul > li > span:nth-child(2) {
    text-align: left;
    flex: 1;
  }
`;

const SlideContent = styled.div`
  display: flex;
  height: 100%;
  padding: 16px;

  background: #fff;
  border-radius: 12px;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  gap: 20px;
`;

const CompareBox = styled.div`
  background-color: ${COLORS.g0};
  padding: 16px;
  width: 33%;
  border-radius: 13px;

  ul {
    padding: 0;
    list-style: none;
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: 14px;

    span:nth-child(1) {
      width: 33%;
      text-align: left;
      color: ${COLORS.g3};
    }
    span:nth-child(2) {
      width: 50%;
    }
    span:nth-child(3) {
      width: 17%;
      text-align: right;
      color: ${COLORS.g2};
    }
  }
`;

const GraphBar = styled.div<{ width: string; color: string }>`
  height: 12px;
  background-color: ${({ color }) => color};
  border-radius: 0px 8px 8px 0px;
  width: ${({ width }) => width};
`;
const ExpandIcon = styled.span`
  font-size: 50px;
  color: ${COLORS.w};
  cursor: pointer;
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 2;
`;
