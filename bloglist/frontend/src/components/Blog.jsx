import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '../hooks'
import { likeBlog, deleteBlog } from '../reducers/blogs'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const notification = useNotification()
  const user = useSelector((state) => state.user)

  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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

  return (
    <div style={blogStyle} className="blog">
      <div className="blogInfo">
        {blog.title} {blog.author}
        <button type="button" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails ? (
        <div className="blogDetails">
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}{' '}
            <button type="button" onClick={handleLike}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
        </div>
      ) : null}
      {user.username === blog.user.username ? (
        <button type="button" onClick={handleDelete}>
          delete
        </button>
      ) : null}
    </div>
  )
}

export default Blog
