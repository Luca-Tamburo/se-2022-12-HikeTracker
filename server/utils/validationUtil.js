'use strict';
const { check, validationResult } = require("express-validator"); // validation middleware

const errorFormatter = ({ location, msg, param }) => {
    return `${location}[${param}]: ${msg}`;
};

// custom middleware: validate the checks
const checksValidation = async (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (errors.isEmpty()) return next();
    return res.status(422).json({ errors: errors.array({}) }).end();
};

module.exports = { check, checksValidation };