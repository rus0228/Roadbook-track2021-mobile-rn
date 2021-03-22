import React from 'react';
import {useDelay, useStores} from '@/hooks';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import AppConfig from '@/config/AppConfig';
import {showAlert, confirmAlert} from '@/utils';
import {ConfirmAlertResult} from '@/constants';
import * as api from '@/services/Api';

const isLocationTracking = async () => {
    return TaskManager.isTaskRegisteredAsync(AppConfig.locationTaskName);
};

const isValid = async (competitor) => {
    return api.checkCompetitor(competitor)
}

function useViewModel(props) {
    const {user, hud, net, info} = useStores();
    const [isTracking, setTracking] = React.useState(false);
    const [isVisible, setVisible] = React.useState(false);
    const [isTrackButtonEnabled, setTrackButtonEnabled] = React.useState(false);

    // On Component Did Mount, Check for tracking.
    React.useEffect(() => {
        isLocationTracking().then((isRegistered) => {
            setTracking(isRegistered);
            if (user.deviceId.length > 0 || isTracking){
                setTrackButtonEnabled(true);
            } else {
                setTrackButtonEnabled(false);
            }
        });

        isValid({deviceId: user.deviceId, phoneNumber: user.phoneNumber}).then((res) => {
            if (res === 1){
                setTrackButtonEnabled(true);
            } else {
                setTrackButtonEnabled(false);
            }
        })
    },[]);

    // React.useLayoutEffect(() => {
    //     isValid({deviceId: user.deviceId, phoneNumber: user.phoneNumber}).then((res) => {
    //         if (res === 1){
    //             setTrackButtonEnabled(true);
    //         } else {
    //             setTrackButtonEnabled(false);
    //         }
    //     })
    // });

    // Delayed toggle tracking to disable fast click button.
    const onPressToggleTracking = useDelay(async () => {
        try {
            const {status} = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                // Just show confirm alert
                await showAlert(
                    'Can not update your real-time location because access to location was denied',
                );
                return;
            }
            hud.show();
            const _isTracking = await isLocationTracking();
            if (!_isTracking) {
                try {
                    await Location.startLocationUpdatesAsync(AppConfig.locationTaskName, {
                        accuracy: Location.Accuracy.BestForNavigation,
                        foregroundService: {
                            notificationTitle: 'TRACK-2021',
                            notificationBody: 'Your location is being used in background'
                        }
                    });
                } catch (ex) {
                    console.log('Exception - failed to start', ex);
                }
            } else {
                // Just stop location updates
                try {
                    await Location.stopLocationUpdatesAsync(AppConfig.locationTaskName);
                } catch (exception) {
                    console.log('Failed to stop - ', exception);
                }
            }
            // Set tracking flag again.
            const _isTracking1 = await isLocationTracking();
            console.log('Is now tracking ', _isTracking1, 'Status is ', status);
            setTracking(_isTracking1);

        } catch (exception) {
            console.log('Exception occurred ', exception);
        } finally {
            hud.hide();
        }
    }, 300);


    const openSetting = () => {
        setVisible(true);
    };

    const closeSetting = () => {
        setVisible(false);
    };

    const saveResult = async (alertContent) => {
        const saveResult = await confirmAlert(
            `${alertContent}`,
        );
        if (saveResult !== ConfirmAlertResult.OK) {
            return;
        }
    }


    const saveSetting = async (phoneNumber, deviceId) => {
        const isBeingTracking = await isLocationTracking();
        console.log('now location is been tracking?', isBeingTracking);

        if (!isBeingTracking){
            if (phoneNumber.length > 0 && deviceId.length > 0){
                setVisible(false);
                user.addInfo(phoneNumber, deviceId);
                isValid({deviceId: deviceId, phoneNumber: phoneNumber}).then((res) => {
                    if (res === 1){
                        setTrackButtonEnabled(true);
                    } else {
                        setTrackButtonEnabled(false);
                        saveResult('You are not a registered competitor.');
                    }
                })
            }else {
                saveResult('Phone number or device ID was not registered successfully. Please try again.');
            }
        }else {
            saveResult('During tracking, you can not update competitor info.');
        }
    };

    return {
        onPressToggleTracking: onPressToggleTracking,
        isTracking,
        isOnline: net.isConnected,
        connectionType: net.connectionType,
        isTrackButtonEnabled,
        isVisible,
        saveSetting,
        openSetting,
        closeSetting,
        phoneNumber: user.phoneNumber,
        deviceId: user.deviceId,
        latitude: info.latitude,
        longitude: info.longitude,
        altitude: info.altitude,
        accuracy: info.accuracy,
        decimalAccuracy: info.decimalAccuracy,
        speed: info.speed,
        timestamp: info.timestamp,
        formattedTime: info.formattedTime
    };
}

export default useViewModel;
