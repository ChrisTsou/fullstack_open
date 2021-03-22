import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
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

let mockAddLike
let mockdeleteBlog
let component

beforeEach(() => {
  mockAddLike = jest.fn()
  mockdeleteBlog = jest.fn()

  component = render(
    <Blog
      blog={blog}
      currentUser={{
        username: 'test-username',
        name: 'test-name',
      }}
      addLike={mockAddLike}
      deleteBlog={mockdeleteBlog}
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

test('like button calls event handler appropriate times', () => {
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockAddLike.mock.calls).toHaveLength(2)
})
