import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, prettyDOM, render } from '@testing-library/react'
import Blog from './Blog'

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

let component

beforeEach(() => {
  component = render(
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
})

test('renders title,author and not url,likes', () => {
  const info = component.container.querySelector('.blogInfo')
  const details = component.container.querySelector('.blogDetails')

  expect(info).toHaveTextContent('test-title test-author')
  expect(details).toBeNull()
})

test('renders url,likes when button is pressed', () => {
  const button = component.getByText('view')
  fireEvent.click(button)

  const details = component.container.querySelector('.blogDetails')
  expect(details).toHaveTextContent('test-url')
  expect(details).toHaveTextContent('likes: 3')
  expect(details).toHaveTextContent('test-name')
})
