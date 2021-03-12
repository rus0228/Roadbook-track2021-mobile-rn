import {types} from 'mobx-state-tree';
import {defNumber} from './Types';

const Info = types
    .model('Info', {
        latitude: defNumber,
        longitude: defNumber,
        accuracy: defNumber,
        speed: defNumber,
        timestamp: defNumber
    })
    .actions((self) => {
        const getGpsInfo = (latitude, longitude, accuracy, speed, timestamp) => {
            self.latitude = latitude;
            self.longitude = longitude;
            self.accuracy = accuracy;
            self.speed = speed;
            self.timestamp = timestamp;
        }

        return {getGpsInfo};
    });

export default Info;
