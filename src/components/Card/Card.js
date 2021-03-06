import styled from 'styled-components/native/dist/styled-components.native.esm';
import Sizes from '@/styles/Sizes';
import React from 'react';

const Card = ({children, style}) => {
  return <Container style={style}>{children}</Container>;
};

const Container = styled.View`
  background-color: white;
  border-radius: ${Sizes.scale(20)}px;
  padding-horizontal: ${Sizes.paddingCard}px;
  padding-vertical: ${Sizes.scale(30)}px;
  margin-horizontal: ${Sizes.marginCard}px;
  margin-bottom: ${Sizes.scale(30)}px;
`;

export default Card;
