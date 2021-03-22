import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <label htmlFor="blogTitle">Title:</label>
        <input
          type="text"
          value={blogTitle}
          name="BlogTitle"
          id="blogTitle"
          onChange={({ target }) => setBlogTitle(target.value)}
        />
        <label htmlFor="blogAuthor">Author:</label>
        <input
          type="text"
          value={blogAuthor}
          name="BlogAuthor"
          id="blogAuthor"
          onChange={({ target }) => setBlogAuthor(target.value)}
        />
        <label htmlFor="blogUrl">Url:</label>
        <input
          type="text"
          value={blogUrl}
          name="BlogUrl"
          id="blogUrl"
          onChange={({ target }) => setBlogUrl(target.value)}
        />
        <button id="createBlogButton" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func,
}

export default BlogForm
