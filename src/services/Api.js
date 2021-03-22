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

export const checkCompetitor = (competitor) => {
  // return instance.post(Apis.checkCompetitor, competitor).then(function (response) {});
  return axios.post('http://167.172.153.254/sendLocations/checkCompetitor.php', competitor)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
}