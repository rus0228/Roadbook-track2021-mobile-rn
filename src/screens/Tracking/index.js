import React from 'react';
import styled from 'styled-components/native';
import Container from '@/components/Container';
import {Roboto, WhiteButtonText} from '@/components/Text';
import {observer} from 'mobx-react';
import Sizes from '@/styles/Sizes';
import useViewModel from './methods';
import Button from '@/components/Button';
import {Text, View} from 'react-native';
import Space from '@/components/Space';
import SettingModal from './components/SettingModal';

const Tracking = (props) => {
    const vm = useViewModel();
    return (
        <Screen>
            <TopArea>
                <Button
                    style={{alignSelf: 'center'}}
                    green
                    onPress={vm.openSetting}
                    fill>
                    <WhiteButtonText>Settings</WhiteButtonText>
                </Button>
                <Space height={Sizes.scale(10)}/>
                <StatusArea>
                    Network: {vm.isOnline ? 'Online' : 'Offline'} / {vm.connectionType}
                    {'\n'}
                    GPS-signal: {vm.gpsSignal}
                </StatusArea>
                <Space height={Sizes.scale(10)}/>
                <Button
                    red={vm.isTracking}
                    green={!vm.isTracking}
                    onPress={vm.onPressToggleTracking}
                    style={{alignSelf: 'stretch'}}
                    disabled={!vm.isTrackButtonEnabled}
                    fill>
                    <WhiteButtonText>
                        {vm.isTracking ? 'Stop' : 'Start'}
                    </WhiteButtonText>
                </Button>
            </TopArea>
            <CenterArea>
                <Description>
                    {!vm.isTracking ? (
                        <>

                        </>
                    ) : (
                        <Text style={vm.isOnline ? {color: 'green'} : {color: 'red'}}>
                            Latitude: {vm.latitude}{'\n'}
                            Longitude: {vm.longitude}{'\n'}
                            Accuracy: {vm.accuracy}{'\n'}
                            Speed: {vm.speed}{'\n'}
                            Timestamp: {vm.timestamp}
                        </Text>
                    )}
                </Description>
            </CenterArea>

            <SettingModal isVisible={vm.isVisible} onSave={vm.saveSetting} onCancel={vm.closeSetting}/>
        </Screen>
    );
};

const Screen = styled(Container)`
  padding: ${Sizes.scale(16)}px;
  
`;

const Description = styled(Roboto)`
  font-size: ${Sizes.scale(20)}px;
  text-align: left;
  border-radius: 20px;
  padding: 20px;
`;

const TopArea = styled.View`
  margin-top: ${Sizes.scale(50)}px;
`;

const StatusArea = styled(Text)`
  color: black;
  font-size: ${Sizes.scale(17)}px;
  text-align: right;
`;

const CenterArea = styled.View`
  flex: 1;
  justify-content: center;
`;

export default observer(Tracking);
