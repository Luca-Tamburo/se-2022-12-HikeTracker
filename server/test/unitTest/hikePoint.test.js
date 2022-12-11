'use strict';

const { iAmTesting, setTesting } = require('../mockDB/iAmTesting');
//va messo prima di chiamare il DAO. Così metti il setting a test. E usi il MOCKdao
setTesting(1);
const { createDatabase, deleteDatabase } = require('../mockDB/mockDB');

const { addHike } = require("../../dao/hikeDao");
const { addPoint, addPointHike } = require('../../dao/pointDao');
const { addUser } = require('../../dao/userDao');
const { getHikePointCorrispondance, deleteHikePointCorrispondance } = require('../../dao/hikePointDao');
const { getRefPointsByHikeId } = require('../../dao/hikePointDao');

const cleanDb = async () => {
    await deleteDatabase()
    await createDatabase();
}

const addHikes = async () => {
    const p1 = await addPoint("Rifugio Melezè - Bellino - Val Varaita", "The building was a ...", "hut", 44.5742508675903, 6.98268919251859, 1757.43, "Bellino", "Cuneo", "Piemonte");
    const p2 = await addPoint("Monte Ferra", "Peak of Monte Ferra", "gpsCoordinates", 44.6020777802914, 6.98475264944136, 3094.14, null, null, null);
    const u = await addUser("antonioconte@gmail.com", "antonioconte", "localGuide", "antonio", "conte", "M", "+393333333333", "password", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudG9uaW9jb2xlbGxpMTk5OEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFudG9jb2xlIn0.Vq9N8p9_6t-2yXJSKWzf4gm44TQ0k0zZJiA87Sh8Oog")
    //title, description, length, expectedTime, ascent, difficulty, startPointId, endPointId, authorId, uploadDate, photoFile
    const h1 = await addHike("Trail to MONTE FERRA", "Leaving the car in the large parking lot ...", 13, 5, 1336.71, "Professional Hiker", p1, p2, u, "2022-01-10", "https://images.unsplash.com/1");

    await addPointHike(h1, p1)
    await addPointHike(h1, p2)
}

describe("test hikePoint", () => {

    beforeAll(async () => {
        await cleanDb();
        await addHikes();
    });

    // Call tests
    testgetHikePointCorrispondance(1, 3, 1) // hike id, wrongId, pointId
    testdeleteHikePointCorrispondance(1, 1)
    testgetRefPointsByHikeId(1, 3) // hike id, wrongId
});

function testgetHikePointCorrispondance(id, wongId, pointId) {
    test("test getHikePointCorrispondance", async () => {

        let correspondance1 = await getHikePointCorrispondance(id, pointId);
        expect(correspondance1).toEqual(true);
    });

    test("test getHikePointCorrispondance wrong id", async () => {
        let correspondance2 = await getHikePointCorrispondance(wongId, pointId);
        expect(correspondance2).toEqual(false);
    });
}

function testdeleteHikePointCorrispondance(id, pointId) {
    test("test deleteHikePointCorrispondance", async () => {
        await deleteHikePointCorrispondance(id, pointId);
        let correspondance3 = await getHikePointCorrispondance(id, pointId);
        expect(correspondance3).toEqual(false);
    });
}

function testgetRefPointsByHikeId(id, wongId) {
    test("test getRefPointsByHikeId", async () => {

        let points1 = await getRefPointsByHikeId(id);
        expect(points1).toEqual([
            {
                "id": 1,
                "name": "Rifugio Melezè - Bellino - Val Varaita",
                "type": "hut",
                "latitude": 44.5742508675903,
                "longitude": 6.98268919251859
            }, {
                "id": 2,
                "name": "Monte Ferra",
                "type": "gpsCoordinates",
                "latitude": 44.6020777802914,
                "longitude": 6.98475264944136
            }]);
    });
}