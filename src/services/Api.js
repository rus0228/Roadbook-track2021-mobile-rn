// a library to wrap and simplify api calls
import Config from '@/config/AppConfig';
import axios, {AxiosInstance} from 'axios';

const instance = axios.create({
    baseURL: Config.apiEndPoint,
    headers: {'content-type': 'application/json'},
    timeout: 20000    // Timeout 20 seconds
});

export const sendLocations = (data) => {
    return instance.post('http://167.172.153.254/api/position/create.php', data).then(function (response) {
    });
}

export const checkCompetitor = (competitor) => {
    return axios.get('http://167.172.153.254/api/competitor/check.php', {
        params: competitor
    }).then(function (response) {
        console.log(response);
        return response.status;
    }).catch(function (ex) {
        console.log(ex);
        return false;
    })
}