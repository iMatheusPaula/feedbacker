describe('Home', () => {
  beforeEach(() => {
    cy.visit(process.env.APP_URL || "http://127.0.0.1:3000")
    cy.wait(2000)
  })

  it('button create account home', () => {
    cy.get('#home-btn-create-account').click()
    cy.get('#modal-create-account')
  })

  it('button create account header', () => {
    cy.get('#header-create-account-button').click()
    cy.get('#modal-create-account')
  })

  it('button login header', () => {
    cy.get('#header-login-button').click()
    cy.get('#modal-login')
  })
})
