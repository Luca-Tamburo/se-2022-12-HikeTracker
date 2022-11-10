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
 * Get hikes from the system (general information)
 */
exports.getHikes = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT Hike.id AS id, Hike.title AS title, Hike.description AS description, Hike.uploadDate AS uploadDate, User.name AS authorName, User.surname AS authorSurname FROM Hike JOIN User ON Hike.authorId = User.id";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } 
            const hikes = rows.map((r) => (
                {
                    id: r.id,
                    title: r.title,
                    description: r.description,
                    authorName: r.authorName,
                    authorSurname: r.authorSurname,
                    uploadDate: r.uploadDate
                }
            ));
            resolve(hikes);
        });
    });

}



