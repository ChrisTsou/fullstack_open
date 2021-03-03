const reducer = (state = null, action) => {
  switch (action.type) {
  case 'NOTIFICATION_SET':
    return action.message
  case 'NOTICATION_DELETE':
    return null
  default:
    return state
  }
}

export const notificationSet = (message) => ({
  type: 'NOTIFICATION_SET',
  message,
})

export const notificationDelete = () => ({
  type: 'NOTICATION_DELETE',
})

export default reducer
