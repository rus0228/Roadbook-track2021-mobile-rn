// Simple React Native specific changes
import Config from 'react-native-config';

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  apiEndPoint: Config.SERVER_URL,
  shareLinkPrefix: Config.SERVER_URL + '/joingame/',
  profileLinkPrefix: Config.SERVER_URL,
  manualJoin: true,
  locationTaskName: 'driver-location-task',
  locationUpdateInterval: 1000, // For Android only Just 5 minutes
};
