/*
* -------------------------------------------------------------------- 
*
* Package:         server
* Module:          utils
* File:            sessionUtil.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//This file contains passport and session

'use strict';
const passport = require("passport"); // auth middleware
const LocalStrategy = require("passport-local").Strategy; // email and password for login
const userDao = require("../dao/userDao"); // module for accessing the users in the DB
const session = require("express-session"); // enable sessions
const db = require('../routes/openDb');

/*** Set up Passport ***/
passport.use(
    new LocalStrategy({ usernameField: "email" }, function (email, password, done) {
        userDao.getUser(db, email.toLowerCase(), password).then((user) => {
            if (!user)
                return done(null, false, {
                    error: "Incorrect email and/or password.",
                });

            if (user.id === -1) //if the user did not confirm his email
                return done(null, false, {
                    error: "Please confirm your email",
                });
            else return done(null, user);

        });
    })
);

// serialize and de-serialize the user (user object <-> session)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    userDao.getUserById(db, id).then((user) => {
        return done(null, user);
    })
        .catch((err) => {
            done(err, null);
        });
});

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.status(401).json({ error: "User not authenticated" });
};

// custom middleware: check if a given request is coming from an authenticated localGuide
const isLoggedInLocalGuide = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === "localGuide") return next();
    return res.status(401).json({ error: "User not authenticated" });
};

// custom middleware: check if a given request is coming from an authenticated hiker
const isLoggedInHiker = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === "hiker") return next();
    return res.status(401).json({ error: "User not authenticated" });
};

// custom middleware: check if a given request is NOT coming from an authenticated user. Useful when you have to register as a new user, but you are already logged in as user
const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    return res.status(401).json({ error: "You are already authenticated!" });
};

module.exports = { passport, session, isLoggedIn, isNotLoggedIn, isLoggedInLocalGuide, isLoggedInHiker };