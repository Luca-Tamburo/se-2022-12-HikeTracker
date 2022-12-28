/*
* -------------------------------------------------------------------- 
*
* Package:         server
* Module:          routes
* File:            hikePoint.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

'use strict'

const express = require('express');
const hikeDao = require('../dao/hikeDao');
const pointDao = require('../dao/pointDao');
const router = express.Router();
const { check } = require("express-validator"); // validation middleware
const { checksValidation } = require("../utils/validationUtil");
const sessionUtil = require("../utils/sessionUtil");
const isLoggedInLocalGuide = sessionUtil.isLoggedInLocalGuide;
const fs = require('fs');
const { getCityProvinceRegion } = require("../utils/geoUtils");
const { isThisMyHike } = require("../utils/editHikesUtils");

/**
* Post reference point into the system
*/

router.post('/referencePoint',
    isLoggedInLocalGuide,
    check("hikeId").exists().withMessage("This field is mandatory").bail().isInt({ gt: 0 }),
    check("title").exists().withMessage("This field is mandatory").bail().isString(),
    check("description").exists().withMessage("This field is mandatory").bail().isString(), 
    check("latitude").exists().withMessage("This field is mandatory").bail().isNumeric(),
    check("longitude").exists().withMessage("This field is mandatory").bail().isNumeric(),
    checksValidation, async (req, res) => {
        try {
            //Check that this user uploaded the hike
            const userId = req.user.id;
            const isOk = await isThisMyHike(hikeId, userId);
            if (!isOk)
                return res.status(422).json({ error: `Are you sure you uploaded this hike?` });

            //Check that the hikeId exists
            let hikeCheck = await hikeDao.getHikeCheck(req.body.hikeId)
            
            if (hikeCheck === 0) {
                return res.status(404).json({ error: `Hike not found` })
            };
            
            //Get the gpx of the hike
            let gpx = await hikeDao.getGpxByHikeId(req.body.hikeId);

            //Check that the reference point is close to the hike track points
            //TODO

            //Obtain city, province, region
            const cpr = await getCityProvinceRegion(req.body.latitude, req.body.longitude);
            //Create point with no type or altitude (?)
            const pointId = await pointDao.addPoint(req.body.title, req.body.description, cpr.type, req.body.latitude, req.body.longitude, 0, cpr.city, cpr.province, cpr.region);
            //Associate point to hike
            await pointDao.addPointHike(req.body.hikeId, pointId)
            
            return res.status(201).json({ message: "Reference point inserted in the system"});
        } catch (error) {
            res.status(503).json({ error: `Service unavailable` });
        }
    });

module.exports = router;