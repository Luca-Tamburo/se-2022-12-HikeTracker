'use strict'

const express = require('express');
const hikeDao = require('../dao/hikeDao');
const router = express.Router();
const {Hike, hikes, HikeDetails} = require('../models/hikeModel');

/**
 * Get hikes from the system
 */
router.get('/hikes', [], async (req, res) => {
    try {
        let dbList = await hikeDao.getHikes();
        /* USE HIKE AND hikes HERE TO PASS THE READY MADE LIST OF OBJECTS*/
        return res.status(200).json(hikes.hikeList);
    } catch (err) {
        return res.status(err).end();
    }
});