/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            addHIke.e2e.cy.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// to run this test launch the system with the command "npm run startTest"

import '@testing-library/cypress/add-commands'


describe('addHike', () => {

    const testHike={"title": "sss",
            "description": "kkk",
            "expectedTime": 33.33,
            "difficulty": "Hiker",
            "photoFile": "http://somelink/link"}

    it('goes to addHike', () => {
        cy.visit('/addHike');

    })

    it('contains title', () => {
        cy.get('h1').contains(/Add your hike/i);
    })
    it('contains name label', () => {
        cy.get('form').contains(/name/i);
    })
    it('contains image label', () => {
        cy.get('form').contains(/image/i);
    })
    it('contains expected time label', () => {
        cy.get('form').contains(/expected time/i);
    })
    it("contains Hike's difficulty label", () => {
        cy.get('form').contains(/hike's difficulty/i);
    })
    it('contains description label', () => {
        cy.get('form').contains(/description/i);
    })
    it('contains file upload label', () => {
        cy.get('form').contains(/file upload/i);
    })
/*
    it('contains email field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert your email"]')
        });
    })
    it('contains password field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert your password"]')
        });
    })

    it('contains login button', () => {
        cy.get('form').within(() => {
            cy.findByRole('button', { name: /login/i });
        });
    });

    it('submit correct information, unverified account', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert your email"]').clear().type(unverifiedAccount.email);
            cy.get('input[placeholder="Insert your password"]').clear().type(unverifiedAccount.password);
            cy.findByRole('button', { name: /login/i }).contains(/login/i).click();
        });
    });
    it('submit correct information, verified account', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert your email"]').clear().type(verifiedAccount.email);
            cy.get('input[placeholder="Insert your password"]').clear().type(verifiedAccount.password);
            cy.get('button').contains(/login/i).click();

        });
    });*/
})
