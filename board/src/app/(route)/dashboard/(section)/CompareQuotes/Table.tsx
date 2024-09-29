import React from 'react';
import styled, { css } from 'styled-components';
import { QuotationInfoResponse } from '@/app/_apis/dashboard/getCompare';

interface QuotationDetailsProps {
  data: QuotationInfoResponse;
  size?: 'large' | 'small' | 'tiny';
}

export const Table = ({ data, size = 'large' }: QuotationDetailsProps) => {
  if (!data) return null;

  return (
    <Container size={size}>
      <div>
        <SectionTitle size={size}>A. Ocean Freight</SectionTitle>
        <StyledTable size={size}>
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
              <Td size={size}>{data.carrier}</Td>
              <Td size={size}>
                {data.exportPort} {'-'} {data.importPort}
              </Td>
              <Td size={size}>USD {data.freightLCL}</Td>
              <Td size={size}>{data.freightCBM}</Td>
              <Td size={size}>USD {data.freightCost}</Td>
              <Td size={size}>{data.transitTime} days</Td>
              <Td size={size}>{data.scheduleRemark}</Td>
            </TableRow>
          </tbody>
        </StyledTable>
      </div>
      <div>
        <SectionTitle size={size}>B. Ocean Local Charges</SectionTitle>
        <StyledTable size={size}>
          <thead>
            <tr>
              <LTh>Item</LTh>
              <LTh>Unit</LTh>
              <LTh>LCL</LTh>
              <LTh>Remark</LTh>
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'THC', value: data.THC },
              { label: 'CIC', value: data.CIC },
              { label: 'DO Fee', value: data.DO_FEE },
              { label: 'Handling Fee', value: data.HANDLING_FEE },
              { label: 'CFS Charge', value: data.CFS_CHARGE },
              { label: 'Lift Status', value: data.LIFT_STATUS },
              {
                label: 'Customs Clearance Fee',
                value: data.CUSTOMS_CLEARANCE_FEE,
              },
              { label: 'Warfage Fee', value: data.WARFAGE_FEE },
              { label: 'Trucking', value: data.TRUCKING },
            ].map((item, index) => (
              <TableRow key={index}>
                <Point size={size}>{item.label}</Point>
                <Point size={size}>{item.value.unit}</Point>
                <Sub size={size}>${item.value.lcl}</Sub>
                <Sub size={size}>{item.value.remark}</Sub>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </div>
    </Container>
  );
};

export default Table;

const Container = styled.div<{ size: 'large' | 'small' | 'tiny' }>`
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

  ${({ size }) =>
    size === 'tiny' &&
    css`
      width: 250px;
      height: 200px;
      overflow: hidden;

      font-size: 12px;
      line-height: 20px;
      padding: 0;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);
        z-index: 10;
        border-radius: 12px;
        overflow: hidden;
      }
    `}
`;

const SectionTitle = styled.h3<{ size?: 'tiny' | 'large' | 'small' }>`
  font-size: ${(props) => (props.size === 'tiny' ? '12px' : '24px')};

  color: #000;
  font-weight: 500;
`;

const StyledTable = styled.table<{ size?: 'tiny' | 'large' | 'small' }>`
  width: 100%;
  margin: ${(props) => props.size === 'tiny' && '0px !important'};
  font-size: ${(props) => (props.size === 'tiny' ? '8px' : '16px')};
  line-height: ${(props) => (props.size === 'tiny' ? '10px' : '20px')};
  border-collapse: collapse;
  position: relative;
  z-index: 2;

  thead {
    background-color: rgba(57, 72, 147, 1);
  }

  th,
  td {
    border: 0.5px solid #fff;
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

const Td = styled.td<{ size?: 'tiny' | 'large' | 'small' }>`
  border: 0.5px solid #fff;
  background-color: rgba(242, 244, 255, 1);
  text-align: center;
  padding: ${(props) => (props.size === 'tiny' ? '4px' : '8px')};
`;

const TableRow = styled.tr``;

const Point = styled.td<{ size?: 'tiny' | 'large' | 'small' }>`
  background-color: rgba(205, 214, 255, 1);
  padding-left: 10px;
  word-break: break-all;
  flex: 1;
  padding: ${(props) => (props.size === 'tiny' ? '4px' : '8px')};
`;

const Sub = styled.td<{ size?: 'tiny' | 'large' | 'small' }>`
  background-color: rgba(242, 244, 255, 1);
  padding-left: 10px;
  word-break: break-all;
  flex: 2;
  padding: ${(props) => (props.size === 'tiny' ? '4px' : '8px')};
`;
