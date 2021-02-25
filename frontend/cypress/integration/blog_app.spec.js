describe('Blog app', () => {
  const user = {
    username: 'christsu',
    name: 'Chris Tsu',
    password: '1234',
  }

  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', () => {
    it('Succeeds with correct credentials', () => {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
      cy.contains('Logged in')
    })

    it('Fails with incorrect credentials', () => {
      cy.get('#username').type('wrongUsername')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})
