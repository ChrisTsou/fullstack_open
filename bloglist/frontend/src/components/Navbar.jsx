import { Typography, AppBar, Button, Grid, Toolbar } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useNotification } from '../hooks'
import { logoutUser } from '../reducers/currentUser'

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

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between">
          <Grid>
            <Button color="inherit" component={Link} to="/blogs">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
          </Grid>
          <Grid>
            {currentUser ? (
              <>
                <Typography variant="caption">
                  <em>{currentUser.name}</em> logged in
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  logout
                </Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                login
              </Button>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
