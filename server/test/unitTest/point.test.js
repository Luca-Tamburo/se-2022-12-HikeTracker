'use strict';

const { iAmTesting, setTesting } = require('../mockDB/iAmTesting');
//va messo prima di chiamare il DAO. Così metti il setting a test. E usi il MOCKdao
setTesting(1);
const { createDatabase, deleteDatabase } = require('../mockDB/mockDB');

const { addPoint, getPointById} = require('../../dao/pointDao');

const cleanDb = async () => {
    await deleteDatabase()
    await createDatabase();
}

describe("test hikes", () => {

    beforeAll(async () => {
        await cleanDb();
    });
    
    // Call tests
    testaddPoint("Rifugio Melezè - Bellino - Val Varaita", "The building was a ...", "parking lot", 44.5742508675903, 6.98268919251859, 1757.43, "Bellino", "Cuneo", "Piemonte")
});

function testaddPoint(name, description, type, latitude, longitude, altitude, city, province, region) {
    test("test addPoint", async () => {
        let id = await addPoint(name, description, type, latitude, longitude, altitude, city, province, region);
        let point = await getPointById(id);
        expect(point).toEqual(
            {
                "id": 1,
                "name": "Rifugio Melezè - Bellino - Val Varaita",
                "description": "The building was a ...",
                "type": "parking lot",
                "latitude": 44.5742508675903,
                "longitude": 6.98268919251859,
                "altitude": 1757.43,
                "city": "Bellino",
                "province": "Cuneo"
            }
        );
    });
}