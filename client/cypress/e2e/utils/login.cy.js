const testLog = Cypress.Commands.add('login', (username, password) => {
    cy.visit('/login')
    cy.get('input[placeholder="Insert your email"]').type(username)
    cy.get('input[placeholder="Insert your password"]').type(password)
    cy.get('button').contains(/login/i).click();
  })

export default testLog