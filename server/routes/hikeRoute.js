'use strict'

const express = require('express');
const hikeDao = require('../dao/hikeDao');
const router = express.Router();
const {Hike, hikes, HikeDetails} = require('../models/hikeModel');
const {Point} = require('../models/pointModel');
const {isLoggedIn} = require("../utils/sessionUtil");
const { check, param, body, validationResult } = require('express-validator');

/**
 * Get hikes from the system
 */
router.get('/hikes', [], async (req, res) => {
    try {
        let dbList = await hikeDao.getHikes();
        //hikes.addNewHike(dbList.map((e) => new Hike(e.id, e.title, e.description, e.authorName, e.authorSurname, e.uploadDate, e.photoFile)));
        let hikes = dbList.map((e) => new Hike(e.id, e.title, e.description, e.authorName, e.authorSurname, e.uploadDate, e.photoFile));
        return res.status(200).json(hikes); //Return list of Hike objects
    } catch (err) {
        return res.status(err).end();
    }
});

/**
 * Put hikes into the system
 */
router.post('/hikes', [], async(req,res) => {
    try {
        let result = await hikeDao.insertHike(req.body.id, req.body.title, req.body.description, req.body.lenght, req.body.expectedTime, req.body.ascent, req.body.difficulty, req.body.startPointId, req.body.endPointId,  req.body.authorId, req.body.uploadDate, req.body.gpxFile, req.body.photoFile);
        return res.status(201).json(result)
    } catch(err) {
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
        let e = await hikeDao.getDetailsByHikeId(req.params.id);
        DetailedHike = new HikeDetails(e.id, e.lenght, e.expectedTime, e.ascent, e.difficulty, e.startPointId, e.endPointId);
        //Points information for that hike is collected
        let dbList = await hikeDao.getPointsByHikeId(req.params.id);
        DetailedHike.addNewPoint(dbList.map((e) => new Point(e.id, e.name, e.description, e.type, e.latitude, e.longitude, e.altitude, e.city, e.province)));
        return res.status(200).json(DetailedHike); //Return object with all the information
    } catch (err) {
        return res.status(err).end();
    }
});

module.exports = router;