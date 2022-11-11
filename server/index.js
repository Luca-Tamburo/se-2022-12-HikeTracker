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
const morgan = require("morgan");       //loggin middleware
const cors = require("cors");
const {passport, session} = require("./utils/sessionUtil");

//Importing routes
const sessionRoute = require("./routes/sessionRoute");
const signUpRoute = require("./routes/signUpRoute");
//const hikeRoute = require("./routes/hikeRoute");

// init express
const app = new express();
const port = 3001;

// set-up the middlewares
app.use(morgan("dev"));
app.use(express.json());

//Set up and enable Cross-Origin Resource Sharing (CORS)
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};
app.use(cors(corsOptions));

// set up the session
app.use(
    session({
        // by default, Passport uses a MemoryStore to keep track of the sessions
        secret: "If you don't try, you've already failed",
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: "strict", // Remove SameSite Warning
        },
    })
);

// init passport with the session
app.use(passport.initialize());
app.use(passport.session());


/* --- APIs --- */
app.use("/api", sessionRoute,signUpRoute /*, hikeRoute*/);


// activate the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});



