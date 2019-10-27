import faker from 'faker'

describe('Admin view test: employee list', function () {
    before(() => {
        cy.visit(Cypress.env("DEFAULT_URL"))

        cy.get('#username').type(Cypress.env("username"))
        cy.get('#password').type(Cypress.env("password"))
        cy.get('.btn').click()
        cy.get('body').should('contain', 'welcome')
    })

    it ('can add employee successfully', () => {
        cy.get('#username').type(faker.internet.userName())
        cy.get('#password').type(faker.internet.password())
        cy.get('.icon-add').click()
        cy.get('.swal2-container').should('be', 'visible')
        cy.get('.swal2-confirm').click()
    })

    /*
    * currently hover()  is not supported in Cypress, 
    * so for now jump edit and delete employee
    */
})