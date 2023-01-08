'use strict';

const { iAmTesting, setTesting } = require('../mockDB/iAmTesting');
//va messo prima di chiamare il DAO. Così metti il setting a test. E usi il MOCKdao
setTesting(1);
const { createDatabase, deleteDatabase } = require('../mockDB/mockDB');

const { addHut, getHuts, getAllHuts, getDetailsByHutId } = require('../../dao/hutDao'); //getAllHuts, getDetailsByHutId DA TESTARE
const { addPoint } = require('../../dao/pointDao');
const { getHutById } = require('./mockDAO')

const cleanDb = async () => {
    await deleteDatabase()
    await createDatabase();
}

describe("test hut", () => {

    beforeAll(async () => {
        await cleanDb();
    });

    // Call tests
    testaddHut(4, 16, "null", "+393409728904", "https://some/photo/link", "https:...", 1);
    testgetAllHuts();
    testgetHuts();
    testgetDetailsByHutId();
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
};

function testgetAllHuts() {
    test("test getAllHuts", async () => {
        await addPoint("nameofthepoint1", "description1", "hut", 44.574263943359256, 6.982647031545639, 1000, "city1", "province1", "region1");
        await addPoint("nameofthepoint2", "description2", "hut", 50.574263943359256, 8.982647031545639, 2000, "city2", "province2", "region2");
        let hut2 = await addHut("name1", 3, 6, "null", "+393409728900", "https://some/photo/linkzzz", "https://some/other/link", 2);
        let huts = await getAllHuts();
        expect(huts).toEqual(
            [{
                "id": 1,
                "name": "nameofthepoint1",
                "description": "description1",
                "roomsNumber": 4,
                "bedsNumber": 16,
                "photoFile": "https://some/photo/link",
                "altitude": 1000,
                "latitude": 44.574263943359256,
                "longitude": 6.982647031545639,
                "city": "city1",
                "province": "province1",
                "region": "region1"
            },
            {
                "id": 2,
                "name": "nameofthepoint2",
                "description": "description2",
                "roomsNumber": 3,
                "bedsNumber": 6,
                "photoFile": "https://some/photo/linkzzz",
                "altitude": 2000,
                "latitude": 50.574263943359256,
                "longitude": 8.982647031545639,
                "city": "city2",
                "province": "province2",
                "region": "region2"
            }
            ]
        );
    });
};

function testgetHuts() {
    test("test getHuts", async () => {
        let huts = await getHuts();
        expect(huts).toEqual(
            [{
                "id": 1,
                "name": "nameofthepoint1"
            },
            {
                "id": 2,
                "name": "nameofthepoint2"
            }
            ]
        );
    });
};

function testgetDetailsByHutId() {
    test("test getDetailsByHutId", async () => {
        let result = await getDetailsByHutId(2);
        expect(result).toEqual({
            "id": 2,
            "name": "nameofthepoint2",
            "description": "description2",
            "roomsNumber": 3,
            "bedsNumber": 6,
            "photoFile": "https://some/photo/linkzzz",
            "altitude": 2000,
            "latitude": 50.574263943359256,
            "longitude": 8.982647031545639,
            "website": "https://some/other/link",
            "whenIsOpen": "null",
            "phoneNumber": "+393409728900",
            "city": "city2",
            "province": "province2",
            "region": "region2"
        });
    });

    test("test getDetailsByHutId wrong id", async () => {
        let hut2 = await getDetailsByHutId(9);
        expect(hut2).toEqual(undefined);
    });
};