'use strict';

const photoUrlValidator = async (photoUrl) => {
    const isImageURL = require('image-url-validator').default;
    return await isImageURL(photoUrl);
}

module.exports = { photoUrlValidator };