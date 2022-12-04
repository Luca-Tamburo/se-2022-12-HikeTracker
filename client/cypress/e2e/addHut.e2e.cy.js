/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            addHut.e2e.cy.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// to run this test launch the system with the command "npm run startTest"

import '@testing-library/cypress/add-commands'


describe('addHut', () => {
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
    it('goes to addHut', () => {
        
        cy.visit('/addHut');
        
    })

    
    it('contains title', () => {
        cy.wait(100);
        cy.get('h1').contains(/Add your hut/i);
    })

    it('contains name label', () => {
        cy.get('form').contains(/name/i);
    })
    it('contains image label', () => {
        cy.get('form').contains(/image/i);
    })
    it('contains Number of rooms label', () => {
        cy.get('form').contains(/number of rooms/i);
    })
    it('contains Number of beds label', () => {
        cy.get('form').contains(/Number of beds/i);
    })
    it('contains Phone number label', () => {
        cy.get('form').contains(/phone number/i);
    })

    it('contains altitude label', () => {
        cy.get('form').contains(/altitude/i);
    })
    
    it('contains description label', () => {
        cy.get('form').contains(/description/i);
    })

    it('contains name field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the hut name"]')
        });
    })
    it('contains image field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the hut image url"]')
        });
    })
    it('contains rooms field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the number of rooms"]')
        });
    })
    it('contains beds field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the number of beds"]')
        });
    })
    it('contains number field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the hut phone number"]')
        });
    })
    it('contains altitude field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the hut altitude"]')
        });
    });
    it('contains description field', () => {
        cy.get('form').within(() => {
            cy.get('textarea[placeholder="Insert the hut description"]')
        });
    })
    
})