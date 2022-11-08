/*
* -------------------------------------------------------------------- 
*
* Package:         server
* Module:          routes
* File:            sessionRoute.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

'use strict';
const express = require('express');
const router = express.Router();
const { passport, session, isLoggedIn } = require("../utils/sessionUtil");

/*** Users APIs ***/

// GET /api/test
// To test the isLoggedIn function
router.get("/test", isLoggedIn, (req, res) => {
    const ciao = "ciaociao";
    res.json(ciao);
});

// POST /api/sessions
// login
router.post("/sessions", function (req, res, next) {
    try {
        passport.authenticate("local", (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                // display wrong login messages
                return res.status(401).json(info);
            }
            // success, perform the login
            req.login(user, (err) => {
                if (err) return next(err);
                // req.user contains the authenticated user, we send all the user info back
                // this is coming from userDao.getUser()
                return res.json(req.user);
            });
        })(req, res, next);
    } catch (error) { res.status(503).json({ error: `Database error while retrieving user info` }).end(); }
});

// DELETE /api/sessions/current
// logout
router.delete("/sessions/current", isLoggedIn, (req, res) => {
    try {
        req.logout(() => { res.end(); });
    } catch (error) {
        res.status(503).json({ error: `Database error during the logout` }).end();
    }
});

// GET /api/sessions/current
// check whether the user is logged in or not
router.get("/sessions/current", (req, res) => {
    try {
        if (req.isAuthenticated()) {
            res.status(200).json(req.user);
        } else res.status(401).json({ error: "Unauthenticated user!" });
    } catch (error) {
        res.status(503).json({ error: `Database error during the login` }).end();
    }
});

module.exports = router;