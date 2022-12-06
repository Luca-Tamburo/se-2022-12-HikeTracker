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
                    console.log("ciao"+this.lastID)
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