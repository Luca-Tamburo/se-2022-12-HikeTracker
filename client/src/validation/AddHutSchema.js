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

const mobileRegExp = /^(\+[1-9]{1,4}\s?)?[0-9]{3,12}$/

const AddHutSchema = Yup.object().shape({
    title: Yup.string().required('Hut name requested'),
    photoFile: Yup.string().url().required('Hike image requested'),
    room: Yup.number().integer().positive().required('Hut rooms required'),
    bed: Yup.number().integer().positive().required('Hut beds required'),
    phoneNumber: Yup.string().matches(mobileRegExp, 'Phone number is not valid').required('Hut phone number required'),
    altitude: Yup.number().required('Hut altitude required'),
    description: Yup.string().required('Hut description requested'),
    website: Yup.string().url(),
    image: Yup.mixed().required('Image file requested'),
});

export default AddHutSchema;