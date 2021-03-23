import React, { useState } from 'react'
import { createBlog } from '../reducers/blogs'
import { useDispatch } from 'react-redux'
import { useNotification } from '../hooks'

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

export default BlogForm
