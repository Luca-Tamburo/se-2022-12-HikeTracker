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
const sessionUtil= require("../utils/sessionUtil");
const passport=sessionUtil.passport;
const isLoggedIn=sessionUtil.isLoggedIn;

const { check, checksValidation } = require("../utils/validationUtil");
const userDao = require("../dao/userDao"); // module for accessing the users in the DB


/*** Users APIs ***/

// POST /api/sessions
// login
router.post("/sessions",
    function (req, res, next) {
        try {
            if (!((typeof req.body.email === 'string') && (typeof req.body.password === 'string')))
                res.status(401).json({ error: `Incorrect email and/or password.` })
            else
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
router.get("/sessions/current", async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const userInfo=await userDao.getUserAllInfosById( req.user.id);
            res.status(200).json(userInfo);
        } else res.status(401).json({ error: "Unauthenticated user!" });
    } catch (error) {
        res.status(503).json({ error: `Database error during the login` }).end();
    }
});

module.exports = router;