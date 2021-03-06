import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import Sizes from '@/styles/Sizes';

export function keyboardAvoiding(Component) {
  // Return another component
  return (props) => {
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        enabled={Sizes.isiOS}
        behavior={'padding'}>
        <Component {...props} />
      </KeyboardAvoidingView>
    );
  };
}
