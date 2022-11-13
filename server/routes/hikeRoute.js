'use strict'

const express = require('express');
const hikeDao = require('../dao/hikeDao');
const router = express.Router();
const { hikes, HikeDetails } = require('../models/hikeModel');
const { Point } = require('../models/pointModel');
const { isLoggedIn } = require("../utils/sessionUtil");
const { check, param, body, validationResult } = require('express-validator');

/**
 * Get hikes from the system
 */
router.get('/hikes', [], async (req, res) => {
    try {
        let dbList = await hikeDao.getHikes();
        hikes.hikeList = dbList.map((e) => new HikeDetails(e.id, e.title, e.description, e.authorName, e.authorSurname, e.uploadDate, e.photoFile));
        return res.status(200).json(hikes.hikeList); //Return list of Hike objects
    } catch (err) {
        return res.status(err).end();
    }
});

/**
 * Put hikes into the system
 */
router.post('/hikes', [], async (req, res) => {
    try {
        let result = await hikeDao.insertHike(req.body.id, req.body.title, req.body.description, req.body.lenght, req.body.expectedTime, req.body.ascent, req.body.difficulty, req.body.startPointId, req.body.endPointId, req.body.authorId, req.body.uploadDate, req.body.gpxFile, req.body.photoFile);
        return res.status(201).json(result)
    } catch (err) {
        return res.status(err).end();
    }
});



/**
 * Get gpx route by hike id
 */
router.get('/hikegpx/:id', isLoggedIn, [], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        let gpx = await hikeDao.getGpxByHikeId(req.params.id);
        return res.status(200).json(gpx.gpxFile); //Return corresponding gpx path
    } catch (err) {
        return res.status(err).end();
    }
});

/**
 * Get hike detailed information by hike id
 */
router.get('/hikedetails/:id', [], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        //Hike detailed information is collected
        let d = await hikeDao.getDetailsByHikeId(req.params.id);
        //Find element basic details in the hikes list
        i = hikes.findIndexById(req.params.id)
        hike = hikes[i]
        //Update details
        hike.lenght = d.lenght
        hike.expectedTime = d.expectedTime
        hike.ascent = d.ascent
        hike.difficulty = d.difficulty
        hike.startPointId = d.startPointId
        hike.endPointId = d.endPointId
        //Points information for that hike is collected
        let dbList = await hikeDao.getPointsByHikeId(req.params.id);
        hike.addNewPoint(dbList.map((p) => new Point(p.id, p.name, p.description, p.type, p.latitude, p.longitude, p.altitude, p.city, p.province)));
        return res.status(200).json(hike); //Return object with all the information
    } catch (err) {
        return res.status(err).end();
    }
});

module.exports = router;