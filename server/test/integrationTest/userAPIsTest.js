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



describe("Registration.Form.Procedure.APItesting", function () {
    before('Clear the mock db', async function () {
        deleteDatabase();
        createDatabase();
    });

    step("Test1: wrong fields", (done) => {
        let user = {
            "emasil": "user@hikemail.com",
            "passwosrd": "password",
            "rodle": "hutWorker",
            "usefrname": "testuser",
            "namfe": "Test",
            "survname": "User",
            "phoneNumber": "+393322939333",
        };
        chai
            .request(server)
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test2: wrong email format", (done) => {
        let user = {
            "email": "userhikemail.com",
            "password": "password",
            "role": "hutWorker",
            "username": "testuser11",
            "name": "Test",
            "surname": "User",
            "phoneNumber": "+393322939333",
        };
        chai
            .request(server)
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test3: wrong role (unexisting role)", (done) => {
        let user = {
            "email": "userh@ikemail.com",
            "password": "password",
            "role": "huteWorker",
            "username": "testuser11",
            "name": "Test",
            "surname": "User",
            "phoneNumber": "+393322939333",
        };
        chai
            .request(server)
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test4: wrong username format", (done) => {
        let user = {
            "email": "userh@ikemail.com",
            "password": "password",
            "role": "hutWorker",
            "username": "testuser  !!! _*è 11",
            "name": "Test",
            "surname": "User",
            "phoneNumber": "+393322939333",
        };
        chai
            .request(server)
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test5: wrong phone number format", (done) => {
        let user = {
            "email": "userh@ikemail.com",
            "password": "password",
            "role": "hutWorker",
            "username": "testuser11",
            "name": "Test d",
            "surname": "User",
            "phoneNumber": "++393322939333",
        };
        chai
            .request(server)
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test6: missing mandatory credentials in hut worker", (done) => {
        let user = {
            "email": "userh@ikemail.com",
            "password": "password",
            "role": "hutWorker",
            "username": "testuser11",
            "phoneNumber": "+393322939333",
        };
        chai
            .request(server)
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test7: missing name in hut worker", (done) => {
        let user = {
            "email": "userh@ikemail.com",
            "password": "password",
            "role": "hutWorker",
            "username": "testuser11",
            "surname": "User",
            "phoneNumber": "+393322939333",
        };
        chai
            .request(server)
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test8: wrong email type", (done) => {
        let user = {
            "email": 1111,
            "password": "password",
            "role": "hutWorker",
            "username": "testuser11",
            "name": "User",
            "surname": "User",
            "phoneNumber": "+393322939333",
        };
        chai
            .request(server)
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test9: wrong password type", (done) => {
        let user = {
            "email": "s303030@f.cio",
            "password": 222,
            "role": "hutWorker",
            "username": "testuser11",
            "name": "User",
            "surname": "User",
            "phoneNumber": "+393322939333",
        };
        chai
            .request(server)
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test10: wrong role type", (done) => {
        let user = {
            "email": "s303030@f.cio",
            "password": "password",
            "role": 222,
            "username": "testuser11",
            "name": "User",
            "surname": "User",
            "phoneNumber": "+393322939333",
        };
        chai
            .request(server)
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test11: wrong username type", (done) => {
        let user = {
            "email": "s303030@f.cio",
            "password": "password",
            "role": "hutWorker",
            "username": 111,
            "name": "User",
            "surname": "User",
            "phoneNumber": "+393322939333",
        };
        chai
            .request(server)
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test12: wrong name type", (done) => {
        let user = {
            "email": "s303030@f.cio",
            "password": "password",
            "role": "hutWorker",
            "username": "testuser11",
            "name": 111,
            "surname": "User",
            "phoneNumber": "+393322939333",
        };
        chai
            .request(server)
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test13: wrong surname type", (done) => {
        let user = {
            "email": "s303030@f.cio",
            "password": "password",
            "role": "hutWorker",
            "username": "testuser11",
            "name": "User",
            "surname": 333,
            "phoneNumber": "+393322939333",
        };
        chai
            .request(server)
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("Test14: wrong phoneNumber type", (done) => {
        let user = {
            "email": "s303030@f.cio",
            "password": "password",
            "role": "hutWorker",
            "username": "testuser11",
            "name": "User",
            "surname": "User",
            "phoneNumber": 393322939333,
        };
        chai
            .request(server)
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });
    step("Test15: goodSignup", async (done) => {
        let user = {
            "email": "antoniocolelli1998@gmail.com",
            "password": "Password20!",
            "role": "localGuide",
            "username": "antocole2022",
            "name": "Antonio",
            "surname": "Colelli",
            "phoneNumber": "3311234567",
        };
        chai
            .request(server)
            .post('signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    step("Test16: badConfirmCode", (done) => {
        const confirmCode = "ciao!";

        chai
            .request(server)
            .get(`signup/${confirmCode}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
 /* NON SO COME FARLO FUNZIONARE
    step("Test17: goodConfirmCode", (done) => {

        const confirmCode = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudG9uaW9jb2xlbGxpMTk5OEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFudG9jb2xlMjAyMiJ9.H8MEp_pYoUtS3cn4XkWWrNJvKIryDDQy8h3lc0W02cI";

        chai
            .request(server)
            .get(`signup/${confirmCode}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    */
});

describe("Login.APItesting", () => {
    it("Test1: wrong fields",
        (done) => {
            const user = {
                "emailo": "antoniocolelli@polito.it",
                "passworda": "password"
            }
            chai
                .request(server)
                .post('sessions')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

    it("Test2: wrong email value",
        (done) => {
            const user = {
                "email": 12334,
                "password": "password"
            }
            chai
                .request(server)
                .post('sessions')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

    it("Test3: wrong password value",
        (done) => {
            const user = {
                "email": "antoniocolelli@polito.it",
                "password": 357534
            }
            chai
                .request(server)
                .post('sessions')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

    it("Test4: no email data",
        (done) => {
            const user = {
                "email": "",
                "password": "password"
            }
            chai
                .request(server)
                .post('sessions')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

    it("Test5: no password data",
        (done) => {
            const user = {
                "email": "antoniocolelli@polito.it",
                "password": undefined
            }
            chai
                .request(server)
                .post('sessions')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

    it("Test6: wrong username",
        (done) => {
            const user = {
                "username": "antoniocolellii@polito.it",
                "password": "password"
            }
            chai
                .request(server)
                .post('sessions')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

    it("Test7: wrong password",
        (done) => {
            const user = {
                "username": "antoniocolelli@polito.it",
                "password": "passwordd"
            }
            chai
                .request(server)
                .post('sessions')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

    it("Test8: not verified user",
        (done) => {
            const user = {
                "email": "antonioconte@gmail.com",
                "password": "passwordd"
            }
            chai
                .request(server)
                .post('sessions')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
 /* NON SO COME FARLO FUNZIONARE

    it("Test9: correct login",
        (done) => {
            const user = {
                "email": "antoniocolelli1998@gmail.com",
                "password": "Password20!"
            }
            chai
                .request(server)
                .post('sessions')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        */
});