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
const hikePointDao = require('../dao/hikePointDao')
const router = express.Router();
const { check } = require("express-validator"); // validation middleware
const { checksValidation } = require("../utils/validationUtil");
const sessionUtil = require("../utils/sessionUtil");
const isLoggedInLocalGuide = sessionUtil.isLoggedInLocalGuide;
const fs = require('fs');
const { getCityProvinceRegion } = require("../utils/geoUtils");
const { isThisMyHike, isItNearEnough } = require("../utils/editHikesUtils");
const parseGpx = require('parse-gpx');
const path = require('path');

/**
* Post reference point into the system
*/

router.post('/referencePoints',
    isLoggedInLocalGuide,
    check("hikeId").exists().withMessage("This field is mandatory").bail().isInt({ gt: 0 }),
    check("pointsToLink").exists().withMessage("This field is mandatory").bail().isArray({ min: 1 }).withMessage("This field is an array and can't be empty"),
    check("pointsToLink.*.title").exists().withMessage("This field is mandatory").bail().isString(),
    check("pointsToLink.*.latitude").exists().withMessage("This field is mandatory").bail().isNumeric(),
    check("pointsToLink.*.longitude").exists().withMessage("This field is mandatory").bail().isNumeric(),
    checksValidation, async (req, res) => {
        try {
            //Check that the hikeId exists
            let hikeCheck = await hikeDao.getHikeCheck(req.body.hikeId)
            if (hikeCheck === 0) {
                return res.status(404).json({ error: `Hike not found` })
            };

            //Check that this user uploaded the hike
            const userId = req.user.id;
            const isOk = await isThisMyHike(req.body.hikeId, userId);
            if (!isOk)
                return res.status(422).json({ error: `Are you sure you uploaded this hike?` });

            const indexes = []
            //Check that the reference point is not already in the list of points for that hike
            let ref_points = await hikePointDao.getRefPointsByHikeId(req.body.hikeId);
            for (let i in req.body.pointsToLink) {
                indexes.push(i)
                for (let ref_point of ref_points) {
                    if (ref_point.latitude === req.body.pointsToLink[i].latitude && ref_point.longitude === req.body.pointsToLink[i].longitude) {
                        indexes.pop()
                    }
                }
            }

            if (indexes.length == 0) {
                return res.status(422).json({ error: `These points are already a reference point of the hike` });
            }

            //Check that the reference point is close to the hike track points
            //Get the gpx address of the hike
            let gpx = await hikeDao.getGpxByHikeId(req.body.hikeId);
            let trackPoints;
            try {
                //Get gpx content
                let gpxContent = fs.readFileSync(path.join(__dirname, `..//utils/gpxFiles/${gpx}`));
                let track = await parseGpx(gpxContent);
                trackPoints = track.trackPoints;
            } catch (err) { //gpx could be corrupted or the name in the db could be wrong
                return res.status(422).json({ error: `Error while reading the stored gpx, please check the gpx.` });
            }
            let infos = await hikeDao.getStartEndPointDistanceData(req.body.hikeId);
            let length = infos.length;
            let referencePointData = {};
            //For every 5 points in the hike track evaluate distance to the reference point, if near criteria is met close is changed to 1 (break could be included to make code more efficient)
            const indexes2 = []
            for (let i of indexes) {
                referencePointData = {
                    latitude: req.body.pointsToLink[i].latitude,
                    longitude: req.body.pointsToLink[i].longitude
                }
                for (let j = 0; j < trackPoints.length; j += 5) {
                    if (isItNearEnough(trackPoints[j], referencePointData, length)) {
                        if (!indexes2.includes(i)) {
                            indexes2.push(i)
                        }
                    }
                }
            }
            if (indexes2.length == 0) {
                return res.status(422).json({ error: `Reference points are not close enough` })
            };

            for (let i of indexes2) {
                //Obtain city, province, region
                const cpr = await getCityProvinceRegion(req.body.pointsToLink[i].latitude, req.body.pointsToLink[i].longitude);
                //Create point with no altitude
                const pointId = await pointDao.addPoint(req.body.pointsToLink[i].title, "", cpr.type, req.body.pointsToLink[i].latitude, req.body.pointsToLink[i].longitude, 0, cpr.city, cpr.province, cpr.region);
                //Associate point to hike
                await pointDao.addPointHike(req.body.hikeId, pointId)
            }

            return res.status(201).json({ message: "Reference points inserted in the system" });
        } catch (error) {
            res.status(503).json({ error: `Service unavailable` });
        }
    });

module.exports = router;