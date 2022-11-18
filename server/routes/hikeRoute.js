'use strict'

const express = require('express');
const hikeDao = require('../dao/hikeDao');
const pointDao = require('../dao/pointDao');
const router = express.Router();
const { hikes, HikeDetails } = require('../models/hikeModel');
const { Point } = require('../models/pointModel');
const path = require('path');
const { check, validationResult } = require("express-validator"); // validation middleware
const { Console } = require('console');
const parseGpx = require('parse-gpx');
const sessionUtil = require("../utils/sessionUtil");
const isLoggedIn = sessionUtil.isLoggedIn;
const isLoggedInLocalGuide = sessionUtil.isLoggedInLocalGuide;
const isLoggedInHiker = sessionUtil.isLoggedInHiker;
const fs = require('fs');

/**
 * Get hikes from the system
 */

//TODO: AGGIUNGERE LATITUDINE E LONGITUDINE STARTING POINT PER I FILTRI
router.get('/hikes', [], async (req, res) => {
    try {
        let dbList = await hikeDao.getHikes();
        hikes.hikeList = dbList.map((e) => new HikeDetails(e.id, e.title, e.description, e.authorName, e.authorSurname, e.uploadDate, e.photoFile));
        return res.status(200).json(hikes.hikeList); //Return list of Hike objects
    } catch (error) { res.status(503).json({ error: `Service unavailable` }); }

});

/**
 * Put hikes into the system
 */
//TODO:FARLA, SIA AUTENTICAZIONE DI INPUT ( x esempio difficoltà tra 1 e 4) , CHE COMPLETAMENTO API VERA E PROPRIA
router.put('/hikes', isLoggedInLocalGuide, async (req, res) => {
    try {
        /*     title, description,length,expectedTime,ascent,difficulty,startPointName,endPointName,authorId, uploadDate,photoFile
      */
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        }
        const gpx = req.files.File;




        try {
            //lavora con i dati del gpx, senza ancora creare il file lato server. Il file si crea dopo che hai inserito la hike nel sistema
            parseGpx(req.files.File.data).then(track => {
                console.log(track.totalDistance()); //8824.24 (metres)

                /*
                 {
                   latitude: string
                   longitude: string
                   timestamp: string
                   elevation: number
                   cadence: number
                   heartrate: number
                   distanceFromPoint: (trackPoint) => number (distance in metres)
                 }
                */
                console.log(track.trackPoints[0]);

                console.log(track.trackPoints[track.trackPoints.length - 1]);
            });

        } catch (err) {
            return res.status(err).end();

        }

        return res.status(201).json("pointOneId")


        //creo i point
        let pointOneId = await pointDao.addPoint(req.body.startPointName);
        let pointTwoId = await pointDao.addPoint(req.body.endPointName);
        //linko point con hike

        const hikeId = await hikeDao.addHike(req.body.title, req.body.description, req.body.length, req.body.expectedTime, req.body.ascent, req.body.difficulty, pointOneId, pointTwoId, req.body.authorId, req.body.uploadDate, "here the gpx", req.body.photoFile);
        console.log(hikeId)
        await pointDao.addPointHike(hikeId, pointOneId);
        await pointDao.addPointHike(hikeId, pointTwoId);


        //QUANDO CREI IL FILE, CREALO CON IDHIKE_TITOLOHIKE.gpx

        fs.writeFileSync(`./utils/gpxFiles/${hikeId}_${req.body.title.replace(/ /g, '_')}.gpx`, `${req.files.File.data}`, function (err) {
            if (err) throw err;
        });


    } catch (error) { res.status(503).json({ error: `Service unavailable` }); }

});


// GET /api/hikegpx/:hikeId
router.get('/hikegpx/:hikeId', check('hikeId').isInt().withMessage('hikeId must be a number'),
    isLoggedInHiker, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(404).json({ error: `Hike not found` });
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
            return res.status(404).json({ error: `Hike not found` });
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