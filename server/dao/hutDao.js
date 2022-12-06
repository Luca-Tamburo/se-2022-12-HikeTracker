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

exports.addHut = (title,roomsNumber, bedsNumber, whenIsOpen, phoneNumber, photoFile, website, pointId) => {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO Hut(roomsNumber,bedsNumber,whenIsOpen,phoneNumber,photoFile,website,pointId) VALUES (?,?,?,?,?,?,?)";
        db.run(sql, [roomsNumber, bedsNumber, whenIsOpen, phoneNumber, photoFile, website, pointId], function (err) {
            if (err) {
                reject(err);
            }
            else {

                if (!photoFile) {
                    const imgUrl = `http://localhost:3001/images/huts/${this.lastID}.png`
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

exports.getHutById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Hut WHERE id = ?';
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
                        roomsNumber: r.roomsNumber,
                        bedsNumber: r.bedsNumber,
                        whenIsOpen: r.whenIsOpen,
                        phoneNumber: r.phoneNumber,
                        photoFile: r.photoFile,
                        website: r.website,
                        pointId: r.pointId
                    }
                );
            }
        });
    });
}