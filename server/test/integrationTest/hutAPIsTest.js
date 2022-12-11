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
const userDao = require('../../dao/userDao');

const cleanDb = async () => {
    await deleteDatabase();
    await createDatabase();
}

describe("Post.Huts.APItesting", function () {

    before(async () => { await cleanDb(); });

    const localGuide = request.agent(server);

    it("Test1: send all huts infos", async function () {
        await localGuide
            .get('huts')
            .then(function (res) {
                res.should.have.status(200);
            });
    });



    it("Test2: send invalid :hutId format (letter) (best practice give 422)", async function () {
        await localGuide
            .get('hutdetails/a')
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    it("Test3: send invalid :hutId format (floating point) (best practice give 422)", async function () {
        await localGuide
            .get('hutdetails/3.4')
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    it("Test4: send invalid :hutId number (<1 number (an id start with number 1)) (best practice give 422)", async function () {
        await localGuide
            .get('hutdetails/-1')
            .then(function (res) {
                res.should.have.status(422);
            });
    });


    it("Test5: send a not present :hutId number (best practice give 404)", async function () {
        await localGuide
            .get('hutdetails/10000')
            .then(function (res) {
                res.should.have.status(404);
            });
    });



    step('Login to Add a New hut', (done) => {
        let user = {
            "email": "aldobaglio@gmail.com",
            "password": "password"
        };
        localGuide
            .post('sessions')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    step("Add a new Hut", async function () {
        await localGuide
            .post('hut')
            .field({
                "title": "nice hut",
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

    it("Test6: send a valid :hutId number", async function () {
        await localGuide
            .get('hutdetails/1')
            .then(function (res) {
                res.should.have.status(200);
            });
    });
});