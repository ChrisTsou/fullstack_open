describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })
})
