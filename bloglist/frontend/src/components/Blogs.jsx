import { Typography, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { initializeBlogs } from '../reducers/blogs'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <>
      <Togglable showButtonLabel="new blog" hideButtonLabel="cancel">
        <BlogForm />
      </Togglable>
      <Grid container direction="column" spacing={2}>
        {blogs
          .sort((b0, b1) => b1.likes - b0.likes)
          .map((blog) => (
            <Grid item key={blog.id}>
              <Typography
                variant="h6"
                component={Link}
                to={`/blogs/${blog.id}`}
              >
                {blog.title}
              </Typography>
            </Grid>
          ))}
      </Grid>
    </>
  )
}

export default Blogs
