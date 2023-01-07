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
    await hikeDao.addHike("title", "description", 12, 3, 1336.71, "Hiker", 1, 2, 1, "2022-01-10", "https://someweb/link");
    await hikeDao.addHike("title2", "description2", 12, 3, 1336.71, "Hiker", 1, 2, 1, "2022-01-10", "https://someweb/link2");
}


describe("Edit.Hikes.APItesting", function () {
    before(async () => { await cleanDb(); });
    const hiker = request.agent(server);

    step("Test0: POST - /startHike - hiker not logged in", async function () {

        await hiker
            .post(`/startHike`)
            .field({
                "hikeId":1,
                "startTime": "2022-05-04 22:12:13"
            })
            .then(function (res) {
                res.should.have.status(401);
            });
    });

    step("Test0.5: POST - /terminateHike - hiker not logged in", async function () {

        await hiker
            .post(`/terminateHike`)
            .field({
                "hikeId":1,
                "terminateTime": "2022-05-04 23:12:13"
            })
            .then(function (res) {
                res.should.have.status(401);
            });
    });

    step("Test0.9: GET - /isHikeInProgress/:hikeId - hiker not logged in",  async (done) => {
        let hikeId = 2;

        await hiker
            .get(`/isHikeInProgress/${hikeId}`)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    step('Step1: login', (done) => {
        let user = {
            "email": "silvioberlusconi@gmail.com",
            "password": "password"
        };
        hiker
            .post('sessions')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    step("Test1: POST - /startHike - hikeID < 0", async function () {

        await hiker
            .post(`/startHike`)
            .field({
                "hikeId":-1,
                "startTime": "2022-05-04 22:12:13"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test1.5: POST - /terminateHike - hikeID < 0", async function () {

        await hiker
            .post(`/terminateHike`)
            .field({
                "hikeId":-1,
                "terminateTime": "2022-05-04 23:12:13"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test1.9: GET - /isHikeInProgress/:hikeId - hike id < 0",  async (done) => {
        let hikeId = -1;

        await hiker
            .get(`/isHikeInProgress/${hikeId}`)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test2: POST - /startHike - hikeID wrong format", async function () {


        await hiker
            .post(`/startHike`)
            .field({
                "hikeId":"This shouldnt be a string",
                "startTime": "2022-05-04 22:12:13"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test2.5: POST - /terminateHike - hikeID < 0", async function () {

        await hiker
            .post(`/terminateHike`)
            .field({
                "hikeId":"This shouldnt be a string",
                "terminateTime": "2022-05-04 23:12:13"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test2.9: GET - /isHikeInProgress/:hikeId - hike not found",  async (done) => {
        let hikeId = 5;

        await hiker
            .get(`/isHikeInProgress/${hikeId}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    step("Test3: POST - /startHike - hikeID doesnt exist", async function () {


        await hiker
            .post(`/startHike`)
            .field({
                "hikeId":5,
                "startTime": "2022-05-04 22:12:13"
            })
            .then(function (res) {
                res.should.have.status(404);
            });
    });

    step("Test3.5: POST - /terminateHike - hikeID doesnt exist", async function () {

        await hiker
            .post(`/terminateHike`)
            .field({
                "hikeId":5,
                "terminateTime": "2022-05-04 23:12:13"
            })
            .then(function (res) {
                res.should.have.status(404);
            });
    });


    step("Test4: POST - /startHike - startTime wrong format 1", async function () {


        await hiker
            .post(`/startHike`)
            .field({
                "hikeId":5,
                "startTime": "202205-04 22:12:13"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test4.5: POST - /terminateHike - terminateTime wrong format 1", async function () {

        await hiker
            .post(`/terminateHike`)
            .field({
                "hikeId":5,
                "terminateTime": "202205-04 23:12:13"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test5: POST - /startHike - startTime wrong format 2", async function () {


        await hiker
            .post(`/startHike`)
            .field({
                "hikeId":5,
                "startTime": 12
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test5.5: POST - /terminateHike - terminateTime wrong format 2", async function () {

        await hiker
            .post(`/terminateHike`)
            .field({
                "hikeId":5,
                "terminateTime": 12
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test6: POST - /startHike - startTime wrong format 3", async function () {


        await hiker
            .post(`/startHike`)
            .field({
                "hikeId":1,
                "startTime": "2023-05-04 22:12:13"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test6.5: POST - /terminateHike - terminateTime wrong format 3", async function () {

        await hiker
            .post(`/terminateHike`)
            .field({
                "hikeId":1,
                "terminateTime": "2023-05-04 22:12:13"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test6.6: POST - /terminateHike - no hikes started", async function () {

        await hiker
            .post(`/terminateHike`)
            .field({
                "hikeId":1,
                "terminateTime": "2022-05-04 22:12:13"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test6.7: POST - /terminateHike - wrong hikeId, you started some other hike", async function () {

        await hiker
            .post(`/terminateHike`)
            .field({
                "hikeId":2,
                "terminateTime": "2022-05-04 22:12:13"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test6.9: GET - /isHikeInProgress/:hikeId - success",  async (done) => {
        let hikeId = 1;

        await hiker
            .get(`/isHikeInProgress/${hikeId}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    

    step("Test7: POST - /startHike - success", async function () {


        await hiker
            .post(`/startHike`)
            .field({
                "hikeId":1,
                "startTime": "2022-05-04 22:12:13"
            })
            .then(function (res) {
                res.should.have.status(201);
            });
    });

    step("Test7.5: POST - /terminateHike - wrong hikeId, you started some other hike", async function () {

        await hiker
            .post(`/terminateHike`)
            .field({
                "hikeId":2,
                "terminateTime": "2022-05-04 22:12:13"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test7.6: POST - /terminateHike - the terminate time is earlier than the start time", async function () {

        await hiker
            .post(`/terminateHike`)
            .field({
                "hikeId":1,
                "terminateTime": "2021-05-04 22:12:13"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });


    step("Test8: POST - /startHike - already an hike in progress", async function () {


        await hiker
            .post(`/startHike`)
            .field({
                "hikeId":2,
                "startTime": "2022-05-04 22:12:13"
            })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test8.5: POST - /terminateHike - success", async function () {

        await hiker
            .post(`/terminateHike`)
            .field({
                "hikeId":1,
                "terminateTime": "2022-05-04 23:12:13"
            })
            .then(function (res) {
                res.should.have.status(201);
            });
    });

    /////
});