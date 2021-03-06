import React from 'react';
import Sizes from '@/styles/Sizes';
import styled from 'styled-components/native';
import Images from '@/styles/Images';
import {RobotoMedium, WhiteButtonText} from "../Text";

const Avatar = ({style, onPress, size, source, from}) => {
    const _size = size || Sizes.avatar;
    //source.uri += Math.random().toString(36).substring(7);
    //console.log('SIZE: ', _size, source);
    return (
        <Container style={style} onPress={onPress} size={_size}>
            <AvatarImage
                source={source}
                size={_size}
                defaultSource={Images.placeholder.avatarDefault}
                resizeMode={'cover'}
            />
        </Container>
    );
};

const Container = styled.TouchableOpacity`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size}px;
  overflow: hidden;
  background-color: grey;
`;

const AvatarImage = styled.Image`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  overflow: hidden;
`;
// export const WhiteButtonText = styled(RobotoMedium).attrs((props) => ({
//     allowFontScaling: false,
// }))`
//   color: white;
//   font-size: 17px;
// `;
export default Avatar;
