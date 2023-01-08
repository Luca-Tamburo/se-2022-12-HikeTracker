
/*
* -------------------------------------------------------------------- 
*
* Package:         server
* Module:          unitTest
* File:            mockDAO.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

'use strict';
const { iAmTesting } = require('../mockDB/iAmTesting');
const getMock = () => {
    //faccio il require del mock solo se sto in testing
    const { mockDB } = require('../mockDB/mockDB');
    return mockDB;
}
const db = iAmTesting() ? getMock() : require('../../dao/openDb');

/*
Get a hikePoint
*/
exports.getHikePointCorrispondance = (hikeId, pointId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM HikePoint WHERE hikeId = ? AND pointId=?';
        db.get(sql, [hikeId, pointId], (err, r) => {
            if (err) {
                reject(err);
            }
            else if (r === undefined)
                resolve(false);
            else {
                resolve(true);
            }
        });
    });
}

/*
Delete a hikePoint
*/
exports.deleteHikePointCorrispondance = (hikeId, pointId) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM HikePoint WHERE hikeId = ? AND pointId=?`;
        db.run(sql, [hikeId, pointId], function (err) {
            if (err)
                reject(err);
            else
                resolve(1);
        });
    });
}

exports.getHutById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Hut WHERE id = ?';
        db.get(sql, [id], (err, r) => {
            if (err) {
                reject(err);
            }
            else if (r === undefined)
                resolve(undefined);
            else {
                resolve(
                    {
                        id: r.id,
                        roomsNumber: r.roomsNumber,
                        bedsNumber: r.bedsNumber,
                        whenIsOpen: r.whenIsOpen,
                        phoneNumber: r.phoneNumber,
                        photoFile: r.photoFile,
                        website: r.website,
                        pointId: r.pointId
                    }
                );
            }
        });
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
                        id: r.id,
                        capacity: r.capacity,
                        pointId: r.pointId
                    }
                );
            }
        });
    });
}