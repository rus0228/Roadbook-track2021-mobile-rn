/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Platform, StatusBar, UIManager} from 'react-native';
import Route from '@/Route';
import '@/config';
import StoreProvider from '@/mst/StoreProvider';
import DropdownAlert from '@/components/DropDownAlert';
import DebugConfig from '@/config/DebugConfig';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import Hud from '@/components/hud';
import * as TaskManager from 'expo-task-manager';
import AppConfig from '@/config/AppConfig';
import * as Api from '@/services/Api';
import store from '@/mst/index';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// Define background task to update the location
TaskManager.defineTask(AppConfig.locationTaskName, async ({data, error}) => {
  if (error) {
    return;
  }
  if (data) {
    const {locations} = data;
    console.log(data);
    const {latitude, longitude} = locations[0].coords;

    // Just send location and wait for no response
    if (store.user.phoneNumber.length > 0 && store.user.deviceId.length > 0) {
      try {
        console.log(latitude, longitude, store.user.phoneNumber, store.user.deviceId);
        await Api.sendLocation(store.user.deviceId, latitude, longitude);
      } catch (exception) {
        console.log('Exception occurred while updating user location');
      }
    }
  }
});

const App = () => {
  return (
      <>
        <StatusBar barStyle={'dark-content'} />
        <ActionSheetProvider>
          <StoreProvider>
            <Route />
            <DropdownAlert />
            <Hud />
          </StoreProvider>
        </ActionSheetProvider>
      </>
  );
};

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron ? console.tron.overlay(App) : App;
