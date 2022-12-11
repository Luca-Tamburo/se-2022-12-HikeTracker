/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            hikeDetails.e2e.cy.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// to run this test launch the system with the command "npm run startTest"

import '@testing-library/cypress/add-commands'

describe('hike details', () => {

    const testHike={
        "id": 1,
        "title": "Trail to MONTE FERRA",
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
        "gpx": "gpx file data if loggedin, nothing ('') if not logged in",
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
    beforeEach(() => {
        cy.intercept('GET', '/api/hikedetails/1', {
            statusCode: 201,
            body: testHike,
          })
        })

    it('goes to hike details', () => {
        cy.visit(`/hikes/1`);
    })
    it('has correct image', ()=>{
        cy.visit(`/hikes/1`);
        cy.wait(500);
        cy.get('img[alt="Hike Img"]');
    })

    it('has correct name', ()=>{
        cy.visit(`/hikes/1`);
        cy.wait(500);
        cy.get('h2').contains('Trail to MONTE FERRA');
    })
    it('has correct upload info ', ()=>{
        cy.visit(`/hikes/1`);
        cy.wait(500);
        cy.get('h5').contains('aldo baglio');
        cy.get('h5').contains('2022-01-10');
    })
    it('has correct description', ()=>{
        cy.visit(`/hikes/1`);
        cy.wait(500);
        cy.get('span').contains('Leaving the car ...');
    })
    it('has correct INFO card', ()=>{
        cy.visit(`/hikes/1`);
        cy.wait(500);
        cy.get('h3').contains('HIKE INFO');
    })
    it('has correct titles', ()=>{
        cy.visit(`/hikes/1`);
        cy.wait(500);
        cy.get('h5').contains('LENGTH');
        cy.get('h5').contains('ASCENT');
        cy.get('h5').contains('DIFFICULTY');
        cy.get('h5').contains('EXPECTED TIME');
        cy.get('h5').contains('START POINT');
        cy.get('h5').contains('END POINT');
        cy.get('h5').contains('REFERENCE POINTS');
    })
})