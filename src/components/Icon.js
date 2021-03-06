import IonIcon from 'react-native-vector-icons/Ionicons';
import React from 'react';

const Icon = ({name, size, color, ...props}) => {
  return (
    <IonIcon
      name={name}
      size={size || 20}
      color={color || 'white'}
      {...props}
    />
  );
};

export default Icon;
