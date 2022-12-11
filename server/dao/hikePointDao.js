
/*
* -------------------------------------------------------------------- 
*
* Package:         server
* Module:          dao
* File:            hikePointDao.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

'use strict';
const { iAmTesting } = require('../test/mockDB/iAmTesting');
const getMock = () => {
    //faccio il require del mock solo se sto in testing
    const { mockDB } = require('../test/mockDB/mockDB');
    return mockDB;
}
const db = iAmTesting() ? getMock() : require('./openDb');

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
exports.getRefPointsByHikeId = (hikeId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM HikePoint,Point WHERE Point.id=HikePoint.pointId and HikePoint.hikeId = ?';
        db.all(sql, [hikeId], (err, rows) => {
            if (err) {
                reject(err);
            }
            else if (rows === undefined)
                resolve(undefined);
            else {
                const hikes = rows.map((p) => (
                    {
                        id: p.id,
                        name: p.name,
                        type: p.type,
                        description: p.description,
                        latitude: p.latitude,
                        longitude: p.longitude,
                        altitude: p.altitude,
                        city: p.city,
                        province: p.province,
                        region: p.region
                    }
                ));
                resolve(hikes);
            }
        });
    });
}