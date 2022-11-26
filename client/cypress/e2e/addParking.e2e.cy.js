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

    it('goes to addParking', () => {
        cy.visit('/addParking');
    })

    
    it('contains title', () => {
        cy.get('h1').contains(/Add your Parking/i);
    })

    it('contains name label', () => {
        cy.get('form').contains(/name/i);
    })
    it('contains latitude label', () => {
        cy.get('form').contains(/latitude/i);
    })
    it('contains longitude label', () => {
        cy.get('form').contains(/longitude/i);
    })
    it('contains altitude label', () => {
        cy.get('form').contains(/altitude/i);
    })
    it('contains region label', () => {
        cy.get('form').contains(/region/i);
    })
    it('contains province label', () => {
        cy.get('form').contains(/province/i);
    })
    it('contains city label', () => {
        cy.get('form').contains(/city/i);
    })
    
    it('contains description label', () => {
        cy.get('form').contains(/description/i);
    })

    it('contains name field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the parking name"]')
        });
    })

    it('contains latitude field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the parking latitude in mt"]')
        });
    });
    it('contains longitude field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the parking longitude in mt"]')
        });
    });
    it('contains altitude field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the parking altitude in mt"]')
        });
    });
    it('contains description field', () => {
        cy.get('form').within(() => {
            cy.get('textarea[placeholder="Insert the parking description"]')
        });
    })
    
})