describe('Login and Logout test', function () {
    before(() => {
        cy.visit(Cypress.env("DEFAULT_URL"))  
    })

    it ('can login successfully', () => {
        cy.get('#username').type(Cypress.env("username"))
        cy.get('#password').type(Cypress.env("password"))
        cy.get('.btn').click()
        cy.get('body').should('contain', 'welcome')
    })

    it ('can logout successfully', () => {
        cy.contains('Logout').click()
        cy.get('body').should('contain', 'Login')
    })
})