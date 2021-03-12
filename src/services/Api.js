// a library to wrap and simplify api calls
import Config from '@/config/AppConfig';
import axios, {AxiosInstance} from 'axios';
import Apis from '@/constants/Api';

const instance: AxiosInstance = axios.create({
  baseURL: Config.apiEndPoint,
  headers: { 'content-type': 'application/json' },
  timeout: 20000    // Timeout 20 seconds
});



/*
  By default Axios wraps the response into following format
  interface AxiosResponse<T = any>  {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request?: any;
  }
 */

export const sendLocations = (locations) => {
  return instance.post(Apis.sendLocations, locations).then(function (response) {
  });
}
