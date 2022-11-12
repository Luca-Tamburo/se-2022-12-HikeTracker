'use strict'

const express = require('express');
const hikeDao = require('../dao/hikeDao');
const router = express.Router();
const {Hike, hikes, HikeDetails} = require('../models/hikeModel');
const {isLoggedIn} = require("../utils/sessionUtil");

/**
 * Get hikes from the system
 */
router.get('/hikes', [], async (req, res) => {
    try {
        let dbList = await hikeDao.getHikes();
        hikes.addNewHike(dbList.map((e) => new Hike(e.id, e.title, e.description, e.authorName, e.authorSurname, e.uploadDate, e.photoFile)));
        return res.status(201).json(hikes.hikeList); //Return property .hikeList where all the Hike objects are in a list
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
        return res.status(201).json(gpx.gpxFile);
    } catch (err) {
        return res.status(err).end();
    }
});