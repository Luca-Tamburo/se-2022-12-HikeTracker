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
};

describe("Link.Huts.APItesting", function () {
    before(() => { cleanDb(); });


    //User number 1 (authorized)
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

    step('Step: Add Hike con successo', async function () {
        await localGuide
            .post('hikes')
            .set('content-type', 'multipart/form-data')
            .field({
                "title": "kkk",
                "description": "sss",
                "expectedTime": 66.66,
                "difficulty": "Hiker",
                "photoFile": "https://giovani.bg.it/wp-content/uploads/2019/05/il-ggg-online-nuovo-video-con-l-8217-intervista-mark-rylance-steven-spielberg-v4-278237-1280x720-1.jpg"
            })
            .attach('File', 'test/RightFile.gpx')
            .then(function (res) {
                res.should.have.status(201);
            });
    });

    step("Test1: GET - /hikeLinkHuts/:hikeId - hikeId < 0", async (done) => {

        let hikeId = -1;

        localGuide
            .get(`hikeLinkHuts/${hikeId}`)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test2: GET - /hikeLinkHuts/:hikeId - wrong format", async (done) => {

        let hikeId = "This shouldnt be a string";

        localGuide
            .get(`hikeLinkHuts/${hikeId}`)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    //User number 2 (not authorized)
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
            "gender": "M",
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

    step("Test3: GET - /hikeLinkHuts/:hikeId - user not authorized", async (done) => {

        let hikeId = 1;

        hiker
            .get(`hikeLinkHuts/${hikeId}`)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });


    /////////////////

    //We register a second local guide to check that no local guide can edit the hikes of other ones

    const localGuide2 = request.agent(server);

    step("Step1: registration of local guide", async (done) => {
        let user = {
            "email": "hiketracker23@gmail.com",
            "password": "Password20!",
            "role": "localGuide",
            "username": "edomicco2023",
            "name": "Edoardo",
            "surname": "Miccono",
            "phoneNumber": "3312345677",
            "gender": "M",
        };
        localGuide2
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    step("Step2: validation of local guide", async (done) => {

        const confirmCode = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhpa2V0cmFja2VyMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJlZG9taWNjbzIwMjMifQ.kW3iqBljyL5t1YJ1kjLhLLqeklkSl-XPzCVSK2iWx6g";

        localGuide2
            .get(`signup/${confirmCode}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    step('Step3: login', (done) => {
        let user = {
            "email": "hiketracker23@gmail.com",
            "password": "Password20!"
        };
        localGuide2
            .post('sessions')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    step("Test4: GET - /hikeLinkHuts/:hikeId - user not authorized (its a local guide but its not ur hike)", async (done) => {

        let hikeId = 1;

        localGuide2
            .get(`hikeLinkHuts/${hikeId}`)
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });


    step("Test5: GET - /hikeLinkHuts/:hikeId - hikeId not present", async (done) => {

        let hikeId = 3;

        localGuide
            .get(`hikeLinkHuts/${hikeId}`)
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });

    step("Test6: GET - /hikeLinkHuts/:hikeId - success", async (done) => {

        let hikeId = 1;

        localGuide
            .get(`hikeLinkHuts/${hikeId}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    //We start testing the PUT here

    step("Test7: PUT - /hikeLinkHuts/:hikeId - no hikeId in  the db", async function () {

        const hikeId = 2;

        await localGuide
            .put(`hikeLinkHuts/${hikeId}`)
            .send({
                "hutsToLink":[1,2,15,1,2,16,50]
            })
            .then(function (res) {
                res.should.have.status(403);
            });
    });

    step("Test8: PUT - /hikeLinkHuts/:hikeId - hikeId >= 0", async function () {

        const hikeId = 0;

        await localGuide
            .put(`hikeLinkHuts/${hikeId}`)
            .send({
                "hutsToLink":[1,2,15,1,2,16,50]
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test9: PUT - /hikeLinkHuts/:hikeId - no field", async function () {

        const hikeId = 1;

        await localGuide
            .put(`hikeLinkHuts/${hikeId}`)
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test10: PUT - /hikeLinkHuts/:hikeId - hikeId wrong format", async function () {

        const hikeId = "this shouldnt be a string";

        await localGuide
            .put(`hikeLinkHuts/${hikeId}`)
            .send({
                "hutsToLink":[1,2,15,1,2,16,50]
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test11: PUT - /hikeLinkHuts/:hikeId - wrong field name", async function () {

        const hikeId = 0;

        await localGuide
            .put(`hikeLinkHuts/${hikeId}`)
            .send({
                "hutsoLink":[1,2,15,1,2,16,50]
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Add a new BAD Hut", async function () {
        await localGuide
            .post('hut')
            .field({
                "title": "bad hut",
                "photoFile": "https://giovani.bg.it/wp-content/uploads/2019/05/il-ggg-online-nuovo-video-con-l-8217-intervista-mark-rylance-steven-spielberg-v4-278237-1280x720-1.jpg",
                "roomsNumber": 4,
                "bedsNumber": 16,
                "phoneNumber": "+393412345555",
                "latitude": 47.57426,
                "longitude": 9.98264,
                "altitude": 1000,
                "website": "http://google.it",
                "description": "there are beds and sheets"
            })
            .then(function (res) {
                res.should.have.status(201);
            });
    });

    step("Add a new GOOD Hut", async function () {
        await localGuide
            .post('hut')
            .field({
                "title": "nice hut",
                "photoFile": "https://giovani.bg.it/wp-content/uploads/2019/05/il-ggg-online-nuovo-video-con-l-8217-intervista-mark-rylance-steven-spielberg-v4-278237-1280x720-1.jpg",
                "roomsNumber": 4,
                "bedsNumber": 16,
                "phoneNumber": "+393412345666",
                "latitude": 44.574244916439056,
                "longitude": 6.982622053474188,
                "altitude": 1800,
                "website": "http://google.it",
                "description": "there are beds and sheets"
            })
            .then(function (res) {
                res.should.have.status(201);
            });
    });

    step("Add a new GOOD2 Hut", async function () {
        await localGuide
            .post('hut')
            .field({
                "title": "nice 2 hut",
                "photoFile": "https://giovani.bg.it/wp-content/uploads/2019/05/il-ggg-online-nuovo-video-con-l-8217-intervista-mark-rylance-steven-spielberg-v4-278237-1280x720-1.jpg",
                "roomsNumber": 4,
                "bedsNumber": 16,
                "phoneNumber": "+393412345666",
                "latitude": 44.5742660555,
                "longitude": 6.982634793666,
                "altitude": 1800,
                "website": "http://google.it",
                "description": "there are beds and sheets and all kinds of comfy stuff"
            })
            .then(function (res) {
                res.should.have.status(201);
            });
    });

    step("Test12: PUT - /hikeLinkHuts/:hikeId - invalid huts to link ", async function () {

        const hikeId = 1;

        await localGuide
            .put(`hikeLinkHuts/${hikeId}`)
            .send({
                "hutsToLink":[15,16,50]
            })
            .then(function (res) {
                res.should.have.status(404);
            });
    });

    step("Test13: PUT - /hikeLinkHuts/:hikeId - user not authorized and not local guide ", async function () {

        const hikeId = 0;

        await hiker
            .put(`hikeLinkHuts/${hikeId}`)
            .send({
                "hutsToLink":[15,16,50]
            })
            .then(function (res) {
                res.should.have.status(401);
            });
    });

    

    step("Test14: PUT - /hikeLinkHuts/:hikeId - user not authorized (local guide but didnt upload the hike) ", async function () {

        const hikeId = 1;

        await localGuide2
            .put(`hikeLinkHuts/${hikeId}`)
            .send({
                "hutsToLink":[1]
            })
            .then(function (res) {
                res.should.have.status(403);
            });
    });

    step("Test15: PUT - /hikeLinkHuts/:hikeId - bad hut too distant from the hike) ", async function () {

        const hikeId = 1;

        await localGuide
            .put(`hikeLinkHuts/${hikeId}`)
            .send({
                "hutsToLink":[3]
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    
    step("Test16: PUT - /hikeLinkHuts/:hikeId - success ", async function () {

        const hikeId = 1;

        await localGuide
            .put(`hikeLinkHuts/${hikeId}`)
            .send({
                "hutsToLink":[4,5]
            })
            .then(function (res) {
                res.should.have.status(204);
            });
    });
    






    step('Elimina tutti i file creati', async function () {
        const hikes = await hikeDao.getHikes();
        for (let hike of hikes) {
            fs.unlink(`./utils/gpxFiles/${hike.id}_${hike.title.replace(/[ \n\t\r]/g, '_')}.gpx`, function (err, results) {
                if (err) console.log(`./utils/gpxFiles/${hike.id}_${hike.title.replace(/[ \n\t\r]/g, '_')}.gpx not found`);
                else console.log(`./utils/gpxFiles/${hike.id}_${hike.title.replace(/[ \n\t\r]/g, '_')}.gpx deleted`);
            });
            fs.unlink(`./utils/images/hikes/${hike.id}_${hike.title.replace(/[ \n\t\r]/g, '_')}.png`, function (err, results) {
                if (err) console.log(`./utils/images/hikes/${hike.id}_${hike.title.replace(/[ \n\t\r]/g, '_')}.png not found`);
                else console.log(`./utils/images/hikes/${hike.id}.png deleted`);
            });
        }
        cleanDb();
    });



});
