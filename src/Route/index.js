import React from 'react';
import {observer} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '@/constants/Navigation';
import Tracking from '@/screens/Tracking';
import useViewModel from './methods';

const Stack = createStackNavigator();

const Route = () => {
  const vm = useViewModel();
  if (vm.isInitializing) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}>
        <Stack.Screen name={Screens.tracking} component={Tracking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default observer(Route);
