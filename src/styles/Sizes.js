import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters/extend';
import {Platform} from 'react-native';
import androidScale from './AndroidScale';

const isiOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

const mainScale = isAndroid ? androidScale : scale;
const sizes = {
  scale: mainScale,
  mScale: moderateScale,
  vScale: verticalScale,
  hScale: scale,

  isiOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',

  logoSize: mainScale(96),
  avatar: mainScale(76),

  marginCard: mainScale(23),
  paddingCard: mainScale(35),

  navButtonTop: mainScale(isiOS ? 35 : 10),
  logoTop: mainScale(isiOS ? 80 : 55),
};

export default sizes;

// Font Sizes
export const FontSizes = {
  dropAlertTitle: 14,
  dropAlertMessage: 14,
};

/*
const spacingScale = moderateScale;
export const Spacing = {
  XS: spacingScale(5),
  SM: spacingScale(10),
  MD: spacingScale(15),
  LG: spacingScale(20),
  XL: spacingScale(30),
};

const fontSizeScale = moderateScale;
export const FontSize = {
  Tiny: fontSizeScale(10),
  Small: fontSizeScale(12),
  Medium: fontSizeScale(14),
  Large: fontSizeScale(16),
  ExtraLarge: fontSizeScale(18),
  Huge: fontSizeScale(20),
  ExtraHuge: fontSizeScale(24),
  Giant: fontSizeScale(30),
};
*/
