import {LocationObject} from "expo-location";
import store from '@/mst';
import * as Storage from '@/utils/AsyncStorage';
import {UserPrefStorageKey} from "@/constants";
import {deleteLocations, readLocations, saveLocation} from "@/utils/db";
import NetInfo from "@react-native-community/netinfo";
import * as api from '@/services/Api';


const processLocationUpdate = (function() : (data: LocationObject[]) => void {
    // Configuration
    const speedLimit = 1;   // track when speed is > 1
    const distanceLimit = 5;    // Distance Limit > 5m

    /**
     * Remember the last location object tracked
     */
    let lastLocation: LocationObject | undefined = undefined;

    let isInSyncProcess = false;

    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    //:::                                                                         :::
    //:::  This routine calculates the distance between two points (given the     :::
    //:::  latitude/longitude of those points). It is being used to calculate     :::
    //:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
    //:::                                                                         :::
    //:::  Definitions:                                                           :::
    //:::    South latitudes are negative, east longitudes are positive           :::
    //:::                                                                         :::
    //:::  Passed to function:                                                    :::
    //:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
    //:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
    //:::    unit = the unit you desire for results                               :::
    //:::           where: 'M' is statute miles (default)                         :::
    //:::                  'K' is kilometers                                      :::
    //:::                  'N' is nautical miles                                  :::
    //:::                                                                         :::
    //:::  Worldwide cities and other features databases with latitude longitude  :::
    //:::  are available at https://www.geodatasource.com                         :::
    //:::                                                                         :::
    //:::  For enquiries, please contact sales@geodatasource.com                  :::
    //:::                                                                         :::
    //:::  Official Web site: https://www.geodatasource.com                       :::
    //:::                                                                         :::
    //:::               GeoDataSource.com (C) All Rights Reserved 2018            :::
    //:::                                                                         :::
    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    function distance(lat1: number, lon1: number, lat2: number, lon2: number, unit: 'M' | 'K' | 'N' ): number {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            const radlat1 = Math.PI * lat1/180;
            const radlat2 = Math.PI * lat2/180;
            const theta = lon1-lon2;
            const radtheta = Math.PI * theta/180;
            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist;
        }
    }

    /**
     * Send location to server
     * @param locations
     */
    async function sendLocation(locations: LocationObject[]) {
        // Just call the api
        const deviceData = await readDeviceInfo();
        const data = {locations, deviceData};
        return api.sendLocations([data]);
    }

    /**
     * Read Device Info
     */
    async function readDeviceInfo(): Promise<{phoneNumber: string; deviceId: string;}> {
        if (store.isInitialized) {
            const phoneNumber = store.user.phoneNumber;
            const deviceId = store.user.deviceId;
            return {phoneNumber: phoneNumber, deviceId: deviceId};
        }
        try {
            // In other case, (When the store is not properly initialized) just read from local storage
            const {phoneNumber, deviceId} = await Storage.getObject<any>(UserPrefStorageKey);
            return {phoneNumber: phoneNumber, deviceId: deviceId};
        }catch(ex){
            console.log('processLocationUpdate - Error while reading preference', ex);
        }
        return {phoneNumber: '', deviceId: ''};
    }

    /**
     * Read all offline locations from db and send to api server.
     */
    async function syncOfflineLocations(){
        /**
         * If it's in synchronization process just return
         */
        if (isInSyncProcess) {
            console.log('syncOfflineLocations - already synchronizing');
            return;
        }
        isInSyncProcess = true;
        const count = 1000;
        let timestamp = undefined;
        while (1) {
            try {
                // @ts-ignore
                const rows = await readLocations(count, timestamp);
                // If no more records, just stop reading
                if (!rows.length) {
                    break;
                }
                await sendLocation(rows);

                // After successful send, just delete all the locations before this timestamp
                // The timestamp of last row should be largest, as it reads in ascending order
                // @ts-ignore
                const newest = rows[rows.length - 1];
                timestamp = newest.timestamp;

                // Delete locations
                await deleteLocations(timestamp);
            }catch(ex){
                console.log('syncOfflineLocations - error occurred while synchronizing', ex);
                break;
            }
        }
        isInSyncProcess = false;
    }

    /**
     * Check network state and when it goes online, just synchronize
     */
    NetInfo.addEventListener(state => {
        if (state.isConnected) {
            syncOfflineLocations().then().catch();
        }
    });

    /**
     * Process location update from task
     * @param data
     * @returns {Promise<void>}
     */
    return async function (data: LocationObject[]) {
        // Check if device information is stored, if not, then no need to track
        const device = await readDeviceInfo();
        if (!device.phoneNumber || !device.deviceId) {
            console.log('processLocationUpdate - Device information does not exist');
            return;
        }

        // Check with last location
        const currentLocation = data[0];
        let trackLocation = false;

        if ((currentLocation.coords.speed || 0) > speedLimit) {
            trackLocation = true;
        }

        if (!trackLocation && lastLocation) {
            // compare distance with last location
            const lastCoords = lastLocation!!.coords;
            const currentCoords = currentLocation.coords;
            const dist = distance(lastCoords.latitude, lastCoords.longitude, currentCoords.latitude, currentCoords.longitude, 'M');

            if (dist >= distanceLimit) {
                trackLocation = true;
            }
        }

        if (!trackLocation) {
            return;
        }

        lastLocation = currentLocation;

        // Send the updates to the api
        try {
            //save gps info in user store
            store.info.getGpsInfo(data[0].coords.latitude, data[0].coords.longitude, data[0].coords.accuracy,  data[0].coords.speed, data[0].timestamp);
            //send current location to the server
            await sendLocation([currentLocation]);
            // When location is successfully sent, try to synchronize offline locations
            await syncOfflineLocations();
        }catch(ex){
            console.log('processLocationUpdate - send location failed, saving to local storage', ex);
            //if send location failed. store into sqlite db
            try {
                await saveLocation(currentLocation);
            }catch(ex){
                console.log('processLocationUpdate - save location failed', ex);
            }
        }
    }
})();


export {processLocationUpdate};