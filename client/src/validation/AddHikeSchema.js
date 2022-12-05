/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/validation
* File:            AddHikeSchema.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import * as Yup from 'yup';

const url = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

const AddHikeSchema = Yup.object().shape({
    title: Yup.string().required('Hike name requested'),
    photoFile: Yup.string().matches(url, "Invalid url"),
    difficulty: Yup.mixed().oneOf(['Tourist', 'Hiker', 'Professional Hiker']),
    expectedTime: Yup.number().positive().required('Hike expected time requested'),
    description: Yup.string().required('Hike description requested'),
    file: Yup.mixed().required('Gpx file requested'),
    image: Yup.mixed(),
});

export default AddHikeSchema;