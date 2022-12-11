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

    it('goes to hut details', () => {
        cy.visit(`/huts/1`);
    })
    it('has correct image', ()=>{
        cy.get('img[alt="Hut Img"]');
    })

    it('has correct name', ()=>{
        cy.get('h2[class="fw-bold my-3"]');
    })
    it('has correct description', ()=>{
        cy.get('span[class="fst-italic"]');
    })
    it('has correct info title', ()=>{
        cy.get('h3[class="fw-bold"]').contains(/hut info/i);
    })
    it('has correct info disclamer', ()=>{
        cy.get('span').contains(/all data are to be considered indicative/i);
    })
    it('has correct website', ()=>{
        cy.get('h5').contains(/website/i);
    })
    it('has correct rooms number', ()=>{
        cy.get('h5').contains(/rooms number/i);
    })
    it('has correct beds number', ()=>{
        cy.get('h5').contains(/beds number/i);
    })
    it('has correct opening', ()=>{
        cy.get('h5').contains(/opening/i);
    })
    it('has correct phone number', ()=>{
        cy.get('h5').contains(/phone number/i);
    })
})