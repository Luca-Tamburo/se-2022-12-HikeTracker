'use strict';

const typeValidator = (inputType) => {
    const type = inputType.toLowerCase();
    //address, name of location, gps coordinates, hut, parking lot
    return (type === "address" || type === "name of location" || type === "gps coordinates" || type === "hut" || type === "parking lot");
};

const difficultyValidator = (inputDiff) => {
    const diff = inputDiff.toLowerCase();
    //tourist,hiker,professional hiker
    return (diff === "tourist" || diff === "hiker" || diff === "professional hiker" );
};

const typeFormatter = (type) => {
    let typeFormatted;
    switch (type.toLowerCase()) {
        case 'address': typeFormatted = 'address';
            break;
        case 'name of location': typeFormatted = 'name of location';
            break;
        case 'gps coordinates': typeFormatted = 'GPS coordinates';
            break;
        case 'hut': typeFormatted = 'hut';
            break;
        case 'parking lot': typeFormatted = 'parking lot';
            break;
    }
    return typeFormatted;
}


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
module.exports = { typeValidator,difficultyValidator,typeFormatter,difficultyFormatter };