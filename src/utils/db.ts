import * as SQLite from 'expo-sqlite';
import Config from '@/config/AppConfig';
import {LocationObject} from "expo-location";

const db = SQLite.openDatabase(Config.dbName, Config.dbVersion);
const createTableSQL = 'create table if not exists locations(id integer primary key autoincrement, latitude double, longitude double, speed double, accuracy double, altitude double, timestamp integer)';

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

    console.log(location);

    return new Promise<void>((resolve, reject) => {
        const sql = 'INSERT INTO locations (latitude, longitude, speed, accuracy, altitude, timestamp) VALUES (?, ?, ?, ?, ?, ?)';
        const {latitude, longitude, altitude, accuracy, speed} = location.coords;
        const args = [latitude, longitude, speed, accuracy, altitude, location.timestamp];
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
                return false;
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
export function readLocations(count: number, timestamp?: number): Promise<LocationObject[]> {
    return new Promise<LocationObject[]>((resolve, reject) => {
        let sql = 'SELECT * FROM locations ';
        let args:unknown[] = [];
        if ((timestamp || 0) > 0) {
            sql = sql + ' WHERE timestamp > ? ';
            args = [timestamp];
        }
        sql += ' ORDER BY timestamp ASC';
        db.exec([{sql, args}], false, (error, resultSets) => {
            if (error) {
                reject(error);
                return;
            }
            if (resultSets && resultSets.length) {
                const resultSet = resultSets[0];
                if (resultSet.error) {
                    reject(resultSet.error);
                    return;
                }
                const rows = resultSet.rows || [];
                const result = rows.map((r: any) => ({
                    coords: {...r},
                    timestamp: r.timestamp
                }));
                resolve(result);
            } else {
                resolve([]);
            }
        });
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
        db.exec([{sql, args}], false, (error, resultSets) => {
            if (error) {
                reject(error);
                return;
            }
            if (resultSets && resultSets.length) {
                const resultSet = resultSets[0];
                if (resultSet.error) {
                    reject(resultSet.error);
                    return;
                }
                resolve();
            }
        });
    });
}