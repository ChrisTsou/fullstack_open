import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

test('form calls createBlog with the right details', () => {
  const mockCreateBlog = jest.fn()
  const component = render(<BlogForm createBlog={mockCreateBlog} />)

  const titleInput = component.container.querySelector('#blogTitle')
  const authorInput = component.container.querySelector('#blogAuthor')
  const urlInput = component.container.querySelector('#blogUrl')

  const submitButton = component.getByText('create')

  fireEvent.change(titleInput, { target: { value: 'test-title' } })
  fireEvent.change(authorInput, { target: { value: 'test-author' } })
  fireEvent.change(urlInput, { target: { value: 'test-url' } })
  fireEvent.click(submitButton)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0]).toEqual({
    title: 'test-title',
    author: 'test-author',
    url: 'test-url',
  })
})
