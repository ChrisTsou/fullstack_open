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

  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <Togglable showButtonLabel="new blog" hideButtonLabel="cancel">
        <BlogForm />
      </Togglable>
      {blogs
        .sort((b0, b1) => b1.likes - b0.likes)
        .map((blog) => (
          <div style={style} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </div>
  )
}

export default Blogs
