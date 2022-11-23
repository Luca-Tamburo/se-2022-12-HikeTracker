'use strict'
const express = require('express');
const router = express.Router();
const { setTesting } = require('../mockDB/iAmTesting');

router.get('/setMock', [], async (req, res) => {
    try {
      setTesting(1);
      return res.status(200).json({success: `Mock DB now in use`})
    } catch (error) { res.status(503).json({ error: `Service unavailable` }); }
});

module.exports = router;