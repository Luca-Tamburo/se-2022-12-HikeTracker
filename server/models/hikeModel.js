'use strict';
const dayjs = require('dayjs');

/**
 * Constructor function for new Hike objects
 * @param {number} id hike id 
 * @param {char} title hike title
 * @param {char} description hike description
 * @param {number} lenght lenght of the hike
 * @param {number} expectedTime expected time of the hike
 * @param {number} ascent ascent of the hike
 * @param {number} difficulty difficulty of the hike
 * @param {number} startPointId start point id of the hike
 * @param {number} endPointId end point id of the hike
 * @param {number} authorId hike author id
 * @param {dayjs} uploadDate up load date
 * @param {char} gpxFile gpx file of the hike
 */

//AUTHUR NAME, GPX FILE FORMAT (??)
function Hike(id, title, description = "", lenght, expectedTime, ascent, difficulty, startPointId, endPointId, authorId, uploadDate = null, gpxFile) {
    this.id = id;
    this.title = title 
    this.description = description;
    this.lenght = lenght;
    this.expectedTime = expectedTime;
    this.ascent = ascent;
    this.difficulty = difficulty;
    this.startPointId = startPointId;
    this.endPointId = endPointId;
    this.authorId = authorId;
    this.uploadDate = uploadDate === null ? dayjs() : dayjs(uploadDate); // If this parameter is not passed it's because it's a new hike, therefore current date is saved.
    this.gpxFile = gpxFile; 
}

function HikeList() {
    this.hikeList = [];

    // This function recieves a Hike object as parameter and adds it to the list
    this.addNewHike = (hike) => {
        this.hikeList.push(hike)
    }

    // This function recieves a Hike id as parameter and removes the corresponding object from the list
    this.removeHike = (id) => {
        this.hikeList.filter((element) => element.id !== id)
    }
}

exports.Hike = Hike;
exports.HikeList = HikeList;