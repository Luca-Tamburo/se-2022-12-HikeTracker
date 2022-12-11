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

    it('contains all labels', () => {
        cy.visit('/addHike');
        cy.wait(500);
        cy.get('h1[class="fw-bold"]').contains(/Add your hike/i);
        cy.get('form').contains(/name/i);
        cy.get('form').contains(/image/i);
        cy.get('form').contains(/expected time/i);
        cy.get('form').contains(/hike's difficulty/i);
        cy.get('form').contains(/description/i);
        cy.get('form').contains(/GPX file/i);
        cy.get('form').contains(/Upload your image/i);
    })

    it('contains name field', () => {
        cy.visit('/addHike');
        cy.wait(500);
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the hike name"]')
        });
    })
    it('contains image field', () => {
        cy.visit('/addHike');
        cy.wait(500);
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the hike image url"]')
        });
    })
    it('contains expected time field', () => {
        cy.visit('/addHike');
        cy.wait(500);
        cy.get('form').within(() => {
            cy.get('input[placeholder="Insert the hike expected time"]')
        });
    })
    it('contains difficulty field', () => {
        cy.visit('/addHike');
        cy.wait(500);
        cy.get('form').within(() => {
            cy.get('select[name="difficulty"]')
        });
    })
    it('contains description field', () => {
        cy.visit('/addHike');
        cy.wait(500);
        cy.get('form').within(() => {
            cy.get('textarea[placeholder="Insert the hike description"]')
        });
    })
    it('contains file field', () => {
        cy.visit('/addHike');
        cy.wait(500);
        cy.get('form').within(() => {
            cy.get('input[name="file"]')
        });
    })
    it('contains login button', () => {
        cy.visit('/addHike');
        cy.wait(500);
        cy.get('form').within(() => {
            cy.findByRole('button', { name: /submit/i });
        });
    });

    it('submit correct information', () => {
        cy.visit('/addHike');
        cy.wait(500);
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
