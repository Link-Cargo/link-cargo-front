import React from 'react';
import { styled } from 'styled-components';

const Footer = () => {
  return (
    <FooterStyle>
      © {new Date().getFullYear()} Link-cargo , All Right Received.
    </FooterStyle>
  );
};

const FooterStyle = styled.div`
  text-align: center;
  font-weight: 100;
  padding: 30px;
  border-top: 1px solid #eee;
  margin-top: 100px;
`;

export default Footer;
