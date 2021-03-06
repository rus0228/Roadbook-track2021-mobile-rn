import React from 'react';
import Sizes from '@/styles/Sizes';
import styled from 'styled-components/native';
import BottomCard from './BottomCard';
import Card from './Card';

const LogoCard = ({
  hideLogoComponent,
  LogoComponent,
  logoProps,
  logoHeight = Sizes.logoSize,
  style,
  children,
  bottom = true,
}) => {
  const _Container = bottom ? BottomContainer : Container;
  return (
    <_Container style={style} logoHeight={logoHeight}>
        {!hideLogoComponent && <LogoComponent
        style={{
          marginTop: -logoHeight / 2,
          alignSelf: 'center',
          visibility: 'hidden',
        }}
        {...logoProps}
      />}
      {children}
    </_Container>
  );
};

const Container = styled(Card)`
  padding-top: 0px;
  margin-top: ${(props) => props.logoHeight / 2}px;
  margin-bottom: 0px;
`;

const BottomContainer = styled(BottomCard)`
  padding-top: 0px;
  margin-top: ${(props) => props.logoHeight / 2}px;
`;

export default LogoCard;
