/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            huts.e2e.cy.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// to run this test launch the system with the command "npm run startTest"

import '@testing-library/cypress/add-commands'


describe('huts', () => {
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
        })
    it('goes to huts page', () => {
        cy.visit(`/huts`);
    })
    it('contains filter fields', () => {
        cy.visit(`/huts`);
        cy.wait(500);
        cy.get('select option').contains(/Region/i);
        cy.get('select option').contains(/Province/i);
        cy.get('select option').contains(/City/i);
        cy.get('span').contains(/Range of 0 mt/i);
        cy.get('input[class="form-range"][min="0"][max="100000"]');
        cy.get('p[class="fw-bold my-2 my-sm-2 mt-md-0 mb-0"]').contains(/Hut name/i);
        cy.get('input[data-testid="name-select"]');
    })
    it('contains reset', () => {
        cy.visit(`/huts`);
        cy.wait(500);
        cy.get('button').contains(/reset/i);
    })
    it('contains search', () => {
        cy.visit(`/huts`);
        cy.wait(500);
        cy.get('button').contains(/search/i);
    })
    /*it('contains cards', () => {
        cy.visit(`/huts`);
        cy.wait(500);
        cy.get('div[class="border-0 shadow card"]');
    })*/
})