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
        title: "sss",
        description: "kkk",
        expectedTime: 33.33,
        difficulty: "Hiker",
        photoFile: "http://somelink/link",
        hikeFile: "./cypress/e2e/RightFile.gpx"
    }
    it('goes to hike details', () => {
        cy.visit(`/hikes/1`);
    })
    it('has correct image', ()=>{
        cy.get('img[alt="Hike Img"]');
    })

    it('has correct name', ()=>{
        cy.get('h2').contains('Trail to MONTE FERRA');
    })
    it('has correct author', ()=>{
        cy.get('h5').contains('aldo baglio');
    })
    it('has correct date', ()=>{
        cy.get('h5').contains('2022-01-10');
    })
    it('has correct description', ()=>{
        cy.get('span').contains('Leaving the car in the large parking lot we pass the Melezè Refuge');
    })
    it('has correct INFO card', ()=>{
        cy.get('h3').contains('HIKE INFO');
    })
    it('has correct lenght title', ()=>{
        cy.get('h5').contains('LENGTH');
    })
    it('has correct ascent title', ()=>{
        cy.get('h5').contains('ASCENT');
    })
    it('has correct difficulty title', ()=>{
        cy.get('h5').contains('DIFFICULTY');
    })
    it('has correct expected time title', ()=>{
        cy.get('h5').contains('EXPECTED TIME');
    })
    it('has correct start point title', ()=>{
        cy.get('h5').contains('START POINT');
    })
    it('has correct end point title', ()=>{
        cy.get('h5').contains('END POINT');
    })
    it('has correct reference points title', ()=>{
        cy.get('h5').contains('REFERENCE POINTS');
    })
})