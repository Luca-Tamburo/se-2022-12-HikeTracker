/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            addParking.e2e.cy.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// to run this test launch the system with the command "npm run startTest"

import '@testing-library/cypress/add-commands'


describe('addParking', () => {

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
          })
        })
    it('goes to addParking', () => {
        cy.visit('/addParking');
    })

    
    it('contains title', () => {
        cy.wait(100);
        cy.get('h1[class="fw-bold"]').contains(/Add your Parking/i);
    })

    it('contains name label', () => {
        cy.get('form').contains(/name/i);
    })

    it('contains altitude label', () => {
        cy.get('form').contains(/altitude/i);
    })

    
    it('contains description label', () => {
        cy.get('form').contains(/description/i);
    })

    it('contains name field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the parking name"]')
        });
    })

    it('contains altitude field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the parking altitude"]')
        });
    });
    it('contains description field', () => {
        cy.get('form').within(() => {
            cy.get('textarea[placeholder="Insert the parking description"]')
        });
    })
    
})