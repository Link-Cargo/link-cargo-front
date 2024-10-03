import React from 'react';
import { styled } from 'styled-components';
import { COLORS } from '@/app/_constant/color';

const Report = () => {
  return (
    <Wrap>
      <Container>
        <div>
          <Title>추천하는 포워딩 업체</Title>
          <SubTitle>(1) 낮은 가격 기준</SubTitle>
          우진로지스
          <List>
            <ListItem>총 비용: 20,172원 </ListItem>
            <ListItem>
              설명: 우진로지스는 THC, DO FEE, CFS 등의 개별 항목에서는
              혜성글로벌보다 다소 높지만, 전체 비용에서는 경쟁력이 있는
              편입니다.
            </ListItem>
          </List>
          <SubTitle>(2) 그 밖의 다른 요인</SubTitle>
          한성인터내셔널
          <List>
            <ListItem>총 비용: 16,010원</ListItem>
            <ListItem>
              신뢰성: 비교적 표준화된 가격 정책으로 혼란이 적고, 낮은 CIC로 인해
              부대비용 관리가 용이합니다.
            </ListItem>
            <ListItem>
              고객 서비스: 작은 차이지만, 모든 항목에서 균형 잡힌 가격 책정을
              보여 고객 서비스가 안정적일 가능성이 큽니다.
            </ListItem>
          </List>
        </div>
        <div>
          <Title>예측되는 더 저렴한 운임 시기</Title>
          <SubTitle>(1) 날짜</SubTitle>
          <List>
            <ListItem>2024년 11월 중순 (11월 10일 - 20일 사이)</ListItem>
          </List>
          <SubTitle>(2) 운임</SubTitle>
          <List>
            <ListItem>예상 운임: 약 $850 - $880 수준</ListItem>
          </List>
          <SubTitle>(3) 이유</SubTitle>
          <List>
            <ListItem>
              계절적 요인: 10월 말부터 11월 초는 중국의 국경절 이후의
              비수기이며, 중국의 대규모 물류가 한풀 꺾이는 시점입니다. 특히,
              블랙 프라이데이와 같은 연말 세일 시즌 이전의 공백기에 해당하여
              수출 물량 감소에 따른 운임 하락이 예상됩니다.
            </ListItem>
            <ListItem>
              LCL 공간 확보 가능성 증가: 연말 연휴 전 화물 집중도 감소로 인해
              LCL 운임이 하락할 가능성이 큽니다.
            </ListItem>
          </List>
        </div>
        <div>
          <Title>참고하면 좋은 뉴스</Title>
          <List>
            <ListItem>
              중국 경제 동향 뉴스: 최근 중국의 경제 성장 둔화와 수출입 감소세가
              지속되고 있으며, 이는 전반적인 해운 시장의 운임 하락으로 이어질
              가능성이 큽니다.
            </ListItem>
            <ListItem>
              부산항 혼잡도 관련 뉴스: 부산항의 처리 물량 변동과 혼잡도 관련
              정보를 확인해, 출항 일정의 지연 가능성을 사전에 파악할 수
              있습니다.
            </ListItem>
            <ListItem>
              해운 운임 지수: 상하이 컨테이너 운임 지수(SCFI)와 부산-상하이
              항로의 운임 변동을 주기적으로 체크하여 최신 운임 정보를
              파악하세요.
            </ListItem>
          </List>
        </div>

        <div>
          <Title>AI의 제안</Title>
          <List>
            <ListItem>
              <b>화물 선적 관리</b>: 어린이 장난감의 경우, 플라스틱 제품이 많아
              온도 변화에 민감할 수 있습니다. CFS와 HANDLING FEE가 낮은 포워더를
              선택해 운송 중 상품의 안전을 보장하는 것도 고려하세요.
            </ListItem>
            <ListItem>
              <b>운임 변동 대응</b>: 운임이 높은 시기에는 LCL 운송보다 FCL
              운송의 경제성이 더 나을 수 있습니다. 이번 출항 이후 수출량 증가
              시, FCL 운송을 검토해 보세요.
            </ListItem>
            <ListItem>
              <b>효율적 인코텀즈 활용</b>: DDP 조건으로 수출하는 경우, 현지 통관
              및 최종 배달까지 화주가 책임지게 되므로, 현지 파트너사와의 협력
              강화 및 리스크 관리 전략을 수립하는 것이 중요합니다.
            </ListItem>
          </List>
        </div>
      </Container>
    </Wrap>
  );
};

export default Report;

const Wrap = styled.div`
  width: 100%;
`;
const Container = styled.div`
  background-color: rgba(12, 11, 11, 0.05);
  width: 900px;
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 15px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

// Title 스타일 정의 (h2)
const Title = styled.h2`
  font-size: 20px;
  line-height: 40px;
  font-weight: 700;
  color: rgba(58, 72, 147, 1);
  margin: 0;
`;

// SubTitle 스타일 정의 (h3)
const SubTitle = styled.h3`
  font-size: 16px;
  line-height: 40px;
  font-weight: 700;
  color: rgba(58, 72, 147, 1);
  margin: 0;
`;

// List 스타일 정의 (ul)
const List = styled.ul`
  list-style-type: disc; /* 기본 점 스타일 유지 */
  padding-left: 20px; /* 리스트 점과 텍스트 간격 */
  margin: 0;
`;

// ListItem 스타일 정의 (li)
const ListItem = styled.li`
  color: rgba(89, 89, 89, 1);
  font-size: 16px;
  line-height: 25px;
  font-weight: 500;
  margin: 5px 10px; /* 리스트 항목 간 간격 */
`;
