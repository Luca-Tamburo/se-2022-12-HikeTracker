// cypress/plugins/index.js

const cypressEslint = require('cypress-eslint-preprocessor');

module.exports = (on) => {
    on('file:preprocessor', cypressEslint());
};