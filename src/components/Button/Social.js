import React from 'react';
import {WhiteButtonText} from '../Text';
import Icon from '../Icon';
import Button from './';

export const FBButton = ({title, onPress}) => {
  return (
    <Button facebookBlue fill onPress={onPress}>
      <WhiteButtonText style={{flex: 1}}>{title}</WhiteButtonText>
      <Icon name={'logo-facebook'} />
    </Button>
  );
};

export const GoogleButton = ({title, onPress}) => {
  return (
    <Button googleBlue fill onPress={onPress}>
      <WhiteButtonText style={{flex: 1}}>{title}</WhiteButtonText>
      <Icon name={'logo-google'} />
    </Button>
  );
};

export const EmailButton = ({title, onPress}) => {
  return (
    <Button green fill onPress={onPress}>
      <WhiteButtonText style={{flex: 1}}>{title}</WhiteButtonText>
      <Icon name={'mail-outline'} />
    </Button>
  );
};
