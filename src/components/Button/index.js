import React from 'react';
import styled from 'styled-components/native';
import Sizes from '@/styles/Sizes';
import Colors from '@/styles/Colors';

const Button = ({

  children,
  style,
  onPress,
  color,
  red,
  grey,
  green,
  blue,
  googleBlue,
  facebookBlue,
  fill,
  disabled
}) => {
  return (
    <Container
      style={style}
      color={color}
      red={red}
      green={green}
      blue={blue}
      grey={grey}
      googleBlue={googleBlue}
      facebookBlue={facebookBlue}
      fill={fill}
      disabled={disabled}
      onPress={onPress}>
      {children}
    </Container>
  );
};

function getButtonColor(props) {
  if (props.disabled) {
    return Colors.grey;
  }
  if (props.color && props.color.length) {
    return props.color;
  }
  if (props.red) {
    return Colors.red;
  }
  if (props.green) {
    return Colors.green;
  }
  if (props.blue) {
    return Colors.blue;
  }
  if (props.googleBlue) {
    return Colors.googleBlue;
  }
  if (props.facebookBlue) {
    return Colors.facebookBlue;
  }
  if (props.grey){
    return Colors.grey;
  }
  return 'transparent';
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  border-width: ${(props) => (props.fill ? '0px' : '2px')};
  border-color: ${(props) => getButtonColor(props)};
  background-color: ${(props) =>
    props.fill ? getButtonColor(props) : 'transparent'};
  height: ${Sizes.scale(42)}px;
  align-items: center;
  padding-horizontal: ${Sizes.scale(15)}px;
  justify-content: center;
`;

export default Button;
