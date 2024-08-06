import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/app/_constant/color';

export enum BgType {
  BRIGHT = 'bright',
  DARK = 'dark',
}

export interface ProfileProps {
  imgSrc: string;
  title: string;
  desc: string;
}

const ProfileCard = ({ title, desc, imgSrc }: ProfileProps) => {
  return (
    <Container>
      <img src={imgSrc} />
      <div>{title}</div>
      <p>{desc}</p>
    </Container>
  );
};

export default ProfileCard;

const Container = styled.div`
  background-color: ${COLORS.g0};
  padding: 32px 0px;
  border-radius: 24px;
  width: 177px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 77px;
    height: 77px;
    border-radius: 100px;
    object-fit: cover;
    margin-bottom: 32px;
  }

  div {
    font-size: 20px;
    font-weight: 700;
    color: ${COLORS.bk};
  }

  p {
    font-size: 16px;
    font-weight: 400;
    color: ${COLORS.g3};
  }
`;
