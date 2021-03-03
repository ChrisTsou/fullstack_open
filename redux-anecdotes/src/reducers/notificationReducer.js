const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET':
    return action.message
  case 'DELETE':
    return null
  default:
    return state
  }
}

export const notificationSet = (message) => ({
  type: 'SET',
  message,
})

export const notificationDelete = () => ({
  type: 'DELETE',
})

export default reducer
