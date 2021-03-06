// a library to wrap and simplify api calls
import Api from '@/constants/Api';
import Config from '@/config/AppConfig';
import numeral from 'numeral';
import base64 from 'react-native-base64';
import qs from 'qs';

const commonHeaders = {
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/x-www-form-urlencoded',
};
// export const logIn = (username, password) => {
//   return fetch(Config.apiEndPoint + Api.logIn, {
//     method: 'POST',
//     headers: commonHeaders,
//     body: qs.stringify({username, password}),
//   }).then((resp) => resp.json());
// };

export const logIn = (username, password) => {
  const url = Config.apiEndPoint + Api.logIn + '?' + qs.stringify({username, password});
  console.log(url);
  return fetch(url).then((resp) => resp.json());
};

// export const sendLocation = (userid, latitude, longitude) => {
//   // Build token and base64 encode
//   const str =
//     userid +
//     ',' +
//     numeral(latitude).format('0.000000') +
//     ',' +
//     numeral(longitude).format('0.000000');
//   const token = base64.encode(str);
//   return fetch(Config.apiEndPoint + Api.sendLocation, {
//     method: 'POST',
//     headers: commonHeaders,
//     body: qs.stringify({token}),
//   }).then(() => {});
// };

export const sendLocation = (userid, latitude, longitude) => {
  // Build token and base64 encode
  const str = userid + ',' + numeral(latitude).format('0.000000') + ',' + numeral(longitude).format('0.000000');
  const token = base64.encode(str);
  const url = Config.apiEndPoint + Api.sendLocation + '?' + qs.stringify({token});
  return fetch(url).then(() => {});
};
