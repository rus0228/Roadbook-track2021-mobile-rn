import * as SQLite from 'expo-sqlite';
import Config from '@/config/AppConfig';
import {LocationObject} from 'expo-location';

export type CustomLocationObject = {
    coords: {
        latitude: number;
        longitude: number;
        altitude: number | null;
        accuracy: number | null;
        altitudeAccuracy: number | null;
        heading: number | null;
        speed: number | null;
    };
    timestamp: number;
    network?: boolean;
};
const db = SQLite.openDatabase(Config.dbName, Config.dbVersion);
const createTableSQL = 'create table if not exists locations(id integer ' +
    'primary key autoincrement, latitude double, longitude double, speed double, accuracy double, altitude double, timestamp double, network text)';

/**
 * Create locations table if not exists
 */
db.transaction(function (tx) {
    tx.executeSql(createTableSQL);
});

/**
 * Save Location
 * @param location
 */
export function saveLocation(location:LocationObject): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const sql = 'insert into locations (latitude, longitude, speed, accuracy, altitude, timestamp, network) values (?, ?, ?, ?, ?, ?, ?)';
        const {latitude, longitude, altitude, accuracy, speed} = location.coords;
        const args = [latitude, longitude, speed, accuracy, altitude, location.timestamp, 'offline'];

        // db.exec([{sql, args}], true, (error) => {
        //     if (error) {
        //         reject(error);
        //         return;
        //     }
        //     resolve();
        // });

        db.transaction(function (tx) {
            tx.executeSql(sql, args, (transaction, resultSet) => {
                console.log(transaction, resultSet);
                resolve();
            }, (transaction, error) => {
                console.log(error);
                reject(error);
                return true;
            })
        })
    });
}


/**
 * Read Locations after timestamp
 * So read the oldest record first
 * @param count
 * @param timestamp
 */
export function readLocations(count: number, timestamp?: number): Promise<CustomLocationObject[]> {
    return new Promise<CustomLocationObject[]>((resolve, reject) => {
        let sql = 'select * from locations ';
        let args:unknown[] = [];
        if ((timestamp || 0) > 0) {
            sql = sql + ' where timestamp > ? ';
            args = [timestamp];
        }
        sql = sql + ' order by timestamp asc limit ' + count;

        db.transaction(function (tx) {
            tx.executeSql(sql, args, (transaction, resultSet) => {

                // @ts-ignore
                let result: object[] = [];
                for(let i = 0; i < resultSet.rows.length; i++) {
                    let row = resultSet.rows.item(i);
                    result[i] = {
                        coords: {
                            altitude: row['altitude'],
                            latitude: row['latitude'],
                            accuracy: row['accuracy'],
                            longitude: row['longitude'],
                            speed: row['speed']
                        },
                        timestamp: row['timestamp'],
                        network: row['network']
                    }
                }

                // @ts-ignore
                resolve(result);

            }, (transaction, error) => {
                reject(error);
                return true;
            })
        });
        // db.exec([{sql, args}], false, (error, resultSets) => {
        //     if (error) {
        //         reject(error);
        //         return;
        //     }
        //     if (resultSets && resultSets.length) {
        //         const resultSet = resultSets[0];
        //         if (resultSet.error) {
        //             reject(resultSet.error);
        //             return;
        //         }
        //         const rows = resultSet.rows || [];
        //         const result = rows.map((r: any) => ({
        //             coords: {...r},
        //             timestamp: r.timestamp
        //         }));
        //         resolve(result);
        //     } else {
        //         resolve([]);
        //     }
        // });
    });
}

/**
 * Delete locations small or equal to timestamp
 * Performed after successful upload
 * @param timestamp
 */
export function deleteLocations(timestamp: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const sql = 'DELETE FROM locations WHERE timestamp <= ?';
        const args:unknown[] = [timestamp];

        db.transaction(function (tx) {
            tx.executeSql(sql, args, (transaction, resultSet) => {
                resolve();
            }, (transaction, error) => {
                console.log(error);
                reject(error);
                return false;
            })
        });

        // db.exec([{sql, args}], false, (error, resultSets) => {
        //     if (error) {
        //         reject(error);
        //         return;
        //     }
        //     if (resultSets && resultSets.length) {
        //         const resultSet = resultSets[0];
        //         if (resultSet.error) {
        //             reject(resultSet.error);
        //             return;
        //         }
        //         resolve();
        //     }
        // });
    });
}