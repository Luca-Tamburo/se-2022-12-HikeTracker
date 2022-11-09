/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/constants
* File:            Filter.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Filter name
const Range = [
    { title: 'Less than 500 mt' },
    { title: 'Between 500 mt and 1000 mt' },
    { title: 'Between 1000 mt and 2000 mt' },
    { title: 'More than 2000 mt' },
]

const Ascent = [
    { title: 'Between 0 and 1000 mt' },
    { title: 'Between 1000 mt and 1500 mt' },
    { title: 'Between 1500 mt and 2000 mt' },
    { title: 'Between 2000 mt and 2500 mt' },
    { title: 'More than 2500 mt' },
]

const Difficulty = [
    { title: 'E' },
    { title: 'E+' },
    { title: 'EE' },
    { title: 'EEA' },
    { title: 'T' },
    { title: 'T+' },
]

const ExpectedTime = [
    { title: 'Less than 1.5 h' },
    { title: 'Between 1.5 h and 3 h' },
    { title: 'Between 3 h and 5 h' },
    { title: 'More than 5 h' },
]

const Length = [
    { title: 'Less than 5 km' },
    { title: 'Between 5 km and 10 km' },
    { title: 'Between 10 km and 20 km' },
    { title: 'Between 20 km and 30 km' },
    { title: 'More than 40 km' },
]

const Filter = [
    Range,
    Ascent,
    Difficulty,
    ExpectedTime,
    Length
]

export default Filter;