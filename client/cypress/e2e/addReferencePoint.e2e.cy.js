/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            addReferencePoint.e2e.cy.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// to run this test launch the system with the command "npm run startTest"

import '@testing-library/cypress/add-commands'

const testHike = {
    "id": 1,
    "title": "Trail to MONT FERRA",
    "description": "Leaving the car ...",
    "authorName": "aldo",
    "authorSurname": "baglio",
    "authorId": 1,
    "uploadDate": "2022-01-10",
    "photoFile": "www. ...",
    "length": 13,
    "expectedTime": 5,
    "ascent": 1280,
    "difficulty": 4,
    "startPointId": 1,
    "endPointId": 2,
    "gpx": 'gpx file data if loggedin, nothing ("") if not logged in',
    "pointList":
        [
            {
                "id": 1,
                "name": "Refugio Melezè ...",
                "description": "The building was a ...",
                "type": "hut",
                "latitude": 44.5744896554157,
                "longitude": 6.98160500000067,
                "altitude": 1812,
                "city": "Berllino",
                "province": "Cuneo"
            },
            {
                "id": 2,
                "name": "Monte Ferra",
                "description": "Peak of ...",
                "type": "gpsCoordinates",
                "latitude": 44.57426,
                "longitude": 6.98264,
                "altitude": 3094,
                "city": null,
                "province": null
            }
        ]
}

describe('addReferencePoint', () => {

    beforeEach(() => {
        cy.intercept('GET', '/api/sessions/current', {
            statusCode: 201,
            body: {
                "id": 1,
                "email": "aldobaglio@gmail.com",
                "username": "aldobaglio",
                "name": "aldo",
                "surname": "baglio",
                "role": "localGuide",
                "phoneNumber": "+393315658745",
                "gender": "M"
            },
        })
        cy.intercept('GET', '/api/hikedetails/1', {
            statusCode: 201,
            body: testHike,
        });
    })
    it('goes to addReferencePoint', () => {
        cy.visit('/addReferencePoint/1');
    })


    it('contains title', () => {
        cy.visit('/addReferencePoint/1');
        cy.wait(500);
        cy.get('h1[class="fw-bold"]').contains(/Add your reference points/i);
    })
    it('contains subtitle', () => {
        cy.visit('/addReferencePoint/1');
        cy.wait(500);
        cy.get('h4[class="mx-3 mt-3 mb-4 fst-italic"]').contains(/Reference point list/i);
    })

    it('has no reference points', () => {
        cy.visit('/addReferencePoint/1');
        cy.wait(500);
        cy.get('p[class="ms-3 fw-bold"]').contains(/No reference point added/i);
    })

    it('contains name field', () => {
        cy.visit('/addReferencePoint/1');
        cy.wait(500);
        cy.get('input[placeholder="Point name..."]')
    })

    it('contains submit button', () => {
        cy.visit('/addReferencePoint/1');
        cy.wait(500);
        cy.findByRole('button', { name: /submit/i });
    });
    it('contains reset button', () => {
        cy.visit('/addReferencePoint/1');
        cy.wait(500);
        cy.findByRole('button', { name: /reset/i });
    });
})