'use strict';

const { iAmTesting, setTesting } = require('../mockDB/iAmTesting');
//va messo prima di chiamare il DAO. Così metti il setting a test. E usi il MOCKdao
setTesting(1);
const { createDatabase, deleteDatabase } = require('../mockDB/mockDB');

const { addUser, getUserById, getUserAllInfosById, getUser, getUserByEmail, getUserByUsername } = require('../../dao/userDao');

const cleanDb = async () => {
    await deleteDatabase()
    await createDatabase();
}

describe("test users", () => {

    beforeAll(async () => {
        await cleanDb();
    });

    // Call tests
    testgetUserById(1, 7) // user id, wrongId
    testgetUserAllInfosById(1, 7) // user id, wrongId
    testgetUser("aldobaglio@gmail.com", "password", "aldobaglio@gmail.coommm", "passworddddd") //email, password, wrongemail,wrongpassword
    testgetUserByEmail("aldobaglio@gmail.com", "aldobaglio@gmail.coommm") //email, wrongemail
    testgetUserByUsername("aldobaglio", "aldo_baglio") //username, wrongusername
    testaddUser("antonioconte@gmail.com", "antonioconte", "localGuide", "antonio", "conte", "M", "+393333333333", "password", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudG9uaW9jb2xlbGxpMTk5OEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFudG9jb2xlIn0.Vq9N8p9_6t-2yXJSKWzf4gm44TQ0k0zZJiA87Sh8Oog")
});

function testgetUserById(id, wongId) {
    test("test getUserById", async () => {
        let user = await getUserById(id);
        expect(user).toEqual(
            {
                "id": 1,
                "email": "aldobaglio@gmail.com",
                "role": "localGuide"
            }
        );
    });

    test("test getUserById wrong id", async () => {
        let user2 = await getUserById(wongId);
        expect(user2).toEqual({ "error": "User not found." });
    });
}

function testgetUserAllInfosById(id, wongId) {
    test("test getUserAllInfosById", async () => {
        let user = await getUserAllInfosById(id);
        expect(user).toEqual(
            {
                "id": 1,
                "email": "aldobaglio@gmail.com",
                "username": "aldobaglio",
                "name": "Aldo",
                "surname": "Baglio",
                "role": "localGuide",
                "phoneNumber": "+393315658745",
                "gender": "M"
            }
        );
    });

    test("test getUserAllInfosById wrong id", async () => {
        let user2 = await getUserAllInfosById(wongId);
        expect(user2).toEqual({ "error": "User not found." });
    });
}

function testgetUser(email, password, wrongemail, wrongpassword) {
    test("test getUser", async () => {
        let user = await getUser(email, password);
        expect(user).toEqual(
            {
                "id": 1,
                "email": "aldobaglio@gmail.com",
                "username": "aldobaglio",
                "name": "Aldo",
                "surname": "Baglio",
                "role": "localGuide",
                "phoneNumber": "+393315658745",
                "gender": "M"
            }
        );
    });

    test("test getUser wrong email", async () => {
        let user2 = await getUser(wrongemail);
        expect(user2).toEqual(false);
    });

    test("test getUser wrong password", async () => {
        let user2 = await getUser(wrongpassword);
        expect(user2).toEqual(false);
    });
}

function testgetUserByEmail(email, wrongemail) {
    test("test getUserByEmail", async () => {
        let user = await getUserByEmail(email);
        expect(user).toEqual(1);
    });

    test("test getUserByEmail wrong email", async () => {
        let user2 = await getUserByEmail(wrongemail);
        expect(user2).toEqual(undefined);
    });
}

function testgetUserByUsername(username, wrongusername) {
    test("test getUserByUsername", async () => {
        let user = await getUserByUsername(username);
        expect(user).toEqual(1);
    });

    test("test getUserByUsername wrong id", async () => {
        let user2 = await getUserByUsername(wrongusername);
        expect(user2).toEqual(undefined);
    });
}

function testaddUser(email, username, role, name, surname, gender, phoneNumber, password, confirmationCode) {
    test("test addUser", async () => {
        let id = await addUser(email, username, role, name, surname, gender, phoneNumber, password, confirmationCode)
        let user = await getUserById(id);
        expect(user).toEqual(
            {
                "id": id,
                "email": email,
                "role": role
            }
        );
    });
}