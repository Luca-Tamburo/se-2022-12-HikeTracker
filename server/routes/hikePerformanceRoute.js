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
            const userId = req.user.id;
            const hikes = await hikePerformanceDao.getCompletedHikesDetails(userId);

            return res.status(200).json(hikes); //Return object with all the information
        } catch (error) {
            console.log(error)
            res.status(503).json({ error: `Service unavailable` });
        }
    }
)

router.get('/myCompletedHikeTimes/:hikeId',
    check('hikeId').isInt({ gt: 0 }).withMessage('hikeId format is wrong'),
    isLoggedInHiker,
    checksValidation,
    async (req, res) => {
        try {

            const hikeId = parseInt(req.params.hikeId);
            const userId = req.user.id;
            const hike = await hikeDao.getDetailsByHikeId(hikeId);

            if (hike === undefined)
                return res.status(404).json({ error: `Hike not found` });

            //prendi tutte le hikes :hikeid completate da quell'utente
            const hikes = await hikePerformanceDao.getCompletedHikeTimes(hikeId,userId);

            return res.status(200).json(hikes); //Return object with all the information
        } catch (error) {
            console.log(error)
            res.status(503).json({ error: `Service unavailable` });
        }
    }
)


module.exports = router;