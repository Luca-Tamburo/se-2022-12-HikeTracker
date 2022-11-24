/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/constants
* File:            AddParkingForm.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Formik fields name
const FieldInput = [
    { xsCol: '12', idName: 'title', placeholder: 'Insert the parking name', label: 'Name' },
    { xsCol: '4', idName: 'latitude', placeholder: 'Insert the parking latitude in mt', label: 'Latitude' },
    { xsCol: '4', idName: 'longitude', placeholder: 'Insert the parking longitude in mt', label: 'Longitude' },
    { xsCol: '4', idName: 'altitude', placeholder: 'Insert the parking altitude in mt', label: 'Altitude' },
]

const FieldSelect = [
    { xsCol: '4', idName: 'region', defaultLabel: 'Insert the parking region', label: 'Region' },
    { xsCol: '4', idName: 'province', defaultLabel: 'Insert the parking province', label: 'Province' },
    { xsCol: '4', idName: 'city', defaultLabel: 'Insert the parking city', label: 'City' },
]

const AddParkingForm = [
    FieldInput,
    FieldSelect
]

export default AddParkingForm;