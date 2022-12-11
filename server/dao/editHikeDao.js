/*
* -------------------------------------------------------------------- 
*
* Package:         server
* Module:          dao
* File:            editHikeDao.js
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
 * Update the start point of an hike
 * @param {number} startPointId the id of the new startingPoint
 * @param {number} id the id of the hike
 */
exports.updateStartPoint = (startPointId, id) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE Hike SET startPointId=? WHERE id=?";
        db.run(sql, [startPointId, id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

/**
 * Update the start point of an hike
 * @param {number} endPointId the id of the new endingPoint
 * @param {number} id the id of the hike
 */
exports.updateEndPoint = (endPointId, id) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE Hike SET endPointId=? WHERE id=?";
        db.run(sql, [endPointId, id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}