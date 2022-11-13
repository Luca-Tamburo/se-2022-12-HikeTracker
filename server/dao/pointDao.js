
'use strict';

//DB access module
const sqlite = require('sqlite3');

//Open the database
const db = new sqlite.Database('hikeTracker.sqlite3', (err) => {
    if (err) throw err;
});

exports.addPoint = (name) => {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO Point(name) VALUES (?)";
        db.run(sql, [name], function (err) {
            if (err) {
                reject(err);
            }
            else
                resolve(this.lastID);
        }
        );
    });
}
/*
exports.createFilm = (film, userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO films (title, favorite, watchdate, rating, user) VALUES (?, ?, ?, ?, ?)';
        db.run(sql, [film.title, film.favorite ? 1 : 0, film.date ? dayjs(film.date).format('YYYY-MM-DD') : null, film.rating, userId], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};
*/

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


