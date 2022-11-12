'use strict';
const express = require('express');
const router = express.Router();
const sessionUtils = require("../utils/sessionUtil");
const { check, checksValidation } = require("../utils/validationUtil");
const userDao = require("../dao/userDao"); // module for accessing the users in the DB
const {secret} = require("../config/auth.config");
const jwt = require('jwt-encode');
const nodemailer = require('../config/nodemailer.config');

const isNotLoggedIn = sessionUtils.isNotLoggedIn;

//custom rule to check the inserted role to be in the list of possible roles
const roleValidator = (inputRole) => {
    const role = inputRole.toLowerCase();
    return (role === "hiker" || role === "localguide" || role === "platformmanager" || role === "hutworker" || role === "emergencyoperator");
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

// Sign up a new user
router.post("/signup", isNotLoggedIn,

    check("email").exists().withMessage("This field is mandatory").bail()
        .isEmail().withMessage("This field must be a an email").normalizeEmail(),

    check("username").exists().withMessage("This field is mandatory").bail()
        .isString().isLength({ min: 7, max: 40 }).withMessage("This field is a string and must be from 7 to 40 characters").bail()
        .matches(/^[A-Za-z_][A-Za-z0-9_]+$/).withMessage("This field must contain only letters,numbers, underscore. Can't start with a number"),

    check("role").exists().withMessage("This field is mandatory").bail()
        .isString().custom((value, { req }) => (roleValidator(value))).withMessage("The role is not known"),

    check("password").exists().withMessage("This field is mandatory").bail()
        .isString().withMessage("This field must be a string").bail()
        .isLength({ min: 5, max: 40 }).withMessage("This field is a string and must be from 5 to 40 characters"),

    //per name, surname, phone number doppia validazione, per quando sono opzionali e per quando sono obbligatori

    check("name").if((value, { req }) => optionalBecomeMandatory(req.body.role)).exists().withMessage("This field is mandatory").bail()
        .isString().withMessage("This field must be a string").bail()
        .trim().isLength({ min: 5, max: 40 }).withMessage("This field is a string and must be from 5 to 40 characters"),

    check("name").if((value, { req }) => !optionalBecomeMandatory(req.body.role)).optional({ nullable: true })
        .isString().withMessage("This field must be a string").bail()
        .trim().isLength({ min: 5, max: 40 }).withMessage("This field is a string and must be from 5 to 40 characters"),

    check("surname").if((value, { req }) => optionalBecomeMandatory(req.body.role)).exists().withMessage("This field is mandatory").bail()
        .isString().withMessage("This field must be a string").bail()
        .trim().isLength({ min: 5, max: 40 }).withMessage("This field is a string and must be from 5 to 40 characters"),

    check("surname").if((value, { req }) => !optionalBecomeMandatory(req.body.role)).optional({ nullable: true })
        .isString().withMessage("This field must be a string").bail()
        .trim().isLength({ min: 5, max: 40 }).withMessage("This field is a string and must be from 5 to 40 characters"),

    check("phoneNumber").if((value, { req }) => optionalBecomeMandatory(req.body.role)).exists().withMessage("This field is mandatory").bail()
        .isString().withMessage("This field must be a string (consider the prefix of the phone number)").bail()
        .trim().isLength({ min: 5, max: 40 }).withMessage("This field is a string and must be from 5 to 40 characters").bail()
        .trim().matches(/^[+0-9][0-9 ]+$/).withMessage("This field must contain only numbers, the + for prefixes and spaces"),

    check("phoneNumber").if((value, { req }) => !optionalBecomeMandatory(req.body.role)).optional({ nullable: true })
        .isString().withMessage("This field must be a string (consider the prefix of the phone number)").bail()
        .trim().isLength({ min: 5, max: 40 }).withMessage("This field is a string and must be from 5 to 40 characters").bail()
        .trim().matches(/^[+0-9][0-9 ]+$/).withMessage("This field must contain only numbers, the + for prefixes and spaces"),
    checksValidation, usernameAvailabilityCheck,emailAvailabilityCheck,
    (req, res) => {
        try {
            //qui dentro genero hash, genero sale, genero confirmation code, metto user con tutti questi dati in db e invio mail
            //quando farò api per modificare stato utente da non attivo ad attivo, dovrò eliminare il confirmation code dal db, in modo che se lo cerco di nuovo non trovo nulla e l'operazione fallisce 
            //const token = jwt.sign({email: req.body.email,username:req.body.username}, secret);
            const url="http://localhost:3001/api/userconfirm/" /*+token */;
            nodemailer.sendConfirmationEmail(req.body.username,req.body.email,url);
            res.status(201).json({ message: "Do something" });
            
        } catch (error) { res.status(503).json({ error: `Database error while signing up the user` }); }
    }
);

module.exports = router;