/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/lib/helpers
* File:            location.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import provinces from '../../data/provinces'
import cities from '../../data/cities'
import regions from '../../data/regions'

export const __PROVINCES = provinces
export const __CITIES = cities
export const __REGIONS = regions

export const getLocationFullName = (regionId, provinceId, cityId) => {
    const regionName = regions.find(region => region.regione === regionId).nome
    const provinceName = provinces.find(province => province.istat_provincia === provinceId).provincia
    const cityName = cities.find(city => city.codiceistatcomune === cityId).comune
    return `${regionName},${cityName}, ${provinceName}`
}

export const getCitiesForProvince = (province) => cities.filter(city => city.provincia === province)
export const getProvinceForRegion = (region) => provinces.filter(provinces => provinces.regione === region)

export const getProvinceName = (province) => provinces.find(p => p.provincia === province).nome
export const getRegionName = (region) => regions.find(r => r.regione === region).nome
