import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'BLOGS_INIT':
    return action.data
  case 'BLOGS_CREATE':
    return [...state, action.data]
  case 'BLOGS_LIKE':
    return state.map((blog) =>
      blog.id === action.data.id ? action.data : blog
    )
  case 'BLOGS_DELETE':
    return state.filter((blog) => blog.id !== action.data)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'BLOGS_INIT',
      data: blogs,
    })
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const blog = await blogService.create(blogObject)
    dispatch({
      type: 'BLOGS_CREATE',
      data: blog,
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addLike(blog)
    dispatch({
      type: 'BLOGS_LIKE',
      data: updatedBlog,
    })
  }
}

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    const response = await blogService.deleteBlog(blogId)
    console.log(response)
    dispatch({
      type: 'BLOGS_DELETE',
      data: blogId,
    })
  }
}

export default blogsReducer
