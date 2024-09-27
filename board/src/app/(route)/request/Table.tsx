import React from 'react';
import styled from 'styled-components';
import { ResultData } from '@/app/_apis/quotation/getEstimated';
import { COLORS } from '@/app/_constant/color';

interface EstimatedDetailsProps {
  data: ResultData;
}

export const Table = ({ data }: EstimatedDetailsProps) => {
  const { estimatedQuotations, count } = data;

  const formatDate = (dateArray: number[]): string => {
    const [year, month, day] = dateArray;
    return `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`;
  };

  return (
    <Container>
      <Header>
        <Title>예상 도착 견적서 개수</Title>
        <Count>{count}개</Count>
      </Header>
      <TableContainer>
        <TableBody>
          {estimatedQuotations.map((quotation, index) => (
            <Row key={index}>
              <Cell>{index + 1}</Cell>
              <Cell>{quotation.carrier}</Cell>
              <Cell>
                ETA : {formatDate(quotation.ETA)} - ETD :{' '}
                {formatDate(quotation.ETD)}
              </Cell>
              <Point>{quotation.forwardingName}</Point>
            </Row>
          ))}
        </TableBody>
      </TableContainer>
      <Footer>
        예상된 견적서 도착 개수와 실제 도착 개수는 다를 수 있습니다.
      </Footer>
    </Container>
  );
};

export default Table;

const Container = styled.div`
  padding: 40px;
  background-color: white;
  border-radius: 20px;
  border: 1px solid ${COLORS.g1};
  width: 800px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 40px 30px;
  border-bottom: 1px solid ${COLORS.g1};
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 400;
`;

const Count = styled.span`
  font-size: 28px;
  color: ${COLORS.main};
  font-weight: bold;
`;

const TableContainer = styled.div`
  width: 100%;
`;

const TableBody = styled.div`
  padding: 0 30px 40px 30px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Row = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 4fr 7fr 4fr;
`;

const Cell = styled.div`
  text-align: center;
  color: ${COLORS.g2};
  line-height: 32px;
  font-size: 18px;

  &:nth-child(1) {
    text-align: left;
  }
`;

const Point = styled.div`
  text-align: right;
  color: ${COLORS.main};
  line-height: 32px;
  font-size: 20px;
`;

const Footer = styled.div`
  margin-top: 30px;
  font-size: 14px;
  color: ${COLORS.g1};
  text-align: right;
`;
