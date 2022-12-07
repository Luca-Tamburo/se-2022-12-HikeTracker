/*
* -------------------------------------------------------------------- 
*
* Package:         server
* Module:          mockDB
* File:            mockDB.js
* Function:        Creates a copy of the db to execute tests on
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//imports
const sqlite = require('sqlite3');
//const path = require('path');
// const { isPrimitive } = require('util');
// const { ok } = require('assert');
// const { table } = require('console');

const db = new sqlite.Database('./test/mockDB/mockHikeTracker.db', (err) => {
    if (err) throw err;
})

function createTables() {

    db.serialize(() => {
        const hike = 'CREATE TABLE IF NOT EXISTS "Hike" ( "id"	INTEGER NOT NULL, "title"   TEXT, "description" TEXT, "length"  NUMBER, \
                     "expectedTime" NUMBER, "ascent"    NUMBER, "difficulty"   INTEGER, "startPointId"   INTEGER, "endPointId"   INTEGER, \
                     "authorId" INTEGER,  "uploadDate"  TEXT , "gpxFile" TEXT, "photoFile" TEXT, FOREIGN KEY("startPointId") REFERENCES "Point"("id"), \
                     FOREIGN KEY("endPointId") REFERENCES "Point"("id"),  FOREIGN KEY("authorId") REFERENCES "User"("id"), PRIMARY KEY("id" AUTOINCREMENT));'

        db.run(hike, (err) => {
            if (err) {
                throw err;
            }
        })

        const hikePoint = 'CREATE TABLE IF NOT EXISTS "HikePoint" ( "hikeId"	INTEGER NOT NULL, "pointId"   INTEGER NOT NULL, \
                        PRIMARY KEY("hikeId", "pointId"));'

        db.run(hikePoint, (err) => {
            if (err) {
                throw err;
            }
        })

        const point = 'CREATE TABLE IF NOT EXISTS "Point" ( "id"	INTEGER NOT NULL, "name"   TEXT, "description" TEXT, "type" TEXT, \
                    "longitude" NUMBER, "latitude"   NUMBER, "altitude" NUMBER, "city" TEXT, "province" TEXT, "region" TEXT, PRIMARY KEY("id" AUTOINCREMENT));'

        db.run(point, (err) => {
            if (err) {
                throw err;
            }
        })

        const user = 'CREATE TABLE IF NOT EXISTS "User" ( "id"	INTEGER NOT NULL, "email"   TEXT, "username" TEXT, "role" TEXT, \
        "name" TEXT, "surname"   TEXT, "gender"   TEXT, "phoneNumber" TEXT, "hash" TEXT, "salt" TEXT, "verifiedEmail" INTEGER, "confirmationCode" TEXT, PRIMARY KEY("id" AUTOINCREMENT));'

        db.run(user, (err) => {
            if (err) {
                throw err;
            }
        })

        const userPreference = 'CREATE TABLE IF NOT EXISTS "UserPreference" ( "id"	INTEGER NOT NULL, "duration"   INTEGER, \
         "altitude" INTEGER, "ascent" INTEGER, "length" INTEGER, "difficulty"   INTEGER, "userId" INTEGER, \
        FOREIGN KEY("userId") REFERENCES "User"("id"), PRIMARY KEY("id" AUTOINCREMENT));'

        db.run(userPreference, (err) => {
            if (err) {
                throw err;
            }
        })

        const hut = 'CREATE TABLE IF NOT EXISTS "Hut" ( "id"	INTEGER NOT NULL, "roomsNumber"   INTEGER, "bedsNumber" INTEGER, "whenIsOpen" TEXT, \
        "phoneNumber" TEXT, "photoFile"   TEXT, "website"   TEXT, "pointId" INTEGER, FOREIGN KEY("pointId") REFERENCES "Point"("id")  PRIMARY KEY("id" AUTOINCREMENT));'

        db.run(hut, (err) => {
            if (err) {
                throw err;
            }
        })

        const parkingLot = 'CREATE TABLE IF NOT EXISTS "ParkingLot" ( "id"	INTEGER NOT NULL, "capacity"   INTEGER, \
        "pointId" INTEGER, FOREIGN KEY("pointId") REFERENCES "Point"("id")  PRIMARY KEY("id" AUTOINCREMENT));'

        db.run(parkingLot, (err) => {
            if (err) {
                throw err;
            }
        })
    })
}

async function deleteAllTables() {
    const sql = "DROP TABLE "
    const tables = ["Hike",
        "HikePoint",
        "Point",
        "User",
        "UserPreference",
        "Hut",
        "ParkingLot"];
    return new Promise((resolve, reject) => {

        db.serialize(() => {
            tables.forEach((tbl) => {
                db.run(sql + tbl, (err) => {
                    if (err) {
                        reject(err);
                    }
                })
            })
            resolve('ok');
        })
    })
}

function insertusers() {

    db.serialize(() => {
        const insertUsers = "insert into User (email,username,role,name,surname,gender,phoneNumber,hash,salt,verifiedEmail,confirmationCode)" +
            "VALUES('aldobaglio@gmail.com','aldobaglio','localGuide','aldo','baglio','M','+393315658745','63f764abe1c4f20a200f680f27a292d51fce965bdf40a6d972f85f8309e05178'," +
            "'W4GgESsg4v30NOa8','1','')"

        db.run(insertUsers, (err) => {
            if (err) {
                throw err;
            }
        })

        const insertUser1 = "insert into User (email,username,role,name,surname,gender,phoneNumber,hash,salt,verifiedEmail,confirmationCode)" +
            "VALUES('antonioconte@gmail.com','antonioconte','localGuide','antonio','conte','M','+393564896545','4a639e591c827bb50c35a3449db284f3719f9daff031cffb5bb99283f0d8f7e1'," +
            "'72c88350f92f1787','0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudG9uaW9jb2xlbGxpMTk5OEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFudG9jb2xlIn0.Vq9N8p9_6t-2yXJSKWzf4gm44TQ0k0zZJiA87Sh8Oog')"

        db.run(insertUser1, (err) => {
            if (err) {
                throw err;
            }
        })
    })
}



async function createDatabase() {

    return new Promise((resolve, reject) => {
        try {

            createTables();
            insertusers();


            resolve('ok')
        } catch (error) {
            reject(error);
        }

    })
};

async function deleteDatabase() {
    return new Promise(async (resolve, reject) => {
        try {
            await deleteAllTables().then(() => {
                resolve('ok');
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = { mockDB: db, createDatabase, deleteDatabase }
