'use strict';

//va messo prima di tutto, per inizializzare la variabile di stato. Così metti il setting a test. E usi il MOCKdb
const { setTesting } = require('../mockDB/iAmTesting');
setTesting(1);

//npm run test_integration

const { setApp } = require('../../utils/appUtil');
const app = setApp(); //app serve per far partire i test

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = "http://localhost:3001/api/";
const { createDatabase, deleteDatabase } = require('../mockDB/mockDB');

chai.use(chaiHttp);


describe("Post.Hikes.APItesting", function () {
    before('Clear the mock db', async function () {
        deleteDatabase();
        createDatabase();
    });

    step("Test1: wrong fields", (done) => {
        let hike = {
           "tite":"sss",
           "descripton":"kkk",
           "expectedime":33.33,
           "difficuty":"Hiker",
           "photoFie":"http://somelink/link"
         }
        chai
            .request(server)
            .post('hikes')
            .auth('aldobaglio@gmail.com', 'password')
            .field({"tite":"sss",
                    "descripton":"kkk",
                    "expectedime":33.33,
                    "difficuty":"Hiker",
                    "photoFie":"http://somelink/link"})
            .attach('files', './test/RightFile.gpx', 'RightFile.gpx')
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test2: wrong time format", (done) => {
        
        chai
            .request(server)
            .post('hikes')
            .field({title:"sss",
                    description:"kkk",
                    expectedTime:"this shouldnt be a string",
                    difficulty:"Hiker",
                    photoFile:"http://somelink/link "})
            .attach('files', './test/RightFile.gpx', 'RightFile.gpx')
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test3: missing title", (done) => {
        chai
            .request(server)
            .post('hikes')
            .field({"description":"kkk",
            "expectedTime":33.33,
            "difficulty":"Hiker",
            "photoFile":"http://somelink/link "
            })
            .attach('files', './test/RightFile.gpx', 'RightFile.gpx')
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test4: missing description", (done) => {
        let hike = {
           "title":"sss",
           "expectedTime":33.33,
           "difficulty":"Hiker",
           "photoFile":"http://somelink/link "
         }
        chai
            .request(server)
            .post('hikes')
            .field(hike)
            .attach('files', './test/RightFile.gpx', 'RightFile.gpx')
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test5: missing expectedTime", (done) => {
        let hike = {
           "title":"sss",
           "description":"kkk",
           "difficulty":"Hiker",
           "photoFile":"http://somelink/link "
         }
        chai
            .request(server)
            .post('hikes')
            .field(hike)
            .attach('files', './test/RightFile.gpx', 'RightFile.gpx')
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test6: missing difficulty", (done) => {
        let hike = {
           "title":"sss",
           "description":"kkk",
           "expectedTime":33.33,
           "photoFile":"http://somelink/link "
         }
        chai
            .request(server)
            .post('hikes')
            .field(hike)
            .attach('files', './test/RightFile.gpx', 'RightFile.gpx')
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test7: missing photo file link", (done) => {
        let hike = {
           "title":"sss",
           "description":"kkk",
           "expectedTime":33.33,
           "difficulty":"Hiker"
         }
        chai
            .request(server)
            .post('hikes')
            .field(hike)
            .attach('files', './test/RightFile.gpx', 'RightFile.gpx')
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test8: missing file", (done) => {
        let hike = {
           "title":"sss",
           "description":"kkk",
           "expectedTime":33.33,
           "difficulty":"Hiker",
           "photoFile":"http://somelink/link "
         }
        chai
            .request(server)
            .post('hikes')
            .field(hike)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test9: wrong file", (done) => {
        let hike = {
           "title":"sss",
           "description":"kkk",
           "expectedTime":33.33,
           "difficulty":"Hiker",
           "photoFile":"http://somelink/link "
         }
        chai
            .request(server)
            .post('hikes')
            .field(hike)
            .attach('files', './test/WrongFile.gpx', 'WrongFile.gpx')
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test10: hike inserted succesfully", (done) => {
        let hike = {
            "title" : "sss",
            "description" : "kkk",
            "expectedTime" : 33.33,
            "difficulty" : "Hiker",
            "photoFile" : "http://somelink/link"
          }
        
        chai
            .request(server)
            .post('hikes')
            //.type('form')

            //.field(hike)

            /*.field('title', 'sss')
            .field('description', 'kkk')
            .field('expectedTime', 33.33)
            .field('difficulty','Hiker')
            .field('photoFile','http://somelink/link')*/

           /* .field({title: "sss",
                   description:"kkk", 
                   expectedTime:33.33,
                   difficulty:"Hiker",
                   photoFile:"http://somelink/link"})*/

            .attach('files', './test/RightFile.gpx', 'RightFile.gpx')
            //.send(hike)
            .end((err, res) => {
                res.should.have.status(201);
                done();
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


});







describe("GET.Hikes.APItesting", function () {
    before('Clear the mock db', async function () {
        deleteDatabase();
        createDatabase();
    });

    step("Test1: hike inserted succesfully (we populate the db for testing get hike)", (done) => {
        let hike = {
           "title":"sss",
           "description":"kkk",
           "expectedTime":33.33,
           "difficulty":"Hiker",
           "photoFile":"http://somelink/link "
         }
        chai
            .request(server)
            .post('hikes')
            //.send(hike)
            .attach('fileField', './RightFile.gpx', 'RightFile.gpx')
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    step("Test2: hike inserted succesfully (we populate the db for testing get hike)", (done) => {
        let hike = {
           "title":"kkk",
           "description":"sss",
           "expectedTime":66.66,
           "difficulty":"Hiker",
           "photoFile":"http://somedifferentlink/link "
         }
        chai
            .request(server)
            .post('hikes')
            //.send(hike)
            .attach('fileField', './RightFile.gpx', 'RightFile.gpx')
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    step("Test3: wrong hikeID format", (done) => {
        const hikeId = "This shouldnt be a string";
        
        chai
            .request(server)
            .get(`hikegpx/${hikeId}`)
            .end((err, res) => {
                res.should.have.status(503);
                done();
            });
    });

    step("Test4: hike not found", (done) => {
        const hikeId = 3;
        
        chai
            .request(server)
            .get(`hikegpx/${hikeId}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    step("Test5: hike 1 found", (done) => {
        const hikeId = 1;
        
        chai
            .request(server)
            .get(`hikegpx/${hikeId}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    step("Test5: hike 2 found", (done) => {
        const hikeId = 2;
        
        chai
            .request(server)
            .get(`hikegpx/${hikeId}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});