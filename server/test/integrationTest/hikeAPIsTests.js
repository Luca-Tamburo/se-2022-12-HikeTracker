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

cleanDb();

describe("Post.Hikes.APItesting", function () {

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

    step('Test1: Add Hike con successo', async function () {
        await localGuide
            .post('/hikes')
            .set('content-type', 'multipart/form-data')
            .field("title", "Metti qualcosa EDO")
            .field("description", "Metti qualcosa EDO")
            .field("expectedTime", 1)
            .field("difficulty", "hikER")
            .field("photoFile", "Metti un link EDO")
            .attach('File', 'test/RightFile.gpx')
            .then(function (res) {
                res.should.have.status(201);
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