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
  it('goes to login', () => {
    cy.get('.btn').contains(/login/i).click(); //TO BE: Si può migliorare dando le singole etichette
    cy.wait(1000)
  })


  it('goes to signup', () => {
    cy.get('.btn').contains(/signup/i).click(); //TO BE: Si può migliorare dando le singole etichette
    cy.visit('/signup');
    cy.wait(1000)
  })


  it('goes to signup and select the hike option', () => {
    cy.get('.btn').contains(/signup/i).click(); //TO BE: Si può migliorare dando le singole etichette
    cy.visit('/signup');
    cy.wait(1000)
    cy.get('.btn').contains(/hike/i).click(); //TO BE: Si può migliorare dando le singole etichette
    cy.visit('/signup/hiker');
    cy.wait(1000)
  })


  it('goes to signup and select the local guide option', () => {
    cy.get('.btn').contains(/signup/i).click(); //TO BE: Si può migliorare dando le singole etichette
    cy.visit('/signup');
    cy.wait(1000)
    cy.get('.btn').contains(/local guide/i).click(); //TO BE: Si può migliorare dando le singole etichette
    cy.visit('/signup/localGuide');
    cy.wait(1000)
  })

  it('goes to signup and select the hut worker option', () => {
    cy.get('.btn').contains(/signup/i).click(); //TO BE: Si può migliorare dando le singole etichette
    cy.visit('/signup');
    cy.wait(1000)
    cy.get('.btn').contains(/hut worker/i).click(); //TO BE: Si può migliorare dando le singole etichette
    cy.visit('/signup/hutWorker');
    cy.wait(1000)
  })
})