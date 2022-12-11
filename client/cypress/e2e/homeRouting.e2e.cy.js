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

describe('Home routes', () => {
  it('goes to home', () => {
    cy.visit('/');
  })
  it('goes to login', () => {
    cy.visit('/');
    cy.wait(1000)
    cy.get('.btn').contains(/login/i).click(); //TO BE: Si può migliorare dando le singole etichette
  })


  it('goes to signup', () => {
    cy.visit('/');
    cy.wait(1000)
    cy.get('.btn').contains(/signup/i).click(); //TO BE: Si può migliorare dando le singole etichette
    cy.visit('/signup');

  })


  it('goes to signup and select the hike option', () => {
    cy.visit('/');
    cy.wait(1000)
    cy.get('.btn').contains(/signup/i).click(); //TO BE: Si può migliorare dando le singole etichette

    cy.wait(1000)
    cy.get('.btn').contains(/hike/i).click(); //TO BE: Si può migliorare dando le singole etichette
    cy.visit('/signup/hiker');
  })


  it('goes to signup and select the local guide option', () => {
    cy.visit('/');
    cy.wait(1000)
    cy.get('.btn').contains(/signup/i).click(); //TO BE: Si può migliorare dando le singole etichette
    cy.wait(1000)
    cy.get('.btn').contains(/local guide/i).click(); //TO BE: Si può migliorare dando le singole etichette
    cy.visit('/signup/localGuide');
  })

  it('goes to signup and select the hut worker option', () => {
    cy.visit('/');
    cy.wait(1000)
    cy.get('.btn').contains(/signup/i).click(); //TO BE: Si può migliorare dando le singole etichette;
    cy.wait(1000)
    cy.get('.btn').contains(/hut worker/i).click(); //TO BE: Si può migliorare dando le singole etichette
    cy.visit('/signup/hutWorker');
  })
})