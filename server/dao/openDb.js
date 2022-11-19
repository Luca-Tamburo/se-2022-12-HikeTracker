'use strict';

//DB access module
const sqlite = require('sqlite3');

//Open the database
const db = new sqlite.Database('hikeTracker.sqlite3', (err) => {
    if (err) throw err;
});

module.exports = db;