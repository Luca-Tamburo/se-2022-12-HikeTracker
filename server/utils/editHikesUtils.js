'use strict';
const hikeDao = require('../dao/hikeDao');

const isThisMyHike = async (hikeId, userId) => {
    const authorId = await hikeDao.getHikeAuthor(hikeId);
    return authorId == userId;
}

const calcDist = (trackPoint, point) => {
    const dm = trackPoint.distanceFromPoint({ latitude: point.latitude, longitude: point.longitude });
    const dkm = parseFloat((dm / 1000).toFixed(3)); //distance x is by default in meters. I convert it in km 
    return dkm;
}

const isItNearEnough = (trackPoint, point, length) => {
    const lengthToUse = (length < 10 ? length / 2 : 5);
    return calcDist(trackPoint, point) <= lengthToUse;
}
module.exports = { isThisMyHike, calcDist, isItNearEnough };