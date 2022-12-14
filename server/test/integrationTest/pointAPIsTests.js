'use strict';

//va messo prima di tutto, per inizializzare la variabile di stato. Così metti il setting a test. E usi il MOCKdb
const { setTesting } = require('../mockDB/iAmTesting');
setTesting(1);

//npm run test_integration

const app = require('../../utils/appUtil');

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
const server = "http://localhost:3001/api/";
const { createDatabase, deleteDatabase } = require('../mockDB/mockDB');
chai.use(chaiHttp);
const { step } = require('mocha-steps');
const request = require('supertest');
let agent = chai.request.agent(app);
const expect = chai.expect;
const hutDao = require('../../dao/hutDao');
const fs = require('fs');

const cleanDb = async () => {
    await deleteDatabase();
    await createDatabase();
}


describe("Post.Parking.Hut.APItesting", function () {
    before(async () => { await cleanDb(); });

    const localGuide = request.agent(server);

    step("Step1: registration of local guide", async (done) => {
        let user = {
            "email": "localguide@gmail.com",
            "password": "Password20!",
            "role": "localGuide",
            "username": "antocole",
            "name": "Antonio",
            "surname": "Colelli",
            "phoneNumber": "3311234567",
            "gender": "M",
        };
        localGuide
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    step("Step2: validation of local guide", async (done) => {

        const confirmCode = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvY2FsZ3VpZGVAZ21haWwuY29tIiwidXNlcm5hbWUiOiJhbnRvY29sZSJ9.QCg1KkEXpUHH1mtJUtbTgyfiFDyxqD0fOlz1U5hFLgk";

        localGuide
            .get(`signup/${confirmCode}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    step('Step3: login', (done) => {
        let user = {
            "email": "localguide@gmail.com",
            "password": "Password20!"
        };
        localGuide
            .post('sessions')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    step("Test1: wrong fields", async function () {

        await localGuide
            .post('parking')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "parking",
                "description": "big parking area near the start of the hike!",
                "atitude": 44.57426,//wrong
                "longitude": 6.98264,
                "altitude": 3094,
                "capacity": 5
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test2: wrong format (string instead of numeric)", async function () {

        await localGuide
            .post('parking')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "parking",
                "description": "big parking area near the start of the hike!",
                "latitude": 44.57426,
                "longitude": 6.98264,
                "altitude": "hello",//wrong
                "capacity": 5
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test3: missing information (no title)", async function () {

        await localGuide
            .post('parking')
            .set('content-type', 'multipart/form-data')
            .field({
                "description": "big parking area near the start of the hike!",
                "latitude": 44.57426,
                "longitude": 6.98264,
                "altitude": 3094,
                "capacity": 5
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('Test4: Add parking success', async function () {
        await localGuide
            .post('parking')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "parking",
                "description": "big parking area near the start of the hike!",
                "latitude": 44.57426,
                "longitude": 6.98264,
                "altitude": 3094,
                "capacity": 5
            })
            .then(function (res) {
                res.should.have.status(201);
            });
    });

    step('Test5: Add parking negative altitude', async function () {
        await localGuide
            .post('parking')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "parking",
                "description": "big parking area near the start of the hike!",
                "latitude": 44.57426,
                "longitude": 6.98264,
                "altitude": -3094,//wrong
                "capacity": 5
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });


    //Add Hut testing down here


    step("Test5: wrong hut fields", async function () {

        await localGuide
            .post('hut')
            .set('content-type', 'multipart/form-data')
            .field({
                "tile": "nice hut",//wrong...
                "photoile": "https://some/nice/photo",
                "roomsumber": 4,
                "bedsumber": 16,
                "phoneumber": "+393412345678",
                "latiude": 44.57426,
                "longiude": 6.98264,
                "alitude": 3094,
                "website": "http...",
                "desciption": "there are beds and sheets"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test6: wrong hut roomsNumber format", async function () {

        await localGuide
            .post('hut')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "nice hut",
                "photoFile": "https://some/nice/photo",
                "roomsNumber": "this shouldn't be a string",//wrong
                "bedsNumber": 16,
                "phoneNumber": "+393412345678",
                "latitude": 44.57426,
                "longitude": 6.98264,
                "altitude": 3094,
                "website": "http...",
                "description": "there are beds and sheets"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test7: wrong hut bedsNumber format", async function () {

        await localGuide
            .post('hut')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "nice hut",
                "photoFile": "https://some/nice/photo",
                "roomsNumber": 4,
                "bedsNumber": "this shouldn't be a string",//wrong
                "phoneNumber": "+393412345678",
                "latitude": 44.57426,
                "longitude": 6.98264,
                "altitude": 3094,
                "website": "http...",
                "description": "there are beds and sheets"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test8: wrong hut latitude format", async function () {

        await localGuide
            .post('hut')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "nice hut",
                "photoFile": "https://some/nice/photo",
                "roomsNumber": 4,
                "bedsNumber": 16,
                "phoneNumber": "+393412345678",
                "latitude": "this shouldn't be a string",//wrong
                "longitude": 6.98264,
                "altitude": 3094,
                "website": "http...",
                "description": "there are beds and sheets"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test9: wrong hut longitude format", async function () {

        await localGuide
            .post('hut')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "nice hut",
                "photoFile": "https://some/nice/photo",
                "roomsNumber": 4,
                "bedsNumber": 16,
                "phoneNumber": "+393412345678",
                "latitude": 44.57426,
                "longitude": "this shouldn't be a string",//wrong
                "altitude": 3094,
                "website": "http...",
                "description": "there are beds and sheets"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test10: wrong hut altitude format", async function () {

        await localGuide
            .post('hut')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "nice hut",
                "photoFile": "https://some/nice/photo",
                "roomsNumber": 4,
                "bedsNumber": 16,
                "phoneNumber": "+393412345678",
                "latitude": 44.57426,
                "longitude": 6.98264,
                "altitude": "this shouldn't be a string",//wrong
                "website": "http...",
                "description": "there are beds and sheets"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test11: missing information (no title)", async function () {

        await localGuide
            .post('hut')
            .set('content-type', 'multipart/form-data')
            .field({
                "photoFile": "https://some/nice/photo",
                "roomsNumber": 4,
                "bedsNumber": 16,
                "phoneNumber": "+393412345678",
                "latitude": 44.57426,
                "longitude": 6.98264,
                "altitude": 3094,
                "website": "http...",
                "description": "there are beds and sheets"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test12: negative altitude", async function () {

        await localGuide
            .post('hut')
            .set('content-type', 'multipart/form-data')
            .field({
                "photoFile": "https://some/nice/photo",
                "roomsNumber": 4,
                "bedsNumber": 16,
                "phoneNumber": "+393412345678",
                "latitude": 44.57426,
                "longitude": 6.98264,
                "altitude": -3094,//wrong
                "website": "http...",
                "description": "there are beds and sheets"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });


    step("Test13.0: Add Hut. No image file, No url", async function () {

        await localGuide
            .post('hut')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "nice hut",
                "photoFile": "",
                "roomsNumber": 4,
                "bedsNumber": 16,
                "phoneNumber": "+393412345678",
                "latitude": 47.57426,
                "longitude": 7.98264,
                "altitude": 3000,
                "website": "http://google.it",
                "description": "there are beds and sheets"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test13.0: Add Hut. Send image file, wrong image", async function () {

        await localGuide
            .post('hut')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "nice hut",
                "photoFile": "",
                "roomsNumber": 4,
                "bedsNumber": 16,
                "phoneNumber": "+393412345678",
                "latitude": 47.57426,
                "longitude": 7.98264,
                "altitude": 3000,
                "website": "http...",
                "description": "there are beds and sheets"
            })
            .attach('Image', 'test/RightFile.gpx')
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test13.1: Add Hut success. Send image file, not url", async function () {

        await localGuide
            .post('hut')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "nice hut1",
                "photoFile": "",
                "roomsNumber": 4,
                "bedsNumber": 16,
                "phoneNumber": "+393412345678",
                "latitude": 47.57426,
                "longitude": 7.98264,
                "altitude": 3000,
                "website": "http...",
                "description": "there are beds and sheets"
            })
            .attach('Image', 'test/TestImage.png')
            .then(function (res) {
                res.should.have.status(201);
            });
    });
    step("Test14.0: Add Hut error. Send wrong format url", async function () {

        await localGuide
            .post('hut')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "nice hut",
                "photoFile": "ddddddd",
                "roomsNumber": 4,
                "bedsNumber": 16,
                "phoneNumber": "+393412345678",
                "latitude": 47.57426,
                "longitude": 7.98264,
                "altitude": 3000,
                "website": "http...",
                "description": "there are beds and sheets"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test14.1: Add Hut error. Send wrong url", async function () {

        await localGuide
            .post('hut')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "nice hut",
                "photoFile": "google.it/lamiafoto",
                "roomsNumber": 4,
                "bedsNumber": 16,
                "phoneNumber": "+393412345678",
                "latitude": 47.57426,
                "longitude": 7.98264,
                "altitude": 3000,
                "website": "http...",
                "description": "there are beds and sheets"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });


    step("Test14: Add Hut . Wrong website url", async function () {

        await localGuide
            .post('hut')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "nice hut",
                "photoFile": "https://giovani.bg.it/wp-content/uploads/2019/05/il-ggg-online-nuovo-video-con-l-8217-intervista-mark-rylance-steven-spielberg-v4-278237-1280x720-1.jpg",
                "roomsNumber": 4,
                "bedsNumber": 16,
                "phoneNumber": "+393412345678",
                "latitude": 47.57426,
                "longitude": 7.98264,
                "altitude": 3000,
                "website": "ciao",
                "description": "there are beds and sheets"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test14: Add Hut success. Send url, not image", async function () {

        await localGuide
            .post('hut')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "nice hut3",
                "photoFile": "https://giovani.bg.it/wp-content/uploads/2019/05/il-ggg-online-nuovo-video-con-l-8217-intervista-mark-rylance-steven-spielberg-v4-278237-1280x720-1.jpg",
                "roomsNumber": 4,
                "bedsNumber": 16,
                "phoneNumber": "+393412345678",
                "latitude": 47.57426,
                "longitude": 7.98264,
                "altitude": 3000,
                "website": "http://google.it",
                "description": "there are beds and sheets"
            })
            .then(function (res) {
                res.should.have.status(201);
            });
    });

    step('Elimina tutti i file creati', async function () {
        const huts = await hutDao.getHuts();
        for (let hut of huts) {
            fs.unlink(`./utils/images/huts/${hut.id}_${hut.name.replace(/[ \n\t\r]/g, '_')}.png`, function (err, results) {
                if (err) console.log(`./utils/images/huts/${hut.id}_${hut.name.replace(/[ \n\t\r]/g, '_')}.png not found`);
                else console.log(`./utils/images/huts/${hut.id}.png deleted`);
            });
        }
    });


});