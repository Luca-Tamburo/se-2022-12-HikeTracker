'use strict';


const difficultyValidator = (inputDiff) => {
    const diff = inputDiff.toLowerCase();
    //tourist,hiker,professional hiker
    return (diff === "tourist" || diff === "hiker" || diff === "professional hiker");
};


const difficultyFormatter = (difficulty) => {
    let difficultyFormatted;
    switch (difficulty.toLowerCase()) {
        case 'tourist': difficultyFormatted = 'Tourist';
            break;
        case 'hiker': difficultyFormatted = 'Hiker';
            break;
        case 'professional hiker': difficultyFormatted = 'Professional Hiker';
            break;

    }
    return difficultyFormatted;
}

const makeRequestForPhoto = async (photoUrl) => {

    const isImageURL = require('image-url-validator').default;

    const stopWaiting = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(false), 1000)
        });
    }
    const searchImage = (photoUrl) => {
        return new Promise((resolve, reject) => {
            const res = isImageURL(photoUrl);
            resolve(res);
        });
    }
    const out = () => Promise.any([searchImage(photoUrl), stopWaiting()]);


    const x = await out()
    return x;
}

const photoUrlValidator = async (photoUrl) => {
    const ret = await makeRequestForPhoto(photoUrl);
    return ret;
}

module.exports = {  difficultyValidator, difficultyFormatter, photoUrlValidator };