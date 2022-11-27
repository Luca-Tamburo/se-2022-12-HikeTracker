/*
* -------------------------------------------------------------------- 
*
* Package:         server
* Module:          routes
* File:            pointRoute.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

'use strict'

const express = require('express');
const pointDao = require('../dao/pointDao');
const router = express.Router();
const { check, checksValidation } = require("../utils/validationUtil");

const sessionUtil = require("../utils/sessionUtil");
const isLoggedInLocalGuide = sessionUtil.isLoggedInLocalGuide;

/**
 * Put parking point into the system
 */

router.post('/parking',
    isLoggedInLocalGuide,
    check("title").exists().withMessage("This field is mandatory").bail().isString(),
    check("description").exists().withMessage("This field is mandatory").bail().isString(),
    check("latitude").exists().withMessage("This field is mandatory").bail().isNumeric(),
    check("longitude").exists().withMessage("This field is mandatory").bail().isNumeric(),
    check("altitude").exists().withMessage("This field is mandatory").bail().isFloat({ gt: 0 }),
    check("city").exists().withMessage("This field is mandatory").bail().isString(),
    check("province").exists().withMessage("This field is mandatory").bail().isString(),
    check("region").exists().withMessage("This field is mandatory").bail().isString(),
    checksValidation, async (req, res) => {
        try {
            //create parking point in db
            await pointDao.addPoint(req.body.title, req.body.description, "parking lot", req.body.latitude, req.body.longitude, req.body.altitude, req.body.city, req.body.province, req.body.region);
            return res.status(201).json({ message: "Parking inserted in the system" });
        } catch (error) {
            res.status(503).json({ error: `Service unavailable` });
        }
    });


module.exports = router;