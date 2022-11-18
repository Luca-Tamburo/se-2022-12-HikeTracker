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
//        const hikeId = await hikeDao.addHike( req.body.title, req.body.description, req.body.length, req.body.expectedTime, req.body.ascent, req.body.difficulty, pointOneId, pointTwoId, req.body.authorId, req.body.uploadDate, "here the gpx", req.body.photoFile);

exports.addHike = (title, description, length, expectedTime, ascent, difficulty, startPointId, endPointId, authorId, uploadDate, gpxFile, photoFile) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO Hike(title, description, length, expectedTime, ascent, difficulty, startPointId, endPointId, authorId, uploadDate, gpxFile, photoFile) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        db.run(sql, [title, description, length, expectedTime, ascent, difficulty, startPointId, endPointId, authorId, uploadDate, gpxFile, photoFile],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
    });
}


/**
 * Get hikes from the system (general information)
 */
exports.getHikes = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT Hike.id AS id, Hike.title AS title, Hike.description AS description, Hike.uploadDate AS uploadDate, Hike.photoFile AS photoFile, User.name AS authorName, User.surname AS authorSurname,Point.latitude as latitude, Point.longitude as longitude FROM Hike,User,Point WHERE Hike.startPointId = Point.id AND Hike.authorId = User.id";
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
                    photoFile: r.photoFile,
                    startingPointLatitude:r.latitude,
                    startingPointLongitude:r.longitude
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
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            }
            else if (row === undefined)
                resolve(undefined);
            else {
                resolve(row.gpxFile);
            }
        });
    });
}

/**
 * Get hike detailed information by hike id
 */
exports.getDetailsByHikeId = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT Hike.gpxFile as gpx,Hike.id AS id, Hike.title AS title, Hike.description AS description, Hike.uploadDate AS uploadDate, Hike.photoFile AS photoFile, Hike.length AS length, Hike.expectedTime AS expectedTime, Hike.ascent AS ascent, Hike.difficulty AS difficulty, Hike.startPointId AS startPointId, Hike.endPointId AS endPointId, User.name AS authorName, User.surname AS authorSurname FROM Hike JOIN User ON Hike.authorId = User.id WHERE Hike.id = ?';
        db.get(sql, [id], (err, r) => {
            if (err) {
                reject(err);
            } else if (r === undefined)
                resolve(undefined);
            else {
                const details =
                {
                    id: r.id,
                    gpx: r.gpx,
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
                resolve(details);
            }
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