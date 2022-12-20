/*
* -------------------------------------------------------------------- 
*
* Package:         server
* Module:          routes
* File:            hikePerformanceRoute.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

'use strict'

const express = require('express');
const hikeDao = require('../dao/hikeDao');
const hikePerformanceDao = require('../dao/hikePerformanceDao');
const router = express.Router();
const { check, checksValidation } = require("../utils/validationUtil");
const sessionUtil = require("../utils/sessionUtil");
const isLoggedInHiker = sessionUtil.isLoggedInHiker;
const dayjs = require("dayjs");
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

router.get('/myCompletedHikes',
    isLoggedInHiker,
    checksValidation,
    async (req, res) => {
        try {

            //se sono loggato come hiker, mi devi dare le informazioni sulle hike che ho concluso
//            const hikeId = parseInt(req.params.hikeId);
            const userId = req.user.id;
            let returnData = {};
            const hikes = await hikeDao.getCompletedHikesDetails(userId);

            return res.status(200).json(hikes); //Return object with all the information
        } catch (error) {
            res.status(503).json({ error: `Service unavailable` });
        }
    }
)

module.exports = router;