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
    { value: '1', title: 'Less than 500 mt' },
    { value: '2', title: 'Between 500 mt and 1000 mt' },
    { value: '3', title: 'Between 1000 mt and 2000 mt' },
    { value: '4', title: 'More than 2000 mt' },
]

const Ascent = [
    { value: '1', title: 'Between 0 and 1000 mt' },
    { value: '2', title: 'Between 1000 mt and 1500 mt' },
    { value: '3', title: 'Between 1500 mt and 2000 mt' },
    { value: '4', title: 'More than 2000 mt' },
]

const Difficulty = [
    { value: '1', title: 'Tourist' },
    { value: '2', title: 'Hiker' },
    { value: '3', title: 'Professional Hiker' },
]

const ExpectedTime = [
    { value: '1', title: 'Less than 2.30 h' },
    { value: '2', title: 'Between 2.30 h and 4 h' },
    { value: '3', title: 'Between 4 h and 5.30 h' },
    { value: '4', title: 'More than 5.30 h' },
]

const Length = [
    { value: '1', title: 'Less than 5 km' },
    { value: '2', title: 'Between 5 km and 10 km' },
    { value: '3', title: 'Between 10 km and 20 km' },
    { value: '4', title: 'More than 20 km' },
]

const Filter = [
    Range,
    Ascent,
    Difficulty,
    ExpectedTime,
    Length
]

export default Filter;