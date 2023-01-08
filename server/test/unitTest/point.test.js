'use strict';

const { iAmTesting, setTesting } = require('../mockDB/iAmTesting');
//va messo prima di chiamare il DAO. Così metti il setting a test. E usi il MOCKdao
setTesting(1);
const { createDatabase, deleteDatabase } = require('../mockDB/mockDB');

const { addPoint, getPointById, getPointByType } = require('../../dao/pointDao');

const cleanDb = async () => {
    await deleteDatabase()
    await createDatabase();
}

let addPoints = async () => {
    await addPoint("Monte Ferra", "Peak of Monte Ferra", "gpsCoordinates", 44.6020777802914, 6.98475264944136, 3094.14, null, null, null);
}

describe("test point", () => {

    beforeAll(async () => {
        await cleanDb();
        await addPoints();
    });

    // Call tests
    testaddPoint("Rifugio Melezè - Bellino - Val Varaita", "The building was a ...", "parking lot", 44.5742508675903, 6.98268919251859, 1757.43, "Bellino", "Cuneo", "Piemonte")
    testgetPointByType("gpsCoordinates")
});

function testaddPoint(name, description, type, latitude, longitude, altitude, city, province, region) {
    test("test addPoint", async () => {
        let id = await addPoint(name, description, type, latitude, longitude, altitude, city, province, region);
        let point = await getPointById(id);
        expect(point).toEqual(
            {
                "id": 2,
                "name": "Rifugio Melezè - Bellino - Val Varaita",
                "description": "The building was a ...",
                "type": "parking lot",
                "latitude": 44.5742508675903,
                "longitude": 6.98268919251859,
                "altitude": 1757.43,
                "city": "Bellino",
                "province": "Cuneo",
                "region": "Piemonte"
            }
        );
    });
}

function testgetPointByType(type) {
    test("test getPointByType", async () => {
        let points = await getPointByType(type);
        expect(points).toEqual(
            [{
                "id": 1,
                "name": "Monte Ferra",
                "description": "Peak of Monte Ferra",
                "type": "gpsCoordinates",
                "latitude": 44.6020777802914,
                "longitude": 6.98475264944136,
                "altitude": 3094.14,
                "city": null,
                "province": null,
                "region": null
            }]
        );
    });
}