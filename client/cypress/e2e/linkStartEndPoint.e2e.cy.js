/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            linkStartEndpPoi.e2e.cy.js
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

const testPoints = {
    "startPoint": {
        "id": 1,
        "name": "A",
        "type": "hut",
        "latitude": 44.57425086759031,
        "longitude": 6.982689192518592
    },
    "endPoint": {
        "id": 2,
        "name": "Monte",
        "type": "location",
        "latitude": 44.60207778029144,
        "longitude": 6.984752649441361
    },
    "possibleStartingPoints": [
        {
            "id": 5,
            "name": "Rifugio ...",
            "type": "hut",
            "latitude": 44.5742508675904,
            "longitude": 6.98268919251855,
            "distance": 0.333
        },
        {
            "id": 15,
            "name": "Casa ...",
            "type": "hut",
            "latitude": 44.6020777802915,
            "longitude": 6.98475264944132,
            "distance": 3.102
        },
        {
            "id": 39,
            "name": "Parcheggio ...",
            "type": "parking lot",
            "latitude": 44.5742508675904,
            "longitude": 6.98268919251855,
            "distance": 2.111
        }
    ],
    "possibleEndPoints": [
        {
            "id": 5,
            "name": "Rifugio...",
            "type": "hut",
            "latitude": 44.5742508675905,
            "longitude": 6.98268919251856,
            "distance": 3.102
        },
        {
            "id": 15,
            "name": "Casa ...",
            "type": "hut",
            "latitude": 44.6020777802912,
            "longitude": 6.98475264944133,
            "distance": 3.567
        },
        {
            "id": 39,
            "name": "Parcheggio ...",
            "type": "parking lot",
            "latitude": 44.5742508675907,
            "longitude": 6.98268919251858,
            "distance": 3.102
        }
    ]
  }
 

describe('linkStartEndPoint', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/sessions/current', {
            statusCode: 201,
            body: {"id":1,
            "email":"aldobaglio@gmail.com",
            "username":"aldobaglio",
            "name":"aldo",
            "surname":"baglio",
            "role":"localGuide",
            "phoneNumber":"+393315658745",
            "gender":"M"},
          });
          cy.intercept('GET', '/api/hikedetails/1', {
            statusCode: 201,
            body: testHike,
          });
          cy.intercept('GET', '/api/hikeStartEnd/1', {
            statusCode: 201,
            body: testPoints,
          });
        })

    it('goes to linkStartEndPoint', () => {       
        cy.visit('/hikeStartEndPoint/1');
    })

    it('has title', () => {     
        cy.visit('/hikeStartEndPoint/1');
        cy.get('h1[class="fw-bold"]').contains(/Change your start\/end point/i);
    })

    it('has start point', () => {     
        cy.visit('/hikeStartEndPoint/1');
        cy.get('h4[class="m-3 fst-italic"]').contains(/Start point/i);
    })

    it('has end point', () => {     
        cy.visit('/hikeStartEndPoint/1');
        cy.get('h4[class="m-3 fst-italic"]').contains(/End point/i);
    })

    it('contains submit button', () => {
        cy.visit('/hikeStartEndPoint/1');
            cy.findByRole('button', { name: /submit/i });
    });
    it('contains submit button', () => {
        cy.visit('/hikeStartEndPoint/1');
            cy.findByRole('button', { name: /reset/i });
    });
})