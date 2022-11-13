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
const { check, checksValidation } = require("../utils/validationUtil");

/*** TEST API ***/

// GET /api/test
// To test the isLoggedIn function and some checkValidation functions
// if ok, the response is ciaociao

/*
request body example
{
   "booleanTest":1,
   "stringTest":"passwod"
}
*/

router.put("/test", isLoggedIn,
    check("booleanTest").exists().withMessage("This field is mandatory").bail()
        .isBoolean().withMessage("This field must be a Boolean value in the form true/false or 1/0"),
    check("stringTest").exists().withMessage("This field is mandatory").bail().isString().withMessage("This field must be a string").bail()
        .isLength({ min: 1, max: 7 }).withMessage("This field length must be from 1 to 7").bail()
        .matches(/^[A-Za-z0-9]+$/).withMessage("This field must be only made of letters and digits"),
    checksValidation,
    (req, res) => {
        const ciao = "ciaociao";
        res.json(ciao);
    });

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