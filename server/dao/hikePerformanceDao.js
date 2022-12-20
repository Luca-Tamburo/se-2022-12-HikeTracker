/*
* -------------------------------------------------------------------- 
*
* Package:         server
* Module:          dao
* File:            hikePerformanceDao.js
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

/**
 * Get all the concluded hikes of the user userId
 */
exports.getCompletedHikesDetails = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT title,length,expectedTime,ascent,difficulty,startTime,terminateTime FROM Hike,HikePerformance WHERE terminateTime IS NOT ? AND Hike.id=hikeId AND userId = ?';
        db.all(sql, [null, userId], (err, rows) => {
            if (err) {
                reject(err);
            }
      /*      const terminatedHikes = rows.map((r) => (
                {
                    id: r.id,
                    startTime: r.startTime,
                    terminateTime: r.terminateTime,
                    hikeId: r.hikeId,
                    userId: r.userId
                }
        
                ));
         */
           resolve(rows)//terminatedHikes);
        });
    });
}