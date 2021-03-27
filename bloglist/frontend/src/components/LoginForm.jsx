import { Typography, Grid, Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useNotification } from '../hooks'
import { loginUser } from '../reducers/currentUser'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = () => {
  const dispatch = useDispatch()
  const notification = useNotification()
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login({ username, password })
      setUsername('')
      setPassword('')

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      notification.notify('Logged in')
      dispatch(loginUser(loggedUser))
      history.push('/')
    } catch (exception) {
      notification.error('Wrong credentials')
    }
  }

  return (
    <div>
      <Typography variant="h5" paragraph>
        Log in to application
      </Typography>
      <form onSubmit={handleLogin}>
        <Grid container spacing={2} direction="column" alignItems="flex-start">
          <Grid item>
            <TextField
              required
              id="outlined-required"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="outlined-required"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              login
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default LoginForm
