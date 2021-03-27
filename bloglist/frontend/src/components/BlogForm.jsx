import React, { useState } from 'react'
import { createBlog } from '../reducers/blogs'
import { useDispatch } from 'react-redux'
import { useNotification } from '../hooks'
import { Grid, Typography, Button, TextField } from '@material-ui/core'

const BlogForm = () => {
  const dispatch = useDispatch()
  const notification = useNotification()

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    try {
      dispatch(
        createBlog({
          title: blogTitle,
          author: blogAuthor,
          url: blogUrl,
        })
      )

      notification.notify(`a new blog ${blogTitle} by ${blogAuthor} added`)

      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
    } catch (error) {
      notification.error(error.message)
    }
  }

  return (
    <div>
      <Typography variant="h5">create new</Typography>
      <form onSubmit={addBlog}>
        <Grid container direction="column" alignItems="flex-start" spacing={1}>
          <Grid item>
            <TextField
              label="Title:"
              value={blogTitle}
              onChange={({ target }) => setBlogTitle(target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Author:"
              value={blogAuthor}
              onChange={({ target }) => setBlogAuthor(target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Url:"
              value={blogUrl}
              onChange={({ target }) => setBlogUrl(target.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" type="submit">
              create
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default BlogForm
