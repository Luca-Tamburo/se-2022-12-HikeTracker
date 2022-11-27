/*
* -------------------------------------------------------------------- 
*
* Package:         server
* Module:          routes
* File:            hutRoute.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

'use strict'

const express = require('express');
const pointDao = require('../dao/pointDao');
const hutDao = require('../dao/hutDao');
const router = express.Router();
const { check, checksValidation } = require("../utils/validationUtil");

const sessionUtil = require("../utils/sessionUtil");
const isLoggedInLocalGuide = sessionUtil.isLoggedInLocalGuide;

/**
* Put hut into the system
*/

router.post('/hut',
    isLoggedInLocalGuide,
    check("title").exists().withMessage("This field is mandatory").bail().isString(),
    check("photoFile").exists().withMessage("This field is mandatory").bail().isString(),
    check("roomsNumber").exists().withMessage("This field is mandatory").bail().isInt({ min: 0 }),
    check("bedsNumber").exists().withMessage("This field is mandatory").bail().isInt({ min: 0 }),
    check("phoneNumber").exists().withMessage("This field is mandatory").bail()
        .isString().withMessage("This field must be a string (consider the prefix of the phone number)").bail()
        .trim().isLength({ min: 2 }).withMessage("This field is a string and must be from 2 characters").bail()
        .trim().matches(/^[+0-9][0-9 ]+$/).withMessage("This field must contain only numbers, the + for prefixes and spaces"),
    check("latitude").exists().withMessage("This field is mandatory").bail().isNumeric(),
    check("longitude").exists().withMessage("This field is mandatory").bail().isNumeric(),
    check("altitude").exists().withMessage("This field is mandatory").bail().isFloat({ gt: 0 }),
    check("region").exists().withMessage("This field is mandatory").bail().isString(),
    check("province").exists().withMessage("This field is mandatory").bail().isString(),
    check("city").exists().withMessage("This field is mandatory").bail().isString(),
    check("description").exists().withMessage("This field is mandatory").bail().isString(),

    checksValidation, async (req, res) => {
        try {
            //create hut point in db
            let pointId = await pointDao.addPoint(req.body.title, req.body.description, "hut", req.body.latitude, req.body.longitude, req.body.altitude, req.body.city, req.body.province, req.body.region);

            await hutDao.addHut(req.body.roomsNumber, req.body.bedsNumber, "null", req.body.phoneNumber, req.body.photoFile, pointId);

            return res.status(201).json({ message: "Hut inserted in the system" });
        } catch (error) {
            res.status(503).json({ error: `Service unavailable` });
        }
    });

module.exports = router;