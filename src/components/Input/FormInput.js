import React from 'react';
import styled from 'styled-components/native';
import Input from './StyledInput';
import Sizes from '@/styles/Sizes';
import Space from '../Space';
import {RobotoMedium} from '../Text';
import Colors from '@/styles/Colors';

const FormInput = ({title, inputProps, style, error}) => {
  return (
    <Container style={style}>
      <Title>{error ? <ErrorTitle>{error}</ErrorTitle> : title}</Title>
      <Space height={Sizes.scale(5)} />
      <Input {...inputProps} />
    </Container>
  );
};

const Title = styled(RobotoMedium)`
  color: ${Colors.textHint};
  font-size: ${Sizes.hScale(12)}px;
`;

const ErrorTitle = styled.Text`
  color: ${Colors.red};
`;

const Container = styled.View`
  padding-horizontal: ${Sizes.scale(16)}px;
  padding-bottom: ${Sizes.scale(12)}px;
  padding-top: ${Sizes.scale(11)}px;
  border-color: #dae3ed;
  border-width: 1px;
  border-radius: ${Sizes.scale(10)}px;
`;

export default FormInput;
