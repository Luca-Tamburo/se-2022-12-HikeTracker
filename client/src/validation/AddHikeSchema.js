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

const AddHikeSchema = Yup.object().shape({
    title: Yup.string().required('Hike name requested'),
    photoFile: Yup.string().url().required('Hike image requested'),
    difficulty: Yup.mixed().oneOf(['Tourist', 'Hiker', 'Professional Hiker']),
    expectedTime: Yup.number().positive().required('Hike expected time requested'),
    description: Yup.string().required('Hike description requested'),
    file: Yup.mixed().required('Gpx file requested'),
    image: Yup.mixed().required('Image file requested'),
});

export default AddHikeSchema;