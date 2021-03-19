// a library to wrap and simplify api calls
import Config from '@/config/AppConfig';
import axios, {AxiosInstance} from 'axios';
import Apis from '@/constants/Api';

const instance = axios.create({
  baseURL: Config.apiEndPoint,
  headers: { 'content-type': 'application/json' },
  timeout: 20000    // Timeout 20 seconds
});

export const sendLocations = (locations) => {
  return instance.post(Apis.sendLocations, locations).then(function (response) {
  });
}
