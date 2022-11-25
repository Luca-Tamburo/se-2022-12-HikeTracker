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

    const testHike={
            title: "sss",
            description: "kkk",
            expectedTime: 33.33,
            difficulty: "Hiker",
            photoFile: "http://somelink/link",
            hikeFile: "./cypress/e2e/RightFile.gpx"
        }

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

    it('contains name field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the hike name"]')
        });
    })
    it('contains image field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the hike url image"]')
        });
    })
    it('contains expected time field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the hike expected time"]')
        });
    })
    it('contains difficulty field', () => {
        cy.get('form').within(() => {
            cy.get('select[name="difficulty"]')
        });
    })
    it('contains description field', () => {
        cy.get('form').within(() => {
            cy.get('textarea[placeholder="Insert the hike description"]')
        });
    })
    it('contains file field', () => {
        cy.get('form').within(() => {
            cy.get('input[name="file"]')
        });
    })
    it('contains login button', () => {
        cy.get('form').within(() => {
            cy.findByRole('button', { name: /submit/i });
        });
    });

    it('submit correct information', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the hike name"]').clear().type(testHike.title);
            cy.get('input[placeholder="Insert the hike url image"]').clear().type(testHike.photoFile);
            cy.get('input[placeholder="Insert the hike expected time"]').clear().type(testHike.expectedTime);
            cy.get('select[name="difficulty"]').select("Hiker");
            cy.get('textarea[placeholder="Insert the hike description"]').clear().type(testHike.description);
            cy.get('input[ type="file"]').selectFile(testHike.hikeFile);



            cy.findByRole('button', { name: /submit/i }).click();

        });
    });


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
