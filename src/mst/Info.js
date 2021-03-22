import {types} from 'mobx-state-tree';
import {defNumber, defString} from './Types';

const Info = types
    .model('Info', {
        latitude: defNumber,
        longitude: defNumber,
        altitude: defNumber,
        accuracy: defNumber,
        speed: defNumber,
        timestamp: defNumber,
        decimalAccuracy: defNumber,
        formattedTime: defString
    })
    .actions((self) => {
        const getGpsInfo = (latitude, longitude, altitude, accuracy, speed, timestamp) => {
            self.latitude = latitude;
            self.longitude = longitude;
            self.altitude = altitude;
            self.accuracy = accuracy;
            self.speed = speed;
            self.timestamp = timestamp;
            self.decimalAccuracy = getDecimalAccuracy(self.accuracy);
            self.formattedTime = getFormattedTime(self.timestamp);
        };

        const getDecimalAccuracy = (accuracy) => {
            if (accuracy < 5){
                return 0;
            } else if (accuracy > 15){
                return 1;
            } else {
                return (accuracy - 5) / 10;
            }
        };

        const getFormattedTime = (timestamp) => {
            const date = new Date(timestamp);
            const hours = date.getHours();
            const minutes = '0' + date.getMinutes();
            const seconds = '0' + date.getSeconds();
            const miliseconds = '000' + date.getMilliseconds();
            return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + '. ' + miliseconds.substr(-3);
        };

        return {getGpsInfo};
    });

export default Info;
