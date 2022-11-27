'use strict';

const userDao = require("../dao/userDao"); // module for accessing the users in the DB

//custom rule to check the inserted role to be in the list of possible roles
const roleValidator = (inputRole) => {
    const role = inputRole.toLowerCase();
    return (role === "hiker" || role === "localguide" || role === "platformmanager" || role === "hutworker" || role === "emergencyoperator");
};

const genderValidator = (inputGender) => {
    const gender = inputGender.toLowerCase();
    return (gender === "m" || gender === "f" || gender === "u");
};


//custom rule to check if the user is trying to inscribe a role that needs name,surname,phone number mandatorialy
const optionalBecomeMandatory = (inputRole) => {
    const role = inputRole.toLowerCase();
    return (role === "localguide" || role === "hutworker" || role === "emergencyoperator");
};

// custom middleware: check if a given email is already in the system
const emailAvailabilityCheck = (req, res, next) => {
    userDao.getUserByEmail(req.body.email)
        .then((value) => {
            return value === undefined ? next() : res.status(409).json({ error: `Email already in the system!` });
        })
};

// custom middleware: check if a given username is already in the system
const usernameAvailabilityCheck = (req, res, next) => {
    userDao.getUserByUsername(req.body.username)
        .then((value) => {
            return value === undefined ? next() : res.status(409).json({ error: `Username already in the system!` });
        })
};

const roleFormatter = (role) => {
    let roleFormatted;
    switch (role.toLowerCase()) {
        case 'hiker': roleFormatted = 'hiker';
            break;
        case 'localguide': roleFormatted = 'localGuide';
            break;
        case 'platformmanager': roleFormatted = 'platformManager';
            break;
        case 'hutworker': roleFormatted = 'hutWorker';
            break;
        case 'emergencyoperator': roleFormatted = 'emergencyOperator';
            break;
    }
    return roleFormatted;
}

const genderFormatter = (gender) => {
    let genderFormatted;
    switch (gender.toLowerCase()) {
        case 'm': genderFormatted = 'M';
            break;
        case 'f': genderFormatted = 'F';
            break;
        case 'u': genderFormatted = 'U';
            break;
    }
    return genderFormatted;
}

module.exports = { roleValidator, genderValidator, optionalBecomeMandatory, emailAvailabilityCheck, usernameAvailabilityCheck, roleFormatter, genderFormatter };