/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            linkHutToHike.e2e.cy.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// to run this test launch the system with the command "npm run startTest"

import '@testing-library/cypress/add-commands'
import { wait } from '@testing-library/dom'

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

const testPoints =   {
    "startPoint": {
        "id": 1,
        "name": "Rifugio Melezè - Bellino - Val Varaita",
        "type": "hut",
        "latitude": 44.57425086759031,
        "longitude": 6.982689192518592,
        "description": "The ...",
        "city": "Bellino",
        "province": "Cuneo",
        "region": "Piemonte"
    },
    "endPoint": {
        "id": 2,
        "name": "Monte Ferra",
        "type": "location",
        "latitude": 44.60207778029144,
        "longitude": 6.984752649441361,
        "description": "The ...",
        "city": "Bellino",
        "province": "Cuneo",
        "region": "Piemonte"

    },
    "currentLinkedHuts": [
        {
            "id": 16,
            "name": "Hut Freidour",
            "type": "hut",
            "description": "The...",
            "latitude": 44.973129,
            "longitude": 7.303155,
            "altitude": 1757.43,
            "city": "Bellino",
            "province": "Cuneo",
            "region": "Piemonte"
        }
    ],
    "possibleLinkedHuts": [
        {
            "id": 3,
            "name": "Hut Freidoure",
            "type": "hut",
            "description": "The...",
            "latitude": 44.4973129,
            "longitude": 7.4303155,
            "altitude": 1757.143,
            "city": "Bellino",
            "province": "Cuneo",
            "region": "Piemonte"
        },
        {
            "id": 4,
            "name": "Hut Greidour",
            "type": "hut",
            "description": "The...",
            "latitude": 44.5973129,
            "longitude": 7.6303155,
            "altitude": 1757.343,
            "city": "Bellino",
            "province": "Cuneo",
            "region": "Piemonte"
        }
    ]
  }
 

describe('linkHutToHike', () => {
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
          cy.intercept('GET', '/api/hikeLinkHuts/1', {
            statusCode: 201,
            body: testPoints,
          });
        })

    it('goes to linkHutToHike', () => {       
        cy.visit('/linkHutToHike/1');
    })

    it('has title', () => {     
        cy.visit('/linkHutToHike/1');
        cy.get('h1[class="fw-bold"]').contains(/Link hut to a hike/i);
    })

    it('has start point', () => {     
        cy.visit('/linkHutToHike/1');
        cy.get('h4[class="m-3 fst-italic"]').contains(/Hut list/i);
    })


    it('contains submit button', () => {
        cy.visit('/linkHutToHike/1');
            cy.findByRole('button', { name: /submit/i });
    });
    it('contains submit button', () => {
        cy.visit('/linkHutToHike/1');
            cy.findByRole('button', { name: /reset/i });
    });
})