import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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
            <button type="button">like</button>
          </div>
          <div>{blog.user.name}</div>
        </div>
      ) : null}
    </div>
  )
}

export default Blog
