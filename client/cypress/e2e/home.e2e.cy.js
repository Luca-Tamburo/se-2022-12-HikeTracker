/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            home.cy.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

describe('Home', () => {
  it('goes to home', () => {
    cy.visit('/');
    cy.wait(1000)
  })

  it('has home title', () => {
    cy.get('h1').contains(/Welcome to HikeTracker/i);
  })

  it('has link to hike list', () => {
    cy.get('link').contains(/Click here to see the list of hikes/i).click();
  })
})