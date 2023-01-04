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
const hikeDao = require('../../dao/hikeDao');

const cleanDb = async () => {
    await deleteDatabase();
    await createDatabase();
    await hikeDao.addHike("title", "description", 12, 3, 1336.71, "Hiker", 1, 2, 1, "2022-01-10", "https://someweb/link");
}

describe("Hike.Points.APItesting", function () {

    before(async () => { await cleanDb(); });

    const localGuide = request.agent(server);

    step("Test1: no permission", async function () {

        await localGuide
            .post('referencePoints')
            .send({
                "hikeId":5, 
                "pointsToLink": 
                [
                    {
                    "title": "POINT 1",
                    "latitude": 44.93603, 
                    "longitude": 6.73868
                    },
                    {
                    "title": "POINT 2",
                    "latitude": 44.96452393010258, 
                    "longitude": 6.75131052732467666
                    }
                ]
              })
            .then(function (res) {
                res.should.have.status(401);
            });
    });

    //Password20!

    step('Step1: login', (done) => {
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

    step('Step 2: Add Hike con successo (send url, not image file)', async function () {
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

    step("Test2: no hikeId", async function () {

        await localGuide
            .post('referencePoints')
            .send({ 
                "pointsToLink": 
                [
                    {
                    "title": "POINT 1",
                    "latitude": 44.93603, 
                    "longitude": 6.73868
                    },
                    {
                    "title": "POINT 2",
                    "latitude": 44.96452393010258, 
                    "longitude": 6.75131052732467666
                    }
                ]
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test3: hikeId < 0", async function () {

        await localGuide
            .post('referencePoints')
            .send({ 
                "hikeId":-1,
                "pointsToLink": 
                [
                    {
                    "title": "POINT 1",
                    "latitude": 44.93603, 
                    "longitude": 6.73868
                    },
                    {
                    "title": "POINT 2",
                    "latitude": 44.96452393010258, 
                    "longitude": 6.75131052732467666
                    }
                ]
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test4: hikeId wrong format", async function () {

        await localGuide
            .post('referencePoints')
            .send({ 
                "hikeId":"this shouldnt be a string",
                "pointsToLink": 
                [
                    {
                    "title": "POINT 1",
                    "latitude": 44.93603, 
                    "longitude": 6.73868
                    },
                    {
                    "title": "POINT 2",
                    "latitude": 44.96452393010258, 
                    "longitude": 6.75131052732467666
                    }
                ]
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test5: hikeId wrong name", async function () {

        await localGuide
            .post('referencePoints')
            .send({ 
                "hiked":2,
                "pointsToLink": 
                [
                    {
                    "title": "POINT 1",
                    "latitude": 44.93603, 
                    "longitude": 6.73868
                    },
                    {
                    "title": "POINT 2",
                    "latitude": 44.96452393010258, 
                    "longitude": 6.75131052732467666
                    }
                ]
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test6: no pointsToLink", async function () {

        await localGuide
            .post('referencePoints')
            .send({ 
                "hikeId":2,
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test7: empty array of points to link", async function () {

        await localGuide
            .post('referencePoints')
            .send({ 
                "hikeId":2,
                "pointsToLink":[]
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test8: wrong title name", async function () {

        await localGuide
            .post('referencePoints')
            .send({ 
                "hikeId":2,
                "pointsToLink": 
                [
                    {
                    "tite": "POINT 1",
                    "latitude": 44.93603, 
                    "longitude": 6.73868
                    },
                    {
                    "ttle": "POINT 2",
                    "latitude": 44.96452393010258, 
                    "longitude": 6.75131052732467666
                    }
                ]
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test9: wrong latitude name", async function () {

        await localGuide
            .post('referencePoints')
            .send({ 
                "hikeId":2,
                "pointsToLink": 
                [
                    {
                    "title": "POINT 1",
                    "latiude": 44.93603, 
                    "longitude": 6.73868
                    },
                    {
                    "title": "POINT 2",
                    "ltitude": 44.96452393010258, 
                    "longitude": 6.75131052732467666
                    }
                ]
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test10: wrong longitude name", async function () {

        await localGuide
            .post('referencePoints')
            .send({ 
                "hikeId":2,
                "pointsToLink": 
                [
                    {
                    "title": "POINT 1",
                    "latitude": 44.93603, 
                    "longitde": 6.73868
                    },
                    {
                    "title": "POINT 2",
                    "latitude": 44.96452393010258, 
                    "longitude": 6.75131052732467666
                    }
                ]
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test11: wrong title format", async function () {

        await localGuide
            .post('referencePoints')
            .send({ 
                "hikeId":2,
                "pointsToLink": 
                [
                    {
                    "title": 1,
                    "latitude": 44.93603, 
                    "longitude": 6.73868
                    },
                    {
                    "title": "POINT 2",
                    "latitude": 44.96452393010258, 
                    "longitude": 6.75131052732467666
                    }
                ]
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test12: wrong latitude format", async function () {

        await localGuide
            .post('referencePoints')
            .send({ 
                "hikeId":2,
                "pointsToLink": 
                [
                    {
                    "title": "POINT 1",
                    "latitude": 44.93603, 
                    "longitude": 6.73868
                    },
                    {
                    "title": "POINT 2",
                    "latitude": "shouldnt be a string", 
                    "longitude": 6.75131052732467666
                    }
                ]
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test13: wrong longitude format", async function () {

        await localGuide
            .post('referencePoints')
            .send({ 
                "hikeId":2,
                "pointsToLink": 
                [
                    {
                    "title": "POINT 1",
                    "latitude": 44.93603, 
                    "longitude": "shouldnt be a string"
                    },
                    {
                    "title": "POINT 2",
                    "latitude": 44.96452393010258, 
                    "longitude": 6.75131052732467666
                    }
                ]
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test14: user didn't upload the hike", async function () {

        await localGuide
            .post('referencePoints')
            .send({ 
                "hikeId":1,
                "pointsToLink": 
                [
                    {
                    "title": "POINT 1",
                    "latitude": 44.93603, 
                    "longitude": 6.73868
                    },
                    {
                    "title": "POINT 2",
                    "latitude": 44.96452393010258, 
                    "longitude": 6.75131052732467666
                    }
                ]
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    step("Test15: no hike id in the db", async function () {

        await localGuide
            .post('referencePoints')
            .send({ 
                "hikeId":5,
                "pointsToLink": 
                [
                    {
                    "title": "POINT 1",
                    "latitude": 44.93603, 
                    "longitude": 6.73868
                    },
                    {
                    "title": "POINT 2",
                    "latitude": 44.96452393010258, 
                    "longitude": 6.75131052732467666
                    }
                ]
              })
            .then(function (res) {
                res.should.have.status(404);
            });
    }); 

    step("Test16: points too far from the hike", async function () {

        await localGuide
            .post('referencePoints')
            .send({ 
                "hikeId":2,
                "pointsToLink": 
                [
                    {
                    "title": "POINT 1",
                    "latitude": 42.93603, 
                    "longitude": 5.73868
                    },
                    {
                    "title": "POINT 2",
                    "latitude": 41.96452393010258, 
                    "longitude": 3.75131052732467666
                    }
                ]
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });


    step("Test17: success", async function () {

        await localGuide
            .post('referencePoints')
            .send({ 
                "hikeId":2,
                "pointsToLink": 
                [
                    {
                    "title": "POINT 1",
                    "latitude": 44.574263272807777, 
                    "longitude": 6.982655916363777
                    },
                    {
                    "title": "POINT 2",
                    "latitude": 44.574180711060777, 
                    "longitude": 6.981207858771777
                    }
                ]
              })
            .then(function (res) {
                res.should.have.status(201);
            });
    });

    step("Test18: reference points already added", async function () {

        await localGuide
            .post('referencePoints')
            .send({ 
                "hikeId":2,
                "pointsToLink": 
                [
                    {
                        "title": "POINT 1",
                        "latitude": 44.574263272807777, 
                        "longitude": 6.982655916363777
                        },
                        {
                        "title": "POINT 2",
                        "latitude": 44.574180711060777, 
                        "longitude": 6.981207858771777
                        }
                ]
              })
            .then(function (res) {
                res.should.have.status(422);
            });
    });

    ////

});