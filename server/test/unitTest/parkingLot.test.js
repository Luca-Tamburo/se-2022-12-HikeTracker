'use strict';

const { iAmTesting, setTesting } = require('../mockDB/iAmTesting');
//va messo prima di chiamare il DAO. Così metti il setting a test. E usi il MOCKdao
setTesting(1);
const { createDatabase, deleteDatabase } = require('../mockDB/mockDB');

const { addParkingLot, getParkingLotById} = require("../../dao/parkingLotDao");
const { addPoint } = require('../../dao/pointDao');

const cleanDb = async () => {
    await deleteDatabase()
    await createDatabase();
}

const addParkingLots = async () => {
    const p1 = await addPoint("Rifugio Melezè - Bellino - Val Varaita", "The building was a ...", "hut", 44.5742508675903, 6.98268919251859, 1757.43, "Bellino", "Cuneo", "Piemonte");
    const h1 = await addParkingLot(3, p1);
}

describe("test parkingLot", () => {

    beforeAll(async () => {
        await cleanDb();
        await addParkingLots();
    });
    
    // Call tests
    testgetParkingLotById(1, 3) //id, wrongId
    testaddParkingLot()
});

function testgetParkingLotById(id, wrongId) {
    test("test getParkingLotById", async () => {
        let parkingLot = await getParkingLotById(id);
        expect(parkingLot).toEqual({
            "id": 1,
            "capacity": 3,
            "pointId": 1
        });
    });

    test("test getParkingLotById wrong id", async () => {
        let parkingLot = await getParkingLotById(wrongId);
        expect(parkingLot).toEqual(undefined);
    });
}

function testaddParkingLot() {
    test("test getParkingLotById", async () => {

        const p2 = await addPoint("Monte Ferra", "Peak of Monte Ferra", "gpsCoordinates", 44.6020777802914, 6.98475264944136, 3094.14, null, null, null);
        const id = await addParkingLot(5,p2);
        let parkingLot = await getParkingLotById(id);

        expect(parkingLot).toEqual(
            {
                "id": 2,
                "capacity": 5,
                "pointId": 2
            }
        );
    });
}