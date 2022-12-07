
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
        const sql = 'SELECT Point.id as id, Point.name as name, Point.type as type, Point.latitude as latitude,Point.longitude as longitude FROM HikePoint,Point WHERE Point.id=HikePoint.pointId and HikePoint.hikeId = ?';
        db.all(sql, [hikeId], (err, rows) => {
            if (err) {
                reject(err);
            }
            else if (rows === undefined)
                resolve(undefined);
            else {
                const hikes = rows.map((r) => (
                    {
                        id: r.id,
                        name: r.name,
                        type: r.type,
                        latitude: r.latitude,
                        longitude: r.longitude
                    }
                ));
                resolve(hikes);
            }
        });
    });
}