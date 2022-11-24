/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/validation
* File:            AddParkingSchema.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

import * as Yup from 'yup';

const AddParkingSchema = Yup.object().shape({
    title: Yup.string().required('Parking name requested'),
    // photoFile: Yup.string().required('Hike image requested'),
    latitude: Yup.number().required('Parking latitude required'),
    longitude: Yup.number().required('Parking longitude required'),
    altitude: Yup.number().required('Parking altitude required'),
    region: Yup.string().required('Parking region required'),
    province: Yup.string().required('Parking province required'),
    city: Yup.string().required('Parking city required'),
    description: Yup.string().required('Parking description requested'),
    // type: Yup.string().required('Parking type requested'),  //Si può mettere di default dato che so a priori che è un hut?
});

export default AddParkingSchema;