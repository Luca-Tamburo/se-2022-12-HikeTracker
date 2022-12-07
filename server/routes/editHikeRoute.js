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


const { isThisMyHike, isItNearEnough } = require("../utils/editHikesUtils");

router.get('/hikeLinkHuts/:hikeId',
    check('hikeId').isInt({ gt: 0 }).withMessage('hikeId is wrong'),
    isLoggedInLocalGuide,
    checksValidation,
    async (req, res) => {
        /*
        "As a  local guide 
        I want to link a hut to a hike
        So that hikers can better plan their hike"
        */
        const hikeId = req.params.hikeId;
        const userId = req.user.id;
        const isOk = await isThisMyHike(hikeId, userId);
        if (!isOk)
            return res.status(422).json({ error: `Are you sure you uploaded this hike?` });

        //a questo punto so per certo che la hike e fatta da quello user

        let returnData = {};
        //mi prendo le info su startPoint ed endPoint attuali

        const infos = await hikeDao.getStartEndPointDistanceData(hikeId);
        const startPoint = await pointDao.getPointById(infos.startPointId);
        const endPoint = await pointDao.getPointById(infos.endPointId);
        const length = infos.length;
        returnData = {
            startPoint: {
                id: startPoint.id,
                name: startPoint.name,
                type: startPoint.type,
                latitude: startPoint.latitude,
                longitude: startPoint.longitude
            },
            endPoint: {
                id: endPoint.id,
                name: endPoint.name,
                type: endPoint.type,
                latitude: endPoint.latitude,
                longitude: endPoint.longitude
            },

            //current refPoints
            //possible refPoints
        }

        //ora devo prendere tutti gli hut/parking lot e vedere quali sono vicini allo starting point
        const allHuts = await pointDao.getPointByType('hut');
        const currentLinkedHuts = (await hikePointDao.getRefPointsByHikeId(hikeId)).filter(h => { return h.type === "hut" });
        returnData = {
            ...returnData, currentLinkedHuts: currentLinkedHuts
        }
        let filteredHuts = allHuts.filter(h => {
            return (currentLinkedHuts.find(p => p.id === h.id)) !== undefined ? false : true;
        })

        //prendo il nome del gpx di riferimento
        const gpx = await hikeDao.getGpxByHikeId(hikeId);

        //Use gpx file
        let trackPoints;
        try {
            //prendo il gpx file
            let gpxContent = fs.readFileSync(path.join(__dirname, `..//utils/gpxFiles/${gpx}`));
            const track = await parseGpx(gpxContent);

            //initial track point
            trackPoints = track.trackPoints;


        } catch (err) { //gpx could be corrupted or the name in the db could be wrong
            return res.status(422).json({ error: `Error while reading the stored gpx, please check the gpx.` });
        }

        //come mi comporto? Ogni 5 coppie di coordinate del gpx posso scorrere TUTTA la lista dei possible refpoints e, quando trovo un hut appetibile,
        //se non è già presente nella lista lo aggiungo
        let possibleLinkedHuts = [];
        for (let i = 0; i < trackPoints.length; i += 5) {
            for (let hut of filteredHuts) {

                //confronto distanza di ogni possibile hut con distanza del punto
                if (isItNearEnough(trackPoints[i], hut, length)) {

                    //se sono abbastanza vicino, se non sto già in possibleLinkedHuts, aggiungimi
                    if (!possibleLinkedHuts.find(rf => {
                        return rf.id === hut.id
                    })
                    )

                        possibleLinkedHuts.push(hut);
                }
            }
        }

        returnData = { ...returnData, possibleLinkedHuts: possibleLinkedHuts }


        return res.status(200).json(returnData); //Return object with all the information

    }
)

router.put('/hikeLinkHuts/:hikeId',
    check('hikeId').isInt({ gt: 0 }).withMessage('hikeId is wrong'),
    check("hutsToLink").exists().withMessage("This field is mandatory").bail().isArray({ min: 1 }).withMessage("This field is an array and can't be empty"),
    check("hutsToLink.*").exists().withMessage("This field is mandatory").bail().isInt({ gt: 0 }).withMessage("This field must be a valid id"),
    isLoggedInLocalGuide,
    checksValidation,
    async (req, res) => {
        /* VOGLIO RICEVERE UNA ROBA COSì
                {
                    "hutsToLink":[1,2,3,4,5,6,7]
                 }
          */
        const hikeId = req.params.hikeId;
        const userId = req.user.id;
        const isOk = await isThisMyHike(hikeId, userId);
        if (!isOk)
            return res.status(422).json({ error: `Are you sure you uploaded this hike?` });

        //prendo il nome del gpx di riferimento
        const gpx = await hikeDao.getGpxByHikeId(hikeId);

        //Use gpx file
        let trackPoints;
        try {
            //prendo il gpx file
            let gpxContent = fs.readFileSync(path.join(__dirname, `..//utils/gpxFiles/${gpx}`));
            const track = await parseGpx(gpxContent);

            //initial track point
            trackPoints = track.trackPoints;


        } catch (err) { //gpx could be corrupted or the name in the db could be wrong
            return res.status(422).json({ error: `Error while reading the stored gpx, please check the gpx.` });
        }


        const infos = await hikeDao.getStartEndPointDistanceData(hikeId);
        const length = infos.length;

        const currentLinkedHuts = (await hikePointDao.getRefPointsByHikeId(hikeId)).filter(h => { return h.type === "hut" });

        const hutsToLinkUnique = (req.body.hutsToLink).filter((x, i) => (req.body.hutsToLink).indexOf(x) === i);
        //qui mi conviene scorrere il gpx tante volte quanti sono i possibili ref points
        for (let hutId of hutsToLinkUnique) {

            //se metti refPoint che già ci sono? semplicemente ignora
            if (!currentLinkedHuts.find(rf => rf.id === hutId)) {
                //controlla che il point esista nel db
                const hutInfos = await pointDao.getPointById(hutId);
                if (!hutInfos)
                    return res.status(404).json({ error: `HutId ${hutId} not found` });
                //controlla che il point sia un hut
                if (hutInfos.type !== "hut")
                    return res.status(422).json({ error: `HutId ${hutId} is not an hut` });


                //controlla che ci sia almeno un punto nel gpx che sia vicino al point
                let found = false;
                for (let i = 0; i < trackPoints.length && (!found); i += 5) {

                    //confronto distanza di hut con distanza del punto
                    if (isItNearEnough(trackPoints[i], hutInfos, length)) {
                        found = true;
                    }
                }
                //se alla fine del ciclo non sono vicino a nulla, ritorna 422
                if (!found)
                    return res.status(422).json({ error: `HutId ${hutId} is not near to the hike)` });
            }
        }

        //Se arrivo qui, tutto è stato validato, quindi posso aggiungere
        for (let hutId of hutsToLinkUnique) {
            //se metti refPoint che già ci sono? semplicemente ignora
            if (!currentLinkedHuts.find(rf => rf.id === hutId)) {
                await pointDao.addPointHike(hikeId, hutId);
            }
        }
        return res.status(204).json({ message: "updated" }); //Return object with all the information

    }
)
module.exports = router;