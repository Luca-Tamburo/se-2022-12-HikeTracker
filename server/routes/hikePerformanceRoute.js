/*
* -------------------------------------------------------------------- 
*
* Package:         server
* Module:          routes
* File:            hikePerformanceRoute.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

'use strict'

const express = require('express');
const hikeDao = require('../dao/hikeDao');
const hikePerformanceDao = require('../dao/hikePerformanceDao');
const router = express.Router();
const { check, checksValidation } = require("../utils/validationUtil");
const sessionUtil = require("../utils/sessionUtil");
const isLoggedInHiker = sessionUtil.isLoggedInHiker;
const dayjs = require("dayjs");
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

router.get('/isHikeInProgress/:hikeId',
    check('hikeId').isInt({ gt: 0 }).withMessage('hikeId format is wrong'),
    isLoggedInHiker,
    checksValidation,
    async (req, res) => {
        try {

            //se sono loggato come hiker, mi devi dare le informazioni se non ho hike iniziate (inProgress=0), 
            //se ho già iniziato quella hike (inProgress=1), o se ho già un'altra hike iniziata(inProgress=-1)
            const hikeId = parseInt(req.params.hikeId);
            const userId = req.user.id;
            let returnData = {};
            const hike = await hikeDao.getDetailsByHikeId(hikeId);

            if (hike === undefined)
                return res.status(404).json({ error: `Hike not found` });

            const startedHike = await hikePerformanceDao.getStartedHikeByUserId(userId); //return the hike that the user started

            //qui ho i 3 possibili ritorni

            if (startedHike === undefined) //inProgress=0 se non ho iniziato hikes
                returnData = {
                    inProgress: 0,
                    startTime: undefined
                }

            else if (startedHike.hikeId === hikeId) //inProgress=1 se ho già iniziato questa hike
                returnData = {
                    inProgress: 1,
                    startTime: startedHike.startTime
                }

            else //inProgress=-1 se startedHike.hikeId!=hikeId
                returnData = {
                    inProgress: -1,
                    startTime: undefined,
                    startedHikeId: startedHike.hikeId
                }

            return res.status(200).json(returnData); //Return object with all the information
        } catch (error) {
            res.status(503).json({ error: `Service unavailable` });
        }
    }
)

router.post('/startHike',
    check('hikeId').exists().withMessage("This field is mandatory").bail().isInt({ gt: 0 }).withMessage('hikeId format is wrong'),
    check("startTime").exists().withMessage("This field is mandatory").bail().isString().bail().custom((value, { req }) => (dayjs(value, 'YYYY-MM-DD HH:mm:ss', true).isValid())).withMessage("startTime format is wrong"),
    isLoggedInHiker,
    checksValidation, async (req, res) => {

        try {
            const userId = req.user.id;
            const hikeId = parseInt(req.body.hikeId);
            const startTime = dayjs(req.body.startTime, 'YYYY-MM-DD HH:mm:ss', true);

            const hike = await hikeDao.getDetailsByHikeId(hikeId);

            if (hike === undefined)
                return res.status(404).json({ error: `Hike not found` });

            //startTime non deve essere nel futuro
            const now = dayjs();
            if (startTime.isAfter(now))
                return res.status(422).json({ error: `Do you come from the future? StartTime seems in the future` });

            //controllo che l'utente non abbia altre hike iniziate e non concluse
            const startedHike = await hikePerformanceDao.getStartedHikeByUserId(userId); //return the hike that the user started
            if (startedHike !== undefined)
                return res.status(422).json({ error: `Can you double your self? You already started the hike ${startedHike.hikeId}` });


            //controllo che non ci siano altre hike iniziate prima dello startTime inserito ora e terminate dopo lo startTime inserito 
            //devo prendere tutte le hikes concluse da quell'utente
            const terminatedHikes = await hikePerformanceDao.getTerminatedHikes(userId);
            for (let terminatedHike of terminatedHikes) {

                const terminatedHikeStartTime = dayjs(terminatedHike.startTime, 'YYYY-MM-DD HH:mm:ss', true);
                const terminatedHikeTerminateTime = dayjs(terminatedHike.terminateTime, 'YYYY-MM-DD HH:mm:ss', true);
                //se il mio startTime !is before tst e !isafter ttt
                //1000
                if (
                    //cosa vuol dire il -1000?
                    //tengo 1 secondo di spazio tra quando inizi una nuova hike e quando avevi iniziato una vecchia hike
                    //altrimenti se avevo iniziato una hike il 2022-05-05 12:12:12, e poi inizio una nuova hike settando come data
                    //il 2022-05-05 12:12:11, non ho finestre per chiudere la hike. 
                    //E' una finezza, sicuramente inutile, ma visto che ti serve almeno 1 istante di
                    //tempo per poter chiudere la hike, te non la puoi iniziare il 2022-05-05 12:12:11, ma il 2022-05-05 12:12:10 in modo
                    //che il 2022-05-05 12:12:11 hai una finestra (minima) per chiuderla (hai lo spazio) visto che poi 2022-05-05 12:12:12
                    //inizia la hike che avevi già iniziato
                    //è più che altro un salvagente per i casi estremi, non dovremmo mai trovarci in una situazione del genere... 
                    //... specie nella demo!!! :)
                    (!startTime.isBefore(terminatedHikeStartTime - 1000))
                    &&
                    (!startTime.isAfter(terminatedHikeTerminateTime))
                )
                    return res.status(422).json({ error: `You want to start an hike in a time period where you were hiking an other hike` });
            }

            //ORA HO FATTO TUTTI I CONTROLLI E DEVO FARE L'INSERIMENTO DELLA PERFORMANCE NEL DB

            //faccio la put
            await hikePerformanceDao.addHikePerformance(req.body.startTime, hikeId, userId);

            return res.status(201).json({ message: "Hike started" });
        } catch (error) {
            res.status(503).json({ error: `Service unavailable` });
        }
    });

router.post('/terminateHike',
    check('hikeId').exists().withMessage("This field is mandatory").bail().isInt({ gt: 0 }).withMessage('hikeId format is wrong'),
    check("terminateTime").exists().withMessage("This field is mandatory").bail().isString().bail().custom((value, { req }) => (dayjs(value, 'YYYY-MM-DD HH:mm:ss', true).isValid())).withMessage("terminateTime format is wrong"),
    isLoggedInHiker,
    checksValidation, async (req, res) => {

        try {

            const userId = req.user.id;
            const hikeId = parseInt(req.body.hikeId);
            const terminateTime = dayjs(req.body.terminateTime, 'YYYY-MM-DD HH:mm:ss', true);

            const hike = await hikeDao.getDetailsByHikeId(hikeId);

            //se la hike non esiste
            if (hike === undefined)
                return res.status(404).json({ error: `Hike not found` });

            //terminateTime non deve essere nel futuro
            const now = dayjs();
            if (terminateTime.isAfter(now))
                return res.status(422).json({ error: `Do you come from the future? terminateTime seems in the future` });

            //controllo che l'utente abbia iniziato la hike
            const startedHike = await hikePerformanceDao.getStartedHikeByUserId(userId); //return the hike that the user started
            if (startedHike === undefined) //non ci sono hike iniziate
                return res.status(422).json({ error: `You have no hikes started` });
            else if (startedHike.hikeId !== hikeId) //ha iniziato una hike che non è quella che ha messo nel body
                return res.status(422).json({ error: `What are you doing? You started the hike ${startedHike.hikeId}, not the one you inserted in the body` });

            const startTime = dayjs(startedHike.startTime, 'YYYY-MM-DD HH:mm:ss', true);

            //controllo che terminateTime sia after startTime
            if (
                (!terminateTime.isAfter(startTime))
            )
                return res.status(422).json({ error: `You want to terminate this hike in an instant that is not after the start instant` });

            //per quell’utente non ci devono essere hikes già presenti che siano partite dopo lo startTime che ho per questa hike,
            // e prima del terminateTime che voglio inserire ora, altrimenti ho sovrapposizioni 
            const terminatedHikes = await hikePerformanceDao.getTerminatedHikes(userId);
            for (let terminatedHike of terminatedHikes) {

                const terminatedHikeStartTime = dayjs(terminatedHike.startTime, 'YYYY-MM-DD HH:mm:ss', true);
                //se il mio startTime è before il tst e il mio terminate time è !before tst
                if (
                    (startTime.isBefore(terminatedHikeStartTime))
                    &&
                    (!terminateTime.isBefore(terminatedHikeStartTime))
                )
                    return res.status(422).json({ error: `You want to terminate an hike in a time period where you already hiked other hikes` });
            }

            //ORA HO FATTO TUTTI I CONTROLLI E DEVO FARE L'INSERIMENTO DELLA PERFORMANCE NEL DB

            //faccio la put
            await hikePerformanceDao.terminateHikePerformance(req.body.terminateTime, startedHike.id);

            return res.status(201).json({ message: "Hike terminated" });
        } catch (error) {
            res.status(503).json({ error: `Service unavailable` });
        }
    });

module.exports = router;