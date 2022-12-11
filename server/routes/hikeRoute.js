/*
* -------------------------------------------------------------------- 
*
* Package:         server
* Module:          routes
* File:            hikeRoute.js
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
const { Point } = require('../models/pointModel');
const path = require('path');
const { check, validationResult } = require("express-validator"); // validation middleware
const { checksValidation } = require("../utils/validationUtil");
const parseGpx = require('parse-gpx');
const sessionUtil = require("../utils/sessionUtil");
const isLoggedInLocalGuide = sessionUtil.isLoggedInLocalGuide;
const isLoggedIn = sessionUtil.isLoggedIn;
const fs = require('fs');
const { difficultyValidator, difficultyFormatter, photoUrlValidator } = require("../utils/hikesUtils");
const dayjs = require("dayjs");
const { getCityProvinceRegion } = require("../utils/geoUtils");
const validUrlUtf8 = require('valid-url-utf8');


/**
 * Get hikes from the system
 */

router.get('/hikes', [], async (req, res) => {
    try {
        let hikes = await hikeDao.getHikes();
        return res.status(200).json(hikes); //Return list of Hikes
    } catch (error) { res.status(503).json({ error: `Service unavailable` }); }

});

/**
 * Get hikes from the system
 */

router.get('/localGuideHikes',
    isLoggedInLocalGuide,
    checksValidation,
    async (req, res) => {
        try {
            let hikes = await hikeDao.getHikesOfAuthor(req.user.id);
            return res.status(200).json(hikes); //Return list of Hikes
        } catch (error) { res.status(503).json({ error: `Service unavailable` }); }

    });

/**
 * Put hikes into the system
 */

router.post('/hikes',
    isLoggedInLocalGuide,
    check("title").exists().withMessage("This field is mandatory").bail().isString(),
    check("description").exists().withMessage("This field is mandatory").bail().isString(),
    check("expectedTime").exists().withMessage("This field is mandatory").bail().isFloat({ gt: 0 }),
    check("difficulty").exists().withMessage("This field is mandatory").bail().isString().custom((value, { req }) => (difficultyValidator(value))).withMessage("Invalid difficulty"),
    check("photoFile").exists().optional({ checkFalsy: true }).isString().bail().custom((value, { req }) => (validUrlUtf8(value))).withMessage("Invalid photoFile url"),
    checksValidation, async (req, res) => {

        try {

            //controllo che sia stato inviato un file nello spazio per il gpx
            if (!req.files || req.files.File === undefined) {
                return res.status(422).json({ error: `No GPX sent` });
            }

            //controllo che sia stato inviato un file nello spazio per la foto oppure che sia stato scritto qualcosa nel campo photofile
            if ((!req.body.photoFile || req.body.photoFile === undefined) && (!req.files || req.files.Image === undefined)) {
                return res.status(422).json({ error: `No image sent` });
            }

            ////////////////////////////////////////// CONTROLLI APPROFONDITI SULLA FOTO DA INVIARE //////////////////////

            //controllo se lo url è utilizzabile
            let urlValid = undefined; //prima era -1
            let photoUrl;
            if (req.body.photoFile && req.body.photoFile !== undefined) { //qui entro se ho qualcosa nell'url
                //controllo che url sia valido
                photoUrl = req.body.photoFile;
                if (
                    !(photoUrl.toLowerCase().startsWith('http://'))
                    &&
                    !(photoUrl.toLowerCase().startsWith('https://'))
                )
                    photoUrl = "http://" + photoUrl;

                urlValid = await photoUrlValidator(photoUrl);
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
            if (urlValid === undefined && uploadedImage === false) //prima -1
                return res.status(422).json({ error: `Wrong file sent. Please upload an image file.` });
            else if (urlValid === false && uploadedImage === undefined) //prima -1
                return res.status(422).json({ error: `Wrong url sent. Please send a correct url corresponding to an image file.` });
            else if (urlValid === false && uploadedImage === false)
                return res.status(422).json({ error: `Both url and file you sent are wrong. Please better check your inputs.` });

            ////////////////////////////////////////// FINE CONTROLLI APPROFONDITI SULLA FOTO DA INVIARE //////////////////////




            ////////////////////////////////////////// ELABORAZIONE DEL GPX //////////////////////

            // GPX informations Variables needed outside the try
            let totalLength;
            let finalTrackPoint;
            let initialTrackPoint;
            let ascent;

            //Use gpx file
            try {
                const track = await parseGpx(req.files.File.data);
                //Find total distance using a parse-gpx function (in km with 3 decimal places)
                totalLength = (track.totalDistance() / 1000).toFixed(3);

                //trova punto più basso (che sicuramente è quello iniziale, però ho pensato che magari dal punto di partenza scendi un po' e poi risali, quindi nel dubbio lo trovo)
                //    EDIT NON POSSO FARE QUEL RAGIONAMENTO. MOTIVO: PRENDI 1_MONTE_FERRA.GPX. RIGO 87 ALTEZZA 1754, DAL NULLA PERCHè PRECEDENTE E SUCCESSIVO SONO A 1800. 
                //    INVECE PARTENZA ERA 1757. QUESTA ANOMALIA ERA SMALL, MA SE CE NE FOSSERO DI PIù GRANDI? QUINDI PRENDO COME LOWER POINT QUELLO INIZIALE
                /*
                        lowestTrackPoint = track.trackPoints.reduce(function (prev, current) {
                            return (prev.elevation < current.elevation) ? prev : current
                        })
                */
                initialTrackPoint = track.trackPoints[0];

                //trova punto finale (che è anche il più alto, NON QUELLO FINALE)
                //    potrebbe valere il discorso di prima sulle anomalie, ma non posso applicarlo perchè non so per certo che 
                //    l'ultimo punto sia quello finale, perchè ci sono alcuni gpx che fanno andata-ritorno (1_MONTE_FERRA.GPX)
                finalTrackPoint = track.trackPoints.reduce(function (prev, current) {
                    return (prev.elevation > current.elevation) ? prev : current
                })

                //trova ascent, cioè differenza tra punto più alto e punto più basso (è lo start point ma per sicurezza me lo cerco)
                ascent = (finalTrackPoint.elevation - initialTrackPoint.elevation).toFixed(2);

            } catch (err) { //gpx could not be properly used
                return res.status(422).json({ error: `Wrong file sent. Please upload a gpx file.` });
            }

            ////////////////////////////////////////// FINE ELABORAZIONE DEL GPX //////////////////////


            //Create startPoint and endPoint, hike and link hike-points in hikePoint
            let cpr = await getCityProvinceRegion(initialTrackPoint.latitude, initialTrackPoint.longitude);
            let pointOneId = await pointDao.addPoint(cpr.name, cpr.name, cpr.type, initialTrackPoint.latitude, initialTrackPoint.longitude, initialTrackPoint.elevation, cpr.city, cpr.province, cpr.region);

            cpr = await getCityProvinceRegion(finalTrackPoint.latitude, finalTrackPoint.longitude);
            let pointTwoId = await pointDao.addPoint(cpr.name, cpr.name, cpr.type, finalTrackPoint.latitude, finalTrackPoint.longitude, finalTrackPoint.elevation, cpr.city, cpr.province, cpr.region);

            const hikeId = await hikeDao.addHike(req.body.title, req.body.description, totalLength, req.body.expectedTime, ascent, difficultyFormatter(req.body.difficulty), pointOneId, pointTwoId, req.user.id, dayjs().format("YYYY-MM-DD"), uploadedImage === true ? null : photoUrl);
            //            await pointDao.addPointHike(hikeId, pointOneId);
            //            await pointDao.addPointHike(hikeId, pointTwoId);

            //Create gpx file and save it as IDHIKE_TITOLOHIKE.gpx
            fs.writeFileSync(`./utils/gpxFiles/${hikeId}_${req.body.title.replace(/[ \n\t\r]/g, '_')}.gpx`, `${req.files.File.data}`, function (err) {
                if (err) throw err;
            });

            //Eventually create a png file and save it as IDHIKE_TITOLOHIKE.png
            if (uploadedImage === true) {
                fs.writeFileSync(`./utils/images/hikes/${hikeId}_${req.body.title.replace(/[ \n\t\r]/g, '_')}.png`, req.files.Image.data, function (err) {
                    if (err) throw err;
                });
            }
            return res.status(201).json({ message: "Hike inserted in the system" });

        } catch (error) {
            res.status(503).json({ error: `Service unavailable` });
        }

    });


// GET /api/hikegpx/:hikeId
router.get('/hikegpx/:hikeId', check('hikeId').isInt().withMessage('hikeId must be a number'),
    isLoggedIn, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ error: `Wrong hikeId` });
        try {
            let gpx = await hikeDao.getGpxByHikeId(req.params.hikeId);
            if (gpx !== undefined) {
                req.params.hikeId = 2;
                res.download(path.join(__dirname, `..//utils/gpxFiles/${gpx}`));
            }
            else res.status(404).json({ error: `gpx not found` });
        } catch (error) { res.status(503).json({ error: `Service unavailable` }); }

    });

/**
 * Get hike detailed information by hike id
 */

router.get('/hikedetails/:hikeId', check('hikeId').isInt().withMessage('hikeId must be a number'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(404).json({ error: `Wrong HikeId` });
        try {
            //Hike detailed information is collected
            let hike = await hikeDao.getDetailsByHikeId(req.params.hikeId);
            if (hike === undefined)
                return res.status(404).json({ error: `Hike not found` });
            const gpx = hike.gpx;
            let gpxContent = req.isAuthenticated() ? fs.readFileSync(path.join(__dirname, `..//utils/gpxFiles/${gpx}`), "utf8") : "";

            //Points information for that hike is collected
            let dbList = await hikeDao.getPointsByHikeId(req.params.hikeId);

            hike = {
                ...hike,
                pointList: dbList.map((p) => new Point(p.id, p.name, p.description, p.type, p.latitude, p.longitude, p.altitude, p.city, p.province)),
                gpx: gpxContent
            };
            return res.status(200).json(hike); //Return object with all the information
        } catch (error) { res.status(503).json({ error: `Service unavailable` }); }

    });

module.exports = router;