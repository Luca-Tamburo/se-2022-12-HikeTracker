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
 * @param {char} photoFile path to photo of the hike
 */

class Hike {
    constructor(id, title, description = "", authorName, authorSurname, uploadDate = null, photoFile) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authorName = capitalizeFirstLetter(authorName);
        this.authorSurname = capitalizeFirstLetter(authorSurname);
        this.uploadDate = uploadDate === null ? dayjs().format('YYYY/MM/DD') : dayjs(uploadDate).format('YYYY/MM/DD'); // If this parameter is not passed it's because it's a new hike, therefore current date is saved. 
        this.photoFile = photoFile;

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
}

/**
 * Constructor function for new HikeDetails objects
 * @param {number} id hike id 
 * @param {number} length length of the hike
 * @param {number} expectedTime expected time of the hike
 * @param {number} ascent ascent of the hike
 * @param {number} difficulty difficulty of the hike
 * @param {number} startPointId start point id of the hike
 * @param {number} endPointId end point id of the hike
 */

class HikeDetails extends Hike {
    constructor(id, title, description = "", authorName, authorSurname, uploadDate = null, photoFile, length = 0, expectedTime = 0, ascent = 0, difficulty = 0, startPointId = 0, endPointId = 0) {
        super(id, title, description, authorName, authorSurname, uploadDate, photoFile);
        this.length = length;
        this.expectedTime = expectedTime;
        this.ascent = ascent;
        this.difficulty = difficulty;
        this.startPointId = startPointId;
        this.endPointId = endPointId;
        this.pointList = [];
    }
}

class HikeList {
    constructor() {
        this.hikeList = [];
    }
}

// This object is used to store the list of HikeDetails
let hikes = new HikeList()

exports.hikes = hikes;
exports.HikeDetails = HikeDetails;