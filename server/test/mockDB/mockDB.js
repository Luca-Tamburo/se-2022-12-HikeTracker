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
        "name" TEXT, "surname"   TEXT, "phoneNumber" TEXT, "hash" TEXT, "salt" TEXT, "verifiedEmail" INTEGER, "confirmationCode" TEXT, PRIMARY KEY("id" AUTOINCREMENT));'

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
        "phoneNumber" TEXT, "photoFile"   TEXT, "pointID" INTEGER, FOREIGN KEY("pointId") REFERENCES "Point"("id")  PRIMARY KEY("id" AUTOINCREMENT));'

        db.run(hut, (err) => {
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
        "sqlite_sequence"];
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


async function createDatabase() {

    return new Promise((resolve, reject) => {
        try {

            createTables();

            // setTimeout(() => {

            //     insertusers();

            // }, 1000);

            resolve('ok')
        } catch (error) {
            reject(error);
        }

    })
};

async function deleteDatabase() {
    return new Promise((resolve, reject) => {
        try {
            deleteAllTables().then(() => {
                resolve('ok');
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = { mockDB: db , createDatabase, deleteDatabase }
