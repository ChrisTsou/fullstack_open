import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((b) => setBlogs(b))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const notificationWithTimeout = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      setUsername('')
      setPassword('')
      notificationWithTimeout('logged in')
    } catch (exception) {
      notificationWithTimeout(exception.message, true)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    notificationWithTimeout('logged out')
  }

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create(blogObject)

      setBlogs(blogs.concat(blogObject))
      notificationWithTimeout(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    } catch (exception) {
      notificationWithTimeout(exception.message, true)
    }
  }

  const loggedInRender = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name}
        {' '}
        logged in
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <Togglable showButtonLabel="new note" hideButtonLabel="cancel" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )

  return (
    <div>
      <Notification notification={notification} />
      {user ? (
        loggedInRender()
      ) : (
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      )}
    </div>
  )
}

export default App
