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
const hutDao = require('../dao/hutDao');
const router = express.Router();
const { check, checksValidation } = require("../utils/validationUtil");
const { photoUrlValidator } = require("../utils/hutUtils");
const { getCityProvinceRegion } = require("../utils/geoUtils");
const fs = require('fs');

const sessionUtil = require("../utils/sessionUtil");
const isLoggedInLocalGuide = sessionUtil.isLoggedInLocalGuide;

/**
* Put hut into the system
*/

router.post('/hut',
    isLoggedInLocalGuide,
    check("title").exists().withMessage("This field is mandatory").bail().isString(),
    check("photoFile").exists().optional({ checkFalsy: true }).isString(),
    check("roomsNumber").exists().withMessage("This field is mandatory").bail().isInt({ min: 0 }),
    check("bedsNumber").exists().withMessage("This field is mandatory").bail().isInt({ min: 0 }),
    check("phoneNumber").exists().withMessage("This field is mandatory").bail()
        .isString().withMessage("This field must be a string (consider the prefix of the phone number)").bail()
        .trim().isLength({ min: 2 }).withMessage("This field is a string and must be from 2 characters").bail()
        .trim().matches(/^[+0-9][0-9 ]+$/).withMessage("This field must contain only numbers, the + for prefixes and spaces"),
    check("latitude").exists().withMessage("This field is mandatory").bail().isNumeric(),
    check("longitude").exists().withMessage("This field is mandatory").bail().isNumeric(),
    check("altitude").exists().withMessage("This field is mandatory").bail().isFloat({ gt: 0 }),
    check("description").exists().withMessage("This field is mandatory").bail().isString(),
    check("website").exists().optional({ checkFalsy: true }).isString(),

    checksValidation, async (req, res) => {
        try {

            //controllo che sia stato inviato un file nello spazio per la foto oppure che sia stato scritto qualcosa nel campo photofile
            if ((!req.body.photoFile || req.body.photoFile === undefined) && (!req.files || req.files.Image === undefined)) {
                return res.status(422).json({ error: `No image sent` });
            }

            ////////////////////////////////////////// CONTROLLI APPROFONDITI SULLA FOTO DA INVIARE //////////////////////

            //controllo se lo url è utilizzabile
            let urlValid = undefined; //prima -1
            if (req.body.photoFile && req.body.photoFile !== undefined) { //qui entro se ho qualcosa nell'url
                //controllo che url sia valido
                urlValid = await photoUrlValidator(req.body.photoFile);
            }

            //controllo se immagine è utilizzabile
            let uploadedImage = undefined; //prima -1
            if (req.files && req.files.Image !== undefined) { //qui entro se ho qualcosa nell'immagine
                const type = (req.files.Image.mimetype.split("/"))[0];
                if (type === 'image')
                    uploadedImage = true;
                else
                    uploadedImage = false;
            }

            //faccio un po' di combinazioni di errori
            if (urlValid === undefined && uploadedImage === false) //pprima -1
                return res.status(422).json({ error: `No file sent. Please upload an image file.` });
            else if (urlValid === false && uploadedImage === undefined) //prima -1
                return res.status(422).json({ error: `Wrong photo url sent. Please send a correct url corresponding to an image file.` });
            else if (urlValid === false && uploadedImage === false)
                return res.status(422).json({ error: `Both photo url and file you sent are wrong. Please better check your inputs.` });

            ////////////////////////////////////////// FINE CONTROLLI APPROFONDITI SULLA FOTO DA INVIARE //////////////////////

            //create hut point in db


            const cpr =await getCityProvinceRegion(req.body.latitude, req.body.longitude);
            const pointId = await pointDao.addPoint(req.body.title, req.body.description, "hut", req.body.latitude, req.body.longitude, req.body.altitude, cpr.city, cpr.province, cpr.region);
            const hutId = await hutDao.addHut(req.body.title, req.body.roomsNumber, req.body.bedsNumber, undefined, req.body.phoneNumber, uploadedImage === true ? null : req.body.photoFile, req.body.website, pointId);

            //Eventually create a png file and save it as IDHIKE_TITOLOHIKE.png
            if (uploadedImage === true) {
                fs.writeFileSync(`./utils/images/huts/${hutId}_${req.body.title.replace(/ /g, '_')}.png`, req.files.Image.data, function (err) {
                    if (err) throw err;
                });
            }

            return res.status(201).json({ message: "Hut inserted in the system" });
        } catch (error) {
            res.status(503).json({ error: `Service unavailable` });
        }
    });

module.exports = router;