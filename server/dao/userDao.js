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


const crypto = require('crypto');

/**
 * Get the user info to put in the cookie, given the id
 * @param {number} id the id of the user
 */
exports.getUserById = (db, id) => {
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
                    role: row.role
                }
                resolve(user);
            }
        });
    });
};

exports.getUserAllInfosById = (db, id) => {
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
* Get the user,if exists, given the email and password. This data will be inserted in the response of login API
* @param {string} email the email of the user to check
* @param {string} password the password of the user to check
*/
exports.getUser = (db, email, password) => {
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

/**
 * Get the user id, given the email
 * @param {string} email the email of the user
 */
exports.getUserByEmail = (db, email) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id FROM user WHERE email = ?';
        db.get(sql, [email], (err, row) => {
            if (err) {
                reject(err);
            }
            else if (row === undefined)
                resolve(undefined);
            else {
                resolve(row.id);
            }
        });
    });
};

/**
* Get the user id, given the username
* @param {string} username the email of the user
*/
exports.getUserByUsername = (db, username) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id FROM user WHERE username = ?';
        db.get(sql, [username], (err, row) => {
            if (err) {
                reject(err);
            }
            else if (row === undefined)
                resolve(undefined);
            else {
                resolve(row.id);
            }
        });
    });
};

/**
 * Insert a new user
 * @param {string} email the user email
 * @param {string} username the user username
 * @param {string} role the user role
 * @param {string} name the user name
 * @param {string} surname the user surname
 * @param {string} phoneNumber the user phoneNumber
 * @param {string} password the user password
 * @param {string} confirmationCode the user confirmationCode
 */
exports.addUser = (db, email, username, role, name, surname, phoneNumber, password, confirmationCode) => {
   
    //creo sale
    const salt = crypto.randomBytes(8).toString('hex');
    //creo hash
    crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
        if (err) reject(err);
        return new Promise(async (resolve, reject) => {
            let sql = "INSERT INTO user(email, username, role, name, surname, phoneNumber, hash, salt,confirmationCode,verifiedEmail) VALUES (?,?,?,?,?,?,?,?,?,?)";
            db.run(sql, [email, username, role, name, surname, phoneNumber, hashedPassword.toString('hex'), salt, confirmationCode, 0], (err) => {
                if (err) {
                    reject(err);
                } 
                    resolve(this.lastId);
            });
        });
    })
}


/**
* Activate a user, given the confirmationCode
* @param {string} confirmationCode the email of the user
*/
exports.activateUser = (db, confirmationCode) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT id FROM user WHERE confirmationCode=?';
        db.get(sql, [confirmationCode], (err, row) => {
            if (err) {
                reject(err);
            }
            else if (row === undefined) {
                resolve(false);
            }
            sql = 'UPDATE user SET confirmationCode=?,verifiedEmail=? WHERE confirmationCode = ?';
            db.run(sql, [undefined, 1, confirmationCode], (err) => {
                if (err) {
                    reject(err);
                } else
                    resolve(true);
            });
        });
    });
};

/**
* Delete a user, given the username. FOR TESTING
* @param {string} username the username of the user
*/
exports.deleteUser = (db, username) => {

    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM user WHERE username = ?`;
        db.run(sql, [username], function (err) {
            if (err)
                reject(err);
            else
                resolve(1);
        });
    });
}