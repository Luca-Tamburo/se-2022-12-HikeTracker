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

describe("Edit.Hikes.APItesting", function () {
    before(() => { cleanDb(); });

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

    step('Step4: Add Hike successfully', async function () {
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



    step("Test1: GET - /hikeStartEnd/:hikeId ", async function () {
        let hikeId = 1;

        await localGuide
        .get(`hikeStartEnd/${hikeId}`)
        .then(function (res) {
            res.should.have.status(200);
        });
            
    });

    step("Test2: GET - /hikeStartEnd/:hikeId - no id in the db", async function () {
        let hikeId = 2;

        await localGuide
        .get(`hikeStartEnd/${hikeId}`)
        .then(function (res) {
            res.should.have.status(422);
        });
    });

    step("Test3: GET - /hikeStartEnd/:hikeId - wrong hikeId format", async function () {
        let hikeId = "this shouldnt be a string";

        await localGuide
        .get(`hikeStartEnd/${hikeId}`)
        .then(function (res) {
            res.should.have.status(422);
        });
    });

    //We register a hiker tho check that the user is actually a local guide

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



    //This test should give 401 - unauthorized
    step("Test4: GET - /hikeStartEnd/:hikeId - user isnt a local guide ", async function () {
        let hikeId = 1;

        await hiker
        .get(`hikeStartEnd/${hikeId}`)
        .then(function (res) {
            res.should.have.status(401);
        });
    });

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

    step("Test5: GET - /hikeStartEnd/:hikeId - user is a local guide  but not the one who uploaded the hike", async function () {
        let hikeId = 1;

        await localGuide2
        .get(`hikeStartEnd/${hikeId}`)
        .then(function (res) {
            res.should.have.status(422);
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
    });





});


