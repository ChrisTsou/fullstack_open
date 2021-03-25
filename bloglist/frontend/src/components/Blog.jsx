import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '../hooks'
import {
  likeBlog,
  deleteBlog,
  commentBlog,
  initializeBlogs,
} from '../reducers/blogs'
import { useRouteMatch } from 'react-router-dom'

const Blog = () => {
  const match = useRouteMatch('/blogs/:id')
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === match.params.id)
  )
  const dispatch = useDispatch()
  const notification = useNotification()
  const currentUser = useSelector((state) => state.currentUser)

  const [comment, setComment] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  if (!blog) {
    return <p>oops! not found :/</p>
  }

  const handleLike = async () => {
    try {
      dispatch(likeBlog(blog))
    } catch (exception) {
      notification.error(exception.message)
    }
  }

  const handleDelete = () => {
    if (window.confirm('delete blog?')) {
      try {
        dispatch(deleteBlog(blog.id))
      } catch (e) {
        notification.error(e.message)
      }
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      dispatch(commentBlog(comment, blog.id))
      setComment('')
      notification.notify('comment added!')
    } catch (error) {
      notification.error(error.message)
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          likes: {blog.likes}{' '}
          <button type="button" onClick={handleLike}>
            like
          </button>
        </div>
        <div>added by {blog.user.name}</div>
      </div>
      {currentUser.username === blog.user.username ? (
        <button type="button" onClick={handleDelete}>
          delete
        </button>
      ) : null}
      <h2>comments</h2>
      <form onSubmit={handleComment}>
        <input
          type="text"
          value={comment}
          name="Comment"
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
