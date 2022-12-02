'use strict';
const fetch = require('node-fetch');

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

    const data = await (await fetch(URL + `${longitude},${latitude}`)).json();
    const whatWeNeed = {
        city: data.address.City?data.address.City:undefined,
        province: data.address.Subregion?data.address.Subregion:undefined,
        region: data.address.Region?data.address.Region:undefined,
        name: data.address.Match_addr?data.address.Match_addr:undefined,
        type: typeFormatter(data.address.Addr_type)
    }
    return whatWeNeed;
};

module.exports = { getCityProvinceRegion };