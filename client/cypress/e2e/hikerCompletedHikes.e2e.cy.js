/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            hikerCompletedHikes.e2e.cy.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// to run this test launch the system with the command "npm run startTest"

import '@testing-library/cypress/add-commands'


describe('hikes', () => {
    const testHikes = [
        {
            "id": 1,
            "title": "Trail to MONTE FERRA",
            "length": 13,
            "expectedTime": 5,
            "ascent": 1336.71,
            "difficulty": "Professional Hiker",
            "startTime": "2022-05-05 12:12:12",
            "terminateTime": "2022-05-05 22:12:12"
        },
        {
            "id": 5,
            "title": "Trail to MONTE CHABERTON",
            "length": 7.65,
            "expectedTime": 6,
            "ascent": 1233.46,
            "difficulty": "Hiker",
            "startTime": "2022-05-06 12:12:12",
            "terminateTime": "2022-05-06 22:12:12"
        },
        {
            "id": 2,
            "title": "Trail to ROCCA PATANUA",
            "length": 9,
            "expectedTime": 5.5,
            "ascent": 923.62,
            "difficulty": "Professional Hiker",
            "startTime": "2022-06-06 22:12:13",
            "terminateTime": "2022-06-06 22:12:14"
        }
      ]

      beforeEach(() => {
        cy.intercept('GET', '/api/sessions/current', {
            statusCode: 201,
            body: {"id":1,
            "email":"aldobaglio@gmail.com",
            "username":"aldobaglio",
            "name":"aldo",
            "surname":"baglio",
            "role":"hiker",
            "phoneNumber":"+393315658745",
            "gender":"M"},
          });
          
        })

    it('goes to completedHikes page', () => {
        cy.visit(`/hiker/completedHikes`);
    })

    it('contains title', () => {
        cy.visit('/hiker/completedHikes');
        cy.wait(500);
        cy.get('h1[class="fw-bold text-center mt-2"]').contains(/My completed hikes/i);
    })
    it('has no hikes', () => {
        cy.intercept('GET', '/api/myCompletedHikes', {
            statusCode: 200,
            body: '',
          });
        cy.visit('/hiker/completedHikes');
        cy.wait(500);
        cy.get('h2[class="d-flex justify-content-center fw-bold mb-3"]').contains(/You have not yet completed any hike./i);
    })

    it('has some hikes', () => {
        cy.intercept('GET', '/api/myCompletedHikes', {
            statusCode: 200,
            body: testHikes,
          });
        cy.visit('/hiker/completedHikes');
        cy.wait(500);
        cy.get('b').contains(/Trail to MONTE FERRA/i);
    })
})