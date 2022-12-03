'use strict';

const { iAmTesting, setTesting } = require('../mockDB/iAmTesting');
//va messo prima di chiamare il DAO. Così metti il setting a test. E usi il MOCKdao
setTesting(1);
const { createDatabase, deleteDatabase } = require('../mockDB/mockDB');

const { addHut, getHutById } = require('../../dao/hutDao');
const { addPoint } = require('../../dao/pointDao');

const cleanDb = async () => {
    await deleteDatabase()
    await createDatabase();
}

describe("test huts", () => {

    beforeAll(async () => {
        await cleanDb();
    });

    // Call tests
    testaddHut(4, 16, "null", "+393409728904", "https://some/photo/link", "https:...", 1)
});

function testaddHut(roomsNumber, bedsNumber, whenIsOpen, phoneNumber, photoFile, website, pointId) {
    test("test addHut", async () => {
        let id = await addHut("some name", roomsNumber, bedsNumber, whenIsOpen, phoneNumber, photoFile, website, pointId);
        let hut = await getHutById(id);
        expect(hut).toEqual(
            {
                "id": 1,
                "roomsNumber": 4,
                "bedsNumber": 16,
                "whenIsOpen": "null",
                "phoneNumber": "+393409728904",
                "photoFile": "https://some/photo/link",
                "website": "https:...",
                "pointId": 1
            }
        );
    });
}