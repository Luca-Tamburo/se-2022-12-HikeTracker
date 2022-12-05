/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            addHike.e2e.cy.js
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
            photoFile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2peLDeguGDS1G6mWaRbPb89N3Rzs60Rh1Rw&usqp=CAU",
            hikeFile: "./cypress/e2e/RightFile.gpx"
        }

        beforeEach(() => {
            cy.intercept('GET', '/api/sessions/current', {
                statusCode: 201,
                body: {"id":1,
                "email":"aldobaglio@gmail.com",
                "username":"aldobaglio",
                "name":"aldo",
                "surname":"baglio",
                "role":"localGuide",
                "phoneNumber":"+393315658745",
                "gender":"M"},
              })
            })

    it('goes to addHike', () => {
        cy.visit('/addHike');

    })

    it('contains title', () => {
        cy.wait(100);
        cy.get('h1[class="fw-bold"]').contains(/Add your hike/i);
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
    it('contains GPX file upload label', () => {
        cy.get('form').contains(/GPX file/i);
    })
    it('contains image file upload label', () => {
        cy.get('form').contains(/HIke image file/i);
    })

    it('contains name field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the hike name"]')
        });
    })
    it('contains image field', () => {
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the hike image url"]')
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
            cy.get('input[placeholder="Insert the hike image url"]').clear().type(testHike.photoFile);
            cy.get('input[placeholder="Insert the hike expected time"]').clear().type(testHike.expectedTime);
            cy.get('select[name="difficulty"]').select("Hiker");
            cy.get('textarea[placeholder="Insert the hike description"]').clear().type(testHike.description);
            cy.get('input[ type="file"][accept=".gpx"]').selectFile(testHike.hikeFile);



            cy.findByRole('button', { name: /submit/i }).click();

        });
    });
})
