/*
* -------------------------------------------------------------------- 
*
* Package:         server
* Module:          routes
* File:            editHikeRoute.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/
'use strict'

const express = require('express');
const hikeDao = require('../dao/hikeDao');
const editHikeDao = require('../dao/editHikeDao');
const pointDao = require('../dao/pointDao');
const hikePointDao = require('../dao/hikePointDao');
const router = express.Router();
const path = require('path');
const { check } = require("express-validator"); // validation middleware
const { checksValidation } = require("../utils/validationUtil");
const parseGpx = require('parse-gpx');
const sessionUtil = require("../utils/sessionUtil");
const isLoggedInLocalGuide = sessionUtil.isLoggedInLocalGuide;
const fs = require('fs');


const { isThisMyHike, calcDist, isItNearEnough } = require("../utils/editHikesUtils");

// ADDED
router.get('/hikeStartEnd/:hikeId',
    check('hikeId').isInt({ gt: 0 }).withMessage('hikeId is wrong'),
    isLoggedInLocalGuide,
    checksValidation,
    async (req, res) => {
        const hikeId = req.params.hikeId;
        const userId = req.user.id;
        const isOk = await isThisMyHike(hikeId, userId);
        if (!isOk)
            return res.status(404).json({ error: `Are you sure you uploaded this hike?` });

        //a questo punto so per certo che la hike e fatta da quello user
        let returnData = {};

        //mi prendo le info su startPoint ed endPoint attuali
        const infos = await hikeDao.getStartEndPointDistanceData(hikeId);
        const startPoint = await pointDao.getPointById(infos.startPointId);
        const endPoint = await pointDao.getPointById(infos.endPointId);
        const length = infos.length;
        console.log(infos)
        returnData = {
            currentStartPoint: {
                id: startPoint.id,
                name: startPoint.name,
                type: startPoint.type,
                latitude: startPoint.latitude,
                longitude: startPoint.longitude
            },
            currentEndPoint: {
                id: endPoint.id,
                name: endPoint.name,
                type: endPoint.type,
                latitude: endPoint.latitude,
                longitude: endPoint.longitude
            },
        }

        //ora devo prendere tutti gli hut/parking lot e vedere quali sono vicini allo starting point
        const allHuts = await pointDao.getPointByType('hut');
        const allParkingLots = await pointDao.getPointByType('parking lot');

        //prendo il nome del gpx di riferimento
        const gpx = await hikeDao.getGpxByHikeId(hikeId);

        //Use gpx file
        let finalTrackPoint;
        let initialTrackPoint;
        try {
            //prendo il gpx file
            let gpxContent = fs.readFileSync(path.join(__dirname, `..//utils/gpxFiles/${gpx}`));
            const track = await parseGpx(gpxContent);

            //initial track point
            initialTrackPoint = track.trackPoints[0];

            //final track point
            finalTrackPoint = track.trackPoints.reduce(function (prev, current) {
                return (prev.elevation > current.elevation) ? prev : current
            })

        } catch (err) { //gpx could be corrupted or the name in the db could be wrong
            return res.status(422).json({ error: `Error while reading the stored gpx, please check the gpx.` });
        }

        //CALCOLO I POSSIBILI START POINT
        //prendo tutti gli hut che potrebbero essere start point (tranne l'eventuale hut che è già startpoint (invece un hut che è end point non vedo perchè non possa essere startPoint (x es x i ring)))
        let possibleStartingPoints = await allHuts.filter(hut => {
            return (hut.id !== startPoint.id) ? isItNearEnough(initialTrackPoint, hut, length) : false;
        });

        //prendo tutti i parking lot che potrebbero essere start point (stesso principio di prima per eventuali start/end point)
        await allParkingLots.filter(parkingLot => {
            return (parkingLot.id !== startPoint.id) ? isItNearEnough(initialTrackPoint, parkingLot, length) : false;
        }).forEach((x) => possibleStartingPoints.push(x));


        //CALCOLO I POSSIBILI END POINT
        //prendo tutti gli hut che potrebbero essere end point
        let possibleEndPoints = await allHuts.filter(hut => {
            return (hut.id !== endPoint.id) ? isItNearEnough(finalTrackPoint, hut, length) : false;
        });

        //prendo tutti i parking lot che potrebbero essere en point
        await allParkingLots.filter(parkingLot => {
            return (parkingLot.id !== endPoint.id) ? isItNearEnough(finalTrackPoint, parkingLot, length) : false;
        }).forEach((x) => possibleEndPoints.push(x));

        //aggiungo nei possibili start point la informazione sulla distanza dallo start point del gpx
        possibleStartingPoints = possibleStartingPoints.map(point => {
            const p = {
                ...point, distance: calcDist(initialTrackPoint, point)
            }
            return p;
        });

        //aggiungo nei possibili end point la informazione sulla distanza dallo end point del gpx
        possibleEndPoints = possibleEndPoints.map(point => {
            const p = {
                ...point, distance: calcDist(finalTrackPoint, point)
            }
            return p;
        });


        returnData = { ...returnData, possibleStartingPoints: possibleStartingPoints, possibleEndPoints: possibleEndPoints }

        return res.status(200).json(returnData); //Return object with all the information

    }
)

// ADDED
router.put('/hikeStartEnd/:hikeId',
    check('hikeId').isInt({ gt: 0 }).withMessage('hikeId is wrong'),
    check("startPointId").exists().optional({ checkFalsy: true }).isInt({ gt: 0 }).withMessage('startPointId is wrong'),
    check("endPointId").exists().optional({ checkFalsy: true }).isInt({ gt: 0 }).withMessage('endPointId is wrong'),
    isLoggedInLocalGuide,
    checksValidation,
    async (req, res) => {
        const hikeId = req.params.hikeId;
        const userId = req.user.id;
        const isOk = await isThisMyHike(hikeId, userId);
        if (!isOk)
            return res.status(422).json({ error: `Are you sure you uploaded this hike?` });
        if ( //serve per evitare di lavorare inutilmente con il gpx
            (!req.body.startPointId || req.body.startPointId === undefined)
            &&
            (!req.body.endPointId || req.body.endPointId === undefined)
        )
            return res.status(422).json({ error: `Nothing in the body.. what do you want to do?` });

        //prendo il nome del gpx di riferimento
        const gpx = await hikeDao.getGpxByHikeId(hikeId);

        //Use gpx file
        let finalTrackPoint;
        let initialTrackPoint;
        try {
            //prendo il gpx file
            let gpxContent = fs.readFileSync(path.join(__dirname, `..//utils/gpxFiles/${gpx}`));
            const track = await parseGpx(gpxContent);

            //initial track point
            initialTrackPoint = track.trackPoints[0];

            //final track point
            finalTrackPoint = track.trackPoints.reduce(function (prev, current) {
                return (prev.elevation > current.elevation) ? prev : current
            })

        } catch (err) { //gpx could be corrupted or the name in the db could be wrong
            return res.status(422).json({ error: `Error while reading the stored gpx, please check the gpx.` });
        }

        const infos = await hikeDao.getStartEndPointDistanceData(hikeId);
        const length = infos.length;
        const currentStartPoint = await pointDao.getPointById(infos.startPointId);
        const currentEndPoint = await pointDao.getPointById(infos.endPointId);

        //operazioni per startPoint (se presente nel body)
        let desiredStartPoint;
        if (req.body.startPointId && req.body.startPointId !== undefined) {

            //come prima cosa controllo che sto punto non sia già start point
            if ((req.body.startPointId == currentStartPoint.id)) //potrei anche permetterlo, ma sono chiamate inutili al dao
                return res.status(422).json({ error: `not valid startPointId(is already start point of this hike` });

            //controllo che startPoint esista
            desiredStartPoint = await pointDao.getPointById(req.body.startPointId);
            if (!desiredStartPoint)
                return res.status(404).json({ error: `startPointId not found` });

            //controllo che sto point sia hut o parking lot
            if (desiredStartPoint.type !== 'hut' && desiredStartPoint.type !== 'parking lot')
                return res.status(422).json({ error: `not valid startPoint(not a hut/parking lot)` });

            //controllo che distanza di startPoint desiderato sia nel range rispetto a startPoint di gpx
            if (!isItNearEnough(initialTrackPoint, desiredStartPoint, length))
                return res.status(422).json({ error: `not valid startPointId(too much distance)` });

        }

        //operazioni per endPoint (se presente nel body)
        let desiredEndPoint;
        if (req.body.endPointId && req.body.endPointId !== undefined) {
            //come prima cosa controllo che sto punto non sia già end point
            if (req.body.endPointId == currentEndPoint.id) //potrei anche permetterlo, ma sono chiamate inutili al dao
                return res.status(422).json({ error: `not valid endPointId(is already end point of this hike` });

            //controllo che endPoint esista
            desiredEndPoint = await pointDao.getPointById(req.body.endPointId);
            if (!desiredEndPoint)
                return res.status(404).json({ error: `endPointId not found` });

            //controllo che sto point sia hut o parking lot
            if (desiredEndPoint.type !== 'hut' && desiredEndPoint.type !== 'parking lot')
                return res.status(422).json({ error: `not valid endPoint(not a hut/parking lot)` });

            //controllo che distanza di endPoint desiderato sia nel range rispetto a endPoint di gpx
            if (!isItNearEnough(finalTrackPoint, desiredEndPoint, length))
                return res.status(422).json({ error: `not valid endPointId(too much distance)` });

        }

        //operazioni finali per startPoint (se presente nel body)
        if (req.body.startPointId && req.body.startPointId !== undefined) {
            //aggiorno tabella hike
            await editHikeDao.updateStartPoint(desiredStartPoint.id, hikeId);
        }

        //operazioni finali per endPoint (se presente nel body)
        if (req.body.endPointId && req.body.endPointId !== undefined) {
            //aggiorno tabella hike
            await editHikeDao.updateEndPoint(desiredEndPoint.id, hikeId);
        }

        return res.status(204).json({ message: "updated" }); //Return object with all the information

    }
)

module.exports = router;