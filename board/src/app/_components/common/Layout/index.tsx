'use client';

import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Footer from '../Footer';
import { Nav } from '../Nav';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Nav />
      {children}
      <Footer />
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
