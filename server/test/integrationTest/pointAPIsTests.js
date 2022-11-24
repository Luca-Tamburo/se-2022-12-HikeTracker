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

const cleanDb = async () => {
    await deleteDatabase();
    await createDatabase();
}

cleanDb();

describe("Post.Parking.APItesting", function () {

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

    step("Test1: wrong fields", async function() {
        
        await localGuide
            .post('parking')
            .set('content-type', 'multipart/form-data')
            .field({
                "title":"parking",
                "description":"big parking area near the start of the hike!",
                "atitude": 44.57426,
                "longitude": 6.98264,
                "altitude": 3094,
                "city": "Condove",
                "province": "Torino ",
                "region": "Piemonte"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test2: wrong format (string instead of numeric)", async function() {
        
        await localGuide
            .post('parking')
            .set('content-type', 'multipart/form-data')
            .field({
                "title":"parking",
                "description":"big parking area near the start of the hike!",
                "latitude": 44.57426,
                "longitude": 6.98264,
                "altitude": "hello",
                "city": "Condove",
                "province": "Torino ",
                "region": "Piemonte"
            })
            .then( function (res) {
                res.should.have.status(422);
            });
    });

    step("Test3: missing information (no title)", async function() {
        
        await localGuide
            .post('parking')
            .set('content-type', 'multipart/form-data')
            .field({
                "description":"big parking area near the start of the hike!",
                "latitude": 44.57426,
                "longitude": 6.98264,
                "altitude": 3094,
                "city": "Condove",
                "province": "Torino ",
                "region": "Piemonte"
            })
            .then( function (res) {
                res.should.have.status(422);
            });
    });

    step('Test4: Add parking success', async function () {
        await localGuide
            .post('parking')
            .set('content-type', 'multipart/form-data')
            .field({
                "title":"parking",
                "description":"big parking area near the start of the hike!",
                "latitude": 44.57426,
                "longitude": 6.98264,
                "altitude": 3094,
                "city": "Condove",
                "province": "Torino ",
                "region": "Piemonte"
            })
            .attach('File', 'test/RightFile.gpx')
            .then(function (res) {
                res.should.have.status(201);
            });
    });
});