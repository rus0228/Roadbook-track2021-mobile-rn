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
import {processLocationUpdate} from "@/utils/location";

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
    /*{
      "coords": {
        "altitude": locations.coords.altitude,
        "altitudeAccuracy": locations.coords.altitudeAccuracy,
        "latitude": locations.coords.latitude,
        "accuracy": locations.coords.accuracy,
        "longitude": locations.coords.longitude,
        "heading": locations.coords.heading,
        "speed": locations.coords.speed
      },
      "timestamp": locations.coords.timestamp
    }*/
    await processLocationUpdate(locations);
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
