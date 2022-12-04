/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            hikes.e2e.cy.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// to run this test launch the system with the command "npm run startTest"

import '@testing-library/cypress/add-commands'


describe('hikes', () => {

    it('goes to hikes page', () => {
        cy.visit(`/hikes`);
    })
    it('contains region filter', () => {
        cy.get('select option').contains(/Region/i);
    })
    it('contains province filter', () => {
        cy.get('select option').contains(/Province/i);
    })
    it('contains city filter', () => {
        cy.get('select option').contains(/City/i);
    })
    it('contains range filter', () => {
        cy.get('span').contains(/Range of 0 mt/i);
        cy.get('input[class="form-range"][min="0"][max="100000"][value="0"]');
    })
    it('contains difficulty filter', () => {
        cy.get('select option').contains(/Difficulty/i);
    })
    it('contains reset', () => {
        cy.get('button').contains(/reset/i);
    })
    it('contains search', () => {
        cy.get('button').contains(/search/i);
    })
    it('contains cards', () => {
        cy.get('div[class="fw-bold card-title h5"]').contains(/trail to monte ferra/i);
    })
})