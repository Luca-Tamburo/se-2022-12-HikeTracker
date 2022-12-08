'use strict';

const { iAmTesting, setTesting } = require('../mockDB/iAmTesting');
//va messo prima di chiamare il DAO. Così metti il setting a test. E usi il MOCKdao
setTesting(1);
const { createDatabase, deleteDatabase } = require('../mockDB/mockDB');

const { addHike, getDetailsByHikeId } = require("../../dao/hikeDao");
const { addPoint } = require('../../dao/pointDao');
const { addUser } = require('../../dao/userDao');
const { updateStartPoint, updateEndPoint} = require('../../dao/editHikeDao');

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
}

describe("test editHike", () => {

    beforeAll(async () => {
        await cleanDb();
        await addHikes();
    });
    
    // Call tests
    testupdateStartPoint(2, 1) // pointId, hike id 
    testupdateEndPoint(1, 1) // pointId, hike id 
});

function testupdateStartPoint(id, wongId, pointId) {
    test("test updateStartPoint", async () => {
        let hikeChanged1 = await updateStartPoint(id,pointId);
        expect(hikeChanged1).toEqual(true);
    });
}

function testupdateEndPoint(id, pointId) {
    test("test updateEndPoint", async () => {
        let hikeChanged2 = await updateEndPoint(id,pointId);
        expect(hikeChanged2).toEqual(true);
    });
}