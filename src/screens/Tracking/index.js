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
                <StatusArea>
                    <Text style={{fontSize: 17}}>
                        {vm.connectionType} - {vm.isOnline ? 'Online' : 'Offline'}
                    </Text>
                </StatusArea>
                <Space height={Sizes.scale(20)}/>
                <Button
                    style={{alignSelf: 'center'}}
                    green
                    onPress={vm.openSetting}
                    fill>
                    <WhiteButtonText>Settings</WhiteButtonText>
                </Button>
                <Space height={Sizes.scale(20)}/>
                {!vm.isTracking ? (
                    <>
                        <AccuracyArea style={{backgroundColor: 'rgb(255, 255, 255)'}}/>
                    </>
                ) : (
                    <AccuracyArea style={{
                        backgroundColor: `rgb(${55 + 200 * vm.decimalAccuracy}, ${255 - 200 * vm.decimalAccuracy}, 55)`
                    }}>
                        {
                            vm.decimalAccuracy !== 1 && (
                                <Pointer style={{position: 'absolute', left: `${vm.decimalAccuracy * 100}%`}}/>
                            )
                        }
                    </AccuracyArea>
                )}
                <Space height={Sizes.scale(20)}/>
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
                <Space height={Sizes.scale(20)}/>
                <TimeArea>
                    {
                        vm.decimalAccuracy !== 1 && vm.isTracking && (
                            <Text style={{fontSize: 17, textAlign: 'center'}}>
                                {vm.formattedTime}
                            </Text>
                        )
                    }
                </TimeArea>
            </TopArea>
            <CenterArea>
                <Description>
                    {!vm.isTracking ? (
                        <></>
                    ) : (
                        <Text style={vm.isOnline ? {color: 'green'} : {color: 'red'}}>
                            Latitude: {vm.latitude}{'\n'}
                            Longitude: {vm.longitude}{'\n'}
                            Altitude: {vm.altitude}{'\n'}
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
const AccuracyArea = styled.View`
  height: 20px;
  width: 100%;
`;
const Pointer = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #34C759;
`;
const TimeArea = styled.View`
  
`;

export default observer(Tracking);
