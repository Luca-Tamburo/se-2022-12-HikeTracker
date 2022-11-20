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
    name: Yup.string().required('Hike name requested'),
    photoFile: Yup.string().required('Hike image requested'),
    length: Yup.number().required('Hike length requested'),
    difficulty: Yup.string().required('Hike difficulty requested'),
    expectedTime: Yup.number().required('Hike expected time requested'),
    description: Yup.string().required('Hike description requested'),
    // startPoint: Yup.string().required('Hike start point requested'),
    // endPoint: Yup.string().required('Hike end point requested'),
});

export default AddHikeSchema;