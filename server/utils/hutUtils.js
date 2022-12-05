'use strict';

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

module.exports = { photoUrlValidator };