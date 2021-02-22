import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title,author and not url,likes', () => {
  const blog = {
    title: 'test-title',
    author: 'test-author',
    url: 'test-url',
    likes: 3,
    user: {
      username: 'test-username',
      name: 'test-name',
    },
  }

  const component = render(
    <Blog
      blog={blog}
      currentUser={{
        username: 'test-username',
        name: 'test-name',
      }}
      addLike={() => null}
      deleteBlog={() => null}
    />
  )
  const info = component.container.querySelector('.blogInfo')
  const details = component.container.querySelector('.blogDetails')

  expect(info).toHaveTextContent('test-title test-author')
  expect(details).toBeNull()
})
