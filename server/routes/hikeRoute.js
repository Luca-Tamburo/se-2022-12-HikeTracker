'use strict'

const express = require('express');
const hikeDao = require('../dao/hikeDao');
const pointDao = require('../dao/pointDao');
const router = express.Router();
const { hikes, HikeDetails } = require('../models/hikeModel');
const { Point } = require('../models/pointModel');
const path = require('path');
const { check, validationResult } = require("express-validator"); // validation middleware
const { checksValidation } = require("../utils/validationUtil");

const valUtil = require("../utils/validationUtil");
const { Console } = require('console');
const parseGpx = require('parse-gpx');
const sessionUtil = require("../utils/sessionUtil");
const isLoggedIn = sessionUtil.isLoggedIn;
const isLoggedInLocalGuide = sessionUtil.isLoggedInLocalGuide;
const isLoggedInHiker = sessionUtil.isLoggedInHiker;
const fs = require('fs');
const { typeValidator, difficultyValidator, typeFormatter, difficultyFormatter } = require("../utils/hikesUtils");
const dayjs = require("dayjs");

const db = require('./openDb');

/**
 * Get hikes from the system
 */

router.get('/hikes', [], async (req, res) => {
    try {
        let hikes = await hikeDao.getHikes(db);
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
    check("expectedTime").exists().withMessage("This field is mandatory").bail().isNumeric(),
    check("difficulty").exists().withMessage("This field is mandatory").bail().isString().custom((value, { req }) => (difficultyValidator(value))).withMessage("Invalid difficulty"),
    check("photoFile").exists().withMessage("This field is mandatory").bail().isString(),
    checksValidation, async (req, res) => {

        try {
            if (!req.files || req.files.File === undefined) {
                return res.status(422).json({ error: `No GPX sent` });
            }

            //ste variabili mi servono fuori dal try, quindi le dichiaro fuori con let, poi le uso in try. Se le avessi dichiarate in try, fuori dal try non esisterebbero
            let totalLength;
            let finalTrackPoint;
            let initialTrackPoint;
            let ascent;

            //provo ad utilizzare il gpx
            try {

                //lavora con i dati del gpx, senza ancora creare il file lato server. Il file si crea dopo che hai inserito la hike nel sistema
                const track = await parseGpx(req.files.File.data);

                //trova distanza totale usando una funzione di parse-gpx
                totalLength = (track.totalDistance() / 1000).toFixed(3); //trasporta in km con 3 cifre dopo virgola

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

            } catch (err) { //se non riesco ad utilizzare il gpx
                return res.status(422).json({ error: `Wrong file sent. Please upload a gpx file.` });
            }

            //creo lo startPoint nel db
            let pointOneId = await pointDao.addPoint(db, "Just GPS coordinates", "Just GPS coordinates", "GPS coordinates", initialTrackPoint.latitude, initialTrackPoint.longitude, initialTrackPoint.elevation, undefined, undefined, undefined);

            //creo lo endPoint nel db
            let pointTwoId = await pointDao.addPoint(db, "Just GPS coordinates", "Just GPS coordinates", "GPS coordinates", finalTrackPoint.latitude, finalTrackPoint.longitude, finalTrackPoint.elevation, undefined, undefined, undefined);

            //creo hike
            const hikeId = await hikeDao.addHike(db, req.body.title, req.body.description, totalLength, req.body.expectedTime, ascent, difficultyFormatter(req.body.difficulty), pointOneId, pointTwoId, req.user.id, dayjs().format("YYYY-MM-DD"), req.body.photoFile);

            //linko hike e points in tabella hikePoint
            await pointDao.addPointHike(db, hikeId, pointOneId);
            await pointDao.addPointHike(db, hikeId, pointTwoId);

            //QUANDO CREI IL FILE, CREALO CON IDHIKE_TITOLOHIKE.gpx
            fs.writeFileSync(`./utils/gpxFiles/${hikeId}_${req.body.title.replace(/ /g, '_')}.gpx`, `${req.files.File.data}`, function (err) {
                if (err) throw err;
            });

            return res.status(201).json({ message: "Hike inserted in the system" });

        } catch (error) {
            console.log(error)
            res.status(503).json({ error: `Service unavailable` });
        }

    });


// GET /api/hikegpx/:hikeId
router.get('/hikegpx/:hikeId', check('hikeId').isInt().withMessage('hikeId must be a number'),
    isLoggedInHiker, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(404).json({ error: `Hike not found` });
        try {
            let gpx = await hikeDao.getGpxByHikeId(db, req.params.hikeId);
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
            return res.status(404).json({ error: `Hike not found` });
        try {
            //Hike detailed information is collected
            let hike = await hikeDao.getDetailsByHikeId(db, req.params.hikeId);
            if (hike === undefined)
                return res.status(404).json({ error: `Hike not found` });
            const gpx = hike.gpx;
            let gpxContent = req.isAuthenticated() ? fs.readFileSync(path.join(__dirname, `..//utils/gpxFiles/${gpx}`), "utf8") : "";

            //Points information for that hike is collected
            let dbList = await hikeDao.getPointsByHikeId(db, req.params.hikeId);

            hike = {
                ...hike,
                pointList: dbList.map((p) => new Point(p.id, p.name, p.description, p.type, p.latitude, p.longitude, p.altitude, p.city, p.province)),
                gpx: gpxContent
            };
            return res.status(200).json(hike); //Return object with all the information
        } catch (error) { res.status(503).json({ error: `Service unavailable` }); }

    });

module.exports = router;