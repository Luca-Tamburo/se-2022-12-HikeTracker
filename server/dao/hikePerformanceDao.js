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
        const sql = 'SELECT hikeId,title,length,expectedTime,ascent,difficulty,startTime,terminateTime FROM Hike,HikePerformance WHERE terminateTime IS NOT ? AND Hike.id=hikeId AND userId = ?';
        db.all(sql, [null, userId], (err, rows) => {
            if (err) {
                reject(err);
            }
            const completedHikes = rows.map((r) => (
                {
                    id: r.hikeId,
                    title: r.title,
                    length: r.length,
                    expectedTime: r.expectedTime,
                    ascent: r.ascent,
                    difficulty: r.difficulty,
                    startTime: r.startTime,
                    terminateTime: r.terminateTime
                }

            ));

            resolve(completedHikes);
        });
    });
}

exports.getCompletedHikeTimes = (hikeId, userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT startTime,terminateTime FROM HikePerformance WHERE terminateTime IS NOT ? AND hikeId=? AND userId = ?';
        db.all(sql, [null, hikeId, userId], (err, rows) => {
            if (err) {
                reject(err);
            }
            const terminatedHikeTimes = rows.map((r) => (
                {
                    startTime: r.startTime,
                    terminateTime: r.terminateTime
                }

            ));
            resolve(terminatedHikeTimes);
        });
    });
}
/**
 * Get the hike the user is doing (terminateTime è undefined/null)
 */
exports.getStartedHikeByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM HikePerformance WHERE terminateTime IS ? AND userId = ?';
        db.get(sql, [null, userId], (err, r) => {
            if (err) {
                reject(err);
            } else if (r === undefined)
                resolve(undefined);
            else {
                const data =
                {
                    id: r.id,
                    startTime: r.startTime,
                    terminateTime: r.terminateTime,
                    hikeId: r.hikeId,
                    userId: r.userId
                }
                resolve(data);
            }
        });
    });
}

/**
 * Get all the concluded hikes of the user userId
 */
exports.getTerminatedHikes = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM HikePerformance WHERE terminateTime IS NOT ? AND userId = ?';
        db.all(sql, [null, userId], (err, rows) => {
            if (err) {
                reject(err);
            }
            const terminatedHikes = rows.map((r) => (
                {
                    id: r.id,
                    startTime: r.startTime,
                    terminateTime: r.terminateTime,
                    hikeId: r.hikeId,
                    userId: r.userId
                }
            ));
            resolve(terminatedHikes);
        });
    });
}

exports.addHikePerformance = (startTime, hikeId, userId) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO HikePerformance(startTime, hikeId, userId) VALUES (?,?,?)";
        db.run(sql, [startTime, hikeId, userId],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
    });
}

exports.terminateHikePerformance = (terminateTime,id) => {
    return new Promise((resolve, reject) => {

        const sql = "UPDATE HikePerformance SET terminateTime=? WHERE id=?";
        db.run(sql, [terminateTime, id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("ok");
            }
        });

    });
}



