/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/constants
* File:            AddHutForm.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Formik fields name
const FieldInput = [
    { xsCol: '6', idName: 'title', placeholder: 'Insert the hut name', label: 'Name' },
    { xsCol: '6', idName: 'photoFile', placeholder: 'Insert the hut image url', label: 'Image' },
    { xsCol: '4', idName: 'room', placeholder: 'Insert the number of rooms', label: 'Number of rooms' },
    { xsCol: '4', idName: 'bed', placeholder: 'Insert the number of beds', label: 'Number of beds' },
    { xsCol: '4', idName: 'phoneNumber', placeholder: 'Insert the hut phone number', label: 'Phone number' },
    { xsCol: '4', idName: 'latitude', placeholder: 'Insert the hut latitude in mt', label: 'Latitude' },
    { xsCol: '4', idName: 'longitude', placeholder: 'Insert the hut longitude in mt', label: 'Longitude' },
    { xsCol: '4', idName: 'altitude', placeholder: 'Insert the hut altitude in mt', label: 'Altitude' },
]

const FieldSelect = [
    { xsCol: '4', idName: 'region', defaultLabel: 'Insert the hut region', label: 'Region' },
    { xsCol: '4', idName: 'province', defaultLabel: 'Insert the hut province', label: 'Province' },
    { xsCol: '4', idName: 'city', defaultLabel: 'Insert the hut city', label: 'City' },
]

const AddHutForm = [
    FieldInput,
    FieldSelect
]

export default AddHutForm;