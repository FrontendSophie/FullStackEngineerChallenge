describe('Admin view test: review', function () {
    before(() => {
        cy.visit(Cypress.env("DEFAULT_URL"))

        cy.get('#username').type(Cypress.env("username"))
        cy.get('#password').type(Cypress.env("password"))
        cy.get('.btn').click()
        cy.get('body').should('contain', 'welcome')
    })

    it ('can review employee successfully', () => {
        const fakeReview = 'Good person.'

        cy.get('.list li:first-child .btn-review').click()
        cy.url().should('include', 'review')

        cy.get('.add-review textarea').clear()
        cy.get('.add-review textarea').type(fakeReview)
        cy.get('.add-review .btn').click()
        cy.get('.swal2-container').should('be', 'visible')
        cy.get('.swal2-confirm').click()
        cy.get('.review-line').should('contain', fakeReview)
    })
})