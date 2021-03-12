import React from 'react';
import {useDelay, useStores} from '@/hooks';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import AppConfig from '@/config/AppConfig';
import {showAlert, confirmAlert} from '@/utils';
import {ConfirmAlertResult} from '@/constants';

const isLocationTracking = async () => {
    return TaskManager.isTaskRegisteredAsync(AppConfig.locationTaskName);
};

function useViewModel(props) {
    const {user, hud, net, info} = useStores();
    const [isTracking, setTracking] = React.useState(false);
    const [gpsSignal, setGpsSignal] = React.useState('Super');
    const [isVisible, setVisible] = React.useState(false);
    const [isTrackButtonEnabled, setTrackButtonEnabled] = React.useState(false);

    // On Component Did Mount, Check for tracking.
    React.useEffect(() => {
        isLocationTracking().then((isRegistered) => {
            setTracking(isRegistered);
            if (user.deviceId.length > 0 || isTracking){
                setTrackButtonEnabled(true);
            }else {
                setTrackButtonEnabled(false);
            }
        });
    },[]);

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
                        accuracy: Location.Accuracy.BestForNavigation
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
            console.log('Is now tracking ', _isTracking1);
            console.log('Status is ', status);
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

    const saveSetting = async (phoneNumber, deviceId) => {
        if (phoneNumber.length > 0 && deviceId.length > 0){
            setVisible(false);
            setTrackButtonEnabled(true);
            user.addInfo(phoneNumber, deviceId);
        }else {
            const saveResult = await confirmAlert(
                `Phone number or device ID was not registered successfully. Please try again.`,
            );
            if (saveResult !== ConfirmAlertResult.OK) {
                return;
            }
        }
    };

    return {
        onPressToggleTracking: onPressToggleTracking,
        isTracking,
        isOnline: net.isConnected,
        connectionType: net.connectionType,
        gpsSignal,
        isTrackButtonEnabled,
        isVisible,
        saveSetting,
        openSetting,
        closeSetting,
        phoneNumber: user.phoneNumber,
        deviceId: user.deviceId,
        //gps info
        latitude: info.latitude,
        longitude: info.longitude,
        accuracy: info.accuracy,
        speed: info.speed,
        timestamp: info.timestamp
    };
}

export default useViewModel;
