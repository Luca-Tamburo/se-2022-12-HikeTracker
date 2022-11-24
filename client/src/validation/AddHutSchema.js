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

import * as Yup from 'yup';

const AddHutSchema = Yup.object().shape({
    title: Yup.string().required('Hut name requested'),
    photoFile: Yup.string().required('Hike image requested'),
    room: Yup.number().required('Hut rooms required'),
    bed: Yup.number().required('Hut beds required'),
    phoneNumber: Yup.string().required('Hut phone number required'),
    latitude: Yup.number().required('Hut latitude required'),
    longitude: Yup.number().required('Hut longitude required'),
    altitude: Yup.number().required('Hut altitude required'),
    region: Yup.string().required('Hut region required'),
    province: Yup.string().required('Hut province required'),
    city: Yup.string().required('Hut city required'),
    description: Yup.string().required('Hut description requested'),
    // type: Yup.string().required('Hut type requested'),  //Si può mettere di default dato che so a priori che è un hut?
});

export default AddHutSchema;