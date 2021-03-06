import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import {RobotoMedium} from '@/components/Text';
import Space from '@/components/Space';
import Sizes from '@/styles/Sizes';
import Images from '@/styles/Images';
import {useCanGoBack} from '@/hooks/Navigation';
import {useNavigation} from '@react-navigation/native';

const NavButton = ({icon, title, onPress, back, right, style}) => {
  return (
    <Container onPress={onPress} right={right} style={style}>
      <Image
        source={back ? Images.icons.back : icon}
        style={{
          width: 24,
          height: 24,
        }}
      />
      <Space width={Sizes.scale(9)} />
      <Title>{back ? 'Back' : title}</Title>
    </Container>
  );
};

function getLeft(props) {
  if (props.right) {
    return;
  }
  return `left: ${Sizes.scale(30)}px;\n`;
}

function getRight(props) {
  if (!props.right) {
    return;
  }
  return `right: ${Sizes.scale(25)}px;\n`;
}

const Container = styled.TouchableOpacity`
  z-index: 2;
  flex-direction: row;
  align-items: center;
  height: 40px;
  position: absolute;
  top: ${Sizes.navButtonTop}px;
  ${(props) => getLeft(props)}
  ${(props) => getRight(props)}
`;

const Title = styled(RobotoMedium)`
  font-size: 17px;
  color: white;
`;

export default NavButton;

// Back Button
export const BackButton = ({onPress}) => {
  const canGoBack = useCanGoBack();
  const nav = useNavigation();
  if (!onPress && !canGoBack) {
    return null;
  }
  return <NavButton back onPress={onPress ?? (() => nav.goBack())} />;
};
