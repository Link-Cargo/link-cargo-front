import React from 'react';
import styled, { css } from 'styled-components';
import { QuotationInfoResponse } from '@/app/_apis/dashboard/getCompare';

interface QuotationDetailsProps {
  data: QuotationInfoResponse;
  size?: 'large' | 'small';
}

export const Table = ({ data, size = 'large' }: QuotationDetailsProps) => {
  const {
    carrier,
    exportPort,
    importPort,
    freightLCL,
    freightCBM,
    freightCost,
    transitTime,
    scheduleRemark,
    THC,
    CIC,
    DO_FEE,
    HANDLING_FEE,
    CFS_CHARGE,
    LIFT_STATUS,
    CUSTOMS_CLEARANCE_FEE,
    WARFAGE_FEE,
    TRUCKING,
  } = data;

  return (
    <Container size={size}>
      <div>
        <SectionTitle>A. Ocean Freight</SectionTitle>
        <StyledTable>
          <thead>
            <tr>
              <Th rowSpan={2}>Carrier</Th>
              <Th rowSpan={2}>Routing</Th>
              <OceanFreightHeader colSpan={3}>Ocean Freight</OceanFreightHeader>
              <Th rowSpan={2}>Schedule</Th>
              <Th rowSpan={2}>Remark</Th>
            </tr>
            <tr>
              <SubHeader>LCL</SubHeader>
              <SubHeader>CBM</SubHeader>
              <SubHeader>합계</SubHeader>
            </tr>
          </thead>
          <tbody>
            <TableRow>
              <Td>{carrier}</Td>
              <Td>
                {exportPort} {'-'} {importPort}
              </Td>
              <Td>USD {freightLCL}</Td>
              <Td>{freightCBM}</Td>
              <Td>USD {freightCost}</Td>
              <Td>{transitTime} days</Td>
              <Td>{scheduleRemark}</Td>
            </TableRow>
          </tbody>
        </StyledTable>
      </div>
      <div>
        <SectionTitle>B. Ocean Local Charges</SectionTitle>
        <StyledTable>
          <thead>
            <tr>
              <LTh>Item</LTh>
              <LTh>Unit</LTh>
              <LTh>LCL</LTh>
              <LTh>Remark</LTh>
            </tr>
          </thead>
          <tbody>
            <TableRow>
              <Point>THC</Point>
              <Point>{THC.unit}</Point>
              <Sub>${THC.lcl}</Sub>
              <Sub>{THC.remark}</Sub>
            </TableRow>
            <TableRow>
              <Point>CIC</Point>
              <Point>{CIC.unit}</Point>
              <Sub>${CIC.lcl}</Sub>
              <Sub>{CIC.remark}</Sub>
            </TableRow>
            <TableRow>
              <Point>DO Fee</Point>
              <Point>{DO_FEE.unit}</Point>
              <Sub>${DO_FEE.lcl}</Sub>
              <Sub>{DO_FEE.remark}</Sub>
            </TableRow>
            <TableRow>
              <Point>Handling Fee</Point>
              <Point>{HANDLING_FEE.unit}</Point>
              <Sub>${HANDLING_FEE.lcl}</Sub>
              <Sub>{HANDLING_FEE.remark}</Sub>
            </TableRow>
            <TableRow>
              <Point>CFS Charge</Point>
              <Point>{CFS_CHARGE.unit}</Point>
              <Sub>${CFS_CHARGE.lcl}</Sub>
              <Sub>{CFS_CHARGE.remark}</Sub>
            </TableRow>
            <TableRow>
              <Point>Lift Status</Point>
              <Point>{LIFT_STATUS.unit}</Point>
              <Sub>${LIFT_STATUS.lcl}</Sub>
              <Sub>{LIFT_STATUS.remark}</Sub>
            </TableRow>
            <TableRow>
              <Point>Customs Clearance Fee</Point>
              <Point>{CUSTOMS_CLEARANCE_FEE.unit}</Point>
              <Sub>${CUSTOMS_CLEARANCE_FEE.lcl}</Sub>
              <Sub>{CUSTOMS_CLEARANCE_FEE.remark}</Sub>
            </TableRow>
            <TableRow>
              <Point>Warfage Fee</Point>
              <Point>{WARFAGE_FEE.unit}</Point>
              <Sub>${WARFAGE_FEE.lcl}</Sub>
              <Sub>{WARFAGE_FEE.remark}</Sub>
            </TableRow>
            <TableRow>
              <Point>Trucking</Point>
              <Point>{TRUCKING.unit}</Point>
              <Sub>${TRUCKING.lcl}</Sub>
              <Sub>{TRUCKING.remark}</Sub>
            </TableRow>
          </tbody>
        </StyledTable>
      </div>
    </Container>
  );
};

export default Table;

// Styled components
const Container = styled.div<{ size: 'large' | 'small' }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 12px;
  position: relative;
  padding: 10px;

  ${({ size }) =>
    size === 'small' &&
    css`
      transform: scale(1);
      transform-origin: top left;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 10;
        border-radius: 12px;
        overflow: hidden;
      }
    `}
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  color: #000;
  font-weight: 500;
`;

const StyledTable = styled.table`
  width: 100%;
  font-size: 16px;
  line-height: 35px;
  border-collapse: collapse;
  position: relative;
  z-index: 2; /* Ensures it is above the :after pseudo-element for small version */

  thead {
    background-color: rgba(57, 72, 147, 1);
  }

  th,
  td {
    border: 0.5px solid #fff; /* Border of the table */
  }
`;

const OceanFreightHeader = styled.th`
  text-align: center;
  color: #fff;
`;

const SubHeader = styled.th`
  background-color: rgba(205, 214, 255, 1);
  color: black;
  text-align: center;
`;

const Th = styled.th`
  color: #fff;
  text-align: center;
`;

const LTh = styled.th`
  color: #fff;
  text-align: left;
  padding-left: 10px;
`;

const Td = styled.td`
  border: 0.5px solid #fff;
  background-color: rgba(242, 244, 255, 1);
  text-align: center;
`;

const TableRow = styled.tr``;

const Point = styled.td`
  background-color: rgba(205, 214, 255, 1);
  padding-left: 10px;
  word-break: break-all; /* Enable auto line break */
  flex: 1; /* For 1:2 ratio */
`;

const Sub = styled.td`
  background-color: rgba(242, 244, 255, 1);
  padding-left: 10px;
  word-break: break-all; /* Enable auto line break */
  flex: 2; /* For 1:2 ratio */
`;
