/*
* -------------------------------------------------------------------- 
*
* Package:         server
* File:            indexTest.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/


// This file exists for the sole purpose of end to end testing, if you somehow end up here while not testing you did something wrong

'use strict';


const { setTesting } = require('./test/mockDB/iAmTesting');
setTesting(1);
const { createDatabase, deleteDatabase } = require('./test/mockDB/mockDB');
const cleanDb = async () => {
    await deleteDatabase();
    await createDatabase();
}

cleanDb();
const app = require('./utils/appUtil');

