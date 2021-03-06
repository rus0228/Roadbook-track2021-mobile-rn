import React from 'react';

import {UIActivityIndicator} from 'react-native-indicators';

export default (props) => {
  return <UIActivityIndicator {...props} style={{flex: 0}} />;
};
