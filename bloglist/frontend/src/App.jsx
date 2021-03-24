import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import { useNotification } from './hooks'
import { loginUser, logoutUser } from './reducers/currentUser'
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser)
  const notification = useNotification()
  const history = useHistory()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(loginUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(logoutUser())
    notification.notify('Logged out')
    history.push('/login')
  }

  const title = currentUser ? (
    <>
      <h2>blogs</h2>
      <p>
        {currentUser.name} logged in
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
    </>
  ) : null

  return (
    <>
      <Notification />
      <Route path={['/users', '/blogs']}>{title}</Route>
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs">
          <Blogs />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/">
          <Redirect to="/blogs" />
        </Route>
      </Switch>
    </>
  )
}

export default App
