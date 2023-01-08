/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/validation
* File:            AddHutSchema.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import * as Yup from 'yup';

const url = /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
const mobileRegExp = /^(\+[1-9]{1,4}\s?)?\d{3,12}$/

const AddHutSchema = Yup.object().shape({
    title: Yup.string().required('Hut name requested'),
    photoFile: Yup.string().matches(url, "Invalid url"),
    room: Yup.number().integer().positive().required('Hut rooms required'),
    bed: Yup.number().integer().positive().required('Hut beds required'),
    phoneNumber: Yup.string().matches(mobileRegExp, 'Phone number is not valid').required('Hut phone number required'),
    altitude: Yup.number().required('Hut altitude required'),
    description: Yup.string().required('Hut description requested'),
    website: Yup.string().matches(url, "Invalid url"),
    image: Yup.mixed(),
});

export default AddHutSchema;