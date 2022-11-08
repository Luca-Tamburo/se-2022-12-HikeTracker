/*
* -------------------------------------------------------------------- 
*
* Package:         server
* Module:          dao
* File:            userDao.js
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
 * Get the user info, given the id
 * @param {number} id the id of the user
 */
exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM user WHERE id = ?';
        db.get(sql, [id], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({ error: 'User not found.' });
            else {
                const user = {
                    id: row.id,
                    email: row.email,
                    username: row.username,
                    name: row.name,
                    surname: row.surname,
                    role: row.role,
                    phoneNumber: row.phoneNumber
                }
                resolve(user);
            }
        });
    });
};

/**
* Get the user,if exists, given the email and password
* @param {string} email the email of the user to check
* @param {string} password the password of the user to check
*/
exports.getUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM user WHERE email = ?';
        db.get(sql, [email], (err, row) => {

            if (err) { reject(err); }
            else if (row === undefined) { resolve(false); }
            else {
                const user = {
                    id: row.id,
                    email: row.email,
                    username: row.username,
                    name: row.name,
                    surname: row.surname,
                    role: row.role,
                    phoneNumber: row.phoneNumber
                }
                const salt = row.salt;
                crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
                    if (err) reject(err);
                    const passwordHex = Buffer.from(row.hash, 'hex');
                    if (!crypto.timingSafeEqual(passwordHex, hashedPassword))
                        resolve(false);
                    if (!row.verifiedEmail) //if the user did not confirm his email
                        resolve({ id: -1 })
                    else resolve(user);
                });
            }
        });
    });
};