import React from 'react';
import styled from 'styled-components/native';
import {RobotoMedium} from '@/components/Text';
import Colors from '@/styles/Colors';

const TextButton = ({title,blue, black, red, onPress, style, textStyle}) => {
  return (
    <Container onPress={onPress} style={style}>
      <Text black={black} red={red} style={textStyle}>
        {title}
      </Text>
    </Container>
  );
};

function getButtonColor(props) {
  if (props.black) {
    return `color: ${Colors.textButtonBlack};\n`;
  } else if (props.red) {
    return `color: ${Colors.red};\n`;
  } else if (props.blue){
    return `color: ${Colors.blue};\n`;
  } else {
    return 'color: black;\n';
  }
}

const Container = styled.TouchableOpacity`
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const Text = styled(RobotoMedium)`
  color: ${(props) => props.color};
  ${getButtonColor}
  font-size: 17px;
  text-align: center;
`;

export default TextButton;
