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
    altitude: Yup.number().required('Parking altitude required'),
    description: Yup.string().required('Parking description requested'),
    capacity: Yup.number().integer().positive().required('Maximum number of cars requested'),
});

export { AddParkingSchema };