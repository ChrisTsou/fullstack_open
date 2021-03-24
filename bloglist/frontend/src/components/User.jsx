import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

const User = () => {
  const match = useRouteMatch('/users/:id')
  const user = useSelector((state) =>
    state.users.find((user) => {
      return user.id === match.params.id
    })
  )

  if (!user) {
    return null
  }

  return (
    <>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
