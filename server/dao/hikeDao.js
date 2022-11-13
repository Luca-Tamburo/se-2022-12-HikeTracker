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
exports.insertHike = (id, title, description, lenght, expectedTime, ascent, difficulty, startPointId, endPointId, authorId, uploadDate, gpxFile, photoFile) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO Hike(id, title, description, lenght, expectedTime, ascent, difficulty, startPointId, endPointId, authorId, uploadDate, gpxFile, photoFile) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
        db.run(sql, [id, title, description, lenght, expectedTime, ascent, difficulty, startPointId, endPointId, authorId, uploadDate, gpxFile, photoFile], function (err) {
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
        const sql = "SELECT Hike.id AS id, Hike.title AS title, Hike.description AS description, Hike.uploadDate AS uploadDate, Hike.photoFile AS photoFile, User.name AS authorName, User.surname AS authorSurname FROM Hike JOIN User ON Hike.authorId = User.id";
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
                    uploadDate: r.uploadDate,
                    photoFile: r.photoFile
                }
            ));
            resolve(hikes);
        });
    });
}

/**
 * Get hike gpx by hike id
 */
exports.getGpxByHikeId = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Hike WHERE id = ?';
        db.all(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
            }
            const gpx = rows.map((r) => (
                {
                    gpxFile: r.gpxFile
                }
            ));
            resolve(gpx[0]);
        });
    });
}

/**
 * Get hike detailed information by hike id
 */
exports.getDetailsByHikeId = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT Hike.id AS id, Hike.title AS title, Hike.description AS description, Hike.uploadDate AS uploadDate, Hike.photoFile AS photoFile, Hike.length AS length, Hike.expectedTime AS expectedTime, Hike.ascent AS ascent, Hike.difficulty AS difficulty, Hike.startPointId AS startPointId, Hike.endPointId AS endPointId, User.name AS authorName, User.surname AS authorSurname FROM Hike JOIN User ON Hike.authorId = User.id WHERE Hike.id = ?';
        db.all(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
            }
            const details = rows.map((r) => (
                {
                    id: r.id,
                    title: r.title,
                    description: r.description,
                    authorName: r.authorName,
                    authorSurname: r.authorSurname,
                    uploadDate: r.uploadDate,
                    photoFile: r.photoFile,
                    length: r.length,
                    expectedTime: r.expectedTime,
                    ascent: r.ascent,
                    difficulty: r.difficulty,
                    startPointId: r.startPointId,
                    endPointId: r.endPointId
                }
            ));
            resolve(details);
        });
    });
}

/**
 * Get points by hike id
 */
exports.getPointsByHikeId = (hikeId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT Point.id AS id, Point.name AS name, Point.description AS description, Point.type AS type, Point.latitude AS latitude, Point.longitude AS longitude, Point.altitude AS altitude, Point.city AS city, Point.province AS province FROM Point JOIN HikePoint ON Point.id = HikePoint.pointId WHERE HikePoint.hikeId = ?";
        db.all(sql, [hikeId], (err, rows) => {
            if (err) {
                reject(err);
            }
            const hikes = rows.map((r) => (
                {
                    id: r.id,
                    name: r.name,
                    description: r.description,
                    type: r.type,
                    latitude: r.latitude,
                    longitude: r.longitude,
                    altitude: r.altitude,
                    city: r.city,
                    province: r.province
                }
            ));
            resolve(hikes);
        });
    });
}