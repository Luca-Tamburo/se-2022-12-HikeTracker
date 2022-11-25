'use strict';
const { iAmTesting } = require('../test/mockDB/iAmTesting');
const getMock = () => {
    //faccio il require del mock solo se sto in testing
    const { mockDB } = require('../test/mockDB/mockDB');
    return mockDB;
}
const db = iAmTesting() ? getMock() : require('./openDb');

/**
 * Insert a new hut
 * @param {number} roomsNumber how many rooms in there
 * @param {number} bedsNumber how many beds in total
 * @param {string} whenIsOpen ...
 * @param {string} phoneNumber ...
 * @param {string} photoFile the link of a photoFile of the hut
 * @param {number} pointId the ID of the point that identifies where the hut is
 */

 exports.addHut = (roomsNumber, bedsNumber, whenIsOpen, phoneNumber, photoFile, pointId) => {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO Hut(roomsNumber,bedsNumber,whenIsOpen,phoneNumber,photoFile,pointId) VALUES (?,?,?,?,?,?)";
        db.run(sql, [roomsNumber,bedsNumber,whenIsOpen,phoneNumber,photoFile,pointId], function (err) {
            if (err) {
                reject(err);
            }
            else
                resolve(this.lastID);
        }
        );
    });
}