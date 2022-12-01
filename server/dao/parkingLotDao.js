'use strict';
const { iAmTesting } = require('../test/mockDB/iAmTesting');
const getMock = () => {
    //faccio il require del mock solo se sto in testing
    const { mockDB } = require('../test/mockDB/mockDB');
    return mockDB;
}
const db = iAmTesting() ? getMock() : require('./openDb');

/**
 * Insert a new parking lot
 * @param {number} capacity how much veichles enter in the parking lot
 * @param {number} pointId the ID of the point that identifies where the hut is
 */
 exports.addParkingLot = (capacity,pointId) => {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO ParkingLot(capacity,pointId) VALUES (?,?)";
        db.run(sql, [capacity,pointId], function (err) {
            if (err) {
                reject(err);
            }
            else
                resolve(this.lastID);
        }
        );
    });
}

exports.getParkingLotById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM ParkingLot WHERE id = ?';
        db.get(sql, [id], (err, r) => {
            if (err) {
                reject(err);
            }
            else if (r === undefined)
                resolve(undefined);
            else {
                resolve(
                    {
                        id : r.id,
                        capacity : r.capacity,
                        pointId : r.pointId
                    }
                );
            }
        });
    });
}