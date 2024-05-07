describe('Credentials', () => {
    beforeEach(() => {
        cy.visit(process.env.APP_URL || "http://127.0.0.1:3000")
        cy.wait(2000)
        cy.get('#header-login-button').click()
        cy.get('[name="email"]').type('test@example.com')
        cy.get('[name="password"]').type('password')
        cy.get('[name="btn-submit-login"]').click()
        cy.url().should('include', '/feedbacks')
        cy.visit("http://127.0.0.1:3000/credentials")
    })

    it('copy button', () => {
        const text = cy.get('#apiKey').invoke('text')
    })

    it('generate api key', () => {
        const oldApiKey = cy.get('#apiKey').invoke('text')
        cy.get('[name="IconCopy"]').click()
        cy.wait(2000)
        const newApiKey = cy.get('#apiKey').invoke('text')
        expect(oldApiKey).to.not.equal(newApiKey)

    })
})
