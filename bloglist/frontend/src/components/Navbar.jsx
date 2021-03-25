import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '../hooks'
import { logoutUser } from '../reducers/currentUser'
import { Link, useHistory } from 'react-router-dom'

const Navbar = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser)
  const notification = useNotification()
  const history = useHistory()

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(logoutUser())
    notification.notify('Logged out')
    history.push('/login')
  }

  const style = {
    background: 'lightgrey',
    padding: 5,
  }

  const logout = currentUser ? (
    <>
      {currentUser.name} logged in{' '}
      <button type="button" onClick={handleLogout}>
        logout
      </button>
    </>
  ) : null

  return (
    <nav style={style}>
      <Link style={style} to="/blogs">
        blogs
      </Link>
      <Link style={style} to="/users">
        users
      </Link>
      {logout}
    </nav>
  )
}

export default Navbar
