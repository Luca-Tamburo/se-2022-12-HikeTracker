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
            const startTime = dayjs(req.body.startTime, 'YYYY-MM-DD HH:mm:ss', true);

            //startTime non deve essere nel futuro
            const now = dayjs();
            if (startTime.isAfter(now))
                return res.status(422).json({ error: `Do you come from the future? StartTime seems in the future` });

            //controllo che l'utente non abbia altre hike iniziate e non concluse
            const startedHike = await hikePerformanceDao.getStartedHikeByUserId(userId); //return the hike that the user started
            if (startedHike !== undefined)
                return res.status(422).json({ error: `Can you double your self? You already started an hike` });


            //controllo che non ci siano altre hike iniziate prima dello startTime inserito ora e terminate dopo lo startTime inserito 
            //devo prendere tutte le hikes concluse da quell'utente
            const terminatedHikes = await hikePerformanceDao.getTerminatedHikes(userId);
            for (let terminatedHike of terminatedHikes) {

                console.log(terminatedHike);
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
                    (!startTime.isBefore(terminatedHikeStartTime-1000)) 
                    &&
                    (!startTime.isAfter(terminatedHikeTerminateTime))
                )
                    return res.status(422).json({ error: `You want to start an hike in a time period where you were hiking hike ${terminatedHike.hikeId}` });

            }

            const a = dayjs("2022-05-05 12:12:12", 'YYYY-MM-DD HH:mm:ss', true);
            const b = dayjs("2022-05-05 12:12:13", 'YYYY-MM-DD HH:mm:ss', true);
            console.log("a: "+a+"\nb: "+b); 

            return res.status(201).json({ message: "Hike started" });

        } catch (error) {
            res.status(503).json({ error: `Service unavailable` });
        }

    });

module.exports = router;