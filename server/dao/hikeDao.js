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
const { iAmTesting } = require('../test/mockDB/iAmTesting');
const getMock = () => {
    //faccio il require del mock solo se sto in testing
    const { mockDB } = require('../test/mockDB/mockDB');
    return mockDB;
}
const db = iAmTesting() ? getMock() : require('./openDb');
/**
 * Insert a new hike
 * @param {string} title the title of the hike
 * @param {string} description the description of the hike
 * @param {number} length the length of the hike
 * @param {number} expectedTime the expectedTime of the hike
 * @param {number} ascent the ascent of the hike
 * @param {string} difficulty the difficulty of the hike
 * @param {number} startPointId the startPointId of the hike
 * @param {number} endPointId the endPointId of the hike
 * @param {number} authorId the authorId of the hike
 * @param {Date} uploadDate the uploadDate of the hike
 * @param {string} gpxFile the gpxFile of the hike
 * @param {string} photoFile the photoFile of the hike
 */
exports.addHike = (title, description, length, expectedTime, ascent, difficulty, startPointId, endPointId, authorId, uploadDate, photoFile) => {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO Hike(title, description, length, expectedTime, ascent, difficulty, startPointId, endPointId, authorId, uploadDate, photoFile) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        db.run(sql, [title, description, length, expectedTime, ascent, difficulty, startPointId, endPointId, authorId, uploadDate, photoFile],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    const gpxFile = `${this.lastID}_${title.replace(/[ \n\t\r]/g, '_')}.gpx`
                    sql = "UPDATE Hike SET gpxFile=? WHERE id=?";
                    db.run(sql, [gpxFile, this.lastID], (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (!photoFile) {
                                const imgUrl = `http://localhost:3001/images/hikes/${this.lastID}_${title.replace(/[ \n\t\r]/g, '_')}.png`
                                sql = "UPDATE Hike SET photoFile=? WHERE id=?";
                                db.run(sql, [imgUrl, this.lastID], (err) => {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve(this.lastID);
                                    }
                                });
                            } else {
                                resolve(this.lastID);
                            }
                        }
                    });
                }
            });
    });
}


const nomiMaiuscoli = (nome) => {

    const v = nome.toLowerCase().split(" ");
    let f = "";
    for (let n of v) {
        const nn = n.charAt(0).toUpperCase() + n.slice(1);
        f = f + " " + nn;
    }
    return f.trim();
}


/**
 * Get hikes from the system (general information)
 */
exports.getHikes = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT Hike.id AS id, Hike.title AS title, Hike.description AS description,Hike.length AS length, Hike.expectedTime as expectedTime, Hike.ascent as ascent, Hike.difficulty as difficulty,"
            + " Hike.uploadDate AS uploadDate, Hike.photoFile AS photoFile,"
            + "User.name AS authorName, User.surname AS authorSurname,User.id AS authorId,Point.latitude as latitude, Point.longitude as longitude,Point.altitude as altitude, Point.city as city,Point.province as province,Point.region as region "
            + " FROM Hike,User,Point "
            + "WHERE Hike.startPointId = Point.id AND Hike.authorId = User.id";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            const hikes = rows.map((r) => (
                {
                    id: r.id,
                    title: r.title,
                    description: r.description,
                    length: r.length,
                    expectedTime: r.expectedTime,
                    ascent: r.ascent,
                    difficulty: r.difficulty,
                    authorName: nomiMaiuscoli(r.authorName),
                    authorSurname: nomiMaiuscoli(r.authorSurname),
                    authorId: r.authorId,
                    uploadDate: r.uploadDate,
                    photoFile: r.photoFile,
                    latitude: r.latitude,
                    longitude: r.longitude,
                    altitude: r.altitude,
                    city: r.city,
                    province: r.province,
                    region: r.region
                }
            ));
            resolve(hikes);
        });
    });
}

/**
 * Get localguide inserted hikes from the system (general information) 
 */
exports.getHikesOfAuthor = (authorId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT Hike.id AS id, Hike.title AS title, Hike.description AS description,Hike.length AS length, Hike.expectedTime as expectedTime, Hike.ascent as ascent, Hike.difficulty as difficulty,"
            + " Hike.uploadDate AS uploadDate, Hike.photoFile AS photoFile,"
            + "User.name AS authorName, User.surname AS authorSurname,User.id AS authorId,Point.latitude as latitude, Point.longitude as longitude,Point.altitude as altitude, Point.city as city,Point.province as province,Point.region as region "
            + " FROM Hike,User,Point "
            + "WHERE Hike.startPointId = Point.id AND Hike.authorId = User.id AND Hike.authorId=?";
        db.all(sql, [authorId], (err, rows) => {
            if (err) {
                reject(err);
            }
            const hikes = rows.map((r) => (
                {
                    id: r.id,
                    title: r.title,
                    description: r.description,
                    length: r.length,
                    expectedTime: r.expectedTime,
                    ascent: r.ascent,
                    difficulty: r.difficulty,
                    authorName: nomiMaiuscoli(r.authorName),
                    authorSurname: nomiMaiuscoli(r.authorSurname),
                    authorId: r.authorId,
                    uploadDate: r.uploadDate,
                    photoFile: r.photoFile,
                    latitude: r.latitude,
                    longitude: r.longitude,
                    altitude: r.altitude,
                    city: r.city,
                    province: r.province,
                    region: r.region
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
        const sql = 'SELECT Hike.gpxFile as gpx,Hike.id AS id, Hike.title AS title, Hike.description AS description, Hike.uploadDate AS uploadDate, Hike.photoFile AS photoFile, Hike.length AS length, Hike.expectedTime AS expectedTime, Hike.ascent AS ascent, Hike.difficulty AS difficulty, Hike.startPointId AS startPointId, Hike.endPointId AS endPointId, User.name AS authorName, User.surname AS authorSurname,User.id AS authorId FROM Hike JOIN User ON Hike.authorId = User.id WHERE Hike.id = ?';
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
                    authorId: r.authorId,
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
exports.getPointsByHikeId = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT Point.id AS id, Point.name AS name, Point.description AS description, Point.type AS type, Point.latitude AS latitude, Point.longitude AS longitude, Point.altitude AS altitude, Point.city AS city, Point.province AS province, Point.region AS region FROM Point " +
            "WHERE id IN( " +
            "SELECT Point.id " +
            "FROM Point " +
            "INNER JOIN Hike ON ((Point.id = Hike.startPointId OR Point.id=Hike.endPointId) AND Hike.id=?) " +
            ") OR " +
            "id IN ( " +
            "SELECT Point.id " +
            "FROM Point " +
            "INNER JOIN HikePoint ON (Point.id=HikePoint.pointId AND HikePoint.hikeId=?) " +
            ")";
        db.all(sql, [id, id], (err, rows) => {
            if (err) {
                reject(err);
            }
            const points = rows.map((r) => (
                {
                    id: r.id,
                    name: r.name,
                    description: r.description,
                    type: r.type,
                    latitude: r.latitude,
                    longitude: r.longitude,
                    altitude: r.altitude,
                    city: r.city,
                    province: r.province,
                    region: r.region
                }
            ));
            resolve(points);
        });
    });
}

/**
 * Get the author of an hike
 * @param {number} id the id of the hike
 */
exports.getHikeAuthor = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT authorId FROM Hike WHERE id = ?';
        db.get(sql, [id], (err, r) => {
            if (err) {
                reject(err);
            } else if (r === undefined)
                resolve(undefined);
            else {
                resolve(r.authorId);
            }
        });
    });
}

/**
 * Get the start/end point infos of an hike
 * @param {number} id the id of the hike
 */
exports.getStartEndPointDistanceData = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT startPointId,endPointId,length FROM Hike WHERE id = ?';
        db.get(sql, [id], (err, r) => {
            if (err) {
                reject(err);
            } else if (r === undefined)
                resolve(undefined);
            else {
                const details = {
                    startPointId: r.startPointId,
                    endPointId: r.endPointId,
                    length: r.length
                };
                resolve(details);
            }
        });
    });
}

/**
 * Get hike existance by hike id 
 * @param {number} id the id of the hike
 */
exports.getHikeCheck = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Hike WHERE id = ?';
        db.get(sql, [id], (err, r) => {
            if (err) {
                reject(err);
            } else if (r === undefined)
                resolve(0);
            else {
                resolve(1);
            }
        });
    });
}