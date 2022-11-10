'use strict';
const dayjs = require('dayjs');

/**
 * Constructor function for new Point objects
 * @param {number} id point id 
 * @param {char} name point name
 * @param {char} description point description
 * @param {char} type point type
 * @param {number} latitude point latitude
 * @param {number} longitude point longitude 
 * @param {number} altitude point altitude 
 * @param {char} city city of the point 
 * @param {char} province province of the point 
 * @param {char} region region of the point 
 */

// WHAT TO DO WITH CITY, PROVINCE AND REGION IF THEY ARE NULL ?
function Point(id, name, description = "", type, latitude, longitude, altitude, city, province, region) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.latitude = latitude;
    this.longitude = longitude; 
    this.altitude = altitude; 
    this.city = city; 
    this.province = province; 
    this.region = region;
}

exports.Point = Point;