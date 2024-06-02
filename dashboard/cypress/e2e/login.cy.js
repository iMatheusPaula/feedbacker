describe('Modal Login', () => {
    beforeEach(() => {
        cy.visit(process.env.APP_URL || "http://127.0.0.1:3000")
        cy.wait(2000)
        cy.get('#header-login-button').click()
    })

    it('try login', () => {
        cy.get('[name="email"]').type('test@example.com')
        cy.get('[name="password"]').type('password')
        cy.get('[name="btn-submit-login"]').click()
        cy.url().should('include', '/feedbacks')
    })

    it('show login error invalid email and password', () => {
        cy.get('[name="email"]').type('test@e')
        cy.get('[name="password"]').type('pa')
        cy.get('[name="btn-submit-login"]').click()
        cy.get('#emailError')
        cy.get('#passwordError')
    })

    it('logout', () => {
        cy.get('[name="email"]').type('test@example.com')
        cy.get('[name="password"]').type('password')
        cy.get('[name="btn-submit-login"]').click()
        cy.url().should('include', '/feedbacks')
        cy.get('#btnLogout').click()
        cy.url().should('include', '/')
    })
})
