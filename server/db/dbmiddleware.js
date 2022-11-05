/*
* -------------------------------------------------------------------- 
*
* Package:         server
* Module:          db
* File:            middleware.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/
'use strict';

//DB access module
const sqlite = require('sqlite3');

//Open the database

//INSERT DB NAME!!!!!
const db = new sqlite.Database('', (err) => {
    if (err) throw err;
});

module.exports = db;