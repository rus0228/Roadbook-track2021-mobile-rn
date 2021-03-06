import React from 'react';
import Modal from "react-native-modal";
import styled from 'styled-components/native';
import Space from '@/components/Space';
import Sizes from '@/styles/Sizes';
import {Roboto, WhiteButtonText} from '@/components/Text';
import FormInput from "@/components/Input/FormInput";
import Button from "@/components/Button";

const SettingModal = ({onSave, isVisible, onCancel}) => {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [deviceId, setDeviceId] = React.useState('');

    return (
        <Modal isVisible={isVisible}>
            <ContentView>
                <SettingInput
                    title={'Phone Number'}
                    inputProps={{
                        autoCapitalize: 'none',
                        autoCorrect: false,
                        value: phoneNumber,
                        onChangeText: setPhoneNumber,
                    }}
                />
                <Space height={Sizes.scale(15)}/>
                <SettingInput
                    title={'Device ID'}
                    inputProps={{
                        autoCapitalize: 'none',
                        autoCorrect: false,
                        value: deviceId,
                        onChangeText: setDeviceId,
                    }}
                />
                <Space height={Sizes.scale(15)}/>

                <ActionView>
                    <Button green onPress={() => onSave(phoneNumber, deviceId)} fill>
                        <WhiteButtonText>Save</WhiteButtonText>
                    </Button>
                    <Button red onPress={() => onCancel()} fill>
                        <WhiteButtonText>Cancel</WhiteButtonText>
                    </Button>
                </ActionView>
            </ContentView>
        </Modal>
    )
};

const ContentView = styled.View`
    border-radius: 6px;
    backgroundColor: white;
    justifyContent: center;
    alignItems: center;
    padding: 16px;
`;

const SettingInput = styled(FormInput)`
  align-self: stretch;
`;

const ActionView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-self: stretch;
`;


export default SettingModal;