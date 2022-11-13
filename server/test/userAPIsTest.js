'use strict';

//npm run test_integration

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../index.js');
const should = chai.should();
const server = "http://localhost:3001/api/";
const userDao = require("../dao/userDao"); // module for accessing the users in the DB

chai.use(chaiHttp);


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

    it("Test9: correct login",
        (done) => {
            const user = {
                "email": "aldobaglio@gmail.com",
                "password": "password"
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
});

describe("Registration.Form.Procedure.APItesting", function () {

    it("Test1: wrong fields", (done) => {
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

    it("Test2: wrong email format", (done) => {
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

    it("Test3: wrong role (unexisting role)", (done) => {
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

    it("Test4: wrong username format", (done) => {
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

    it("Test5: wrong phone number format", (done) => {
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

    it("Test6: missing mandatory credentials in hut worker", (done) => {
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

    it("Test7: missing name in hut worker", (done) => {
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

    it("Test8: wrong email type", (done) => {
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

    it("Test9: wrong password type", (done) => {
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

    it("Test10: wrong role type", (done) => {
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

    it("Test11: wrong username type", (done) => {
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

    it("Test12: wrong name type", (done) => {
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

    it("Test13: wrong surname type", (done) => {
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

    it("Test14: wrong phoneNumber type", (done) => {
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
});
