// Background View with MainBackGroundImage and logo, commercial time is pay time text
import React from 'react';
import styled from 'styled-components/native';
import Sizes from '@/styles/Sizes';
import Colors from '@/styles/Colors';
import Icon from '@/components/Icon'
const IconContainer = ({name}) => {
    return (
        <Container>
            <Icon name={name} color={Colors.lightBlack}/>
        </Container>
    );
};

const Container = styled.View`
  padding-vertical: ${Sizes.scale(9)}px;
  height: ${Sizes.scale(40)}px;
  width: ${Sizes.scale(40)}px;
  background-color: ${Colors.white};
  border-radius: ${Sizes.scale(20)}px;
  align-items: center;
`;

export default IconContainer;
