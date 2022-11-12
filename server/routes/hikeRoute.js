'use strict'

const express = require('express');
const hikeDao = require('../dao/hikeDao');
const router = express.Router();
const {Hike, hikes, HikeDetails} = require('../models/hikeModel');
const {Point} = require('../models/pointModel');
const {isLoggedIn} = require("../utils/sessionUtil");

/**
 * Get hikes from the system
 */
router.get('/hikes', [], async (req, res) => {
    try {
        let dbList = await hikeDao.getHikes();
        hikes.addNewHike(dbList.map((e) => new Hike(e.id, e.title, e.description, e.authorName, e.authorSurname, e.uploadDate, e.photoFile)));
        return res.status(201).json(hikes.hikeList); //Return .hikeList attribute where all the Hike objects are in a list
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
        return res.status(422).json({ errors: errors.array()});
    }
    try {
        let gpx = await hikeDao.getGpxByHikeId(req.params.id);
        return res.status(201).json(gpx.gpxFile); //Return corresponding gpx path
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
        let e = await hikeDao.getDetailsByHikeId(req.params.id);
        DetailedHike = new HikeDetails(e.id, e.lenght, e.expectedTime, e.ascent, e.difficulty, e.startPointId, e.endPointId);
        //Points information for that hike is collected
        let dbList = await hikeDao.getPointsByHikeId(req.params.id);
        DetailedHike.addNewPoint(dbList.map((e) => new Point(e.id, e.name, e.description, e.type, e.latitude, e.longitude, e.altitude, e.city, e.province)));
        return res.status(201).json(DetailedHike); //Return object with all the information
    } catch (err) {
        return res.status(err).end();
    }
});