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
const fs = require('fs');
const { step } = require('mocha-steps');
const request = require('supertest');
let agent = chai.request.agent(app);
const expect = chai.expect;

const hikeDao = require('../../dao/hikeDao');
const cleanDb = async () => {
    await deleteDatabase();
    await createDatabase();
}


describe("Post.Hikes.APItesting", function () {
    before(()=>{cleanDb();});

    const localGuide = request.agent(server);


    step("Step1: registration of local guide", async (done) => {
        let user = {
            "email": "hiketracker@gmail.com",
            "password": "Password20!",
            "role": "localGuide",
            "username": "antocole2022",
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

        const confirmCode = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhpa2V0cmFja2VyQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYW50b2NvbGUyMDIyIn0.fe1IzIBfPop4VBOTNWlZOFAORSKJBrVAqt_buHmyhig";

        localGuide
            .get(`signup/${confirmCode}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    step('Step3: login', (done) => {
        let user = {
            "email": "hiketracker@gmail.com",
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


    step("Test1: wrong fields", async function() {
        
        await localGuide
            .post('hikes')
            .set('content-type', 'multipart/form-data')
            .field({
                "tite": "sss",
                "descripton": "kkk",
                "expectedime": 33.33,
                "difficuty": "Hiker",
                "photoFie": "http://somelink/link"
            })
            .attach('File', './test/RightFile.gpx')
            .then( function (res) {
                res.should.have.status(422);
            });
    });

    step("Test2: wrong time format", async function() {
        
        await localGuide
            .post('hikes')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "sss",
                "description": "kkk",
                "expectedTime": "this shiuldnt be a string",
                "difficulty": "Hiker",
                "photoFile": "http://somelink/link"
            })
            .attach('File', './test/RightFile.gpx')
            .then( function (res) {
                res.should.have.status(422);
            });
    });

    step("Test3: missing title", async function() {
        
        await localGuide
            .post('hikes')
            .set('content-type', 'multipart/form-data')
            .field({
                "description": "kkk",
                "expectedTime": 33.33,
                "difficulty": "Hiker",
                "photoFile": "http://somelink/link"
            })
            .attach('File', './test/RightFile.gpx')
            .then( function (res) {
                res.should.have.status(422);
            });
    });

    step("Test4: missing description", async function() {
        
        await localGuide
            .post('hikes')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "sss",
                "expectedTime": 33.33,
                "difficulty": "Hiker",
                "photoFile": "http://somelink/link"
            })
            .attach('File', './test/RightFile.gpx')
            .then( function (res) {
                res.should.have.status(422);
            });
    });

    step("Test5: missing expectedTime", async function() {
        
        await localGuide
            .post('hikes')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "sss",
                "description": "kkk",
                "difficulty": "Hiker",
                "photoFile": "http://somelink/link"
            })
            .attach('File', './test/RightFile.gpx')
            .then( function (res) {
                res.should.have.status(422);
            });
    });

    step('Test6: missing difficulty', async function () {
        await localGuide
            .post('hikes')
            .set('content-type', 'multipart/form-data')
            .field({"title": "sss",
            "description": "kkk",
            "expectedTime": 33.33,
            "photoFile": "http://somelink/link"})
            .attach('File', 'test/RightFile.gpx')
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('Test7: missing photo file link', async function () {
        await localGuide
            .post('hikes')
            .set('content-type', 'multipart/form-data')
            .field({"title": "sss",
            "description": "kkk",
            "expectedTime": 33.33,
            "difficulty": "Hiker"})
            .attach('File', 'test/RightFile.gpx')
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('Test8: missing file', async function () {
        await localGuide
            .post('hikes')
            .set('content-type', 'multipart/form-data')
            .field({"title": "sss",
            "description": "kkk",
            "expectedTime": 33.33,
            "difficulty": "Hiker",
            "photoFile": "http://somelink/link"})
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('Test9: Wrong file', async function () {
        await localGuide
            .post('hikes')
            .set('content-type', 'multipart/form-data')
            .field({"title": "sss",
            "description": "kkk",
            "expectedTime": 33.33,
            "difficulty": "Hiker",
            "photoFile": "http://somelink/link"})
            .attach('File', 'test/WrongFile.gpx')
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step('Test10: Add Hike con successo', async function () {
        await localGuide
            .post('hikes')
            .set('content-type', 'multipart/form-data')
            .field({"title": "sss",
            "description": "kkk",
            "expectedTime": 33.33,
            "difficulty": "Hiker",
            "photoFile": "http://somelink/link"})
            .attach('File', 'test/RightFile.gpx')
            .then(function (res) {
                res.should.have.status(201);
            });
    });

    step('Test10.5: Add Hike con successo (populate the db for next tests)', async function () {
        await localGuide
            .post('hikes')
            .set('content-type', 'multipart/form-data')
            .field({"title": "kkk",
            "description": "sss",
            "expectedTime": 66.66,
            "difficulty": "Hiker",
            "photoFile": "http://somelink/link"})
            .attach('File', 'test/RightFile.gpx')
            .then(function (res) {
                res.should.have.status(201);
            });
    });

    step("Test11: get hikes", (done) => {

        chai
            .request(server)
            .get('hikes')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });


    const hiker = request.agent(server);


    step("Step1: registration of hiker", async (done) => {
        let user = {
            "email": "hiketracker22@gmail.com",
            "password": "Password20!",
            "role": "hiker",
            "username": "edomicco2022",
            "name": "Edoardo",
            "surname": "Miccono",
            "phoneNumber": "3312345678",
            "gender":"M",
        };
        hiker
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    step("Step2: validation of local guide", async (done) => {

        const confirmCode = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhpa2V0cmFja2VyMjJAZ21haWwuY29tIiwidXNlcm5hbWUiOiJlZG9taWNjbzIwMjIifQ.-nXmAHdLRsTA-XTbYZDA_g1SUobCsMW6au_jGU_xTts";

        hiker
            .get(`signup/${confirmCode}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    step('Step3: login', (done) => {
        let user = {
            "email": "hiketracker22@gmail.com",
            "password": "Password20!"
        };
        hiker
            .post('sessions')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });


    step("Test12: wrong hikeID format", async function () {

        const hikeId = "This shouldnt be a string";

        await hiker
                .get(`hikegpx/${hikeId}`)
                .then(function (res) {
                    res.should.have.status(422);
                });

    });

    step("Test13: hike not found", async function () {

        const hikeId = 3;

        await hiker
                .get(`hikegpx/${hikeId}`)
                .then(function (res) {
                    res.should.have.status(404);
                });
    });

    //I cannot test the "gpx not found" lines because i can't add an hike without the gpx attached

    step("Test14: hike 1 found", async function () {

        const hikeId = 1;

        await hiker
                .get(`hikegpx/${hikeId}`)
                .then(function (res) {
                    res.should.have.status(200);
                });
    });

    step("Test15: hike 2 found", async function () {

        const hikeId = 2;

        await hiker
                .get(`hikegpx/${hikeId}`)
                .then(function (res) {
                    res.should.have.status(200);
                });
    });


    step("Test16: get hike details, wrong hikeId format", (done) => {

        const hikeId = "this shouldn't be a string";

        chai
            .request(server)
            .get(`hikedetails/${hikeId}`)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test16: get hike details, non existing hikeId", (done) => {

        const hikeId = 3;

        chai
            .request(server)
            .get(`hikedetails/${hikeId}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    step("Test17: get hike details correctly", (done) => {

        const hikeId = 2;

        chai
            .request(server)
            .get(`hikedetails/${hikeId}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });




    step('Elimina tutti i gpx creati', async function () {
        const hikes = await hikeDao.getHikes();
        for (let hike of hikes) {
            fs.unlink(`./utils/gpxFiles/${hike.id}_${hike.title.replace(/ /g, '_')}.gpx`, function (err, results) {
                if (err) console.log(`./utils/gpxFiles/${hike.id}_${hike.title.replace(/ /g, '_')}.gpx not found`);
                else console.log(`./utils/gpxFiles/${hike.id}_${hike.title.replace(/ /g, '_')}.gpx deleted`);
            });

        }
    });
});