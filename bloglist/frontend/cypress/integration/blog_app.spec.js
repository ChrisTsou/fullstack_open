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

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: user.username, password: user.password })
    })

    const testBlog = {
      title: 'test-title',
      author: 'test-author',
      url: 'test-url',
    }

    it('A blog can be created', () => {
      cy.contains('new blog').click()
      cy.get('#blogTitle').type('test-title')
      cy.get('#blogAuthor').type('test-author')
      cy.get('#blogUrl').type('test-url')
      cy.get('#createBlogButton').click()
      cy.get('.blogInfo').contains('test-title test-author')
    })

    it('A blog can be liked', () => {
      cy.createBlog(testBlog)
      cy.get('.blogInfo').contains('view').click()
      cy.get('.blogDetails').contains('like').click()
      cy.get('.blogDetails').contains('likes: 1')
    })

    it('A blog can be deleted by the user that created it', () => {
      cy.createBlog(testBlog)
      cy.visit('http://localhost:3000')
      cy.contains('delete').click()
      cy.get('html').should('not.contain', 'test-title test-author')
    })

    it('A blog cannot be deleted by a use that didnt create it', () => {
      cy.createBlog(testBlog)
      cy.contains('logout').click()

      const testUser = {
        username: 'test-username',
        name: 'test-name',
        password: 'test-password',
      }
      cy.request('POST', 'http://localhost:3001/api/users', testUser)
      cy.login({ username: testUser.username, password: testUser.password })
      cy.visit('http://localhost:3000')

      cy.get('.blog').should('not.contain', 'delete')
    })

    it.only('Blogs are ordered by their likes', () => {
      cy.createBlog(testBlog)
      cy.createBlog({
        title: 'test-title1',
        author: 'test-author1',
        url: 'test-url1',
        likes: 10,
      })
      cy.createBlog({
        title: 'test-title2',
        author: 'test-author2',
        url: 'test-url2',
        likes: 3,
      })

      cy.get('.blog').then((blogs) => {
        expect(blogs.length).to.equal(3)
        cy.wrap(blogs).each((blog) => {
          cy.wrap(blog).contains('view').click()
        })
        cy.wrap(blogs[0]).contains('likes: 10')
        cy.wrap(blogs[1]).contains('likes: 3')
        cy.wrap(blogs[2]).contains('likes: 0')
      })
    })
  })
})
