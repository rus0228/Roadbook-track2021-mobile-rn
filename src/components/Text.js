import React from 'react';
import styled from 'styled-components';
import Sizes from '@/styles/Sizes';
import Colors from '@/styles/Colors';

export const Roboto = styled.Text.attrs((props) => ({
  allowFontScaling: false,
}))`
  font-family: Roboto-Regular;
  font-size: ${Sizes.scale(16)}px;
`;

export const RobotoMedium = styled.Text.attrs((props) => ({
  allowFontScaling: false,
}))`
  font-family: Roboto-Medium;
  font-size: ${Sizes.scale(16)}px;
`;

export const RobotoHeavy = styled.Text.attrs((props) => ({
  allowFontScaling: false,
}))`
  font-family: Roboto-Black;
  font-size: ${Sizes.scale(16)}px;
`;

export const RobotoBold = styled.Text.attrs((props) => ({
  allowFontScaling: false,
}))`
  font-family: Roboto-Bold;
  font-size: ${Sizes.scale(16)}px;
`;

export const CardTitle = styled(RobotoMedium).attrs((props) => ({
  allowFontScaling: false,
}))`
  text-align: center;
  color: ${Colors.darkBlack};
  font-size: ${Sizes.hScale(16)}px;
  margin-horizontal: -${Sizes.paddingCard - 15}px;
`;
export const CardTitleBold = styled(RobotoBold).attrs((props) => ({
  allowFontScaling: false,
}))`
  text-align: center;
  color: ${Colors.darkBlack};
  font-size: ${Sizes.hScale(16)}px;
  margin-horizontal: -${Sizes.paddingCard - 15}px;
`;
export const CardTitleMedium = styled(RobotoBold).attrs((props) => ({
  allowFontScaling: false,
}))`
  text-align: center;
  color: ${Colors.boldBlack};
  font-size: ${Sizes.scale(18)}px;
  margin-horizontal: -${Sizes.paddingCard - 15}px;
`;
export const CardTitleBig = styled(RobotoBold).attrs((props) => ({
  allowFontScaling: false,
}))`
  text-align: center;
  color: ${Colors.boldBlack};
  font-size: ${Sizes.scale(22)}px;
  margin-horizontal: -${Sizes.paddingCard - 15}px;
`;

export const WhiteButtonText = styled(RobotoMedium).attrs((props) => ({
  allowFontScaling: false,
}))`
  color: white;
  font-size: 17px;
`;
