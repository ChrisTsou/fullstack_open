import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '../hooks'
import { initializeBlogs } from '../reducers/blogs'
import { loginUser, logoutUser } from '../reducers/user'
import blogService from '../services/blogs'
import Blog from './Blog'
import BlogForm from './BlogForm'
import LoginForm from './LoginForm'
import Togglable from './Togglable'

const Body = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const notification = useNotification()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(loginUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }

    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(logoutUser())
    notification.notify('logged out')
  }

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in
          <button type="button" onClick={handleLogout}>
            logout
          </button>
        </p>
        <Togglable showButtonLabel="new blog" hideButtonLabel="cancel">
          <BlogForm />
        </Togglable>
        {blogs
          .sort((b0, b1) => b1.likes - b0.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    )
  } else {
    return <LoginForm />
  }
}

export default Body
