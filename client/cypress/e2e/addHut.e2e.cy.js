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

    it('goes to addHut', () => {
        cy.visit('/addHut');
    })

    
    it('contains title', () => {
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
    it('contains latitude field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the hut latitude in mt"]')
        });
    });
    it('contains longitude field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the hut longitude in mt"]')
        });
    });
    it('contains altitude field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the hut altitude in mt"]')
        });
    });
    it('contains description field', () => {
        cy.get('form').within(() => {
            cy.get('textarea[placeholder="Insert the hut description"]')
        });
    })
    
})