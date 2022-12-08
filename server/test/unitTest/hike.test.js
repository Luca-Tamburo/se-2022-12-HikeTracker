'use strict';

const { iAmTesting, setTesting } = require('../mockDB/iAmTesting');
//va messo prima di chiamare il DAO. Così metti il setting a test. E usi il MOCKdao
setTesting(1);
const { createDatabase, deleteDatabase } = require('../mockDB/mockDB');

const { getHikes, addHike, getDetailsByHikeId, getGpxByHikeId , getPointsByHikeId, getHikeAuthor, getStartEndPointDistanceData, getHikesOfAuthor} = require("../../dao/hikeDao");
const { addPoint } = require('../../dao/pointDao');
const { addUser } = require('../../dao/userDao');


const cleanDb = async () => {
    await deleteDatabase()
    await createDatabase();
}

const addHikes = async () => {
    const p1 = await addPoint("Rifugio Melezè - Bellino - Val Varaita", "The building was a ...", "hut", 44.5742508675903, 6.98268919251859, 1757.43, "Bellino", "Cuneo", "Piemonte");
    const p2 = await addPoint("Monte Ferra", "Peak of Monte Ferra", "gpsCoordinates", 44.6020777802914, 6.98475264944136, 3094.14, null, null, null);
    const u = await addUser("antonioconte@gmail.com", "antonioconte", "localGuide", "antonio", "conte", "M","+393333333333", "password", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudG9uaW9jb2xlbGxpMTk5OEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFudG9jb2xlIn0.Vq9N8p9_6t-2yXJSKWzf4gm44TQ0k0zZJiA87Sh8Oog")
    //title, description, length, expectedTime, ascent, difficulty, startPointId, endPointId, authorId, uploadDate, photoFile
    const h1 = await addHike("Trail to MONTE FERRA", "Leaving the car in the large parking lot ...", 13, 5, 1336.71, "Professional Hiker", p1, p2, u, "2022-01-10", "https://images.unsplash.com/1");
    const h2 = await addHike("Trail to ROCCA PATANUA", "Patanua means naked in Piedmontese, ...", 9, 5.5, 923.62, "Professional Hiker", p1, p2, u, "2022-04-12", "https://images.unsplash.com/2");
}

describe("test hikes", () => {

    beforeAll(async () => {
        await cleanDb();
        await addHikes();
    });
    
    // Call tests
    testgetHikes()
    testgetDetailsByHikeId(1, 3) // hike id, wrongId
    testgetGpxByHikeId(1, 3) // hike id, wrongId
    testgetPointsByHikeId(1) // hike id
    testgetHikeAuthor(1, 3) // hike id, wrongId 
    testgetStartEndPointDistanceData(1, 3) // hike id, wrongId
    testgetHikesOfAuthor(3) // author id
});

function testgetHikes() {
    test("test getHikes", async () => {
        let hikes = await getHikes();
        expect(hikes).toEqual([
            {
                "id": 1,
                "title": "Trail to MONTE FERRA",
                "description": "Leaving the car in the large parking lot ...",
                "length": 13,
                "expectedTime": 5,
                "ascent": 1336.71,
                "difficulty": "Professional Hiker",
                "authorName": "Antonio",
                "authorSurname": "Conte",
                "authorId":3,
                "uploadDate": "2022-01-10",
                "photoFile": "https://images.unsplash.com/1",
                "latitude": 44.5742508675903,
                "longitude": 6.98268919251859,
                "altitude": 1757.43,
                "city": "Bellino",
                "province": "Cuneo",
                "region": "Piemonte"
            },
            {
                "id": 2,
                "title": "Trail to ROCCA PATANUA",
                "description": "Patanua means naked in Piedmontese, ...",
                "length": 9,
                "expectedTime": 5.5,
                "ascent": 923.62,
                "difficulty": "Professional Hiker",
                "authorName": "Antonio",
                "authorSurname": "Conte",
                "authorId":3,
                "uploadDate": "2022-04-12",
                "photoFile": "https://images.unsplash.com/2",
                "latitude": 44.5742508675903,
                "longitude": 6.98268919251859,
                "altitude": 1757.43,
                "city": "Bellino",
                "province": "Cuneo",
                "region": "Piemonte"
            }
        ]
        );
    });
}

function testgetDetailsByHikeId(id, wongId) {
    test("test hikeDetails1", async () => {

        let hikeDetails1 = await getDetailsByHikeId(id);

        expect(hikeDetails1).toEqual(
            {
                "id": 1,
                "gpx": "1_Trail_to_MONTE_FERRA.gpx",
                "title": "Trail to MONTE FERRA",
                "description": "Leaving the car in the large parking lot ...",
                "authorName": "Antonio",
                "authorSurname": "Conte",
                "authorId":3,
                "uploadDate": "2022-01-10",
                "photoFile": "https://images.unsplash.com/1",
                "length": 13,
                "expectedTime": 5,
                "ascent": 1336.71,
                "difficulty": "Professional Hiker",
                "startPointId": 1,
                "endPointId": 2
            }
        );
    });

    test("test hikeDetails wrong id", async () => {
        let hikeDetails2 = await getDetailsByHikeId(wongId);
        expect(hikeDetails2).toEqual(undefined);
    });
}

function testgetGpxByHikeId(id, wongId) {
    test("test getGpxByHikeId", async () => {

        let gpx1 = await getGpxByHikeId(id);

        expect(gpx1).toEqual(
            "1_Trail_to_MONTE_FERRA.gpx"
        );
    });

    test("test getGpxByHikeId wrong id", async () => {
        let gpx2 = await getGpxByHikeId(wongId);
        expect(gpx2).toEqual(undefined);
    });
}

function testgetPointsByHikeId(id) {
    test("test getPointsByHikeId", async () => {
        let points = await getPointsByHikeId(id);
        expect(points).toEqual([
            {
                "id": 1,
                "name": "Rifugio Melezè - Bellino - Val Varaita",
                "description": "The building was a ...",
                "type": "hut",
                "latitude": 44.5742508675903,
                "longitude": 6.98268919251859,
                "altitude": 1757.43,
                "city": "Bellino",
                "province": "Cuneo"
            },
            {
                "id": 2,
                "name": "Monte Ferra",
                "description": "Peak of Monte Ferra",
                "type": "gpsCoordinates",
                "latitude": 44.6020777802914,
                "longitude": 6.98475264944136,
                "altitude": 3094.14,
                "city": null,
                "province": null
            }
        ]
        );
    });
}

function testgetHikeAuthor(id, wongId) {
    test("test getHikeAuthor", async () => {
        let authorId1 = await getHikeAuthor(id);
        expect(authorId1).toEqual(3);
    });

    test("test getHikeAuthor wrong id", async () => {
        let authorId2 = await getHikeAuthor(wongId);
        expect(authorId2).toEqual(undefined);
    });    
}

function testgetStartEndPointDistanceData(id, wongId) {
    test("test getStartEndPointDistanceData", async () => {
        let StartEndPointDistanceData1 = await getStartEndPointDistanceData(id);
        expect(StartEndPointDistanceData1).toEqual(
            {
                "startPointId": 1,
                "endPointId": 2,
                "length": 13
            }
        );
    });

    test("test getStartEndPointDistanceData wrong id", async () => {
        let StartEndPointDistanceData2 = await getStartEndPointDistanceData(wongId);
        expect(StartEndPointDistanceData2).toEqual(undefined);
    });    
}

function testgetHikesOfAuthor(authorId) {
    test("test getHikesOfAuthor", async () => {
        let hikesAuthor = await getHikesOfAuthor(authorId);
        expect(hikesAuthor).toEqual([
            {
                "id": 1,
                "title": "Trail to MONTE FERRA",
                "description": "Leaving the car in the large parking lot ...",
                "length": 13,
                "expectedTime": 5,
                "ascent": 1336.71,
                "difficulty": "Professional Hiker",
                "authorName": "Antonio",
                "authorSurname": "Conte",
                "authorId": 3,
                "uploadDate": "2022-01-10",
                "photoFile": "https://images.unsplash.com/1",
                "latitude": 44.5742508675903,
                "longitude": 6.98268919251859,
                "altitude": 1757.43,
                "city": "Bellino",
                "province": "Cuneo",
                "region": "Piemonte"
            },
            {
                "id": 2,
                "title": "Trail to ROCCA PATANUA",
                "description": "Patanua means naked in Piedmontese, ...",
                "length": 9,
                "expectedTime": 5.5,
                "ascent": 923.62,
                "difficulty": "Professional Hiker",
                "authorName": "Antonio",
                "authorSurname": "Conte",
                "authorId": 3,
                "uploadDate": "2022-04-12",
                "photoFile": "https://images.unsplash.com/2",
                "latitude": 44.5742508675903,
                "longitude": 6.98268919251859,
                "altitude": 1757.43,
                "city": "Bellino",
                "province": "Cuneo",
                "region": "Piemonte"
            }
        ]
        );
    });
}