'use strict';

const sqlite = require('sqlite3');
const dbname = "./test/mockDB/mockHikeTracker.sqlite3";
const db = new sqlite.Database(dbname, (err) => {
    if (err) throw err;
});
db.get("PRAGMA busy_timeout = 10000");

const createDatabase = async () => {
    await newUser();
    await newUserPreferences();
    await newPoint();
    await newParkingLot();
    await newHut();
    await newHikePoint();
    await newHike();
    await addUser("aldobaglio@gmail.com", "aldobaglio", "localGuide", "aldo", "baglio", "M", "+393315658745", "password", 1);
    await addUser("antonioconte@gmail.com", "antonioconte", "localGuide", "antonio", "conte", "M", "+393564896545", "password", 0);
}

const deleteDatabase = async () => {
    await newUser();
    await newUserPreferences();
    await newPoint();
    await newParkingLot();
    await newHut();
    await newHikePoint();
    await newHike();
    await deleteTables();

}

const deleteTables = () => {

    return Promise.resolve(Promise.all([
        new Promise(async (resolve, reject) => {
            const sql = "DELETE FROM UserPreferences";
            db.run(sql, (err) => {
                if (err) {
                    reject(err);
                } else
                    resolve('done');
            });
        }),
        new Promise(async (resolve, reject) => {
            const sql = "DELETE FROM HikePoint";
            db.run(sql, (err) => {
                if (err) {
                    reject(err);
                } else
                    resolve('done');
            });
        }),
        new Promise(async (resolve, reject) => {
            const sql = "DELETE FROM Hut";
            db.run(sql, (err) => {
                if (err) {
                    reject(err);
                } else
                    resolve('done');
            });
        }),
        new Promise(async (resolve, reject) => {
            const sql = "DELETE FROM ParkingLot";
            db.run(sql, (err) => {
                if (err) {
                    reject(err);
                } else
                    resolve('done');
            });
        }),
        new Promise(async (resolve, reject) => {
            const sql = "DELETE FROM Hike";
            db.run(sql, (err) => {
                if (err) {
                    reject(err);
                } else
                    resolve('done');
            });
        }),
        new Promise(async (resolve, reject) => {
            const sql = "DELETE FROM Point";
            db.run(sql, (err) => {
                if (err) {
                    reject(err);
                } else
                    resolve('done');
            });
        }),
        new Promise(async (resolve, reject) => {
            const sql = "DELETE FROM User";
            db.run(sql, (err) => {
                if (err) {
                    reject(err);
                } else
                    resolve('done');
            });
        }),
        new Promise(async (resolve, reject) => {
            const sql = "DELETE FROM sqlite_sequence";
            db.run(sql, (err) => {
                if (err) {
                    reject(err);
                } else
                    resolve('done');
            });
        }),
    ]));

}

function newUser() {
    return new Promise((resolve, reject) => {
        const sql = "CREATE TABLE IF NOT EXISTS User ( " +
            "id	INTEGER, " +
            "email	TEXT, " +
            "username	TEXT, " +
            "role	TEXT, " +
            "name	TEXT, " +
            "surname	TEXT, " +
            "gender	TEXT, " +
            "phoneNumber	TEXT, " +
            "hash	TEXT, " +
            "salt	TEXT, " +
            "verifiedEmail	INTEGER, " +
            "confirmationCode	TEXT, " +
            "PRIMARY KEY(id AUTOINCREMENT) )";
        db.run(sql, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve('done');
        });
    });
}

const addUser = async (email, username, role, name, surname, gender, phoneNumber, password, verified) => {

    //creo sale
    const crypto = require('crypto');

    const nomiMaiuscoli = (nome) => {

        const v = nome.toLowerCase().split(" ");
        let f = "";
        for (let n of v) {
            const nn = n.charAt(0).toUpperCase() + n.slice(1);
            f = f + " " + nn;
        }
        return f.trim();
    }

    const salt = crypto.randomBytes(8).toString('hex');
    //creo hash
    const getHashPass = async (pass) => {
        return new Promise((resolve, reject) => {
            crypto.scrypt(pass, salt, 32, (err, hashedPassword) => {
                resolve(hashedPassword.toString('hex'));
            });

        });
    }
    const hashedPassword = await getHashPass(password);
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO user(email, username, role, name, surname,gender, phoneNumber, hash, salt,verifiedEmail) VALUES (?,?,?,?,?,?,?,?,?,?)";
        db.run(sql, [email, username, role, name ? nomiMaiuscoli(name) : name, surname ? nomiMaiuscoli(surname) : surname, gender, phoneNumber, hashedPassword, salt, verified],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
    });
}

function newUserPreferences() {
    return new Promise((resolve, reject) => {
        const sql =
            "CREATE TABLE IF NOT EXISTS UserPreferences ( " +
            "id	INTEGER, " +
            "duration	NUMERIC, " +
            "altitude	NUMERIC, " +
            "ascent	NUMERIC, " +
            "length	NUMERIC, " +
            "difficulty	INTEGER, " +
            "userId	INTEGER NOT NULL, " +
            "FOREIGN KEY(userId) REFERENCES User(id), " +
            "PRIMARY KEY(id AUTOINCREMENT) " +
            ")";

        db.run(sql, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve('done');
        });
    });
}

function newPoint() {
    return new Promise((resolve, reject) => {
        const sql =
            "CREATE TABLE IF NOT EXISTS Point ( " +
            "id	INTEGER, " +
            "name	TEXT, " +
            "description	TEXT, " +
            "type	TEXT, " +
            "latitude	NUMERIC, " +
            "longitude	NUMERIC, " +
            "altitude	NUMERIC, " +
            "city	TEXT, " +
            "province	TEXT, " +
            "region	TEXT, " +
            "PRIMARY KEY(id AUTOINCREMENT) " +
            ")";
        db.run(sql, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve('done');
        });
    });
}

function newParkingLot() {
    return new Promise((resolve, reject) => {
        const sql =
            "CREATE TABLE IF NOT EXISTS ParkingLot ( " +
            "id	INTEGER, " +
            "capacity	INTEGER, " +
            "pointId	INTEGER NOT NULL, " +
            "FOREIGN KEY(pointId) REFERENCES Point(id), " +
            "PRIMARY KEY(id) )";
        db.run(sql, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve('done');
        });
    });
}

function newHut() {
    return new Promise((resolve, reject) => {
        const sql =
            "CREATE TABLE IF NOT EXISTS Hut ( " +
            "id	INTEGER, " +
            "roomsNumber	INTEGER, " +
            "bedsNumber	INTEGER, " +
            "whenIsOpen	TEXT, " +
            "phoneNumber	TEXT, " +
            "photoFile	TEXT, " +
            "website	TEXT, " +
            "pointId	INTEGER NOT NULL, " +
            "FOREIGN KEY(pointId) REFERENCES Point(id), " +
            "PRIMARY KEY(id AUTOINCREMENT) ) "

            ;
        db.run(sql, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve('done');
        });
    });
}

function newHikePoint() {
    return new Promise((resolve, reject) => {
        const sql =
            "CREATE TABLE IF NOT EXISTS HikePoint ( " +
            "hikeId	INTEGER, " +
            "pointId	INTEGER, " +
            "FOREIGN KEY(hikeId) REFERENCES Hike(id), " +
            "FOREIGN KEY(pointId) REFERENCES Point(id), " +
            "PRIMARY KEY(hikeId,pointId) " +
            ")";
        db.run(sql, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve('done');
        });
    });
}

function newHike() {
    return new Promise((resolve, reject) => {
        const sql =
            "CREATE TABLE IF NOT EXISTS Hike ( " +
            "id	INTEGER, " +
            "title	TEXT, " +
            "description	TEXT, " +
            "length	NUMERIC, " +
            "expectedTime	NUMERIC, " +
            "ascent	NUMERIC, " +
            "difficulty TEXT, " +
            "startPointId	INTEGER NOT NULL, " +
            "endPointId	INTEGER NOT NULL, " +
            "authorId	INTEGER NOT NULL, " +
            "uploadDate	TEXT, " +
            "gpxFile	TEXT, " +
            "photoFile	TEXT, " +
            "PRIMARY KEY(id AUTOINCREMENT), " +
            "FOREIGN KEY(startPointId) REFERENCES Point(id), " +
            "FOREIGN KEY(authorId) REFERENCES User(id), " +
            "FOREIGN KEY(endPointId) REFERENCES Point(id) " +
            ")";
        db.run(sql, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve('done');
        });
    });
}

module.exports = { mockDB: db, createDatabase, deleteDatabase }
