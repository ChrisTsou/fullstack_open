import React, { useState } from 'react'

const Blog = ({
  blog, addLike, deleteBlog, currentUser,
}) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = () => {
    addLike(blog)
  }

  const handleDelete = () => {
    deleteBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        {' '}
        {blog.author}
        <button type="button" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails ? (
        <div>
          <div>{blog.url}</div>
          <div>
            likes:
            {' '}
            {blog.likes}
            {' '}
            <button type="button" onClick={handleLike}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
        </div>
      ) : null}
      {currentUser.username === blog.user.username ? (
        <button type="button" onClick={handleDelete}>
          delete
        </button>
      ) : null}
    </div>
  )
}

export default Blog
