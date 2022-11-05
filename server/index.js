/*
* -------------------------------------------------------------------- 
*
* Package:         server
* File:            index.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

'use strict';

//Importing modules
const express = require("express");
const logger = require("morgan");       //loggin middleware
const cors = require("cors");

//Authentication-related imports 
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require('express-session');

//Routes and models
// const sessionsRouter = require("./routes/sessions");

//Allow to use public route
const path = require("path");

//Module that performs data encryption and decryption
const crypto = require("crypto");

//Init express and set-up the middlewares
const app = express();
app.use(logger("dev"));
app.use(express.json());

//Set up and enable Cross-Origin Resource Sharing (CORS)
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

// Creating the session
app.use(session({
    secret: 'a secret sentence not to share with anybody and anywhere, userd to sign the session ID cookie',
    resave: false,
    saveUninitialized: false
}))

//Passport


app.use("/public", express.static(path.join(__dirname, 'public')));

/* ---  APIs  --- */
// app.use("/api/courses", courseRouter);

//Activating server
const PORT = 3001;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}/`)
);

