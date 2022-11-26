
'use strict';
const { iAmTesting } = require('../test/mockDB/iAmTesting');
const getMock = () => {
    //faccio il require del mock solo se sto in testing
    const { mockDB } = require('../test/mockDB/mockDB');
    return mockDB;
}
const db = iAmTesting() ? getMock() : require('./openDb');
/**
 * Insert a new point
 * @param {string} name the name of the point
 * @param {string} description the description of the point
 * @param {string} type the type of the point
 * @param {number} latitude the latitude of the point
 * @param {number} longitude the longitude of the point
 * @param {number} altitude the altitude of the point
 * @param {string} city the city of the point
 * @param {string} province the province of the point
 * @param {string} region the region of the point
 */
exports.addPoint = (name, description, type, latitude, longitude, altitude, city, province, region) => {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO Point(name,description,type,latitude,longitude,altitude,city,province,region) VALUES (?,?,?,?,?,?,?,?,?)";
        db.run(sql, [name, description, type, latitude, longitude, altitude, city, province, region], function (err) {
            if (err) {
                reject(err);
            }
            else
                resolve(this.lastID);
        }
        );
    });
}

exports.addPointHike = (hikeId, pointId) => {
    return new Promise(async (resolve, reject) => {
        let sql = "INSERT INTO HikePoint(hikeId,pointId) VALUES (?,?)";
        db.run(sql, [hikeId, pointId], (err) => {
            if (err) {
                reject(err);
            } else
                resolve(this.lastId);
        });
    });
}

/**
 * Get point by id
 */
 exports.getPointById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Point WHERE id = ?';
        db.get(sql, [id], (err, r) => {
            if (err) {
                reject(err);
            }
            else if (r === undefined)
                resolve(undefined);
            else {
                resolve(
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
                );
            }
        });
    });
}

