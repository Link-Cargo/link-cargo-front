import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
