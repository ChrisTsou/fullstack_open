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

export const notificationSet = (message, seconds) => async (dispatch) => {
  dispatch({
    type: 'NOTIFICATION_SET',
    message,
  })

  setTimeout(
    () => dispatch({
      type: 'NOTICATION_DELETE',
    }),
    seconds * 1000,
  )
}

export default reducer
