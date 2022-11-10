'use strict';
const dayjs = require('dayjs');

/**
 * Constructor function for new Hike objects
 * @param {number} id hike id 
 * @param {char} title hike title
 * @param {char} description hike description
 * @param {char} authorName name of the authur of the hike
 * @param {char} authorSurname surname of the authur of the hike
 * @param {dayjs} uploadDate author upload date
 */

function Hike(id, title, description = "", authorName, authorSurname, uploadDate = null) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authorName = authorName;
    this.authorSurname = authorSurname;
    this.uploadDate = uploadDate === null ? dayjs() : dayjs(uploadDate); // If this parameter is not passed it's because it's a new hike, therefore current date is saved. 
}

function HikeList() {
    this.hikeList = [];

    // This function recieves a Hike object as parameter and adds it to the list
    this.addNewHike = (hike) => {
        this.hikeList.push(hike)
    }
}

// This object is used to store the list of hikes
let hikes = HikeList()

/**
 * Constructor function for new HikeDetails objects
 * @param {number} id hike id 
 * @param {number} lenght lenght of the hike
 * @param {number} expectedTime expected time of the hike
 * @param {number} ascent ascent of the hike
 * @param {number} difficulty difficulty of the hike
 * @param {number} startPointId start point id of the hike
 * @param {number} endPointId end point id of the hike
 */

function HikeDetails(id, lenght, expectedTime, ascent, difficulty, startPointId, endPointId) {
    this.id = id;
    this.lenght = lenght;
    this.expectedTime = expectedTime;
    this.ascent = ascent;
    this.difficulty = difficulty;
    this.startPointId = startPointId;
    this.endPointId = endPointId;
    this.pointList = [];

    // This function recieves a Point object as parameter and adds it to the list
    this.addNewPoint = (point) => {
        this.pointsList.push(point)
    }
}

exports.Hike = Hike;
exports.hikes = hikes;
exports.HikeDetails = HikeDetails;