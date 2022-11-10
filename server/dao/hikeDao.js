/*
* -------------------------------------------------------------------- 
*
* Package:         server
* Module:          dao
* File:            hikeDao.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

'use strict';

//DB access module
const sqlite = require('sqlite3');
const crypto = require('crypto');

//Open the database
const db = new sqlite.Database('hikeTracker.sqlite3', (err) => {
    if (err) throw err;
});



/**
 * Insert hikes into the system
 */
exports.insertHike = (id, title, description, lenght, expectedTime, ascent, difficulty, startPointId, endPointId, authorId, uploadDate, gpxFile) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO Hike(id, title, description, lenght, expectedTime, ascent, difficulty, startPointId, endPointId, authorId, uploadDate, gpxFile) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        db.run(sql, [id, title, description, lenght, expectedTime, ascent, difficulty, startPointId, endPointId, authorId, uploadDate, gpxFile], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastId);
            }
        });
    });
}


/**
 * Get hikes from the system
 */
exports.getHikes = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Hike';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            const hikes = rows.map((r) => (
                {
                    id: r.id,
                    title: r.title,
                    description: r.description,
                    lenght: r.lenght,
                    expectedTime: r.expectedTime,
                    ascent: r.ascent,
                    difficulty: r.difficulty,
                    startPointId: r.startPointId,
                    endPointId: r.endPointId,
                    authorId: r.authorId,
                    uploadDate: r.uploadDate,
                    gpxFile: r.gpxFile
                }
            ));
            resolve(hikes);
        });
    });

}



