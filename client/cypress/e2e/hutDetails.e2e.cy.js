/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            hutDetails.e2e.cy.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// to run this test launch the system with the command "npm run startTest"

import '@testing-library/cypress/add-commands'

describe('hut details', () => {

    const testHut = {
        "id": 2,
        "name": "Refugio",
        "description": "Beautiful ...",
        "roomsNumber": 3,
        "bedsNumber": 30,
        "photoFile": "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
        "latitude": 45.15013536737316,
        "longitude": 7.236844649658008,
        "altitude": 1430,
        "website": "https://...",
        "whenIsOpen": "Always",
        "phoneNumber": "+3757320306",
        "city": "Condove",
        "province": "Torino ",
        "region": "Piemonte"
    }

    beforeEach(() => {
        cy.intercept('GET', '/api/sessions/current', {
            statusCode: 201,
            body: {"id":3,
            "email":"pippobaudo@gmail.com",
            "username":"pippobaudo",
            "name":"pippo",
            "surname":"baudo",
            "role":"hiker",
            "phoneNumber":"+393315658745",
            "gender":"M"},
          })

            cy.intercept('GET', '/api/hutdetails/1', {
                statusCode: 201,
                body: testHut,
              })
        })

    it('goes to hut details', () => {
        cy.visit(`/huts/1`);
    })
    it('has correct image', ()=>{
        cy.visit(`/huts/1`);
        cy.wait(500);
        cy.get('img[alt="Hut Img"]');
    })

    it('has correct name', ()=>{
        cy.visit(`/huts/1`);
        cy.wait(500);
        cy.get('h2[class="fw-bold my-3"]');
    })
    it('has correct description', ()=>{
        cy.visit(`/huts/1`);
        cy.wait(500);
        cy.get('span[class="fst-italic"]');
    })
    it('has correct info title', ()=>{
        cy.visit(`/huts/1`);
        cy.wait(500);
        cy.get('h3[class="fw-bold"]').contains(/hut info/i);
    })
    it('has correct info disclamer', ()=>{
        cy.visit(`/huts/1`);
        cy.wait(500);
        cy.get('span').contains(/all data are to be considered indicative/i);
    })
    it('has correct fields', ()=>{
        cy.visit(`/huts/1`);
        cy.wait(500);
        cy.get('h5').contains(/website/i);
        cy.get('h5').contains(/rooms number/i);
        cy.get('h5').contains(/beds number/i);
        cy.get('h5').contains(/opening/i);
        cy.get('h5').contains(/phone number/i);
    })
})