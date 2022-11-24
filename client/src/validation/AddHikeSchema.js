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

import * as Yup from 'yup';

const AddHikeSchema = Yup.object().shape({
    title: Yup.string().required('Hike name requested'),
    photoFile: Yup.string().required('Hike image requested'),
    difficulty: Yup.string().required('Hike difficulty requested'),
    expectedTime: Yup.number().required('Hike expected time requested'),
    description: Yup.string().oneOf(['Tourist', 'Hiker', 'Professional Hiker']),
    file: Yup.mixed().required('Gpx file requested'),
    // startPoint: Yup.string().required('Hike start point requested'),
    // endPoint: Yup.string().required('Hike end point requested'),
});

export default AddHikeSchema;