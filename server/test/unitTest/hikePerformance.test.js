'use strict';

const { iAmTesting, setTesting } = require('../mockDB/iAmTesting');
//va messo prima di chiamare il DAO. Così metti il setting a test. E usi il MOCKdao
setTesting(1);
const { createDatabase, deleteDatabase } = require('../mockDB/mockDB');

const { addHike } = require("../../dao/hikeDao");
const { addPoint } = require('../../dao/pointDao');
const { addUser } = require('../../dao/userDao');
const { addHikePerformance, terminateHikePerformance, getTerminatedHikes, getStartedHikeByUserId } = require('../../dao/hikePerformanceDao');


const cleanDb = async () => {
    await deleteDatabase()
    await createDatabase();
}

const addHikes = async () => {
    const p1 = await addPoint("Rifugio Melezè - Bellino - Val Varaita", "The building was a ...", "hut", 44.5742508675903, 6.98268919251859, 1757.43, "Bellino", "Cuneo", "Piemonte");
    const p2 = await addPoint("Monte Ferra", "Peak of Monte Ferra", "gpsCoordinates", 44.6020777802914, 6.98475264944136, 3094.14, null, null, null);
    const u = await addUser("antonioconte@gmail.com", "antonioconte", "localGuide", "antonio", "conte", "M","+393333333333", "password", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudG9uaW9jb2xlbGxpMTk5OEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFudG9jb2xlIn0.Vq9N8p9_6t-2yXJSKWzf4gm44TQ0k0zZJiA87Sh8Oog")
    const h1 = await addHike("Trail to MONTE FERRA", "Leaving the car in the large parking lot ...", 13, 5, 1336.71, "Professional Hiker", p1, p2, u, "2022-01-10", "https://images.unsplash.com/1");
    const h2 = await addHike("Trail to ROCCA PATANUA", "Patanua means naked in Piedmontese, ...", 9, 5.5, 923.62, "Professional Hiker", p1, p2, u, "2022-04-12", "https://images.unsplash.com/2");
    const id = await addHikePerformance(10, h1, u); // started
    await terminateHikePerformance(12, id) // terminated
    const id2 = await addHikePerformance(3, h2, u); // started 2
}

describe("test hikes", () => {

    beforeAll(async () => {
        await cleanDb();
        await addHikes();
    });
    
    // Call tests
    testgetTerminatedHikes(4) // userId
    testgetStartedHikeByUserId(4, 2) // userId, wronguserId
    testterminateHikePerformance(5, 2) // terminateTime,id
    testaddHikePerformance(9, 1, 1) //startTime, hikeId, userId
});

function testgetStartedHikeByUserId(userId,wronguserId) {
    test("test getStartedHikeByUserId", async () => {   
        let data = await getStartedHikeByUserId(userId);
        expect(data).toEqual(
            {
                "id": 2,
                "startTime": "3",
                "terminateTime": null,
                "hikeId": 2,
                "userId": 4
            }
        );
    });
    
    test("test getStartedHikeByUserId wrong user id (not null termination, or not that author on the table)", async () => {
        let data2 = await getStartedHikeByUserId(wronguserId);
        expect(data2).toEqual(undefined);
    });
};

function testgetTerminatedHikes(userId) {
    test("test getTerminatedHikes", async () => {   
        let data = await getTerminatedHikes(userId);
        expect(data).toEqual([
            {
                "id": 1,
                "startTime": "10",
                "terminateTime": "12",
                "hikeId": 1,
                "userId": userId
            }]
        );
    });
};

function testterminateHikePerformance(terminateTime,id) {
    test("test terminateHikePerformance", async () => {   
        await terminateHikePerformance(terminateTime,id);
        let data = await getTerminatedHikes(4);
        expect(data).toEqual([
            {
                "id": 1,
                "startTime": "10",
                "terminateTime": "12",
                "hikeId": 1,
                "userId": 4
            },{
                "id": 2,
                "startTime": "3",
                "terminateTime": "5",
                "hikeId": 2,
                "userId": 4
            }
        ]
        );
    });
};

function testaddHikePerformance(startTime, hikeId, userId) {
    test("test addHikePerformance", async () => {   
        let id = await addHikePerformance(startTime, hikeId, userId);
        let data = await getStartedHikeByUserId(userId);
        expect(data).toEqual(
            {
                "id": id,
                "startTime": startTime.toString(),
                "terminateTime": null,
                "hikeId": hikeId,
                "userId": userId
            }
        );
    });
};