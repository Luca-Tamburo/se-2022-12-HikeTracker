'use strict';

const { iAmTesting, setTesting } = require('../mockDB/iAmTesting');
//va messo prima di chiamare il DAO. Così metti il setting a test. E usi il MOCKdao
setTesting(1);
const { createDatabase, deleteDatabase } = require('../mockDB/mockDB');

const { addParkingLot} = require("../../dao/parkingLotDao");
const {getParkingLotById}=require("./mockDAO")
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
        let parkingLot1 = await getParkingLotById(id);
        expect(parkingLot1).toEqual({
            "id": 1,
            "capacity": 3,
            "pointId": 1
        });
    });

    test("test getParkingLotById wrong id", async () => {
        let parkingLot2 = await getParkingLotById(wrongId);
        expect(parkingLot2).toEqual(undefined);
    });
}

function testaddParkingLot() {
    test("test getParkingLotById", async () => {

        const id = await addParkingLot(5,1);
        let parkingLot = await getParkingLotById(id);

        expect(parkingLot).toEqual(
            {
                "id": 2,
                "capacity": 5,
                "pointId": 1
            }
        );
    });
}