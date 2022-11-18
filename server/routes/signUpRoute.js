'use strict';
const express = require('express');
const router = express.Router();
const sessionUtils = require("../utils/sessionUtil");
const { check, checksValidation } = require("../utils/validationUtil");
const userDao = require("../dao/userDao"); // module for accessing the users in the DB
const { secret } = require("../config/auth.config");
const sign = require('jwt-encode');
const nodemailer = require('../config/nodemailer.config');
const path = require('path');
const { roleValidator, optionalBecomeMandatory, emailAvailabilityCheck, usernameAvailabilityCheck } = require("../utils/signUpUtils");
const isNotLoggedIn = sessionUtils.isNotLoggedIn;



// POST /api/signup
// Sign up a new user

router.post("/signup", isNotLoggedIn,

    check("email").exists().withMessage("This field is mandatory").bail()
        .isEmail().withMessage("This field must be a an email").normalizeEmail(),

    check("username").exists().withMessage("This field is mandatory").bail()
        .isString().withMessage("This field is a string").bail()
        //TODO: QUESTA è LA REGEX PER LO USERNAME
        .matches(/^[A-Za-z_][A-Za-z0-9_]+$/).withMessage("This field must contain only letters,numbers, underscore. Can't start with a number"),

    check("role").exists().withMessage("This field is mandatory").bail()
        .isString().custom((value, { req }) => (roleValidator(value))).withMessage("Invalid role"),

    check("password").exists().withMessage("This field is mandatory").bail()
        .isString().withMessage("This field must be a string").bail()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minSymbols: 1,
            minNumbers: 1
        }).withMessage("Invalid password"),
    //per name, surname, phone number doppia validazione, per quando sono opzionali e per quando sono obbligatori

    check("name").if((value, { req }) => optionalBecomeMandatory(req.body.role)).exists().withMessage("This field is mandatory").bail()
        .isString().withMessage("This field must be a string").bail(),

    check("name").if((value, { req }) => !optionalBecomeMandatory(req.body.role)).optional({ nullable: true })
        .isString().withMessage("This field must be a string").bail(),

    check("surname").if((value, { req }) => optionalBecomeMandatory(req.body.role)).exists().withMessage("This field is mandatory").bail()
        .isString().withMessage("This field must be a string").bail(),

    check("surname").if((value, { req }) => !optionalBecomeMandatory(req.body.role)).optional({ nullable: true })
        .isString().withMessage("This field must be a string").bail(),

    check("phoneNumber").if((value, { req }) => optionalBecomeMandatory(req.body.role)).exists().withMessage("This field is mandatory").bail()
        .isString().withMessage("This field must be a string (consider the prefix of the phone number)").bail()
        .trim().isLength({ min: 5, max: 40 }).withMessage("This field is a string and must be from 5 to 40 characters").bail()
        .trim().matches(/^[+0-9][0-9 ]+$/).withMessage("This field must contain only numbers, the + for prefixes and spaces"),

    check("phoneNumber").if((value, { req }) => !optionalBecomeMandatory(req.body.role)).optional({ nullable: true })
        .isString().withMessage("This field must be a string (consider the prefix of the phone number)").bail()
        .trim().isLength({ min: 5, max: 40 }).withMessage("This field is a string and must be from 5 to 40 characters").bail()
        .trim().matches(/^[+0-9][0-9 ]+$/).withMessage("This field must contain only numbers, the + for prefixes and spaces"),

    checksValidation, usernameAvailabilityCheck, emailAvailabilityCheck,

    async (req, res) => {
        try {
            //qui dentro creo confirmation code, chiamo userDao per inserire i del nuovo utente ned db e invio mail

            //metto insieme i dati per creare il jwt
            const data = {
                email: req.body.email,
                username: req.body.username
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

            //creo il jwt
            const jwt = sign(data, secret);

            //creo l'url
            const url = "http://localhost:3001/api/signup/" + jwt;


            const name = req.body.name ? req.body.name.trim() : null;
            const surname = req.body.surname ? req.body.surname.trim() : null;
            const phone = req.body.phoneNumber ? req.body.phoneNumber.trim() : null;
            
            //mando dati a dao
            userDao.addUser(req.body.email.trim(), req.body.username.trim(), roleFormatter(req.body.role.trim()), name, surname, phone, req.body.password, jwt);

            //mando mail di conferma
            nodemailer.sendConfirmationEmail(req.body.username, req.body.email, url);

            res.status(201).json({ message: "User signed up in the system. Please check your mail to activate the account" });
        } catch (error) { res.status(503).json({ error: `Service unavailable` }); }
    }
);

// GET /api/signup/:confirmationCode
// Confirm a user
router.get("/signup/:confirmationCode",
    async (req, res) => {
        try {

            //chiamo una funzione di userdao che ritorna true se è riuscita a confermare l'utente, false altrimenti 
            const ok = await userDao.activateUser(req.params.confirmationCode);

            //se tutto ok, ritorno una pagina html di conferma, altrimenti una pagina html di errore
            ok ?
                res.sendFile(path.join(__dirname, '..//utils/afterConfirmEmailPages/confirm.html')) :
                res.sendFile(path.join(__dirname, '..//utils/afterConfirmEmailPages/error.html'))
        } catch (error) { res.status(503).json({ error: `Service unavailable` }); }
    });


module.exports = router;