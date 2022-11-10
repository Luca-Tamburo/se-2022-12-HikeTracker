'use strict'

const express = require('express');
const hikeDao = require('../dao/hikeDao');
const router = express.Router();
const {Hike, HikeList} = require('../models/hikeModel');

/**
 * Get hikes from the system
 */
router.get('/hikes', [], async (req, res) => {
    try {
        let hikes = await hikeDao.getHikes();
        /* USE HIKE AND HIKE LIST HERE TO PASS THE READY MADE OBJECTS*/
        return res.status(200).json(hikes);
    } catch (err) {
        return res.status(err).end();
    }
});