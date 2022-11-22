'use strict'

const fs = require('fs');

const writeText = (x) => {
    fs.writeFileSync(`./test/mockDB/testing.txt`, `${x}`, function (err) {
        if (err) throw err;
    });
}

const setTesting = (x) => {
    x ? writeText(1) : writeText(0);
}
const iAmTesting = () => {
    const testing=fs.readFileSync(`./test/mockDB/testing.txt`, "utf8");
    return parseInt(testing);
}

module.exports = { iAmTesting, setTesting };