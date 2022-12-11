/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            login.e2e.cy.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/


import '@testing-library/cypress/add-commands'


describe('Login', () => {

    const unverifiedAccount = {
        email: 'antonioconte@gmail.com',
        password: 'password'
    }
    const verifiedAccount = {
        email: 'aldobaglio@gmail.com',
        password: 'password'
    }
    const loginResponse =  {
        "id": 1,
        "email": "aldobaglio@acmilan.com",
        "username": "aldobaglio",
        "name": "aldo",
        "surname": "baglio",
        "role": "localGuide",
        "phoneNumber": "+393456589563",
        "gender":"M"
    }

    it('goes to login', () => {
        cy.visit('/login');

    })

    it('contains title', () => {
        cy.visit('/login');
        cy.wait(500);
        cy.get('h1').contains(/login/i);
    })
    it('contains email label', () => {
        cy.visit('/login');
        cy.get('form').contains(/email/i);
    })
    it('contains password label', () => {
        cy.visit('/login');
        cy.get('form').contains(/password/i);
    })
    it('contains image', () => {
        cy.visit('/login');
        cy.get('img');
    })

    it('contains email field', () => {
        cy.visit('/login');
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert your email"]')
        });
    })
    it('contains password field', () => {
        cy.visit('/login');
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert your password"]')
        });
    })

    it('contains login button', () => {
        cy.visit('/login');
        cy.get('form').within(() => {
            cy.findByRole('button', { name: /login/i });
        });
    });

   /* it('submit correct information, unverified account', () => {
        cy.intercept('POST', '/api/sessions', {
            statusCode: 401,
            body: '',
          });
        cy.visit('/login');
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert your email"]').clear().type(unverifiedAccount.email);
            cy.get('input[placeholder="Insert your password"]').clear().type(unverifiedAccount.password);
            cy.findByRole('button', { name: /login/i }).contains(/login/i).click();
        });
    });
    it('submit correct information, verified account', () => {

        cy.visit('/login');
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert your email"]').clear().type(verifiedAccount.email);
            cy.get('input[placeholder="Insert your password"]').clear().type(verifiedAccount.password);
            cy.get('button').contains(/login/i).click();
            cy.wait(1000);
        });
    });*/
})
