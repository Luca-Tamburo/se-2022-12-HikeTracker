/*
* --------------------------------------------------------------------
*
* Package:         client
* Module:          src/services
* File:            geoApi.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

import axios from "axios";

const typeFormatter = (type) => {
    let typeFormatted;
    switch (type) {
        case 'StreetName': typeFormatted = 'address';
            break;
        case 'Locality': typeFormatted = 'name of location';
            break;
        case 'PointAddress': typeFormatted = 'GPS coordinates';
            break;
        default: typeFormatted = 'GPS coordinates';
    }
    return typeFormatted;
}

const getCityProvinceRegion = async (latitude, longitude) => {
    const URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";
    const point = await axios.get(URL + `${longitude},${latitude}`);
    const whatWeNeed = {
        city: point.data.address.City ? point.data.address.City : undefined,
        province: point.data.address.Subregion ? point.data.address.Subregion : undefined,
        region: point.data.address.Region ? point.data.address.Region : undefined,
        name: point.data.address.Match_addr ? point.data.address.Match_addr : undefined,
        type: typeFormatter(point.data.address.Addr_type)
    }
    return whatWeNeed;
};

export default getCityProvinceRegion;