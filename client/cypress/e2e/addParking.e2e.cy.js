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
        cy.visit('/addParking');
        cy.wait(500);
        cy.get('h1[class="fw-bold"]').contains(/Add your Parking/i);
    })

    it('contains labels', () => {
        cy.visit('/addParking');
        cy.wait(500);
        cy.get('form').contains(/name/i);
        cy.get('form').contains(/altitude/i);
        cy.get('form').contains(/description/i);
    })

    it('contains fields', () => {
        cy.visit('/addParking');
        cy.wait(500);
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the parking name"]')
        });
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the parking altitude"]')
        });
        cy.get('form').within(() => {
            cy.get('textarea[placeholder="Insert the parking description"]')
        });
    })
    
})