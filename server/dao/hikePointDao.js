
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