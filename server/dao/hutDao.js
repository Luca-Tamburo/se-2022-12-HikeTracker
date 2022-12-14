'use strict';
const { iAmTesting } = require('../test/mockDB/iAmTesting');
const getMock = () => {
    //faccio il require del mock solo se sto in testing
    const { mockDB } = require('../test/mockDB/mockDB');
    return mockDB;
}
const db = iAmTesting() ? getMock() : require('./openDb');

/**
 * Insert a new hut
 * @param {number} roomsNumber how many rooms in there
 * @param {number} bedsNumber how many beds in total
 * @param {string} whenIsOpen ...
 * @param {string} phoneNumber ...
 * @param {string} photoFile the link of a photoFile of the hut
 * @param {string} website the website of the hut
 * @param {number} pointId the ID of the point that identifies where the hut is
 */

exports.addHut = (title, roomsNumber, bedsNumber, whenIsOpen, phoneNumber, photoFile, website, pointId) => {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO Hut(roomsNumber,bedsNumber,whenIsOpen,phoneNumber,photoFile,website,pointId) VALUES (?,?,?,?,?,?,?)";
        db.run(sql, [roomsNumber, bedsNumber, whenIsOpen, phoneNumber, photoFile, website, pointId], function (err) {
            if (err) {
                reject(err);
            }
            else {

                if (!photoFile) {
                    const imgUrl = `http://localhost:3001/images/huts/${this.lastID}_${title.replace(/[ \n\t\r]/g, '_')}.png`
                    sql = "UPDATE Hut SET photoFile=? WHERE id=?";
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

        }
        );
    });
}

exports.getHuts = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT Hut.id as id,Point.name as name FROM Hut,Point WHERE Hut.pointId=Point.id AND type =?';
        db.all(sql, ["hut"], (err, rows) => {
            if (err) {
                reject(err);
            }
            const huts = rows.map((r) => (
                {
                    id: r.id,
                    name: r.name
                }
            ));
            resolve(huts);
        });
    });
}

/**
 * Get huts from the system (general information)
 */
 exports.getAllHuts = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT Hut.id AS id, Hut.roomsNumber AS roomsNumber, Hut.bedsNumber AS bedsNumber, Hut.photoFile AS photoFile, Point.name AS name, Point.description AS description, Point.altitude AS altitude, Point.latitude AS latitude, Point.longitude AS longitude, Point.city AS city, Point.province AS province, Point.region AS region FROM Hut,Point WHERE Hut.pointId=Point.id AND Point.type =?';
        db.all(sql, ["hut"], (err, rows) => {
            if (err) {
                reject(err);
            }
            const huts = rows.map((r) => (
                {
                    id: r.id,
                    name: r.name,
                    description: r.description,
                    roomsNumber: r.roomsNumber,
                    bedsNumber: r.bedsNumber,
                    photoFile: r.photoFile,
                    altitude: r.altitude,
                    latitude: r.latitude, 
                    longitude: r.longitude,
                    city: r.city,
                    province: r.province, 
                    region: r.region
                }
            ));
            resolve(huts);
        });
    });
}

/**
 * Get hut detailed information by hut id
 */
exports.getDetailsByHutId = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT Hut.id AS id, Hut.phoneNumber AS phoneNumber, Hut.website AS website, Hut.whenIsOpen AS whenIsOpen, Hut.roomsNumber AS roomsNumber, Hut.bedsNumber AS bedsNumber, Hut.photoFile AS photoFile, Point.name AS name, Point.description AS description, Point.altitude AS altitude, Point.latitude AS latitude, Point.longitude AS longitude, Point.city AS city, Point.province AS province, Point.region AS region FROM Hut,Point WHERE Hut.pointId=Point.id AND Hut.id =?';
        db.get(sql, [id], (err, r) => {
            if (err) {
                reject(err);
            } else if (r === undefined)
                resolve(undefined);
            else {
                const hut =
                {
                    id: r.id,
                    name: r.name,
                    description: r.description,
                    roomsNumber: r.roomsNumber,
                    bedsNumber: r.bedsNumber,
                    photoFile: r.photoFile,
                    altitude: r.altitude,
                    latitude: r.latitude,
                    longitude: r.longitude,
                    website: r.website,
                    whenIsOpen: r.whenIsOpen,
                    phoneNumber: r.phoneNumber,
                    city: r.city,
                    province: r.province, 
                    region: r.region
                }
                resolve(hut);
            }
        });
    });
}